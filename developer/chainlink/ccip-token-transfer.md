---
outline: deep
---

# CCIP Cross-Chain Token Transfer

This guide walks you through transferring tokens between Jovay and other supported networks using Chainlink CCIP.

## Overview

CCIP enables secure token transfers across different blockchains. You can:

- Transfer supported tokens between chains
- Send tokens to EOA (externally owned accounts) or smart contracts
- Combine token transfers with arbitrary data (programmable token transfers)

**What you'll learn:**
- Deploy a TokenTransferor contract
- Configure cross-chain transfer permissions
- Execute token transfers in both directions
- Track and verify transfers

::: tip Example Scenario
This guide demonstrates bidirectional token transfers between **Ethereum Sepolia** and **Jovay Testnet** using the CCIP-BnM test token.
:::

## Prerequisites

Before you begin, ensure you have:

1. **Wallet Setup**: MetaMask configured for both networks
2. **Test Tokens**:
   - ETH on both chains (for gas)
   - LINK tokens on the source chain (for CCIP fees)
   - CCIP-BnM test tokens (for transfer testing)
3. **Development Environment**: [Remix IDE](https://remix.ethereum.org/)

::: info Get Test Tokens
- **CCIP-BnM Tokens**: Use the [Chainlink CCIP Test Tokens](https://docs.chain.link/ccip/test-tokens) page
- **LINK Tokens**: Use the [Chainlink Faucet](https://faucets.chain.link/)
- **Jovay Testnet ETH**: Use the [Jovay Faucet](https://zan.top/faucet/jovay)
:::

## Supported Test Tokens

For testnet development, Chainlink provides test tokens that work across CCIP-supported chains:

| Token | Ethereum Sepolia | Jovay Testnet |
|-------|-----------------|---------------|
| CCIP-BnM | `0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05` | `0xB45B9eb94F25683B47e5AFb0f74A05a58be86311` |

::: warning Testnet Only
CCIP-BnM is a test token for development purposes. On mainnet, you would use real tokens that are supported by CCIP. Check the [CCIP Directory](https://docs.chain.link/ccip/directory) for supported mainnet tokens.
:::

## Part 1: Transfer Tokens from Ethereum to Jovay

### Step 1: Deploy the TokenTransferor Contract

#### 1.1 Open the Contract in Remix

Open the official Chainlink TokenTransferor contract:

[Open TokenTransferor.sol in Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/CCIP/TokenTransferor.sol&autoCompile=true)

#### 1.2 Configure Constructor Parameters

| Parameter | Description | Ethereum Sepolia Value |
|-----------|-------------|----------------------|
| `_router` | CCIP Router address | `0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59` |
| `_link` | LINK token address | `0x779877A7B0D9E8603169DdbD7836e478b4624789` |

#### 1.3 Deploy to Ethereum Sepolia

1. Connect wallet to **Ethereum Sepolia**
2. Compile and deploy the contract
3. **Record the deployed contract address**

### Step 2: Configure Destination Chain

After deployment, you need to allowlist the destination chain.

Call the `allowlistDestinationChain` function:

```solidity
function allowlistDestinationChain(
    uint64 _destinationChainSelector,
    bool allowed
) external onlyOwner
```

**Parameters:**

| Parameter | Value |
|-----------|-------|
| `_destinationChainSelector` | `945045181441419236` (Jovay Testnet) |
| `allowed` | `true` |

### Step 3: Fund the Contract

Transfer the following tokens to your TokenTransferor contract:

1. **LINK tokens**: For paying CCIP fees (recommended: 0.5-1 LINK)
2. **CCIP-BnM tokens**: The tokens you want to transfer (e.g., 0.01 BnM)

::: tip Getting BnM Tokens
You can mint CCIP-BnM tokens on any testnet from the [Chainlink CCIP Test Tokens](https://docs.chain.link/ccip/test-tokens) page. Each request mints 1 BnM token.
:::

### Step 4: Execute the Transfer

Call the `transferTokensPayLINK` function:

```solidity
function transferTokensPayLINK(
    uint64 _destinationChainSelector,
    address _receiver,
    address _token,
    uint256 _amount
) external onlyOwner returns (bytes32 messageId)
```

**Parameters:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| `_destinationChainSelector` | `945045181441419236` | Jovay Testnet selector |
| `_receiver` | Your destination address | EOA or contract on Jovay |
| `_token` | `0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05` | BnM on Sepolia |
| `_amount` | `2000000000000000` | 0.002 BnM (18 decimals) |

### Step 5: Track the Transfer

1. **Record the transaction hash** from your wallet
2. Go to [CCIP Explorer](https://ccip.chain.link/)
3. Enter your transaction hash to track the transfer status

**Expected Timeline:** Some minutes for completion

### Step 6: Verify on Jovay

Once the transfer completes:

1. Open [Jovay Testnet Explorer](https://sepolia-explorer.jovay.io)
2. Check your receiver address
3. Verify the BnM token balance: `0xB45B9eb94F25683B47e5AFb0f74A05a58be86311`

## Part 2: Transfer Tokens from Jovay to Ethereum

You can also transfer tokens in the reverse direction.

### Step 1: Deploy TokenTransferor on Jovay

Deploy the same TokenTransferor contract on Jovay Testnet:

| Parameter | Jovay Testnet Value |
|-----------|-------------------|
| `_router` | `0x2016AA303B331bd739Fd072998e579a3052500A6` |
| `_link` | `0xd3e461C55676B10634a5F81b747c324B85686Dd1` |

### Step 2: Configure Destination Chain

Call `allowlistDestinationChain`:

| Parameter | Value |
|-----------|-------|
| `_destinationChainSelector` | `16015286601757825753` (Ethereum Sepolia) |
| `allowed` | `true` |

### Step 3: Fund and Transfer

1. Send LINK tokens to the contract (for fees)
2. Send BnM tokens to the contract (the tokens to transfer)
3. Call `transferTokensPayLINK` with Ethereum Sepolia as destination

**Parameters for Jovay → Sepolia:**

| Parameter | Value |
|-----------|-------|
| `_destinationChainSelector` | `16015286601757825753` |
| `_receiver` | Your Ethereum address |
| `_token` | `0xB45B9eb94F25683B47e5AFb0f74A05a58be86311` (BnM on Jovay) |
| `_amount` | Amount in wei (18 decimals) |

## Paying Fees with Native Token

Instead of LINK, you can pay CCIP fees with native tokens (ETH) or wrapped native tokens (WETH).

### Using Native Token (ETH)

Use the `transferTokensPayNative` function:

```solidity
function transferTokensPayNative(
    uint64 _destinationChainSelector,
    address _receiver,
    address _token,
    uint256 _amount
) external onlyOwner returns (bytes32 messageId)
```

The key difference is setting `feeToken` to `address(0)` and sending ETH via `msg.value`:

```solidity
Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
    receiver: abi.encode(_receiver),
    data: "",
    tokenAmounts: tokenAmounts,
    extraArgs: Client._argsToBytes(
        Client.EVMExtraArgsV1({gasLimit: 0})
    ),
    feeToken: address(0)  // Use native token for fees
});

uint256 fees = router.getFee(_destinationChainSelector, message);
router.ccipSend{value: fees}(_destinationChainSelector, message);
```

### Fee Token Comparison

| Fee Token | Setup | How to Pay |
|-----------|-------|------------|
| **LINK** | Set `feeToken` to LINK address | `approve()` then `ccipSend()` |
| **ETH** | Set `feeToken` to `address(0)` | `ccipSend{value: fees}()` |
| **WETH** | Set `feeToken` to WETH address | `approve()` then `ccipSend()` |

::: tip Official Guide
For a complete step-by-step tutorial on paying fees with native tokens, see the Chainlink documentation:
[Transfer Tokens and Pay in Native](https://docs.chain.link/ccip/tutorials/evm/transfer-tokens-from-contract#transfer-tokens-and-pay-in-native)
:::

::: tip Fee Estimation
Call `router.getFee()` to estimate the required fee before sending. Ensure your contract has sufficient native token balance or LINK/WETH allowance.
:::

::: info CCIP Billing Details
CCIP fees consist of blockchain fees (execution costs) and network fees (DON operator fees). For token transfers, network fees may be percentage-based (Lock and Unlock) or fixed (Burn and Mint). Using LINK for payment often provides better rates. For detailed billing rules, see [CCIP Billing](https://docs.chain.link/ccip/billing).
:::

## Token Transfer Summary

Here's a complete example of a bidirectional token transfer:

### Ethereum Sepolia → Jovay Testnet

| Step | Action | Example |
|------|--------|---------|
| Deploy | TokenTransferor on Sepolia | `0x32D5...EDbE` |
| Configure | Allowlist Jovay Testnet | Selector: `945045181441419236` |
| Fund | Send LINK + BnM to contract | 0.5 LINK + 0.002 BnM |
| Transfer | Call transferTokensPayLINK | - |
| Track | CCIP Explorer | Message ID: `0x2fce...ff67` |
| Verify | Check balance on Jovay | 0.002 BnM received |

### Jovay Testnet → Ethereum Sepolia

| Step | Action | Example |
|------|--------|---------|
| Deploy | TokenTransferor on Jovay | `0x9fa4...962C` |
| Configure | Allowlist Ethereum Sepolia | Selector: `16015286601757825753` |
| Fund | Send LINK + BnM to contract | 0.5 LINK + 0.002 BnM |
| Transfer | Call transferTokensPayLINK | - |
| Track | CCIP Explorer | Message ID: `0xde41...e805` |
| Verify | Check balance on Sepolia | 0.002 BnM received |

## Programmable Token Transfers

You can combine token transfers with data by implementing a custom receiver contract that handles both:

```solidity
function _ccipReceive(
    Client.Any2EVMMessage memory message
) internal override {
    // Decode the data
    bytes memory data = message.data;
    
    // Access transferred tokens
    Client.EVMTokenAmount[] memory tokenAmounts = message.destTokenAmounts;
    
    // Execute your custom logic with both data and tokens
}
```

This enables use cases like:
- Cross-chain swaps
- Cross-chain lending collateral
- NFT purchases across chains

## Troubleshooting

### Transfer Fails with Insufficient Fee

**Error**: Transaction reverts

**Solution**: 
1. Estimate fee: `router.getFee(destinationChainSelector, message)`
2. Ensure contract has enough LINK or native tokens

### Destination Chain Not Allowed

**Error**: "Destination chain not allowlisted"

**Solution**: Call `allowlistDestinationChain` with the correct chain selector and `true`

### Token Not Supported

**Error**: Token transfer fails

**Solution**: 
- Verify the token is supported on the CCIP lane
- Check the [CCIP Directory](https://docs.chain.link/ccip/directory) for supported tokens
- For custom tokens, see [Token Manager Guide](./ccip-token-manager)

## Next Steps

- [Token Manager Guide](./ccip-token-manager) - Deploy your own cross-chain token
- [CCIP Network Information](./ccip-network-information) - Complete address reference
- [CCIP Overview](./ccip-overview) - Understand the architecture

## Additional Resources

- [Chainlink CCIP Token Transfer Docs](https://docs.chain.link/ccip/tutorials/evm/transfer-tokens-from-contract)
- [CCIP Billing](https://docs.chain.link/ccip/billing) - Detailed fee structure and billing rules
- [CCIP Supported Tokens](https://docs.chain.link/ccip/directory)
- [CCIP Explorer](https://ccip.chain.link/)
