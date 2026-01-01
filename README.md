## Syntheverse Genesis (Base)

This repository deploys two minimal, protocol-level Genesis artifacts to Base:

- **`SyntheverseGenesisSYNTH90T`**: Fixed supply ERC-20 (90T SYNTH), one-time minted to a Motherlode Vault address; emits immutable metallic semantics (Gold/Silver/Copper) as events.
- **`SyntheverseGenesisLensKernel`**: Neutral event-first surface to emit participation signals and attestations (no admin, no built-in scoring/economics assumptions). **Proofs of Contribution (PoC)** can be evaluated and scored by **external interpreters** (indexers, dashboards, games) consuming these events.

### Contracts (source)

- **SYNTH 90T Motherlode Blockmine (ERC-20)**: `contracts/SyntheverseGenesisSYNTH90T.sol`
  - **Key on-chain fact event**: `MotherlodeMinted(vault, total, gold, silver, copper)`
  - **Minting**: one-time mint in constructor to `MOTHERLODE_VAULT` (no further mint function)

- **Lens / Sandbox / Ecosystem Kernel (event surface)**: `contracts/SyntheverseGenesisLensKernel.sol`
  - **Events**: `Signal`, `Attestation`, `Note`
  - **Methods**: `signal(...)`, `attest(...)`, `note(...)` (events only; no stored state)

### Reviewer abstract, constants, and equations (interpretive + on-chain)

This section is included so reviewers can quickly see the **protocol intent** and the key **constants/equations** referenced in the contract headers. Anything labeled **interpretive** is **documentation-only** (not executed on-chain).

- **Abstract (Genesis intent)**
  - **SYNTH90T**: a single, immutable genesis supply event (one-time mint to a Motherlode Vault) with “metallic makeup” emitted as semantic facts (events), not token classes.
  - **LensKernel**: a neutral event surface for participation signals/attestations; interpretation (including PoC scoring) is external.

- **HHF-AI constants (interpretive / non-executing)**
  - **Hydrogen–Holographic scaling constant**:
    - \( \Lambda^{HH} = \frac{R^H}{L_P} \approx 1.12 \times 10^{22} \)
  - **RAI (Recursive Awareness Interference) recursion (conceptual)**:
    - \(x_{t+1} = \mathcal{F}(x_t)\) with scale-shifted feedback across nested layers

- **SYNTH supply + metallic equations (on-chain quantities)**
  - **Decimals**: \(d = 10^{18}\)
  - **Total**: \( \text{TOTAL\_SUPPLY}_{wei} = 90 \times 10^{12} \times d \)
  - **Ratios**:
    - Gold = \( \frac{1}{2}\,\text{TOTAL\_SUPPLY} \)
    - Silver = \( \frac{1}{4}\,\text{TOTAL\_SUPPLY} \)
    - Copper = \( \frac{1}{4}\,\text{TOTAL\_SUPPLY} \)
    - Check: Gold + Silver + Copper = TOTAL\_SUPPLY

### Latest reviewer artifacts (Hardhat simulation)

The following outputs were produced by running `scripts/deploy-genesis.ts` on the in-memory Hardhat network (chainId `31337`) and are included for reviewer inspection:

- **Readable receipt (markdown)**: `deployments/genesis-hardhat-31337-1767221932106.md`
- **Machine receipt (json)**: `deployments/genesis-hardhat-31337-1767221932106.json` (generated alongside the markdown when the script is run)

Key facts from that run:

- **SYNTH90T**
  - **address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
  - **deployTxHash**: `0xa41555b0ec0c61da2ca852786f005737d4fe8fd2348950a0192a5ab88f85f3db`
  - **MotherlodeMinted (decoded)**:
    - **total**: `90,000,000,000,000.0 SYNTH`
    - **gold**: `45,000,000,000,000.0 SYNTH`
    - **silver**: `22,500,000,000,000.0 SYNTH`
    - **copper**: `22,500,000,000,000.0 SYNTH`

- **LensKernel**
  - **address**: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
  - **deployTxHash**: `0x79ee8f0fcb563f876d60b01035809fb6d1ef7ca5b1d4b964a49387e39ad2c989`

### Setup

1) Install dependencies:

```bash
npm install
```

2) Create `.env` (copy from `example.env`) and fill in values:

- **`DEPLOYER_PRIVATE_KEY`**
- **`BASE_RPC_URL`** and/or **`BASE_SEPOLIA_RPC_URL`**
- **`MOTHERLODE_VAULT`** (address receiving the one-time 90T mint)

### Deploy

Base Sepolia:

```bash
npm run deploy:baseSepolia
```

Base mainnet:

```bash
npm run deploy:base
```

### Deployment receipts

Each run writes a machine-readable JSON receipt to `deployments/` including:

- contract addresses
- deployment tx hashes
- block numbers
- block timestamps


