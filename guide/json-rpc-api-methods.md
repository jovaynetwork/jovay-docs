---
outline: deep
---

# Jovay JSON-RPC API

## Overview
Jovay implements the standard [Ethereum JSON‑RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/), delivering a developer experience indistinguishable from building on Ethereum itself. However, a few RPC methods differ from Ethereum’s implementation; those differences are detailed in this section.

Below is a quick overview of how each Ethereum JSON‑RPC method behaves on Jovay. We’ll use three status indicators to guide you:
- ✅ Fully compatible: request and response semantics are identical to Ethereum.
- ⚠️ Semantically different: the method is implemented, but its return value or behavior diverges (e.g., no PoW, no uncle blocks). See the Note column for details.
- ❌ Not supported: the method is not available (typically wallet or filter features). Replace, stub, or omit the call until future support is announced.

With that in mind, following table maps every standard JSON‑RPC call to its Jovay status and highlights any noteworthy deviations.

| **Ethereum JSON-RPC API** | **Status** | **Note** |
| --- | --- | --- |
| eth_protocolVersion| ⚠️ | Always Returns`0x41` |
| eth_syncing | ✅ |  |
| eth_coinbase | ⚠️ | Returns `0x0` due to unimplemented coinbase functionality |
| eth_chainId | ✅ |  |
| eth_mining | ⚠️ | Returns `false` due to the absence of PoW functionality in L2 |
| eth_hashrate | ⚠️ | Returns `0x0` due to the absence of PoW functionality in L2 |
| eth_gasPrice | ✅ |  |
| eth_accounts | ⚠️ | Returns `empty array` due to wallet functionality  unimplemented |
| eth_blockNumber | ✅ |  |
| eth_getBalance | ✅|  |
| eth_getStorageAt | ✅ |  |
| eth_getTransactionCount| ✅ |  |
| eth_getBlockTransactionCountByHash | ✅ |  |
| eth_getBlockTransactionCountByNumber | ✅ |  |
| eth_getUncleCountByBlockHash | ⚠️ | Returns `0x0` due to the L2 chain having no uncle blocks |
| eth_getUncleCountByBlockNumber | ⚠️ | Returns `0x0` due to the L2 chain having no uncle blocks |
| eth_getCode | ✅ |  |
| eth_sign | ❌ | not provided due to wallet functionality unimplemented |
| eth_signTransaction | ❌ | not provided due to wallet functionality unimplemented |
| eth_sendTransaction | ❌ | not provided due to wallet functionality unimplemented |
| eth_sendRawTransaction | ✅ |  |
| eth_call | ✅ |  |
| eth_estimateGas | ✅ |  |
| eth_createAccessList | ✅ |  |
| eth_getBlockByHash | ✅ |  |
| eth_getBlockByNumber | ✅ |  |
| eth_getBlockReceipts | ✅ |  |
| eth_getTransactionByHash | ✅ |  |
| eth_getTransactionByBlockHashAndIndex | ✅ |  |
| eth_getTransactionByBlockNumberAndIndex | ✅ |  |
| eth_getTransactionReceipt | ✅ |  |
| eth_getUncleByBlockHashAndIndex | ⚠️ | Returns `null` due to the L2 chain having no uncle blocks |
| eth_getUncleByBlockNumberAndIndex | ⚠️ | Returns `null` due to the L2 chain having no uncle blocks|
| eth_newFilter | ❌ | not provided due to filter functionality  unimplemented |
| eth_newBlockFilter | ❌ | not provided due to filter functionality  unimplemented |
| eth_newPendingTransactionFilter | ❌ | not provided due to filter functionality  unimplemented |
| eth_uninstallFilter | ❌ | not provided due to filter functionality  unimplemented |
| eth_getFilterChanges | ❌ | not provided due to filter functionality  unimplemented |
| eth_getFilterLogs | ❌ | not provided due to filter functionality  unimplemented |
| eth_getLogs | ✅ |  |
| eth_maxPriorityFeePerGas | ⚠️ | Returns `0x0` due to the absence of priority-fee scheduling |
| eth_feeHistory | ✅ |  |
| eth_getAccount| ✅ |  |
| eth_subscribe | ✅ | WebSocket API |
| eth_unsubscribe | ✅ | WebSocket API |
| debug_traceBlockByHash | ✅ |  |
| debug_traceBlockByNumber | ✅|  |
| debug_traceTransaction | ✅ |  |
| debug_getRawBlock | ✅|  |
| debug_getRawHeader | ✅ |  |
| debug_getRawReceipts | ✅ |  |
| debug_getRawTransaction | ✅ |  |
| jovay_getProof |  |  |

<div align="center">
  <span style="font-size: 14px;">Table1: Jovay JSON-RPC API List</span>
</div>

## ETH Methods
### eth_protocolVersion
Returns the current protocol version.

