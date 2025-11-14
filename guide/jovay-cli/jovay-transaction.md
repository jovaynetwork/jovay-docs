---
outline: deep
---

# jovay transaction
```bash
jovay transaction [sub-command] [options]
```

## Description
`jovay transaction` is used to read transaction info or send signed raw transaction.

## `info`
Read transaction info.
```bash
jovay transaction info [options]
```
- `--tx, --transaction <hash string>` (**required**) \
    The transaction hash to get info.
---

- `--raw`\
  Display the full raw JSON response instead of the default formatted summary.
---

- `--abi [string]`\
    Local file path to `ABI` file. If is provided, will try to decode the event logs in transaction.
---

- `--rpc [string]` \
  Overwrite the chain rpc when read transaction info.
---

- `--l1` \
  Read transaction info on Ethereum (or Ethereum Sepolia) instead of on Jovay (or Jovay Sepolia Testnet).
---

- `-h, --help` \
  Display help information for this command.

## `send`
Send signed raw transaction to network.
```bash
jovay transaction send [options]
```
- `--raw-tx <string>` (**required**) \
  The signed raw transaction to be sent.
---
- `--rpc [string]` \
  Overwrite the chain rpc when send transaction.
---

- `--l1` \
  Send transaction info to Ethereum (Sepolia) instead of to Jovay (Sepolia Testnet).
---

- `-h, --help` \
  Display help information for this command.
