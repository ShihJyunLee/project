<!-- 吐司訊息 -->
<style scoped>
.custom-toast {
  position: fixed;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
}
</style>

<template>
  <!-- 定位使用 -->
  <div class="toast-container position-absolute custom-toast">
    <!-- 列表呈現，傳送messages資料到Toast，內層吐司元件載入回來後再用v-for逐一呈現 -->
    <!-- :msg="msg"，前面msg是內層props接收物件的名稱，後面msg是傳遞過去的資料-->
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg"/>
  </div>
</template>

<script>
import Toast from '@/components/ToastComponents.vue'

export default {
  components: { Toast },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'], // 使用外層的emitter
  mounted () {
    // push-message每次觸發都會執行這項程式，將訊息加入到訊息列表，messages是外部傳來的資訊
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message// 解構賦值，提取 style、title 和 content，如果 style 沒有提供，則使用預設值 'success'
      this.messages.push({ style, title, content })// 解構後的屬性組成新的物件，並將其推送到 this.messages 陣列中
    })
  }
}
</script>