**Input**: None  
**Output**: String - The protocol version in hex

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_protocolVersion",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x41"
}
```

---

### eth_syncing
Returns sync status of the node.

**Input**: None  
**Output**: Object | Boolean - An object with sync status data or FALSE, when not syncing:

+ `startingBlock`: `QUANTITY` `- The block at which the import started (will only be reset, after the sync reached his head)`
+ `currentBlock`: `QUANTITY` `- The current block, same as eth_blockNumber`
+ `highestBlock`: `QUANTITY` `- The estimated highest block`

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_syncing",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x10d4f",
    "highestBlock": "0x10d4f"
  }
}
// Or when not syncing
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": false
}
```

---

### eth_coinbase
Returns the client coinbase address. 

Since the Coinbase-related features are not yet developed, this API currently returns a null value as mock data.

**Input**: None  
**Output**: String - Coinbase address  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_coinbase",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0"
}
```

---

### eth_mining
Returns whether the client is mining.

Since the L2 sequencer does not perform mining, it will always return false.

**Input**: None  
**Output**: Boolean - Mining status  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_mining",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": false
}
```

---

### eth_hashrate
Returns the hashrate of the mining operation.

Since the L2 sequencer does not perform mining, it will always return 0x0.

**Input**: None  
**Output**: String - Hashrate in hashes per second  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_hashrate",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0"
}
```

---

### eth_gasPrice
Returns the current gas price in Wei.

**Input**: None  
**Output**: String - Gas price in Wei  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_gasPrice",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x3b9aca00"
}
```

---

### eth_accounts
Returns a list of accounts owned by client.

Since the L2 node does not have a wallet function, it will return an empty array.

**Input**: None  
**Output**: Array - Account addresses  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_accounts",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": []
}
```

---

### eth_blockNumber
Returns the number of the most recent block.

**Input**: None  
**Output**: String - Block number in hexadecimal  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_blockNumber",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x10d4f"
}
```

---

### eth_getBlockTransactionCountByHash
Returns the number of transactions in a block by hash.

**Input**:

1. String - Block hash

**Output**: String - Transaction count  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getBlockTransactionCountByHash",
  "params": ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

---

### eth_getBlockTransactionCountByNumber
Returns the number of transactions in a block by number.

**Input**:

1. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: String - Transaction count  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getBlockTransactionCountByNumber",
  "params": ["latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

---

### eth_getBlockByHash
Returns block information by hash.

**Input**:

1. String - Block hash
2. Boolean - True for full transactions, false for hashes

**Output**: Object - Block information  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getBlockByHash",
  "params": ["0x18be14074d5f9039dee3a30307209ef3f404b46efcdd3cb20bfcb602bdcfe14e", true],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "baseFeePerGas": "0xf4240",
        "difficulty": "0x0",
        "extraData": "0x",
        "gasLimit": "0x3b9aca00",
        "gasUsed": "0x0",
        "hash": "0x18be14074d5f9039dee3a30307209ef3f404b46efcdd3cb20bfcb602bdcfe14e",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "miner": "0x0000000000000000000000000000000000000000",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x2a659",
        "parentHash": "0x3deccf3d4dd930a6eb7a44bb8da6e85e39a8e4b3ef58b867b5f6b0bbe7d88c29",
        "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x0",
        "stateRoot": "0x561875121d2a7809ef11a976ab00710a89d8b95c9a39b61b66ff676a6989de6e",
        "timestamp": "0x68626301",
        "totalDifficulty": "0x0",
        "transactions": [...],
        "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "uncles": []
    }
}
```

---

### eth_getBlockByNumber
Returns block information by number.

**Input**:

1. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`
2. Boolean - True for full transactions, false for hashes

**Output**: Object - Block information  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getBlockByNumber",
  "params": ["0x2a659", true],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "baseFeePerGas": "0xf4240",
        "difficulty": "0x0",
        "extraData": "0x",
        "gasLimit": "0x3b9aca00",
        "gasUsed": "0x0",
        "hash": "0x18be14074d5f9039dee3a30307209ef3f404b46efcdd3cb20bfcb602bdcfe14e",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "miner": "0x0000000000000000000000000000000000000000",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x2a659",
        "parentHash": "0x3deccf3d4dd930a6eb7a44bb8da6e85e39a8e4b3ef58b867b5f6b0bbe7d88c29",
        "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x0",
        "stateRoot": "0x561875121d2a7809ef11a976ab00710a89d8b95c9a39b61b66ff676a6989de6e",
        "timestamp": "0x68626301",
        "totalDifficulty": "0x0",
        "transactions": [...],
        "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "uncles": []
    }
}

