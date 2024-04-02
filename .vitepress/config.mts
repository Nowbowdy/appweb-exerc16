import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Exercice 16",
  description: "Revue de code documentée",
  base: '/appweb-exerc16/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Accueil', link: '/' }
    ],

    sidebar: [
      {
        text: 'Revue du code à',
        items: [
          { text: 'Mikaël Charette', link: '/mikael-charette' },
          { text: 'Zachary Vandermeerschen', link: '/zachary-vandermeerschen' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
