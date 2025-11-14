---
outline: deep
---

# jovay dapp
```bash
    jovay dapp [sub-command] [options]
```

## Description
Manages the full development lifecycle of a dApp project. It simplifies the process of creating, building, and deploying dApps through pre-built templates. Use the `init`, `build`, and `deploy` subcommands to initialize a project, compile your assets, and deploy to network.

## `init`
Init a dApp project with provided template.
```bash
    jovay dapp init [options]
```

- `--name [string]` \
    Project name.
---
- `--template [string]` \
  Template name to be used. Currently, provides:
  - [EasyJovayDappTemplate](https://github.com/EasyWithJovay/Jovay-DApp-Template) (**default**) : An out-of-the-box, full-stack dApp template that combines a modern Vue 3 frontend stack with a Hardhat smart contract workflow, providing a one-stop, efficient development experience from contract to frontend.
---
- `-h, --help` \
  Display help information for this command.

## `build`
Build the dApp project. 

```bash
    jovay dapp build [options]
```
- `--script [string]` \
  Local file path to `build script`. If is not provided, default script in template will be used. \
  **Note**:
  - [EasyJovayDappTemplate](https://github.com/EasyWithJovay/Jovay-DApp-Template) only compiles contracts in default.
---
- `--enc-key [string]` \
  The current encryption key for the wallet. Required when use encrypted wallet.
---
- `-h, --help` \
  Display help information for this command.

## `deploy`
Deploy the dApp project to network.

```bash
    jovay dapp deploy [options]
```
- `--script [string]` \
  Local file path to `deploy script`. If is not provided, default script in template will be used. \
  **Note**:
    - [EasyJovayDappTemplate](https://github.com/EasyWithJovay/Jovay-DApp-Template) only deploy contracts to network in default.
---
- `--enc-key [string]` \
  The current encryption key for the wallet. Required when use encrypted wallet.
---
- `-h, --help` \
  Display help information for this command.