```

---

### eth_getBlockReceipts
Returns the receipts of all transactions in a block.

**Input**:

1. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: Array - List of transaction receipts

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getBlockReceipts",
  "params": ["latest"],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "blockHash": "0x6216d90fccf81e9513c3a5158af11d4822ce8c6c35db406cefa8e7de089847dc",
            "blockNumber": "0x2942dd",
            "contractAddress": null,
            "cumulativeGasUsed": "0xd4e7",
            "effectiveGasPrice": "0xf4240",
            "from": "0x018445fb603eed6004414e7465e1ac33bfc2b93d",
            "gasUsed": "0xd4e7",
            "logs": [
                {
                    "address": "0x7ccc682e206692549a87c2054e79042d4ebc51f8",
                    "blockHash": "0x6216d90fccf81e9513c3a5158af11d4822ce8c6c35db406cefa8e7de089847dc",
                    "blockNumber": "0x2942dd",
                    "data": "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "logIndex": "0x0",
                    "removed": false,
                    "topics": [
                        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                        "0x000000000000000000000000018445fb603eed6004414e7465e1ac33bfc2b93d",
                        "0x0000000000000000000000001000000000000000000000000000000000000001"
                    ],
                    "transactionHash": "0x886cb571971a948abdaa0ad9a5b9acd4edadcd8097751ea5af0cab525e5c1292",
                    "transactionIndex": "0x0"
                }
            ],
            "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000100000000000000000000000000000000000000000000000000080010000010000002000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000100000000000000000000400000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000",
            "status": "0x1",
            "to": "0x7ccc682e206692549a87c2054e79042d4ebc51f8",
            "transactionHash": "0x886cb571971a948abdaa0ad9a5b9acd4edadcd8097751ea5af0cab525e5c1292",
            "transactionIndex": "0x0",
            "type": "0x0"
        },
        {
            "blockHash": "0x6216d90fccf81e9513c3a5158af11d4822ce8c6c35db406cefa8e7de089847dc",
            "blockNumber": "0x2942dd",
            "contractAddress": null,
            "cumulativeGasUsed": "0x5de9",
            "effectiveGasPrice": "0xf4240",
            "from": "0x03fdd1d736f3c7117884065d13b6d0ba632bc9e8",
            "gasUsed": "0x5de9",
            "logs": [],
            "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "status": "0x1",
            "to": "0x0f0a59c2c9ff0edaa79c846116b294b154d86f9e",
            "transactionHash": "0xc120cb6f381fcf2b09867989c92c23a92f7f2185cdf04dbef38959e6e15ca50e",
            "transactionIndex": "0x1",
            "type": "0x0"
        }
    ]
}
```

---

### eth_getTransactionByHash
Returns transaction information by hash.

**Input**:

1. String - Transaction hash

**Output**: Object - Transaction information  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getTransactionByHash",
  "params": ["0x75168af86226d88201e629df738864d33a301d137e982c4452803e53b40b1cf7"],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 0,
    "jsonrpc": "2.0",
    "result": {
        "blockHash": "0x496af88bb8527c768ef8bffbd86c7d7a3ff887699befaee6394f819094d89259",
        "blockNumber": "0x1604ea",
        "chainId": "0x216aad6",
        "from": "0x8121e0ac0173f9f0c70cf9f024da6f2a34b7c698",
        "gas": "0x4c4b40",
        "gasPrice": "0xf4240",
        "hash": "0x75168af86226d88201e629df738864d33a301d137e982c4452803e53b40b1cf7",
        "input": "0xa9059cbb00000000000000000000000010000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
        "nonce": "0x1e1fb",
        "r": "0xbd5373daccc2c084b9a167dd313f3f43146ca4f2eb91170022449de05a5017a3",
        "s": "0xb89fdb99e7ff8d66816d6117190b330ec60e1f1deba87892272d5047ff2f8e4",
        "to": "0xedea62545a3dda5236c414b0e48bc03fe42d5aed",
        "transactionIndex": "0x0",
        "type": "0x0",
        "v": "0x42d55cf",
        "value": "0x0"
    }
}
```

---

### eth_getTransactionByBlockHashAndIndex
Returns transaction information by block hash and index.

**Input**:

1. String - Block hash
2. String - An integer represented by a hex string, indicating the transaction index

**Output**: Object - Transaction information  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getTransactionByBlockHashAndIndex",
  "params": ["0x496af88bb8527c768ef8bffbd86c7d7a3ff887699befaee6394f819094d89259", "0x0"],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "blockHash": "0x496af88bb8527c768ef8bffbd86c7d7a3ff887699befaee6394f819094d89259",
        "blockNumber": "0x1604ea",
        "chainId": "0x216aad6",
        "from": "0x8121e0ac0173f9f0c70cf9f024da6f2a34b7c698",
        "gas": "0x4c4b40",
        "gasPrice": "0xf4240",
        "hash": "0x75168af86226d88201e629df738864d33a301d137e982c4452803e53b40b1cf7",
        "input": "0xa9059cbb00000000000000000000000010000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
        "nonce": "0x1e1fb",
        "r": "0xbd5373daccc2c084b9a167dd313f3f43146ca4f2eb91170022449de05a5017a3",
        "s": "0xb89fdb99e7ff8d66816d6117190b330ec60e1f1deba87892272d5047ff2f8e4",
        "to": "0xedea62545a3dda5236c414b0e48bc03fe42d5aed",
        "transactionIndex": "0x0",
        "type": "0x0",
        "v": "0x42d55cf",
        "value": "0x0"
    }
}
```

