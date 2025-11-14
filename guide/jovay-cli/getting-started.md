---
outline: deep
---

# Getting Started

---
Jovay CLI is the all-in-one command-line tool for the Jovay network. It helps you kickstart projects with powerful scaffolding, manage your contract's lifecycle with a simplified command set, and effortlessly deploy your dApps to Jovay.

Install [jovay-cli](https://www.npmjs.com/package/@jovaylabs/jovay-cli) via npm and start building today!

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20+，which includes npm and npx)

## Optional dependencies
If you want to use the dapp subcommand to scaffold a new dApp project from our official templates, you will need to have the following dependency installed beforehand:
- [Git](https://git-scm.com/install/) (clone the project templates from their remote repositories.)

## Install Jovay CLI
Install the [jovay-cli](https://www.npmjs.com/package/@jovaylabs/jovay-cli)  globally by running the following command in your terminal:
```bash
npm install -g @jovaylabs/jovay-cli
```
After installation, run `jovay` to confirm. A welcome page will appear on success.

```bash
jovay
```

## Update Jovay CLI
Update installed [jovay-cli](https://www.npmjs.com/package/@jovaylabs/jovay-cli)  globally by running the following command in your terminal:
```bash
npm update -g @jovaylabs/jovay-cli
```
And you can check version with:
```bash
jovay --version
```

## Initialization
After installing, the first and most crucial step is to initialize the tool. By running `jovay init`, you can generate a new wallet or import an existing one, with optional encryption for added security. And network configuration will be auto generated. Upon execution, it will also write configuration files to your home directory (`$HOME_DIR`).

Run the following command in your terminal to start the initialization process:
```bash
jovay init [options]
```
You can append the following optional flags to the init command to customize your configuration:

- `--api-key [string]` \
Your personal ZAN API key for chain rpc. If this option is omitted, the CLI will fall back to a shared public endpoint with lower rate limit.
Get ZAN API key at: https://zan.top/service/apikeys
---
- `--sk, --secret-key [0x string]` \
  Use this to **import an existing wallet** by providing its private key. If this option is omitted, the CLI will **generate a brand-new wallet** for you.
---
- `--enc` \
  Enable **encryption on wallet**. When flag is set, wallet's private key will be encrypted. If `--enc-key` is not also used, a random key will be generated and provided to you **(be sure to save it!)**.
---
- `--enc-key [string]`\
Provide key to encrypt the wallet's private key. CLI will process it with SHA-256 to generate a high-strength encryption key. Using this option automatically enables encryption (not need to add `--enc` separately). 

---
- `-h, --help` \
  Display help information for this command.

### Example
Here, we will initialize the CLI tool with API Key and wallet private key, using the random key encryption mode.
```bash
jovay init --api-key ${MY_ZAN_API_KEY} --sk ${MY_WALLET_PRIVATE_KEY} --enc
```
On success, the command returns output like the following, **the encryption key should be kept**:


```
Find the zan api key, add your zan rpc url to config.
This is your random encryption key after hex encoded, please keep it:
${THIS_IS_YOUR_RANDOM_ENCRYPTION_KEY}
Find the wallet secret key, add to config.
🎉 Address calculated successfully for the given private key.
Begin to save all config to $HOME_DIR.
🎉 File written successfully to $HOME_DIR/.config/jovay/cli/config-testnet.yaml
🎉 File written successfully to $HOME_DIR/.config/jovay/cli/config-mainnet.yaml
🎉 File written successfully to $HOME_DIR/.config/jovay/cli/wallet.yaml
🎉 Write all config successfully. Default network switch to Testnet now.
```

## Available Commands
For a full list of commands, see the [CLI Reference](cli-overview.md). 

## Community & Support 

### Contributing
Jovay CLI is a fully open-source project licensed under MIT, and its source code is available on [Github](https://github.com/jovaynetwork/jovay-cli). We warmly welcome and encourage community contributions. Whether you're fixing bugs, proposing new features, or improving documentation, your help is invaluable.

Feel free to:
- **Report an issue** if you find a bug.
- **Suggest a new feature** to help us improve.
- **Submit a pull request** with your contributions.

### Getting Help
For questions, discussions, or if you need assistance, you can connect with our team and the community through our official channels:

- Discord: [Join our Discord](https://discord.com/invite/vBxayT6SBw)
- Telegram: [Join our Telegram](https://t.me/Jovay_Network)