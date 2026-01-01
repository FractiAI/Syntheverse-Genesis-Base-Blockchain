import fs from "node:fs";
import path from "node:path";
import { ethers, network } from "hardhat";

type DeployedContractReceipt = {
  name: string;
  address: string;
  deployTxHash: string;
  blockNumber: number;
  blockTimestamp: number;
};

type MotherlodeBreakdown = {
  vault: string;
  total: string; // decimal string (18dp)
  gold: string; // decimal string (18dp)
  silver: string; // decimal string (18dp)
  copper: string; // decimal string (18dp)
};

function requireEnv(name: string, value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function formatIsoFromSeconds(seconds: number): string {
  return new Date(seconds * 1000).toISOString();
}

function formatTokens(wei: bigint): string {
  // Default 18 decimals (ERC-20)
  const asEther = ethers.formatEther(wei);
  // Add basic grouping on the integer part for readability
  const [intPart, fracPart] = asEther.split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fracPart ? `${grouped}.${fracPart}` : grouped;
}

async function toReceipt(name: string, address: string, deployTxHash: string) {
  const provider = ethers.provider;
  const tx = await provider.getTransaction(deployTxHash);
  if (!tx?.blockNumber) {
    throw new Error(`Deployment tx not mined yet for ${name}: ${deployTxHash}`);
  }
  const block = await provider.getBlock(tx.blockNumber);
  if (!block) {
    throw new Error(`Could not fetch block ${tx.blockNumber} for ${name}`);
  }

  const receipt: DeployedContractReceipt = {
    name,
    address,
    deployTxHash,
    blockNumber: tx.blockNumber,
    blockTimestamp: Number(block.timestamp),
  };
  return receipt;
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const chainId = Number((await ethers.provider.getNetwork()).chainId);

  const motherlodeVault = requireEnv("MOTHERLODE_VAULT", process.env.MOTHERLODE_VAULT);
  if (!ethers.isAddress(motherlodeVault)) {
    throw new Error(`MOTHERLODE_VAULT is not a valid address: ${motherlodeVault}`);
  }

  console.log("Syntheverse Genesis deployment");
  console.log(`- network: ${network.name}`);
  console.log(`- chainId: ${chainId}`);
  console.log(`- deployer: ${deployer.address}`);
  console.log(`- motherlodeVault: ${motherlodeVault}`);

  // Deterministic, auditable sequence:
  // 1) Deploy SYNTH 90T Motherlode token
  // 2) Deploy Lens/Sandbox/Kernel
  const Synth = await ethers.getContractFactory("SyntheverseGenesisSYNTH90T");
  const synth = await Synth.deploy(motherlodeVault);
  await synth.waitForDeployment();
  const synthAddress = await synth.getAddress();
  const synthTx = synth.deploymentTransaction();
  if (!synthTx) throw new Error("Missing deploymentTransaction for SYNTH90T");

  console.log(`\nDeployed SYNTH90T: ${synthAddress}`);
  console.log(`- tx: ${synthTx.hash}`);

  const Kernel = await ethers.getContractFactory("SyntheverseGenesisLensKernel");
  const kernel = await Kernel.deploy();
  await kernel.waitForDeployment();
  const kernelAddress = await kernel.getAddress();
  const kernelTx = kernel.deploymentTransaction();
  if (!kernelTx) throw new Error("Missing deploymentTransaction for LensKernel");

  console.log(`\nDeployed LensKernel: ${kernelAddress}`);
  console.log(`- tx: ${kernelTx.hash}`);

  const synthReceipt = await toReceipt("SyntheverseGenesisSYNTH90T", synthAddress, synthTx.hash);
  const kernelReceipt = await toReceipt(
    "SyntheverseGenesisLensKernel",
    kernelAddress,
    kernelTx.hash
  );

  // Decode and print MotherlodeMinted (readable on-chain facts).
  let motherlodeBreakdown: MotherlodeBreakdown | null = null;
  const mintedEvents = await synth.queryFilter(
    synth.filters.MotherlodeMinted(),
    synthReceipt.blockNumber,
    synthReceipt.blockNumber
  );
  if (mintedEvents.length === 0) {
    console.log("\nMotherlodeMinted: (no events found in deployment block)");
  } else {
    const ev = mintedEvents[0];
    const args = ev.args;
    motherlodeBreakdown = {
      vault: String(args?.vault ?? ""),
      total: ethers.formatEther(args?.total ?? 0n),
      gold: ethers.formatEther(args?.gold ?? 0n),
      silver: ethers.formatEther(args?.silver ?? 0n),
      copper: ethers.formatEther(args?.copper ?? 0n),
    };
    console.log("\nMotherlodeMinted (decoded):");
    console.log(`- vault: ${args?.vault}`);
    console.log(`- total:  ${formatTokens(args?.total ?? 0n)} SYNTH`);
    console.log(`- gold:   ${formatTokens(args?.gold ?? 0n)} SYNTH`);
    console.log(`- silver: ${formatTokens(args?.silver ?? 0n)} SYNTH`);
    console.log(`- copper: ${formatTokens(args?.copper ?? 0n)} SYNTH`);
  }

  const totalSupply = await synth.totalSupply();
  const synthSymbol = await synth.symbol();

  const receipt = {
    protocol: "SyntheverseGenesis",
    network: network.name,
    chainId,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
    params: {
      motherlodeVault,
    },
    contracts: {
      SYNTH90T: {
        ...synthReceipt,
        motherlodeMinted: motherlodeBreakdown,
      },
      LensKernel: kernelReceipt,
    },
  };

  const deploymentsDir = path.join(process.cwd(), "deployments");
  fs.mkdirSync(deploymentsDir, { recursive: true });

  const stamp = Date.now();
  const outStem = `genesis-${network.name}-${chainId}-${stamp}`;
  const outJsonPath = path.join(deploymentsDir, `${outStem}.json`);
  fs.writeFileSync(outJsonPath, JSON.stringify(receipt, null, 2), "utf8");

  const outMdPath = path.join(deploymentsDir, `${outStem}.md`);
  const breakdownLines =
    motherlodeBreakdown && motherlodeBreakdown.vault
      ? [
          ``,
          `#### MotherlodeMinted (decoded from on-chain event)`,
          ``,
          `| field | value |`,
          `|---|---:|`,
          `| vault | \`${motherlodeBreakdown.vault}\` |`,
          `| total | \`${formatTokens(ethers.parseEther(motherlodeBreakdown.total))} ${synthSymbol}\` |`,
          `| gold | \`${formatTokens(ethers.parseEther(motherlodeBreakdown.gold))} ${synthSymbol}\` |`,
          `| silver | \`${formatTokens(ethers.parseEther(motherlodeBreakdown.silver))} ${synthSymbol}\` |`,
          `| copper | \`${formatTokens(ethers.parseEther(motherlodeBreakdown.copper))} ${synthSymbol}\` |`,
        ]
      : [``, `#### MotherlodeMinted`, ``, `_No event decoded._`];

  const md = [
    `## Syntheverse Genesis Deployment Receipt`,
    ``,
    `- **network**: \`${network.name}\``,
    `- **chainId**: \`${chainId}\``,
    `- **deployedAt**: \`${receipt.deployedAt}\``,
    `- **deployer**: \`${deployer.address}\``,
    `- **motherlodeVault**: \`${motherlodeVault}\``,
    ``,
    `### Artifact 1 — SYNTH 90T Motherlode Blockmine`,
    `- **contract**: \`${synthReceipt.name}\``,
    `- **address**: \`${synthReceipt.address}\``,
    `- **deployTxHash**: \`${synthReceipt.deployTxHash}\``,
    `- **blockNumber**: \`${synthReceipt.blockNumber}\``,
    `- **blockTimestamp**: \`${synthReceipt.blockTimestamp}\` (\`${formatIsoFromSeconds(
      synthReceipt.blockTimestamp
    )}\`)`,
    `- **symbol**: \`${synthSymbol}\``,
    `- **totalSupply**: \`${formatTokens(totalSupply)} ${synthSymbol}\``,
    ...breakdownLines,
    ``,
    `### Artifact 2 — Lens / Sandbox / Ecosystem Kernel`,
    ``,
    `- **contract**: \`${kernelReceipt.name}\``,
    `- **address**: \`${kernelReceipt.address}\``,
    `- **deployTxHash**: \`${kernelReceipt.deployTxHash}\``,
    `- **blockNumber**: \`${kernelReceipt.blockNumber}\``,
    `- **blockTimestamp**: \`${kernelReceipt.blockTimestamp}\` (\`${formatIsoFromSeconds(
      kernelReceipt.blockTimestamp
    )}\`)`,
    ``,
    `### Raw receipt (JSON)`,
    `- \`${path.relative(process.cwd(), outJsonPath)}\``,
    ``,
  ].join("\n");
  fs.writeFileSync(outMdPath, md, "utf8");

  console.log(`\nReceipt written: ${outJsonPath}`);
  console.log(`Readable receipt written: ${outMdPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


