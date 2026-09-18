---
outline: deep
---

# 🧬 How to Start a State Derivation Sequencer

## 📖 Introduction

In a Layer 2 rollup, **State Derivation** is the process of reconstructing the L2 ledger by reading **canonical rollup data published on Layer 1**, rather than syncing blocks directly from a production Sequencer.

On Jovay, batch data is posted to **Ethereum EIP-4844 Blobs** as the **Data Availability (DA)** layer. Once batches are **proven and finalized on L1**, their contents are authoritative: anyone with the data can re-execute transactions and recover the same Jovay ledger state.

A **State Derivation (SD) Sequencer** does exactly that:

1. **Bootstraps** from an official [Jovay ledger snapshot](./jovay-ledger-snapshot.md) (a recent on-disk copy of the Sequencer ledger).
2. **Indexes L1** from the height in `snapshot_anchor.json`, fetching rollup batch data from **Ethereum Blobs** via execution RPC and Beacon API.
3. **Applies** the fetched batches to derive blocks forward and **recover the Jovay ledger** that has already been proven on Ethereum.

The production **Jovay Sequencer** continues to sequence live traffic and post new batches to L1. The SD Sequencer independently verifies and catches up from DA—it does not replace the production node, but lets external developers rebuild a provably correct ledger without full historical sync.

This tutorial walks you through deploying an SD Sequencer with the published **`l2-sequencer`** Docker image.

