<!-- 關於我們 -->

<style scoped>
  .h1 {
    font-size: 4rem; /* 設置字體大小，你可以根據需要調整 */
    color: rgba(255, 255, 255, 0.7); /* 設置文字顏色為白色並設置透明度 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 設置陰影效果，你可以根據需要調整陰影的位置和模糊度 */
  }
  p {
  line-height: 4; /* 調整行距，根據需要調整數值 */
}
.last-section {
    text-align: center;
    margin-top: 1rem; /* 可以根據需要調整上邊距 */
    margin-bottom: 1rem; /* 可以根據需要調整下邊距 */
  }

</style>

<template>
  <div class="position-relative">
    <img src="@/assets/Sea.jpg" alt="天啊!!!圖片不見了QQ" class="top-50 w-100" style="object-fit: cover; height: 30vh">
    <p class="position-absolute top-50 start-50 translate-middle fs-1">關於我們</p>
  </div>

  <section class="container-fluid my-5 d-flex justify-content-center">
    <div class="row">
      <div class="col-md-6">
        <div class="h1 text-center mb-4">ABOUT</div>
        <p class="text-center" data-aos="slide-left">
          穿梭於世界的邊緣，品味每個地方的獨特滋味。<br>
          在陌生的街頭，我發現了一種旅行美學<br>
          不在遠方的風景，而是在當地的獨特之處。<br>
          讓我們一同踏上這場奇幻旅途，發現未知驚喜<br>
          並用心感受每個城市的獨特旋律。
        </p>
      </div>
      <div class="col-md-6 text-center">
        <img src="@/assets/AboutUs-1.jpg" alt="天啊!!!圖片不見了QQ"  class="img-fluid" style="width: 40vh; height: 40vh;">
      </div>
    </div>
  </section>

  <section class="container-fluid my-5 d-flex justify-content-center">
    <div class="row">
      <div class="col-md-6 order-md-1">
        <div class="h1 text-center mb-4">Brand</div>
        <p class="text-center" data-aos="slide-left">
          翩翩品牌，穿越時尚之巔。<br>
          風華再現，散發獨特魅力。<br>
          與我們一同，品味品牌的奢華旅程。<br>
        </p>
      </div>
      <div class="col-md-6 text-center order-md-0 mb-5">
        <img src="@/assets/AboutUs-2.jpg" alt="天啊!!!圖片不見了QQ"  class="img-fluid" style="width: 40vh; height: 40vh;">
      </div>
    </div>
  </section>
</template>
