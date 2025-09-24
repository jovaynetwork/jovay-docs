import { defineConfig } from "vitepress";
import markdownItMathjax3 from 'markdown-it-mathjax3'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jovay",
  description: "Docs for Jovay!",
  cleanUrls: true,

  markdown: {
    config: (md) => {
      md.use(markdownItMathjax3)
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet("src");
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
        text: "Developers",
        collapsed: false,
        items: [
          { text: "JSON-RPC API Methods", link: "/guide/json-rpc-api-methods" },
          { text: "Jovay Contracts", link: "/guide/jovay-contracts" },
          { text: "Using Jovay with Anvil", link: "/developer/jovay-anvil-guide" },

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
        ],
      },
      {
        text: "Guides",
        collapsed: false,
        items: [
          { text: "User Guide", link: "/guide/user-guide" },
          { text: "Developer Guide", link: "/guide/developer-guide" },
          { text: "Developer Quickstart", link: "/guide/developer-quickstart" },
          { text: "Jovay Bridge DApp Tutorial", link: "/guide/jovay-bridge-dapp-tutorial" },
          { text: "Jovay Explorer", link: "/guide/jovay-explorer" },
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
          { text: "Disclaimers", link: "/legal/disclaimer" },
       ],
     },
    ],

    socialLinks: [{ icon: "x", link: "https://x.com/Jovay_Network" }],

    footer: {
      copyright: "©2025 Copyright by Jovay, all rights reserved.",
    },
  },
});


