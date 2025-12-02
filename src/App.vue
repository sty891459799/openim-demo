<template>
  <div class="app-container">
    <!-- 使用 OpenIM SDK 的主组件 -->
    <OpenIMApp 
      :user-id="userId"
      :initial-page="initialPage"
      :enable-auto-login="false"
      @page-change="onPageChange"
    />
    <!-- 测试发送消息按钮 -->
    <button 
      class="test-send-btn"
      @click="testSendMessage"
    >
      测试发送消息
    </button>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { OpenIMApp, PageState, useSendMessage, IMSDK, onSendMessage, onReceiveMessage } from 'open-im-sdk'

export default {
  name: 'App',
  components: {
    OpenIMApp,
  },
  setup() {
    // 引入 useSendMessage
    const { sendMessage } = useSendMessage()

    // 注册消息回调
    let unsubscribeSend = null
    let unsubscribeReceive = null

    onMounted(() => {
      // 注册发送消息回调
      unsubscribeSend = onSendMessage(({ message, status, recvID, groupID, error }) => {
        console.log('发送消息回调:', { 
          content: message.textElem?.content || message.contentType,
          status,
          recvID,
          groupID,
          error 
        })
      })

      // 注册接收消息回调
      unsubscribeReceive = onReceiveMessage(({ message, isCurrentConversation }) => {
        console.log('收到新消息:', {
          content: message.textElem?.content || message.contentType,
          sendID: message.sendID,
          isCurrentConversation,
        })
      })
    })

    onUnmounted(() => {
      // 组件卸载时取消注册
      unsubscribeSend?.()
      unsubscribeReceive?.()
    })

    // 测试发送消息方法
    const testSendMessage = async () => {
      try {
        // 1. 创建文本消息
        const { data: message } = await IMSDK.createTextMessage('Hello, 这是一条测试消息!')
        console.log('创建消息成功:', message)

        // 2. 发送消息给指定用户
        await sendMessage({
          message,
          recvID: '8075099339',
        })
        console.log('消息发送成功!')
      } catch (error) {
        console.error('发送消息失败:', error)
        alert('发送消息失败: ' + error.message)
      }
    }

    return {
      sendMessage,
      testSendMessage,
    }
  },
  data() {
    return {
      userId: '8075099339',  // 用户ID
      initialPage: PageState.LOGIN,
    }
  },
  methods: {
    onPageChange(page) {
      console.log('Page changed to:', page)
    },
  },
}
</script>

<style>
/* 确保应用占满全屏 */
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.test-send-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;
}

.test-send-btn:hover {
  background-color: #40a9ff;
}

.test-send-btn:active {
  background-color: #096dd9;
}
</style>
