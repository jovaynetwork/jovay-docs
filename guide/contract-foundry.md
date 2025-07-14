---
outline: deep
---

# Build and Deploy a Simple Staking Contract
This guide walks you through the process of building and deploying a basic **token staking contract** on **Jovay**, a fully Ethereum-compatible blockchain. If you're already familiar with using **Foundry** to develop smart contracts, you'll feel right at home — Just write, build, and deploy like you always do. New to Foundry? No problem. This document follows standard Foundry practices and includes all the steps you need to get started with confidence.

By the end, you’ll have:
- Deploy an ERC-20 token
- Build a staking contract that rewards users over time
- Stake, claim rewards, and withdraw tokens programmatically

## 🧰 Prerequisites

Before starting, make sure you have:
- **Have Foundry Installed** – [Foundry](https://book.getfoundry.sh/getting-started/installation)
- **Have an account with funds** – You can get DEV tokens for testing on Jovay once every 24 hours from the [Faucet](https://zan.top/faucet/jovay)
- **Access to Jovay Devnet or Testnet** – To deploy and interact with your token, you will need to have your own endpoint and API key, which you can get from one of the supported [QuickStart](./developer-quickstart.md)

## Step 1: Set Up Your Project
1. Clone the example repository:
    ```Plain Text
    wget 'https://web3-static-prod.oss-ap-southeast-1.aliyuncs.com/static/Jovay/JovayExamples.tar.bz'
    tar -xvzf JovayExamples.tar.gz
    cd JovayExamples/foundry/StakingExample/
    ```
2. Install OpenZeppelin Contracts:

    Foundry uses forge to manage dependencies. Install OpenZeppelin contracts:

    ```Plain Text
    forge install OpenZeppelin/openzeppelin-contracts --no-git
    ```

## Step 2: Write the Token Contract
1. Create a New Solidity File:
    ```Plain Text
    touch src/MyToken.sol
    ```

2. Paste the following code into `src/MyToken.sol`:
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
    forge build
    ```
4. Test the Smart Contract (optional but recommended):
    ```Plain Text
    touch test/MyToken.t.sol
    ```

5. Paste the following code into `test/MyToken.t.sol`:
    ```Plain Text
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "forge-std/Test.sol";
    import "../src/MyToken.sol";

    contract MyTokenTest is Test {
        MyToken public token;
        address public owner = address(0x1);
        address public alice = address(0x2);

        function setUp() public {
            vm.prank(owner);
            token = new MyToken(1_000_000e6); // initial supply with 6 decimals
        }

        // Test name and symbol
        function testNameAndSymbol() public {
            assertEq(token.name(), "MyToken");
            assertEq(token.symbol(), "MTK");
        }

        // Test initial supply
        function testInitialSupply() public {
            assertEq(token.balanceOf(owner), 1_000_000e6);
        }

        // Test decimals are 6
        function testDecimals() public {
            assertEq(token.decimals(), 6);
        }

        // Test token transfer
        function testTransfer() public {
            vm.startPrank(owner);
            uint256 sendAmount = 100e6; // 100 tokens

            uint256 ownerBalanceBefore = token.balanceOf(owner);
            uint256 aliceBalanceBefore = token.balanceOf(alice);

            token.transfer(alice, sendAmount);

            uint256 ownerBalanceAfter = token.balanceOf(owner);
            uint256 aliceBalanceAfter = token.balanceOf(alice);

            assertEq(ownerBalanceAfter, ownerBalanceBefore - sendAmount);
            assertEq(aliceBalanceAfter, aliceBalanceBefore + sendAmount);
            vm.stopPrank();
        }

        // Test transfer reverts when balance is insufficient
        function testTransferRevertsWhenInsufficientBalance() public {
            vm.expectRevert();
            token.transfer(alice, 1_000_001e6); // Attempt to send more than balance
        }
    }
    ```

6. Test it:
    ```Plain Text
    forge test
    ```

## Step 3: Deploy the Token Contract
1. Create a Deployment Script:
    ```Plain Text
    touch script/DeployToken.s.sol
    ```
2. Paste the following code into `script/DeployToken.s.sol`:
    ```Plain Text
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "forge-std/Script.sol";
    import "../src/MyToken.sol";

    contract DeployMyToken is Script {
        function run() external {
            uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
            vm.startBroadcast(deployerPrivateKey);

            MyToken token = new MyToken(1_000_000e6); // Initial supply

            console.log("Token deployed at:", address(token));

            vm.stopBroadcast();
        }
    }
    ```

3. Set your wallet’s private key:
    ```Plain Text
    export PRIVATE_KEY=<your private key>
    ```

4. Deploy the contract:
    ```Plain Text
    forge script script/DeployMyToken.s.sol --rpc-url <JOVAY_RPC_URL> --broadcast
    ```
    If your script's execution succeeds, your terminal should resemble the output below:

    ![Deploy Suucess](/Images/foundry-hardhat-tutorial/deploy-success-contract-foundry.png)

## Step 4: Write the Staking Contract
1. Create a New Solidity File:
    ```Plain Text
    touch src/SimpleStaking.sol
    ```

2. Paste the following code into `src/SimpleStaking.sol`:
    ```Plain Text
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

    contract SimpleStaking {
        using SafeERC20 for IERC20;

        IERC20 public stakingToken;
        uint public rewardRate = 1e18;
        uint public totalStaked;

        struct User {
            uint amount;          // current stake amount
            uint lastTime;        // last update time
            uint unclaimedRewards; // unclaimed rewards
        }

        mapping(address => User) public users;

        constructor(address _stakingToken) {
            require(_stakingToken != address(0), "Cannot be zero address");
            stakingToken = IERC20(_stakingToken);
        }

        // stake
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

        // claim reward
        function claimRewards() external {
            _update(msg.sender);
            uint rewards = users[msg.sender].unclaimedRewards;
            require(rewards > 0, "No rewards to claim");
            users[msg.sender].unclaimedRewards = 0;
            stakingToken.safeTransfer(msg.sender, rewards);
        }

        // withdraw and claim reward
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

        // update reward
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
    forge build
    ```

4. Test the Smart Contract (optional but recommended):
    ```Plain Text
    touch test/SimpleStaking.t.sol
    ```

5. Paste the following code into `test/SimpleStaking.t.sol`:
    ```Plain Text
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "forge-std/Test.sol";
    import "../src/MyToken.sol";
    import "../src/SimpleStaking.sol";

    contract SimpleStakingTest is Test {
        MyToken public token;
        SimpleStaking public staking;
        address owner = address(0x1);
        address alice = address(0x2);

        function setUp() public {
            vm.startPrank(owner);

            token = new MyToken(10_000_000e6); // deploy empty
            token.transfer(alice, 1000e6);

            staking = new SimpleStaking(address(token));
            token.transfer(address(staking), 1000_000e6);

            vm.stopPrank();
        }

        function testStakeAndGetRewards() public {
            uint amount = 100e6;

            // Mint and approve tokens for Alice
            vm.startPrank(alice);
            token.approve(address(staking), amount);
            staking.stake(amount);

            // Simulate time passing (1 hour)
            vm.warp(block.timestamp + 3600);

            // Check rewards
            uint rewards = staking.checkRewards(alice);
            assertGt(rewards, 0);

            // Claim rewards
            staking.claimRewards();
            assertEq(staking.checkRewards(alice), 0);

            vm.stopPrank();
        }

        function testWithdraw() public {
            uint amount = 100e6;

            vm.startPrank(alice);
            token.approve(address(staking), amount);
            staking.stake(amount);

            // Withdraw
            staking.withdraw(amount);
            assertEq(token.balanceOf(alice), 1_000e6);

            vm.stopPrank();
        }
    }
    ```

6. Test it:
    ```Plain Text
    forge test
    ```

## Step 5: Deploy the Staking Contract
1. Create a Deployment Script:
    ```Plain Text
    touch script/DeploySimpleStaking.s.sol
    ```

2. Paste the following code into `script/DeploySimpleStaking.s.sol`:
    ```Plain Text
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "forge-std/Script.sol";
    import "../src/SimpleStaking.sol";

    contract DeploySimpleStaking is Script {
        function run() external {
            uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
            address tokenAddress = vm.envAddress("TOKEN_ADDRESS");

            vm.startBroadcast(deployerPrivateKey);

            SimpleStaking staking = new SimpleStaking(tokenAddress);

            console.log("Staking contract deployed at:", address(staking));

            vm.stopBroadcast();
        }
    }
    ```

3. Set your wallet’s private key and token address:
    ```Plain Text
    export PRIVATE_KEY=<your private key>
    export TOKEN_ADDRESS=<your token address>
    ```

4. Deploy the contract:
    ```Plain Text
    forge script script/DeploySimpleStaking.s.sol --rpc-url <JOVAY_RPC_URL> --broadcast
    ```
    If your script's execution succeeds, your terminal should resemble the output below:

    ![Deploy Staking Contract Success](/Images/foundry-hardhat-tutorial/deploy-success-staking-contract-foundry.png)

## Step 6: Interact with the Staking Contract
1. Create a scipt:
    ```Plain Text
    touch script/InteractSimpleStaking.s.sol
    ```

2. Paste the following code into `script/InteractSimpleStaking.s.sol`:
    ```Plain Text
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "forge-std/Script.sol";
    import {console} from "forge-std/console.sol";
    import "../src/MyToken.sol";
    import "../src/SimpleStaking.sol";

    contract InteractStaking is Script {
        function run() external {
            uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
            address tokenAddress = vm.envAddress("TOKEN_ADDRESS");
            address stakingAddress = vm.envAddress("STAKING_ADDRESS");

            MyToken token = MyToken(tokenAddress);
            SimpleStaking staking = SimpleStaking(stakingAddress);

            vm.startBroadcast(deployerPrivateKey);

            // Approve and stake
            token.approve(stakingAddress, 10e6);
            staking.stake(10e6);

            console.log("Tokens staked.");

            // Add reward pool to Staking contract
            uint256 rewardPoolAmount = 100_000e6;
            token.transfer(address(staking), rewardPoolAmount);

            // Simulate time passing (1 hour)
            vm.warp(block.timestamp + 3600);

            // Claim rewards
            staking.claimRewards();
            console.log("Rewards claimed.");

            // Withdraw
            staking.withdraw(10e6);
            console.log("Tokens withdrawn.");

            vm.stopBroadcast();
        }
    }
    ```
3. Set your wallet’s private key, token address and staking address:
    ```json
    export PRIVATE_KEY=<your private key>
    export TOKEN_ADDRESS=<your token address>
    export STAKING_ADDRESS=<your staking address>
    ```

3. Execute the script:
    ```Plain Text
    forge script script/InteractSimpleStaking.s.sol --rpc-url <JOVAY_RPC_URL> --broadcast
    ```
    If your script's execution succeeds, your terminal should resemble the output below:

    ![Interact Staking Contract Success](/Images/foundry-hardhat-tutorial/interact-success-staking-contract-foundry.png)

## ❓ Troubleshooting Tips
- **Deployment fails?** Make sure your wallet has enough testnet tokens.
- **Can't stake or transfer?** Confirm the token has been approved by the staking contract.
- **Rewards not updating?** Make sure you're calling `_update()` before checking balances.

## ✅ Conclusion
You've just built and deployed a fully functional **token staking system** on the **Jovay blockchain** using **Foundry**!

This includes:
- A mintable **ERC-20 token**
- A **time-based reward staking contract**
- Scripts for **deployment and interaction**

Now you can expand this system with features like:
- NFT-based staking
- Multiple reward tiers
- Locking periods
- Governance integration

If you hit any issues, refer back to this guide or consult the official [Foundry documentation](https://getfoundry.sh/introduction/overview/).

Happy coding! 🚀



