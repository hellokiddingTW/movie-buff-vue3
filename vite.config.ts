import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/movie-buff-vue3/',
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    AutoImport({
      // 指定哪些 library/API 要自動 import
      imports: [
        'vue',
        'vue-router',
        'pinia',
        // 其他像 vue-i18n, @vueuse/core, vee-validate 等也可以加
        {
          // 你自己的 custom imports
          axios: [['default', 'axios']],
          '@/stores/auth': ['useAuthStore'],
          '@/composables/myComposable': ['useMyComposable'],
          // … 等等
        },
      ],
      dts: true, // 自動產生 TypeScript 聲明檔
      vueTemplate: true, // 讓 template 裡也能 auto import
    }),
    Components({
      // components 的自動 import
      resolvers: [
        // 比如 UI library 的內建 resolver，例如 ElementPlusResolver，或自己寫
      ],
      dirs: ['src/components', 'src/pages'],
      dts: true, // 自動產生 components 的 types 聲明檔
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
