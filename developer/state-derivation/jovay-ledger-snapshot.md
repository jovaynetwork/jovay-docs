---
outline: deep
---

# 📦 Using Jovay Ledger Snapshots

## 📖 Introduction

Jovay publishes **State Derivation (SD) Sequencer ledger snapshots** on a regular schedule so you can bootstrap an [**SD Sequencer**](./start-state-derivation-sequencer.md) from recent rollup state without syncing the full chain history.

> 📌 **Scope:** These snapshots are for **SD Sequencers only**. They are not compatible with standard RPC node deployment; use the separate RPC node artifacts and instructions for that purpose.

Each release ships **three artifacts** for a given network:

| Artifact | Description |
| --- | --- |
| 📜 **`genesis.conf`** | Fixed genesis configuration for the network (same file for every release on that network). |
| 🗜️ **`<YYYYMMDD>_<BLOCK_HEIGHT>.tar.gz`** | Compressed ledger database snapshot. |
| ⚓ **`snapshot_anchor.json`** | L1 cursor seed for State Derivation. The current implementation begins scanning from the following L1 block. |

Archive names follow **`YYYYMMDD_BLOCKHEIGHT.tar.gz`** (`YYYYMMDD` = publish date, `BLOCK_HEIGHT` = L2 stable height in the snapshot). The matching anchor is published at `state-derivation/YYYYMMDD_BLOCKHEIGHT/snapshot_anchor.json`.

> 📌 **Retention:** Use the newest published artifacts listed for your network below. Older archives may be removed after a replacement is published; do not rely on their continued availability.

> ⏱️ **Cadence:** Snapshots are published approximately every **14 days**.

> ⚠️ **Blob availability:** An SD Sequencer must fetch every rollup Blob published after the snapshot's L1 anchor. Ethereum consensus nodes are required to serve Blob sidecars for only [**4,096 epochs (about 18 days)**](https://eips.ethereum.org/EIPS/eip-4844#parameters). Always use the latest snapshot below; an older snapshot may no longer be usable with a standard Beacon provider even if its archive is still downloadable.

> 💾 **Capacity planning:** The current Testnet archive is **137,185,269,406 bytes (about 127.8 GiB compressed)**. A previous Testnet ledger occupied approximately **360 GiB** uncompressed; allow for further growth. Keep the archive and extracted ledger on the same filesystem only if it has at least **600 GiB free**, including room for database growth. Snapshot sizes will increase as the chain grows.

> 💾 **Mainnet capacity:** The first Mainnet archive is **19,666,758,797 bytes (about 18.32 GiB)**. The source `public/` databases occupied approximately **67 GiB** at creation. Budget for both the downloaded archive and restored databases, plus database growth and recovery overhead; the archive size alone is not the required disk capacity.

## 🎯 What You Need From a Snapshot

Before starting an SD Sequencer, download **all three** artifacts for your target network from the table below:

1. ✅ `genesis.conf`
2. ✅ Latest `<YYYYMMDD>_<BLOCK_HEIGHT>.tar.gz`
3. ✅ Matching `snapshot_anchor.json`

