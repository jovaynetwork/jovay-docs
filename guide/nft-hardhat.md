---
outline: deep
---

# Create and Deploy Your First NFT
This guide walks you through the process of creating and deploying your own **ERC-721 NFT** on **Jovay**, a fully Ethereum-compatible blockchain. If you're already familiar with using **Hardhat** to develop smart contracts, you'll feel right at home — Just write, build, and deploy like you always do. New to Hardhat? No problem. This document follows standard Hardhat practices and includes all the steps you need to get started with confidence.

By the end, you’ll have:
- A working NFT contract
- Experience deploying and verifying smart contracts
- The skills to interact with your NFT on-chain

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
    cd JovayExamples/hardhat/ERC721Example/
    ```
2. Install OpenZeppelin Contracts:
    ```Plain Text
    npm install
    ```

## Step 2: Write the NFT Contract
1. Create a New Solidity File:
    ```Plain Text
    touch contracts/MyNFT.sol
    ```

2. Paste the following code into `contracts/MyNFT.sol`:
    ```Plain Text
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";

    contract MyNFT is ERC721, Ownable {
        uint256 public nextTokenId;
        mapping(uint256 => string) private _tokenURIs;

        event Minted(address to, uint256 tokenId, string tokenURI);

        constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

        function mint(address recipient, string calldata _tokenURI) external onlyOwner {
            uint256 tokenId = nextTokenId;
            nextTokenId++;

            _safeMint(recipient, tokenId);
            _tokenURIs[tokenId] = _tokenURI;

            emit Minted(recipient, tokenId, _tokenURI);
        }

        function tokenURI(uint256 tokenId) public view override returns (string memory) {
            _requireOwned(tokenId);

            return _tokenURIs[tokenId];
        }
    }
    ```

3. Compile the Smart Contract:
    ```Plain Text
    npx hardhat compile
    ```
4. Test the Smart Contract (optional but recommended):
    ```Plain Text
    touch test/MyNFT.js
    ```

5. Paste the following code into `test/MyNFT.js`:
    ```Plain Text
    const { expect } = require("chai");
    const { ethers } = require("hardhat");

    describe("MyNFT", function () {
        let MyNFT;
        let myNFT;
        let owner;
        let addr1;
        let tokenURI = "https://example.com/token/1";

        beforeEach(async function () {
            [owner, addr1] = await ethers.getSigners();

            MyNFT = await ethers.getContractFactory("MyNFT");
            myNFT = await MyNFT.deploy();
            await myNFT.waitForDeployment();
        });

        it("Should mint an NFT and set tokenURI correctly", async function () {
            const tx = await myNFT.mint(addr1.address, tokenURI);
            await tx.wait();

            expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await myNFT.tokenURI(0)).to.equal(tokenURI);
        });

        it("Should only allow owner to mint", async function () {
            await expect(
            myNFT.connect(addr1).mint(addr1.address, tokenURI)
            ).to.be.revertedWithCustomError(myNFT, 'OwnableUnauthorizedAccount');
        });

        it("Should increment tokenId on each mint", async function () {
            await myNFT.mint(addr1.address, tokenURI);
            await myNFT.mint(addr1.address, tokenURI);

            expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
            expect(await myNFT.nextTokenId()).to.equal(2);
        });
    });
    ```

6. Test it:
    ```Plain Text
    npx hardhat test
    ```

## Step 3: Deploy the NFT Contract
1. Create a Deployment Script:
    ```Plain Text
    touch scripts/deploy.js
    ```
2. Paste the following code into `scripts/deploy.js`:
    ```Plain Text
    async function main() {
        const MyNFT = await ethers.getContractFactory("MyNFT");

        const myNFT = await MyNFT.deploy();

        await myNFT.waitForDeployment();

        console.log("MyNFT deployed to:", await myNFT.getAddress());
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

    ![Deploy Suucess](/Images/foundry-hardhat-tutorial/deploy-success-nft-hardhat.png)


## ❓ Troubleshooting Tips
- **Deployment fails?** Make sure your wallet has enough testnet tokens.
- **Can't interact with the contract?** Double-check the contract address and ABI.
- **Transfer fails?** Confirm your wallet has enough balance.

## ✅ Conclusion
You’ve just built, deployed, and verified your first NFT on the Jovay blockchain using Hardhat! This process covers the basics of smart contract development, deployment, and verification — essential skills for any Web3 developer.

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