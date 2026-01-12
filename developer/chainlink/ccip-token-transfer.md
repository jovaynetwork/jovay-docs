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

## Custom Tokens and Bidirectional Transfers

This guide uses **CCIP-BnM**, an official test token with pre-configured TokenPools on all supported testnets. If you want to transfer **your own custom token** across chains, you must set up TokenPools yourself.

::: info Bidirectional Requires Pools on Both Chains
To enable **bidirectional** cross-chain transfers for your custom token:
1. Deploy a TokenPool on **each chain** where your token exists
2. Configure each pool to recognize the remote pool on the other chain
3. Register both pools with the CCIP TokenAdminRegistry

Without pools on both chains, transfers can only flow in one direction (or not at all).
:::

For detailed instructions on deploying and configuring TokenPools, including the **4 pool combination modes** (MintBurn/MintBurn, LockRelease/MintBurn, etc.), see the [Token Manager Guide - Pool Mechanisms](./ccip-token-manager#pool-mechanisms).

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

## Failure Handling and Message Recovery

Cross-chain transfers can fail at the destination chain due to various reasons. Understanding failure scenarios and recovery options is critical for building robust cross-chain applications.

### What Happens When a Transfer Fails?

When a CCIP message (including token transfers) is delivered to the destination chain, the `_ccipReceive` function in your receiver contract is executed. If this execution **reverts**, the message enters a **failed state**.

**Important**: The tokens are **not lost**. Failed messages can be retried through manual execution or programmatic recovery.

::: danger No Source Chain Cancellation
**There is no cancellation mechanism on the source chain.** Once a CCIP message is sent, it cannot be cancelled or recalled. The message will eventually be delivered to the destination chain.

This means your **only recourse** for handling failures is:
1. **Defensive receiver pattern** - Must be implemented **in advance** on your receiver contract to recover tokens/handle failures gracefully
2. **Manual execution retry** - Only helps with **transitory failures** (e.g., temporary gas issues, contract not yet deployed)

If your receiver contract has a permanent bug that causes reverts, retrying via CCIP Explorer will fail repeatedly. You must fix the receiver logic first, or if you implemented the defensive pattern, use it to recover the tokens.
:::

### Failure Scenarios

| Scenario | Cause | Recovery |
|----------|-------|----------|
| **Receiver reverts** | Bug in `_ccipReceive` logic, out of gas, or assertion failure | Fix receiver logic, then manually execute |
| **Insufficient gas limit** | `gasLimit` in extraArgs too low | Retry with higher gas via manual execution |
| **Contract not deployed** | Receiver address has no code | Deploy receiver, then manually execute |

### Manual Execution (Retry Failed Messages)

When a message fails on the destination chain, you can manually trigger re-execution. **This only helps with transitory failures**—situations where the failure was temporary and can be resolved.

**When manual execution helps:**
- Contract was not deployed yet → Deploy it, then retry
- Gas limit was too low → Retry with higher gas override
- Temporary network congestion → Simply retry

**When manual execution does NOT help:**
- Permanent bug in receiver logic → Must fix and redeploy the receiver first
- Receiver lacks defensive pattern → Cannot recover tokens from failed programmable transfer

**Steps to retry:**
1. **Find the failed message** on [CCIP Explorer](https://ccip.chain.link/)
2. **Fix the root cause** (e.g., deploy missing contract, fix and redeploy receiver)
3. **Manually execute** the message via CCIP Explorer or programmatically

::: tip Official Guide
For step-by-step instructions on retrying failed messages:
[Manual Execution Guide](https://docs.chain.link/ccip/tutorials/evm/manual-execution)
:::

### Defensive Programming for Token Transfers

::: warning Must Be Implemented In Advance
The defensive receiver pattern **must be deployed before** you start receiving cross-chain transfers. You cannot add this pattern after a transfer has already failed—by then, the tokens are stuck in a failed message that your original receiver cannot handle.
:::

For programmable token transfers (tokens + data), implement a **defensive receiver pattern** that separates token receipt from business logic execution. This pattern ensures tokens are safely held even if your business logic fails:

```solidity
contract DefensiveReceiver is CCIPReceiver {
    // Store failed messages for later retry
    mapping(bytes32 => Client.Any2EVMMessage) public failedMessages;
    
    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        // Tokens are already received at this point
        try this.processMessage(message) {
            // Success - business logic executed
        } catch {
            // Store for later retry - tokens are safe
            failedMessages[message.messageId] = message;
            emit MessageFailed(message.messageId);
        }
    }
    
    function retryFailedMessage(bytes32 messageId) external {
        Client.Any2EVMMessage memory message = failedMessages[messageId];
        // Retry processing
        this.processMessage(message);
        delete failedMessages[messageId];
    }
}
```

::: tip Official Guide
For complete defensive programming patterns and reprocessing failed messages:
[Programmable Token Transfers - Reprocessing Failed Messages](https://docs.chain.link/ccip/tutorials/evm/programmable-token-transfers-defensive#reprocessing-of-failed-messages)
:::

### Business Consistency Best Practices

To ensure business consistency across chains:

1. **Use `messageId` as idempotency key**: Store processed messageIds to prevent duplicate execution on retry
   
   ```solidity
   mapping(bytes32 => bool) public processedMessages;
   
   function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
       require(!processedMessages[message.messageId], "Already processed");
       processedMessages[message.messageId] = true;
       // ... process message
   }
   ```

2. **Two-phase processing**: First validate and record, then execute side effects. This allows safe retries.

3. **Compensating actions**: For complex workflows, design compensating transactions that can reverse partial operations if needed.

4. **Event logging**: Emit events for all cross-chain operations to enable off-chain monitoring and reconciliation.

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

### Message Execution Failed

**Error**: Transfer shows "Execution Failed" on CCIP Explorer

**Solution**:
1. Check CCIP Explorer for the failure reason
2. Common causes:
   - Receiver contract reverted
   - Insufficient gas limit
   - Receiver contract not deployed
3. Fix the root cause (e.g., fix receiver logic, redeploy contract)
4. Use [Manual Execution](https://docs.chain.link/ccip/tutorials/evm/manual-execution) to retry
5. **Important**: Ensure your receiver is idempotent before retrying

::: warning Before Retrying
Always verify that your receiver contract logic is fixed and handles the message correctly. Retrying without fixing the root cause will fail again.
:::

## Next Steps

- [Token Manager Guide](./ccip-token-manager) - Deploy your own cross-chain token
- [CCIP Network Information](./ccip-network-information) - Complete address reference
- [CCIP Overview](./ccip-overview) - Understand the architecture

## Additional Resources

- [Chainlink CCIP Token Transfer Docs](https://docs.chain.link/ccip/tutorials/evm/transfer-tokens-from-contract)
- [CCIP Billing](https://docs.chain.link/ccip/billing) - Detailed fee structure and billing rules
- [CCIP Supported Tokens](https://docs.chain.link/ccip/directory)
- [CCIP Explorer](https://ccip.chain.link/)
