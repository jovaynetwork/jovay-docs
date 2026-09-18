# 🚨 Jovay ForceWithdraw Escape Hatch User Guide

---

## 🏛️ Background: Bankruptcy & Escape Hatch

### What is Bankruptcy?

In the Rollup architecture, the Sequencer/Relayer is responsible for periodically submitting L2 transaction data to L1 and finalizing it. If, due to operator shutdown, an attack, or other reasons, **the Rollup contract has not finalized any new Batch for longer than the preset timeout (default: 7 days)**, the system automatically enters **Bankruptcy** state:

- 🔒 The Rollup contract freezes, rejecting new `commitBatch` / `verifyBatch` calls
- ⏰ Determination is purely based on on-chain timestamps — no manual trigger required
- 📛 `Rollup.isInactive()` returns `true`

### What is the Escape Hatch?

The Escape Hatch is the **ultimate fund safety guarantee** that the Rollup provides to users: even if L2 completely stops running, users can still withdraw their assets through L1 contracts.

- 🔐 The proof is bound to `msg.sender` — only the balance owner can withdraw
- 🛡️ Each account can only withdraw once per `batchIndex` (prevents double-spending)

> ⚠️ **Current Scope**: Only ETH escape hatch is supported — ERC20 is not included; only direct withdrawal after bankruptcy is supported — censorship-resistance paths are not included.

---

## 📋 Overview

> **Prerequisites**: You have an ETH balance on Jovay L2, and that balance has been finalized by the Rollup contract.

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│  Jovay RPC  │  proof  │ L1ETHBridge  │ release │  L1Mailbox   │  ETH
│ getProof()  │ ──────▶ │forceWithdraw │ ──────▶ │releaseETH()  │ ──────▶ 👤 User
└─────────────┘         └──────────────┘         └──────────────┘

🔍 Step 1: Confirm Rollup has entered Bankruptcy state
📦 Step 2: Obtain Merkle balance proof               ← jovay_getProof
📝 Step 3: Submit forceWithdraw transaction to L1ETHBridge ← on-chain verification + ETH release
✅ Step 4: Verify withdrawal result
```

---

## 🛠️ Prerequisites

### 📦 Tool Installation

```bash
# Install Foundry (for contract interaction)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install jq (for JSON parsing)
brew install jq   # macOS
# apt install jq  # Ubuntu/Debian
```

### 🌐 Register ZAN Node Service

> This guide uses [ZAN](https://zan.top) RPC node service to access Jovay L2 and Ethereum L1.

**👉 Registration Steps:**

1. 🔗 Visit [ZAN.top](https://zan.top/service/apikeys)
2. 📝 Sign up and log in
3. ➕ Click **"Create API Key"** to create a new key
4. ✅ Obtain your API Key
5. 🎯 Confirm that **Jovay** and **Ethereum** chains are enabled in the service list

> 💡 ZAN provides Jovay Testnet/Mainnet and Ethereum Sepolia/Mainnet node services — one key grants access to all networks.

### 📜 Contract Addresses

#### 🧪 Testnet (Jovay Testnet + Ethereum Sepolia)

| Contract | Address | Network |
|----------|---------|---------|
| 🏗️ **Rollup** | [`0x79C0bB4EE51D7557E012f2f52db4A4ff85Ca3196`](https://sepolia.etherscan.io/address/0x79C0bB4EE51D7557E012f2f52db4A4ff85Ca3196) | Ethereum Sepolia |
| 🌉 **L1ETHBridge** | [`0x940eFB877281884699176892B02A3db49f29CDE8`](https://sepolia.etherscan.io/address/0x940eFB877281884699176892B02A3db49f29CDE8) | Ethereum Sepolia |
| 📬 **L1Mailbox** | [`0x95fE4eD4327fB138Cd4Bd05a574378942648bA04`](https://sepolia.etherscan.io/address/0x95fE4eD4327fB138Cd4Bd05a574378942648bA04) | Ethereum Sepolia |

#### 🌍 Mainnet (Jovay Mainnet + Ethereum Mainnet)

| Contract | Address | Network |
|----------|---------|---------|
| 🏗️ **Rollup** | [`0xe0a28b8918a62edb825055221a1df12c7c81bac1`](https://etherscan.io/address/0xe0a28b8918a62edb825055221a1df12c7c81bac1) | Ethereum Mainnet |
| 🌉 **L1ETHBridge** | [`0x922248db4a99bb542539ae7165fb9d7a546fb9f1`](https://etherscan.io/address/0x922248db4a99bb542539ae7165fb9d7a546fb9f1) | Ethereum Mainnet |
| 📬 **L1Mailbox** | [`0x9869a90fdac287519e48aff4cce329907a995162`](https://etherscan.io/address/0x9869a90fdac287519e48aff4cce329907a995162) | Ethereum Mainnet |

### 🔑 Environment Variables

Choose the configuration for your target network:

<details>
<summary>🧪 <b>Testnet Configuration (click to expand)</b></summary>

```bash
# ═══════════════════════════════════════════════════
# 🌐 Network Configuration — Testnet
# ═══════════════════════════════════════════════════

