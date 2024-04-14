<template>
  <NavbarMenu></NavbarMenu>
  <router-view/>
  <notifications position="bottom center" />
  <FooterComponents v-if="showFooter"></FooterComponents>
</template>

<script>
import NavbarMenu from '@/components/NavbarMenu.vue'
import FooterComponents from '@/components/FooterComponents.vue'

export default {
  watch: {
    $route (to, from) {
      this.showFooter = to.meta.showFooter !== false
    }
  },
  data () {
    return {
      showFooter: true
    }
  },
  components: {
    NavbarMenu,
    FooterComponents
  }
}
</script>

<style>
  body {
    display: flex;          /* 使用 Flexbox 佈局 */
    flex-direction: column; /* 垂直方向排列子元素 */
    min-height: 100vh;      /* 最小高度為視窗高度的 100% */
    margin: 0;              /* 去掉預設的 body 邊距 */
  }

  #app {
    flex: 1;                 /* 充滿剩餘空間，使 Footer 被推到底部 */
    display: flex;          /* 使用 Flexbox 佈局 */
    flex-direction: column; /* 垂直方向排列子元素 */
  }

  .footer {
    margin-top: auto;        /* 將 margin-top 設為 auto，將 Footer 推到底部 */
  }

</style>
