---
outline: deep
---

# Developer Quickstart
Jovay is a cutting‑edge Layer 2 that delivers superior performance⚡ in throughput and latency while addressing critical security🔐 challenges. As an EVM‑equivalent Layer 2, Jovay remains fully compatible with the Ethereum ecosystem♻️.

## 🎯 What You’ll Accomplish
By the time you’re done, you’ll have:

🏅: Worked through the basic Solidity development on Jovay. 

🥈: Worked through the ETH deposit and withdraw between Ethereum and Jovay.

🥉: Get familar with Jovay network and tooling.

## 🔧 Prerequisite
Here we assume that readers are already familiar with the concepts and usage of cryptocurrency. In order to successfully complete the tutorial, you need to be familiar with the usage of the following tools.

- 🛜 The [Chrome](https://www.google.com/intl/en/chrome/) explorer
- 💻 The [Solidity](https://soliditylang.org/) programming language
- 🦊 The [MetaMask](https://metamask.io/download) wallet
- 🦔 The [Remix](https://remix.ethereum.org/) development environment

## 💸 Get Funded on Jovay
In this section, we will introduce how to deposit ETH from Ethereum to Jovay. Users need to deposit ETH from Ethereum to Jovay so that they can use ETH to pay transaction fees in Jovay. 

If you don't want to experience the complete deposit process from Sepolia to Jovay, **you can just go to [faucet](https://zan.top/faucet/jovay) for Jovay testnet and get funded**. Finish the next part [Add networks](#add-networks) and then jump to next section [Smart Contract on Jovay](#smart-contract-on-jovay).

### Add networks
Here we will use Ethereum testnet Sepolia and Jovay testnet.

**Add Jovay**

First, go to zan.top to apply for an API key, please check the [document](https://docs.zan.top/docs/quick-start-guide).

Then, add the Jovay testnet to your MetaMask. Refer to the [MetaMask help document](https://support.metamask.io/configure/networks/how-to-add-a-custom-network-rpc/#adding-a-network-manually). The network information is as follows, replace `{{apiKey}}` with yours.
```
RPC URL: https://api.zan.top/node/v1/jovay/testnet/{{apiKey}}
Chain ID: 2019775
```
> 💡Tips: No need to setup the "Block explorer URL" part when you add network to metamask.
<div align="center">
  <img src="/Images/developer-quickstart/the-config-of-Jovay.png" >
</div>
<p align="center">
  <span style="font-size: 14px;">Figure 1: the Config of Jovay</span>
</p>

**Add Sepolia**
Finally，add the Sepolia to your MetaMask. MetaMask presets the network Sepolia. You can find Sepolia in the test networks on the network selection page.

<div align="center">
  <img src="/Images/developer-quickstart/preset-network.png" >
</div>
<p align="center">
  <span style="font-size: 14px;">Figure 2: Preset Network</span>
</p>

### Drips from faucets🚰
Go to [zan.top](https://zan.top/faucet/ethereum) to get your Sepolia testnet tokens. After completing this step, you can see your account balance on MetaMask.

There are other faucets if you can't receive tokens from zan.top faucet.
- [Infura](https://www.infura.io/faucet/linea)
- [GetBlock](https://getblock.io/faucet/eth-sepolia/)
- [hainstack](https://faucet.chainstack.com/sepolia-testnet-faucet)

### Review demo contract code
Click the link [remix](https://remix.ethereum.org/?gist=5c78b4833454d2ccec498d600f253ccc) to review the demo contract code. On your remix, you would find three files for this tutorial:

☝️ IL1ETHBridge.sol: The contract interface of Jovay Token Bridge on Layer1. 

<EnhancedCollapsibleCodeBlock 
  title="IL1ETHBridge.sol"
  language="solidity"
  :show-copy-button="true"
  :show-language-label="true"
  :default-expanded="false"
>

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IL1ETHBridge {

  /**
     * The sender account transfers funds to TokenBridge to lock the assets;
     * @param to_; L2 Receiver account address
     * @param amount_; assert amount
     * @param gasLimit_; gas limit on l2
     * @param data_; none
     */
  function deposit(address to_, uint256 amount_, uint256 gasLimit_, bytes memory data_) external payable;

  struct L2MsgProof {
    uint256 batchIndex;
    bytes merkleProof;
  }

  function relayMsgWithProof(
    uint256 value_,
    uint256 nonce_,
    bytes memory msg_,
    L2MsgProof memory proof_
  ) external payable;
}
```

</EnhancedCollapsibleCodeBlock>

✌️ IL2ETHBridge.sol: The contract interface of Jovay Token Bridge on Layer2.

<EnhancedCollapsibleCodeBlock 
  title="IL2ETHBridge.sol"
  language="solidity"
  :show-copy-button="true"
  :show-language-label="true"
  :default-expanded="false"
>

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IL2ETHBridge {
    /**
     * The sender account transfers to tokenbridge to lock the assets;
     * @param to_ target address
     * @param amount_ transfer amount
     * @param gasLimit_ gas limit
     * @param data_ data
     */
    function withdraw(address to_, uint256 amount_, uint256 gasLimit_, bytes memory data_) external payable;
}
```

</EnhancedCollapsibleCodeBlock>

🤟 JovayExample.sol: A demo contract to show the experience of Solidity development on Jovay.

<EnhancedCollapsibleCodeBlock 
  title="JovayExample.sol"
  language="solidity"
  :show-copy-button="true"
  :show-language-label="true"
  :default-expanded="false"
>

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

</EnhancedCollapsibleCodeBlock>

💡 tips: If you not familar with remix usage, please check out the help document.

### Call contract to deposit
You need to send a transaction for calling the Token Bridge on Sepolia to trigger the crosschain deposit process, so here we go☄️.

1. **Connect your remix to Sepolia with MetaMask.**

    Switch your MetaMask to network **Sepolia**.

    Back to remix, click the button "`Deploy & run transactions`" on the left side bar. Then choose the "`Environment`" and pick the "`Injected Provider - MetaMask`".

2. **Compile the contract IL1ETHBridge.sol**

    Select the `IL1ETHBridge.sol` on file explorer of Remix. Then click the "`Solidity compliers`" button and click the "`Compile IL1ETHBridge.sol`" to get the compiled code ready.

3. **Attach the deployed Token Bridge contract.**

    The Token Bridge address on Sepolia is `0x940eFB877281884699176892B02A3db49f29CDE8`.

    Back to Remix "`Deploy & run transactions`", Fill in the Token Bridge address into the input box next to "`At address`", then click "`At address`". And you can see that the contract has been added under "`Deployed Contracts`".

4. **Call function deposit**

    Like below, input the parameters and click the transact. 
    
    <div align="center">
        <img src="/Images/developer-quickstart/deposit-function.png" >
    </div>
    <p align="center">
        <span style="font-size: 14px;">Figure 3: Dposit Function</span>
    </p>

    Parameters describe here:

    - **to_**: The target address on Jovay to receive the deposited ETH. For example, your current MetaMask address. 

    - **amount_**: Amount in wei to transfer to the deposit target. Ensure your Sepolia account has sufficient balance. For example *`0.001 ether` (`1000000000000000 wei`)*. 

    - **gasLimit_**: The gas limit to be used for the Jovay transfer transaction associated with L1. Must be greater than 1,200,000 to ensure sufficient gas on Jovay. Recommanded `1200000`.

    - **data**: Message delivered with this deposit from Ethereum to Jovay. But here just input `0x`.

    - **value in transaction**: The deposit ether value in transaction must cover the cost of the crosschain gas limit and the transfer amount. Now the price in Token Bridge is `0.01gwei`, if your gasLimit is `1200000` and your amount is `x`, the your value with transaction should greater or equal to value `x + 1200000 * 1e7`. For example `x` is *`0.001 ether` (`1000000000000000 wei`)* and value can be *`10012000000000000 wei`*.<br>

        Fill in your value into the input box above the function area, such as the one shown in the picture below:

        <div align="center">
            <img src="/Images/developer-quickstart/value-for-transation.png" >
        </div>
        <p align="center">
            <span style="font-size: 14px;">Figure 4: Value for Transation</span>
        </p>

        Click the <span style="color: red;"><B>transact</B></span> button and MetaMask would sign and send your transaction to Sepolia.

        After your deposit transaction is packaged on Sepolia, you would see its details on [Jovay explorer](https://sepolia-explorer.jovay.io/l2). Search the deposit detail by your Sepolia transaction hash on [Sepolia explorer](https://sepolia.etherscan.io/).

        ![Deposit Transaction on Sepolia](/Images/developer-quickstart/deposit-transaction-on-sepolia.png)

        <p align="center">
            <span style="font-size: 14px;">Figure 5: Deposit Transaction on Sepolia</span>
        </p>

        After Sepolia transaction finalized, your deposit would be relayed to Jovay testnet. This process may take up to 13~20 minutes. Once the deposit is confirmed on Jovay, an Jovay transaction hash will be displayed instead of a pending claim.

        ![Finalize Deposit Transaction on Jovay](/Images/developer-quickstart/finalize-deposit-transaction-on-jovay.png)

        <p align="center">
            <span style="font-size: 14px;">Figure 6: Finalize Deposit Transaction on Jovay</span>
        </p>

5. **Check your balance on Jovay**

    Switch your MetaMask network to Jovay testnet. And you would find that the balance of your account changed.
    <div align="center">
        <img src="/Images/developer-quickstart/check-your-balance-on-jovay.png" >
    </div>

## 🧪 Smart Contract on Jovay
We encourage developers to deploy and test smart contracts on Jovay. This section will introduce how to deploy and invoke smart contracts compiled as native EVM bytecode on Jovay.

We gonna to use remix to deploy a solidity demo smart contract and call it. And you can also use common development tools, such as foundry and hardhat, etc. Jovay is totally compatible with ethereum json rpc and its other standards.
 
### Deploy contract

We provide a demo contract JovayExample.sol which you can found in the upper section '**[Review demo contract code](#review-demo-contract-code)**'. Also you can click share [link](https://remix.ethereum.org/?gist=5c78b4833454d2ccec498d600f253ccc) again and go to Remix to see it.

Contract JovayExample only have one state variable called '`content`'. You can call the function '`SetContent`' to update it and function 'GetContent' to show it.

Before you start, switch your MetaMask to Jovay testnet and the Remix environment to MetaMask. Then on Remix, compile the contract and deploy it. In case you don't know how, Remix has a [guide](https://remix-ide.readthedocs.io/en/latest/run.html) for users.

After deployment, you can find your deployed contract like below. You can search your contract address on [Jovay explorer](https://sepolia-explorer.jovay.io/l2) and get the details.

<div align="center">
  <img src="/Images/developer-quickstart/a-deployed-demo-contract.png">
</div>
<p align="center">
    <span style="font-size: 14px;">Figure 7: A Deployed Demo Contract</span>
</p>

### Interacting with deployed contract
Set the some string value in the input box. And click button  transact  to request the wallet to sign and send a transaction to Jovay testnet.

<div align="center">
  <img src="/Images/developer-quickstart/call-and-send-tx.png" >
</div>
<p align="center">
    <span style="font-size: 14px;">Figure 8: Call and Send Tx</span>
</p>

Copy the transaction hash which you can find it from Remix console like below. Then search transaction hash on [Jovay explorer](https://sepolia-explorer.jovay.io/l2) and you can have more details. The transaction gonna to be confirmed in seconds.

![Transaction Just Sent](/Images/developer-quickstart/transaction-just-sent.png)
<p align="center">
    <span style="font-size: 14px;">Figure 9: Transaction Just Sent</span>
</p>

After confirmation, your account balance will be reduced to pay the transaction fee. Checkout your MetaMask to see it. You will find Jovay is fast⚡️ and cheap💸.

Then call the GetContent function to check the content value. You should get the updated value which set by sent transaction.

<div align="center">
  <img src="/Images/developer-quickstart/new-content.png" >
</div>
<p align="center">
    <span style="font-size: 14px;">Figure 10: New Content</span>
</p>

Now you understand that the smart contract development on Jovay is same as on Ethereum, and more smooth on Jovay☄️. 

## 🔙 How to Withdraw
The ETH token you hold on Jovay can be withdraw back to Ethereum. In this section, we gonna to describe how.

To withdraw ETH from Jovay testnet to Sepolia, you need to invoke withdraw on the ETH Bridge contract on Jovay, and then invoke `relayMsgWithProof` on the ETH Bridge contract on Sepolia.

### Start a withdraw on Jovay
We provide the code IL2ETHBridge.sol of Token Bridge contract interface on Jovay which you can found in the upper section '**[Review demo contract code](#review-demo-contract-code)**'. Also you can click share [link](https://remix.ethereum.org/?gist=5c78b4833454d2ccec498d600f253ccc) again and go to Remix to see it.

Before you start, switch your MetaMask to Jovay testnet and the Remix environment to MetaMask. Then on Remix, compile the contract interface `IL2ETHBridge` and attach the bridge address. The ETH bridge address on Jovay testnet is `0xD278bC7189d2ed65c005c345A0e8a387f15b7a3A`.

Change MetaMask connect to Jovay. After attached, you can find a ETH bridge contract instance like below.

<div align="center">
  <img src="/Images/developer-quickstart/withdraw-function-of-l2ethbridge.png" >
</div>
<p align="center">
    <span style="font-size: 14px;">Figure 11: Withdraw Function of L2ETHBridge.png</span>
</p>

According to the following parameter definition, call the function withdraw with your own parameters.
- **to_**: The address to receive the withdrawn ETH on Sepolia. 
- **amount_**: The amount of ETH to transfer to the withdrawal target address. Please ensure that sufficient balance remains to cover both the gas cost of this withdrawal transaction and the associated L1 transaction on Sepolia. For example *`0.0001 ether` (`100000000000000 wei`)* . 
- **gasLimit_**: The gas limit for the L1 transfer transaction associated with the L2 withdrawal. For example `1130000`.
- **data_**: Message delivered with this withdraw from Jovay to Ethereum. But here just input 0x.
- **value in transaction**: The withdraw ether value in transaction must cover the cost of the crosschain gas limit and the transfer amount. Now the price in Token Bridge is `0.01gwei`, if your gasLimit is 1130000 and your amount is `x`, the your value with transaction should greater or equal to value `x + 1130000 * 1e7`. For example `x` is *`0.0001 ether` (`100000000000000 wei`)* and value can be *`111300000000000 wei`*.

    Fill in your value into the input box above the function area, such as the one shown in the picture below:

    <div align="center">
        <img src="/Images/developer-quickstart/value-for-transation-1113.png" >
    </div>
    <p align="center">
        <span style="font-size: 14px;">Figure 12: Value for Transation</span>
    </p>

After sending the withdraw transaction on Jovay, wait for the next batch (~1 hours) to rollup to Sepolia. Search withdraw transaction hash on [Jovay explorer](https://sepolia-explorer.jovay.io/l2) to view the details.

![Withdraw Transaction on Jovay](/Images/developer-quickstart/withdraw-transaction-on-jovay.png)
<p align="center">
    <span style="font-size: 14px;">Figure 13: Withdraw Transaction on Jovay</span>
</p>

Once the rollup batch is verified on L1, the Proof field will display a hex value. At that point, you can proceed to finalize the withdraw on Sepolia.

![Proof of Your Withdraw](/Images/developer-quickstart/proof-of-your-withdraw.png)
<p align="center">
    <span style="font-size: 14px;">Figure 14: Proof of Your Withdraw</span>
</p>

### Finalize the withdraw on Ethereum
Finalizing a withdrawal on Sepolia triggers the Bridge contract to transfer ETH to the target address, based on the L2 message produced by the Jovay `withdraw` transaction.

The following steps can only be executed after the Jovay `withdraw` transaction has been finalized on Sepolia. Enter the `withdraw` transaction hash on the [Jovay Explorer](https://sepolia-explorer.jovay.io/l2) to navigate to the transaction details page, where the finalization status will be displayed. Then you can find the proof we described and assume that you already have the proof from the transaction detail page.

We provide the code IL1ETHBridge.sol of Token Bridge contract interface on Ethereum which you can found in the upper section '**[Review demo contract code](#review-demo-contract-code)**'. Also you can click share [link](https://remix.ethereum.org/?gist=5c78b4833454d2ccec498d600f253ccc) again and go to Remix to see it.

Before you start, switch your MetaMask to Sepolia and the Remix environment to MetaMask. Then on Remix, compile the contract interface `IL1ETHBridge` and attach the bridge address. The ETH bridge address on Sepolia is `0x940eFB877281884699176892B02A3db49f29CDE8`.

After attached, you can find a ETH bridge contract instance like below.

<div align="center">
  <img src="/Images/developer-quickstart/the-parameter-of-finalize-withdraw-transaction.png" >
</div>
<p align="center">
    <span style="font-size: 14px;">Figure 15: The Parameter of Finalize Withdraw Transaction</span>
</p>

According to the following parameter definition, call the function relayMsgWithProof with your own parameters.
- **value_**: the amout which you have withdrawn from Jovay, must equal to the amount you have configured in [Start a withdraw on Jovay](#start-a-withdraw-on-jovay).
- **nonce_**: the nonce of the L2Msg generated by your withdrawal transaction; you can retrieve this value from the withdrawal transaction's details page in [Jovay Explorer](https://sepolia-explorer.jovay.io/l2). On the transaction details page of the Jovay explorer, click `Message Logs` to find the second event `SentMsg`. The nonce of this message is shown as below.

    ![Nonce for withdraw Msg](/Images/developer-quickstart/nonce-for-withdraw-msg.png)
    <p align="center">
        <span style="font-size: 14px;">Figure 16: Nonce for withdraw Msg</span>
    </p>

- **msg_**: the L2Msg generated by your withdrawal transaction. On the transaction details page of the Jovay explorer, click `Message Logs` to find the second event `SentMsg`. The original message can be found in the `msg` field of `Event Params`. The message content on the browser page is in Base64 format. You need to convert it to Hex format for easy use in calling the contract. Don't forget the prefix `0x`.

    ![The content of Withdraw Msg](/Images/developer-quickstart/the-content-of-withdraw-msg.png)
    <p align="center">
        <span style="font-size: 14px;">Figure 17: The content of Withdraw Msg</span>
    </p>

- **proof_**: A solidity struct and contains two fields described below. Note that this parameter must be passed in as a tuple using square brackets. The first element is `batchIndex` and the second is `merkleProof`. For example, `[25,"0xbafd...a5be"]`, replace `0xbafd...a5be` with your real merkleProof.

    - **batchIndex_**: The index of the batch that includes the block which the withdrawal transaction is located, used to determine the Merkle Root of the L2Msg Tree. To get the batch index, click the Block Number link. You can find the batch index on the block details page. Here it is 25.

        ![The Block of Withdraw Transaction](/Images/developer-quickstart/the-block-of-withdraw-transaction.png)
        <p align="center">
            <span style="font-size: 14px;">Figure 18: The Block of Withdraw Transaction</span>
        </p>
        
        ![The Batch Index of Withdraw Transaction](/Images/developer-quickstart/the-batch-index-of-withdraw-transaction.png)
        <p align="center">
            <span style="font-size: 14px;">Figure 19: The Batch Index of Withdraw Transaction</span>
        </p>
    - **merkleProof**: The SPV proof corresponding to the Layer 2 message generated by the withdrawal transaction. You can also retrieve it from the withdrawal transaction's details page in [Jovay Explorer](https://sepolia-explorer.jovay.io/l2), as shown in the figure above. 

        ![Proof Is Ready](/Images/developer-quickstart/proof-is-ready.png)
        <p align="center">
            <span style="font-size: 14px;">Figure 20: Proof Is Ready</span>
        </p>
Get parameters ready, change MetaMask connect to Sepolia and then click button <span style="color: red;">transact</span> to request the wallet to sign and send a transaction to call the contract.

<div align="center">
  <img src="/Images/developer-quickstart/an-example-of-finalize-withdraw-parameter.png" >
</div>
<p align="center">
    <span style="font-size: 14px;">Figure 21: An Example of Finalize Withdraw Parameter</span>
</p>

Wait the transaction confirmed on Sepolia, you can search the transaction on [etherscan.io](https://sepolia.etherscan.io/).

![The Ether Amount Withdrawal](/Images/developer-quickstart/the-ether-amount-withdrawal.png)
<p align="center">
    <span style="font-size: 14px;">Figure 22: The Ether Amount Withdrawal</span>
</p>

By sending this transaction to Sepolia, the `relayMsgWithProof` method on the Sepolia ETH Bridge Contract is invoked to complete withdrawal proof validation, resulting in the specified ETH amount being successfully withdrawn to your account. Check your Sepolia account balance on MetaMask.