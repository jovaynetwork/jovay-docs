---
outline: deep
---

# 📦 Using Jovay Ledger Snapshots

## 📖 Introduction

Jovay publishes **Sequencer ledger snapshots** on a regular schedule so you can bootstrap nodes—especially a [**State Derivation (SD) Sequencer**](./start-state-derivation-sequencer.md)—from recent rollup state without syncing the full chain history.

Each release ships **three artifacts** for a given network:

| Artifact | Description |
| --- | --- |
| 📜 **`genesis.conf`** | Fixed genesis configuration for the network (same file for every release on that network). |
| 🗜️ **`<YYYYMMDD>_<BLOCK_HEIGHT>.tar.gz`** | Compressed ledger database snapshot. |
| ⚓ **`snapshot_anchor.json`** | L1 cursor seed for State Derivation. The current implementation begins scanning from the following L1 block. |

Archive names follow **`YYYYMMDD_BLOCKHEIGHT.tar.gz`** (`YYYYMMDD` = publish date, `BLOCK_HEIGHT` = L2 stable height in the snapshot). The matching anchor is published at `state-derivation/YYYYMMDD_BLOCKHEIGHT/snapshot_anchor.json`.

> 📌 **Retention:** Only the **latest** snapshot per network is kept on the CDN. Older archives are removed when a new one is published.

> ⏱️ **Cadence:** Snapshots are published approximately every **14 days**.

> 💾 **Capacity planning:** The current Testnet archive is about **126 GiB compressed** and expands to about **360 GiB**. Keep the archive and extracted ledger on the same filesystem only if it has at least **600 GiB free**, including room for database growth. Snapshot sizes will increase as the chain grows.

## 🎯 What You Need From a Snapshot

Before starting an SD Sequencer, download **all three** artifacts for your target network from the table below:

1. ✅ `genesis.conf`
2. ✅ Latest `<YYYYMMDD>_<BLOCK_HEIGHT>.tar.gz`
3. ✅ Matching `snapshot_anchor.json`

> ✅ **Recommended image:** Use product version **`0.15.0`**, published as [`jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-sequencer:0.15.0-rc1`](https://github.com/jovaynetwork/jovay-releases/releases/tag/v0.15.0-rc1). This exact tag has been validated end to end with the current Testnet snapshot.

## 📊 Latest Jovay Ledger Snapshots

### Testnet (Sepolia L1)

| File | Recommended Sequencer version | L2 block height | File name | Checksums | Download |
| --- | --- | --- | --- | --- | --- |
| 📜 **genesis.conf** | `0.15.0-rc1` | — | `genesis.conf` | MD5: `1b6ad3d9fa67a596ca094e89bd2280ee`<br>SHA-256: `772cdd59b915787a5bca57f7bba0584333081f8749a7f702f5bba60819000fad` | [link](https://dl-testnet.jovay.io/snapshot/genesis.conf) |
| 🗜️ **Ledger snapshot** | `0.15.0-rc1` | `46787372` | `20260916_46787372.tar.gz` | MD5: `16212a19ffa5c6b1d871bb7c9f23a9c6`<br>SHA-256: `95f502b62e2ea7982cfe9006d4b087d840984db9bfed23c4a7fd3314d850e40e` | [link](https://dl-testnet.jovay.io/snapshot/20260916_46787372.tar.gz) |
| ⚓ **snapshot_anchor.json** | `0.15.0-rc1` | `46787372` | `snapshot_anchor.json` | MD5: `478e9f5175cb3ea659b0eceddc5a23d3`<br>SHA-256: `4beedfd0e2147a97eb34e847a06b74c7b62adf64952f3f41f11cfe2a08183ee1` | [link](https://dl-testnet.jovay.io/state-derivation/20260916_46787372/snapshot_anchor.json) |

### Mainnet (Ethereum L1)

| File | Recommended Sequencer version | L2 block height | File name | Checksums | Download |
| --- | --- | --- | --- | --- | --- |
| 📜 **genesis.conf** | `0.15.0-rc1` | — | `genesis.conf` | MD5: `502c910cbc21137c606621622fe67d28`<br>SHA-256: `d436f01b2e25d1946e63d885cb1dd3136da0e3d3beaf300f6f3f4482aff6b5d9` | [link](https://dl.jovay.io/snapshot/genesis.conf) |
| 🗜️ **Ledger snapshot** | — | — | Not available yet | — | Not available yet |
| ⚓ **snapshot_anchor.json** | — | — | Not available yet | — | Not available yet |

> ⚠️ The Mainnet ledger snapshot and matching anchor have not been published yet. Do not start a Mainnet SD Sequencer until both rows above contain a real release.

After downloading all three artifacts, verify each file's SHA-256 checksum against the table above. MD5 values are retained for compatibility and accidental-transfer checks, but SHA-256 is the primary integrity check:

```bash
sha256sum genesis.conf
sha256sum <YYYYMMDD>_<BLOCK_HEIGHT>.tar.gz
sha256sum snapshot_anchor.json

# Optional compatibility check
md5sum genesis.conf <YYYYMMDD>_<BLOCK_HEIGHT>.tar.gz snapshot_anchor.json
```

## 🗂️ Snapshot Archive Structure

The archive has one top-level `public/` directory. It contains **11 database directories** and no loose files at that level:

Example (`tree -L 1 public` after extraction):

```text
public/
├── BlockBodySliceKvDB
├── BlockHeaderKvDB
├── BlockIndexKvDB
├── BlockMetaKvDB
├── BlockRwSetDB
├── ContractCodeKvDB
├── MetaKvDB
├── PersistTxKvDB
├── ProofKvDB
├── StateDB
└── TxIndexKvDB

11 directories, 0 files
```

When deploying an SD Sequencer, extract these folders into `data/public/` — see [Start a State Derivation Sequencer](./start-state-derivation-sequencer.md).

## ⚓ `snapshot_anchor.json` Format

```json
{
  "l1_start_block_number": 24933000
}
```

| Field | Description |
| --- | --- |
| `l1_start_block_number` | Initial value of the persisted L1 indexer cursor. The current implementation scans from `l1_start_block_number + 1`. Always use the **`snapshot_anchor.json` published with your snapshot**—do not guess or edit this value. |

## 🚀 Next Steps

Ready to run a node? Continue with [**Start a State Derivation Sequencer**](./start-state-derivation-sequencer.md).

For Jovay RPC URLs and chain IDs, see [Network Information](../network-information.md).
