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
| ⚓ **`snapshot_anchor.json`** | L1 block height where SD indexing should begin when deriving forward. |

Archive names follow **`YYYYMMDD_BLOCKHEIGHT.tar.gz`** (`YYYYMMDD` = publish date, `BLOCK_HEIGHT` = L2 stable height in the snapshot). The anchor file lives under the same `YYYYMMDD_BLOCKHEIGHT` path (without `.tar.gz`).

> 📌 **Retention:** Only the **latest** snapshot per network is kept on the CDN. Older archives are removed when a new one is published.

> ⏱️ **Cadence:** Snapshots are published approximately every **14 days**.

## 🎯 What You Need From a Snapshot

Before starting an SD Sequencer, download **all three** artifacts for your target network from the table below:

1. ✅ `genesis.conf`
2. ✅ Latest `<YYYYMMDD>_<BLOCK_HEIGHT>.tar.gz`
3. ✅ Matching `snapshot_anchor.json`

> ⚠️ **Version requirement:** State Derivation requires **`l2-sequencer` version `>= 0.14.0`**. Use a compatible image tag when deploying an SD Sequencer.

## 📊 Latest Jovay Ledger Snapshots

### Testnet (Sepolia L1)

| File | Min Sequencer version | L2 block height | File name | MD5 / checksum | Download |
| --- | --- | --- | --- | --- | --- |
| 📜 **genesis.conf** | `>= 0.14.0` | — | `genesis.conf` | `1b6ad3d9fa67a596ca094e89bd2280ee` | [link](http://dl-testnet.jovay.io/snapshot/genesis.conf) |
| 🗜️ **Ledger snapshot** | `>= 0.14.0` | _TBD_ | `_TBD_.tar.gz` | _TBD_ | [link](http://dl-testnet.jovay.io/snapshot/_TBD_.tar.gz) |
| ⚓ **snapshot_anchor.json** | `>= 0.14.0` | _TBD_ | `snapshot_anchor.json` | _TBD_ | [link](http://dl-testnet.jovay.io/snapshot/_TBD_/snapshot_anchor.json) |

### Mainnet (Ethereum L1)

| File | Min Sequencer version | L2 block height | File name | MD5 / checksum | Download |
| --- | --- | --- | --- | --- | --- |
| 📜 **genesis.conf** | `>= 0.14.0` | — | `genesis.conf` | `502c910cbc21137c606621622fe67d28` | [link](http://dl.jovay.io/snapshot/genesis.conf) |
| 🗜️ **Ledger snapshot** | `>= 0.14.0` | _TBD_ | `_TBD_.tar.gz` | _TBD_ | [link](http://dl.jovay.io/snapshot/_TBD_.tar.gz) |
| ⚓ **snapshot_anchor.json** | `>= 0.14.0` | _TBD_ | `snapshot_anchor.json` | _TBD_ | [link](http://dl.jovay.io/snapshot/_TBD_/snapshot_anchor.json) |

After downloading all three artifacts, verify each file's MD5 checksum against the table above:

```bash
# genesis.conf
md5sum genesis.conf
# Testnet expected: 1b6ad3d9fa67a596ca094e89bd2280ee
# Mainnet expected: 502c910cbc21137c606621622fe67d28

# Ledger snapshot
md5sum <YYYYMMDD>_<BLOCK_HEIGHT>.tar.gz
# Expected: see MD5 / checksum column for Ledger snapshot row

# snapshot_anchor.json
md5sum snapshot_anchor.json
# Expected: see MD5 / checksum column for snapshot_anchor.json row
```

## 🗂️ Snapshot Archive Structure

After extracting the `.tar.gz`, the top level contains **11 database directories** (no loose files at the root):

Example (`tree -L 1`):

```text
20260428_061010/
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
| `l1_start_block_number` | L1 block height where the SD node begins indexing rollup data. Always use the **`snapshot_anchor.json` published with your snapshot**—do not guess or edit this value. |

## 🚀 Next Steps

Ready to run a node? Continue with [**Start a State Derivation Sequencer**](./start-state-derivation-sequencer.md).

For Jovay RPC URLs and chain IDs, see [Network Information](../network-information.md).
