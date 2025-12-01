import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // 确保所有依赖使用同一个 Vue 实例
      'vue': resolve(__dirname, 'node_modules/vue'),
    },
    // 去重，确保只有一个 Vue 实例
    dedupe: ['vue', 'vue-i18n', 'pinia', '@vue/runtime-core', '@vue/runtime-dom', '@vue/reactivity'],
  },
  optimizeDeps: {
    // 预构建这些依赖，确保它们使用相同的 Vue
    include: ['vue', 'vue-i18n', 'pinia', '@koi-design/uxd-ui'],
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})

