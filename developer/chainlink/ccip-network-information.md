---
outline: deep
---

# CCIP Network Information

This page provides comprehensive network configuration details for using Chainlink CCIP on Jovay.

## Jovay Mainnet

::: tip Official Reference
For the most up-to-date information, visit the [CCIP Directory - Jovay Mainnet](https://docs.chain.link/ccip/directory/mainnet/chain/jovay-mainnet).
:::

### Core Contracts

| Contract | Address |
|----------|---------|
| **Router** | `0x4926...CE34` |
| **Chain Selector** | `1523760397290643893` |
| **RMN** | `0xf09A...5E13` |
| **Token Admin Registry** | `0xA270...3F8B` |
| **Registry Module Owner** | `0xf4a1...5196` |

::: info Complete Addresses
The addresses shown above are truncated. Visit the [CCIP Directory](https://docs.chain.link/ccip/directory/mainnet/chain/jovay-mainnet) to view and copy the complete contract addresses.
:::

### Fee Tokens

Jovay Mainnet supports the following tokens for paying CCIP fees:

| Token | Address | Description |
|-------|---------|-------------|
| **LINK** | `0x76a4...eb40` | Chainlink native token (recommended) |
| **WETH** | `0xeA29...a241` | Wrapped Ether (ERC20) |
| **ETH** | Native | Native gas token |

### Supported Cross-Chain Lanes

| Destination Network | OnRamp Address | Version |
|--------------------|----------------|---------|
| **Ethereum** | `0x9b04...47cC` | 1.6.0 |
| **Polygon** | `0x9b04...47cC` | 1.6.0 |

### Supported Tokens

| Token | Status |
|-------|--------|
| **LINK** | Supported |

For the complete list of supported tokens, check the [CCIP Directory](https://docs.chain.link/ccip/directory/mainnet/chain/jovay-mainnet).

---

## Jovay Testnet

For the most up-to-date details, refer to the CCIP documentation: [Jovay Testnet CCIP Directory](https://docs.chain.link/ccip/directory/testnet/chain/jovay-testnet).


### Core Contracts

| Contract | Address |
|----------|---------|
| **Router** | `0x2016...00A6` |
| **Chain Selector** | `945045181441419236` |
| **LINK Token** | `0xd3e4...6Dd1` |

### Test Tokens

| Token | Address | Description |
|-------|---------|-------------|
| **CCIP-BnM** | `0xB45B9eb94F25683B47e5AFb0f74A05a58be86311` | Burn & Mint test token |
| **LINK** | `0xd3e461C55676B10634a5F81b747c324B85686Dd1` | Chainlink test token |

### Getting Testnet Tokens

| Token | How to Obtain |
|-------|---------------|
| **Jovay ETH** | [Jovay Faucet](https://zan.top/faucet/jovay) |
| **LINK** | [Chainlink Faucet](https://faucets.chain.link/) |
| **CCIP-BnM** | [CCIP Test Tokens Page](https://docs.chain.link/ccip/test-tokens) |

---

## Other Network References

### Ethereum Sepolia (Testnet)

| Contract | Address |
|----------|---------|
| **Router** | `0x0BF3...3A59` |
| **Chain Selector** | `16015286601757825753` |
| **LINK Token** | `0x7798...4789` |
| **CCIP-BnM** | `0xFd57...2a05` |

### Polygon Amoy (Testnet)

| Contract | Address |
|----------|---------|
| **Router** | See [CCIP Directory](https://docs.chain.link/ccip/directory/testnet/chain/polygon-testnet-amoy) |
| **Chain Selector** | See [CCIP Directory](https://docs.chain.link/ccip/directory/testnet/chain/polygon-testnet-amoy) |

---

## Chain Selectors Quick Reference

Chain selectors are unique identifiers used by CCIP to identify destination chains.

### Testnet Chain Selectors

| Network | Chain Selector |
|---------|----------------|
| **Jovay Testnet** | `945045181441419236` |
| **Ethereum Sepolia** | `16015286601757825753` |

### Mainnet Chain Selectors

| Network | Chain Selector |
|---------|----------------|
| **Jovay Mainnet** | `1523760397290643893` |

For other networks, refer to the [CCIP Directory](https://docs.chain.link/ccip/directory).

---

## Fee Payment Reference

### Supported Fee Tokens by Network

| Network | LINK | Native (ETH) | Wrapped Native (WETH) |
|---------|------|--------------|----------------------|
| Jovay Mainnet | ✅ | ✅ | ✅ |
| Jovay Testnet | ✅ | ✅ | ✅ |

### Fee Estimation

Always estimate fees before sending transactions:

```solidity
// Get fee estimate
uint256 fee = router.getFee(
    destinationChainSelector,
    message
);
```

---

## Useful Links

### Official Chainlink Resources

| Resource | Link |
|----------|------|
| **CCIP Documentation** | [https://docs.chain.link/ccip](https://docs.chain.link/ccip) |
| **CCIP Directory (Mainnet)** | [https://docs.chain.link/ccip/directory/mainnet](https://docs.chain.link/ccip/directory/mainnet) |
| **CCIP Directory (Testnet)** | [https://docs.chain.link/ccip/directory/testnet](https://docs.chain.link/ccip/directory/testnet) |
| **Jovay CCIP Page** | [https://docs.chain.link/ccip/directory/mainnet/chain/jovay-mainnet](https://docs.chain.link/ccip/directory/mainnet/chain/jovay-mainnet) |
| **CCIP Explorer** | [https://ccip.chain.link/](https://ccip.chain.link/) |
| **Chainlink Faucet** | [https://faucets.chain.link/](https://faucets.chain.link/) |

### Jovay Resources

| Resource | Link |
|----------|------|
| **Jovay Explorer (Mainnet)** | [https://explorer.jovay.io](https://explorer.jovay.io) |
| **Jovay Explorer (Testnet)** | [https://sepolia-explorer.jovay.io](https://sepolia-explorer.jovay.io) |
| **Jovay Faucet** | [https://zan.top/faucet/jovay](https://zan.top/faucet/jovay) |
| **Jovay RPC (Mainnet)** | `https://rpc.jovay.io` |
| **Jovay RPC (Testnet)** | `https://api.zan.top/public/jovay-testnet` |

### Token Manager

| Environment | Link |
|-------------|------|
| **Mainnet** | [https://tokenmanager.chain.link/](https://tokenmanager.chain.link/) |
| **Testnet** | [https://test.tokenmanager.chain.link/](https://test.tokenmanager.chain.link/) |

---

## Related Documentation

- [CCIP Overview](./ccip-overview) - Understanding CCIP architecture
- [Message Transfer Guide](./ccip-message-transfer) - Send cross-chain messages
- [Token Transfer Guide](./ccip-token-transfer) - Transfer tokens cross-chain
- [Token Manager Guide](./ccip-token-manager) - Deploy cross-chain tokens
- [Jovay Network Information](/developer/network-information) - General Jovay network details
