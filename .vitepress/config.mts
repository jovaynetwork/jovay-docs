import { defineConfig } from "vitepress";
import markdownItMathjax3 from 'markdown-it-mathjax3'
import fs from 'fs';

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
        // if image is svg, read svg file from public folder
        if (src?.endsWith(".svg")) {
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
            link: "/developer/integration/how-to-use-chainlink-datastream",
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
  }
});

