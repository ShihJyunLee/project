<!-- 主畫面導覽列 -->

<template>
  <Loading :active="isLoading"></Loading>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark fixed-top opacity-75">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand ms-4 text-light">Miko select</router-link>
    <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ms-auto me-4">
        <li class="nav-item">
          <router-link to="/user/cart" class="nav-link me-3 text-light active" aria-current="page" href="#">商品資訊</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/user/shopping" class="nav-link me-3 text-light" href="#">購物車</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link me-3 text-light">關於我們</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            後臺管理
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><router-link to="/login" class="dropdown-item">管理員登入</router-link></li>
            <li><a class="dropdown-item" href="#" @click.prevent="logout">登出</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`// 登出API路徑
      this.isLoading = true
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          this.$router.push('/login')// 成功登出會跳轉頁面
          this.isLoading = false
          this.$notify({
            title: '登出成功',
            type: 'success',
            duration: 4000
          })
        }
      })
    }
  }
}
</script>
