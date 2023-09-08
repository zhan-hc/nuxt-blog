// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://43.138.89.227:3000',
        changeOrigin: true
      }
    }
  },
  css: [
    '@/assets/style/main.css',
    '@/assets/style/index.scss'
  ],
  modules: [
    '@element-plus/nuxt'
  ],
  app: {
      head: {
        title: "前端笨鸟",
        meta: [
          { name: "description", content: "前端快捷导航和前端知识分享讨论" },
          { name: "keyword", content: "前端笨鸟" }
        ],
        link: [
          { rel: "icon", type: "image/png", href: "logo.png" }
        ]
      }
  }
})
