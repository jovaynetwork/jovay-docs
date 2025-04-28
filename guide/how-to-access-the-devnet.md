# How to access the devnet
## How to Apply for a Trial
Applying for early access to Jovay is quick and straightforward:
1. **Complete the Application Form:** Provide basic details including:
    - Full Name
    - Professional Email Address
    - Company Name & Your Position
    - Intended Use Cases (e.g., DeFi protocols, NFT infrastructure)
    - Source IP Address
2. **Submit & Await Activation:**

    Our team will promptly review your submission. Upon approval, you'll receive:
    - Dedicated Jovay Chain Endpoint URL
    - Integration Instructions
![submission](./Images/Access/submission.png)

## Contract Deployment Tutorial
We welcome everyone to deploy and call smart contract on Jovay. This section will introduce how to deploy and call smart contracts compiled by DTVM on jovay.

Before that, you need（on ubuntu 22.04） : 

1. prepare environment dependencies
    ```
    sudo apt-get update
    sudo apt install nodejs npm
    npm install solc@0.8.28      # solc version must bigger than 0.8.25
    ```
2. prepare DTVM for complie wasm bytecode. reference [GitHub - DTVMStack/DTVM_SolSDK](https://github.com/DTVMStack/DTVM_SolSDK?tab=readme-ov-file)

3. deposit some ETH into your Jovay account from Sepolia through the  Deposit operation in the [Bridge between Sepolia and Jovay](https://yuque.antfin.com/antchain/updgmy/mlt9hfkv63tof1yu) to facilitate subsequent operations.

For example, We have a simple example contract:

```
pragma solidity ^0.8.0;

contract JovayExample {
    string private content = "welcome to Jovay";

    function SetContent(string memory _new_content) public {
        content = _new_content;
    }

    function GetContent() public returns (string memory){
        return content;
    }
}
```
First, complie smart contract as wasm bytecode; 
```
# Step 1: Compile Solidity to Yul IR
solc --ir --optimize-yul -o . --overwrite jovay_example.sol

# Step 2: Compile Yul IR to WebAssembly
yul2wasm --input JovayExample.yul --output jovay_example.wasm
```
Second, deploy and call the contract by web3js using the script we provided.
```
tree jovay-guide
jovay-guide
├── conf
├── package-lock.json        
├── package.json
├── scripts
│   └── deploy_contract.js   // deploy contract script 
│   └── call_contract.js     // call contract script 
└── src
    └── contracts            // simple contract for example
```

## Bridge ETH between Sepolia and Jovay
Now, you will learn how to bridge ETH between Sepolia and Jovay.

Jovay provide ETH bridge contracts for bridging eth between Sepolia and Jovay; 

- ETH Bridge Contract on Sepolia : `0x10Ec05757Af363080443110BFd2e86C4406E4732`
- ETH Bridge Contract on Jovay : `0x38675d92813338953b0f67e9cc36be59282b77e3`

You can deposit ETH from Sepolia to Jovay by calling `deposit` on Sepolia. And withdraw  ETH from Jovay back to Sepolia by calling `withdraw` on Jovay.

### Deposit From Sepolia to Jovay
```
/**
 * user deposit eth from Sepolia to Jovay;
 * @param to_; deposit target address on Jovay;
 * @param amount_; deposit amount;
 * @param gasLimit_; gas limit of finalize deposit on Jovay（should bigger 1200000）
 * @param msg_; Not used yet, extended field; please set "0x"
 */
function deposit(address to_, uint256 amount_, uint256 gasLimit_, bytes memory msg_) external payable;
```

### WithDraw From Jovay to Sepolia
```
/**
 * user withdraw eth from Jovay to Sepolia;
 * @param to_; withdraw target address on Sepolia;
 * @param amount_; withdraw amount;
 * @param gasLimit_; gas limit of finalize withdraw on Sepolia （should bigger 150000）
 * @param msg_; Not used yet, extended field; please set "0x"
 */
function withdraw(address to_, uint256 amount_, uint256 gasLimit_, bytes memory msg_) external payable;

/**
 * finalize withdraw and transfer eth to target address on Sepolia;
 * @param amount_; withdraw amount;
 * @param nonce_; the L2 withdraw tx's nonce of L2 Msg queue; 
 * @param msg_; Not used yet, extended field; please set "0x"
 * @param proof_; the proof of L2 Msg; include batch_index and spv_proof;
 */
function relayMsgWithProof(
    uint256 amount_,
    uint256 nonce_,
    bytes memory msg_,
    IL1Mailbox.L2MsgProof memory proof_
) external payable;
```

For simplicity of use，we provide scripts for bridging ETH. 

```
tree jovay-guide
jovay-guide
├── conf
│   └── abi
│       ├── L1ETHBridge.json // L1 ETH BRIDGE ABI FILE
│       └── L2ETHBridge.json // L2 ETH BRIDGE ABI FILE
├── package-lock.json        
├── package.json
├── scripts
│   └── eth_bridge.js        // bridge operator script include deposit, withdraw and finalize_withdraw
└── src
    └── contracts            // simple contract for example
```

First，prepare .env by replacing the private_key and owner_addr with yours; And configure the L2_RPC_URL address obtained in section [How to Apply for a Trial](https://yuque.antfin.com/antchain/updgmy/mlt9hfkv63tof1yu#VuRf0).

```
RPC_URL="url of sepolia"
L2_RPC_URL="http://sequencer.jovay.io"

L1_OWNER_ADDR=xxx
L2_OWNER_ADDR=xxx

L1_PRIVATE_KEY=xxx
L2_PRIVATE_KEY=xxx

L1_ETH_BRIDGE_ADDR=0xe4eec6BF3cb40DD1b042bA71DB6af8C815E12B26
L2_ETH_BRIDGE_ADDR=0xf17c411483d259b50ab9604f69802bf6e4083fd6

L1_ETH_BRIDGE_ABI=conf/abi/L1ETHBridge.json
L2_ETH_BRIDGE_ABI=conf/abi/L2ETHBridge.json
```

Second, if you want to deposit ETH from Sepolia to address `0x7CaD994FC1c0d94ef232FBe3b45B685018Ee59B6` on Jovay. Please use the below command: 
```
node scripts/eth_bridge.js depositEth 0x7CaD994FC1c0d94ef232FBe3b45B685018Ee59B6 27000000 7000000 37000000  
```
| Parameter  | Value  | Description  |
|---|---|---|
| `to`  | 0x7CaD994FC1c0d94ef232FBe3b45B685018Ee59B6  | deposit target address on Jovay  |
|`amount`  | 27000000 (wei)   | the amount want to transfer to deposit target address  |
|`gaslimit`   | 7000000   | the gaslimit you want set for L2 transfer transaction associated with L1  |
| `value`  | 37000000 (wei)  | the value you should pay for deposit must bigger than the sum of gaslimit and amount  |

And then，if you want withdraw ETH from Jovay，you should send two commands withdraw on Jovay and finalizeWithdraw on Sepolia. 

1. withdraw on Jovay
```
node script/eth_bridge.js withdrawEth 0x7CaD994FC1c0d94ef232FBe3b45B685018Ee59B6 105 1130000 1200000 
```
| Parameter  | Value  | Description  |
|---|---|---|
| `to`  | 0x7CaD994FC1c0d94ef232FBe3b45B685018Ee59B6  | withdraw target address on Sepolia.  |
|`amount`  | amount	105 (wei)   | the amount want to transfer to withdraw target address.  |
|`gaslimit`   | 1130000  | the gaslimit you want set for L1 transfer transaction associated with L2.  |
| `value`  | 1200000 (wei)  | the value you should pay for withdraw must bigger than the sum of gaslimit and amount.  |

2. finalize withdraw on Sepolia
```
 node scripts/eth_bridge.js finalizeWithdraw 568 0x1fc547fd2e2793de5639a6d01d36b16962d4f7bbccf4eb8c2460b80b2387f1f4 0x0000000000000000000000000000000000000000000000000000000000000000AD3228B676F7D3CD4284A5443F17F1962B36E491B30A40B2405849E597BA5FB549907CABA6026FC29793BCD2643CC473EA1961E750D21D0CA0681B6BC47036F721DDB9A356815C3FAC1026B6DEC5DF3124AFBADB485C9BA5A3E3398A04B7BA8508C69FA8494A232D4152ED4E9804888ACB9736E5B573A91C7C8286C8BD94FCDF11D320ECF7A95981F47E88A7E45E7D3BF3EFE42A3725F02F8E529B85A0F2D10480C2EB2A1D9ED30415BAC4EDBE840944AC03B0EE4EA8EA564ECE94177EA3CADC
```
| Parameter  | Value  | Description  |
|---|---|---|
| `batch_index`  | 568  | the batch index of withdraw tx hash. you can find at [jovay explorer](http://explorer.jovay.io/l2/home?bizId=ethdevnetl2&unionId=100100).  |
|`tx_hash`  | the withdraw tx hash; this script will get the parameters `nonce` and msg of L2 `Msg` automatically.  |
|`proof`   | 0x0000000000000000000000000000000000000000000000000000000000000000AD3228B676F7D3CD4284A5443F17F1962B36E491B30A40B2405849E597BA5FB549907CABA6026FC29793BCD2643CC473EA1961E750D21D0CA0681B6BC47036F721DDB9A356815C3FAC1026B6DEC5DF3124AFBADB485C9BA5A3E3398A04B7BA8508C69FA8494A232D4152ED4E9804888ACB9736E5B573A91C7C8286C8BD94FCDF11D320ECF7A95981F47E88A7E45E7D3BF3EFE42A3725F02F8E529B85A0F2D10480C2EB2A1D9ED30415BAC4EDBE840944AC03B0EE4EA8EA564ECE94177EA3CADC  | the spv proof of L2 msg. you can find at [jovay explorer](http://explorer.jovay.io/l2/home?bizId=ethdevnetl2&unionId=100100) after batch is finalized.</br> ![jovay explorer](./Images/Access/jovay%20explorer.png)|

## Jovay API
Jovay is fully compatible with the Ethereum ecosystem, offering native support for standard Ethereum JSON-RPC interfaces. Developers can seamlessly integrate using popular tools and libraries such as Web3j, Web3.js, or ethers.js, without the need for custom adaptations. This enables existing Ethereum applications to migrate or expand to the Jovay with minimal effort, reducing integration costs and accelerating development.

The table2 indicates how each Ethereum JSON-RPC method behaves on the Jovay. All request and response parameters follow the canonical [Ethereum JSON-RPC specification](https://ethereum.org/en/developers/docs/apis/json-rpc/). Only the runtime semantics differ for entries marked with ⚠️.

table1: Status Meanings in table2
| Status  | Meaning on Jovay  | Guidance for dApp developers  |
|---|---|---|
| ✅  | **Fully compatible** – request and response semantics are identical to Ethereum mainnet.  | Use the method exactly as defined in the Ethereum JSON-RPC specification.  |
| ⚠️ | **Semantically different** – the method is implemented, but its return value or behavior diverges (e.g., no PoW, no uncle blocks, L2-specific proofs). See the Note column for details.  | Review the deviation and add fallback logic if required.  |
| ❌ | **Not supported** – the method is not available (typically wallet or filter features).  | Replace, stub, or omit the call until future support is announced.  |

table2: Jovay JSON-RPC List
| Ethereum JSON-RPC API | Status  | Note  |
|---|---|---|
| eth_protocolVersion | ⚠️ | Always Returns `0x41`  |
| eth_syncing | ⚠️ | Returns `false` due to disabled sync and consensus |
| eth_coinbase | ⚠️  | Returns `null` due to unimplemented coinbase functionality |
|eth_chainId  | ✅ |  |
|eth_mining  | ⚠️ | Returns `false` due to the absence of PoW functionality in L2 |
| eth_hashrate |⚠️  | Returns `0` due to the absence of PoW functionality in L2 |
| eth_gasPrice | ✅ |  |
| eth_accounts | ⚠️ | Returns `null` due to wallet functionality  unimplemented |
| eth_blockNumber | ✅ |  |
| eth_getBalance | ✅ |  |
| eth_getStorageAt | ✅ |  |
| eth_getTransactionCount |✅  |  |
| eth_getBlockTransactionCountByHash | ✅ |  |
| eth_getBlockTransactionCountByNumber | ✅ |  |
| eth_getUncleCountByBlockHash | ⚠️ | Returns `0` due to the L2 chain having no uncle blocks |
| eth_getUncleCountByBlockNumber |⚠️  | Returns `0` due to the L2 chain having no uncle blocks |
|eth_getCode  | ✅ |  |
| eth_sign | ❌ |not provided due to wallet functionality  unimplemented  |
| eth_signTransaction | ❌ | not provided due to wallet functionality  unimplemented |
| eth_sendTransaction | ❌ | not provided due to wallet functionality  unimplemented |
| eth_sendRawTransaction | ✅ |  |
|eth_call  | ✅ |  |
| eth_estimateGas |✅  |  |
| eth_getBlockByHash | ✅ |  |
| eth_getBlockByNumber | ✅ |  |
| eth_getTransactionByHash |✅  |  |
| eth_getTransactionByBlockHashAndIndex |✅  |  |
| eth_getTransactionByBlockNumberAndIndex |✅  |  |
| eth_getTransactionReceipt |✅  |  |
| eth_getUncleByBlockHashAndIndex | ⚠️ | Returns `null` due to the L2 chain having no uncle blocks |
| eth_getUncleByBlockNumberAndIndex | ⚠️ | Returns `null` due to the L2 chain having no uncle blocks |
| eth_newFilter |❌  | not provided due to filter functionality unimplemented |
| eth_newBlockFilter | ❌ |not provided due to filter functionality unimplemented |
| eth_newPendingTransactionFilter | ❌ |not provided due to filter functionality unimplemented |
| eth_uninstallFilter | ❌ | not provided due to filter functionality unimplemented |
|eth_getFilterChanges|❌|not provided due to filter functionality unimplemented|
|eth_getFilterLogs|❌|not provided due to filter functionality unimplemented  |
|eth_getLogs|✅| |
|eth_maxPriorityFeePerGas|⚠️|Returns 0 due to the absence of priority-fee scheduling|
|eth_getAccount|✅| |