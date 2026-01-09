---
outline: deep
---

# Chainlink CCIP Overview

## What is CCIP?

Chainlink Cross-Chain Interoperability Protocol (CCIP) is a secure and reliable protocol that enables cross-chain communication between different blockchains. CCIP allows developers to build cross-chain applications that can transfer data and tokens across multiple networks.

Jovay has integrated Chainlink CCIP, enabling seamless interoperability with Ethereum, Polygon, and other supported networks.

::: tip Official Documentation
For comprehensive Chainlink CCIP documentation, visit:  
[https://docs.chain.link/ccip](https://docs.chain.link/ccip)
:::

## CCIP Architecture

The following diagram illustrates how CCIP enables cross-chain communication:

![Chainlink CCIP Architecture](/Images/chainlink-integration/chainlink-ccip-arch-with-jovay.svg)

### Key Components

| Component | Description |
|-----------|-------------|
| **Router** | The main entry point for CCIP on each chain. Applications interact with the Router to send cross-chain messages. |
| **OnRamp** | Handles outgoing messages from the source chain. Validates and prepares messages for cross-chain transmission. |
| **OffRamp** | Handles incoming messages on the destination chain. Delivers messages to the target contract. |
| **DON** | Decentralized Oracle Network that securely transmits messages between chains. |
| **RMN** | Risk Management Network that monitors and validates cross-chain transactions for security. |

## CCIP Use Cases

### 1. Cross-Chain Messaging

Send arbitrary data between smart contracts on different blockchains. This enables:

- Cross-chain governance voting
- Multi-chain state synchronization
- Cross-chain notifications and triggers

[Learn how to send cross-chain messages →](./ccip-message-transfer)

### 2. Token Transfers

Transfer tokens securely between supported blockchains:

- Move tokens between Jovay and Ethereum
- Move tokens between Jovay and Polygon
- Support for multiple token types

[Learn how to transfer tokens cross-chain →](./ccip-token-transfer)

### 3. Programmable Token Transfers

Combine token transfers with arbitrary data in a single transaction:

- Transfer tokens and execute logic on the destination chain
- Build complex cross-chain DeFi applications
- Enable cross-chain NFT minting with payment

## Sender and Receiver Contracts

To use CCIP, you need to implement Sender and Receiver contracts that interact with the CCIP Router.

### Sender Contract

The Sender contract initiates cross-chain messages from the source chain:

```solidity
// Simplified Sender contract structure
contract Sender {
    IRouterClient private router;
    IERC20 private linkToken;
    
    constructor(address _router, address _link) {
        router = IRouterClient(_router);
        linkToken = IERC20(_link);
    }
    
    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        string calldata text
    ) external returns (bytes32 messageId) {
        // 1. Build the CCIP message
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(text),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: address(linkToken)
        });
        
        // 2. Get the fee required
        uint256 fee = router.getFee(destinationChainSelector, message);
        
        // 3. Approve and send
        linkToken.approve(address(router), fee);
        messageId = router.ccipSend(destinationChainSelector, message);
    }
}
```

### Receiver Contract

The Receiver contract handles incoming cross-chain messages on the destination chain:

```solidity
// Simplified Receiver contract structure
contract Receiver is CCIPReceiver {
    bytes32 public lastMessageId;
    string public lastMessage;
    
    constructor(address _router) CCIPReceiver(_router) {}
    
    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        // 1. Store message details
        lastMessageId = message.messageId;
        
        // 2. Decode and process the message data
        lastMessage = abi.decode(message.data, (string));
        
        // 3. Execute your custom logic here
    }
}
```

## Supported Networks

Jovay CCIP currently supports cross-chain communication with:

| Network | Direction | Status |
|---------|-----------|--------|
| Ethereum | Jovay ↔ Ethereum | Active |
| Polygon | Jovay ↔ Polygon | Active |

For the complete list of supported networks and their configurations, see the [CCIP Network Information](./ccip-network-information) page or visit the [CCIP Directory](https://docs.chain.link/ccip/directory/mainnet/chain/jovay-mainnet).

## Fee Payment Options

CCIP supports multiple fee payment options on Jovay:

| Token | Description |
|-------|-------------|
| **LINK** | Chainlink's native token, recommended for most use cases |
| **ETH** | Native gas token of Jovay (pay via `msg.value`) |
| **WETH** | Wrapped ETH (ERC20 version, approve then transfer) |

::: info CCIP Billing Details
CCIP fees consist of blockchain fees (gas costs) and network fees (DON operator fees). Using LINK for fee payment often provides better rates. For detailed billing rules and fee calculations, see [CCIP Billing](https://docs.chain.link/ccip/billing).
:::

### Paying with LINK

Set `feeToken` to the LINK token address and approve the Router to spend LINK:

```solidity
Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
    receiver: abi.encode(receiver),
    data: abi.encode(text),
    tokenAmounts: new Client.EVMTokenAmount[](0),
    extraArgs: "",
    feeToken: address(linkToken)  // LINK address
});

uint256 fee = router.getFee(destinationChainSelector, message);
linkToken.approve(address(router), fee);
router.ccipSend(destinationChainSelector, message);
```

### Paying with Native Token (ETH)

Set `feeToken` to `address(0)` and send ETH via `msg.value`:

```solidity
Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
    receiver: abi.encode(receiver),
    data: abi.encode(text),
    tokenAmounts: new Client.EVMTokenAmount[](0),
    extraArgs: "",
    feeToken: address(0)  // Use native token
});

uint256 fee = router.getFee(destinationChainSelector, message);
router.ccipSend{value: fee}(destinationChainSelector, message);
```

::: tip Official Guide
For a complete tutorial on paying fees with native tokens, see the Chainlink documentation:
[Transfer Tokens and Pay in Native](https://docs.chain.link/ccip/tutorials/evm/transfer-tokens-from-contract#transfer-tokens-and-pay-in-native)
:::

::: tip Fee Estimation
Always call `router.getFee()` before sending a message to get the exact fee required. Fees vary based on message size, destination chain, and network conditions.
:::

## Getting Started

Ready to build with CCIP on Jovay? Follow these guides:

1. **[Message Transfer](./ccip-message-transfer)**: Learn how to send cross-chain messages
2. **[Token Transfer](./ccip-token-transfer)**: Learn how to transfer tokens between chains
3. **[Token Manager](./ccip-token-manager)**: Deploy your own cross-chain token
4. **[Network Information](./ccip-network-information)**: Find contract addresses and chain selectors

## Additional Resources

- [Chainlink CCIP Documentation](https://docs.chain.link/ccip)
- [CCIP Billing](https://docs.chain.link/ccip/billing) - Detailed fee structure and billing rules
- [CCIP Explorer](https://ccip.chain.link/) - Track cross-chain transactions
- [CCIP Directory](https://docs.chain.link/ccip/directory/mainnet/chain/jovay-mainnet) - Jovay CCIP configuration
- [Chainlink Faucet](https://faucets.chain.link/) - Get testnet LINK tokens
