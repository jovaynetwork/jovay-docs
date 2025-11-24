---
outline: deep
---
# Jovay RPC Node Deployment and Management Manual

## RPC node deployment
Jovay  RPC node can be deployed using a Docker image.
Before deployment, please ensure that the machine specifications meet the required standards.
This guide provides detailed instructions for setting up the node.
Once deployed, you can use this RPC node to connect to the Jovay network, synchronize the latest Jovay blocks, query historical block states, simulate transactions, and send transactions to the Jovay network.

### Prerequisites
Before starting, ensure you meet the system requirements for L2 Sequencer nodes. Additionally, install the following dependencies:
- Docker Engine 
- Docker Compose
> **Note:**<br/>
> All root privileges. <br/>
> Ensure that your network can reach the Jovay Network. The endpoint is specified in Section 1.2.2.3.

### Deployment Steps
#### Prepare workspace
Create workspace dictionary.
```bash
export WORKSPACE=testnet-rpc

mkdir /mnt/$WORKSPACE
cd /mnt/$WORKSPACE
mkdir data log conf
```
#### Prepare configuration
##### initial configuration
The configuration is included in the released docker image, and the default settings work out of the box. For easier modification, consider extracting the configuration to the host and mounting it into the container, so you can edit the configuration directly on the host. 

```bash
cd /mnt/$WORKSPACE
docker create --name temp_container jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-rpc:L2-0.9.0-beta10
docker cp temp_container:/opt/l2_deploy/conf ./
docker rm temp_container
```
##### genesis file and spec version file
- The genesis file defines the initial state of the Jovay Network. All nodes joining the Jovay network must use an **identical genesis file** to ensure they start synchronization from the exact same point.
- The spec version file records the complete protocol changes of the Jovay network. All nodes must use **the same spec version file** and **update it synchronously** during network protocol upgrades. 

Both files are officially released and maintained by the Jovay Network team. Copy them to the conf directory using the commands below.

```yaml
cp genesis.conf /mnt/$WORKSPACE/conf/genesis.aldaba-ng.conf
cp VERSION /mnt/$WORKSPACE/conf/
```

