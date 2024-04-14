<!-- 使用者 -->

<template>
  <ToastMessages></ToastMessages>
  <router-view/>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter // 該路由底下都能使用emitter
    }
  },
  created () {
  }
}
</script>