---

### eth_getTransactionByBlockNumberAndIndex
Returns transaction information by block number and index.

**Input**:

1. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`
2. String - An integer represented by a hex string, indicating the transaction index

**Output**: Object - Transaction information  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getTransactionByBlockNumberAndIndex",
  "params": ["latest", "0x0"],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "blockHash": "0x496af88bb8527c768ef8bffbd86c7d7a3ff887699befaee6394f819094d89259",
        "blockNumber": "0x1604ea",
        "chainId": "0x216aad6",
        "from": "0x8121e0ac0173f9f0c70cf9f024da6f2a34b7c698",
        "gas": "0x4c4b40",
        "gasPrice": "0xf4240",
        "hash": "0x75168af86226d88201e629df738864d33a301d137e982c4452803e53b40b1cf7",
        "input": "0xa9059cbb00000000000000000000000010000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
        "nonce": "0x1e1fb",
        "r": "0xbd5373daccc2c084b9a167dd313f3f43146ca4f2eb91170022449de05a5017a3",
        "s": "0xb89fdb99e7ff8d66816d6117190b330ec60e1f1deba87892272d5047ff2f8e4",
        "to": "0xedea62545a3dda5236c414b0e48bc03fe42d5aed",
        "transactionIndex": "0x0",
        "type": "0x0",
        "v": "0x42d55cf",
        "value": "0x0"
    }
}
```

---

### eth_getTransactionReceipt
Returns transaction receipt by hash.

**Input**:

1. String - Transaction hash

**Output**: Object - Transaction receipt  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getTransactionReceipt",
  "params": ["0x75168af86226d88201e629df738864d33a301d137e982c4452803e53b40b1cf7"],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "blockHash": "0x496af88bb8527c768ef8bffbd86c7d7a3ff887699befaee6394f819094d89259",
        "blockNumber": "0x1604ea",
        "contractAddress": null,
        "cumulativeGasUsed": "0x6015",
        "effectiveGasPrice": "0xf4240",
        "from": "0x8121e0ac0173f9f0c70cf9f024da6f2a34b7c698",
        "gasUsed": "0x6015",
        "logs": [...],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": "0x0",
        "to": "0xedea62545a3dda5236c414b0e48bc03fe42d5aed",
        "transactionHash": "0x75168af86226d88201e629df738864d33a301d137e982c4452803e53b40b1cf7",
        "transactionIndex": "0x0",
        "type": "0x0"
    }
}
```

---

### eth_getLogs
Returns logs matching filter.

**Input**:

1. Object - Filter options:
    - fromBlock: String - An integer represented by a hex string, indicating the block number or the string "latest", "earliest", "pending", "safe" or "finalized"
    - toBlock:  String - An integer represented by a hex string, indicating the block number or the string "latest", "earliest", "pending", "safe" or "finalized"
    - address: String | Array, 20 Bytes Address encoded as hex string - (optional) Contract address or a list of addresses from which logs should originate.
    - topics: Array of DATA, - (optional) Array of 32 Bytes DATA topics encoded as hex string. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.
    - blockhash: DATA, 32 Bytes data encoded as hex string - (optional, future) With the addition of EIP-234, blockHash will be a new filter option which restricts the logs returned to the single block with the 32-byte hash blockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash. If blockHash is present in the filter criteria, then neither fromBlock nor toBlock are allowed.

**Output**: Array - Array of log objects, or null if nothing match the filter:
- removed: TAG - true when the log was removed, due to a chain reorganization. false if its a valid log.
- logIndex: QUANTITY - integer of the log index position in the block. null when its pending log.
- transactionIndex: QUANTITY - integer of the transactions index position log was created from. null when its pending log.
- transactionHash: DATA, 32 Bytes - hash of the transactions this log was created from. null when its pending log.
- blockHash: DATA, 32 Bytes - hash of the block where this log was in. null when its pending. null when its pending log.
- blockNumber: QUANTITY - the block number where this log was in. null when its pending. null when its pending log.
- address: DATA, 20 Bytes - address from which this log originated.
- data: DATA - contains zero or more 32 Bytes non-indexed arguments of the log.
- topics: Array of DATA - Array of 0 to 4 32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256)), except you declared the event with the anonymous specifier.)

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getLogs",
  "params": [{
    "fromBlock": "0x156aea",
    "toBlock": "0x156aed",
    "address": "0x14690f87f2f58d47bac4f7668bfeb930c68fc891",
    "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]
  }],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "address": "0x14690f87f2f58d47bac4f7668bfeb930c68fc891",
            "blockHash": "0x3183f9c8f54c3541688ee72325b03045dd1218705874c8272f54677bbe4c7831",
            "blockNumber": "0x156aea",
            "data": "0x0000000000000000000000000000000000000000000000000000000000000001",
            "logIndex": "0x0",
            "removed": false,
            "topics": [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "0x000000000000000000000000c441849d0df270286e0415b44cc9a5e55221aa81",
                "0x0000000000000000000000001000000000000000000000000000000000000001"
            ],
            "transactionHash": "0xa9e0ad7036c45b4a9c351bf544f3d6c10e2d5011ad10cd3470c2faba3227154e",
            "transactionIndex": "0x1"
        },
        {
            "address": "0x14690f87f2f58d47bac4f7668bfeb930c68fc891",
            "blockHash": "0x7dfbf063a619f5fbf28e1627edb5fe3a211cfcae1a792858d212a4a135dd7042",
            "blockNumber": "0x156aeb",
            "data": "0x0000000000000000000000000000000000000000000000000000000000000001",
            "logIndex": "0x0",
            "removed": false,
            "topics": [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "0x000000000000000000000000c441849d0df270286e0415b44cc9a5e55221aa81",
                "0x0000000000000000000000001000000000000000000000000000000000000001"
            ],
            "transactionHash": "0xd07de1804d6f98e04c845931893689725843df9e98bced53bd9fbcc197d2ffc5",
            "transactionIndex": "0x4"
        }
    ]
}

```

