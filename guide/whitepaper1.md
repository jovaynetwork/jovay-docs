---
outline: deep
---
# Jovay Layer2 Whitepaper
## Abstract
Since the rise of Web3, numerous talents and innovations have emerged, yet the industry still faces critical bottlenecks. To unlock its full potential and enable large scale adoption, future Web3 innovation will center on bridging the physical and digital worlds, particularly through the crypto economy represented by Real World Assets(RWA). We believe this convergence between the physical and digital, Web2 and Web3, TradFi and DeFi, will drive significant value growth in the global crypto economy. This is the founding vision behind Jovay. Jovay is a technologically advanced Layer2 that delivers superior performance in throughput and latency while addressing critical security challenges. It remains fully compatible with Ethereum ecosystem. Its core architecture combines a heterogeneous dual proof mechanism with fully pipelined parallel execution, delivering 100,000+ TPS, 100 ms confirmation latency with Layer1 level security, resolving key issues such as congestion, high gas fees, and poor user experience. With real-time smart contract compilation and the VEPT trusted computing paradigm, jovay supports advanced use cases such as on-chain AI model execution, expanding blockchain's application boundaries. Developers benefit from an AI powered full stack toolchain to build high throughput DApps efficiently, while users enjoy near centralized responsiveness. Jovay's vision is to become the trusted infrastructure for the global RWA token economy in the AI era, bridging value and consensus between Web2 and Web3.
## 1.Why do we need Jovay? 
**The Importance of RWA for Web2:** Throughout financial history, the ultimate goal has been the optimal allocation of capital and assets. This requires standardized platforms and processes for asset issuance and trading, improved credit mechanisms, and reduced issuance and transaction costs. Tokenization is currently the most effective means to achieve this. RWA token economies can accelerate asset data standardization, tokenization of ownership, enhance liquidity and global accessibility, and ultimately inject new vitality into global economic growth.

**The Importance of RWA for Web3:** A core bottleneck in today's Web3 ecosystem is its highly financialized and insular nature, lacking real world value anchoring. This closed loop system poses a risk of engaging in financial circular flow lacking real substance and precludes broader participation. A sustainable RWA ecosystem can inject reliable, external value into Web3, integrate with advanced decentralized technologies, and attract broader user and capital engagement, thereby fostering healthier, long term development.

**The Role of AI in the Future of RWA:** AI will be instrumental in reshaping RWA from asset creation to value consensus and market formation. AI powered services may generate new asset classes that produce sustainable value and cash flows, demanding new financial infrastructure. To build consensus around asset value, data must be complete, verifiable, and timely. Traditional assets already pose challenges due to their fragmentation; AI generated assets will amplify these complexities. Solving them requires more advanced AI tools. Furthermore, AI enhanced information collection, trading decisions, and automated execution when combined with on-chain RWAs and programmable logic will significantly improve transactional efficiency and market security. These applications raise higher demands for AI's trustworthiness, reliability, and verifiability.

**Why Jovay Matters for the RWA Economy:** The next stage of the RWA token economy demands an upgraded financial infrastructure. As part of Ant Digital Technologies' “Dual Chains and One Bridge” RWA solution, Jovay serves as the transaction chain, offering Ethereum compatible Layer2 scalability with high throughput, low latency, and rapid confirmation. It integrates several key innovations: fully pipelined parallel execution, lazy just-in-time smart contract compilation, random aggregation–based SumCheck ZK proofs, heterogeneous hardware acceleration, and the VEPT verifiable computing paradigm. Combined with a three-stage confirmation mechanism, these technologies deliver a balanced Layer2 system with both low latency and high throughput.

Built on VEPT, Jovay also offers AI friendly compute extensions that push the boundaries of Layer1 application capabilities. It supports full stack AI assisted contract development, including tools for debugging, performance tuning, and security auditing. As a bridge between Web2 and Web3, Jovay is committed to open collaboration integrating seamlessly with Layer1 and Layer2 chains, compliant exchanges, DeFi protocols, and on-chain compliance standards (KYC/AML). It enables multi party coconstruction and shared success, providing a robust foundation for the sustainable evolution of RWA+AI.

