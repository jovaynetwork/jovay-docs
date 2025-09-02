---
outline: deep
---

# Jovay: Trustless Scalability for Mass Adoption
## Abstract
Web3 is transitioning from a decentralized value transfer network into a foundational
component of global financial infrastructure. This transformation is being accelerated
by three key drivers: the tokenization of Real-World Assets (RWA), advances in
blockchain scalability solutions, and the convergence of AI technologies. In response
to this paradigm shift, ***Jovay*** is introduced as a high-performance, secure Ethereum
Layer 2, engineered to serve as the technical backbone for next-generation digital
finance and RWA integration.

To overcome the inherent scalability constraints of existing blockchain architectures,
Jovay employs a fully pipelined, parallel execution engine. This engine breaks down
transaction workflows into discrete execution units, enabling concurrent processing
across transaction, block, and batch levels. As a result, the system achieves cluster-scale
throughput with reduced end-to-end latency—targeting performance levels
suitable for large-scale financial applications. Jovay’s security model is based on a
phased and heterogeneous validity proof mechanism. Initially, it leverages Trusted
Execution Environments (TEE) to enable fast finality and scalable proving execution.
Over time, the system will transition toward Zero-Knowledge Proofs (ZKP), which
provide stronger cryptographic guarantees and reduced trust assumptions. These
mechanisms are supported by robust on-chain attestation protocols and comprehensive
third-party auditing. Built with modularity at its architectural core, Jovay decouples
key components including execution, proof service, data availability, and settlement.
This modular approach enables each component to scale independently, optimize
resource allocation, and evolve in response to changing infrastructure requirements.
Together, these innovations position Jovay as a foundational infrastructure layer for
the secure, scalable, and smart tokenization of real-world assets, supporting the
development of next-generation Web3 financial ecosystems.

## 1. Vision
Web3 is experiencing an evolutionary shift—from the Internet of Value toward a
decentralized foundation for global financial infrastructure. Built upon
cryptoeconomic primitives [1] and AI-driven economic operating systems,
blockchain technology is enabling Web3 to emerge as a foundational layer for global
finance. This transformation is driven by the deep integration of Real-World Assets
(RWA) and on-chain intelligence, which together are redefining the architecture of
the digital economy. Public blockchains such as Ethereum are evolving from value
settlement layers into critical components of the global digital economy’s
foundational infrastructure. This transformation is being driven by three core
technological and economic pillars:
- **Crypto-economic Primitives Revolution:** The market capitalization of
stablecoins has reached more than 200 billion [7], establishing its position as
the economic anchor on blockchain. As highlighted in Keyrock’s report,
tokenization has the potential to fundamentally reengineered the financial
system [2]. According to World Economic Forum estimates, tokenization
may account for 10% of global GDP by 2027 [3], with trillions of dollars in
assets expected to transition onto blockchain networks during this period.
Boston Consulting Group's forecast further indicates that securitized assets
could reach $16 trillion by 2030 [4].
- **Architectural Evolution:** Blockchain networks continue to grapple with the
scalability-decentralization-security trilemma. To overcome these constraints,
the industry has explored various architectural decoupling strategies. Layer 1
scaling solutions—such as sharding [10]—seek to enhance throughput via
protocol-level upgrades. For instance, sharding partitions the network into 64
parallel sub-chains, targeting a throughput exceeding 100K TPS. However, it
faces challenges like cross-shard communication latency and high migration
costs. In contrast, Layer 2 introduce an off-chain execution model with on-chain
data availability and finality, inheriting Ethereum's security while
significantly improving performance [5,6]. Notable approaches include
Plasma, state channels, sidechains, and Rollups [11]. Among them, Rollups
have emerged as the dominant scaling paradigm due to their balance between
efficiency and security. They are primarily categorized into two types:
Optimistic Rollups [12], which rely on fraud proofs, and Zero-Knowledge
(ZK) Rollups [13], which use cryptographic validity proofs.
- **Synergistic Integration Acceleration:** The rapid advancement of artificial
intelligence is catalyzing new synergies with Web3 technologies across
multiple layers. At the infrastructure level, NEAR has proposed a privacy-preserving,
verifiable decentralized AI computing framework based on
distributed AI networks [8]. At the protocol level, agent-based economic
frameworks are forming intelligent transaction ecosystems [22], with
emerging models built on Agent-to-Agent (A2A) protocols [23]. At the
application level, RWA-integrated financial models enhanced by AI-driven
risk control and pricing mechanisms are elevating the sophistication of digital
financial systems. Meanwhile, AI-powered development tools and smart
tokenization management products highlight the transformative potential of
AI and Web3 convergence.

