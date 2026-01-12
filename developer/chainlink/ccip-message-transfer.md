---
outline: deep
---

# CCIP Cross-Chain Message Transfer

This guide walks you through sending cross-chain messages between Jovay and other supported networks using Chainlink CCIP.

## Overview

Cross-chain messaging allows you to send arbitrary data from a smart contract on one blockchain to a smart contract on another blockchain. This is the foundation for building cross-chain applications.

**What you'll learn:**
- Deploy a Sender contract on the source chain
- Deploy a Receiver contract on the destination chain
- Send a cross-chain message
- Verify message delivery

::: tip Example Scenario
This guide demonstrates sending a message from **Ethereum Sepolia** to **Jovay Testnet**. The same process applies to mainnet and other supported networks.
:::

## Prerequisites

Before you begin, ensure you have:

1. **Wallet Setup**: MetaMask or another Web3 wallet configured for both networks
2. **Test Tokens**: 
   - ETH on the source chain (for gas)
   - LINK tokens on the source chain (for CCIP fees)
3. **Development Environment**: [Remix IDE](https://remix.ethereum.org/) or your preferred development framework

::: info Get Test Tokens
- **Sepolia ETH**: Use a [Sepolia faucet](https://sepoliafaucet.com/)
- **LINK Tokens**: Use the [Chainlink Faucet](https://faucets.chain.link/)
- **Jovay Testnet ETH**: Use the [Jovay Faucet](https://zan.top/faucet/jovay)
:::

## Step 1: Deploy the Sender Contract

The Sender contract initiates cross-chain messages from the source chain.

### 1.1 Open the Contract in Remix

Open the official Chainlink Sender contract example directly in Remix:

[Open Sender.sol in Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/CCIP/Sender.sol&autoCompile=true)

### 1.2 Configure Constructor Parameters

When deploying the Sender contract, you need to provide:

| Parameter | Description | Ethereum Sepolia Value |
|-----------|-------------|----------------------|
| `_router` | CCIP Router address | `0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59` |
| `_link` | LINK token address | `0x779877A7B0D9E8603169DdbD7836e478b4624789` |

::: tip Find Addresses
You can find Router and LINK addresses for any supported chain in the [CCIP Directory](https://docs.chain.link/ccip/directory).
:::

### 1.3 Deploy to Source Chain

1. Connect your wallet to **Ethereum Sepolia** in Remix
2. Compile the contract (Solidity 0.8.19+)
3. Deploy with the constructor parameters above
4. **Record the deployed contract address**

## Step 2: Deploy the Receiver Contract

The Receiver contract handles incoming messages on the destination chain.

### 2.1 Open the Contract in Remix

Open the official Chainlink Receiver contract example:

[Open Receiver.sol in Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/CCIP/Receiver.sol&autoCompile=true)

### 2.2 Configure Constructor Parameters

| Parameter | Description | Jovay Testnet Value |
|-----------|-------------|-------------------|
| `_router` | CCIP Router address | `0x2016AA303B331bd739Fd072998e579a3052500A6` |

### 2.3 Deploy to Destination Chain

1. Switch your wallet to **Jovay Testnet**
2. Compile and deploy the contract
3. **Record the deployed contract address**

## Step 3: Fund the Sender Contract

The Sender contract needs fee tokens (LINK or native ETH) to pay for CCIP fees.

### 3.1 Transfer LINK to Sender

Send LINK tokens to your deployed Sender contract address:

1. Open your LINK token contract on Etherscan
2. Call `transfer()` to send LINK to the Sender contract
3. Recommended amount: **0.1 LINK** for testing (You likely don't need this much; you can determine the exact amount needed based on any "InsufficientLinkBalance" error you encounter when sending a cross-chain message.)

::: warning Ensure Sufficient Balance
If the Sender contract doesn't have enough LINK, the cross-chain message will fail. Check the fee estimate before sending.
:::

::: info CCIP Billing
CCIP fees include blockchain fees and network fees. Using LINK for payment often provides better rates than native tokens. For detailed billing rules, see [CCIP Billing](https://docs.chain.link/ccip/billing).
:::

### 3.2 Alternative: Pay with Native Token (ETH)

Instead of LINK, you can pay fees with native ETH. To do this:

1. Send ETH to your Sender contract instead of LINK
2. Modify the message to set `feeToken` to `address(0)`
3. Call `ccipSend` with the fee amount in `msg.value`

```solidity
// Example: paying with native ETH
Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
    receiver: abi.encode(receiver),
    data: abi.encode(text),
    tokenAmounts: new Client.EVMTokenAmount[](0),
    extraArgs: "",
    feeToken: address(0)  // address(0) means native token
});

uint256 fees = router.getFee(destinationChainSelector, message);
router.ccipSend{value: fees}(destinationChainSelector, message);
```

::: tip Official Guide
For more details on fee payment options, see the Chainlink documentation:
[Transfer Tokens and Pay in Native](https://docs.chain.link/ccip/tutorials/evm/transfer-tokens-from-contract#transfer-tokens-and-pay-in-native)
:::

## Step 4: Send a Cross-Chain Message

Now you're ready to send a message from Ethereum Sepolia to Jovay Testnet.

### 4.1 Call sendMessage

On your deployed Sender contract, call the `sendMessage` function:

```solidity
function sendMessage(
    uint64 destinationChainSelector,
    address receiver,
    string calldata text
) external onlyOwner returns (bytes32 messageId)
```

**Parameters:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| `destinationChainSelector` | `945045181441419236` | Jovay Testnet chain selector |
| `receiver` | Your Receiver contract address | The contract that will receive the message |
| `text` | `"Hello from Ethereum!"` | Your message content |

### 4.2 Confirm the Transaction

1. Confirm the transaction in your wallet
2. Wait for the transaction to be mined
3. **Record the transaction hash** for tracking

## Step 5: Track the Message

### 5.1 Use CCIP Explorer

Track your cross-chain message status on the [CCIP Explorer](https://ccip.chain.link/):

1. Go to [https://ccip.chain.link/](https://ccip.chain.link/)
2. Enter your source transaction hash or message ID
3. Monitor the message status

**Message Status Stages:**

| Status | Description |
|--------|-------------|
| **Waiting for Finality** | Message is being confirmed on source chain |
| **Executing** | DON is transmitting the message |
| **Success** | Message delivered to destination chain |

::: info Processing Time
Cross-chain messages typically take **some minutes** to complete, depending on source chain finality requirements.
:::

### 5.2 Verify Message Receipt

Once the status shows "Success", verify the message on the destination chain:

1. Open your Receiver contract on Jovay Explorer
2. Call `getLastReceivedMessageDetails()` function
3. Verify the received message matches what you sent

```solidity
function getLastReceivedMessageDetails()
    external
    view
    returns (bytes32 messageId, string memory text)
```

## Complete Example

Here's a summary of a successful cross-chain message:

| Step | Chain | Action | Example Value |
|------|-------|--------|---------------|
| 1 | Ethereum Sepolia | Deploy Sender | `0x7f6f...d492` |
| 2 | Jovay Testnet | Deploy Receiver | `0x32D5...EDbE` |
| 3 | Ethereum Sepolia | Fund Sender with LINK | 0.5 LINK |
| 4 | Ethereum Sepolia | Call sendMessage | - |
| 5 | CCIP Explorer | Track message | `0x57df...3f48` |
| 6 | Jovay Testnet | Verify receipt | "Hello from Ethereum!" |

## Sending from Jovay to Other Chains

You can also send messages **from Jovay** to other chains. The process is the same:

1. Deploy Sender on **Jovay**
2. Deploy Receiver on the **destination chain**
3. Use the appropriate chain selector

**Chain Selectors for Destinations:**

| Destination | Chain Selector |
|-------------|----------------|
| Ethereum Sepolia | `16015286601757825753` |
| Ethereum Mainnet | See [CCIP Directory](https://docs.chain.link/ccip/directory) |
| Polygon | See [CCIP Directory](https://docs.chain.link/ccip/directory) |

## Failure Handling and Message Recovery

Cross-chain messages can fail at the destination chain. Understanding failure scenarios and recovery options is essential for building reliable cross-chain applications.

### What Happens When a Message Fails?

When a CCIP message is delivered to the destination chain, the `_ccipReceive` function in your receiver contract is executed. If this execution **reverts**, the message enters a **failed state**.

**Important**: Failed messages are not lost. They can be retried through manual execution.

::: danger No Source Chain Cancellation
**There is no cancellation mechanism on the source chain.** Once a CCIP message is sent, it cannot be cancelled or recalled. The message will eventually be delivered to the destination chain.

This means your **only recourse** for handling failures is:
1. **Defensive receiver pattern** - Must be implemented **in advance** on your receiver contract to handle failures gracefully
2. **Manual execution retry** - Only helps with **transitory failures** (e.g., temporary gas issues, contract not yet deployed)

If your receiver contract has a permanent bug that causes reverts, retrying via CCIP Explorer will fail repeatedly. You must fix the receiver logic first, or if you implemented the defensive pattern, use it to recover and reprocess the message.
:::

### Failure Scenarios

| Scenario | Cause | Recovery |
|----------|-------|----------|
| **Receiver reverts** | Bug in `_ccipReceive` logic, assertion failure | Fix receiver logic, then manually execute |
| **Out of gas** | `gasLimit` in extraArgs too low | Retry with higher gas via manual execution |
| **Contract not deployed** | Receiver address has no code | Deploy receiver, then manually execute |

### Manual Execution (Retry Failed Messages)

When a message fails on the destination chain, you can manually trigger re-execution. **This only helps with transitory failures**—situations where the failure was temporary and can be resolved.

**When manual execution helps:**
- Contract was not deployed yet → Deploy it, then retry
- Gas limit was too low → Retry with higher gas override
- Temporary network congestion → Simply retry

**When manual execution does NOT help:**
- Permanent bug in receiver logic → Must fix and redeploy the receiver first
- Receiver lacks defensive pattern → Cannot gracefully handle/store the failed message

**Steps to retry:**
1. **Find the failed message** on [CCIP Explorer](https://ccip.chain.link/)
2. **Fix the root cause** (e.g., deploy missing contract, fix and redeploy receiver)
3. **Manually execute** the message via CCIP Explorer or programmatically

::: tip Official Guide
For step-by-step instructions on retrying failed messages:
[Manual Execution Guide](https://docs.chain.link/ccip/tutorials/evm/manual-execution)
:::

### Defensive Receiver Pattern

::: warning Must Be Implemented In Advance
The defensive receiver pattern **must be deployed before** you start receiving cross-chain messages. You cannot add this pattern after a message has already failed—by then, the message is stuck in a failed state that your original receiver cannot handle.
:::

Implement a defensive pattern that stores failed messages for later retry:

```solidity
contract DefensiveReceiver is CCIPReceiver {
    mapping(bytes32 => Client.Any2EVMMessage) public failedMessages;
    mapping(bytes32 => bool) public processedMessages;
    
    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        // Idempotency check
        require(!processedMessages[message.messageId], "Already processed");
        
        try this.processMessage(message) {
            processedMessages[message.messageId] = true;
        } catch {
            // Store for later retry
            failedMessages[message.messageId] = message;
            emit MessageFailed(message.messageId);
        }
    }
    
    function retryFailedMessage(bytes32 messageId) external {
        Client.Any2EVMMessage memory message = failedMessages[messageId];
        require(message.messageId != bytes32(0), "Message not found");
        
        this.processMessage(message);
        processedMessages[messageId] = true;
        delete failedMessages[messageId];
    }
}
```

::: tip Official Guide
For complete defensive programming patterns:
[Programmable Token Transfers - Reprocessing Failed Messages](https://docs.chain.link/ccip/tutorials/evm/programmable-token-transfers-defensive#reprocessing-of-failed-messages)
:::

### Business Consistency Best Practices

To ensure consistency in cross-chain workflows:

1. **Use `messageId` as idempotency key**: Prevent duplicate processing on retries

2. **Two-phase processing**: Validate and record first, execute side effects second

3. **Compensating actions**: Design rollback mechanisms for complex multi-step workflows

4. **Off-chain monitoring**: Use events and indexers to track cross-chain state

## Troubleshooting

### Insufficient LINK Balance

**Error**: Transaction reverts when calling `sendMessage`

**Solution**: Ensure your Sender contract has enough LINK tokens. Check the required fee by calling:

```solidity
router.getFee(destinationChainSelector, message)
```

### Message Not Received

**Issue**: Message shows "Success" but Receiver has no data

**Possible Causes**:
- Receiver contract not properly deployed
- Wrong receiver address in sendMessage
- Check if `_ccipReceive` function executed correctly

### Transaction Stuck

**Issue**: Message stuck in "Waiting for Finality"

**Solution**: This is normal for chains with longer finality times. Wait for the source chain to reach the required confirmation depth.

### Message Execution Failed

**Issue**: Message shows "Execution Failed" on CCIP Explorer

**Solution**:
1. Check CCIP Explorer for the failure reason
2. Common causes:
   - Receiver contract `_ccipReceive` reverted
   - Insufficient gas limit in `extraArgs`
   - Receiver contract not deployed at the specified address
3. Fix the root cause
4. Use [Manual Execution](https://docs.chain.link/ccip/tutorials/evm/manual-execution) to retry
5. Ensure your receiver handles retries correctly (idempotency)

::: warning Before Retrying
Verify your receiver contract is fixed and can handle the message. Also ensure the receiver is idempotent—retrying the same message should not cause duplicate side effects.
:::

## Next Steps

- [Token Transfer Guide](./ccip-token-transfer) - Learn to transfer tokens cross-chain
- [Token Manager Guide](./ccip-token-manager) - Deploy your own cross-chain token
- [CCIP Network Information](./ccip-network-information) - Complete list of addresses and selectors

## Additional Resources

- [Chainlink CCIP Documentation](https://docs.chain.link/ccip)
- [CCIP Billing](https://docs.chain.link/ccip/billing) - Detailed fee structure and billing rules
- [CCIP Best Practices](https://docs.chain.link/ccip/best-practices)
- [CCIP Explorer](https://ccip.chain.link/)