| Anchor Trust in Data and AI | Embrace Developer Experience  |  Bridge Assets, Interchain Liquidity    |  Tokenize Assets, Converge Value    |
|------|------|------|------|
| <ul><li>Authenticated Data Acquisition</li><li>Cryptographic Data Processing</li></ul><ul><li>Employ Trustworthy and verifiable AI to ensure security.</li><li>Leverage the secure and trustworthy capabilities of Layer1, coupled with high performance and cost efficiency.</li></ul> | <ul><li>For Web2 Developers, We support mainstream WASM Programming Languages</li><li>For Web3 Developers, We offer compatibility with Solidity and Seamless EVM Ecosystem Integration</li></ul> |<ul><li>Achieve Ultra High Performance and Security with Enhanced Rollups</li><li>Ensure Seamless Heterogeneous Chain Interoperability</li></ul>|<ul><li>Real Asset Tokenization - Renewable Energy Assets, Financial Assets, Digital-native Assets</li><li>Real Money Infrastructure - Stablecoins, Tokenised Deposit</li></ul><ul><li>Real Efficiency Convergence - TradFi-DeFi Interoperability, Smart Contract Automation</li></ul>

In this white paper, we discuss Jovay's core design concept,  key technical architecture and a new application development paradigm.

## 2.Design Principles
Considering Jovay's core positioning and current technological trends, the following principles guided our Layer2 system design:

1. **Heterogeneous Proof Systems for Security Resilience:** To avoid systemic vulnerabilities inherent in single-prover systems, Jovay employs a dual-prover architecture combining ZK and TEE, enabling cross verification of execution results. This design addresses both latency sensitivity in RWA scenarios and foundational security requirements. The approach is conceptually aligned with the tri-prover scheme proposed by Buterin[1], which emphasizes confirmation based on agreement across at least two proof types.
2. **End-to-End Scalability in Throughput:** Scalability is addressed holistically, covering transaction processing, proof generation, and intermediate data preparation (e.g., Trace data). For RWA use cases characterized by high variability in traffic, the system is designed to maintain stable throughput under dynamic load conditions.
3. **Real-Time Responsiveness for Web2 Integration:** As an intermediary between traditional financial systems and Web3 infrastructure, Jovay must meet real-time performance standards comparable to those of conventional finance, ensuring seamless interoperability in time-sensitive RWA applications.
4. **Compatibility with the AI Ecosystem:** With the emergence of LLMs and intelligent services, the system is designed to support verifiable computation and interoperability with AI ecosystems, enabling applications such as AI assisted development, trading, and analytics. This capability is critical to expanding Web3's interface with intelligent automation.

## 3.Technical Overview
Jovay is a next generation Layer 2 network tailored for the future Web3 ecosystem. Built with native compatibility with the Ethereum ecosystem, Jovay addresses blockchain performance bottlenecks and relaxes the constraints of the “blockchain trilemma.” Through a heterogeneous dual-prover architecture and comprehensive technological innovations, Jovay delivers high throughput, low latency, and rapid finality, reshaping the scalability frontier of Layer 2.

While maintaining Ethereum interoperability, Jovay introduces original innovations that significantly enhance computing, storage, and proof efficiency, offering an infrastructure that balances security, scalability, and usability for both developers and end users.

### 3.1.Core Architecture and Performance Breakthrough
During transaction execution phase, Jovay achieves full process parallelization of computation and I/O through a combination of key technologies, including fully pipelined parallel execution, lazy just-in-time compilation for smart contracts, a parallel transaction execution engine, and batched data access. This architecture decomposes transaction processing into multiple independent execution units, and maximizes the utilization of hardware resources through a dynamic load balancing mechanism. As a result, Jovay delivers single chain performance of over 100,000 transactions per second (TPS) with sub-100 millisecond confirmation latency. 