# 📡 L1 Ethereum Sepolia RPC
export L1_RPC="https://api.zan.top/node/v1/eth/sepolia/<YOUR_ZAN_API_KEY>"

# 📡 Jovay Testnet RPC (for obtaining Merkle balance proof)
export JOVAY_RPC="https://api.zan.top/node/v1/jovay/testnet/<YOUR_ZAN_API_KEY>"

# 📝 Contract addresses
export ROLLUP_ADDR="0x79C0bB4EE51D7557E012f2f52db4A4ff85Ca3196"
export L1_ETH_BRIDGE_ADDR="0x940eFB877281884699176892B02A3db49f29CDE8"

# 🔐 Your account
export MY_ADDRESS="0x<your_ethereum_address>"
export MY_PRIVATE_KEY="0x<your_private_key>"   # ⚠️ Testnet only
```

</details>

<details>
<summary>🌍 <b>Mainnet Configuration (click to expand)</b></summary>

```bash
# ═══════════════════════════════════════════════════
# 🌐 Network Configuration — Mainnet
# ═══════════════════════════════════════════════════

# 📡 L1 Ethereum Mainnet RPC
export L1_RPC="https://api.zan.top/node/v1/eth/mainnet/<YOUR_ZAN_API_KEY>"

# 📡 Jovay Mainnet RPC (for obtaining Merkle balance proof)
export JOVAY_RPC="https://api.zan.top/node/v1/jovay/mainnet/<YOUR_ZAN_API_KEY>"

# 📝 Contract addresses
export ROLLUP_ADDR="0xe0a28b8918a62edb825055221a1df12c7c81bac1"
export L1_ETH_BRIDGE_ADDR="0x922248db4a99bb542539ae7165fb9d7a546fb9f1"

# 🔐 Your account
export MY_ADDRESS="0x<your_ethereum_address>"
export MY_PRIVATE_KEY="0x<your_private_key>"   # ⚠️ Strongly recommend using a hardware wallet!
```

> ⚠️ **Security Note**: For mainnet operations, use a hardware wallet (Ledger/Trezor) or `cast send --ledger` instead of exposing raw private keys.
</details> 


---

## 🔍 Step 1: Confirm Rollup Has Entered Bankruptcy State

### 1.1 Query Whether Rollup is Inactive

```bash
# 📞 Call Rollup.isInactive() — returns true if the timeout has been exceeded
cast call $ROLLUP_ADDR "isInactive()(bool)" --rpc-url $L1_RPC
```

**✅ Expected Output**:

```
true
```

> 🔴 If it returns `false`, the Rollup is still operating normally — **you do not need to use the escape hatch**. Use the normal withdrawal process instead.

### 1.2 Query Detailed Status (Aggregated Interface)

```bash
# 📞 Get all at once: inactive flag + latest finalized batchIndex + stateRoot
cast call $ROLLUP_ADDR "getActivityStatus()(bool,uint256,bytes32)" --rpc-url $L1_RPC
```

**✅ Expected Output Example**:

```
true                                                              ← 📛 Timed out
42                                                                ← 📦 Latest finalized batch index
0x1a2b3c...(stateRoot)                                            ← 🌳 State root of that batch
```

### 1.3 Query Timeout Threshold and Timestamp (Optional)

```bash
# ⏰ View timeout threshold (seconds)
echo "⏱️  Inactivity Timeout:"
cast call $ROLLUP_ADDR "inactivityTimeout()(uint256)" --rpc-url $L1_RPC

