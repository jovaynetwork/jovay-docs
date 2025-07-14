---
outline: deep
---

# Create and Deploy Your First Token
This guide walks you through the process of building and deploying an **ERC-20 token** on **Jovay**, a fully Ethereum-compatible blockchain. If you're already familiar with using **Hardhat** to develop smart contracts, you'll feel right at home — Just write, build, and deploy like you always do. New to Hardhat? No problem. This document follows standard Hardhat practices and includes all the steps you need to get started with confidence.

By the end, you’ll have:
- A working token contract
- Experience deploying and verifying smart contracts
- The skills to interact with your token on-chain

## 🧰 Prerequisites

Before starting, make sure you have:
- **Have Foundry Installed** – [Foundry](https://book.getfoundry.sh/getting-started/installation)
- **Node.js** – Install from [nodejs.org](https://nodejs.org/)
- **Have an account with funds** – You can get DEV tokens for testing on Jovay once every 24 hours from the [Faucet](https://zan.top/faucet/jovay)
- **Access to Jovay Devnet or Testnet** – To deploy and interact with your token, you will need to have your own endpoint and API key, which you can get from one of the supported [QuickStart](./developer-quickstart.md)

## Step 1: Set Up Your Project
1. Download the example repository:
    ```Plain Text
    wget 'https://web3-static-prod.oss-ap-southeast-1.aliyuncs.com/static/Jovay/JovayExamples.tar.bz'
    tar -xvzf JovayExamples.tar.gz
    cd JovayExamples/hardhat/ERC20Example/
    ```
2. Install OpenZeppelin Contracts:
    ```Plain Text
    npm install
    ```

## Step 2: Write the Token Contract
1. Create a New Solidity File:
    ```Plain Text
    touch contracts/MyToken.sol
    ```

2. Paste the following code into `contracts/MyToken.sol`:
    ```Plain Text
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    contract MyToken is ERC20 {
        constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
            _mint(msg.sender, initialSupply);
        }

        function decimals() public pure override returns (uint8) {
            return 6;
        }
    }
    ```

3. Compile the Smart Contract:
    ```Plain Text
    npx hardhat compile
    ```
4. Test the Smart Contract (optional but recommended):
    ```Plain Text
    touch test/MyToken.js
    ```

5. Paste the following code into `test/MyToken.js`:
    ```Plain Text
    const { expect } = require("chai");
    const { ethers } = require("hardhat");

    describe("MyToken", function () {
        let MyToken;
        let myToken;
        let owner;
        let addr1;

        beforeEach(async function () {
            [owner, addr1] = await ethers.getSigners();

            MyToken = await ethers.getContractFactory("MyToken");
            initialSupply = ethers.parseUnits("1000", 6);
            myToken = await MyToken.deploy(initialSupply);
            await myToken.waitForDeployment();
        });

        it("Should assign the total supply to the owner", async function () {
            const ownerBalance = await myToken.balanceOf(owner.address);
            expect(await myToken.totalSupply()).to.equal(ownerBalance);
        });

        it("Should transfer tokens between accounts", async function () {
            const sendAmount = ethers.parseUnits("100", 6);

            await myToken.transfer(addr1.address, sendAmount);

            expect(await myToken.balanceOf(addr1.address)).to.equal(sendAmount);
            expect(await myToken.balanceOf(owner.address)).to.equal(
            (await myToken.totalSupply()) - sendAmount
            );
        });

        it("Should have 6 decimals", async function () {
            expect(await myToken.decimals()).to.equal(6);
        });
    });
    ```

6. Test it:
    ```Plain Text
    npx hardhat test
    ```

## Step 3: Deploy the Token Contract
1. Create a Deployment Script:
    ```Plain Text
    touch scripts/deploy.js
    ```
2. Paste the following code into `scripts/deploy.js`:
    ```Plain Text
    async function main() {
        const Token = await ethers.getContractFactory("MyToken");
        const token = await Token.deploy(ethers.parseUnits("1000", 6));
        await token.waitForDeployment();

        console.log("Token address:", await token.getAddress());
    }

    main()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
    ```

3. Update your `hardhat.config.js` with the following network settings:
    <table class="responsive-table">
    <thead>
        <tr>
            <th>Field</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>chain_name</td>
            <td>jovay</td>
        </tr>
        <tr>
            <td>chain_id</td>
            <td>2019775</td>
        </tr>
        <tr>
            <td>url</td>
            <td>your RPC url</td>
        </tr>
        <tr>
            <td>accounts</td>
            <td>your private key</td>
        </tr>
    </tbody>
    </table>

    ```json
    require("@nomicfoundation/hardhat-toolbox");

    /** @type import('hardhat/config').HardhatUserConfig */
    module.exports = {
    solidity: "0.8.20",
    networks: {
        jovay: {
        url: "JOVAY_RPC_URL", // YOUR RPC URL
        chainId: 2019775,
        accounts: ["PRIVATE_KEY"],
        },
    },
    };
    ```

4. Deploy the contract:
    ```Plain Text
    npx hardhat run scripts/deploy.js --network Jovay
    ```
    If your script's execution succeeds, your terminal should resemble the output below:

    ![Deploy Suucess](/Images/foundry-hardhat-tutorial/deploy-success-token-hardhat.png)


## ❓ Troubleshooting Tips
- **Deployment fails?** Make sure your wallet has enough testnet tokens.
- **Can't interact with the contract?** Double-check the contract address and ABI.
- **Transfer fails?** Confirm your wallet has enough balance.

## ✅ Conclusion
You’ve just built, deployed, and verified your first token on the Jovay blockchain using Hardhat! This process covers the basics of smart contract development, deployment, and verification — essential skills for any Web3 developer.

If you run into issues, refer back to this guide or check out the official [Hardhat documentation](https://hardhat.org/docs).

Happy coding! 🚀

<style>
  .responsive-table {
    width: 100%;
    border-collapse: collapse;
    display: table !important;
  }
  .responsive-table th, .responsive-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
</style>