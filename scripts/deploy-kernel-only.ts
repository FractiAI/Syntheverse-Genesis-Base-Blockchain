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

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function toReceipt(name: string, address: string, deployTxHash: string) {
  const provider = ethers.provider;
  
  console.log(`  Waiting for ${name} deployment confirmation...`);
  const txReceipt = await provider.waitForTransaction(deployTxHash, 1, 30000);
  if (!txReceipt || !txReceipt.blockNumber) {
    throw new Error(`Deployment tx not confirmed for ${name}: ${deployTxHash}`);
  }
  
  const blockNumber = txReceipt.blockNumber;
  
  let block = null;
  const maxRetries = 5;
  const retryDelay = 1000;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      block = await provider.getBlock(blockNumber);
      if (block) break;
    } catch (error) {
      if (attempt < maxRetries) {
        const delay = retryDelay * attempt;
        console.log(`  Block not indexed yet, retrying in ${delay}ms... (attempt ${attempt}/${maxRetries})`);
        await sleep(delay);
      } else {
        throw new Error(`Could not fetch block ${blockNumber} for ${name} after ${maxRetries} attempts`);
      }
    }
  }
  
  if (!block) {
    throw new Error(`Could not fetch block ${blockNumber} for ${name}`);
  }

  const receipt: DeployedContractReceipt = {
    name,
    address,
    deployTxHash,
    blockNumber: blockNumber,
    blockTimestamp: Number(block.timestamp),
  };
  return receipt;
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const chainId = Number((await ethers.provider.getNetwork()).chainId);

  console.log("Deploying SyntheverseGenesisLensKernel");
  console.log(`- network: ${network.name}`);
  console.log(`- chainId: ${chainId}`);
  console.log(`- deployer: ${deployer.address}`);

  const Kernel = await ethers.getContractFactory("SyntheverseGenesisLensKernel");
  const kernel = await Kernel.deploy();
  await kernel.waitForDeployment();
  const kernelAddress = await kernel.getAddress();
  const kernelTx = kernel.deploymentTransaction();
  if (!kernelTx) throw new Error("Missing deploymentTransaction for LensKernel");

  console.log(`\nDeployed LensKernel: ${kernelAddress}`);
  console.log(`- tx: ${kernelTx.hash}`);

  const kernelReceipt = await toReceipt(
    "SyntheverseGenesisLensKernel",
    kernelAddress,
    kernelTx.hash
  );

  console.log(`\n✅ Deployment successful!`);
  console.log(`Contract: SyntheverseGenesisLensKernel`);
  console.log(`Address: ${kernelAddress}`);
  console.log(`Transaction: ${kernelTx.hash}`);
  console.log(`Block: ${kernelReceipt.blockNumber}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

