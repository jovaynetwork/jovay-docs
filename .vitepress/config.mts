import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jovay",
  description: "Docs for Jovay!",
  cleanUrls: true,

  markdown: {
    config: (md) => {
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet("src");
        const alt = token.content;
        return `<CustomImage src="${src}" alt="${alt}" />`;
      };
    },
  },

  head: [
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
        text: "Developers",
        collapsed: false,
        items: [
          { text: "JSON-RPC API Methods", link: "/guide/json-rpc-api-methods" },
          { text: "Jovay Contracts", link: "/guide/jovay-contracts" },
          
          { text: "Foundry Tutorial",
//          link: "/guide/foundry-tutorial",
            collapsed: true,
            items: [
              { text: "Create and Deploy Your First Token", link: "/guide/token-foundry" },
              { text: "Create and Deploy Your First NFT", link: "/guide/nft-foundry" },
              { text: "Create and Deploy a Simple Staking Contract", link: "/guide/contract-foundry" },
            ],
          },
          { text: "Hardhat Tutorial",
//          link: "/guide/hardhat-tutorial"
            collapsed: true,
            items: [
              { text: "Create and Deploy Your First Token", link: "/guide/token-hardhat" },
              { text: "Create and Deploy Your First NFT", link: "/guide/nft-hardhat" },
              { text: "Build and Deploy a Simple Staking Contract", link: "/guide/contract-hardhat" },
            ],
          },

        ],
      },
      {
        text: "Guides",
        collapsed: false,
        items: [
          { text: "Developer Quickstart", link: "/guide/developer-quickstart" },
          
        ],
      },
      {
        text: "Testnet Resources",
        collapsed: false,
        items: [
          { text: "Jovay Explorer", link: "/guide/jovay-explorer" },
          
        ],
      },
    ],

    socialLinks: [{ icon: "x", link: "https://x.com/Jovay_Network" }],

    footer: {
      copyright: "©2025 Copyright by Jovay, all rights reserved.",
    },
  },
});


