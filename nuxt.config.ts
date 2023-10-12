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
  vite: {
    css: {
      preprocessorOptions: {
        // 导入scss预编译程序
        scss: {
          additionalData: `@use "@/assets/style/mixins.scss" as *;`,
        },
      },
    }
  },
  modules: [
    '@element-plus/nuxt'
  ],
  app: {
      head: {
        title: "前端笨鸟",
        meta: [
          { name: "description", content: "前端快捷导航和前端知识分享讨论" },
          { name: "keyword", content: "前端笨鸟" },
          { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' },
        ],
        link: [
          { rel: "icon", type: "image/svg+xml", href: "../logo.svg" }
        ]
      }
  }
})