# 📅 Last finalize timestamp
echo "📅 Last Finalized Timestamp:"
cast call $ROLLUP_ADDR "lastFinalizedTimestamp()(uint256)" --rpc-url $L1_RPC

# 🧮 Calculate how long it has been inactive
LAST_TS=$(cast call $ROLLUP_ADDR "lastFinalizedTimestamp()(uint256)" --rpc-url $L1_RPC)
CURRENT_TS=$(date +%s)
ELAPSED=$(( CURRENT_TS - LAST_TS ))
echo "⏳ Inactive for: $(( ELAPSED / 86400 )) days $(( (ELAPSED % 86400) / 3600 )) hours"
```

---

## 📦 Step 2: Obtain Merkle Balance Proof

### Option A: Via ZAN RPC Service 🌟 (Recommended)

> ZAN provides full-node RPC access to Jovay, allowing you to directly call `jovay_getProof` to obtain a balance proof.
> If you haven't registered with ZAN yet, visit 👉 **https://zan.top/service/apikeys** to sign up and get an API Key.

#### ⚠️ Important: You Must Specify the Correct Block Height

> 🚨 `jovay_getProof` **requires a specific block height**, and that height must be the **last block of the latest finalized batch** in the Rollup contract.
>
> If you don't specify a height (using `"latest"`), the L2 chain may have continued producing blocks, causing intermediate nodes in the proof to change — resulting in a mismatch with the finalized stateRoot on L1, and **the transaction will inevitably revert**!

#### 🔎 How to Get the Correct Block Height

**Step A: Query lastFinalizedBatchIndex**

```bash
# 📦 Query the latest finalized batch index from the Rollup
BATCH_INDEX=$(cast call $ROLLUP_ADDR "lastFinalizedBatchIndex()(uint256)" --rpc-url $L1_RPC)
echo "📦 Last Finalized Batch Index: $BATCH_INDEX"
```

**Step B: Get the batch's last block height via Jovay Block Explorer**

| Network | 🔗 Block Explorer Batches Page |
|---------|-------------------------------|
| 🧪 Testnet | https://sepolia-explorer.jovay.io/batches |
| 🌍 Mainnet | https://explorer.jovay.io/batches |

Steps:
1. 🌐 Open the Batches page for your network
2. 🔍 Find the Batch with index `$BATCH_INDEX` (or append the batch index to the URL)
3. 📋 Check the **"End Block"** in the Batch details
4. 🧮 Convert the decimal block height to hexadecimal:

```bash
# Suppose the End Block shown in the explorer is 1234567
END_BLOCK=1234567
L2_BLOCK_HEIGHT=$(printf "0x%x" $END_BLOCK)
echo "🎯 Target block height (hex): $L2_BLOCK_HEIGHT"
```

#### 🧪 Quick Test (Testnet Example)

```bash
# 📡 Use ZAN Testnet endpoint to get proof (replace address and height with your own)
curl -s -X POST https://api.zan.top/node/v1/jovay/testnet/<YOUR_ZAN_API_KEY> \
  -H 'Content-Type: application/json' \
  -d '{
  "jsonrpc": "2.0",
  "method": "jovay_getProof",
  "params": [
    "0x495386312416eeb20EB18535f62DbBB6cbE0C054",
    [],
    "0x12D687"
  ],
  "id": 1
}' | jq .
```

#### 🎯 Get Your Proof Using Environment Variables

```bash
# 🔑 Get the Merkle balance proof for your account
# Parameter description:
#   params[0]: Your address
#   params[1]: [] (empty array, means account proof)
#   params[2]: Must be the End Block of lastFinalizedBatch (hexadecimal)
curl -s -X POST $JOVAY_RPC \
  -H 'Content-Type: application/json' \
  -d '{
  "jsonrpc": "2.0",
  "method": "jovay_getProof",
  "params": [
    "'$MY_ADDRESS'",
    [],
    "'$L2_BLOCK_HEIGHT'"
  ],
  "id": 1
}' | jq .
```

**✅ Expected Output Example**:

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    "0x007805406ab79eee1e87844e69613bd41dbe7a51...(InternalNode 65 bytes)",
    "0x00af2e975bf6523043e5915243bb217264bd5dea...(InternalNode 65 bytes)",
    "...(more InternalNodes)...",
    "0x01178d502402c0e925a749261d0fb1786bca67e6...(LeafNode 113 bytes)"
  ]
}
```