---

### eth_getUncleCountByBlockHash
Returns the number of uncles in a block by hash.

Since L2 networks do not produce uncle blocks, this API always returns 0.

**Input**:

1. String - Block hash

**Output**: String - Uncle count  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getUncleCountByBlockHash",
  "params": ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0"
}
```

---

### eth_getUncleCountByBlockNumber
Returns the number of uncles in a block by number.

Since L2 networks do not produce uncle blocks, this API always returns 0.

**Input**:

1. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: String - Uncle count  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getUncleCountByBlockNumber",
  "params": ["latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0"
}
```

---

### eth_getUncleByBlockHashAndIndex
Returns uncle information by block hash and index.

Since L2 networks do not produce uncle blocks, this API always returns null value.

**Input**:

1. String - Block hash
2. String - Uncle index

**Output**: Object - Uncle information  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getUncleByBlockHashAndIndex",
  "params": ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238", "0x0"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": null
}
```

---

### eth_getUncleByBlockNumberAndIndex
Returns uncle information by block number and index.

Since L2 networks do not produce uncle blocks, this API always returns null value.

**Input**:

1. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`
2. String - Uncle index

**Output**: Object - Uncle information  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getUncleByBlockNumberAndIndex",
  "params": ["latest", "0x0"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": null
}
```

---

### eth_getBalance
Returns the balance of the account at the specified block.

**Input**:

1. String - Address
2. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: String - Account balance in Wei  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xde0b6b3a7640000"
}
```

---

### eth_getStorageAt
Returns the value from a storage position at an address.

**Input**:

1. String - Address
2. String - Integer of the position in storage
3. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: String - Storage value  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getStorageAt",
  "params": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "0x0", "latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0000000000000000000000000000000000000000000000000000000000000001"
}
```

---

### eth_getTransactionCount
Returns the number of transactions sent from an address.

**Input**:

1. String - Address
2. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: String - Transaction count  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getTransactionCount",
  "params": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

---

### eth_getCode
Returns the code at an address.

**Input**:

1. String - Address
2. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: String - Bytecode  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getCode",
  "params": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x6080..."
}
```

---

### eth_getAccount
Return the account at an address

**Input**:

1. String - Address
2. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: Object - Account  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getAccount",
  "params": ["0x8121e0ac0173f9f0c70cf9f024da6f2a34b7c698", "latest"],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 232,
    "jsonrpc": "2.0",
    "result": {
        "balance": "0x363578546476EDB800",
        "codeHash": "0x84f348468f66ba01ab042c04157d07223103df65deb4ca6becda6357a4d0713b",
        "nonce": "0x1fa71",
        "storageRoot": "0x0000000000000000000000000000000000000000000000000000000000000000"
    }
}
```

---

### eth_sendRawTransaction
Sends a signed transaction.

**Input**:

1. String - Signed transaction data

**Output**: String - Transaction hash  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_sendRawTransaction",
  "params": ["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

---

### eth_call
Executes a message call without creating a transaction.

**Input**:

1. Object - Transaction call object
    - from: (optional) Address of sender.
    - to: Address of contract.
    - gas: (optional) Gas limit.
    - gasPrice: (optional) Gas price.
    - value: (optional) Amount in wei.
    - data/input: Call data.
2. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: String - Return value as a hexadecimal string.

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_call",
  "params": [{
    "from": "0x...",
    "to": "0x687422eea2cb73b5d3e242ba5456b782919afc85",
    "gasPrice": "0x...",
    "value": "0x...",
    "data": "0x..."
  }, "latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x..."
}
```

