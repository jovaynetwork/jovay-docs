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
        text: "Learn about Jovay",
        collapsed: false,
        link: "/guide/learn-about-jovay",
        items: [
          { text: "About Jovay", link: "/guide/about-jovay" },
          { text: "DTVM", link: "/guide/dtvm" },
          { text: "Explorer", link: "/guide/explorer" },
        ],
      },
      { text: "Jovay Layer 2 Whitepaper", link: "/guide/whitepaper" },
      { text: "SmartCogent Introduction", link: "/guide/smartcogent" },
      {
        text: "How to access the devnet",
        link: "/guide/how-to-access-the-devnet",
      },
      { text: "Disclaimer", link: "/guide/disclaimer" },
    ],

    socialLinks: [{ icon: "x", link: "https://x.com/Jovay_Network" }],

    footer: {
      copyright: "©2025 Copyright by Jovay, all rights reserved.",
    },
  },
});