> ✅ **Testnet image:** Product version **`0.15.0`**, published as [`jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-sequencer:0.15.0-rc1`](https://github.com/jovaynetwork/jovay-releases/releases/tag/v0.15.0-rc1), has been validated end to end on Testnet. This does not establish compatibility with every later snapshot; see the network-specific availability and validation notes below.

## 📊 Latest Jovay Ledger Snapshots

### Testnet (Sepolia L1)

The latest Testnet snapshot was published on **2026-10-23**. Its L2 stable height is **`47889111`** and its matching L1 anchor is **`11975757`**. Before starting SD, confirm that your Beacon provider can still serve all required Blob data after this anchor; publication does not guarantee ongoing Blob availability.

| File | Recommended Sequencer version | L2 block height | File name | Checksums | Download |
| --- | --- | --- | --- | --- | --- |
| 📜 **genesis.conf** | `0.15.0-rc1` | — | `genesis.conf` | MD5: `1b6ad3d9fa67a596ca094e89bd2280ee`<br>SHA-256: `772cdd59b915787a5bca57f7bba0584333081f8749a7f702f5bba60819000fad` | [link](https://dl-testnet.jovay.io/snapshot/genesis.conf) |
| 🗜️ **Ledger snapshot** | `0.15.0-rc1` | `47889111` | `20261023_47889111.tar.gz` | MD5: `8373cd61d0104767c7a7bcfc1ab81c1e`<br>SHA-256: `fdc5e044adec86ec22b894ae0d5f1db46dd59bd7ad78d6ccc41633486ad9541a` | [link](https://dl-testnet.jovay.io/snapshot/20261023_47889111.tar.gz) |
| ⚓ **snapshot_anchor.json** | `0.15.0-rc1` | `47889111` | `snapshot_anchor.json` | MD5: `e18ecb3c4b7cce99bc00d61872eb0735`<br>SHA-256: `6cdfa84a06eab19ca17c2ea54c47c7a8f5a67298b704c7fbc26a3fea5cfab7e0` | [link](https://dl-testnet.jovay.io/state-derivation/20261023_47889111/snapshot_anchor.json) |

> 📌 **Validation status:** Snapshot creation, upload, and public HTTPS checks succeeded. The archive checksums above are the publisher's release values; verify your complete download before use. This specific snapshot has not yet been revalidated end to end by restoring an SD Sequencer and deriving subsequent batches with the public **`0.15.0-rc1`** image.

### Mainnet (Ethereum L1)

The first Mainnet snapshot was published on **2026-10-22**. Its L2 stable height is **`13641709`** and its matching L1 anchor is **`26246837`**.

| File | L2 block height | File name | Checksums | Download |
| --- | --- | --- | --- | --- |
| 📜 **genesis.conf** | — | `genesis.conf` | MD5: `502c910cbc21137c606621622fe67d28`<br>SHA-256: `d436f01b2e25d1946e63d885cb1dd3136da0e3d3beaf300f6f3f4482aff6b5d9` | [link](https://dl.jovay.io/snapshot/genesis.conf) |
| 🗜️ **Ledger snapshot** | `13641709` | `20261022_13641709.tar.gz` | MD5: `5580f9453cb4a56ba4f626618cce7915`<br>SHA-256: `eea8fb5f83af3ab8e7e0390653903b6695e459165be6b01c30917db6b132bc23` | [link](https://dl.jovay.io/snapshot/20261022_13641709.tar.gz) |
| ⚓ **snapshot_anchor.json** | `13641709` | `snapshot_anchor.json` | MD5: `cbe2485e6074fddc3789b31065a48357`<br>SHA-256: `2c4c918f37d6ef254041a128092106571511b17a55d9e833348be85aa15317c2` | [link](https://dl.jovay.io/state-derivation/20261022_13641709/snapshot_anchor.json) |

> 📌 **Validation status:** Snapshot creation and upload succeeded, and public HTTPS availability has been checked. The checksums above are the publisher's release values; verify your complete downloads before use. Restoring this Mainnet snapshot and deriving subsequent batches with the public **`0.15.0-rc1`** image has **not yet been validated end to end**. Testnet validation of that image must not be read as Mainnet validation.

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

Snapshots from a multi-disk source use the same layout: the database directories from its data roots are combined under a single `public/`. You do not need to reproduce the source node's disk mounts. Source-local metadata such as `local_storage/`, `meta_store/`, and `metasvc_db/` is not included. Initialize the target node first, stop it, and replace **only** its `data/public/`, preserving the target's own metadata.

## ⚓ `snapshot_anchor.json` Format

For example, the Testnet snapshot `20261023_47889111` has the following matching file:

```json
{
  "l1_start_block_number": 11975757
}
```

| Field | Description |
| --- | --- |
| `l1_start_block_number` | Initial value of the persisted L1 indexer cursor. The current implementation scans from `l1_start_block_number + 1`. Always use the **`snapshot_anchor.json` published with your snapshot**—do not guess or edit this value. |

## 🚀 Next Steps

Ready to run a node? Continue with [**Start a State Derivation Sequencer**](./start-state-derivation-sequencer.md).

For Jovay RPC URLs and chain IDs, see [Network Information](../network-information.md).
