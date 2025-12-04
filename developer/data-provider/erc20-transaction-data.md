# ERC20 Transaction Data Download

Jovay Network provides historical ERC20 transaction data in Apache Parquet format for developers and analysts who need to access on-chain token transfer records.

## Data Overview

The ERC20 transaction data includes all token transfer events (ERC20 `Transfer` events) that occurred on the Jovay Network. This data is useful for:

- Building analytics dashboards
- Tracking token movements
- Auditing transaction history
- Creating custom reports

## Download URL Format

The data is hosted on OSS and organized by date. The base URL is:

```
https://datasets.jovay.io/rwa/erc20/asset_operation/
```

### Directory Structure

```
/rwa/erc20/asset_operation/
├── date=2025-12-03/asset_operation_full.parquet      # First full snapshot
├── date=2025-12-04/asset_operation_increment.parquet
├── date=2025-12-05/asset_operation_increment.parquet
└── ...
```

### File Types

| File Type | Description |
|-----------|-------------|
| `asset_operation_full.parquet` | Contains the complete historical data up to that date |
| `asset_operation_increment.parquet` | Contains only the new transactions for that specific date |

### Example Download URLs

**Full data snapshot:**
```
http://datasets.jovay.io/rwa/erc20/asset_operation/date=2025-12-03/asset_operation_full.parquet
```

**Incremental data:**
```
http://datasets.jovay.io/rwa/erc20/asset_operation/date=2025-12-08/asset_operation_increment.parquet
```

## Data Schema

The parquet files contain the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | int64 | Auto-incremented identifier (can be ignored for most use cases) |
| `transaction_index` | int64 | Position of the transaction within the block |
| `transaction_hash` | string | The hash of the transaction containing this transfer |
| `evt_index` | int64 | Index of the event within the transaction |
| `block_number` | int64 | The block number where the transfer occurred |
| `block_hash` | string | The hash of the block |
| `from_address` | string | The sender address (0x format) |
| `to_address` | string | The recipient address (0x format) |
| `token_address` | string | The ERC20 token contract address (0x format) |
| `timestamp` | datetime64[ms] | The timestamp when the block was mined |
| `trace_address` | int64[] | The call-path to the EVM frame that emitted the log. Each element is the ordinal of the child call within its parent. `[]` = top-level tx call; `[0]` = first internal call; `[0,2]` = third child of the first child, etc. |
| `amount` | string | Human-readable token amount (with decimals applied) |
| `raw_amount` | string | Raw token amount (without decimals) |
| `date` | datetime64[ns] | The date of the transaction |

## Reading the Data

### Prerequisites

Install the required Python packages:

```bash
pip install pandas fastparquet
```

Or using `requirements.txt`:

```
pandas
fastparquet
```

### Python Example

```python
import pandas as pd

pd.set_option('display.max_columns', None)  # Show all columns
pd.set_option('display.max_colwidth', None)  # Do not truncate column content
pd.set_option('display.width', None)  # Automatically detect terminal width

# Read parquet file (local)
df = pd.read_parquet('./asset_operation_full.parquet')

# Or read directly from URL
df = pd.read_parquet(
    'http://datasets.jovay.io/rwa/erc20/asset_operation/date=2025-12-03/asset_operation_full.parquet'
)

# View row count and shape
print(f"Row count: {len(df)}")
print(f"Shape: {df.shape}")

# View detailed column info
print(df.info())

# View first few rows
print(df.head())

# View statistics
print(df.describe())
```

### Sample Output

```
Data columns (total 14 columns):
 #   Column             Non-Null Count  Dtype         
---  ------             --------------  -----         
 0   id                 6477 non-null   object        
 1   transaction_index  6477 non-null   int64         
 2   transaction_hash   6477 non-null   object        
 3   evt_index          6477 non-null   int64         
 4   block_number       6477 non-null   int64         
 5   block_hash         6477 non-null   object        
 6   from_address       6477 non-null   object        
 7   to_address         6477 non-null   object        
 8   token_address      6477 non-null   object        
 9   timestamp          6477 non-null   datetime64[ms]
 10  trace_address      0 non-null      object        
 11  amount             6477 non-null   object        
 12  raw_amount         6477 non-null   object        
 13  date               6477 non-null   datetime64[ns]
```

**Sample data preview:**

| id | transaction_hash | from_address | to_address | amount | date |
|----|-----------------|--------------|------------|--------|------|
| 0 | 0x61c4fe... | 0x0000... | 0xabcd... | 100000000000.0 | 2025-09-23 |
| 1 | 0xdf5012... | 0x1234... | 0x5678... | 1000.0 | 2025-09-23 |

## Query Examples

### Filter by Token Address

```python
# Filter transfers for a specific token
token_address = "0x13dd03e35e4bc8ba6172faee5d1e848b7e507f61"
token_transfers = df[df['token_address'] == token_address]
print(f"Transfers for token: {len(token_transfers)}")
```

### Filter by Address

```python
# Find all transfers from or to a specific address
address = "0xfde35125051c0f07448005dc85667d0459cc848b"
address_transfers = df[
    (df['from_address'] == address) | (df['to_address'] == address)
]
print(f"Transfers involving address: {len(address_transfers)}")
```

### Filter by Date Range

```python
# Filter by date range
df['date'] = pd.to_datetime(df['date'])
start_date = pd.to_datetime('2025-11-01')
end_date = pd.to_datetime('2025-11-30')
date_filtered = df[
    (df['date'] >= start_date) & (df['date'] <= end_date)
]
print(f"Transfers in November 2025: {len(date_filtered)}")
```

### Aggregate by Token

```python
# Count transfers per token
transfers_per_token = df.groupby('token_address').size().sort_values(ascending=False)
print(transfers_per_token)
```

## Best Practices

1. **Use incremental files for updates**: If you already have historical data, download only the incremental files for new dates to save bandwidth.

2. **Store locally**: For repeated analysis, download the parquet files locally instead of reading from URL each time.

3. **Handle large datasets**: For very large datasets, consider using Dask or PyArrow for better memory management:

```python
import pyarrow.parquet as pq

# Read specific columns only
table = pq.read_table('asset_operation_full.parquet', columns=['from_address', 'to_address', 'amount'])
df = table.to_pandas()
```

## Data Update Schedule

- **Full snapshots**: Generated once (check for the first `asset_operation_full.parquet`)
- **Incremental files**: Generated daily with the day's transactions

## Support

If you have questions about the data or encounter issues, please reach out through our official channels:

- Twitter: [@JovayNetwork](https://x.com/JovayNetworkk)
