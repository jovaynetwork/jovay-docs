import { defineConfig } from "vitepress";
import markdownItMathjax3 from 'markdown-it-mathjax3'
import fs from 'fs';
import path from 'path';

/**
 * 收集项目根下所有 .md 相对路径（排除 node_modules / .vitepress / .git），
 * 用于 buildEnd 写入 dist/<相对路径>（与 html 同级），实现「按页」提供原文，不打入客户端 bundle。
 */
function collectMdRelPaths(rootDir: string): string[] {
  const skipDirs = new Set(['node_modules', '.git', '.vitepress'])
  const result: string[] = []
  function walk(dir: string) {
    let entries: fs.Dirent[]
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (!skipDirs.has(e.name)) walk(full)
      } else if (e.isFile() && e.name.endsWith('.md')) {
        result.push(path.relative(rootDir, full))
      }
    }
  }
  walk(rootDir)
  return result
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jovay Docs",
  description: "Docs for Jovay!",
  cleanUrls: true,

  markdown: {
    config: (md) => {
      md.use(markdownItMathjax3)
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet("src");
        // if image is svg and is a local path (not external URL), read svg file from public folder
        if (src?.endsWith(".svg") && !src.startsWith("http://") && !src.startsWith("https://")) {
          // read svg file from public folder
          const svg = fs.readFileSync(`public/${src}`, "utf-8");
          return svg;
        }
        const alt = token.content;
        return `<CustomImage src="${src}" alt="${alt}" />`;
      };
    },
  },

  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-HH2VW9FRN9",
      },
    ],
    // 埋点脚本
    [
      "script",
      {},
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-HH2VW9FRN9');
    `,
    ],
    // 设置搜索默认使用详细列表模式
    [
      "script",
      {},
      `
      // 设置搜索默认使用详细列表模式（在页面加载前设置，确保搜索组件初始化时使用）
      if (typeof window !== 'undefined' && window.localStorage) {
        const searchModeKey = 'vitepress:local-search-detailed-list';
        if (!localStorage.getItem(searchModeKey)) {
          localStorage.setItem(searchModeKey, 'true');
        }
      }
    `,
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Guide", link: "/guide/about-jovay" }],

    sidebar: [
      {
        text: "Introduction",
        collapsed: false,
        items: [
          { text: "About Jovay", link: "/guide/about-jovay" },
          { text: "Technical Whitepaper", link: "/guide/jovay-white-paper" },
        ],
      },
      {
        text: "Guides",
        collapsed: false,
        items: [
          { text: "User Guide", link: "/guide/user-guide" },
          { text: "Developer Guide", link: "/guide/developer-guide" },
          { text: "Developer Quickstart", link: "/guide/developer-quickstart" },
          {
              text: "Jovay CLI",
              collapsed: true,
              items: [
                  {
                      text: "Getting Started",
                      link: "/guide/jovay-cli/getting-started",
                  },
                  {
                      text: "CLI Overview",
                      link: "/guide/jovay-cli/cli-overview",
                  },
                  {
                      text: "jovay network",
                      link: "/guide/jovay-cli/jovay-network",
                  },
                  {
                      text: "jovay wallet",
                      link: "/guide/jovay-cli/jovay-wallet",
                  },
                  {
                      text: "jovay transaction",
                      link: "/guide/jovay-cli/jovay-transaction",
                  },
                  {
                      text: "jovay contract",
                      link: "/guide/jovay-cli/jovay-contract",
                  },
                  {
                      text: "jovay dapp",
                      link: "/guide/jovay-cli/jovay-dapp",
                  },
              ]
          },
          { text: "Jovay Bridge DApp Tutorial", link: "/guide/jovay-bridge-dapp-tutorial" },
          { text: "Jovay RPC Node", link: "/guide/jovay-rpc-node" },
          { text: "Jovay Explorer", link: "/guide/jovay-explorer" },
        ],
      },
      {
        text: "Developers",
        collapsed: false,
        items: [
          { text: "JSON-RPC API Methods", link: "/guide/json-rpc-api-methods" },
          { text: "Jovay Contracts", link: "/guide/jovay-contracts" },
          { text: "Using Jovay with Anvil", link: "/developer/jovay-anvil-guide" },
          { text: "Jovay CLI Tutorial", link: "/guide/jovay-cli-quickstart" },
          {
            text: "Foundry Tutorial",
            //          link: "/guide/foundry-tutorial",
            collapsed: true,
            items: [
              {
                text: "Create and Deploy Your First Token",
                link: "/guide/token-foundry",
              },
              {
                text: "Create and Deploy Your First NFT",
                link: "/guide/nft-foundry",
              },
              {
                text: "Create and Deploy a Simple Staking Contract",
                link: "/guide/contract-foundry",
              },
            ],
          },
          {
            text: "Hardhat Tutorial",
            //          link: "/guide/hardhat-tutorial"
            collapsed: true,
            items: [
              {
                text: "Create and Deploy Your First Token",
                link: "/guide/token-hardhat",
              },
              {
                text: "Create and Deploy Your First NFT",
                link: "/guide/nft-hardhat",
              },
              {
                text: "Build and Deploy a Simple Staking Contract",
                link: "/guide/contract-hardhat",
              },
            ],
          },
          { text: "Jovay Bridge Developer Reference", link: "/developer/jovay-bridge-developer-reference" },
          { text: "Network Information", link: "/developer/network-information" },
          {
            text: "Jovay Integration Tutorials",
            collapsed: true,
            items: [
              {
                text: "Jovay dApp Frontend Integration",
                link: "/developer/integration/jovay-dapp-viem-integration-tutorial",
              },
            ],
          },
          {
            text: "Verify Contract On Explorer", link: "/developer/verify-contract-guide"
          },
          {
            text: "Chainlink Integration",
            collapsed: true,
            items: [
              {
                text: "Overview",
                link: "/developer/chainlink/",
              },
              {
                text: "Data Streams",
                link: "/developer/chainlink/data-streams",
              },
              {
                text: "CCIP Overview",
                link: "/developer/chainlink/ccip-overview",
              },
              {
                text: "CCIP Message Transfer",
                link: "/developer/chainlink/ccip-message-transfer",
              },
              {
                text: "CCIP Token Transfer",
                link: "/developer/chainlink/ccip-token-transfer",
              },
              {
                text: "CCIP Token Manager",
                link: "/developer/chainlink/ccip-token-manager",
              },
              {
                text: "CCIP Network Information",
                link: "/developer/chainlink/ccip-network-information",
              },
            ],
          },
          {
            text: "Data Provider",
            collapsed: true,
            items: [
              {
                text: "ERC20 Transaction Data",
                link: "/developer/data-provider/erc20-transaction-data",
              },
            ],
          },
          {
            text: "Account Abstraction",
            collapsed: true,
            items: [
              {
                text: "ERC-4337 Tutorial",
                link: "/developer/jovay-erc4337-tutorial",
              },
            ],
          },
        ],
      },
      {
        text: "Resources",
        collapsed: false,
        items: [
          { text: "Audit Reports", link: "/resources/audit-reports" },
          { text: "Auxiliary Contracts", link: "/resources/auxiliary-contracts" },
        ],
      },
     {
       text: "Legal",
       collapsed: false,
       items: [
          { text: "Terms of Service", link: "/legal/terms-of-service" },
          { text: "Privacy Policy", link: "/legal/privacy-policy" },
          { text: "Brand Usage Policy", link: "/legal/brand-usage-policy" },
          // { text: "Disclaimers", link: "/legal/disclaimer" },
       ],
     },
    ],

    socialLinks: [{ icon: "x", link: "https://x.com/Jovay_Network" }],

    footer: {
      copyright: "©2025 Copyright by Jovay, all rights reserved.",
    },

    search: {
      provider: 'local'
    }
  },

  sitemap: {
    hostname: 'https://docs.jovay.io',
    transformItems: (items) => {
      items = [];
      items.push({
        url: '/guide/user-guide',
        changefreq: 'weekly',
        priority: 1,
      });
      items.push({
        url: '/guide/jovay-white-paper',
        changefreq: 'weekly',
        priority: 0.9,
      });
      items.push({
        url: 'https://explorer.jovay.io',
        changefreq: 'weekly',
        priority: 0.8,
      });
      items.push({
        url: '/guide/user-guide',
        changefreq: 'weekly',
        priority: 0.7,
      });
      items.push({
        url: 'https://jovay.io',
        changefreq: 'weekly',
        priority: 0.6,
      });
      return items;
    },
  },

  /**
   * 构建结束后把每篇 md 复制到 dist/<相对路径>，与对应 .html 同级。
   * 同时满足：VitePress local search 的 GET /guide/xxx.md、CopyPageButton fetch(base + filePath)。只保留一份，不再使用 /raw。
   */
  async buildEnd() {
    const root = process.cwd()
    const distDir = path.join(root, '.vitepress', 'dist')
    if (!fs.existsSync(distDir)) {
      return
    }
    // 历史构建可能留下 raw/，已废弃，删掉避免部署目录里多一套重复 md
    const legacyRaw = path.join(distDir, 'raw')
    if (fs.existsSync(legacyRaw)) {
      fs.rmSync(legacyRaw, { recursive: true })
    }
    const relPaths = collectMdRelPaths(root)
    for (const rel of relPaths) {
      const srcPath = path.join(root, rel)
      const dest = path.join(distDir, rel)
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.copyFileSync(srcPath, dest)
    }
  },
});

