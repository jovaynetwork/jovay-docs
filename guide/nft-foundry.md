---
outline: deep
---

# Create and Deploy Your First NFT
This guide walks you through the process of creating and deploying your own **ERC-721 NFT** on **Jovay**, a fully Ethereum-compatible blockchain. If you're already familiar with using **Foundry** to develop smart contracts, you'll feel right at home — Just write, build, and deploy like you always do. New to Foundry? No problem. This document follows standard Foundry practices and includes all the steps you need to get started with confidence.

By the end, you’ll have:
- A working **ERC-721 NFT contract**
- Experience deploying and verifying smart contracts
- The skills to mint and interact with your NFTs programmatically

## 🧰 Prerequisites

Before starting, make sure you have:
- **Have Foundry Installed** – [Foundry](https://book.getfoundry.sh/getting-started/installation)
- **Have an account with funds** – You can get DEV tokens for testing on Jovay once every 24 hours from the [Faucet](https://zan.top/faucet/jovay)
- **Access to Jovay Devnet or Testnet** – To deploy and interact with your nft, you will need to have your own endpoint and API key, which you can get from one of the supported [QuickStart](./developer-quickstart.md)

## Step 1: Set Up Your Project
1. Clone the example repository:
    ```bash
    wget 'https://web3-static-prod.oss-ap-southeast-1.aliyuncs.com/static/Jovay/JovayExamples.tar.bz'
    tar -xvzf JovayExamples.tar.gz
    cd JovayExamples/foundry/ERC721Example/
    ```
2. Install OpenZeppelin Contracts:

    Foundry uses forge to manage dependencies. Install OpenZeppelin contracts:

    ```bash
    forge install OpenZeppelin/openzeppelin-contracts --no-git
    ```

## Step 2: Write the NFT Contract
1. Create a New Solidity File:
    ```bash
    touch src/MyNFT.sol
    ```

2. Paste the following code into `src/MyNFT.sol`:
    ```solidity
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
    ```bash
    forge build
    ```
4. Test the Smart Contract (optional but recommended):
    ```bash
    touch test/MyNFT.t.sol
    ```

5. Paste the following code into `test/MyNFT.t.sol`:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "forge-std/Test.sol";
    import "../src/MyNFT.sol";

    contract MyNFTTest is Test {
        MyNFT public nft;
        address public owner = address(0x1);
        address public alice = address(0x2);
        string public constant TEST_URI = "ipfs://test-uri";

        function setUp() public {
            vm.prank(owner);
            nft = new MyNFT();
        }

        // Test name and symbol
        function testNameAndSymbol() public view {
            assertEq(nft.name(), "MyNFT");
            assertEq(nft.symbol(), "MNFT");
        }

        // Test initial state
        function testInitialState() public view {
            assertEq(nft.nextTokenId(), 0);
        }

        // Test minting assigns correct owner and tokenId
        function testMintAssignsToken() public {
            vm.startPrank(owner);

            uint256 tokenId = nft.nextTokenId();
            nft.mint(alice, TEST_URI);

            assertEq(nft.ownerOf(tokenId), alice);
            assertEq(nft.tokenURI(tokenId), TEST_URI);
            assertEq(nft.nextTokenId(), tokenId + 1);

            assertTrue(nft.balanceOf(alice) > 0);

            vm.stopPrank();
        }

        // Test only owner can mint
        function testOnlyOwnerCanMint() public {
            vm.expectRevert("OwnableUnauthorizedAccount(0x0000000000000000000000000000000000000002)");
            vm.prank(alice);
            nft.mint(alice, TEST_URI);
        }

        // Test token exists after mint
        function testTokenExistsAfterMint() public {
            vm.startPrank(owner);

            uint256 tokenId = nft.nextTokenId();
            nft.mint(alice, TEST_URI);

            assertEq(nft.ownerOf(tokenId), alice);

            vm.stopPrank();
        }

        // Test tokenURI reverts if queried for non-existent token
        function testTokenURIForNonExistentTokenFails() public {
            vm.expectRevert("ERC721NonexistentToken(0)");
            nft.tokenURI(0); // tokenId 0 does not exist yet
        }

        // Test event is emitted on mint
        function testMintEmitsEvent() public {
            vm.startPrank(owner);

            uint256 tokenId = nft.nextTokenId();
            vm.expectEmit(true, true, true, true);
            emit MyNFT.Minted(alice, tokenId, TEST_URI);

            nft.mint(alice, TEST_URI);

            vm.stopPrank();
        }
    }
    ```

6. Test it:
    ```bash
    forge test
    ```

## Step 3: Deploy the NFT Contract
1. Create a Deployment Script:
    ```bash
    touch script/DeployMyNFT.s.sol
    ```
2. Paste the following code into `script/DeployMyNFT.s.sol`:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "forge-std/Script.sol";
    import "../src/MyNFT.sol";

    contract DeployNFT is Script {
        function run() external {
            uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
            vm.startBroadcast(deployerPrivateKey);

            MyNFT nft = new MyNFT();

            vm.stopBroadcast();

            console.log("MyNFT deployed at:", address(nft));
        }
    }
    ```

3. Set your wallet’s private key:
    ```bash
    export PRIVATE_KEY=<your private key>
    ```

4. Deploy the contract:
    ```bash
    forge script script/DeployMyNFT.s.sol --rpc-url <JOVAY_RPC_URL> --broadcast
    ```
    If your script's execution succeeds, your terminal should resemble the output below:

    ![Deploy Suucess](/Images/foundry-hardhat-tutorial/deploy-success-nft-foundry.png)

## Step 4: Interact with the NFT Contract
1. Create a scipt:
    ```bash
    touch script/InteractMyNFT.s.sol
    ```

2. Paste the following code into `script/InteractMyNFT.s.sol`:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "forge-std/Script.sol";
    import "../src/MyNFT.sol";

    contract InteractNFT is Script {
        function run() external {
            // Load private key from environment variable
            uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

            // Start broadcasting transactions
            vm.startBroadcast(deployerPrivateKey);

            // Replace with your deployed contract address
            address nftAddress = vm.envAddress("NFT_ADDRESS");
            MyNFT nft = MyNFT(nftAddress);

            // Mint an NFT to yourself (or another recipient)
            address recipient = 0x790dc68e4DaBac77Be8671043Fa2FefB26d079CC; // Example recipient
            string memory tokenURI = "ipfs://QmTTrwbe7Y1GM8qj1sZjKKR73Fz7V9V3aXjJ1o7pLjJDgM"; // Example IPFS URI

            nft.mint(recipient, tokenURI);

            console.log("NFT minted to:", recipient);
            console.logString(tokenURI);

            // Stop broadcasting
            vm.stopBroadcast();
        }
    }
    ```
3. Set your wallet’s private key and your NFT address:
    ```bash
    export PRIVATE_KEY=<your private key>
    export NFT_ADDRESS=<your nft address>
    ```

4. Execute the script:
    ```bash
    forge script script/InteractMyNFT.s.sol --rpc-url <JOVAY_RPC_URL> --broadcast
    ```
    If your script's execution succeeds, your terminal should resemble the output below:

    ![Interact Success](/Images/foundry-hardhat-tutorial/interact-success-nft-foundry.png)

## ❓ Troubleshooting Tips
- **Deployment fails?** Make sure your wallet has enough testnet tokens.
- **Minting fails?** Confirm that you're the owner and calling from the correct address.
- **Verification fails?** Double-check the contract address and compiler version.

## ✅ Conclusion
You've just built, deployed, and interacted with your first **ERC-721 NFT** on the **Jovay blockchain** using **Foundry**!

This gives you the foundation to:
- Add metadata and IPFS integration
- Implement batch minting
- Build marketplaces or staking integrations

If you hit any issues, refer back to this guide or consult the official [Foundry documentation](https://getfoundry.sh/introduction/overview).

Happy coding! 🚀

