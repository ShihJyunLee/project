<!-- 吐司列表 -->

<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header">
      <!-- 依照msg.style屬性不同來變更顏色 -->
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast'

export default {
  name: 'ToastComponent',
  props: [
    'msg'
  ],
  mounted () {
    const toastEl = this.$refs.toast// 指向這整個吐司元件
    const toast = new Toast(toastEl, {
      delay: 2000
    })
    toast.show()
  }
}
</script>
