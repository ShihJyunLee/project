<!-- 管理員登入 -->

<style scoped>
.form-control{
  border-top: none;
  border-left: none;
  border-right: none;
}
.border{
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2)
}
</style>

<template>
  <Loading :active="isLoading"></Loading>
  <div class="container d-flex justify-content-center align-items-center no-scroll center-content my-background" style="min-height: 100vh;">
    <form class="col-md-6 p-5 border" @submit.prevent="signIn" style="background-color: rgba(255, 255, 255, 0.5)">
      <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
      <div class="mb-2">
        <label for="inputEmail" class="sr-only"></label>
        <div class="input-group">
          <div class="input-group-text" style='background: none; border: none'>✉️</div>
          <input
            type="email"
            id="inputEmail"
            class="form-control border"
            placeholder="輸入電子信箱"
            required
            autofocus
            v-model="user.username"
          />
        </div>
      </div>
      <div class="mb-2">
        <label for="inputPassword" class="sr-only"></label>
        <div class="input-group">
          <div class="input-group-text" style='background: none; border: none'>🔒</div>
          <input
            id="inputPassword"
            class="form-control border"
            placeholder="輸入密碼"
            required
            v-model="user.password"
            :type="showPassword ? 'text' : 'password'"
          />
          <div class="input-group-text" style='background: none; border: none; cursor: pointer;' @click="toggleShowPassword">
            {{ showPassword ? '🙉' : '🙈' }} <!-- 根據 showPassword 的值顯示不同的圖標，如果 showPassword 為真，則 type 設為 'text'，否則設為 'password'。-->
          </div>
        </div>
      </div>

      <div class="text-end mt-4">
        <button class="btn btn-lg btn-primary btn-block border" type="submit">登入</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      apiResult: '', // 儲存api回傳結果
      isLoading: false, // 讀取進度條
      showPassword: false// 是否顯示密碼的標誌
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.isLoading = true
      this.$http.post(api, this.user)// 前者api網址，後者傳送過去的資料
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data// 解構賦值，從res.data提取token跟expired的值並賦予變數token跟expired上
            document.cookie = `hexToken=${token}; expires=${new Date(expired)};`// 新增一個cookie並將token放到其中，token是字符串，他包含一些加密或編碼的用戶信息，expires是到期時間，另外hexToken是自訂義名稱
            // 啟用通知
            this.$notify({
              title: '登入成功',
              type: 'success',
              duration: 4000// 持續時間
            })
            this.$router.push('/dashboard/products')// 當登入成功畫面挑轉到dashboard
          } else {
            this.$notify({
              title: '登入失敗',
              text: '帳號或密碼錯誤',
              type: 'error',
              duration: 4000
            })
          }
          this.isLoading = false
        })
    },
    toggleShowPassword () {
      this.showPassword = !this.showPassword // 點擊時切換 showPassword 的值
    }
  },
  mounted () {
    // 進入組件時，設定body的背景樣式
    document.querySelector('body').style.background = `url(${require('@/assets/UserLogin.webp')})`// 導入圖片
    document.querySelector('body').style.backgroundSize = 'cover'
    document.querySelector('body').style.backgroundRepeat = 'no-repeat'
    document.querySelector('body').style.backgroundAttachment = 'fixed'
    document.querySelector('body').style.overflow = 'hidden'
  },
  beforeUnmount () {
    // 離開組件時，還原body的樣式
    document.querySelector('body').removeAttribute('style')
  }
}
</script>