Simultaneously, Jovay adopts a heterogeneous dual-prover architecture, integrating a random aggregation based SumCheck zero knowledge proof algorithm and heterogeneous hardware acceleration techniques. These innovations significantly improves the efficiency of proof generation and verification, substantially reducing both the cost of producing proofs and the cost of on-chain verification for Layer 2 systems.

### 3.2.Three-Stage Confirmation Mechanism

<p align="center">
  <img src="./Images/Whitepaper/Three-Stage%20Comfirmation%20Merchanism.png">
  <br>
  <span style="font-size: 14px;">Figure1：Three-Stage Comfirmation Merchanism</span>
</p>

To balance throughput and latency, Jovay introduces a three-stage confirmation mechanism, as illustrated in Figure 1:

1. **Real-Time Execution and Receipt Return:** This stage covers block generation, transaction execution, state commitment, and returning receipt to client. Leveraging fully pipelined execution, lazy just-in-time smart contract compilation, parallel execution engines, and batched data access, Jovay achieves full process parallelism of computation and I/O. It delivers sub 100ms transaction finality, enabling millisecond level responsiveness for users.
2. **TEE-Based Hardware Prover Finality:** In this stage, a TEE-based proof system generates verifiable attestations for prior execution results, with raw transactions written on-chain. Owing to the performance of TEE and the scalability of Jovay, proof generation and verification can be completed within 1 second,  without considering the time of raw transaction get on L1.
3. **ZKP-Based Cryptographic Prover Finality:** A general purpose ZKP system generates cryptographic proofs for Stage 1 execution results. With a random aggregation based SumCheck algorithm and hardware acceleration, this stage achieves 10 minute end-to-end finality, offering global, dual-prover confirmation. Its efficiency is several times higher than existing implementations, significantly reducing the cost of proof generation and verification in Layer2 systems.

### 3.3.Scalable Subsystem
Jovay comprises the following subsystems:

1. **Sequencer Subsystem:** responsible for transaction execution, block generation, and receipt return. It completes real-time transaction result delivery in Stage 1.
2. **Tracer Subsystem:** generates trace data for the dual-prover system, including Basic Trace to the TEE proof system and Full Trace to the ZKP proof system.
3. **Bridge Subsystem:** handles raw transaction packaging to DA, proof submission to L1, and cross-chain operations such as L1 deposits, L2 withdrawals and escape hatch functions.
4. **Prover Subsystem:** produces execution correctness proofs, encompassing both TEE based hardware proofs and ZKP based cryptographic proofs.
5. **Data Storage Subsystem:** provides foundational storage service for other subsystems: zkTrie and KV block storage for Sequencer, TracerDB for Tracer, and Rawtxns storage for the Bridge subsystem.

The Sequencer, Tracer, and Prover subsystems adopt elastic and transparent scalability, supporting linear expansion to meet growing throughput and storage demands.

### 3.4.Full-Cycle Transaction Process

<p align="center">
  <img src="./Images/Whitepaper/Transaction%20Process.png">
  <br>
  <span style="font-size: 14px;">Figure2：Transaction Process</span>
</p>

The full-cycle transaction process in Jovay is composed of four stages: transaction execution, batch commit, batch proof based on trusted hardware, and batch proof based on zero knowledge. Together, they form a complete pipeline from transaction submission to final verification on Layer1.

