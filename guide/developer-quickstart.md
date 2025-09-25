---
outline: deep
---

# Developer Quickstart

Jovay is a cutting‑edge Layer 2 that delivers superior performance⚡ in throughput and latency while addressing critical security🔐 challenges. As an EVM‑equivalent Layer 2, Jovay remains fully compatible with the Ethereum ecosystem♻️.

This guide will walk you through the essential workflow for developing and deploying a basic Solidity smart contract on the Jovay network.

## 🎯 What You’ll Accomplish
* 🏅 Get familiar with the Jovay network and tooling.
* 🥈 Work through a basic Solidity development, deployment, and interaction cycle on Jovay.

## 🔧 Prerequisite
Here we assume that readers are already familiar with the concepts and usage of cryptocurrency. In order to successfully complete the tutorial, you need to be familiar with the usage of the following tools.

* 🛜 The [Chrome](https://www.google.com/intl/en/chrome/) explorer
* 💻 The [Solidity](https://soliditylang.org/) programming language
* 🦊 The [MetaMask](https://metamask.io/download) wallet
* 🦔 The [Remix](https://remix.ethereum.org/) development environment

## 🌐 Configure Your Wallet
First, you need to add the Jovay network to your MetaMask wallet.

Refer to the [MetaMask help document](https://support.metamask.io/configure/networks/how-to-add-a-custom-network-rpc/#adding-a-network-manually) and use the appropriate configuration below.

| Configuration | Testnet | Mainnet |
| :--- | :--- | :--- |
| **Network Name** | Jovay Testnet | Jovay Mainnet |
| **RPC URL** | `https://api.zan.top/public/jovay-testnet` | `https://rpc.jovay.io` |
| **Chain ID** | `2019775` | `5734951` |
| **Symbol** | ETH | ETH |
| **Block Explorer URL** | `https://sepolia-explorer.jovay.io/l2` | `https://explorer.jovay.io` |

For more detailed network information, please see the [Network Information](../developer/network-information.md) page.

> 💡**Tips:** We recommend adding the "Block explorer URL" part when you add network to metamask, but this is optional.

During the development phase, we recommend using the testnet. After completing development, testing, and a security audit, you can deploy to the Jovay Mainnet. Here’s how to configure the Jovay Testnet in MetaMask.

<div align="center"><img src="/Images/developer-quickstart/the-config-of-Jovay.png"></div><br>

<div align="center"><i>Figure 1: the Config of Jovay Testnet</i></div>

## 💸 Get Funds on Jovay
To pay for transaction fees on Jovay, you need its native asset, ETH. You can acquire ETH on Jovay using one of the following methods:

#### Method 1: Cross-Chain Bridge (Mainnet & Testnet)
The primary way to get ETH on Jovay is by bridging it from a Layer 1 network like Ethereum. This process involves locking your ETH on L1 and receiving an equivalent amount on Jovay.

For detailed instructions, please follow our complete [Jovay Bridge DApp Tutorial](./jovay-bridge-dapp-tutorial.md).

#### Method 2: Faucet (Testnet Only)
If you are working on the **Jovay Testnet**, you can get free testnet ETH from a public faucet. This is the quickest way to get started with development.

1. **Navigate to the Faucet**: Open the [ZAN Jovay Faucet](https://zan.top/faucet/jovay).
2. **Request Funds**: Follow the instructions on the site to receive testnet ETH in your wallet.
3. **Check Your Balance**: After a few moments, you should see the new balance in your MetaMask wallet.

## 🧪 Deploy a Smart Contract with Remix
This section will guide you through deploying and interacting with a simple "Hello World" style contract using the Remix IDE.

### Review demo contract code
Click the link below to open a pre-loaded demo contract in Remix:

**➡️** **[Open `JovayExample.sol` in Remix](https://remix.ethereum.org/?gist=5c78b4833454d2ccec498d600f253ccc)**

This contract, `JovayExample.sol`, has one state variable called `content`. You can call the function `SetContent` to update it and `GetContent` to view it.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract JovayExample {
    string private content = "welcome to Jovay";

    function SetContent(string memory _new_content) public {
        content = _new_content;
    }

    function GetContent() public view returns (string memory){
        return content;
    }
}
```

### Deploy contract
Before you start, switch your MetaMask to Jovay testnet and the Remix environment to MetaMask. Then on Remix, compile the contract and deploy it. In case you don't know how, Remix has a [guide](https://remix-ide.readthedocs.io/en/latest/run.html) for users.

After deployment, you can find your deployed contract like below. You can search your contract address on [Jovay explorer](https://sepolia-explorer.jovay.io/l2) and get the details.

<div align="center"><img src="/Images/developer-quickstart/a-deployed-demo-contract.png"></div><br>

<div align="center"><i>Figure 2: A Deployed Demo Contract</i></div>

### Interacting with deployed contract
Set the some string value in the input box. And click button `transact` to request the wallet to sign and send a transaction to Jovay testnet.

<div align="center"><img src="/Images/developer-quickstart/call-and-send-tx.png"></div><br>

<div align="center"><i>Figure 3: Call and Send Tx 🏎️</i></div>

Copy the transaction hash which you can find it from Remix console like below. Then search transaction hash on [Jovay explorer](https://sepolia-explorer.jovay.io/l2) and you can have more details. The transaction is going to be confirmed in seconds.

![Transaction Just Sent](/Images/developer-quickstart/transaction-just-sent.png)

<div align="center"><i>Figure 4: Transaction Just Sent</i></div>

After confirmation, your account balance will be reduced to pay the transaction fee. Checkout your MetaMask to see it. You will find Jovay is fast⚡️️ and cheap💸.

Then call the GetContent function to check the content value. You should get the updated value which set by sent transaction.

<div align="center"><img src="/Images/developer-quickstart/new-content.png"></div><br>

<div align="center"><i>Figure 5: New Content</i></div>

Now you understand that the smart contract development on Jovay is same as on Ethereum, and more smooth on Jovay☄️.

## Next Steps
Now that you're familiar with the basics of deploying contracts on Jovay, you can explore more advanced topics and tool-specific guides.

### 🛠️ Tool-Specific Tutorials
Learn how to build, test, and deploy an ERC-20 token using popular development frameworks:

* [Create a Token with Foundry](./token-foundry.md)
* [Create a Token with Hardhat](./token-hardhat.md)

### 🌉 Bridging Assets
If you need to move assets between Ethereum and Jovay, see our detailed bridging guide:

* [Jovay Bridge DApp Tutorial](./jovay-bridge-dapp-tutorial.md)