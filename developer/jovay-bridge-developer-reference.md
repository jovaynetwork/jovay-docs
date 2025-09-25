---
outline: deep
---

# Jovay Bridge Developer Reference

This document provides a technical reference for developers who need to interact directly with the Jovay ETH Bridge smart contracts.

:::info
For a simple and secure user experience, we strongly recommend using the official [Jovay Bridge DApp Tutorial](../guide/jovay-bridge-dapp-tutorial.md) instead of interacting with the contracts directly.
:::

## Contract Addresses & ABIs
### L1 ETH Bridge Contract (on Ethereum)
| Network | L1 Bridge Contract Address |
| --- | --- |
| **Ethereum Mainnet** | `0x922248db4a99bb542539ae7165fb9d7a546fb9f1` |
| **Sepolia Testnet** | `0x940eFB877281884699176892B02A3db49f29CDE8` |

<EnhancedCollapsibleCodeBlock 
  title="View L1 Bridge ABI"
  language="json"
  :show-copy-button="true"
  :show-language-label="true"
  :default-expanded="false"
>

```json
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "msg",
				"type": "bytes"
			}
		],
		"name": "DepositETH",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "msg",
				"type": "bytes"
			}
		],
		"name": "FinalizeWithdrawETH",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gasLimit_",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data_",
				"type": "bytes"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value_",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "msg_",
				"type": "bytes"
			}
		],
		"name": "finalizeWithdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]
```
</EnhancedCollapsibleCodeBlock>

### L2 ETH Bridge Contract (on Jovay)
| Network | L2 Bridge Contract Address |
| --- | --- |
| **Jovay Mainnet** | `0xb220d17a11bd2d11e3f57a305ff5b481c81b1028` |
| **Jovay Testnet** | `0xD278bC7189d2ed65c005c345A0e8a387f15b7a3A` |

<EnhancedCollapsibleCodeBlock 
  title="View L2 Bridge ABI"
  language="json"
  :show-copy-button="true"
  :show-language-label="true"
  :default-expanded="false"
>

```json
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "msg",
				"type": "bytes"
			}
		],
		"name": "FinalizeDepositETH",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "msg",
				"type": "bytes"
			}
		],
		"name": "WithdrawETH",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "msg_",
				"type": "bytes"
			}
		],
		"name": "claimDeposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "msg_",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "new_refund_address_",
				"type": "address"
			}
		],
		"name": "claimDeposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data_",
				"type": "bytes"
			}
		],
		"name": "finalizeDeposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gasLimit_",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data_",
				"type": "bytes"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]
```
</EnhancedCollapsibleCodeBlock>

## Core Workflows
### Deposit: L1 to L2

#### Step 1: Initiate Deposit on L1
To deposit ETH from Layer 1 to Layer 2, call the `deposit` function on the **L1 Bridge Contract**.

##### `deposit`
```solidity
function deposit(
    address to_,
    uint256 amount_,
    uint256 gasLimit_,
    bytes memory data_
) external payable;
```

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `to_` | `address` | The recipient address on Jovay (L2). |
| `amount_` | `uint256` | The amount of ETH (in wei) to deposit. |
| `gasLimit_` | `uint256` | The gas limit for the corresponding transaction on L2. |
| `data_` | `bytes` | Optional data to pass with the message. Can be `0x` for a standard ETH deposit. |
| `value` | `payable` | The `msg.value` of the L1 transaction must be `>= amount_ + (gasLimit_ * l2GasPrice)`. |

After the L1 transaction is finalized, the bridge relayer should automatically call `finalizeDeposit` on L2 to credit the funds to the recipient.

#### Step 2 (Optional): Manually Claim Deposit on L2
In the rare event that the automated deposit does not arrive in your L2 account after a reasonable time, you can manually trigger the finalization.

To do this, call the `claimDeposit` function on the **L2 Bridge Contract**.

##### `claimDeposit`
```solidity
function claimDeposit(bytes memory msg_) external;
```

This function allows a user to manually claim their assets on L2 if the automatic deposit relay fails.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `msg_` | `bytes` | The original message data from the `DepositETH` event log of your L1 deposit transaction. You can find this in the transaction details on an L1 block explorer. |

---

### Withdrawal: L2 to L1
Withdrawing ETH from Layer 2 to Layer 1 is a two-step process that requires two separate transactions.

#### Step 1: Initiate Withdrawal on L2
First, call the `withdraw` function on the **L2 Bridge Contract**.

##### `withdraw`
```solidity
function withdraw(
    address to_,
    uint256 amount_,
    uint256 gasLimit_,
    bytes memory data_
) external payable;
```

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `to_` | `address` | The recipient address on Ethereum (L1). |
| `amount_` | `uint256` | The amount of ETH (in wei) to withdraw. |
| `gasLimit_` | `uint256` | The gas limit for the finalization transaction on L1. |
| `data_` | `bytes` | Optional data. Can be `0x`. |
| `value` | `payable` | The `msg.value` of the L2 transaction must be `>= amount_ + (gasLimit_ * l1GasPrice)`. |


After this L2 transaction is confirmed, you must wait for the transaction batch to be finalized on L1 (up to 1 hour). Once finalized, a proof will be available on the Jovay Explorer page for your transaction.

#### Step 2: Finalize Withdrawal on L1
Next, call the `relayMsgWithProof` function on the **L1 Bridge Contract** to claim your funds on Ethereum.

##### `relayMsgWithProof`
```solidity
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
```

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `value_` | `uint256` | The exact amount of ETH you withdrew on L2. |
| `nonce_` | `uint256` | The nonce of the cross-chain message. Find this in the `SentMsg` event log on the L2 withdrawal transaction page in the explorer. |
| `msg_` | `bytes` | The original message from the `SentMsg` event log. This is typically in Base64 on the explorer and must be **converted to a Hex string** (with a `0x` prefix) before being passed to the function. |
| `proof_` | `L2MsgProof` | A struct containing the proof data, passed as a tuple `[batchIndex, proof]`. |
| `batchIndex` | `uint256` | The index of the batch containing your L2 withdrawal transaction. Find this by clicking the block number on the transaction page in the explorer. |
| `merkleProof` | `bytes` | The SPV proof for your L2 message. This is the main hex string labeled "Proof" on the transaction page in the explorer. |