1. **Transaction execution:** Transactions can be initiated by users on Layer2 or triggered by Layer1 (e.g., Deposit transactions captured by the Relayer and forwarded to L2). These transactions pass through the Portal and TxPool, where a pre-execution phase derives their read-write sets. The pipeline scheduler batches transactions every 10 milliseconds, constructs Layer2 blocks, and forwards them into the execution pipeline. Within the execution pipeline, transactions are grouped based on read-write conflicts to ensure isolation and are dispatched to computing clusters for parallel execution. After each group finishes execution, the resulting state updates and receipts are written to the storage cluster. Once all groups are complete, the State Root is calculated, and the block header and body are generated and persistently stored. Transaction and receipt information can be queried through the ETH JSON-RPC interface once persistence is completed.
2. **Batch commit:** Each stage of the pipeline produces components of the Basic Trace, including transaction grouping information, block header, circuit size, and transaction list. The Sequencer transmits this data to the Tracer, which stores it in TraceDB. The Relayer monitors newly finalized Layer2 blocks and incrementally retrieves their Basic Trace. Once a sufficient number of blocks are collected, they are assembled into a Chunk or Batch and stored locally. A CommitBatch  transaction is then submitted to the L1 Rollup contract to ensure data availability and enable subsequent verification processes.
3. **Batch proof based on trusted hardware:** The Tracer generates SPV (Simplified Payment Verification) data directly from the read-write sets of each block without requiring re-execution. The Prover fetches the corresponding Basic Trace and SPV data, then schedules the TEE Prover cluster to re-execute the transactions within a trusted execution environment (TEE). During this process, a partial world state tree is constructed in memory based on SPV data. After execution, a block header is generated in TEE and compared with the original from the trace. Upon a successful match, the Prover generates a hardware signature to attest to execution correctness, which is then persisted. The Relayer polls for new signatures and submits a VerityBatch(TEE) transaction to the L1 Rollup contract, which verifies the result using the TEE signature.
4. **Batch proof based on zero knowledge:** The Tracer re-executes each block to generate an Full Trace , using transaction groupings from the BasicBlock Trace to enable parallel execution of transactions without read-write conflicts. Once execution is complete, the Full Trace  is stored in TraceDB. Upon batch formation, the Relayer notifies the Prover, who retrieves the necessary Full Trace  and SPV data, and schedules the ZK Prover cluster to perform circuit verification, thereby generating and persisting the zero-knowledge proof. The Relayer retrieves the proof and submits a VerityBatch(ZKP) transaction to the L1 Rollup contract, which validates the proof to confirm execution correctness.

## 4.Extension and Application
### 4.1.VEPT Verifiable Computation Paradigm
The cross-integration of artificial intelligence, blockchain and Web3 has given rise to new application models with the development of big models. Driven by big model technology, AI Agent can improve product decision-making efficiency and product collaboration efficiency, which is different from the capabilities of traditional software robots and services. Under the Web3 system, decentralized technology and token mechanism have promoted the innovation and collaboration of AI Agent, and a large number of blockchain + AI projects [1], application scenarios and open source projects [2] [3] [4]have emerged. In the collaboration scenarios of AI Agent and blockchain network, in scenarios such as encrypted transactions, wallet management, DeFi, investment research, etc., they usually face problems such as the security of Agent identity private keys, verifiable Agent execution, data privacy security, and scalability and hosting in the collaboration mode. Ai16z[5]Shaw mentioned the visualization and authentication issues of Agent architecture, model, and hosting location. Similar to the trust score of decentralized exchanges, the agent verifiable system is also particularly important. Phala [6] provides a privacy cloud service based on TEE, and provides Dstack SDK to help users realize the hosting and integration of AI Agent and applications; Automata[7] provides SDK capabilities for on-chain verification kits and TEE infrastructure, and Eliza implements an open source multi-agent framework for Web3 based on the role definition model. Through the plug-in mechanism, it can help developers quickly integrate with the TEE environment and achieve trusted hosting.

Based on the identity, privacy, and public verifiability issues faced by AI Agents, data, applications, and Web3 implementation, we propose a new paradigm for Web3 verifiable computing VEPT (Verifibale, Extensible, Pluggable, Trusted), which realizes a broad definition of the combination of blockchain and new technologies or applications, so that AI Agents and innovative applications can better integrate with the first and second layer of blockchain networks through verifiable and trusted extensions, better assist the exploration, innovation, and implementation of Web3 decentralized technologies, and promote the prosperity of Web3 decentralized economy and applications in the era of blockchain + AI.

