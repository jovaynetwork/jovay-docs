---
outline: deep
---

# Integrating dApps frontend with Jovay using viem

This tutorial guides you through connecting your decentralized application (dApp) frontend to the Jovay Mainnet and Testnet using the popular `viem` library. We'll walk through setting up your environment and then create a simple example that signs a message using MetaMask.

## Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (which includes npm)
*   A web browser with the [MetaMask](https://metamask.io/) extension installed.

## Section 1: Project Setup

First, let's create a new project directory and initialize it with npm.

```bash
mkdir jovay-viem-example
cd jovay-viem-example
npm init -y
```

Next, install `viem` as a dependency, and `typescript` and `esbuild` as development dependencies. `esbuild` will compile and serve our code.

```bash
npm install viem
npm install --save-dev typescript esbuild
```

### 2. Configure Build Scripts

Open your `package.json` file and add `build` and `dev` scripts.

```json
{
  "name": "jovay_viem_example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "esbuild test_jovay.ts --bundle --outfile=app.js",
    "dev": "esbuild test_jovay.ts --bundle --outfile=app.js --watch --servedir=."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "viem": "^2.38.6"
  },
  "devDependencies": {
    "esbuild": "^0.25.12",
    "typescript": "^5.9.3"
  }
}
```
The `build` script compiles the TypeScript for production, and the `dev` script starts a development server that automatically rebuilds when you change a file.

## Section 2: Creating the Example

First, create an `index.html` file in your project directory. Note that it references `app.js`, which will be the compiled output of our TypeScript file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Jovay + Viems Example</title>
</head><body>
    <h1>Jovay dApp Example</h1>
    <button id="connectAndSign">Connect Wallet & Sign Message</button>
    <p>Signature: <span id="signature"></span></p>
    <script src="app.js"></script>
</body>
</html>
```

Next, create a TypeScript file named `test_jovay.ts`. This file contains the logic to connect to MetaMask and sign a message. Make sure to use the correct chain name, which is `jovaySepolia` for the testnet.

```typescript
import { createWalletClient, custom } from 'viem';
import { jovaySepolia } from 'viem/chains'; // or import { jovay } for mainnet

declare global {
    interface Window {
        ethereum?: any;
    }
}

async function connectAndSign() {
    // 1. Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed. Please install it to use this dApp.');
        return;
    }

    // 2. Create Wallet Client inside the handler
    const walletClient = createWalletClient({
        chain: jovaySepolia,
        transport: custom(window.ethereum)
    });

    try {
        // 3. Request addresses and sign message
        const [address] = await walletClient.requestAddresses();
        console.log("Connected address:", address);

        const signature = await walletClient.signMessage({
            account: address,
            message: 'Hello World!',
        });

        console.log("Signature:", signature);
        const signatureElement = document.getElementById('signature');
        if (signatureElement) {
            signatureElement.innerText = signature;
        }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Check the console for details.");
    }
}

window.onload = () => {
    const button = document.getElementById('connectAndSign');
    if (button) {
        button.onclick = connectAndSign;
    }
};
```

## Section 3: Running the dApp

To run the example, use the `dev` script you added to `package.json`.

```bash
npm run dev
```

This command starts a local server (typically at `http://localhost:8080`). Open this URL in your browser. When you click the "Connect Wallet & Sign Message" button, MetaMask will prompt you to connect your account and then sign the message. The server will also watch for changes in `test_jovay.ts` and automatically rebuild.

## Conclusion

You have successfully set up a basic dApp frontend that connects to the Jovay Testnet and performs a signing operation. From here, you can explore more complex interactions with smart contracts on the Jovay network.

For the latest RPC endpoints and chain information, always refer to the [official Jovay documentation](https://docs.jovay.io).