In response to this paradigm shift, Jovay has been designed as an Ethereum Layer 2.
It leverages a parallel execution pipeline that decomposes transaction workflows into
independent units for concurrent processing, supported by dynamic load balancing.
This architecture enables cluster-scale performance while significantly reducing latency. Security is reinforced through a heterogeneous proof system combining Trusted Execution Environment (TEE) and Zero-Knowledge (ZK) proofs. An AIenhanced toolchain further supports end-to-end capabilities in smart contract development, debugging, performance tuning, and security auditing.

Jovay aims to build a high-performance, high-security Layer 2 network serving as
the technological backbone of next-generation digital finance. From inception,
performance and security have been prioritized. The project adopts a "pragmatism-first"
approach, aligning technical roadmaps with the scale and complexity of live
on-chain assets.

Performance-wise, when evaluating Layer 2 capabilities, two key factors come into
play: one is the intrinsic processing speed of the Layer 2 solution itself, and the other
is the throughput bottleneck imposed by the underlying Layer 1 (Ethereum) for
rollup data. In this context, we focus on the former — the performance of Layer 2
execution.

Currently, excluding potential limitations caused by Ethereum testnet rollup
throughput, our single-node Layer 2 testnet achieves a throughput of 6,000–7,000
transactions per second (TPS). With multi-process concurrency during the testnet
phase, this capacity is expected to scale to 20,000–30,000 TPS. Looking ahead,
through clustered node expansion, Jovay aims to reach a total network capacity of
100,000 TPS within the next year.

We are also confident that ongoing upgrades to Ethereum will further improve Layer
1 throughput, making the ecosystem increasingly friendly to high-performance Layer
2 solutions.

In addition to overall system architecture, the performance of the smart contract
execution engine remains a critical factor in achieving scalable and efficient
blockchain operations. To address the requirements of deterministic execution in
smart contract environments, we have designed and implemented a tiered lazy Just-
In-Time (JIT) compilation engine, DeTerministic Virtual Machine (DTVM) , which
has now been open-sourced1. The core JIT engine of DTVM is decoupled from the
specific virtual machine implementation, enabling modular upgrades and cross-VM
compatibility. Currently, we are adapting and optimizing this engine for Ethereum
Virtual Machine (EVM) bytecode execution. Upon completion, this enhancement
will serve as the next-generation execution engine for Jovay, significantly improving
smart contract processing performance and throughput. We warmly welcome
contributions and feedback from the open-source community to further refine and
evolve this infrastructure.

Security-wise, beyond the architectural design of the TEE-ZK hybrid proof system,
comprehensive code audits have already been completed. Critical system contracts
and RPC interfaces have undergone auditing (conducted by Antgroup Skyward Lab
[21]). As the testnet progresses, key subsystems—including sequencer, prover, and
relayer modules—will undergo continuous audit cycles. A full-chain security
evaluation is scheduled before mainnet launch. In the domain of zero-knowledge
(ZK) proof systems, the ETHproof [23] competition hosted by the Ethereum
Foundation has highlighted the growing adoption of RISC-V-based ZK virtual
machines (ZKVMs) [24,25], largely due to their modular architecture, efficiency,
and simplicity. From a cryptographic system design perspective, the community has
made comprehensive improvements across multiple dimensions — from SNARKs
[28] to STARKs [29], from Golidlock [26] to BabyBear [27], and from Plonky2 [26]
to Plonky3 [27]. These efforts focus on enhancing both performance and security of
underlying algorithms. Notably, proof protocols following the Sumcheck paradigm,
when combined with advanced polynomial commitment schemes such as Basefold or
WHIR [30], offer promising potential. They maintain the linear proof time
complexity of Sumcheck while reducing computational overhead and improving
proving efficiency. However, several key technical challenges remain:

- **Trace Generation**: Efficiently generating execution traces required by zkVMs
during block processing remains computationally intensive and in need of
optimization.
- **Proof Composition**: Developing efficient methods to integrate Sumcheck
protocols with Polynomial Commitment Schemes (PCS), enabling multi-circuit
aggregation and GPU-friendly acceleration, is still an active research direction.
- **Security Assurance**: As new algorithms rapidly emerge, the foundational
security properties and implementation soundness of these constructions require
rigorous formal analysis and validation — a task that demands collaborative
effort from academia and industry alike.

To address these challenges, we are actively developing our own ZK proof system,
which is expected to be publicly released by the end of this year. Worth highlighting,
we have collaborated with academic researchers to conduct an in-depth study on the
security of zk-SNARKs under the Generic Group Model (GGM). Our work reveals
how group encoding length impacts protocol security, and introduces the first
formalized framework for quantifying the relationship between encoding parameters
and security guarantees. This result provides a theoretical foundation for
standardizing GGM-based security arguments in zero-knowledge proofs. The related
paper has been accepted at Asiacrypt 2024, a top-tier conference in cryptography [9].

