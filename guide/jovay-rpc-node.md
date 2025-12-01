---
outline: deep
---
# Jovay RPC Node Deployment and Management Manual

## Version Release History

| Release Date | Product Version | Build Version    | Docker Image                                                                           | Description                         |
|--------------|-----------------|------------------|----------------------------------------------------------------------------------------|-------------------------------------|
| 2025.12.01   | 0.9.0           | 0.9.0-rc2        | jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-rpc:L2-0.9.0-rc2           | Fix batchrpc, debug_traceTransaction|
| 2025.11.21   | 0.9.0           | 0.9.0-rc1        | jovay-release-registry.cn-hongkong.cr.aliyuncs.com/jovay/l2-rpc:L2-0.9.0-rc1           | First release for external RPC node |

## RPC node deployment
Jovay  RPC node can be deployed using a Docker image.
Before deployment, please ensure that the machine specifications meet the required standards.

This guide provides detailed instructions for setting up the node.
Once deployed, you can use this RPC node to connect to the Jovay network, synchronize the latest Jovay blocks, query historical block states, simulate transactions, and send transactions to the Jovay network.

### Prerequisites

#### Recommended hardware specifications

| Component            | Specification                                                                         |
|----------------------|---------------------------------------------------------------------------------------|
| CPU                  | 16 cores, 2.7GHz or faster                                                            |
| Memory               | 128G                                                                                  |
| Storage              | 1TB(for mainnet)/2TB(for testnet) SSD with at least 350MiB/s bandwidth and 10000 IOPS |
| Storage Growth Rate  | 50GB/month                                                                            |
| Network Bandwidth    | 500 Mbps                                                                              |
| Open Files Limit     | ulimit -n (≥ 655350)                                                                  |

#### System requirements
- Docker Engine (>= 27.3.1)
- Docker Compose (>= 2.29.7)

#### privilege requirement
- Run the Docker container with the root user.
- Enable privileged mode for the Docker container (optional, but convenient for attaching with gdb inside the container at runtime).

#### network accessibility
Ensure that your network can reach the Jovay Network. The endpoint is specified in Section 2.2.2.3.

**Jovay testnet**
- HTTP: alb-ism8q21lfjeen07hq3.ap-southeast-1.alb.aliyuncsslbintl.com
- P2P: 43.106.17.221:52399, 3.106.17.221:52398

**Jovay mainnet**
- HTTP: alb-cnjrn9zqms3o5flehu.cn-hongkong.alb.aliyuncsslbintl.com
- P2P: 47.83.131.74:52398, 47.83.131.74:52399

### Deployment Steps
#### Prepare workspace
Create workspace dictionary.
```bash
export Release=${Build_Version}
export WORKSPACE=${deploy_jovay_rpc_path}

mkdir /mnt/$WORKSPACE
cd /mnt/$WORKSPACE
```
> Refer to Section 1 to get the ${Build_Version}.

#### Prepare configuration
##### initial configuration
The configuration is included in the released docker image, and the default settings work out of the box. For easier modification, consider extracting the configuration to the host and mounting it into the container, so you can edit the configuration directly on the host. 

```bash
cd /mnt/$WORKSPACE
docker create --name temp_container ${Docker_Image}
docker cp temp_container:/opt/l2_deploy/conf ./
docker rm temp_container
```
> Refer to Section 1 to get the ${Docker_Image}.

##### genesis file and spec version file
- The genesis file defines the initial state of the Jovay Network. All nodes joining the Jovay network must use an **identical genesis file** to ensure they start synchronization from the exact same point.
- The spec version file records the complete protocol changes of the Jovay network. All nodes must use **the same spec version file** and **update it synchronously** during network protocol upgrades. 

Both files are officially released and maintained by the Jovay Network team. Copy them to the conf directory using the commands below.

**Jovay testnet**
```yaml
# get the genesis file
url_genesis="http://dl-testnet.jovay.io/snapshot/genesis.conf"
md5_genesis="1b6ad3d9fa67a596ca094e89bd2280ee"
dst_genesis="/mnt/$WORKSPACE/conf/genesis.aldaba-ng.conf"
wget $url_genesis -O genesis.conf
# check md5 then put the genesis file to conf dir
echo "$md5_genesis genesis.conf" | md5sum -c - && mv genesis.conf $dst_genesis

# get the version file
url_version="http://dl-testnet.jovay.io/snapshot/VERSION_epoch19433"
md5_version="61cc78b21a65f47820df1594cc42908b"
dst_version="/mnt/$WORKSPACE/conf/VERSION"
wget $url_version -O VERSION
# check md5 then put the version file to conf dir
echo "$md5_version VERSION" | md5sum -c - && mv VERSION $dst_version
```