> 📌 **Response Format**: `result` is directly a `bytes[]` array (not a nested object). Each element is a hex-encoded node:
> - `0x00...` prefix = InternalNode (65 bytes): `[type=0x00][leftHash:32B][rightHash:32B]`
> - `0x01...` prefix = LeafNode (113 bytes): `[type=0x01][keyHash:32B][value:80B]`
> - The last element in the array is your account's leaf node, containing nonce/codeSize/balance/codeHash

#### 💾 Save Proof to File

```bash
# 📁 Extract the result array and save to file (result itself is the proof array)
curl -s -X POST $JOVAY_RPC \
  -H 'Content-Type: application/json' \
  -d '{
  "jsonrpc": "2.0",
  "method": "jovay_getProof",
  "params": ["'$MY_ADDRESS'", [], "'$L2_BLOCK_HEIGHT'"],
  "id": 1
}' | jq '.result' > proof.json

# 👀 View proof contents
echo "📄 Proof file contents:"
cat proof.json | jq .

# 🧮 Check proof path length
echo "📊 Proof path node count: $(cat proof.json | jq length)"
```

---

### Option B: Via State Derivation Node 🔒

> If you don't trust any third-party RPC, you can run your own **State Derivation (SD) Sequencer** to independently derive the complete L2 state from Batch data submitted to L1, without trusting the original Sequencer.

```
┌────────┐    Read Batch data    ┌─────────────┐  Local derive  ┌───────────────┐
│  L1    │ ──────────────────── │  SD Node    │ ───────────── │ Full L2 State │
│ (Blob) │                      │             │               │ jovay_getProof│
└────────┘                      └─────────────┘               └───────────────┘
```

Once the SD node has finished syncing, you can obtain the balance proof via local RPC:

```bash
# Same RPC call as Option A, but the endpoint points to your local SD node
# You must also specify the correct block height (End Block of lastFinalizedBatch)
curl -s -X POST http://localhost:8545 \
  -H 'Content-Type: application/json' \
  -d '{
  "jsonrpc": "2.0",
  "method": "jovay_getProof",
  "params": ["'$MY_ADDRESS'", [], "'$L2_BLOCK_HEIGHT'"],
  "id": 1
}' | jq '.result' > proof.json
```

> 🔒 **Security Advantage**: In State Derivation mode, you are completely independent of any third party — you derive the L2 state yourself from L1 data. This is the highest security level for obtaining a proof.
>
> 📖 **Setup Guide**: For full State Derivation node deployment documentation, see:
> 👉 [State Derivation Guide](../state-derivation/start-state-derivation-sequencer.md)

---

## 📝 Step 3: Submit forceWithdraw Transaction

### 3.1 Prepare Proof Parameter

```bash
# 📄 Check proof.json content format
cat proof.json
# Expected: a JSON array: ["0x00...", "0x00...", "0x01..."]
```

### 3.2 Build and Send Transaction

