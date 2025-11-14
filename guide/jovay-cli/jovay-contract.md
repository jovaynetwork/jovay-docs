---
outline: deep
---

# jovay contract
```bash
jovay contract [sub-command] [options]
```
## Description
`jovay contract` is used to read (call) or write on contract.

## `call`
Read (call) contract.
```bash
jovay contract call [options]
```
- `--contract <0x string>` (**required**) \
  Contract address to call.
---

- `--method <string>` (**required**) \
  Contract method name to call.
---

- `--abi [string]` \
  Local file path to `ABI` file for function encoding and decoding. As an alternative, you can omit this option and define the function signature using `--inputs` and `--outputs`.
---

- `--inputs [List<string>]` \
  Define the input parameter types, used when an `ABI` file is not provided via `--abi`. \
  **Example**: `--inputs address,uint256[],(address,bytes32)`
---

- `--outputs [List<string>]` \
  Define the output parameter types, used when an `ABI` file is not provided via `--abi`. \
  **Note**: If this option is omitted (and no `ABI` is provided), any data returned will not be decoded or show on terminal. \
  **Example**: `--outputs string,(address,uint256)`
---

- `--args [string]` \
  Provide the arguments as a JSON array string wrapped in single quotes ('...'). The values in the array must match the order and type of the function's signature (defined by `--abi` or `--inputs`). \
  **Note**: Single quotes ('...') is required to prevent your terminal from misinterpreting special characters like double quotes or brackets. \
  **Example**: For types `address, (uint, string)`, use `--args '"0x123", [100, "hello"]'`
---

- `--rpc [string]` \
  Overwrite the chain rpc when call contract.
---

- `--l1` \
  Call contract on Ethereum (or Ethereum Sepolia) instead of on Jovay (or Jovay Sepolia Testnet).
---

- `--dry-run` \
  Output encoded arguments instead of calling contract.
---

- `-h, --help` \
  Display help information for this command.


## `write`
Send to write transaction to a contract and returns a transaction hash. 
 
**Note**: The hash confirms submission, but the transaction itself can still fail (revert) on-chain.
```bash
jovay contract write [options]
```
- `--contract <0x string>` (**required**) \
  Contract address to call.
---

- `--method <string>` (**required**) \
  Contract method name to call.
---

- `--abi [string]` \
  Local file path to `ABI` file for function encoding and decoding. As an alternative, you can omit this option and define the function signature using `--inputs` and `--outputs`.
---

- `--inputs [List<string>]` \
  Define the input parameter types, used when an `ABI` file is not provided via `--abi`. \
  **Example**: `--inputs address,uint256[],(address,bytes32)`
---

- `--args [string]` \
  Provide the arguments as a JSON array string wrapped in single quotes ('...'). The values in the array must match the order and type of the function's signature (defined by `--abi` or `--inputs`). \
  **Note**: Single quotes ('...') is required to prevent your terminal from misinterpreting special characters like double quotes or brackets. \
  **Example**: For types `address, (uint, string)`, use `--args '"0x123", [100, "hello"]'`
---

- `--value [bigint]` \
  The amount of native token to send, typically for interacting with payable functions (like a paid mint). \
    **Note**: This value must be provided in the smallest denomination (e.g., Wei). To send `1 ETH`, enter `1000000000000000000`.
---

- `--enc-key [string]` \
  The current encryption key for the wallet. Required when use encrypted wallet.
---

- `--sk, --secret-key [0x string]` \
  Overwrite the wallet to use.
---

- `--rpc [string]` \
  Overwrite the chain rpc when call contract.
---

- `--l1` \
  Call contract on Ethereum (or Ethereum Sepolia) instead of on Jovay (or Jovay Sepolia Testnet).
---

- `--broadcast` \
  Broadcast the signed transaction to the blockchain network. If flag is omitted, CLI only output the raw signed transaction data without sending it.
---

- `-h, --help` \
  Display help information for this command.
