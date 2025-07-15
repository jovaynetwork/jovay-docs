---
outline: deep
---
# SmartCogent Introduction
## What is SmartCogent?
SmartCogent offers an AI-driven full-stack development experience, leveraging large language models (LLMs) to automate tasks across the smart contract lifecycle: development, debugging, security auditing, and deployment. This is achieved through a multi-Agent workflow with serveral defined roles, supported by at least seven specialized Agents.
![SmartCogent Agents](/Images/SmartCogent/SmartCogent_Agents.png)
## SmartCogent Features
- **Contract Development Phase:**
Contract development phase consists of two agents, Copilot Agent: Generates complete smart contract code based on natural language functional descriptions, intelligently invoking compilation, auditing, and other tools until achieving precise, executable code. We will subsequently provide test case generation, code completion, and intelligent debugging capabilities. Builder Agent: Integrates DTVM SDKs via the MCP protocol, automatically detects the programming language, and invokes corresponding toolchains for compilation.
- **Contract Audit Phase:**
Building on offline-audited strategies, vulnerability databases, and RAG (Retrieval- Augmented Generation) techniques, DTVM enhances audit effectiveness. The workflow includes: Audit Plan Agent: Generates audit plans tailored to contract characteristics. Audit Idea Agent: Proposes audit strategies based on contract features. Audit Report Agent: Executes audit strategies, generates reports, and suggests code fixes. Adversarial Agents: Simulate malicious behaviors to identify vulnerabilities. Through fine-tuned models and RAG-enabled Agents, audit accuracy surpasses that of general-purpose models.
- **Contract Deployment Phase:**
Contract deployment phase consists of an Deployer Agent, which automates contract deployment and transaction construction via the MCP protocol, interfacing with wallets or blockchain tools to stream- line on-chain execution. This modular Agent architecture ensures seamless, AI-augmented collaboration across all stages of smart contract development and operation.
## Quick Start
Currently, ZAN has established an environment for using SmartCogent tools for you, with a free trial available at [SmartCogent official website](https://zan.top/0x/dtvm-smart-cogent). To learn how to use SmartCogent tools, please refer to the [SmartCogent Quick Start Guide](https://docs.zan.top/docs/how-to-install-smartcogent). For more information about ZAN, please visit the [ZAN official website](https://zan.top).
![ZAN official website](/Images/SmartCogent/zan-official-website.png)
