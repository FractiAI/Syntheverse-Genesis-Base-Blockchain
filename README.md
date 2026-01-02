# Syntheverse Genesis - Base Blockchain

[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue.svg)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.22.18-yellow.svg)](https://hardhat.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Base Network](https://img.shields.io/badge/Network-Base-0052FF.svg)](https://base.org/)

> Protocol-level Genesis artifacts deployed on Base blockchain. Minimal, immutable smart contracts establishing the Syntheverse Genesis substrate.

## 📋 Table of Contents

- [Overview](#overview)
- [Contracts](#contracts)
- [Deployment Status](#deployment-status)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This repository contains two minimal, protocol-level Genesis artifacts designed for deployment on the Base blockchain:

1. **SyntheverseGenesisSYNTH90T**: Fixed-supply ERC-20 token (90 trillion SYNTH) with one-time mint to a Motherlode Vault. Emits immutable metallic semantics (Gold/Silver/Copper) as on-chain events.

2. **SyntheverseGenesisLensKernel**: Stateless event-emitting contract providing a neutral protocol surface for participation signals and attestations. No admin functions, no stored state—designed as a "lens" for observation, not a controller.

### Design Principles

- ✅ **Minimal Surface Area**: Simple, focused contracts
- ✅ **Immutable**: No upgradeability, no proxies
- ✅ **Events Over Storage**: Semantic data via events
- ✅ **No Admin Functions**: Truly decentralized after deployment
- ✅ **OpenZeppelin Libraries**: Battle-tested security

## 📜 Contracts

### SyntheverseGenesisSYNTH90T

**Type**: ERC-20 Token  
**Location**: [`contracts/SyntheverseGenesisSYNTH90T.sol`](contracts/SyntheverseGenesisSYNTH90T.sol)

**Features**:
- Fixed supply: 90,000,000,000,000 SYNTH (90 trillion)
- One-time mint at deployment to Motherlode Vault
- No additional minting function
- Emits `MotherlodeMinted` event with metallic semantics
- Uses OpenZeppelin's audited ERC20 implementation

**Key Event**:
```solidity
event MotherlodeMinted(
    address indexed vault,
    uint256 total,
    uint256 gold,
    uint256 silver,
    uint256 copper
);
```

**Token Allocation (Conceptual)**:
- Gold: 45T SYNTH (50%) - Scientific contributions
- Silver: 22.5T SYNTH (25%) - Technological contributions
- Copper: 22.5T SYNTH (25%) - Alignment contributions

### SyntheverseGenesisLensKernel

**Type**: Stateless Event Emitter  
**Location**: [`contracts/SyntheverseGenesisLensKernel.sol`](contracts/SyntheverseGenesisLensKernel.sol)

**Features**:
- No stored state (events only)
- No admin functions (fully permissionless)
- Three event primitives: `Signal`, `Attestation`, `Note`
- Three methods: `signal()`, `attest()`, `note()`

**Events**:
```solidity
event Signal(address indexed actor, bytes32 indexed kind, bytes32 indexed subject, bytes data);
event Attestation(address indexed actor, bytes32 indexed key, bytes32 value);
event Note(address indexed actor, string note);
```

## 🚀 Deployment Status

### ✅ Base Mainnet (Deployed)

**Network**: Base Mainnet  
**Chain ID**: 8453  
**Deployment Date**: January 2, 2026  
**Status**: ✅ **SUCCESSFULLY DEPLOYED**

**Reports**:
- **[Deployment Report](docs/DEPLOYMENT_REPORT_BASE_MAINNET.md)** - Complete deployment details and transaction information
- **[Post-Deployment Report](docs/POST_DEPLOYMENT_REPORT_BASE_MAINNET.md)** - Comprehensive post-deployment verification, analysis, and next steps

#### Contract Addresses

| Contract | Address | Explorer |
|----------|---------|----------|
| **SyntheverseGenesisSYNTH90T** | [`0xAC9fa48Ca1D60e5274d14c7CEd6B3F4C1ADd1Aa3`](https://basescan.org/address/0xAC9fa48Ca1D60e5274d14c7CEd6B3F4C1ADd1Aa3) | [View on BaseScan](https://basescan.org/address/0xAC9fa48Ca1D60e5274d14c7CEd6B3F4C1ADd1Aa3) |
| **SyntheverseGenesisLensKernel** | [`0xD9ABf9B19B4812A2fd06c5E8986B84040505B9D8`](https://basescan.org/address/0xD9ABf9B19B4812A2fd06c5E8986B84040505B9D8) | [View on BaseScan](https://basescan.org/address/0xD9ABf9B19B4812A2fd06c5E8986B84040505B9D8) |

#### Deployment Details

**SyntheverseGenesisSYNTH90T**:
- **Transaction**: [`0x2feb4ee91670fdff2c2ba3eace87c0ca93e81de003a8195d695b4d96fa88d314`](https://basescan.org/tx/0x2feb4ee91670fdff2c2ba3eace87c0ca93e81de003a8195d695b4d96fa88d314)
- **Block**: 40,294,754
- **Gas Used**: 682,309
- **Token Name**: "Syntheverse SYNTH 90T MOTHERLODE BLOCKMINE"
- **Symbol**: SYNTH
- **Total Supply**: 90,000,000,000,000 SYNTH
- **Decimals**: 18
- **Motherlode Vault**: `0x3563388d0e1c2d66a004e5e57717dc6d7e568be3`

**SyntheverseGenesisLensKernel**:
- **Transaction**: [`0x5a610ceef16e607734ec651797aefdec3143a26b25d769e07832c8ca1686fc5e`](https://basescan.org/tx/0x5a610ceef16e607734ec651797aefdec3143a26b25d769e07832c8ca1686fc5e)
- **Block**: 40,294,815
- **Gas Used**: 207,278

**Deployer**: `0x3563388d0E1c2D66A004E5E57717dc6D7e568BE3`  
**Total Gas Used**: 889,587  
**Total Cost**: ~0.0002-0.0003 ETH

**Pre-Deployment Report**: See [`docs/FINAL_PRE_DEPLOYMENT_REPORT_BASE_MAINNET.md`](docs/FINAL_PRE_DEPLOYMENT_REPORT_BASE_MAINNET.md) for comprehensive pre-deployment review.

### ✅ Base Sepolia Testnet (Deployed)

**Network**: Base Sepolia  
**Chain ID**: 84532  
**Deployment Date**: January 2, 2026  
**Status**: Successfully Deployed

#### Contract Addresses

| Contract | Address | Explorer |
|----------|---------|----------|
| **SyntheverseGenesisSYNTH90T** | [`0xAC9fa48Ca1D60e5274d14c7CEd6B3F4C1ADd1Aa3`](https://sepolia.basescan.org/address/0xAC9fa48Ca1D60e5274d14c7CEd6B3F4C1ADd1Aa3) | [View on BaseScan](https://sepolia.basescan.org/address/0xAC9fa48Ca1D60e5274d14c7CEd6B3F4C1ADd1Aa3) |
| **SyntheverseGenesisLensKernel** | [`0xD9ABf9B19B4812A2fd06c5E8986B84040505B9D8`](https://sepolia.basescan.org/address/0xD9ABf9B19B4812A2fd06c5E8986B84040505B9D8) | [View on BaseScan](https://sepolia.basescan.org/address/0xD9ABf9B19B4812A2fd06c5E8986B84040505B9D8) |

#### Deployment Details

**SyntheverseGenesisSYNTH90T**:
- **Transaction**: [`0x0b2dae9c0125ffaff72f11e1c44719840b54231aaf840a467936e67b516d4e0e`](https://sepolia.basescan.org/tx/0x0b2dae9c0125ffaff72f11e1c44719840b54231aaf840a467936e67b516d4e0e)
- **Block**: 35,802,562
- **Gas Used**: 606,592
- **Total Supply**: 90,000,000,000,000 SYNTH
- **Symbol**: SYNTH
- **Decimals**: 18
- **Motherlode Vault**: `0x3563388d0e1c2d66a004e5e57717dc6d7e568be3`

**SyntheverseGenesisLensKernel**:
- **Transaction**: [`0xb6b3826e52bd5c89d53a8ae3e3af4760194a62f3be0622ef27fff8af4bf1a86f`](https://sepolia.basescan.org/tx/0xb6b3826e52bd5c89d53a8ae3e3af4760194a62f3be0622ef27fff8af4bf1a86f)
- **Block**: 35,802,562
- **Gas Used**: 207,278

**Deployer**: `0x3563388d0E1c2D66A004E5E57717dc6D7e568BE3`

#### Gas Summary

| Contract | Gas Used | Percentage |
|----------|----------|------------|
| SYNTH90T | 606,592 | 74.5% |
| LensKernel | 207,278 | 25.5% |
| **Total** | **813,870** | **100%** |

#### On-Chain Verification ✅

- ✅ Contracts deployed successfully
- ✅ SYNTH90T total supply: 90,000,000,000,000 SYNTH
- ✅ All tokens minted to Motherlode Vault
- ✅ MotherlodeMinted event emitted correctly
- ✅ Token allocation verified (Gold: 50%, Silver: 25%, Copper: 25%)
- ✅ Both contracts immutable (no upgradeability)

📄 **Full Deployment Report**: See [`docs/DEPLOYMENT_REPORT_BASE_SEPOLIA.md`](docs/DEPLOYMENT_REPORT_BASE_SEPOLIA.md) for complete details.

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ (v20+ recommended)
- npm or yarn
- Base wallet with ETH for gas fees
- Hardhat configured

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Syntheverse-Genesis-Base-Blockchain

# Install dependencies
npm install

# Compile contracts
npm run compile
```

### Configuration

1. Copy the example environment file:
```bash
cp example.env .env
```

2. Configure your `.env` file:
```env
# Required: Deployer private key (must start with 0x)
DEPLOYER_PRIVATE_KEY=0xYourPrivateKeyHere

# Required: Base Sepolia RPC URL
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Required: Base Mainnet RPC URL (for mainnet deployment)
BASE_RPC_URL=https://mainnet.base.org

# Required: Motherlode Vault address (receives 90T SYNTH tokens)
MOTHERLODE_VAULT=0xYourVaultAddressHere

# Optional: BaseScan API key (for contract verification)
BASESCAN_API_KEY=YourAPIKeyHere
```

**⚠️ Security Note**: Never commit your `.env` file. It contains sensitive private keys.

### Deployment

#### Deploy to Base Sepolia (Testnet)

```bash
# Ensure you have testnet ETH from a faucet
npm run deploy:baseSepolia
```

Get free Base Sepolia ETH:
- [Coinbase Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
- [Alchemy Base Sepolia Faucet](https://www.alchemy.com/faucets/base-sepolia)

#### Deploy to Base Mainnet

```bash
# Ensure you have sufficient ETH on Base mainnet (≥0.001 ETH recommended)
npm run deploy:base
```

**⚠️ Important**: 
- Verify `MOTHERLODE_VAULT` address before mainnet deployment (cannot be changed)
- Test on Sepolia first
- Ensure sufficient ETH balance for gas fees

### Verify Contracts (Optional)

After deployment, verify contracts on BaseScan:

```bash
# SYNTH90T (with constructor argument)
npx hardhat verify --network baseSepolia <SYNTH_ADDRESS> <VAULT_ADDRESS>

# LensKernel (no constructor arguments)
npx hardhat verify --network baseSepolia <KERNEL_ADDRESS>
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](docs/) directory:

### Base Mainnet Deployment

- **[Post-Deployment Report (Base Mainnet)](docs/POST_DEPLOYMENT_REPORT_BASE_MAINNET.md)** - ✅ **NEW** - Comprehensive post-deployment verification, analysis, security checks, and next steps
- **[Deployment Report (Base Mainnet)](docs/DEPLOYMENT_REPORT_BASE_MAINNET.md)** - Complete Base Mainnet deployment details and transaction information
- **[Pre-Deployment Report (Base Mainnet)](docs/FINAL_PRE_DEPLOYMENT_REPORT_BASE_MAINNET.md)** - ✅ **REVIEWED AND APPROVED** - Complete Base mainnet deployment specifications, configuration, and review checklist

### Base Sepolia Testnet

- **[Deployment Report (Base Sepolia)](docs/DEPLOYMENT_REPORT_BASE_SEPOLIA.md)** - Complete Base Sepolia deployment details and verification

### Guides and Reviews

- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions
- **[Security Review](docs/DEPLOYMENT_REVIEW.md)** - Comprehensive security analysis and code review
- **[Review Summary](docs/REVIEW_SUMMARY.md)** - Quick reference security review summary

### Contract Documentation

- **SYNTH90T**: See [`contracts/SyntheverseGenesisSYNTH90T.sol`](contracts/SyntheverseGenesisSYNTH90T.sol) for detailed NatSpec comments
- **LensKernel**: See [`contracts/SyntheverseGenesisLensKernel.sol`](contracts/SyntheverseGenesisLensKernel.sol) for detailed NatSpec comments

## 🔒 Security

### Security Features

- ✅ **OpenZeppelin Libraries**: Uses battle-tested, audited ERC20 implementation
- ✅ **Immutable Contracts**: No upgradeability or proxy patterns
- ✅ **Minimal Attack Surface**: Simple, focused contract designs
- ✅ **No Admin Functions**: Fully decentralized after deployment
- ✅ **Input Validation**: Zero-address checks in constructors

### Audit Status

- ✅ Internal security review completed
- ⏳ External audit: Recommended before mainnet deployment

See [`docs/DEPLOYMENT_REVIEW.md`](docs/DEPLOYMENT_REVIEW.md) for detailed security analysis.

### Known Considerations

- **MOTHERLODE_VAULT Address**: Must be correct at deployment (immutable)
- **Gas Costs**: Base has very low gas costs (~$0.50-0.75 for full deployment)
- **Token Supply**: Fixed at 90T SYNTH (no inflation, no additional minting)

## 📊 Protocol Constants

### HHF-AI Interpretive Constants (Non-Executing)

These constants are included in contract documentation for interpretive alignment only:

- **Hydrogen–Holographic scaling constant**: \( \Lambda^{HH} = \frac{R^H}{L_P} \approx 1.12 \times 10^{22} \)
- **RAI recursion**: \(x_{t+1} = \mathcal{F}(x_t)\) with scale-shifted feedback

### On-Chain Quantities

- **Decimals**: \(d = 10^{18}\)
- **Total Supply**: \( \text{TOTAL\_SUPPLY}_{wei} = 90 \times 10^{12} \times d \)
- **Ratios**:
  - Gold = \( \frac{1}{2}\,\text{TOTAL\_SUPPLY} \)
  - Silver = \( \frac{1}{4}\,\text{TOTAL\_SUPPLY} \)
  - Copper = \( \frac{1}{4}\,\text{TOTAL\_SUPPLY} \)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Note**: Contract changes require thorough testing and security review before consideration.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Base Network** - L2 infrastructure
- **OpenZeppelin** - Security-focused smart contract libraries
- **Hardhat** - Development environment
- **FractiAI Research Team** - Protocol design and implementation

## 📞 Support

- **Documentation**: See [`docs/`](docs/) directory
- **Base Network**: [docs.base.org](https://docs.base.org/)
- **BaseScan Explorer**: [basescan.org](https://basescan.org/)
- **Issues**: Please use GitHub Issues for bug reports and feature requests

---

**Built with ❤️ by FractiAI Research Team × Syntheverse Whole Brain AI**
