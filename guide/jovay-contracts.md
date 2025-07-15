---
outline: deep
---

# Jovay EVM Compatibility
This document outlines the key similarities and differences between the Jovay EVM on the testnet and the Ethereum EVM, specifically in comparison to the Prague version. Understanding these distinctions is crucial for developers building and deploying smart contracts on the Jovay network.

## Key Differences with Ethereum EVM (Prague Version)
Though Jovay prioritizes a high degree of compatibility with the Ethereum EVM, its current testnet implementation diverges in several key aspects, notably due to differences in current design choices. These distinctions are largely transparent to most DApp developers, but awareness is crucial when leveraging specific features impacted by these underlying differences.

### Opcode Differences

| Opcode  | Solidity syntax   | Behavior on Jovay   |
|--       |--                 |--                   |
|COINBASE |block.coinbase     | Returns `0`. The behavior of this opcode is expected to change in future updates.  |
|PREVRANDAO |block.prevrandao     | Returns `0`.Currently, Jovay does not support providing pseudo-random numbers via `prevrandao`  |
|BASEFEE |block.basefee     | The base fee is configured by a system contract. In Ethereum, the base fee is dynamically and automatically set based on block size changes.  |
|BLOBBASEFEE |block.blobbasefee     | Returns `0`. EIP-4844 is not currently supported.  |
|BLOBHASH |block.blobhash(blobIndex)    | Returns `0`. EIP-4844 is not currently supported.  |
| BLOCKHASH |  blockhash(block.number)  | Returns the keccak256 hash of a block number, where the input to the hash is the block number in decimal string format. |

### Precompiled Contract Differences
The following precompiled contract address has a different implementation on the Jovay testnet.

<table style="width: 100%; display: table !important;">
    <thead>
        <tr>
            <th>Address</th>
            <th>Description</th>
            <th>Behavior on Jovay</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0x0a</td>
            <td>point evaluation</td>
            <td>Not supported at this time.</td>
        </tr>
    </tbody>
    </table>

## Supported Opcodes in Jovay EVM
The following is a comprehensive list of the opcodes supported by the Jovay EVM on the testnet.

