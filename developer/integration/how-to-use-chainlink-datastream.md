---
outline: deep
---

# How to Use Chainlink Data Streams on Jovay

## Overview

Chainlink provides two primary methods for retrieving off-chain data:

- **Data Feeds (Push-based)**: Oracles automatically update on-chain data at fixed intervals or when price thresholds are met
- **Data Streams (Pull-based)**: Low-latency market data is served off-chain and verified on-chain, maintaining trust minimization while enabling dApps to access high-frequency data on demand

Jovay natively supports **Chainlink Data Streams**, providing developers with access to high-frequency, low-latency oracle data for building sophisticated DeFi applications. This guide walks you through the complete integration process.

## Developer Integration Steps

The following diagram illustrates the key steps for developers to integrate Chainlink Data Streams on Jovay:

![Chainlink Data Streams Integration Steps](/Images/chainlink-integration/chainlink-datastream-integration-steps.svg)

**Quick Overview:**

- **Step 1 - Setup**: Obtain API credentials from Chainlink and configure your development environment
- **Step 2 - Fetch Data**: Use SDK to retrieve low-latency price reports from off-chain Data Streams network
- **Step 3 - Verify**: Deploy your client contract and validate report integrity using Chainlink's Verifier on Jovay
- **Step 4 - Use**: Consume trustless, verified price data in your dApps

## Integration Guide