## 2. Design Principles and Objectives
To address the core challenges of evolving next-generation financial infrastructure,
modern Layer 2 architectures are increasingly embracing modularization as a
foundational design principle. This approach enables flexible adaptation across
performance, cost, and security dimensions, facilitating scalable and sustainable
technological development. Jovay’s modular architecture is structured around five
interdependent yet independently upgradable layers:

- **Execution Layer Specialization**: Efficient transaction processing hinges on
execution engine optimization and robust parallel execution capabilities—key
performance factors extensively explored in both Layer 1 and Layer 2 [15–18].
In Layer 2 environments with relatively centralized transaction coordination,
effective strategies for transaction parallelism and scalable execution
architectures are especially critical. Jovay implements an independent, modular
execution layer to maximize throughput scalability—a design choice central to
its architecture.

    Furthermore, ecosystem compatibility remains a top priority. Given the
dominance of the Ethereum Virtual Machine (EVM), full EVM compatibility
ensures seamless developer adoption by supporting both Solidity-based smart
contract languages and standard transaction interfaces.

- **Arbitration Layer Diversification**: The arbitration layer ensures state
correctness and dispute resolution in Layer 2 systems. Two dominant
mechanisms exist: a) Fraud Proofs, which rely on interactive verification during
a defined challenge period; b) Validity Proofs, which use verifiable computation
to guarantee immediate correctness.

    Jovay selects validity proofs as its core arbitration mechanism due to their
deterministic guarantees and fast finality—critical attributes for high-stakes
financial transactions. Within this framework, verifiable computation can be
implemented via either Zero-Knowledge Proofs (ZKPs) or Trusted Execution
Environments (TEEs).

    TEEs offer low-latency execution and faster confirmation cycles through secure
hardware isolation, but depend on trusted hardware providers. In contrast, ZKPs
provide mathematically sound security with minimal trust assumptions, and
recent advances in proof acceleration are rapidly improving their efficiency.
Buterin introduced the hybrid verification model [20], which integrates zero-knowledge
(ZK) proofs, Trusted Execution Environment (TEE), and Optimistic
Rollup (OP) techniques. The use of multi-prover verification is expected to
receive greater consideration in future developments.

- **Data Availability Stratification**: Traditional rollup solutions store transaction
data directly on the Ethereum mainnet to ensure availability and security, but
this practice incurs significant storage costs—particularly burdensome for highfrequency
financial transactions. With the introduction of Proto-Danksharding
(EIP-4844) [14], Ethereum now supports more cost-efficient data posting
through blob transactions, substantially lowering Layer 2 operational overhead.

    Nevertheless, mission-critical transaction data still warrants on-chain
preservation to maintain cryptographic guarantees. For transient data such as
intermediate settlement states or short-term clearing records, Jovay will explore
layered availability models that combine on-chain anchoring with off-chain
distributed storage solutions in future. This stratified approach balances security
and economic efficiency, enabling scalable growth without compromising
integrity.

- **Settlement Layer Independence**: The settlement layer governs asset transfers
and state finality between Layer 1 and Layer 2, forming the cornerstone of crosschain
interoperability. Through modularization, it can be deployed
independently while preserving cryptographic security and enabling near-instant
finality. Jovay employs State Commitment Chains in conjunction with bridge
contracts to enforce precise asset locking and unlocking mechanisms. These
commitments serve as the primary source of truth for arbitration layer
verification, ensuring consistent and tamper-proof reconciliation of Layer 2
states with the underlying Layer 1.

- **Modularization Implementation**: Building upon the above principles, Jovay
establishes standardized, well-defined interfaces between modules to ensure
composability and interoperability. Each component interacts through
formalized protocols, enabling seamless integration and future extensibility.
This modular structure not only simplifies maintenance but also allows for
granular, targeted upgrades—such as hot-swapping execution engines or
enhancing fraud detection logic—without disrupting the entire system. Such
agility is essential for adapting to evolving regulatory landscapes, market
dynamics, and technological innovations in global digital finance.

- **AI Ecosystem Integration**: Jovay proactively integrates artificial intelligence to
enhance both developer experience and application intelligence. The rise of
Large Language Models (LLMs) opens new frontiers for building smarter, more
intuitive Web3 tools and services—from automated contract auditing to naturallanguage-
driven transaction workflows. By embedding AI capabilities into its
toolchain and runtime environment, Jovay aims to lower development barriers,
improve risk modeling accuracy, and enable adaptive user interfaces. This fusion
of AI and blockchain represents a strategic direction for the long-term evolution
of Web3 infrastructure.

