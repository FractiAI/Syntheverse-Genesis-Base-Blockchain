# Quick Deployment Guide - Syntheverse Genesis on Base

## Prerequisites

1. Node.js installed (v18+ recommended, though v21.7.1 works)
2. Sufficient ETH on Base mainnet (≥ 0.001 ETH recommended for gas)
3. Base wallet with private key access

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create Environment File

Copy the example environment file:

```bash
cp example.env .env
```

## Step 3: Configure Environment Variables

Edit `.env` file with your values:

```env
# Your deployer wallet private key (MUST start with 0x)
DEPLOYER_PRIVATE_KEY=0xYourPrivateKeyHere

# Base Mainnet RPC (choose one):

# Option 1: Public endpoint (may have rate limits)
BASE_RPC_URL=https://mainnet.base.org

# Option 2: Alchemy (recommended for production)
# BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Option 3: Infura
# BASE_RPC_URL=https://base-mainnet.infura.io/v3/YOUR_PROJECT_ID

# Base Sepolia Testnet (for testing first)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# CRITICAL: Address that will receive the 90T SYNTH tokens (cannot be changed after deployment)
MOTHERLODE_VAULT=0xYourVaultAddressHere

# Optional: For contract verification on BaseScan
BASESCAN_API_KEY=YourBaseScanAPIKey
```

### Getting RPC Endpoints:

**Public Endpoints (Free, but may have rate limits):**
- Base Mainnet: `https://mainnet.base.org`
- Base Sepolia: `https://sepolia.base.org`

**Dedicated RPC Providers (Recommended for Production):**
- **Alchemy**: https://www.alchemy.com/ (free tier available)
- **Infura**: https://www.infura.io/ (free tier available)
- **QuickNode**: https://www.quicknode.com/

**BaseScan API Key:**
- Get from: https://basescan.org/myapikey
- Required for contract verification (optional but recommended)

## Step 4: Test on Base Sepolia (RECOMMENDED)

Always test on testnet first:

```bash
# Get Sepolia ETH from faucet: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
npm run deploy:baseSepolia
```

This will:
1. Deploy SYNTH90T contract
2. Deploy LensKernel contract
3. Generate deployment receipts in `deployments/` folder

## Step 5: Verify Testnet Deployment

1. Check the deployment receipt in `deployments/` folder
2. Visit BaseScan Sepolia: https://sepolia.basescan.org/
3. Search for your contract addresses
4. Verify the SYNTH90T token:
   - Total supply should be 90,000,000,000,000 SYNTH
   - MOTHERLODE_VAULT should have the full balance
   - Check the MotherlodeMinted event

## Step 6: Deploy to Base Mainnet

Once testnet deployment is verified:

```bash
npm run deploy:base
```

**IMPORTANT**: 
- Ensure you have sufficient ETH on Base mainnet (≥ 0.001 ETH recommended)
- Double-check MOTHERLODE_VAULT address (cannot be changed after deployment)
- This is irreversible - tokens will be minted to the vault address

## Step 7: Verify Contracts on BaseScan (Optional but Recommended)

After deployment, verify the contracts:

```bash
# Replace <SYNTH_ADDRESS> and <VAULT_ADDRESS> with actual addresses from deployment receipt
npx hardhat verify --network base <SYNTH_ADDRESS> <VAULT_ADDRESS>

# Replace <KERNEL_ADDRESS> with actual address from deployment receipt
npx hardhat verify --network base <KERNEL_ADDRESS>
```

Or verify manually on BaseScan:
1. Go to: https://basescan.org/
2. Search for your contract address
3. Click "Contract" tab
4. Click "Verify and Publish"
5. Follow the verification wizard

## Step 8: Post-Deployment Verification

Verify the following on BaseScan:

1. ✅ **SYNTH90T Contract**:
   - Address matches deployment receipt
   - Contract is verified (if you ran verification)
   - Total Supply = 90,000,000,000,000 SYNTH
   - MOTHERLODE_VAULT balance = 90,000,000,000,000 SYNTH
   - MotherlodeMinted event exists with correct values

2. ✅ **LensKernel Contract**:
   - Address matches deployment receipt
   - Contract is verified (if you ran verification)
   - No state variables (stateless contract)

## Deployment Receipts

Each deployment generates two files in `deployments/`:
- `genesis-base-8453-<timestamp>.json` - Machine-readable receipt
- `genesis-base-8453-<timestamp>.md` - Human-readable receipt

Save these receipts securely - they contain all deployment information.

## Troubleshooting

### "Insufficient funds"
- Ensure you have ETH on Base mainnet
- Check balance: Visit https://basescan.org/address/YOUR_ADDRESS

### "Invalid address"
- Ensure MOTHERLODE_VAULT is a valid Ethereum address (0x...)
- Ensure DEPLOYER_PRIVATE_KEY starts with 0x

### "RPC Error"
- Check your RPC URL is correct
- If using public endpoint, try a dedicated RPC provider
- Check network connectivity

### "Contract already deployed"
- If redeploying, you'll get a new address (contracts are not upgradeable)

## Security Notes

1. **Never commit `.env` file** - It contains your private key
2. **Verify MOTHERLODE_VAULT address** - Tokens are minted here ONCE and cannot be moved by the contract
3. **Keep deployment receipts secure** - They contain transaction hashes and addresses
4. **Use hardware wallet** - For mainnet deployments, consider using a hardware wallet

## Cost Estimate

**Base Mainnet Deployment Costs:**
- SYNTH90T deployment: ~0.00015 - 0.0002 ETH
- LensKernel deployment: ~0.00005 - 0.00008 ETH
- **Total: ~0.0002 - 0.0003 ETH** (roughly $0.50 - $0.75)

Base has very low gas costs, making it cost-effective for deployments.

## Support

- Base Documentation: https://docs.base.org/
- BaseScan Explorer: https://basescan.org/
- Base Discord: https://discord.gg/buildonbase

---

**Ready to deploy?** Start with Step 4 (testnet deployment) first!

