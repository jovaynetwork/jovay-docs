---
outline: deep
---

# jovay wallet
```bash
    jovay wallet [sub-command] [options]
```

## Description
`jovay wallet` is used to manage wallet configurations, query on-chain status (like address and balance), and execute transactions such as transfers and approvals.


## `set`
Update configuration for wallet.
```bash
    jovay wallet set [options]
```

- `--sk, --secret-key [0x string]` \
  Provide a new private key to replace the one in the current wallet. \
  **Security Note**: This action is irreversible. If omitted, the private key will remain unchanged.
---

- `--origin-enc-key [string]` \
  The current encryption key for the wallet. This is required to unlock an encrypted wallet when changing the key or disabling encryption.
---
- `--enc` \
  Enables **encryption on wallet**. If `--enc-key` is not also used, a random key will be generated and provided to you **(be sure to save it!)**.
---
- `--enc-key [string]`\
  New key to encrypt the wallet's private key. CLI will process it with SHA-256 to generate a high-strength encryption key. Using this option automatically enables encryption (not need to add `--enc` separately).

---
- `-h, --help` \
  Display help information for this command.

### Practical Tips

- **Set up a new wallet (run with `--sk`)**: You can append `--enc` or `--enc-key` in the same command to directly store this new wallet in its most secure, encrypted format.
- **Modify current wallet (run without `--sk`)**: 
  - **Encrypt plaintext wallet**: Use `--enc` or `--enc-key` on an unencrypted wallet.
  - **Decrypt an encrypted wallet**: Provide **only** the current key with `--origin-enc-key` to revert it to plaintext.
  - **Change the encryption key**: Use both the old key (`--origin-enc-key`) and the new key (`--enc-key`) together.


## `address`
Get current wallet address.
```bash
    jovay wallet address
```


## `airdrop`
Claims `0.001 Jovay Sepolia ETH` from the official faucet, limited to once every 24 hours.
```bash
    jovay wallet airdrop
```

## `balance`
Gets the balance of the native token (ETH) or a specific ERC20 token for a given address.
```bash
    jovay wallet balance [options]
```

- `--address [0x string]` \
The address to get balance of. When not provided, the address in wallet will be used. 
---

- `--token [0x string]` \
  The ERC20 token address to query. If omitted, the native token (ETH) balance will be return.
---

- `--rpc [string]` \
    Overwrite the chain rpc when query balance.
---

- `--l1` \
Query balance on Ethereum (or Ethereum Sepolia) instead of on Jovay (or Jovay Sepolia Testnet).
---

- `--block [0x string / bigint]` \
Query balance for specific block height.
--- 
- `-h, --help` \
  Display help information for this command.

## `approve`
Sets the allowance for a spender to use your tokens. You can see [Token Standard](https://eips.ethereum.org/EIPS/eip-20) for more information.
```bash
    jovay wallet approve [options]
```

- `--amount <bigint>` (**required**) \

    The amount of token you want to set the allowance. **Note: This value must be specified in the token's smallest unit.** 

    **Example**: Approve `0.01 USDC` with 6 decimals to spender, should enter `10000`.
---

- `--to <0x string>` (**required**)  \
  The spender's address.
---

- `--token <0x string>` (**required**) \
  The ERC20 token address to approve.
---

- `--enc-key [string]` \
  The current encryption key for the wallet. Required when use encrypted wallet.
---

- `--sk, --secret-key [0x string]` \
  Overwrite the wallet to use.
---

- `--rpc [string]` \
  Overwrite the chain rpc  when send transaction.
---

- `--l1` \
  Send transaction to Ethereum (Sepolia) instead of to Jovay (Sepolia Testnet).
---

- `--broadcast` \
  Broadcasts the signed transaction to the blockchain network. If flag is omitted, CLI only output the raw signed transaction data without sending it.
---
- `-h, --help` \
  Display help information for this command.


## `transfer`
Transfer the native token (ETH) or a specific ERC20 token to a given address.
```bash
    jovay wallet transfer [options]
```

- `--amount <bigint>` (**required**) \

  The amount of token you want to transfer. **Note: This value must be specified in the token's smallest unit.**

  **Example**: Transfer `0.001 ETH` with 18 decimals to recipient, should enter `1000000000000000`.
---

- `--to <0x string>` (**required**)  \
  The recipient's address.
---

- `--token [0x string]` \
  The ERC20 token address to transfer. If flag is omitted, CLI will transfer native token. 
---

- `--enc-key [string]` \
  The current encryption key for the wallet. Required when use encrypted wallet.
---

- `--sk, --secret-key [0x string]` \
  Overwrite the wallet to use.
---

- `--rpc [string]` \
  Overwrite the chain rpc when send transaction.
---

- `--l1` \
  Send transaction to Ethereum (Sepolia) instead of to Jovay (Sepolia Testnet).
---

- `--broadcast` \
  Broadcast the signed transaction to the blockchain network. If flag is omitted, CLI only output the raw signed transaction data without sending it.
---
- `-h, --help` \
  Display help information for this command.