## 3. Architecture
### 3.1 Architecture Overview
In response to the evolving demands of Web3—particularly in high-performance,
scalable, and secure financial infrastructure—Jovay is designed as a fully Ethereumnative
Layer 2 network built on modular architecture principles. Its goal is to deliver
a highly efficient and adaptable blockchain network.

Jovay leverages parallelized transaction execution to maximize throughput,
implements diversified verification mechanisms (including ZKPs and TEEs) for
robust security, and deeply integrates with AI ecosystems to support smart
development and secure audit. Key technical features including:

- **Throughput Scalability**: The transaction lifecycle involves multiple stages—
execution, proof generation, and data publication—each exhibiting distinct
resource consumption patterns for computation, storage, and network
bandwidth. Jovay's modular architecture decouples these functions, enabling
independent performance scaling for execution and proof layers. This eliminates
single-component bottlenecks, thereby achieving elastic system-wide throughput
expansion.

- **Hardware-Secured Proof System**: Jovay employs validity proofs to enable
immediate off-chain transaction validation, delivering faster finality and
enhanced security. A phased migration strategy transitions from Trusted
Execution Environment (TEE) to Zero-Knowledge Proofs (ZKP). Current
Phase: TEE provides high scalability and rapid confirmation through execution
environment authentication. Subsequent Phase: Transition to cryptographybased
ZK proof systems. Research has been conducted on ZKP algorithm
security within generic algebraic group models [9], supporting long-term
security evolution.

- **Deep AI Ecosystem Integration**: Jovay's architecture inherently supports
AI+Web3 convergence. Its verifiable computation foundation is under
development, which will establish a trusted validation layer for on-chain AI
Agent behaviors and AI model inference results. In future, this technical
foundation will enable AI-driven automated trading strategies, intelligent risk
assessment frameworks, and enhanced AI-assisted development experiences.

### 3.2 Detailed System Design
Grounded in the modularization principles outlined above, Jovay’s architecture is
composed of specialized subsystems that operate independently yet interoperate
seamlessly through well-defined interfaces. These modules form the foundational
building blocks of its Layer 2 infrastructure (Fig. 1):

- **Sequencer Subsystem**: Central to transaction processing, the sequencer
executes and batches transactions, generates blocks, and returns execution
receipts. It ensures low-latency responsiveness during the initial phase of
transaction handling, delivering real-time feedback to users and applications.

- **Tracer Subsystem**: This module records detailed transaction execution traces
and constructs structured data formats for Simplified Payment Verification
(SPV) and subsequent proof generation. Acting as an intermediary buffer, it
bridges real-time sequencing with asynchronous batched proof computation,
ensuring consistency and auditability.

![Architecture of Jovay](/Images/jovay-white-paper/architecture-of-jovay.png)
<p align="center">
    <span style="font-size: 14px;">Figure 1: Architecture of Jovay</span>
</p>

- **Bridge Subsystem**: Responsible for cross-layer data anchoring and asset
transfers, the bridge packages transaction data onto the Data Availability (DA)
layer—currently Ethereum Layer 1—and submits cryptographic proofs for onchain
verification. It facilitates bidirectional movement of assets and state
updates between Layer 1 and Layer 2, supporting deposit, withdrawal, and
cross-chain messaging functionalities.

- **Prover Subsystem**: The prover subsystem is responsible for generating
cryptographically sound validity proofs for executed transaction batches. It
supports dual verification mechanisms—Trusted Execution Environment (TEE)-
based hardware validation and Zero-Knowledge Proof (ZKP) cryptographic
protocols. In the current implementation phase, TEE ensures high-throughput
proof generation and rapid finality. A roadmap-driven transition to ZKP-based
validity proofs is underway to achieve trust-minimized security guarantees in
future releases.

### 3.3 Exploring the Sequencer Subsystem: Parallelized Execution Technology
Jovay’s sequencer subsystem implements a multi-dimensional parallel execution
architecture designed to maximize throughput while maintaining semantic consistency
with serial execution semantics (Fig. 2).

- **Compute-Storage Decoupling for Scalable Execution**

    To address the inherent storage amplification issues in blockchain state management,
Jovay adopts a compute-storage decoupled architecture. This design enables
independent horizontal scaling of computation and storage units. Transactions are
grouped and scheduled by an execution scheduler. They are then dispatched to
distributed compute units for parallel execution. Post-execution results are
concurrently written into distributed storage nodes. This dual-layer parallelism
significantly improves hardware utilization, eliminating performance bottlenecks
caused by single-CPU limitations and storage I/O constraints.

    ![Scalable Parallel Mechanism](/Images/jovay-white-paper/scalable-parallel-mechanism.png)
    <p align="center">
        <span style="font-size: 14px;">Figure 2: Scalable Parallel Mechanism</span>
    </p>