VEPT is based on TEE technology, and builds decentralized TEE, modular extensibility, and trusted interoperability protocols such as AI Agent:

1. **Verifiable:** AI Agent thinking process, memory and other key information are stored on the chain and can be publicly verified, Agent core logic contract paradigm expression, blockchain network consensus.
2. **Extensible:** Virtual machine, AI mode transaction, LLM capability layered mode expansion, subsystem, subservice interoperability network verifiable.
3. **Pluggable:** The plug-in mode makes it easier to achieve efficient migration with L1/L2 programs, three-party integration, and eco-friendly, such as Blockchain, Eliza, Dapp, Multi-Agent Framwork.
4. **Trusted:** On-chain and off-chain AI interoperability protocols, interface standardization, fast compatibility with MCP, A2A and user-defined (UDF) protocols, etc.

<p align="center">
  <img src="./Images/Whitepaper/VEPT%20Architecture.png">
  <br>
  <span style="font-size: 14px;">Figure3：VEPT Architecture</span>
</p>

### 4.2.AI Extended Application
Based on the VEPT paradigm, we have built a second-layer network AI Agent based on the Jovay project from a trusted and verifiable full-link solution. The Sequencer transaction executor virtual machine uses smart contracts to express the key logic and key interface extensions of the AI Agent. Through the AI interoperability protocol, B-Agent can extend the LLM native computing power through the TEE chain. At the same time, the thinking chain, memory and other processes of the execution process are connected to the Trace system. The entire transaction process can be compatible with conversational AI featured end-to-end transactions. At the same time, the proof system ensures that the blockchain transaction execution link is publicly verifiable and VEPT ensures that the LLM calculation is verifiable, realizing the friendly expansion of AI in the blockchain and Web3 scenarios.

<p align="center">
  <img src="./Images/Whitepaper/AI%20Extension%20Architecture%20Based%20on%20VEPT.png">
  <br>
  <span style="font-size: 14px;">Figure4：AI Extension Architecture Based on VEPT</span>
</p>

## 5.Conclusion
The evolution of blockchain technology has never stopped, and Layer2 is a key milestone in this journey. Jovay has redefined the possibility of expansion through technological innovation and provided infrastructure support for the large-scale application of Web3. We firmly believe that Jovay is not only a technical solution, but also a bridge to an open, efficient and decentralized future. With the prosperity and evolution of the ecosystem, Jovay will work with global partners to jointly write a new chapter in blockchain technology and industry ecology. We hope Jovay can work with you to "Tokenize the Future and Chain the Value".

## References
[1]Wang, H., Li, Y., Wu, Z., Yu, Y., Li, Z., & Sun, L. (2024). Linking Large Language Models with Blockchains: Towards Intelligent Smart Contracts. arXiv preprint arXiv:2402.03605.

[2]Nguyen, C. T., Liu, Y., Du, H., Hoang, D. T., Niyato, D., Nguyen, D. N., & Mao, S. (2024). Generative AI-enabled Blockchain Networks: Fundamentals, Applications, and Case Study. arXiv preprint arXiv:2401.15625.

[3]Al-Obaidi, A., Al-Ali, A., & Al-Mashaqbeh, I. (2024). Integration of Blockchain with Artificial Intelligence Technologies in the Energy Sector. Frontiers in Energy Research, 12, 1377950.

[4]NEAR. (n.d.). AI resources on NEAR. Retrieved from https://near.org/ai

[5]ElizaOS. (n.d.). Eliza GitHub Repository. Retrieved from https://github.com/elizaOS/eliza

[6]Phala Network. (n.d.). Phala documentation. Retrieved from https://docs.phala.network/

[7]Automata Network. (2024). TEE-Builder: Stateless Block Builder for Trusted Execution Environments. GitHub repository. Retrieved from https://github.com/automata-network/tee-builder