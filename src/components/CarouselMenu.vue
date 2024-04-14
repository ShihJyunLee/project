<!-- 輪轉圖 -->

<style scoped>
  @media (min-width: 768px) {
    /* 如果螢幕寬度大於等於 768px，套用以下樣式 */
    .carousel-item img {
      height: 40vh;
    }
  }
</style>

<template>
  <div id="carouselExampleIndicators" class="carousel slide carousel-fade carousel-dark" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="3000">
      <img src="@/assets/Japan-1.jpg" class="d-block w-100 mx-auto img-fluid" alt="天啊!!!圖片不見了QQ" title="白色戀人" style="object-fit: cover;">
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src="@/assets/Japan-2.jpg" class="d-block w-100 mx-auto img-fluid" alt="天啊!!!圖片不見了QQ" title="名古屋蝦餅" style="object-fit: cover;">
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src="@/assets/Hongkong.jpg" class="d-block w-100 mx-auto img-fluid" alt="天啊!!!圖片不見了QQ" title="甘草檸檬" style="object-fit: cover;">
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src="@/assets/Belgium.jpg" class="d-block w-100 mx-auto img-fluid" alt="天啊!!!圖片不見了QQ" title="比利時巧克力" style="object-fit: cover;">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<br>
</template>