```bash
# 🚀 Call L1ETHBridge.forceWithdraw(bytes[] calldata proof)
#
# cast supports passing array parameters directly: "[elem1,elem2,...]" format
# Extract from proof.json into cast-compatible format

PROOF_ARRAY=$(cat proof.json | jq -r 'join(",")')

# 📤 Send transaction (cast will automatically estimateGas, no need to specify gas limit manually)
cast send $L1_ETH_BRIDGE_ADDR \
  "forceWithdraw(bytes[])" \
  "[$(cat proof.json | jq -r 'map("\"" + . + "\"") | join(",")')]" \
  --rpc-url $L1_RPC \
  --private-key $MY_PRIVATE_KEY
```

**✅ Expected Output**:

```
blockHash            0x...
blockNumber          12345678
contractAddress
...
status               1          ← 🎉 Transaction successful!
transactionHash      0xabcdef...
```

> 💡 **Gas Consumption Note**:
> - A single Poseidon2 hash costs ≈ **190,000 gas** (permute ~182k + input packing overhead ~8-10k)
> - Each Merkle proof layer requires one hash computation — each additional layer adds ~**200,000 gas**
> - 10-layer proof ≈ **2.7M gas**, 25-layer proof ≈ **5.69M gas**
> - `cast send` will automatically calculate the appropriate gas limit via `eth_estimateGas` — no manual specification needed

### 3.3 Send via Foundry Script (For Advanced Use Cases)

If you need more flexible control, you can write a Foundry script:

```bash
# 📁 Create script file
cat > ForceWithdraw.s.sol << 'EOF'
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

import "forge-std/Script.sol";

interface IL1ETHBridge {
    function forceWithdraw(bytes[] calldata proof) external;
}

contract ForceWithdrawScript is Script {
    function run() external {
        // Read from environment variables
        address bridge = vm.envAddress("L1_ETH_BRIDGE_ADDR");
        string memory proofJson = vm.readFile("proof.json");
        
        // Parse proof array
        bytes[] memory proof = abi.decode(
            vm.parseJson(proofJson),
            (bytes[])
        );

        vm.startBroadcast();
        IL1ETHBridge(bridge).forceWithdraw(proof);
        vm.stopBroadcast();
    }
}
EOF

# 🚀 Run script
forge script ForceWithdraw.s.sol:ForceWithdrawScript \
  --rpc-url $L1_RPC \
  --private-key $MY_PRIVATE_KEY \
  --broadcast \
  -vvvv
```

---

## ✅ Step 4: Verify Withdrawal Result

### 4.1 Query Transaction Receipt

```bash
# 📜 View transaction details (replace with your tx hash)
TX_HASH="0x<your_transaction_hash>"
cast receipt $TX_HASH --rpc-url $L1_RPC
```

### 4.2 Decode Event Logs

```bash
# 🔎 View ForceWithdrawETH event
cast receipt $TX_HASH --rpc-url $L1_RPC | grep -A5 "logs"

# 📊 Or decode the event directly
cast logs \
  --from-block $(cast receipt $TX_HASH --rpc-url $L1_RPC | grep blockNumber | awk '{print $2}') \
  --to-block $(cast receipt $TX_HASH --rpc-url $L1_RPC | grep blockNumber | awk '{print $2}') \
  --address $L1_ETH_BRIDGE_ADDR \
  "ForceWithdrawETH(address indexed user, uint256 amount, uint256 indexed batchIndex)" \
  --rpc-url $L1_RPC
```

**✅ Expected Output**:

```
ForceWithdrawETH(
  user: 0x<your_address>,
  amount: 2000000000000000000,       ← 🎉 2 ETH withdrawn
  batchIndex: 42
)
```

### 4.3 Confirm ETH Balance Change

```bash
# 💰 Query your L1 ETH balance
echo "💰 Current L1 ETH balance:"
cast balance $MY_ADDRESS --rpc-url $L1_RPC --ether
```

### 4.4 Confirm Anti-Replay Flag