---

### eth_estimateGas
Estimates the gas needed for a transaction.

**Input**:

1. Object - Transaction object
    - from: (optional) Address of sender.
    - to: Address of contract.
    - gas: (optional) Gas limit.
    - gasPrice: (optional) Gas price.
    - value: (optional) Amount in wei.
    - data/input: Call data.
2. String - (optional) An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: String - Gas estimate

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_estimateGas",
  "params": [{
    "to": "0x687422eea2cb73b5d3e242ba5456b782919afc85",
    "data": "0x..."
  }],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x5208"
}
```

---

### eth_createAccessList
Creates an access list.

**Input**:

1. Object - Transaction call object
    - from: (optional) Address of sender.
    - to: Address of contract.
    - gas: (optional) Gas limit.
    - gasPrice: (optional) Gas price.
    - value: (optional) Amount in wei.
    - data/input: Call data.
2. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: Object - Access list  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_createAccessList",
  "params": [{
    "to": "0x687422eea2cb73b5d3e242ba5456b782919afc85",
    "data": "0x..."
  }, "latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "accessList": [],
    "gasUsed": "0x0"
  }
}
```



### eth_chainId
Returns the chain ID.

**Input**: None  
**Output**: String - Chain ID  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_chainId",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

---

### eth_maxPriorityFeePerGas
Returns the priority fee needed to be included in a block.

**Input**: None  
**Output**: String - Priority fee  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_maxPriorityFeePerGas",
  "params": [],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x10000"
}
```

---

### eth_feeHistory
Returns fee history.

**Input**:

1. String - Block count. The number of blocks in the requested range.
2. String - Newest block. The highest An integer represented by a hex string, indicating the block number of the requested range, or 'lastest' for the most recent block
3. Array - Reward percentiles. An optional array of percentile values (between 0 and 100) in ascending order. For each block in the requested range, the transactions are sorted by effective priority fee per gas, and the corresponding effective priority fee per gas at each percentile is returned.

**Output**: Object - Fee history  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_feeHistory",
  "params": ["0x4", "latest", [0.1, 0.2, 0.3]],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "oldestBlock": "0x10d4f",
    "baseFeePerGas": ["0x3b9aca00", "0x3b9aca00", "0x3b9aca00", "0x3b9aca00"],
    "gasUsedRatio": [0.1, 0.2, 0.3],
    "reward": [["0x0", "0x0", "0x0"], ["0x0", "0x0", "0x0"], ["0x0", "0x0", "0x0"]]
  }
}
```

---

### eth_subscribe
Creates a subscription for specified events.

This is a websocket API. 

**Input**:

1. String - Event type ("newHeads", "logs", "newPendingTransactions")
2. Object - Filter options (for "logs" only)

**Output**: String - Subscription ID  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["newHeads"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

---

### eth_unsubscribe
Cancels a subscription.

This is a websocket API. 

**Input**:

1. String - Subscription ID

**Output**: Boolean - True if successfully unsubscribed  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_unsubscribe",
  "params": ["0x1"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

## DEBUG Methods
### debug_traceBlockByHash
Traces all transactions in a block by hash.

**Input**:

1. String - Block hash
2. Object - Tracer configuration (optional)

**Output**: Array - Trace results  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "debug_traceBlockByHash",
  "params": ["0x8db9379571cbc2fa54d21f4a171c04a1f1d56cfac4d9cbd38ace94bdae096fe7", {"tracer": "callTracer"}],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "result": {
                "error": "73746174757320636f64653a2032",
                "from": "0xa985c6d0f08dfb0cf9d1d145d2488b89726bdde0",
                "gas": "0x4c4b40",
                "gasUsed": "0x628a",
                "input": "0xafef7efd0000000000000000000000001000000000000000000000000000000000000001000000000000000000000000100000000000000000000000000000000000000100000000000000000000000010000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
                "to": "0x4d16e79ed4a22f35e55072ff356fbfe05af47d1c",
                "type": "CALL",
                "value": "0x0"
            },
            "txHash": "0x239b5d6ebd6e252acda70375d4c8006d72b2cee206bbd333fa8b6e595c17be26"
        },
        {
            "result": {
                "from": "0x6c6fd79c1885ebe1ea3a21175b944d2f153fadff",
                "gas": "0x9d1e",
                "gasUsed": "0x5e27",
                "input": "0xa9059cbb00000000000000000000000010000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
                "output": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "to": "0xd7fb852730b0990197893e7e04cc976fa9db27a0",
                "type": "CALL",
                "value": "0x0"
            },
            "txHash": "0x31f5edc1c8dcd4e5cff5d1d2177006423c9652f2bad2c7c17d73e84ef3d7936d"
        }
    ]
}
```

---

### debug_traceBlockByNumber
Traces all transactions in a block by number.

**Input**:

1. String - An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`
2. Object - Tracer configuration (optional)

