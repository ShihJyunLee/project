<!-- 主畫面/內容 -->

<style lang="css">
  .title {
    color: rgba(255, 0, 0, 0.5);
    text-align: center
  }

  .navbar-nav a {
    text-decoration: none;
    font-size: 16px; /* 初始字體大小 */
    transition: font-size 0.3s ease; /* 動畫效果，可自行調整持續時間和動畫函數 */
  }

  .navbar-nav a:hover {
    font-size: 18px; /* 移動到連結時的字體大小 */
  }

  .animate-btn {
    animation: blink 0.5s infinite alternate; /* 定义闪烁动画 */
  }

  @keyframes blink {
    from {
      background-color: #dc3545; /* 初始颜色 */
    }
    to {
      background-color: #f49393; /* 闪烁颜色 */
    }
  }
</style>

<template>
  <div class="card mt-5 w-75 mx-auto">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="@/assets/CardJapan.jpg" class="img-fluid rounded-start" alt="天啊!!!圖片不見了QQ">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"><strong>Newyork perfect cheese 紐約起司餅乾 東京車站大人氣！</strong></h5>
        <p class="card-text"><strong>
          <br>◆ 起司×鮮奶油×白巧克力，最強組合難以超越！
          <br>◆ 席捲東京車站～每日尚未營業就大排長龍！
          <br>◆ 由美、日、法的起司大師聯手研發，正統奶油起司脆餅
        </strong></p>
        <p class="card-text">
          <br>添加了高達起司的貓舌餅乾
          <br>包裹著滑順的鮮奶油內餡以及融合了黃金比例起司的整塊白巧克力
          <br>甘甜中帶著奶香，濃而不膩百吃不厭！
          <br>多層次的起司風味來征服你的心啦~~
        </p>
        <p class="card-text"><small class="text-muted">
          <br>＊此為日本直送商品，詳見下方注意事項唷
          <br>＊本品因效期較短，為保持最佳風味將不會與其他商品合併出貨，若欲購買站上其他商品請另外下單</small></p>
      </div>
    </div>
  </div>
</div>

<div class="card mt-5 w-75 mx-auto">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="@/assets/CardJapan-2.jpg" class="img-fluid rounded-start" alt="天啊!!!圖片不見了QQ">
    </div>
    <div class="col-md-8" >
      <div class="card-body">
        <h5 class="card-title"><strong>擁有超高人氣的 日本北海道Royce生巧克力！</strong></h5>
        <p class="card-text"><strong>
          <br>◆ Royce具代表性商品！
          <br>◆ 高品質生產及嚴格衛生標準!
          <br>◆ 香醇綿密的甜味席捲整個味蕾!
        </strong></p>
        <p class="card-text">
          <br>使用大量的北海道生奶油
          <br>吃起來柔軟的口感和潤滑的入口即溶極具吸引力
          <br>善用洋酒的特性發揮可可亞的美味
          <br>歡迎來選購您喜歡的口味
        </p>
        <p class="card-text"><small class="text-muted">
          <br>＊此為日本直送商品，詳見下方注意事項唷
          <br>＊本品因效期較短，為保持最佳風味將不會與其他商品合併出貨，若欲購買站上其他商品請另外下單</small></p>
      </div>
    </div>
  </div>
</div>

<div class="text-center">
  <h1 class="title mt-5">各地精品零食，隨時隨地都能下單!</h1>
    <img src="@/assets/AnyTime.jpg" alt="天啊!!!圖片不見了QQ" class="img-fluid w-75 mx-auto">
  <h1 class="title mb-5"><router-link to="/user/cart" class="text-decoration-none link-danger">立即開始選購吧!</router-link></h1>
</div>

<button type="button" class="btn text-white position-fixed bottom-0 end-0 rounded-5 me-4 mb-4 animate-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">點擊領取優惠碼</button>
  <div class="modal fade" ref="exampleModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger" id="exampleModalLabel">全館限時優惠，輸入以下優惠碼，商品通通8折起</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          smile
        </div>
      </div>
    </div>
  </div>

</template>