```bash
# 🔒 Query whether it's marked as claimed (should return true)
BATCH_INDEX=$(cast call $ROLLUP_ADDR "lastFinalizedBatchIndex()(uint256)" --rpc-url $L1_RPC)
cast call $L1_ETH_BRIDGE_ADDR \
  "forceWithdrawClaimed(address,uint256)(bool)" \
  $MY_ADDRESS $BATCH_INDEX \
  --rpc-url $L1_RPC
```

**✅ Expected Output**: `true` (cannot withdraw again under the same batchIndex)

---

## ❓ FAQ

### 🔴 Transaction revert: "Rollup is not inactive"

> **Cause**: The Rollup is still operating normally and has not exceeded the inactivity timeout threshold.
>
> **Solution**: Confirm that `isInactive()` returns `true` before proceeding. You can check the remaining time via Step 1.3.

### 🔴 Transaction revert: "Already claimed"

> **Cause**: You have already successfully executed forceWithdraw under the current `lastFinalizedBatchIndex`.
>
> **Solution**: Each account can only withdraw once per batchIndex — this is the expected anti-replay protection.

### 🔴 Transaction revert: "Invalid balance proof"

> **Cause**: The submitted Merkle proof failed verification.
>
> **Possible reasons**:
> - 📅 **Most common**: The proof was obtained without specifying the correct block height, or `"latest"` was used, causing intermediate nodes to mismatch the finalized stateRoot
> - 🔑 The proof was not generated for the `msg.sender` address (address mismatch)
> - 🔄 Proof data was truncated or corrupted during transmission
>
> **Solution**:
> 1. Check the block explorer ([Testnet](https://sepolia-explorer.jovay.io/batches) / [Mainnet](https://explorer.jovay.io/batches)) to confirm the End Block for the `lastFinalizedBatchIndex` Batch
> 2. Re-obtain the proof using that End Block's hexadecimal height
> 3. Ensure you obtain the proof using the same address that will call forceWithdraw

### 🔴 Transaction revert: "Zero balance"

> **Cause**: Your ETH balance in the Jovay L2 state snapshot is 0.
>
> **Solution**: Confirm that your L2 account actually has an ETH balance in the state corresponding to the finalized batch.

### 🔴 Transaction revert: "Rollup not set"

> **Cause**: The L1ETHBridge contract has not been configured with the Rollup address (contract upgrade initialization incomplete).
>
> **Solution**: Contact the administrator to confirm the contract upgrade status.

### 🟡 High Gas Consumption

> A single Poseidon2 hash costs ≈ **190,000 gas** (permute ~182k + input packing ~8-10k). Each additional Merkle proof layer adds ~**200,000 gas**.
> 10-layer proof ≈ **2.7M gas**, 25-layer proof ≈ **5.69M gas**.
> `cast send` will automatically estimate — no need to manually specify gas limit.

### 🟡 How much balance can I withdraw?

```bash
# 📊 View your balance in the proof (no transaction needed, local parsing)
LEAF=$(cat proof.json | jq -r '.[-1]')
# LeafNode format: type(1B) + keyHash(32B) + value(80B)
# balance is at offset [16, 48) within value
# Can be parsed using cast or Python
echo "🔢 Leaf node (hex): $LEAF"
echo "💡 Balance is at characters 50-114 of the leaf (positions 66-130 after removing 0x prefix)"
```

---

## 🔐 Security Tips

| 🛡️ Item | Description |
|---------|-------------|
| **Private Key Safety** | For production, use a hardware wallet (Ledger/Trezor) or multisig — never expose raw private keys in the command line |
| **Proof Source** | If you don't trust third-party RPCs, use Option B (State Derivation) to derive state independently |
| **Contract Address Verification** | Always confirm Rollup and L1ETHBridge contract addresses through official channels before operating |
| **Identity Binding** | `forceWithdraw` is strictly bound to `msg.sender` — only the private key holder of the balance-owning address can withdraw |
| **Irreversible** | Once withdrawn successfully, you cannot withdraw again under the same batchIndex — ensure your operation is correct |
