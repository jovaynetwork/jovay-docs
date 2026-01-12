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

Token Manager supports different pool mechanisms for cross-chain transfers. Understanding pool mechanisms is critical for designing your cross-chain token architecture.

#### Bidirectional Cross-Chain Requires Pools on Both Chains

::: warning Important
To enable **bidirectional** token transfers between Chain A and Chain B, you must deploy and configure a TokenPool on **both chains**. Each pool must be configured to recognize the remote pool on the other chain.
:::

**Single Pool = One-way only**: If you only deploy a pool on Chain A, tokens can only flow out from A. Without a pool on Chain B, the destination chain cannot receive or send tokens via CCIP.

**Bidirectional Setup**:
1. Deploy TokenPool on Chain A, configure it to point to Chain B's pool
2. Deploy TokenPool on Chain B, configure it to point to Chain A's pool
3. Both pools must be registered with the CCIP TokenAdminRegistry on their respective chains

#### Pool Types

There are two fundamental pool types:

| Pool Type | Source Chain Behavior | Destination Chain Behavior |
|-----------|----------------------|---------------------------|
| **MintBurn** (Burn & Mint) | Burns tokens from sender | Mints tokens to receiver |
| **LockRelease** (Lock & Release) | Locks tokens in pool | Releases tokens from pool |

#### The 4 Pool Combination Modes

When setting up bidirectional transfers between two chains, the pool type on each chain creates **4 possible combinations**. The combination you choose affects token supply management and liquidity requirements.

![CCIP Pool Combination Modes](/Images/chainlink-integration/ccip-pool-combination-modes.svg)

| # | Source Pool | Dest Pool | Transfer Flow | Use Case |
|---|-------------|-----------|---------------|----------|
| 1 | **MintBurn** | **MintBurn** | Burn on source → Mint on dest | New cross-chain native tokens; total supply is always consistent across all chains |
| 2 | **MintBurn** | **LockRelease** | Burn on source → Release on dest | Rare; dest chain has pre-funded liquidity pool |
| 3 | **LockRelease** | **MintBurn** | Lock on source → Mint on dest | Existing token on source chain (canonical); wrapped/synthetic representation on dest |
| 4 | **LockRelease** | **LockRelease** | Lock on source → Release on dest | Both chains have canonical token with pre-funded pools; requires liquidity on both sides |

#### Detailed Combination Analysis

##### 1. MintBurn / MintBurn

**How it works**: Tokens are burned when leaving any chain and minted when arriving. No liquidity pools needed.

**Pros**:
- Total supply across all chains always equals the original minted amount
- No liquidity management required
- Scales easily to many chains

**Cons**:
- Token contract must grant mint/burn permissions to the pool
- Not suitable for existing tokens without mint capability

**Best for**: New tokens designed from scratch for cross-chain use.

##### 2. LockRelease / MintBurn

**How it works**: The "canonical" token exists on Chain A (source). When transferring to Chain B, tokens are locked on A and a synthetic/wrapped version is minted on B. Returning tokens burns on B and releases on A.

**Pros**:
- Preserves existing token on the canonical chain
- No need to pre-fund liquidity on destination chains
- Clear distinction between "real" and "wrapped" tokens

**Cons**:
- Destination chain tokens are synthetic representations
- Requires mint/burn capability on destination chain token

**Best for**: Migrating existing tokens to new chains; wrapped token patterns (like WETH on L2s).

##### 3. MintBurn / LockRelease

**How it works**: Tokens are burned on source chain, and pre-existing tokens are released from a liquidity pool on destination. This is an uncommon pattern.

**Best for**: Special cases where destination chain has an existing token supply that needs to be distributed via cross-chain transfers.

##### 4. LockRelease / LockRelease

**How it works**: Tokens are locked in a pool on the source chain and released from a pool on the destination chain. Both pools must be pre-funded with liquidity.

**Pros**:
- Works with existing tokens that cannot be burned/minted
- Both chains have "real" tokens

**Cons**:
- Requires liquidity management on all chains
- Transfer capacity limited by pool balances
- Complex to scale to many chains

**Best for**: Existing tokens with fixed supply where you cannot modify the token contract.

#### Bidirectional Behavior

When transfers flow in **both directions** (A→B and B→A), remember:

- **A→B transfer**: Chain A pool is the source pool, Chain B pool is the destination pool
- **B→A transfer**: Chain B pool is the source pool, Chain A pool is the destination pool

The same pool acts as source or destination depending on transfer direction. For example, with LockRelease/MintBurn:
- A→B: Lock on A, Mint on B
- B→A: Burn on B, Release on A

::: tip Choosing the Right Combination
- **New token with no existing supply?** → MintBurn/MintBurn
- **Existing token on one chain, expanding to others?** → LockRelease/MintBurn (canonical chain uses LockRelease)
- **Existing tokens on multiple chains?** → LockRelease/LockRelease (requires liquidity management)
:::

For more details on token pool architecture, see the [Chainlink CCIP Token Pool Documentation](https://docs.chain.link/ccip/architecture#token-pools).

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