**Output**: Array - Trace results  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "debug_traceBlockByNumber",
  "params": ["latest", {"tracer": "callTracer"}],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "result": {
                "error": "73746174757320636f64653a2032",
                "from": "0xa985c6d0f08dfb0cf9d1d145d2488b89726bdde0",
                "gas": "0x4c4b40",
                "gasUsed": "0x628a",
                "input": "0xafef7efd0000000000000000000000001000000000000000000000000000000000000001000000000000000000000000100000000000000000000000000000000000000100000000000000000000000010000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
                "to": "0x4d16e79ed4a22f35e55072ff356fbfe05af47d1c",
                "type": "CALL",
                "value": "0x0"
            },
            "txHash": "0x239b5d6ebd6e252acda70375d4c8006d72b2cee206bbd333fa8b6e595c17be26"
        },
        {
            "result": {
                "from": "0x6c6fd79c1885ebe1ea3a21175b944d2f153fadff",
                "gas": "0x9d1e",
                "gasUsed": "0x5e27",
                "input": "0xa9059cbb00000000000000000000000010000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
                "output": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "to": "0xd7fb852730b0990197893e7e04cc976fa9db27a0",
                "type": "CALL",
                "value": "0x0"
            },
            "txHash": "0x31f5edc1c8dcd4e5cff5d1d2177006423c9652f2bad2c7c17d73e84ef3d7936d"
        }
    ]
}
```

---

### debug_traceTransaction
Traces a transaction by hash.

**Input**:

1. String - Transaction hash
2. Object - Tracer configuration (optional)

**Output**: Object - Trace result  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "debug_traceTransaction",
  "params": ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b", {"tracer": "callTracer"}],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "from": "0x6c6fd79c1885ebe1ea3a21175b944d2f153fadff",
        "gas": "0x9d1e",
        "gasUsed": "0x5e27",
        "input": "0xa9059cbb00000000000000000000000010000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
        "output": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "to": "0xd7fb852730b0990197893e7e04cc976fa9db27a0",
        "type": "CALL",
        "value": "0x0"
    }
}
```

---

### debug_getRawBlock
Returns the raw RLP-encoded block by hash or number.

**Input**:

1. String - Block hash or number. Block number could be hex number or tag such as "earliest" or "latest".

**Output**: String - RLP-encoded block  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "debug_getRawBlock",
  "params": ["latest"],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xf943..."
}
```

---

### debug_getRawHeader
Returns the raw RLP-encoded block header by hash or number.

**Input**:

1. String - Block hash or number. Block number could be hex number or tag such as "earliest" or "latest".

**Output**: String - RLP-encoded header  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "debug_getRawHeader",
  "params": ["latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x..."
}
```

---

### debug_getRawReceipts
Returns the raw RLP-encoded receipts for a block by hash or number.

**Input**:

1. String - Block hash or number

**Output**: Array - RLP-encoded receipts  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "debug_getRawReceipts",
  "params": ["latest"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": ["0x...", "0x..."]
}
```

---

### debug_getRawTransaction
Returns the raw RLP-encoded transaction by hash.

**Input**:

1. String - Transaction hash

**Output**: String - RLP-encoded transaction  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "debug_getRawTransaction",
  "params": ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],
  "id": 1
}
```

**Example Response**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x..."
}
```

---



## Jovay Methods
### jovay_getProof
Returns proof for an account or storage.

**Input**:

1. String - Address
2. Array - Storage keys
3. String -An integer represented by a hex string, indicating the block number or the string `"latest"`, `"earliest"`, `"pending"`, `"safe"` or `"finalized"`

**Output**: Array - Proof data  

**Example Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "jovay_getProof",
  "params": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", ["0x0", "0x1"], "latest"],
  "id": 1
}
```

