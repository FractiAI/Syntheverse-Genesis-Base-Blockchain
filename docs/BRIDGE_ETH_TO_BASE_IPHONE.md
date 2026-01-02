# How to Bridge ETH from Ethereum to Base - iPhone MetaMask

**Goal**: Move ETH from Ethereum Mainnet to Base Mainnet for deployment

---

## Prerequisites

- MetaMask app installed on iPhone
- 0.015 ETH (or more) on Ethereum Mainnet
- MetaMask wallet connected/configured

---

## Step-by-Step Instructions

### Step 1: Open Base Bridge Website

**Option A: Use MetaMask In-App Browser (Recommended)**

1. Open **MetaMask app** on iPhone
2. Tap the **browser icon** at the bottom (🌐 icon)
3. In the address bar, type: `bridge.base.org`
4. Tap "Go"
5. This should load the bridge interface

**Option B: Use Orbiter Finance (Very Reliable - Recommended if Base Bridge redirects)**

1. In MetaMask browser (or Safari), go to: **https://www.orbiter.finance/**
2. Connect Wallet → Select MetaMask
3. Select "Ethereum" as source network
4. Select "Base" as destination network
5. Enter amount and bridge

**Option C: Use Stargate Finance**

1. Go to: **https://stargate.finance/**
2. Connect wallet
3. Select Ethereum → Base
4. Bridge ETH

**Option D: Coinbase (Easiest if you have account)**

If you have a Coinbase account:
1. Send ETH from MetaMask to Coinbase
2. In Coinbase, withdraw to Base network
3. Send to your MetaMask address on Base

---

### Step 2: Connect MetaMask Wallet

1. On the Base Bridge website, you should see a **"Connect Wallet"** button
2. Tap **"Connect Wallet"**
3. A menu will appear with wallet options
4. Tap **"MetaMask"**
5. Your iPhone will automatically open the MetaMask app (or ask for permission)
6. In MetaMask, you'll see a connection request
7. Review the connection details
8. Tap **"Connect"** to approve

---

### Step 3: Verify Network

1. After connecting, check which network you're on
2. In MetaMask app, at the top you should see the network name
3. Make sure it says **"Ethereum Mainnet"** (not Base)
4. If you're not on Ethereum Mainnet:
   - Tap the network name at the top
   - Select **"Ethereum Mainnet"**
   - Go back to Safari/browser

---

### Step 4: Set Up Base Network in MetaMask (If Not Already Added)

If Base Mainnet isn't in your MetaMask yet:

1. In MetaMask app, tap the network name at the top
2. Scroll down and look for **"Base"** or **"Base Mainnet"**
3. If you see it, select it (you can switch back later)
4. If you DON'T see it:
   - Tap **"Add Network"** or **"Add a network manually"**
   - Enter these values:
     - **Network Name**: `Base`
     - **RPC URL**: `https://mainnet.base.org`
     - **Chain ID**: `8453`
     - **Currency Symbol**: `ETH`
     - **Block Explorer URL**: `https://basescan.org`
   - Tap **"Save"** or **"Add"**

---

### Step 5: Bridge ETH

1. **Go back to Safari** and the Base Bridge website (should still be open)
2. You should see the bridge interface showing:
   - **From**: Ethereum
   - **To**: Base
3. Enter the amount to bridge:
   - Tap the amount field
   - Enter: **0.01** (this is plenty for deployment)
   - Or use "Max" to bridge all (you can leave some on Ethereum)
4. Review the transaction:
   - Check the amount
   - Check the networks (Ethereum → Base)
   - Check any fees shown
5. Tap **"Transfer"** or **"Bridge"** button

---

### Step 6: Approve Transaction in MetaMask

1. Your iPhone will automatically switch to MetaMask app
2. You'll see a transaction approval request
3. Review the transaction:
   - Network: Ethereum Mainnet
   - Amount: The ETH you're bridging
   - Gas fees (shown)
4. Tap **"Confirm"** or **"Approve"**
5. Wait for transaction confirmation (usually 1-2 minutes)

---

### Step 7: Complete Bridge Transfer

1. After the first transaction confirms, you may need to confirm another transaction
2. Follow any additional prompts in MetaMask
3. The bridge will process the transfer
4. Wait for completion (usually 2-5 minutes total)

---

### Step 8: Verify ETH on Base Mainnet

1. Open **MetaMask app**
2. Tap the network name at the top
3. Select **"Base"** or **"Base Mainnet"**
4. Check your balance at the top
5. You should see your ETH (minus bridge fees) on Base Mainnet
6. Your balance should show something like: **0.009 ETH** (or similar)

---

### Step 9: Verify You're Ready to Deploy

1. Make sure you're on **Base Mainnet** in MetaMask
2. Check your balance shows ETH on Base
3. You should have at least **0.001 ETH** (you'll have more)
4. You're now ready to deploy!

---

## Troubleshooting

### Can't Connect Wallet
- Make sure Safari/browser allows MetaMask to open
- Try refreshing the bridge webpage
- Make sure MetaMask app is up to date

### Base Network Not Showing
- Make sure you added Base Mainnet correctly
- Double-check Chain ID is `8453`
- Try closing and reopening MetaMask

### Transaction Stuck
- Wait a few minutes (bridges can take time)
- Check transaction status on Etherscan (Ethereum) or BaseScan (Base)
- Bridge transactions can take 2-5 minutes

### Wrong Network
- Always check which network you're on in MetaMask
- Make sure you bridge FROM Ethereum TO Base
- You can switch networks in MetaMask anytime

---

## Quick Reference

**Bridge Websites**:
- Base Bridge: https://bridge.base.org/ (try in MetaMask in-app browser)
- Hop Protocol: https://hop.exchange/ (reliable alternative)
- Across Protocol: https://across.to/ (alternative)

**Base Network Settings** (for MetaMask):
- Network Name: Base
- RPC URL: https://mainnet.base.org
- Chain ID: 8453
- Currency Symbol: ETH
- Block Explorer: https://basescan.org

**Recommended Amount**: 0.01 ETH (more than enough for deployment)

**Expected Time**: 2-5 minutes for bridge to complete

---

## After Bridging

Once you have ETH on Base Mainnet:

1. ✅ Verify balance in MetaMask (on Base network)
2. ✅ Make sure you have ≥ 0.001 ETH
3. ✅ You're ready to deploy!

Then run: `npm run deploy:base`

---

*Guide created for iPhone MetaMask users bridging to Base Mainnet*

