import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jovay",
  description: "Docs for Jovay!",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/about-jovay' }
    ],

    sidebar: [
//      {
//        text: 'Guide',
//        items: [
          { text: 'About Jovay', link: '/guide/about-jovay' },
          { text: 'Jovay Layer2 Whitepaper', link: '/guide/jovay-layer2-whitepaper' },
          { text: 'Learn about Jovay', link: '/guide/learn-about-jovay' },
          { text: 'SmartCogent Introduction', link: '/guide/smartCogent-introduction' },
          { text: 'How to access the devnet', link: '/guide/how-to-access-the-devnet' }
//        ]
//      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZanTeam/bulgari-docs' }
    ]
  },
})
