---
outline: deep
---

# Build and Deploy a Simple Staking Contract
This guide walks you through the process of building and deploying a basic **token staking contract** on **Jovay**, a fully Ethereum-compatible blockchain. If you're already familiar with using **Hardhat** to develop smart contracts, you'll feel right at home — Just write, build, and deploy like you always do. New to Hardhat? No problem. This document follows standard Hardhat practices and includes all the steps you need to get started with confidence.

This contract allows users to:
- Stake tokens
- Earn time-based rewards
- Claim or withdraw their staked tokens and rewards

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
    cd JovayExamples/hardhat/StakingExample/
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

## Step 3: Write the Staking Contract
1. Create a New Solidity File:
    ```Plain Text
    touch contracts/SimpleStaking.sol
    ```

2. Paste the following code into `contracts/SimpleStaking.sol`:
    ```Plain Text
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

    contract SimpleStaking {
        using SafeERC20 for IERC20;

        IERC20 public stakingToken;
        uint public rewardRate = 1e18; // 1 token per second
        uint public totalStaked;

        struct User {
            uint amount;
            uint lastTime;
            uint unclaimedRewards;
        }

        mapping(address => User) public users;

        constructor(address _stakingToken) {
            require(_stakingToken != address(0), "Cannot be zero address");
            stakingToken = IERC20(_stakingToken);
        }

        function stake(uint amount) external {
            require(amount > 0, "Cannot stake 0");
            stakingToken.safeTransferFrom(msg.sender, address(this), amount);

            User storage u = users[msg.sender];
            if (u.amount > 0) {
                _update(msg.sender);
            } else {
                u.lastTime = block.timestamp;
            }
            u.amount += amount;
            totalStaked += amount;
        }

        function claimRewards() external {
            _update(msg.sender);
            uint rewards = users[msg.sender].unclaimedRewards;
            require(rewards > 0, "No rewards to claim");
            users[msg.sender].unclaimedRewards = 0;
            stakingToken.safeTransfer(msg.sender, rewards);
        }

        function withdraw(uint amount) external {
            User storage u = users[msg.sender];
            require(u.amount >= amount, "Not enough staked");

            _update(msg.sender);

            uint rewards = u.unclaimedRewards;
            u.unclaimedRewards = 0;
            u.amount -= amount;
            totalStaked -= amount;

            stakingToken.safeTransfer(msg.sender, amount + rewards);
        }

        function checkRewards(address user) public view returns (uint) {
            User memory u = users[user];
            uint timeDiff = block.timestamp - u.lastTime;
            return u.unclaimedRewards + timeDiff * rewardRate * u.amount / 1e18;
        }

        function _update(address user) internal {
            User storage u = users[user];
            uint timeDiff = block.timestamp - u.lastTime;
            u.unclaimedRewards += timeDiff * rewardRate * u.amount / 1e18;
            u.lastTime = block.timestamp;
        }
    }
    ```

3. Compile the Smart Contract:
    ```Plain Text
    npx hardhat compile
    ```

4. Test the Smart Contract (optional but recommended):
    ```Plain Text
    touch test/SimpleStaking.js
    ```

5. Paste the following code into `test/SimpleStaking.js`:
    ```Plain Text
    const { expect } = require("chai");
    const { ethers } = require("hardhat");
    const { time } = require("@nomicfoundation/hardhat-network-helpers");

    describe("SimpleStaking", function () {
        let MyToken;
        let myToken;
        let SimpleStaking;
        let simpleStaking;
        let owner, user1, user2;

        const initialSupply = ethers.parseUnits("1000000", 6);
        const stakeAmount = ethers.parseUnits("1000", 6);

        beforeEach(async function () {
            [owner, user1, user2] = await ethers.getSigners();

            // Deploy Token
            MyToken = await ethers.getContractFactory("MyToken");
            myToken = await MyToken.deploy(initialSupply);
            await myToken.waitForDeployment();

            // Deploy Staking
            SimpleStaking = await ethers.getContractFactory("SimpleStaking");
            simpleStaking = await SimpleStaking.deploy(await myToken.getAddress());
            await simpleStaking.waitForDeployment();

            // Mint some tokens to users
            await myToken.transfer(user1.address, ethers.parseUnits("100000", 6)); // give 100k MTK
            await myToken.transfer(user2.address, ethers.parseUnits("100000", 6));

            // Approve large amounts for staking contract
            await myToken.approve(await simpleStaking.getAddress(), ethers.MaxUint256);
            await myToken.connect(user1).approve(await simpleStaking.getAddress(), ethers.MaxUint256);
            await myToken.connect(user2).approve(await simpleStaking.getAddress(), ethers.MaxUint256);

            await myToken.transfer(await simpleStaking.getAddress(), ethers.parseUnits("100000", 6));
        });

        it("Should stake tokens and update state", async function () {
            await simpleStaking.stake(stakeAmount);

            const user = await simpleStaking.users(owner.address);
            expect(user.amount).to.equal(stakeAmount);
            expect(await simpleStaking.totalStaked()).to.equal(stakeAmount);
        });

        it("Should calculate rewards correctly", async function () {
            await simpleStaking.stake(stakeAmount);

            await time.increase(3600); // increase time by 1 hour

            const rewards = await simpleStaking.checkRewards(owner.address);
            const expectedRewards =
            (BigInt(3600) * await simpleStaking.rewardRate() * BigInt(stakeAmount)) / BigInt(1e18);
            expect(rewards).to.equal(expectedRewards);
        });

        it("Should allow non-owner to stake", async function () {
            await simpleStaking.connect(user1).stake(stakeAmount);

            const user = await simpleStaking.users(user1.address);
            expect(user.amount).to.equal(stakeAmount);
        });
    });
    ```

6. Test it:
    ```Plain Text
    npx hardhat test
    ```

## Step 4: Deploy the Staking Contract
1. Create a Deployment Script:
    ```Plain Text
    touch scripts/deploy.js
    ```
2. Paste the following code into `scripts/deploy.js`:
    ```Plain Text
    async function main() {
        const MyToken = await ethers.getContractFactory("MyToken");
        const myToken = await MyToken.deploy(ethers.parseUnits("1000000", 6));
        await myToken.waitForDeployment();
        console.log("MyToken deployed to:", await myToken.getAddress());

        const SimpleStaking = await ethers.getContractFactory("SimpleStaking");
        const simpleStaking = await SimpleStaking.deploy(await myToken.getAddress());
        await simpleStaking.waitForDeployment();
        console.log("SimpleStaking deployed to:", await simpleStaking.getAddress());
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

    ![Deploy Staking Contract Suucess](/Images/foundry-hardhat-tutorial/deploy-success-staking-contract-hardhat.png)


## ❓ Troubleshooting Tips
- **Deployment fails?** Make sure your wallet has enough testnet tokens.
- **Staking fails?** Confirm that the token is approved before staking.
- **Rewards not updating?** Make sure you're calling `_update()` before checking balances.

## ✅ Conclusion
You've just built, deployed, and tested a simple **staking contract** on the **Jovay blockchain** using **Hardhat**!

This guide gives you a foundation for building more complex staking systems, including:
- Reward tokens instead of native token
- Time-locked staking
- NFT-based staking pools

If you hit any issues, refer back to this guide or consult the official [Hardhat documentation](https://hardhat.org/docs).

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