> Obtain the latest and verified configuration files from the following official channels:<br/>
> - the Jovay testnet
>   - genesis file: [genesis.conf](http://dl-testnet.jovay.io/snapshot/genesis.conf) (MD5: 1b6ad3d9fa67a596ca094e89bd2280ee)
>   - spec version file: [VERSION](http://dl-testnet.jovay.io/snapshot/VERSION_epoch19433) (MD5: 61cc78b21a65f47820df1594cc42908b), download and rename it to VERSION
> - the Jovay mainnet
>   - genesis file: [genesis.conf](http://dl.jovay.io/snapshot/genesis.conf) (MD5: 502c910cbc21137c606621622fe67d28)
>   - spec version file: [VERSION](http://dl.jovay.io/snapshot/VERSION) (MD5: 8ad690b788e2840d2c0bceb82609f65c), download and rename it to VERSION

##### docker-compose.yml
prepare docker compose file for jovay rpc node

```yaml
services:
  rpc-node:
    image: jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-rpc:L2-0.9.0-beta10
    container_name: jovay-rpc
    stop_grace_period: 300s
    environment:
      - SEQUENCER_ADVERTISE_NODE_URL=172.19.237.112:52000
      - EXTERNAL_CLB_PRE_EXPOSERPC_URL=noise_tcp://8.154.20.10:52399?eb95b722aa63641670f1a0e31257ee70b07dd3b70ba08929773d16552bbf003e
    privileged: true
    ports:
      - "18100:18100"  # HTTP port (client_http_port)
      - "18200:18200"  # WebSocket port (client_ws_port)
      - "19000:19000"  # Node communication port
    volumes:
      - /mnt/$WORKSPACE/data:/opt/l2_deploy/light/data
      - /mnt/$WORKSPACE/log:/opt/l2_deploy/light/log
      - /mnt/$WORKSPACE/conf:/opt/l2_deploy/conf
      - /mnt/$WORKSPACE/conf/VERSION:/opt/l2_deploy/bin/VERSION
    restart: "no"
```

Environments Explanation
|Environment  | Environment	Description | Required | Example |
|---|---|---|---|
| `SEQUENCER_ADVERTISE_NODE_URL` | ALB endpoint for Sequencer service | Yes | `172.19.237.112:52000` |
| `SEQUENCER_ADVERTISE_NODE_URL` | P2P network seed node endpoint | Yes | `protocol://ip1:port1?nid1;protocol://ip2:port2?nid2` |

> The Environments if from the following official channels<br/>
> - Jovay testnet network
>   - `SEQUENCER_ADVERTISE_NODE_URL`: `alb-ism8q21lfjeen07hq3.ap-southeast-1.alb.aliyuncsslbintl.com:80`
>   - `EXTERNAL_CLB_PRE_EXPOSERPC_URL`: `noise_tcp://43.106.17.221:52399?2d655725a449ef9f5f1b048d596736c0e4aaaac3fd9b6bd3f7eef5dee8517d7d;noise_tcp://43.106.17.221:52398?c9664991ff25fd390f10d29c1e024594067f4e00ef470388e89f29bd9a403d23`
> - Jovay mainnet network
>   - `SEQUENCER_ADVERTISE_NODE_URL`, It will be provided after the service is complete.
>   - `EXTERNAL_CLB_PRE_EXPOSERPC_URL`, It will be provided after the service is complete.

#### Start the node
```bash
cd /mnt/$WORKSPACE
docker-compose up -d
```

#### Verify synchronization
After launching your node, verify whether it has started producing blocks by checking the current block height using the following command:

```bash
curl 127.0.0.1:18100/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}'
```

The node will begin synchronizing from block height `0x0`.
If you wish to accelerate synchronization and quickly catch up to the latest chain state, consider bootstrapping your node from a **trusted snapshot state** provided by the Jovay Network team. 

For detailed instructions on how to initialize your node using a snapshot, refer to the next section.

### Fast Sync via State Snapshot
Ensure you have completed the deployment described in Section 1, so that the metadata and identity keys are ready.

Follow these steps to bootstrap from latest snapshot:

#### ✅ Download snapshot dataset
> ⚠️ WARNING: Only use snapshots from offical channels. Verify checksums before deployment.

```yaml
# Jovay testnet network as follows
# File: 20251120_37631390.tar.gz (≈120GB)
# MD5: bbf2f0660ad2fb0e53d70043f4f84d24
# Block Height: 37631390
wget -c http://dl-testnet.jovay.io/snapshot/20251120_37631390.tar.gz

# Jovay mainnet network as follows
# File: 20251121_3011478.tar.gz (≈3.7GB)
# MD5: aeaa6e262f85d87bb9bdc36d4e1e2841
# Block Height: 3011478 
wget -c http://dl.jovay.io/snapshot/20251121_3011478.tar.gz
```

- Note: Check for the latest version matching your network.
- The naming format of the snapshot is `Date_BlockHeight.tar.gz`.

#### 🧯 Stop container
```bash
cd /mnt/$WORKSPACE
docker-compose down
```

#### 🧹 Replace local data with snapshot
```bash
# Remove existing unsynced data
rm -rf /mnt/$WORKSPACE/data/public
rm -rf /mnt/$WORKSPACE/data/history_kvdbs

# decompress snapshot to data dir
tar -zxvf <snapshot_file_name>.tar.gz -C /mnt/$WORKSPACE/data/
```

#### 🚀 Restart node
```bash
cd /mnt/$WORKSPACE
docker-compose up -d
```

#### Verification: 
- Once the snapshot data is loaded, the following entry appears in /mnt/$WORKSPACE/log/aldaba.log: `HandleConsensusedResultAfterInit] stable block: 37631390` (37631390 is snapshot file's block height)
- The log entry `CheckSyncStatus] start sync` in /mnt/$WORKSPACE/log/aldaba.log indicates that block synchronization has start.

## RPC node mangement
### Update configuration
1. Modify configuration files in host directory:
    ```bash
    cd /mnt/$WORKSPACE/conf
    # Edit global.conf, controller.conf, etc. as needed
    ```
2. Restart node:
   ```bash
   docker compose -f /mnt/$WORKSPACE/docker-compose.yml restart
   ```

### Check node liveness
You can verify node liveness by querying the block height through the eth_blockNumber API. If the node fails to return the current block height, or the block height does not increase over a period of time, this indicates a liveness problem with the node.

### Checking syncing status
Syncing status can be checked by eth_syncing json rpc method. 

Request payloda: 
```yaml
curl 127.0.0.1:18100/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}'
```

### View logs
```bash
tail -f /mnt/$WORKSPACE/log/aldaba.log
tail -f /mnt/$WORKSPACE/log/profile.log 
```

### Stop node
```bash:bas.sh
docker-compose down
```