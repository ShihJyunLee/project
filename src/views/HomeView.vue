<!-- 主畫面 -->

<template>
  <div>
    <CarouselMenu></CarouselMenu>
    <BodyMenu></BodyMenu>
  </div>
</template>

<script>
import CarouselMenu from '@/components/CarouselMenu.vue'
import BodyMenu from '@/components/BodyMenu.vue'

export default {
  components: {
    CarouselMenu,
    BodyMenu
  }
}
</script>
