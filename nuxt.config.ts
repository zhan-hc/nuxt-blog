// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://www.janus-c.top/blog',
        changeOrigin: true
      }
    }
  },
  css: [
    '@/assets/style/main.css',
    '@/assets/style/index.scss'

  ],
  modules: [
    'janus-ui-nuxt'
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
  app: {
    head: {
      title: "前端笨鸟",
      meta: [
        { name: "description", content: "前端笨鸟的个人博客，收录了一些常用技术快捷导航以及个人开发项目" },
        { name: "keyword", content: "前端笨鸟" },
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "http://oss.janus-c.top/logo/logo-link.svg" }
      ]
    }
  }
})