::: tip Official Documentation
For comprehensive Chainlink Data Streams documentation, visit:  
[https://docs.chain.link/data-streams/tutorials/overview](https://docs.chain.link/data-streams/tutorials/overview)
:::

### Integration Architecture

Chainlink Data Streams integration consists of two core components:

1. **Off-chain Data Retrieval**: Fetch and decode market data (Reports) from the Data Streams Aggregation Network using the Go, Rust, or TypeScript SDK
2. **On-chain Verification**: Validate Report integrity by calling the Stream Verifier Network contract deployed on Jovay

::: info Example Scenario
This guide demonstrates fetching **ETH/USD** price data using the **Go SDK** and verifying it on **Jovay mainnet**.
:::

### 1. Environment Setup

#### Prerequisites

Before you begin, ensure you have the following:

1. **Chainlink API Credentials**: Apply for mainnet or testnet API credentials (`API_KEY` and `API_SECRET`)
   - Application form: [Chainlink Data Streams Access](https://chainlinkcommunity.typeform.com/datastreams?typeform-source=docs.chain.link#ref_id=docs)
   - Approval typically takes 1-2 business days

2. **Development Environment**: Install Go version 1.21 or higher
   - Download from: [https://go.dev/dl/](https://go.dev/dl/)
   - Verify installation: `go version`

### 2. Fetch Market Data (Report)

#### Step 2.1: Configure API Credentials

Set your Chainlink API credentials as environment variables:

```bash
export API_KEY="your_api_key_here"
export API_SECRET="your_api_secret_here"
```

::: warning Security Note
Never commit API credentials to version control. Use environment variables or secure secret management solutions.
:::

#### Step 2.2: Identify the Feed ID

Each trading pair has a unique Feed ID. For this example, we'll use **ETH/USD on mainnet**:

```text
Feed ID: 0x000362205e10b3a147d02792eccee483dca6c7b44ecce7012cb8c6e0b68b3ae9
```

Find more Feed IDs in the [Chainlink Crypto Streams documentation](https://docs.chain.link/data-streams/crypto-streams?page=1&testnetPage=1).

#### Step 2.3: Create the Data Fetching Script

Create a file named `single-stream.go` with the following code. This script fetches the latest price report from the Data Streams Aggregation Network.

**Network Configuration:**

- **Mainnet**: `https://api.dataengine.chain.link`
- **Testnet**: `https://api.testnet-dataengine.chain.link`

<EnhancedCollapsibleCodeBlock
  title="View single-stream.go (Complete Go Script)"
  language="go"
  :show-copy-button="true"
  :show-language-label="true"
  :default-expanded="false"
>

```go
package main

import (
    "context"
    "fmt"
    "os"
    "time"

    streams "github.com/smartcontractkit/data-streams-sdk/go"
    feed "github.com/smartcontractkit/data-streams-sdk/go/feed"
    report "github.com/smartcontractkit/data-streams-sdk/go/report"
    // NOTE: Use the report version (v3, v8, etc.) that matches your stream
    v3 "github.com/smartcontractkit/data-streams-sdk/go/report/v3"
)

func main() {
    // Validate command-line arguments
    if len(os.Args) < 2 {
        fmt.Printf("Usage: go run main.go [FeedID]\nExample: go run main.go 0x000359843a543ee2fe414dc14c7e7920ef10f4372990b79d6361cdc0dd1ba782\n")
        os.Exit(1)
    }
    feedIDInput := os.Args[1]

    // Get API credentials from environment variables
    apiKey := os.Getenv("API_KEY")
    apiSecret := os.Getenv("API_SECRET")
    if apiKey == "" || apiSecret == "" {
        fmt.Printf("API_KEY and API_SECRET environment variables must be set\n")
        os.Exit(1)
    }

    // Define the configuration for the SDK client
    cfg := streams.Config{
        ApiKey:    apiKey,
        ApiSecret: apiSecret,
        RestURL:   "https://api.dataengine.chain.link",
        Logger:    streams.LogPrintf,
    }

    // Initialize the SDK client
    client, err := streams.New(cfg)
    if err != nil {
        cfg.Logger("Failed to create client: %v\n", err)
        os.Exit(1)
    }

    // Create context with timeout
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    // Parse the feed ID
    var feedID feed.ID
    if err := feedID.FromString(feedIDInput); err != nil {
        cfg.Logger("Invalid feed ID format '%s': %v\n", feedIDInput, err)
        os.Exit(1)
    }

    // Fetch the latest report
    reportResponse, err := client.GetLatestReport(ctx, feedID)
    if err != nil {
        cfg.Logger("Failed to get latest report: %v\n", err)
        os.Exit(1)
    }

    // Log the raw report data
    cfg.Logger("Raw report data: %+v\n", reportResponse)

    // Decode the report
    // NOTE: Use the report version (v3, v8, etc.) that matches your stream
    decodedReport, err := report.Decode[v3.Data](reportResponse.FullReport)
    if err != nil {
        cfg.Logger("Failed to decode report: %v\n", err)
        os.Exit(1)
    }

    // Format and display the decoded report
    // NOTE: Adjust for your report and desired output
    fmt.Printf("\nDecoded Report for Stream ID %s:\n"+
        "------------------------------------------\n"+
        "Observations Timestamp: %d\n"+
        "Benchmark Price       : %s\n"+
        "Bid                   : %s\n"+
        "Ask                   : %s\n"+
        "Valid From Timestamp  : %d\n"+
        "Expires At            : %d\n"+
        "Link Fee              : %s\n"+
        "Native Fee            : %s\n"+
        "------------------------------------------\n",
        feedIDInput,
        decodedReport.Data.ObservationsTimestamp,
        decodedReport.Data.BenchmarkPrice.String(),
        decodedReport.Data.Bid.String(),
        decodedReport.Data.Ask.String(),
        decodedReport.Data.ValidFromTimestamp,
        decodedReport.Data.ExpiresAt,
        decodedReport.Data.LinkFee.String(),
        decodedReport.Data.NativeFee.String(),
    )
}
```

</EnhancedCollapsibleCodeBlock>

#### Step 2.4: Execute the Script

Run the script with the Feed ID as an argument:

```bash
go run single-stream.go 0x000362205e10b3a147d02792eccee483dca6c7b44ecce7012cb8c6e0b68b3ae9
```

#### Understanding the Output

Upon successful execution, you'll receive both raw and decoded price data. The decoded data shows the **ETH/USD median price** agreed upon by the Decentralized Oracle Network (DON).

**Example Output:**

![Chainlink Data Streams Decoded Report](/Images/chainlink-integration/jovay-chainlink-datastream-decode-report.png)

In this example (captured at **2025-11-19 06:27:46 UTC**, timestamp `1763533666`), the DON consensus price for ETH/USD is approximately **$3,027**.

#### Report Data Fields Explained

| Field | Value (Example) | Description |
|-------|----------------|-------------|
| **Observations Timestamp** | `1763533666` | End timestamp of price validity period (Unix time, seconds) |
| **Benchmark Price** | `3027356134972465500000` | DON median consensus price for ETH/USD (with decimals) |
| **Bid** | `3027338049135112200000` | Simulated buy-impact price |
| **Ask** | `3027449300000000000000` | Simulated sell-impact price |
| **Valid From Timestamp** | `1763533666` | Start timestamp of price validity period (Unix time, seconds) |
| **Expires At** | `1766125666` | Report expiration timestamp (Unix time, seconds) |
| **Link Fee** | `24164455119479504` | Verification cost in LINK tokens |
| **Native Fee** | `105701685923302` | Verification cost in native blockchain tokens |

::: tip Price Precision
Prices are returned with 18 decimal places. Divide by `10^18` to get the human-readable price.
:::

### 3. Verify Report Integrity On-Chain

Now that you have the off-chain price report, the next step is to verify its integrity on the Jovay blockchain. This ensures the data is trustless and cryptographically validated.

#### Step 3.1: Locate the Verifier Contract

Jovay's **Stream Verifier Network** contract address on mainnet:

```text
0xF1Ee15ecca3aD06edF9603a1ea6d19043804522A
```

::: info Contract Registry
Find verifier contracts for other networks in the [Chainlink Crypto Streams documentation](https://docs.chain.link/data-streams/crypto-streams?page=1&testnetPage=1).
:::

#### Step 3.2: Deploy the Verification Contract

Create a smart contract that interacts with Jovay's Verifier contract to validate the Report and extract the verified price data.

**Contract Functionality:**

1. Accepts the raw Report from Step 2
2. Calls the Jovay Verifier contract for validation
3. Decodes the verified price data
4. Emits a `DecodedPrice` event with the validated price

You can use the `ClientReportsVerifier.sol` contract below, or download it directly from:  
[ClientReportsVerifier.sol on Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/DataStreams/ClientReportsVerifier.sol)

::: warning Production Usage
This is a demonstration contract. Ensure proper auditing and security reviews before using in production.
:::

<EnhancedCollapsibleCodeBlock
  title="View ClientReportsVerifier.sol (Complete Solidity Contract)"
  language="solidity"
  :show-copy-button="true"
  :show-language-label="true"
  :default-expanded="false"
>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Common} from "@chainlink/contracts@1.5.0/src/v0.8/llo-feeds/libraries/Common.sol";
import {IVerifierFeeManager} from "@chainlink/contracts@1.5.0/src/v0.8/llo-feeds/v0.3.0/interfaces/IVerifierFeeManager.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

using SafeERC20 for IERC20;

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE FOR DEMONSTRATION PURPOSES.
 * DO NOT USE THIS CODE IN PRODUCTION.
 *
 *  This contract can verify Chainlink Data Streams reports onchain and pay
 *  the verification fee in LINK (when required).
 *
 * - If `VerifierProxy.s_feeManager()` returns a non-zero address, the network
 *   expects you to interact with that FeeManager for every verification call:
 *   quote fees, approve the RewardManager, then call `verify()`.
 *
 * - If `s_feeManager()` returns the zero address, no FeeManager contract has
 *   been deployed on that chain. In that case there is nothing to quote or pay
 *   onchain, so the contract skips the fee logic entirely.
 *
 *  The `if (address(feeManager) != address(0))` check below chooses the
 *  correct path automatically, making the same bytecode usable on any chain.
 */

// ────────────────────────────────────────────────────────────────────────────
//  Interfaces
// ────────────────────────────────────────────────────────────────────────────

interface IVerifierProxy {
  /**
   * @notice Route a report to the correct verifier and (optionally) bill fees.
   * @param payload           Full report payload (header + signed report).
   * @param parameterPayload  ABI-encoded fee metadata.
   */
  function verify(
    bytes calldata payload,
    bytes calldata parameterPayload
  ) external payable returns (bytes memory verifierResponse);

  function verifyBulk(
    bytes[] calldata payloads,
    bytes calldata parameterPayload
  ) external payable returns (bytes[] memory verifiedReports);

  function s_feeManager() external view returns (IVerifierFeeManager);
}

interface IFeeManager {
  /**
   * @return fee, reward, totalDiscount
   */
  function getFeeAndReward(
    address subscriber,
    bytes memory unverifiedReport,
    address quoteAddress
  ) external returns (Common.Asset memory, Common.Asset memory, uint256);

  function i_linkAddress() external view returns (address);

  function i_nativeAddress() external view returns (address);

  function i_rewardManager() external view returns (address);
}

// ────────────────────────────────────────────────────────────────────────────
//  Contract
// ────────────────────────────────────────────────────────────────────────────

/**
 * @dev This contract implements functionality to verify Data Streams reports from
 * the Data Streams API, with payment in LINK tokens.
 */
contract ClientReportsVerifier {
  // ----------------- Errors -----------------
  error NothingToWithdraw();
  error NotOwner(address caller);
  error InvalidReportVersion(uint16 version);

  // ----------------- Report schemas -----------------
  // More info: https://docs.chain.link/data-streams/reference/report-schema-v3
  /**
   * @dev Data Streams report schema v3 (crypto streams).
   *      Prices, bids and asks use 8 or 18 decimals depending on the stream.
   */
  struct ReportV3 {
    bytes32 feedId;
    uint32 validFromTimestamp;
    uint32 observationsTimestamp;
    uint192 nativeFee;
    uint192 linkFee;
    uint32 expiresAt;
    int192 price;
    int192 bid;
    int192 ask;
  }

  /**
   * @dev Data Streams report schema v8 (RWA streams).
   */
  struct ReportV8 {
    bytes32 feedId;
    uint32 validFromTimestamp;
    uint32 observationsTimestamp;
    uint192 nativeFee;
    uint192 linkFee;
    uint32 expiresAt;
    uint64 lastUpdateTimestamp;
    int192 midPrice;
    uint32 marketStatus;
  }

  // ----------------- Storage -----------------
  IVerifierProxy public immutable i_verifierProxy;
  address private immutable i_owner;

  int192 public lastDecodedPrice;

  // ----------------- Events -----------------
  event DecodedPrice(int192 price);

  // ----------------- Constructor / modifier -----------------
  /**
   * @param _verifierProxy Address of the VerifierProxy on the target network.
   *        Addresses: https://docs.chain.link/data-streams/crypto-streams
   */
  constructor(
    address _verifierProxy
  ) {
    i_owner = msg.sender;
    i_verifierProxy = IVerifierProxy(_verifierProxy);
  }

  modifier onlyOwner() {
    if (msg.sender != i_owner) revert NotOwner(msg.sender);
    _;
  }

  // ----------------- Public API -----------------

  /**
   * @notice Verify a Data Streams report (schema v3 or v8).
   *
   * @dev Steps:
   *  1. Decode the unverified report to get `reportData`.
   *  2. Read the first two bytes → schema version (`0x0003` or `0x0008`).
   *     - Revert if the version is unsupported.
   *  3. Fee handling:
   *     - Query `s_feeManager()` on the proxy.
   *       – Non-zero → quote the fee, approve the RewardManager,
   *         ABI-encode the fee token address for `verify()`.
   *       – Zero     → no FeeManager; skip quoting/approval and pass `""`.
   *  4. Call `VerifierProxy.verify()`.
   *  5. Decode the verified report into the correct struct and emit the price.
   *
   *  @param unverifiedReport Full payload returned by Streams Direct.
   *  @custom:reverts InvalidReportVersion when schema ≠ v3/v8.
   */
  function verifyReport(
    bytes memory unverifiedReport
  ) external {
    // ─── 1. & 2. Extract reportData and schema version ──
    (, bytes memory reportData) = abi.decode(unverifiedReport, (bytes32[3], bytes));

    uint16 reportVersion = (uint16(uint8(reportData[0])) << 8) | uint16(uint8(reportData[1]));
    if (reportVersion != 3 && reportVersion != 8) {
      revert InvalidReportVersion(reportVersion);
    }

    // ─── 3. Fee handling ──
    IFeeManager feeManager = IFeeManager(address(i_verifierProxy.s_feeManager()));

    bytes memory parameterPayload;
    if (address(feeManager) != address(0)) {
      // FeeManager exists — always quote & approve
      address feeToken = feeManager.i_linkAddress();

      (Common.Asset memory fee,,) = feeManager.getFeeAndReward(address(this), reportData, feeToken);

      IERC20(feeToken).approve(feeManager.i_rewardManager(), fee.amount);
      parameterPayload = abi.encode(feeToken);
    } else {
      // No FeeManager deployed on this chain
      parameterPayload = bytes("");
    }

    // ─── 4. Verify through the proxy ──
    bytes memory verified = i_verifierProxy.verify(unverifiedReport, parameterPayload);

    // ─── 5. Decode & store price ──
    if (reportVersion == 3) {
      int192 price = abi.decode(verified, (ReportV3)).price;
      lastDecodedPrice = price;
      emit DecodedPrice(price);
    } else {
      int192 price = abi.decode(verified, (ReportV8)).midPrice;
      lastDecodedPrice = price;
      emit DecodedPrice(price);
    }
  }

  /**
   * @notice Withdraw all balance of an ERC-20 token held by this contract.
   * @param _beneficiary Address that receives the tokens.
   * @param _token       ERC-20 token address.
   */
  function withdrawToken(
    address _beneficiary,
    address _token
  ) external onlyOwner {
    uint256 amount = IERC20(_token).balanceOf(address(this));
    if (amount == 0) revert NothingToWithdraw();
    IERC20(_token).safeTransfer(_beneficiary, amount);
  }
}
```

</EnhancedCollapsibleCodeBlock>

#### Step 3.3: Compile and Deploy

1. **Compile the Contract**: Use Remix, Hardhat, or Foundry to compile `ClientReportsVerifier.sol`

2. **Deploy to Jovay**: When deploying, pass the Verifier contract address as a constructor parameter:

   ```text
   Constructor Parameter: 0xF1Ee15ecca3aD06edF9603a1ea6d19043804522A
   ```

3. **Save the Deployment Address**: Record your deployed `ClientReportsVerifier` contract address for the next step

::: tip Deployment Tools

- **Remix**: Use the Jovay RPC endpoint in MetaMask
- **Hardhat/Foundry**: Configure Jovay network in your deployment scripts
- See [Jovay Network Information](/developer/network-information) for RPC details

:::

#### Step 3.4: Verify the Report

Call the `verifyReport` function on your deployed contract:

**Function Parameters:**

- `unverifiedReport`: The raw Report data obtained from Step 2.4

**What Happens:**

1. The contract extracts the report version (v3 or v8)
2. Queries the Fee Manager (if applicable)
3. Calls the Verifier Proxy to validate signatures
4. Decodes and emits the verified price via the `DecodedPrice` event

**Monitor the Transaction:**

View your verification transaction on Jovay Explorer:  
[https://explorer.jovay.io](https://explorer.jovay.io)

::: tip Event Monitoring
Listen for the `DecodedPrice` event to capture the verified price in your application:

```solidity
event DecodedPrice(int192 price);
```

:::

---

## Next Steps

Congratulations! You've successfully integrated Chainlink Data Streams on Jovay. Here are some next steps:

- **Build dApps**: Use verified price data for lending protocols, DEXs, derivatives, and more
- **Explore Other Feeds**: Check the [Chainlink Crypto Streams](https://docs.chain.link/data-streams/crypto-streams) for additional trading pairs
- **Optimize Gas Costs**: Implement batch verification for multiple reports using `verifyBulk()`
- **Production Readiness**: Add proper error handling, access controls, and monitoring

## Additional Resources

- [Chainlink Data Streams Documentation](https://docs.chain.link/data-streams)
- [Jovay Developer Guide](/guide/developer-guide)
- [Jovay Network Information](/developer/network-information)
- [Jovay Bridge Developer Reference](/developer/jovay-bridge-developer-reference)
