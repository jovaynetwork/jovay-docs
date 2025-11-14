---
outline: deep
---

# jovay network

```bash
    jovay network [sub-command] [options]
```

##  Description

`jovay network` is used to manage the tool's network configurations. Use it to `get`, `set`, and `switch` between testnet and mainnet.

## `get`

Get basic info of current network and wallet.
```bash
    jovay network get
```

## `switch`

Switch the active network for Ethereum and Jovay to either `mainnet` or `testnet`.  

```bash
    jovay network switch [options]
```

- `--network <string>` (**required**)

  Specifies the network to connect to. Must be one of the following values:
  * `mainnet`: Switch to Ethereum Mainnet and Jovay Mainnet.
  * `testnet`: Switch to Ethereum Sepolia and Jovay Sepolia Testnet.

---

- `--api-key [string]` \
  Update personal ZAN API key when switching. If this option is omitted, rpc will not be changed.
---

- `--l1, --l1-rpc [string]` \
  Overwrite the default rpc for Ethereum (or Sepolia).
---

 - `--l2, --l2-rpc [string]` \
Overwrite the default rpc for Jovay (or Sepolia Testnet).

---

- `-h, --help` \
  Display help information for this command.

## `set`
Update configuration for current network.
```bash
    jovay network set [options]
```


- `--api-key [string]` \
  Update personal ZAN API key when switching. If this option is omitted, rpc will not be changed.
---

- `--l1, --l1-rpc [string]` \
  Overwrite the default rpc for Ethereum (or Ethereum Sepolia).
---

- `--l2, --l2-rpc [string]` \
  Overwrite the default rpc for Jovay (or Jovay Sepolia Testnet).

---

- `-h, --help` \
  Display help information for this command.