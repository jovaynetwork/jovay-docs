---
outline: deep
---

# Chainlink Integration on Jovay

## Overview

Jovay natively integrates with Chainlink, the industry-leading decentralized oracle network, to provide developers with secure and reliable access to off-chain data and cross-chain communication capabilities.

Jovay currently supports two major Chainlink services:

- **[Data Streams](./data-streams)**: High-frequency, low-latency oracle data for DeFi applications
- **[CCIP (Cross-Chain Interoperability Protocol)](./ccip-overview)**: Secure cross-chain messaging and token transfers

## Chainlink Data Streams

Chainlink Data Streams provides pull-based, low-latency market data that is served off-chain and verified on-chain. This enables dApps to access high-frequency data on demand while maintaining trust minimization.

**Key Features:**
- Sub-second price updates
- Cryptographic verification on-chain
- Support for multiple trading pairs
- Suitable for perpetuals, options, and other latency-sensitive applications

[Learn more about Data Streams →](./data-streams)

## Chainlink CCIP

Chainlink Cross-Chain Interoperability Protocol (CCIP) provides a secure and reliable way to transfer data and tokens across different blockchains. Jovay supports CCIP for seamless interoperability with other major networks.

**Key Features:**
- Cross-chain message passing
- Token transfers between chains
- Programmable token transfers (tokens + data)
- Multiple fee payment options (LINK, ETH, WETH)

**Supported Networks:**
- Jovay ↔ Ethereum
- Jovay ↔ Polygon

[Learn more about CCIP →](./ccip-overview)

## Quick Links

| Service | Documentation | Official Resources |
|---------|--------------|-------------------|
| Data Streams | [Integration Guide](./data-streams) | [Chainlink Docs](https://docs.chain.link/data-streams) |
| CCIP Overview | [CCIP Overview](./ccip-overview) | [Chainlink CCIP Docs](https://docs.chain.link/ccip) |
| CCIP Message Transfer | [Message Guide](./ccip-message-transfer) | [CCIP Tutorials](https://docs.chain.link/ccip/tutorials) |
| CCIP Token Transfer | [Token Guide](./ccip-token-transfer) | [Token Transfer Docs](https://docs.chain.link/ccip/tutorials/evm/transfer-tokens-from-contract) |
| Token Manager | [Token Manager Guide](./ccip-token-manager) | [Token Manager](https://tokenmanager.chain.link/) |
| CCIP Network Info | [Network Information](./ccip-network-information) | [CCIP Directory](https://docs.chain.link/ccip/directory/mainnet/chain/jovay-mainnet) |

## Getting Started

### For Data Streams
1. Apply for [Chainlink API credentials](https://chainlinkcommunity.typeform.com/datastreams)
2. Follow the [Data Streams integration guide](./data-streams)

### For CCIP
1. Review the [CCIP Overview](./ccip-overview) to understand the architecture
2. Choose your use case:
   - [Message Transfer](./ccip-message-transfer) for cross-chain data
   - [Token Transfer](./ccip-token-transfer) for cross-chain assets
   - [Token Manager](./ccip-token-manager) for deploying cross-chain tokens
3. Check [Network Information](./ccip-network-information) for contract addresses
