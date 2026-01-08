---
outline: deep
---

# CCIP Token Manager

The Chainlink Token Manager provides a web interface for deploying and managing cross-chain tokens with CCIP. This guide explains how to use Token Manager to create your own cross-chain token.

## Overview

Token Manager simplifies the process of:

- Deploying new cross-chain tokens
- Importing existing tokens into CCIP
- Configuring cross-chain token pools
- Managing token admin permissions
- Adding new blockchain networks to your token

::: tip Official Tools
- **Mainnet Token Manager**: [https://tokenmanager.chain.link/](https://tokenmanager.chain.link/)
- **Testnet Token Manager**: [https://test.tokenmanager.chain.link/](https://test.tokenmanager.chain.link/)
:::

## Token Manager Features

### Token Deployment Options

| Option | Description | Use Case |
|--------|-------------|----------|
| **Deploy New Token** | Create a new ERC20 token with CCIP support | New projects starting from scratch |
| **Import Existing Token** | Add CCIP support to an existing token | Projects with existing tokens |

### Pool Mechanisms

Token Manager supports different pool mechanisms for cross-chain transfers:

| Mechanism | How It Works | Best For |
|-----------|--------------|----------|
| **Burn & Mint** | Burns tokens on source chain, mints on destination | New tokens, consistent total supply across chains |
| **Lock & Release** | Locks tokens on source chain, releases from pool on destination | Existing tokens with fixed supply |

## Getting Started

### Prerequisites

1. **Web3 Wallet**: MetaMask or compatible wallet
2. **Network Connection**: Connect to the network where you want to deploy
3. **Gas Tokens**: ETH for transaction fees
4. **LINK Tokens**: For certain configuration operations

## Step-by-Step Guide

### Step 1: Access Token Manager

1. Go to [Token Manager (Testnet)](https://test.tokenmanager.chain.link/) or [Token Manager (Mainnet)](https://tokenmanager.chain.link/)
2. Connect your Web3 wallet
3. Select your starting network

### Step 2: Create or Import Token

#### Option A: Deploy a New Token

1. Click **"Deploy New Token"**
2. Fill in token details:
   - **Token Name**: e.g., "Cross-Chain Token"
   - **Token Symbol**: e.g., "CCT"
   - **Decimals**: Usually 18
   - **Initial Supply**: Amount to mint to your address
3. Review and confirm the deployment transaction

#### Option B: Import Existing Token

1. Click **"Import Existing Token"**
2. Enter your token's contract address
3. Verify the token details are correct
4. Proceed to pool configuration

### Step 3: Configure Token Pool

After deploying or importing your token:

1. **Deploy Pool Contract**: Token Manager will deploy a pool contract for CCIP
2. **Select Pool Mechanism**: 
   - **Burn & Mint**: For new tokens
   - **Lock & Release**: For existing tokens
3. **Transfer Admin Rights**: Grant admin permissions to your address

### Step 4: Add Cross-Chain Networks

To enable transfers to other chains:

1. Click **"Add Networks"** in your token dashboard
2. Select destination networks (e.g., Jovay, Ethereum, Polygon)
3. For each network:
   - Deploy a token contract (or use existing)
   - Deploy a pool contract
   - Configure the cross-chain lane
4. Confirm all transactions

### Step 5: Verify Configuration

After setup, your Token Manager dashboard will show:

- **Configured Networks**: All chains where your token exists
- **Pool Addresses**: Pool contracts on each chain
- **Token Addresses**: Token contracts on each chain
- **Minted Supply**: Total supply on each network

## Example: Deploy Token on Polygon and Jovay

Here's a real-world example of setting up a cross-chain token:

### Initial Deployment (Polygon Amoy)

1. Connect wallet to Polygon Amoy testnet
2. Deploy new token: "CTOKEN" with symbol "CTOKEN"
3. Select "Burn & Mint" mechanism
4. Complete deployment

**Result:**
- Token Address: `0x5246...566F`
- Pool Address: `0xCC92...1B45`
- Admin: Your address

### Add Jovay Testnet

1. In the dashboard, click "Add Networks"
2. Select "Jovay Testnet"
3. Deploy token and pool contracts
4. Configure cross-chain parameters

**Result:**
- Jovay Token Address: `0x7B61...FF73`
- Jovay Pool Address: `0x20C7...306D`

### Test Cross-Chain Transfer

Once configured, you can transfer tokens between networks:

**Polygon Amoy → Jovay Testnet:**
1. Approve token spending
2. Use standard CCIP transfer methods
3. Track on CCIP Explorer

## Managing Your Token

### Dashboard Overview

After setup, your Token Manager dashboard displays:

```
┌─────────────────────────────────────────────────────────────┐
│ CTOKEN                                                       │
├─────────────────────────────────────────────────────────────┤
│ Configured Networks (2)                                      │
├──────────────┬─────────────┬────────────┬───────────────────┤
│ Network      │ Token       │ Pool       │ Mechanism         │
├──────────────┼─────────────┼────────────┼───────────────────┤
│ Polygon Amoy │ 0x5246...   │ 0xCC92...  │ Burn & Mint       │
│ Jovay Testnet│ 0x7B61...   │ 0x20C7...  │ Burn & Mint       │
└──────────────┴─────────────┴────────────┴───────────────────┘
```

### Adding More Networks

You can add additional networks at any time:

1. Open your token in Token Manager
2. Click **"Add Networks"**
3. Select new destination networks
4. Complete the configuration process

### Updating Configuration

Token admins can:

- Update rate limits
- Modify pool configurations
- Add or remove supported chains
- Transfer admin rights

## Cross-Chain Transfer After Setup

Once your token is configured, users can transfer it using:

### Method 1: Direct CCIP Transfer

Use the TokenTransferor contract pattern from the [Token Transfer Guide](./ccip-token-transfer):

```solidity
router.ccipSend(destinationChainSelector, message);
```

### Method 2: Pool Direct Interaction

Advanced users can interact directly with the token pool contracts.

## Verified Test Results

The following cross-chain transfers have been verified on Jovay:

### Polygon Amoy → Jovay Testnet

| Transfer | Message ID | Transaction Hash |
|----------|------------|------------------|
| Test 1 | `0xf02b5109...` | `0xa8aeb791...` |
| Test 2 | `0x87618491...` | `0x85c18035...` |

### Jovay Testnet → Polygon Amoy

| Transfer | Message ID | Transaction Hash |
|----------|------------|------------------|
| Test 1 | `0xd6ba4d8e...` | `0x9ef1dc9f...` |
| Test 2 | `0xf3128d3b...` | `0x395d63e1...` |

## Best Practices

### Token Design

1. **Decimals**: Use 18 decimals for compatibility
2. **Supply**: Consider total supply across all chains
3. **Naming**: Use consistent name/symbol across chains

### Security

1. **Admin Keys**: Secure your admin private keys
2. **Multi-sig**: Consider using a multi-sig wallet for admin functions
3. **Testing**: Thoroughly test on testnet before mainnet deployment

### Operations

1. **Monitor**: Track cross-chain transfers via CCIP Explorer
2. **Documentation**: Document your token addresses on each chain
3. **Communication**: Inform users about supported chains

## Troubleshooting

### Token Not Appearing in Dashboard

**Issue**: Deployed token not showing in Token Manager

**Solution**:
- Ensure you're connected to the correct network
- Verify the deployment transaction succeeded
- Try refreshing or reconnecting your wallet

### Cross-Chain Transfer Fails

**Issue**: Transfer stuck or failed

**Solution**:
- Check CCIP lane is configured between the chains
- Verify sufficient LINK/native tokens for fees
- Ensure token is properly registered in both pools

### Admin Functions Not Working

**Issue**: Cannot access admin functions

**Solution**:
- Verify you're using the correct admin address
- Check admin rights were properly transferred
- Review transaction history for admin changes

## Next Steps

- [CCIP Token Transfer](./ccip-token-transfer) - Transfer tokens using your configured token
- [CCIP Network Information](./ccip-network-information) - Reference for all addresses
- [CCIP Overview](./ccip-overview) - Understand the underlying architecture

## Additional Resources

- [Token Manager Documentation](https://docs.chain.link/ccip/tutorials/cross-chain-tokens)
- [CCIP Token Configuration](https://docs.chain.link/ccip/architecture#tokens)
- [CCIP Explorer](https://ccip.chain.link/)