- **Asynchronous Multi-Stage Pipelining - Inter-Block Parallelism**

    Through a multi-stage asynchronous pipelining architecture, Jovay achieves block-level
concurrency across different processing stages. Each block's processing workflow is divided into multiple pipeline phases. These phases operate concurrently across multiple blocks, maximizing resource utilization. Block proposal intervals remain significantly shorter than individual block processing times, reducing userperceived transaction latency. This approach ensures high system throughput without compromising execution correctness.

- **Adaptive Transaction Parallelism - Intra-Block Concurrency**

    To optimize transaction-level concurrency within each block, Jovay employs a
dynamic DAG-based scheduling mechanism. Incoming transactions are first
validated and analyzed for read-write dependencies. A Directed Acyclic Graph
(DAG) partitioning algorithm organizes transactions into dependency-free groups.
These groups are assigned to distributed executors based on available resources for
parallel execution. Transactions encountering conflicts during execution are
dynamically rescheduled to maintain correctness. This mechanism guarantees
deterministic equivalence with serial execution while achieving maximum intra-block
parallelism.

### 3.4 Exploring the Prover Subsystem: Validity Proof Technology
Jovay’s prover subsystem integrates a hybrid validity proof engine that supports both
Trusted Execution Environment (TEE)-based verification and cryptographic Zero-
Knowledge Proofs (ZKPs). Currently, the system utilizes the TEE Prover to generate
batched validity proofs with high efficiency and low latency (Fig. 3).

**Core Characteristics of TEE Prover**

- **Verifiable Computation**: Enables off-chain execution of transaction logic and
state transitions, with on-chain verifiability via execution traces and SPV.

- **Multi-Dimensional Parallelism**: Achieves high throughput through pipelined
parallelism at three levels: batch-level, chunk-level, and block-level.

- **Heterogeneous TEE Support**: Facilitates integration across diverse TEE
hardware platforms through trust chain aggregation and clustered networking
capabilities (under development).
- **Cloud Deployment Neutrality**: Ensures cross-cloud compatibility via Unified
Attestation Service (UAS), which abstracts differences in hardware attestation
formats across domestic and international environments (under development).

**Input-Output Model**
The TEE Prover operates as a function 𝑓(𝑆, 𝑇), where:

𝑆: Initial world state before transaction batch execution

𝑇: Batch of transactions to be processed

𝑂𝑢𝑡𝑝𝑢𝑡: New world state 𝑆' and corresponding validity proof 𝑃

This proof is submitted to the on-chain Rollup contract for verification, ensuring
secure and trustless settlement of L2 transactions on Ethereum L1.

![Proving system based on TEE](/Images/jovay-white-paper/proving-system-based-on-tee.png)
<p align="center">
    <span style="font-size: 14px;">Figure 3: Proving system based on TEE</span>
</p>

**Trust Chain Architecture**
Jovay's TEE Prover leverages a structured trust chain model to ensure end-to-end
integrity and authenticity (Fig. 4):

1. **Node Registration Phase**

    Prior to initialization, all TEE Prover node measurements must be registered and
publicly accessible on L1. This allows external entities to audit and verify node
identities.

2. **Node Initialization Verification**

    During startup, the TEE Prover undergoes hierarchical hardware-level attestation:
Hardware initialization, Secure enclave creation, Enclave quote generation. This
process guarantees that only legitimate code runs inside trusted execution
environments.

3. **Node Enrollment Verification**

    When registering with the Prover Controller (PC), nodes submit attestation reports
for remote verification. While this serves as preliminary screening, final
validation occurs on-chain.

4. **Runtime On-Chain Verification**

    During operation, the TEE Prover generates validity proofs and cryptographic
signatures within enclaves. These attestation quotes are verified by on-chain
Rollup contracts using dedicated TEE verification modules.

    ![Trust chain of proving system](/Images/jovay-white-paper/trust-chain-of-proving-system.png)
    <p align="center">
        <span style="font-size: 14px;">Figure 4: Trust chain of proving system</span>
    </p>

**TEE Verification Contracts**
Jovay implements a set of on-chain verification contracts to enforce the integrity and
authenticity of TEE-generated proofs. These contracts perform the following critical
functions:

1. **Attestation Material Upload**

    Administrators retrieve the latest attestation materials from Intel Platform
Certification Service (PCS) and submit them to the Provisioning Certificate
Service (PCCS) contract. Timestamps and digital signatures are verified to
ensure material freshness and authenticity.

