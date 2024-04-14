<!-- 管理員 -->

<template>
  <AdministratorNavbar class="mt-5"></AdministratorNavbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import emitter from '@/methods/emitter.js'
import ToastMessages from '@/components/ToastMessages.vue'
import AdministratorNavbar from '@/components/AdministratorNavbar.vue'

export default {
  components: {
    ToastMessages,
    AdministratorNavbar
  },
  provide () { // 內層所有元件都能使用emitter功能
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')// 取出cookie
    this.$http.defaults.headers.common.Authorization = token// 將token指向headers裡面
    const api = `${process.env.VUE_APP_API}api/user/check`// 確認api是否持續登入的路徑
    this.$http.post(api, this.user)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('../login')// 如果登入狀態是失敗的，畫面轉回到登入頁面
        }
      })
  }
}
</script>