| Opcode | Name | Notes | Difference from Ethereum |
| --- | --- | --- | --- |
| 0x00 | STOP | halt execution |  |
| 0x01 | ADD | (u)int256 addition modulo 2**256 |  |
| 0x02 | MUL | (u)int256 multiplication modulo 2**256 |  |
| 0x03 | SUB | (u)int256 addition modulo 2**256 |  |
| 0x04 | DIV | uint256 division |  |
| 0x05 | SDIV | int256 division |  |
| 0x06 | MOD | uint256 modulus |  |
| 0x07 | SMOD | int256 modulus |  |
| 0x08 | ADDMOD | (u)int256 addition modulo N |  |
| 0x09 | MULMOD | (u)int256 multiplication modulo N |  |
| 0x0A | EXP | uint256 exponentiation modulo 2**256 |  |
| 0x0B | SIGNEXTEND | sign extend`x` from `(b+1)` bytes to 32 bytes |  |
| 0x0C-0x0F | invalid |  |  |
| 0x10 | LT | uint256 less-than |  |
| 0x11 | GT | uint256 greater-than |  |
| 0x12 | SLT | int256 less-than |  |
| 0x13 | SGT | int256 greater-than |  |
| 0x14 | EQ | (u)int256 equality |  |
| 0x15 | ISZERO | (u)int256 iszero |  |
| 0x16 | AND | bitwise AND |  |
| 0x17 | OR | bitwise OR |  |
| 0x18 | XOR | bitwise XOR |  |
| 0x19 | NOT | bitwise NOT |  |
| 0x1A | BYTE | `i`th byte of (u)int256 `x`, from the left |  |
| 0x1B | SHL | shift left |  |
| 0x1C | SHR | logical shift right |  |
| 0x1D | SAR | arithmetic shift right |  |
| 0x1E-1F | invalid |  |  |
| 0x20 | KECCAK256 | keccak256 |  |
| 0x21-0x2F | invalid |  |  |
| 0x30 | ADDRESS | address of executing contract |  |
| 0x31 | BALANCE | balance, in wei |  |
| 0x32 | ORIGIN | address that originated the tx |  |
| 0x33 | CALLER | address of msg sender |  |
| 0x34 | CALLVALUE | msg value, in wei |  |
| 0x35 | CALLDATALOAD | read word from msg data at index `idx` |  |
| 0x36 | CALLDATASIZE | length of msg data, in bytes |  |
| 0x37 | CALLDATACOPY | copy msg data |  |
| 0x38 | CODESIZE | length of executing contract's code, in bytes |  |
| 0x39 | CODECOPY | mem[dstOst:dstOst+len-1] := this.code[ost:ost+len-1] |  |
| 0x3A | GASPRICE | gas price of tx, in wei per unit gas  |  |
| 0x3B | EXTCODESIZE | size of code at addr, in bytes |  |
| 0x3C | EXTCODECOPY | copy code from `addr` |  |
| 0x3D | RETURNDATASIZE | size of returned data from last external call, in bytes |  |
| 0x3E | RETURNDATACOPY | copy returned data from last external call |  |
| 0x3F | EXTCODEHASH | hash = addr.exists ? keccak256(addr.code) : 0 |  |
| 0x40 | BLOCKHASH |  | Returns the keccak256 hash of a block number, where the input to the hash is the block number in decimal string format. |
| 0x41 | COINBASE | address of proposer of current block | Returns `0`. This behavior will change in the future. |
| 0x42 | TIMESTAMP | timestamp of current block |  |
| 0x43 | NUMBER | number of current block |  |
| 0x44 | PREVRANDAO | randomness beacon | Returns `0`.Currently, Jovay does not support providing pseudo-random numbers via `prevrandao` |
| 0x45 | GASLIMIT | gas limit of current block |  |
| 0x46 | CHAINID | push current chain id onto stack | Jovay's chain ID is different from the Ethereum mainnet. |
| 0x47 | SELFBALANCE | balance of executing contract, in wei |  |
| 0x48 | BASEFEE | base fee of current block | The base fee is configured by a system contract. In Ethereum, the base fee is dynamically and automatically set based on block size changes. |
| 0x49 | BLOBHASH | [https://eips.ethereum.org/EIPS/eip-4844](https://eips.ethereum.org/EIPS/eip-4844) | Returns `0`. EIP-4844 is not currently supported. |
| 0x4A | BLOBBASEFEE | [https://eips.ethereum.org/EIPS/eip-7516](https://eips.ethereum.org/EIPS/eip-7516) | Returns `0`. EIP-4844 is not currently supported. |
| 0x4B-0x4F | invalid |  |  |
| 0x50 | POP | remove item from top of stack and discard it |  |
| 0x51 | MLOAD | read word from memory at offset `ost` |  |
| 0x52 | MSTORE | write a word to memory |  |
| 0x53 | MSTORE8 | write a single byte to memory |  |
| 0x54 | SLOAD | read word from storage |  |
| 0x55 | SSTORE | write word to storage |  |
| 0x56 | JUMP | `$pc := dst` mark that `pc` is only assigned if `dst` is a valid jumpdest |  |
| 0x57 | JUMPI | `$pc := condition ? dst : $pc + 1` |  |
| 0x58 | PC | program counter |  |
| 0x59 | MSIZE | size of memory in current execution context, in bytes |  |
| 0x5A | GAS |  |  |
| 0x5B | JUMPDEST | a valid jump destination for example a jump destination not inside the push data |  |
| 0x5C | TLOAD | read word from transient storage  |  |
| 0x5D | TSTORE | write word to transient storage  |  |
| 0x5E | MCOPY | copy memory from one area to another |  |
| 0x5F | PUSH0 | push the constant value 0 onto stack |  |
| 0x60-0x7F | PUSH1-PUSH32 | push a 1 to 32-byte value onto the stack. |  |
| 0x80-0x8F | DUP1-DUP16 | clone the 1st to 16th value on the stack. |  |
| 0x90-0x9F | SWAP1-SWAP16 | wwap the 1st to 16th value with the top of the stack. |  |
| 0xA0 | LOG0 | LOG0(memory[ost:ost+len-1]) |  |
| 0xA1 | LOG1 | LOG1(memory[ost:ost+len-1], topic0) |  |
| 0xA2 | LOG2 | LOG2(memory[ost:ost+len-1], topic0, topic1) |  |
| 0xA3 | LOG3 | LOG3(memory[ost:ost+len-1], topic0, topic1, topic2) |  |
| 0xA4 | LOG4 | LOG4(memory[ost:ost+len-1], topic0, topic1, topic2, topic3) |  |
| 0xA5-0xEF | invalid |  |  |
| 0xF0 | CREATE | addr = keccak256(rlp([address(this), this.nonce])) |  |
| 0xF1 | CALL |  |  |
| 0xF2 | CALLCODE | same as DELEGATECALL, but does not propagate original msg.sender and msg.value |  |
| 0xF3 | RETURN | return mem[ost:ost+len-1] |  |
| 0xF4 | DELEGATECALL |  |  |
| 0xF5 | CREATE2 | addr = keccak256(0xff ++ address(this) ++ salt ++ keccak256(mem[ost:ost+len-1]))[12:] |  |
| 0xF6-0xF9 | invalid |  |  |
| 0xFA | STATICCALL |  |  |
| 0xFB-0xFC | invalid |  |  |
| 0xFD | REVERT | revert(mem[ost:ost+len-1]) |  |
| 0xFE | INVALID |  |  |
| 0xFF | SELFDESTRUCT |  |  |

> Note: Opcodes listed as `invalid` in the provided material are intentionally omitted from this list.

## Supported Precompiled Contracts in Jovay EVM
The Jovay EVM supports the following precompiled contracts.

<table style="width: 100%; display: table !important;">
    <thead>
        <tr>
            <th>address</th>
            <th>name</th>
            <th>Difference from Ethereum</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0x01</td>
            <td>0x01</td>
            <td></td>
        </tr>
        <tr>
            <td>0x02</td>
            <td>sha2-256</td>
            <td></td>
        </tr>
        <tr>
            <td>0x03</td>
            <td>ripemd160</td>
            <td></td>
        </tr>
        <tr>
            <td>0x04</td>
            <td>identity</td>
            <td></td>
        </tr>
        <tr>
            <td>0x05</td>
            <td>modexp</td>
            <td></td>
        </tr>
        <tr>
            <td>0x06</td>
            <td>ecAdd</td>
            <td></td>
        </tr>
        <tr>
            <td>0x07</td>
            <td>ecMul</td>
            <td></td>
        </tr>
        <tr>
            <td>0x08</td>
            <td>ecPairing</td>
            <td></td>
        </tr>
        <tr>
            <td>0x09</td>
            <td>blake2f</td>
            <td></td>
        </tr>
        <tr>
            <td>0x0a</td>
            <td>point evaulation</td>
            <td>Not supported at this time.</td>
        </tr>
    </tbody>
    </table>