2. **On-Chain Quote Attestation**

    Submitted TEE attestation quotes are cryptographically verified using
standardized attestation protocols. This step confirms that the quotes were
generated within genuine TEE environments.

3. **Measurement Consistency Validation**

    The contract compares the mrsigner and mrenclave values embedded in the
attestation quotes against the pre-registered node measurements stored on-chain.
This ensures that only trusted TEE Prover nodes can participate in the network.

## 4. RWA Smart Tokenization on Jovay
### 4.1. RWA Standardized Phases
Blockchain technology facilitates the tokenization of real-world assets (RWA)
through a structured five-phase lifecycle model: underlaying asset onboarding, asset
preparation, asset tokenization, tokenized asset issuance (primary issuance),
tokenized asset trading (secondary market and derivatives). This standardized
framework ensures seamless integration of real-world assets into Web3 and
decentralized finance (DeFi) ecosystems while preserving traceability, verifiability,
and regulatory compliance. Jovay’s RWA infrastructure follows the five-phase
processes for secure and trustless tokenization (Fig. 5).

1. **Underlaying Asset Onboarding**

    Real-world asset onboarding supports diverse types of assets such as new energy
assets (e.g. EV charging equipment, photovoltaic equipment) and standard
financial assets (e.g. bonds, bills, notes, trusts). Taking new energy assets for
example, due to their non-standard nature，hardware-software co-design
solutions can be applied at the asset originator level to enhance trust, which
benefits the subsequent tokenized asset issuance and trading processes. Secure
IoT modules, software SDKs and proprietary chips can be employed to capture
and authenticate real-time operational data. This data is then ingested into
trusted asset management platforms for further processing.

2. **Asset Preparation**

    Key asset metadata—including underlaying asset detail information, ownership
records, valuation models, and yield generation mechanisms—are formalized for
on-chain representation. Original data sources are cryptographically anchored to
the blockchain via Merkle proofs or ZK-based commitments, ensuring
immutability and auditability. Besides, multiple assets could be package together
to form a SPV-like asset package.

    ![RWA standardized phases](/Images/jovay-white-paper/rwa-standardized-phases.png)
    <p align="center">
        <span style="font-size: 14px;">Figure 5: RWA standardized phases</span>
    </p>

3. **Asset Tokenization**

    Tokenized asset portfolios are issued through verifiable smart contracts
deployed on Jovay. These contracts encode automated revenue distribution logic
and generate SPV-like tokenized asset certificates that represent fractional or
full ownership rights.

4. **Tokenized Asset Issuance (Primary Issuance)**

    The tokenized assets are initially issued to distributors by the issuer, and
subsequently issued or transferred to end investors. Meanwhile, the verified
investment reports and audited statements can be delivered to the participant
institutions and end investors.

5. **Tokenized Asset Trading (Secondary Market and Derivatives)**

    Secondary market activities such as redemptions, transfers, liquidity
provisioning and decentralized finance (DeFi) derivatives like locking and reissuance/
borrowing/lending occur within regulated marketplaces governed by
compliance frameworks. All financial transactions are enforced through
programmable access controls and verified by on-chain settlement mechanisms,
aligning with global supervisory standards.

### 4.2. Trusted Chain Architecture
Built upon the five-phase RWA lifecycle, the trusted architecture comprises six
functional layers designed to ensure end-to-end integrity, confidentiality, and
auditability: *a). **Asset Originator Layer**:* Proprietary IoT chipsets securely onboard
physical asset data (e.g., from EV charging stations, solar panels). Trusted Execution
Environments (TEEs) and Zero-Knowledge Proofs (ZKPs) establish verifiable data
bridges with third-party stakeholders. *b). **Asset Management Layer**:* Layer2 network
supports efficient and low-cost asset tokenization. Temporal modeling capabilities
enable predictive analytics on data quality, risk indicators, and yield projections. *c).
**Asset Issuance Layer**:* Smart contracts formalize processed asset portfolios into
SPV-style tokenized structures. AI-powered modules assist in whitelist verification,
pathway analysis, and visual reporting. *d). **Asset Trading Layer**:* Regulatory-compliant mechanisms govern asset redemptions and transfers. For international
investments, zkSQL-based verifiable reporting allows transaction validation without
exposing sensitive data details. *e). **Data Services Layer**:* Manages model assets,
executes offline/real-time data pipelines, and performs AI-assisted data quality
assessments. Ensures trustworthy asset modeling and generates tamper-proof
provenance records. *f). **Security Infrastructure Layer**:* End-to-end asset lifecycle
protection is achieved through ZKP-based verification, privacy-preserving
computation, and distributed key management systems.