> ✅ **Recommended image:** Use product version **`0.15.0`**, published as [`jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-sequencer:0.15.0-rc1`](https://github.com/jovaynetwork/jovay-releases/releases/tag/v0.15.0-rc1). This exact tag has been validated end to end with the current Testnet snapshot. If a later snapshot lists a newer validated image, follow the [snapshot table](./jovay-ledger-snapshot.md#-latest-jovay-ledger-snapshots).

## 🎯 What You'll Accomplish

By following this guide, you will:

1. ✅ Download the latest snapshot artifacts (`genesis.conf`, ledger archive, `snapshot_anchor.json`)
2. ✅ Deploy an SD Sequencer with Docker Compose
3. ✅ Configure L1 connectivity and rollup contracts for your network
4. ✅ Verify the node is running and deriving blocks

## 🌐 Environment Information

### Jovay Testnet (Sepolia L1)

| Item | Details |
| --- | --- |
| 🔗 Jovay network | [Jovay Testnet](../network-information.md#jovay-testnet) |
| 🔗 Associated L1 | Sepolia |
| 📦 Snapshot CDN | `https://dl-testnet.jovay.io/snapshot/` |
| 🐳 Recommended SD image | `jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-sequencer:0.15.0-rc1` (product version `0.15.0`) |
| 📬 L2 `RELAYER_ADDRESS` | `0xeb623ce3eb46b1d943ba56a09b17c6be9e5b3712` |
| 📜 L1 Rollup contract | [`0x79C0bB4EE51D7557E012f2f52db4A4ff85Ca3196`](https://sepolia.etherscan.io/address/0x79C0bB4EE51D7557E012f2f52db4A4ff85Ca3196) |
| 📮 L1 Mailbox contract | [`0x95fE4eD4327fB138Cd4Bd05a574378942648bA04`](https://sepolia.etherscan.io/address/0x95fE4eD4327fB138Cd4Bd05a574378942648bA04) |

### Jovay Mainnet (Ethereum L1)

| Item | Details |
| --- | --- |
| 🔗 Jovay network | [Jovay Mainnet](../network-information.md#jovay-mainnet) |
| 🔗 Associated L1 | Ethereum |
| 📦 Snapshot CDN | `https://dl.jovay.io/snapshot/` |
| 🐳 Recommended SD image | `jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-sequencer:0.15.0-rc1` (product version `0.15.0`) |
| 📬 L2 `RELAYER_ADDRESS` | `0xae13ce4cd416cb4598865aa5ac8d13532bd3cd99` |
| 📜 L1 Rollup contract | [`0xe0a28b8918a62edb825055221a1df12c7c81bac1`](https://etherscan.io/address/0xe0a28b8918a62edb825055221a1df12c7c81bac1) |
| 📮 L1 Mailbox contract | [`0x9869a90fdac287519e48aff4cce329907a995162`](https://etherscan.io/address/0x9869a90fdac287519e48aff4cce329907a995162) |

> ⚠️ The Mainnet ledger snapshot and matching `snapshot_anchor.json` have not been published yet. The Mainnet values in this guide are provided for preparation only; do not start a Mainnet SD Sequencer until the [snapshot table](./jovay-ledger-snapshot.md#mainnet-ethereum-l1) contains a real release.

> 💡 You must provide your own **L1 execution RPC** (`l1_rpc_url`) and **Beacon REST API** (`beacon_rpc_url`) for the associated L1 chain. Use any provider with stable access and sufficient rate limits (Alchemy, Infura, self-hosted, etc.).

## 🧰 Prerequisites

Before getting started, make sure you have:

- 🐳 [Docker](https://docs.docker.com/get-docker/) and Docker Compose installed
- 📥 Latest snapshot artifacts from [Using Jovay Ledger Snapshots](./jovay-ledger-snapshot.md) (all three files for your network)
- 🔗 **L1 execution RPC URL** and **Beacon API URL** for Sepolia (testnet) or Ethereum (mainnet)
- 🏷️ The recommended `l2-sequencer` image: **`0.15.0-rc1`** (product version `0.15.0`)
- 💾 Sufficient disk space for both the compressed archive and extracted ledger. For the current Testnet release, keep at least **600 GiB free** on the target filesystem; future snapshots may require more.

### Shell variables

```bash
export SD_DEPLOY_DIR=/mnt/l2_sd_sequencer # your working path
export IMAGE=jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-sequencer:0.15.0-rc1
export SNAPSHOT_ID=<YYYYMMDD>_<BLOCK_HEIGHT>   # from the snapshot table
export SNAPSHOT_DOWNLOAD_DIR=./jovay-snapshot    # where you saved downloads

# Verify capacity before downloading or extracting the snapshot
df -h "$(dirname "${SD_DEPLOY_DIR}")"
```

## 🔧 Step-by-Step Guide

### 1️⃣ Download snapshot artifacts

Open [Latest Jovay Ledger Snapshots](./jovay-ledger-snapshot.md#-latest-jovay-ledger-snapshots) and download for your network:

- 📜 `genesis.conf`
- 🗜️ `${SNAPSHOT_ID}.tar.gz`
- ⚓ `snapshot_anchor.json`

Verify all three downloads with `sha256sum` against the [snapshot tables](./jovay-ledger-snapshot.md#-latest-jovay-ledger-snapshots) before continuing:

```bash
cd "${SNAPSHOT_DOWNLOAD_DIR}"

sha256sum genesis.conf
sha256sum "${SNAPSHOT_ID}.tar.gz"
sha256sum snapshot_anchor.json
```

### 2️⃣ Initialize directories and config

```bash
mkdir -p "${SD_DEPLOY_DIR}/data" "${SD_DEPLOY_DIR}/log" "${SD_DEPLOY_DIR}/conf"

docker create --name temp_sd_seq --pull always "${IMAGE}"
docker cp temp_sd_seq:/opt/l2_deploy/conf/. "${SD_DEPLOY_DIR}/conf/"
docker rm temp_sd_seq
```

### 3️⃣ Install `genesis.conf`

```bash
cp "${SNAPSHOT_DOWNLOAD_DIR}/genesis.conf" "${SD_DEPLOY_DIR}/conf/genesis.conf"
```

All nodes on the same Jovay network must share the **same** genesis file.

### 4️⃣ Create `docker-compose.yml`

Create `${SD_DEPLOY_DIR}/docker-compose.yml`.

**Testnet** (`RELAYER_ADDRESS` for Sepolia-backed testnet):

```yaml
services:
  sd-sequencer:
    image: ${IMAGE}
    container_name: sd_sequencer
    environment:
      - ADVERTISE_NODE_IP=127.0.0.1
      - ADVERTISE_NODE_PORT=0
      - SEQUENCER_ADVERTISE_NODE_URL=http://localhost:0
      - RELAYER_ADDRESS=0xeb623ce3eb46b1d943ba56a09b17c6be9e5b3712
      - CETINA_ENABLE=false
    privileged: true
    ports:
      - "18100:18100"
      - "18200:18200"
    volumes:
      - ${SD_DEPLOY_DIR}/data:/opt/l2_deploy/light/data
      - ${SD_DEPLOY_DIR}/log:/opt/l2_deploy/light/log
      - ${SD_DEPLOY_DIR}/conf:/opt/l2_deploy/conf
    ulimits:
      nofile:
        soft: 1048576
        hard: 1048576
    restart: 'no'
    healthcheck:
      test: ["CMD-SHELL", "curl -sf -X POST http://127.0.0.1:18100 -H 'Content-Type: application/json' --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_blockNumber\",\"params\":[],\"id\":1}' | grep -q 'result'"]
      interval: 30s
      timeout: 5s
      retries: 3
```

**Mainnet** — same layout; only change `RELAYER_ADDRESS`:

```yaml
      - RELAYER_ADDRESS=0xae13ce4cd416cb4598865aa5ac8d13532bd3cd99
```

> 💡 Export both `IMAGE` and `SD_DEPLOY_DIR` in your shell before `docker compose up -d`. The commands above pin `IMAGE` to the recommended `0.15.0-rc1` tag so the deployment is reproducible.

### 5️⃣ First start — initialize databases

On the **first** start, leave State Derivation **disabled**. The node creates required DB scaffolding under `data/public/`.

```bash
cd "${SD_DEPLOY_DIR}"
docker compose up -d

ready=false
for _ in $(seq 1 120); do
  if test -f "${SD_DEPLOY_DIR}/data/.first_run_completed" \
    && curl -sf -X POST http://127.0.0.1:18100 \
      -H 'Content-Type: application/json' \
      --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
      | grep -q '"result"'; then
    ready=true
    break
  fi

  if ! docker inspect -f '{{.State.Running}}' sd_sequencer | grep -qx true; then
    break
  fi
  sleep 5
done

if test "${ready}" != true; then
  docker logs --tail 200 sd_sequencer
  echo 'Initial database bootstrap did not complete within 10 minutes.' >&2
  exit 1
fi

docker compose down
```

Do not replace this readiness check with a fixed sleep. The `.first_run_completed` marker is written only after the initial database bootstrap succeeds.

### 6️⃣ Load snapshot into `data/public`

```bash
rm -rf "${SD_DEPLOY_DIR}/data/public/"*

tar -xzf "${SNAPSHOT_DOWNLOAD_DIR}/${SNAPSHOT_ID}.tar.gz" \
  -C "${SD_DEPLOY_DIR}/data/public" \
  --strip-components=1
```

`--strip-components=1` strips the archive’s top-level folder so DB directories land directly under `data/public/`.

> 📌 Only clear `data/public/*`, not the entire `data/` tree, to keep files created during step 5️⃣.

### 7️⃣ Enable State Derivation mode

```bash
sed -i 's#"/GlobalFlag/state_derivation_mode": "false"#"/GlobalFlag/state_derivation_mode": "true"#g' \
  "${SD_DEPLOY_DIR}/conf/global.conf"
```

### 8️⃣ Configure `state_derivation.conf`

Edit `${SD_DEPLOY_DIR}/conf/state_derivation.conf`. Set your L1 RPC URLs; contract addresses are fixed per network (see [Environment Information](#-environment-information)).

**Testnet (Sepolia):**

```json
{
  "snapshot_anchor_path": "/opt/l2_deploy/conf/snapshot_anchor.json",
  "l1_rpc_url": "<YOUR_SEPOLIA_EXECUTION_RPC_URL>",
  "beacon_rpc_url": "<YOUR_SEPOLIA_BEACON_API_URL>",
  "rollup_contract_address": "0x79C0bB4EE51D7557E012f2f52db4A4ff85Ca3196",
  "l1_mailbox_contract_address": "0x95fE4eD4327fB138Cd4Bd05a574378942648bA04",
  "seconds_per_slot": 12,
  "indexer_block_tag": "finalized",
  "indexer_poll_interval_ms": 1000,
  "applier_poll_interval_ms": 1000,
  "http_timeout_sec": 600,
  "max_blob_decompressed_size_mb": 128
}
```

**Mainnet:**

```json
{
  "snapshot_anchor_path": "/opt/l2_deploy/conf/snapshot_anchor.json",
  "l1_rpc_url": "<YOUR_MAINNET_EXECUTION_RPC_URL>",
  "beacon_rpc_url": "<YOUR_MAINNET_BEACON_API_URL>",
  "rollup_contract_address": "0xe0a28b8918a62edb825055221a1df12c7c81bac1",
  "l1_mailbox_contract_address": "0x9869a90fdac287519e48aff4cce329907a995162",
  "seconds_per_slot": 12,
  "indexer_block_tag": "finalized",
  "indexer_poll_interval_ms": 1000,
  "applier_poll_interval_ms": 1000,
  "http_timeout_sec": 600,
  "max_blob_decompressed_size_mb": 128
}
```

| Field | Description |
| --- | --- |
| `snapshot_anchor_path` | Path to `snapshot_anchor.json` inside the container. The absolute path shown above matches the Compose mount. |
| `l1_rpc_url` | L1 execution JSON-RPC |
| `beacon_rpc_url` | L1 Beacon REST API |
| `rollup_contract_address` | L1 Rollup contract (see environment table) |
| `l1_mailbox_contract_address` | L1 Mailbox contract (see environment table) |
| `indexer_block_tag` | L1 block tag for indexing (`finalized` recommended) |

### 9️⃣ Place `snapshot_anchor.json`

```bash
cp "${SNAPSHOT_DOWNLOAD_DIR}/snapshot_anchor.json" \
  "${SD_DEPLOY_DIR}/conf/snapshot_anchor.json"
```

Use the file from the snapshot release as-is.

### 🔟 Start the SD Sequencer

```bash
cd "${SD_DEPLOY_DIR}"
docker compose up -d
```

## ✅ Verification

### Block height (JSON-RPC)

```bash
curl -s -X POST http://127.0.0.1:18100 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

Height should initially be near the snapshot’s L2 block and grow when newer finalized batches are available. It may remain unchanged while the SD node is waiting for the next finalized batch.

### SD logs

```bash
grep -i indexer "${SD_DEPLOY_DIR}/log/aldaba.log" | tail -20
grep -i applier "${SD_DEPLOY_DIR}/log/aldaba.log" | tail -20
grep -iE 'error|fail' "${SD_DEPLOY_DIR}/log/aldaba.log" | grep -i derivation | tail -20
```

### SD status and cursors

Query the persisted SD status from the mounted ledger:

```bash
docker exec sd_sequencer sh -lc \
  'cd /opt/l2_deploy/client/bin && /opt/l2_deploy/bin/aldaba_cli state-derivation status --json'

docker exec sd_sequencer sh -lc \
  'cd /opt/l2_deploy/client/bin && /opt/l2_deploy/bin/aldaba_cli state-derivation cursor --json'
```

Use `docker exec` against the running SD Sequencer. Do not use `docker compose run`
for these commands because it starts another container against the same ledger data.

`fatal_state` must be `false`. Over time, `indexer.last_seen_l1_block` and `verifier.next_verify_batch_index` should advance as newer finalized batches become available. Batch counts provide additional evidence when the corresponding records are present.

### Optional genesis block inspection

The following command prints the local genesis state root for troubleshooting. It is not, by itself, proof that State Derivation is progressing:

```bash
curl -s -X POST http://127.0.0.1:18100 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x0", false], "id":1}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['stateRoot'])"
```

## ❓ Troubleshooting

**Block height does not increase**

- 🔗 Check `l1_rpc_url` and `beacon_rpc_url` from inside the container
- 📜 Confirm rollup and mailbox addresses match your network
- 📄 Inspect indexer/applier lines in `aldaba.log`

**`config missing snapshot_anchor_path`**

- Add `snapshot_anchor_path` to `state_derivation.conf`, or ensure the file exists at the configured path.

**`SnapshotAnchor missing or zero l1_start_block_number`**

- Re-download `snapshot_anchor.json` from the [latest snapshot tables](./jovay-ledger-snapshot.md#-latest-jovay-ledger-snapshots) for your network.

**Genesis state root mismatch**

- Wrong `genesis.conf` or stale `data/`. Stop the container, clear `data/`, and repeat from step 5️⃣.

## 📚 Related Documentation

- 📦 [Using Jovay Ledger Snapshots](./jovay-ledger-snapshot.md)
- 🌐 [Network Information](../network-information.md)