**Jovay mainnet**
```yaml
# get the genesis file
url_genesis="http://dl.jovay.io/snapshot/genesis.conf"
md5_genesis="502c910cbc21137c606621622fe67d28"
dst_genesis="/mnt/$WORKSPACE/conf/genesis.aldaba-ng.conf"
wget $url_genesis -O genesis.conf
# check md5 then put the genesis file to conf dir
echo "$md5_genesis genesis.conf" | md5sum -c - && mv genesis.conf $dst_genesis

# get the version file
url_version="http://dl.jovay.io/snapshot/VERSION_epoch9375"
md5_version="b08719b4b2511efc5c4c3706de41c096"
dst_version="/mnt/$WORKSPACE/conf/VERSION"
wget $url_version -O VERSION
# check md5 then put the version file to conf dir
echo "$md5_version VERSION" | md5sum -c - && mv VERSION $dst_version
```

##### docker-compose.yml
prepare docker compose file for jovay rpc node.

**docker-compose.yml for Jovay testnet rpc node**
```yaml
services:
  rpc-node:
    image: ${Docker_Image}
    container_name: jovay-rpc
    stop_grace_period: 300s
    environment:
      - SEQUENCER_ADVERTISE_NODE_URL=alb-ism8q21lfjeen07hq3.ap-southeast-1.alb.aliyuncsslbintl.com:80
      - EXTERNAL_CLB_PRE_EXPOSERPC_URL=noise_tcp://43.106.17.221:52399?2d655725a449ef9f5f1b048d596736c0e4aaaac3fd9b6bd3f7eef5dee8517d7d;noise_tcp://43.106.17.221:52398?c9664991ff25fd390f10d29c1e024594067f4e00ef470388e89f29bd9a403d23
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

**docker-compose.yml for Jovay mainnet rpc node**
```yaml
services:
  rpc-node:
    image: ${Docker_Image}
    container_name: jovay-rpc
    stop_grace_period: 300s
    environment:
      - SEQUENCER_ADVERTISE_NODE_URL=alb-cnjrn9zqms3o5flehu.cn-hongkong.alb.aliyuncsslbintl.com:80
      - EXTERNAL_CLB_PRE_EXPOSERPC_URL=noise_tcp://47.83.131.74:52398?842016e6eb94da561b1b4c856e08bf71cd70c05ea847e934b8be1d5a74a979f8;noise_tcp://47.83.131.74:52399?ce08efde90a7970d18dd6763fdc68d19a24084fd7c8cf67a68a19e943b30c5e3
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
> Refer to Section 1 to get the ${Docker_Image}.
> "privileged: true" is not compulsory, which is convenient for attaching with gdb inside the container at runtime.

#### Start the node
```bash
cd /mnt/$WORKSPACE
docker-compose up -d
```
After starting the container, watch the container’s standard output:
```bash
docker logs -f jovay-rpc
```
Once you see `App Initialize succeed`, the rpc node has started successfully. 

After that, you can monitor block production and transaction activity via `log/profile.log`.

#### Verify synchronization
After launching your node, using the following command to checking the current block height.

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
The startup time when using a snapshot can be relatively long, depending on the number of historical blocks and the size of the state data.
> On Jovay testnet, the current snapshot takes about 30 minutes to start. On Jovay mainnet, it will be much faster.

When you see the following two log entries in log/aldaba.log, it indicates that the snapshot has finished loading and the node will start syncing blocks:

```bash
HandleConsensusedResultAfterInit] stable block
CheckSyncStatus] start sync
```

## RPC node mangement
### Stop node
```bash
cd /mnt/$WORKSPACE
docker-compose down
```

### Start node
```bash
cd /mnt/$WORKSPACE
docker-compose up -d
```

### Update configuration
1. Modify configuration files in host directory:
    ```bash
    cd /mnt/$WORKSPACE
    # Edit conf/global.conf as needed
    ```
2. Restart node:
   ```bash
   docker compose -f /mnt/$WORKSPACE/docker-compose.yml restart
   ```

### Check node liveness
You can verify node liveness by querying the block height through the eth_blockNumber API. If the node fails to return the current block height, or the block height does not increase over a period of time, this indicates a liveness problem with the node. 

#### Query block height
Syncing status can be checked by eth_syncing json rpc method. 

Request payloda: 
```yaml
curl 127.0.0.1:18100/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}'
```

#### View logs
You can primarily monitor the node status through the following two log files:
- `log/profile.log`: Profiling information of blocks and transactions.
- `log/aldaba.log`: Default log file containing runtime information from all modules.

## RPC node upgration
In most cases, upgrading a Jovay RPC node only requires updating the container image tag in `docker-compose.yml` and restarting the container.

If future releases introduce configuration changes or require additional steps, we will provide detailed upgrade instructions accordingly.

## RPC node monitoring
We use the Prometheus and Grafana to monitor Jovay RPC Node metrics. but the full deployment and integration process has not yet been fully verified and will be documented later.