![Technical architecture of RWA application](/Images/jovay-white-paper/technical-architecture-of-rwa-application.png)
<p align="center">
    <span style="font-size: 14px;">Figure 6: Technical architecture of RWA application</span>
</p>

### 4.3. RWA Workflow Example
#### 4.3.1. Physical Assets
In renewable energy scenarios (e.g., EV charging stations, solar panels), IoT devices
are securely connected via communication modules and customized chips. Operational
data is collected into IoT asset management platforms. The Data Services Layer
performs quality assurance, risk assessment, and yield optimization while anchoring
static device data on-chain. The Asset Issuance Platform constructs token metadata
(token basics, report hashes, role lists) based on asset packages and processed metrics.
Security tokens are distributed to overseas investors through issuance channels, with
verifiable investment reports where verifiable computation technologies (e.g. ZKP)
could be applied to enhance trust.

![RWA workflow example (physical assets)](/Images/jovay-white-paper/rwa-workflow-example-(physical-assets).png)
<p align="center">
    <span style="font-size: 14px;">Figure 7: RWA workflow example (physical assets)</span>
</p>

#### 4.3.2. Financial Assets
In financial assets scenarios, detailed information about financial assets, including
net asset value (NAV) and yield metrics is typically verified and endorsed by
financial institutions. Due to the standardized nature of these assets, blockchain
oracle technology including both centralized oracle and decentralized oracle can be
utilized to feed off-chain asset data into the blockchain. Other workflows include the
tokenized asset issuance process via Asset Issuance Platform and then the tokenized
assets are issued to distributor by issuer, and finally issued/transferred to end
investors, followed by potential secondary market trading and the creation of
derivative instruments.

![RWA Workflow Example (Financial Assets)](/Images/jovay-white-paper/rwa-workflow-example-(financial-assets).png)
<p align="center">
    <span style="font-size: 14px;">Figure 7: RWA Workflow Example (Financial Assets)</span>
</p>

## 5. Mission Forward
At its core, blockchain technology is not just about innovation — it is about
empowerment. The evolution of Layer 2 represents a pivotal step toward fulfilling
the original promise of decentralized systems: to create a more open, fair, and
accessible digital future. As an Ethereum-native extension, Layer 2 delivers scalable,
cost-efficient transactions without compromising the foundational principles of
security and decentralization. It is not merely a technical advancement, but a
mission-driven milestone — one that brings us closer to a world where Web3 is not a
niche frontier, but a widely adopted, inclusive, and transformative force for all.

Jovay has redefined the boundaries of blockchain scalability through innovations in
architecture and modular execution frameworks. Jovay delivers a robust foundation
for mass-market Web3 applications, enabling seamless integration across
decentralized finance (DeFi), NFTs, and real-world asset tokenization (RWA).

Beyond its role as a technical stack, Jovay serves as a foundational enabler of a more
open, efficient, and trustless digital economy. By abstracting complexity into
scalable execution layers, it empowers developers, institutions, and end-users to
interact with decentralized systems at scale — paving the way for transparent
governance, permissionless innovation, and programmable value transfer across
borders.

As the blockchain ecosystem continues to mature, Jovay is committed to
collaborating with global innovators, financial institutions, and regulatory
stakeholders to shape the next generation of blockchain-driven industries. These
partnerships aim to bridge traditional finance with decentralized infrastructure,
fostering secure, compliant, and scalable solutions across asset tokenization, green
finance, and institutional-grade DeFi protocols.

Together, we aim to materialize the vision of "Tokenizing the Future, Chaining the
Value" — transforming real-world assets into programmable, interoperable digital
entities while anchoring value creation within trustless systems.

## References

