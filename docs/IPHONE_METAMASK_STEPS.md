# Step-by-Step: Deploy with MetaMask iPhone + Mac Terminal

## Step 1: Verify Testnet ETH on MetaMask (iPhone)

### On Your iPhone MetaMask App:

1. **Open MetaMask app** on your iPhone

2. **Switch to Base Sepolia Network**:
   - Tap on the network name at the top (might say "Ethereum Mainnet" or another network)
   - Scroll down and look for "Base Sepolia" network
   - If you don't see it, tap "Add Network" or "Add a network"
   - If Base Sepolia isn't listed, add it manually:
     - Tap "Add a network manually"
     - Network Name: `Base Sepolia`
     - RPC URL: `https://sepolia.base.org`
     - Chain ID: `84532`
     - Currency Symbol: `ETH`
     - Block Explorer: `https://sepolia.basescan.org`
     - Tap "Add" or "Save"

3. **Verify Your Balance**:
   - Once on Base Sepolia network, you should see your balance at the top
   - Should show: `0.015 ETH` (or close to it)
   - Your address should be: `0x3563...68BE3`

4. **Note Your Private Key** (if needed):
   - Tap the three lines (☰) menu at top left
   - Tap "Settings"
   - Tap "Security & Privacy"
   - Tap "Show Private Key" (you'll need your password)
   - Copy the private key (starts with 0x)
   - ⚠️ Keep this secret! Only use for testnet

✅ **Once you confirm you see ~0.015 ETH on Base Sepolia, proceed to Step 2**

---

## Step 2: Deploy from Mac Terminal

Now that you've verified the ETH on iPhone, let's deploy from your Mac:

### On Your Mac Terminal:

1. **Verify your .env file has the correct private key**
   - The private key in your .env should match the one from MetaMask
   - If you exported it from MetaMask, make sure it's in your .env file

2. **Run the deployment command**:
   ```bash
   npm run deploy:baseSepolia
   ```

3. **Watch the output** - you should see:
   - Network: baseSepolia
   - Chain ID: 84532
   - Deployer address (should match your MetaMask address)
   - Deployment transactions
   - Contract addresses
   - Receipt files created

4. **If deployment succeeds**, you'll see:
   - SYNTH90T contract address
   - LensKernel contract address
   - Receipt files in the `deployments/` folder

---

## Step 3: Verify Deployment on iPhone MetaMask

After deployment succeeds:

1. **Copy the contract addresses** from the terminal output

2. **On MetaMask iPhone**:
   - Tap "Assets" tab
   - Scroll down to see if SYNTH token appears (might take a moment)
   - Or manually add the token:
     - Tap "Import tokens"
     - Paste the SYNTH90T contract address
     - Token symbol should auto-populate as "SYNTH"
     - Tap "Add"

3. **Check BaseScan on iPhone**:
   - Open Safari on iPhone
   - Go to: https://sepolia.basescan.org
   - Search for your contract address
   - View the transaction and contract details

---

## Troubleshooting

**"Insufficient funds" error:**
- Make sure you're on Base Sepolia network in MetaMask
- Refresh MetaMask balance (pull down to refresh)
- Verify the ETH shows on Base Sepolia, not another network

**"Network doesn't exist" error:**
- Check your .env file has BASE_SEPOLIA_RPC_URL set
- Should be: `BASE_SEPOLIA_RPC_URL=https://sepolia.base.org`

**Private key mismatch:**
- Make sure the private key in .env matches your MetaMask wallet
- Private key must start with `0x`
- No spaces around the `=` sign in .env file

---

**Ready to deploy? Let's do it!**

