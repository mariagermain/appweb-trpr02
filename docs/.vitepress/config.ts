import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "appweb-trpr02-vitepress",
  description: "Vitepress pour la revue de code",
  base: "/appweb-trpr02/appweb-trpr02/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Revue de code de Maria', link: '/rdc-maria' },
      { text: 'Revue de code de Théo', link: '/rdc-theo'}
    ],

    sidebar: [
      {
        items: [
          { text: 'Revue de code de Maria', link: '/rdc-maria' },
          { text: 'Revue de code de Théo', link: '/rdc-theo'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
