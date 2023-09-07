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
  ]
})
