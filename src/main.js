import { createApp } from 'vue'
import App from './App.vue'

// 引入 Tailwind CSS
import './style.css'
// 引入 UXD UI 样式
import '@koi-design/uxd-ui/styles/index.css'
// 引入 OpenIM SDK 样式
import 'open-im-sdk/dist/open-im-sdk.css'

// 引入 OpenIM SDK
import OpenIMSDK from 'open-im-sdk'

// 创建 Vue 应用
const app = createApp(App)

// 使用 OpenIM SDK 插件（会自动注册 Pinia、i18n 等）
app.use(OpenIMSDK, {
  locale: 'zh-CN',
  autoInitAudio: false,
})

// 挂载应用
app.mount('#app')