**Example Response**:

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        [
            "0x006e99230b2f0df03b0d82bc2a707a080de2a6a3716cc3563d669d06607f9ca5587771450c5cdfe74c54849e5f2df98d049fa348527ee3660ebeed1b34dd113430",
            "0x003bb26853373c3c0d9202590d2ab75f540ee99f26e8868538d4568142c92c6a0d1065776d8b587a443bf6ee5f8f5fe507130335395e9e1168134c2d7218bbea4f",
            "0x0076ddf40f04db5651d8578863e57c96582efa700190bb6f1486451949d02b8a1c446cc96e158774723582a94015b1853063c35538cec0336ee34ace2114a2cc18",
            "0x002c946c07cb77a171c258502bda52ec3b584c333166b8380fe4f06e4b38ffc44fc0991b5f610ffe4eaa76811d3e4f0f0b899e4569cfeb88399152ba5c48628237",
            "0x00253fbb02bd65af45e20eab0686fa1427abb8383b25b8e35cb8496f67112b5b0f12e8754938e9552be6fc270dfebe7977c7d09d6abb4ae40ddcb1582de58b201d",
            "0x003e923e01dac620228dcaf43d6d2162388267bd63e3884822196c185acdab2252359b522c1bd8f0615305a61c44b90642227d6c612343e93cb090b549fdc5e636",
            "0x00ffb56511833f5f6b0d1d9a09bfe51a3332e3235c6ff25029712b3836a8bf202bb550203f4cc2d02aff0e376494258a7531e0e620ae2cf1428a76ee57b2e97c56",
            "0x00e7f61166f9be003caffdd24079847a31f8100468d6212f4f997a5f0266389f75ac281e506858f57793a6db194207b71f665dc51eaded9f12ec5d6113a7fd080f",
            "0x00e422e16fbfbe6566c5c0030b4b353d13f0549349c8fcd65b1bb28c31eacfb16766ad8a32ffae561f4f9d1e4d88c7ab0a5c6c5f38949a93575abcdc1bb51d2753",
            "0x001b315e3ab11aca40b5a0fb4f8a171524df8ab23fdb398d2f8c3336133d6bb22c86d6cc12efd4d02c6655254a36f337356c93ac26fff16d451ea0cf017dcbaa38",
            "0x00829a3a2a5576ba3289b6df4af67a3b4e2e929062c2c7e931af4d1b251187e268cc41d50f83cbe873302e0c69c85747575251f548e87ac543ef3af05047928a26",
            "0x00458431752ccd97192bf5c47228f9146d8b4b60705b1d6a6de4d271539a4a310e37587d5923734b4e5549583ac5bffa607725584f33fdf8772cbc6d362466ba5e",
            "0x0024d55b6b9f85d60338da6f3290f57909654eed26e6824c33a121180447197c20aeedcf5c19aa405147823b758e7f4712b7d59d3d03800526b21cae6c6bd4483e",
            "0x00d90d8943c8f797692e43b951d57e6216f8c4f20b25c38b0a6133a1080f2cd951c15771359ffab877097e8c2e736bac209fe7293c3de6ab2d56887a0bad156a72",
            "0x0055c81854a897590871a8593ac8021971015637306ecdf90e5ff63c6cf62d0b273419923b2c57a94e99253e164e020b69904ead72575ead64c1ca49010b883c0d",
            "0x009b136814108e771aaefed67166c26e7329cb2c12ff7f6260d366d41c33978663a12dc25f13309c3d35a8b62d2ce871288f1e473e031ab24a7eff0c0050ae1611",
            "0x0017157a425b512e4305a33d755816f524fb714838cd6d2613b691e631eb663b1912c05c2782c19e19989f850c59b62025f426f0274ea467004da1e822b147da1a",
            "0x000b34f9382b146210a1bfca548b30075a7c867d54c218391ac5f11552a94adb1e18fe682b385f6b01dde3bb3f9bcf3055e51dd33f841cc62ee547cf4d61ba9712",
            "0x0055cf513cf8140d0202864f39f838ff10176c9e460d86ba38ac5f825e65320f2f8396955b86f9861ef95b0a334d72f233956cf136ec29735069cad62946608e23",
            "0x009e6ae550dea1303addc15a6d022fd052292c4b4081c6dd77156ee92facad362722e4af2015ad6c74c8097000438adf5e7e971254373bfb69ea1bd54062b3e120",
            "0x007c28af72b06eed419e3b7f5b82c6401f4bb118754ccbc01cc605f655fd30a64a630b802cd60ff874c08bc54be513680519216e4f5fb268058b270272a0cd394f",
            "0x00fa95534851edf96928043573dbffef3f3f615b37e8ca6755fea2be6b09a87a15bc7e110106a9bd6242d3197177204772792afa0eb6d3fe28682970276faca165",
            "0x003139df641982d61045885d06f1a3bf341b034b099282486f1d952b0e81aef254ecfef425ae503271e1f8e31d984b1548e4768b14672a6b43d60fe876aada6822",
            "0x00dbda790c37211243c9f7376638332643998b076d542d322032ed685032d0e674968de54d0ba69f03d02b913e52e4d25acf84ec23b23df24b73fe2c3adf497f21",
            "0x01af128406e2a2676d7cc6de2a15169c6bcbdac863e151cb085f098f45cbce94445a54524f4e00000000000000000000000000000000000000000000000000000a"
        ]
    ]
}
```

---