[1]. CoinBase, The Emergence of Cryptoeconomic Primitives, https://www.coinbase.com/blog/the-emergence-of-cryptoeconomic-primitives<br>
[2]. [Keyrock](https://keyrock.com/the-great-tokenization-shift-2025-and-the-road-ahead/), The Great Tokenization Shift: 2025 and the Road Ahead,2025<br>
[3]. Jeremy Allaire, “Blockchain is in from the cold — and stablecoins are set to change the financial system forever,” World Economic Forum, January 15, 2024.
[4]. Rajaram Suresh, Sumit Kumar, Darius Liu, Bernhard Kronfellner, and Aaditya Kaul, “Relevance of on-chain Asset Tokenization in ‘Crypto Winter’,” Boston Consulting Group, September 12, 2022.<br>
[5]. What is Starknet: A Scalable Layer 2 Network for Ethereum https://www.rapidinnovation.io/post/what-is-starknet-a-scalable-layer-2-network-for-ethereum#blog-hero<br>
[6]. Understanding L2 Fees: What They Are and Why They Matter https://www.starknet.io/blog/understanding-l2-fees/<br>
[7]. Forbes, Top Stablecoins Coins Today By Market Cap. https://www.forbes.com/digitalassets/categories/stablecoins/?sh=779ba5751cd0<br>
[8]. Illia Polosukhin, Building Next-Gen NEAR AI Infrastructure with TEEs https://near.ai/blog/building-next-gen-near-ai-infrastructure-with-tees, January 20, 2025<br>
[9]. Keyu Ji, Cong Zhang, Taiyu Wang, Bingsheng Zhang, Hong-Sheng Zhou, Xin Wang, Kui Ren. "
On the Complexity of Cryptographic Groups and Generic Group Models", ASIACRYPT 2024.<br>
[10]. Luu, L., Narayanan, V., Zheng, C., Baweja, K., Gilbert, S., Saxena, P., 2016. A secure sharding
protocol for open blockchains. In: Proceedings of the 2016 ACM SIGSAC Conference on
Computer and Communications Security. pp. 17–30.<br>
[11]. C. Sguanci, R. Spatafora, and A. M. Vergani, “Layer 2 blockchain scaling: A survey,” Jul. 2021,
arXiv:2107.10881. Accessed: Apr. 18, 2022.<br>
[12]. H. A. Kalodner, S. Goldfeder, X. Chen, S. M. Weinberg, and E. W. Felten. Arbitrum: Scalable,
private smart contracts. In W. Enck and A. P. Felt, editors, USENIX Security 2018, pages 1353–
1370, Baltimore, MD, USA, Aug. 15–17, 2018. USENIX Association.<br>
[13]. S. Chaliasos, I. Reif, A. Torralba-Agell, J. Ernstberger, A. Kattis, and B. Livshits. Analyzing and benchmarking ZK-rollups. Cryptology ePrint Archive, Paper 2024/889, 2024. https://eprint.iacr.org/2024/889.pdf<br>
[14]. Dencun Mainnet Announcement, https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement<br>
[15]. Parallel Execution — docs.monad.xyz. https://docs.monad.xyz/ technicaldiscussion/execution/parallel-execution. [Accessed 23-01-2024].<br>
[16]. Sei Labs. Sei: The layer 1 for trading. https://github.com/sei-protocol/ seichain/blob/main/whitepaper/Sei_Whitepaper.pdf. [Accessed 17-03-2024].<br>
[17]. The MystenLabs Team. The sui smart contracts platform. https://docs.sui.io/ paper/sui.pdf.<br>
[18]. Shahid R. Parallel Transaction Execution in Public Blockchain Systems[D]. University of
Waterloo, 2024.<br>
[19]. What is authorize and capture?, https://www.checkout.com/blog/authorize-and-capture<br>
[20]. The multi-prover scheme. https://ethereum-magicians.org/t/a-simple-l2-security-and-finalizationroadmap/23309, 2025.<br>
[21]. Antgroup Skyward Lab, https://github.com/antgroup-skyward<br>
[22]. Fetch AI, https://fetch.ai/<br>
[23]. Google, “Announcing the Agent2Agent Protocol (A2A),” Google Developers Blog, 2025.
Accessed: May 31, 2025. [Online]. Available: https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/<br>
[24]. S. Labs, “Sp1 zkvm,” 2024. [Online]. Available: https://blog.succinct.xyz/introducing-sp1/<br>
[25]. R. Z. T. Jeremy Bruestle, Paul Gafni, “Risc zero whitepaper,” https://dev.risczero.com/proof-system-in-detail.pdf, 2024, [Accessed 02-22-2024].<br>
[26]. P. Z. Team, “Plonky2: Fast recursive arguments with plonk and fri,” 2022, accessed: July 22,
2024. [Online]. Available: https://github.com/0xPolygonZero/plonky2/blob/main/plonky2/plonky2.pdf<br>
[27]. Plonky3, https://github.com/Plonky3/Plonky3<br>
[28]. Bryan Parno, Craig Gentry, Jon Howell, and Mariana Raykova. Pinocchio: Nearly Practical
Verifiable Computation. IEEE S&P 2013.<br>
[29]. Eli Ben-Sasson, Iddo Bentov, Yinon Horesh, Michael Riabzev. Scalable, transparent, and postquantum secure computational integrity. http://eprint.iacr.org/2018/046.pdf<br>
[30]. Gal Arnon, Alessandro Chiesa, Giacomo Fenzi, Eylon Yogev. WHIR: Reed–Solomon Proximity
Testing with Super-Fast Verification. https://eprint.iacr.org/2024/1586
