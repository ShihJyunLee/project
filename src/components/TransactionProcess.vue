<!-- 交易流程 -->

<style scoped>
  body {
    font-family: 'Microsoft JhengHei', sans-serif;
    background-color: #f8f9fa;
  }

  .container {
    max-width: 800px;
    margin: 0 auto; /*容器在水平方向上居中對齊*/
    padding: 20px;
    text-align: center;
  }

  .contact-info {
    text-align: left;
    margin-top: 20px;
  }

  .contact-info h3 {
    margin-bottom: 10px;
  }

  .contact-info p {
    margin-bottom: 5px;
  }

  .contact-info a {
    color: #007bff;
    text-decoration: none;
  }

  .contact-info a:hover {
    text-decoration: underline;
  }
</style>

<template>
    <div class="position-relative">
    <img src="@/assets/Sea.jpg" alt="天啊!!!圖片不見了QQ" class="top-50 w-100" style="object-fit: cover; height: 30vh">
    <p class="position-absolute top-50 start-50 translate-middle fs-1">交易流程</p>
  </div>

  <div class="container my-5">
    <p>歡迎光臨我們的網站！我們提供簡單、安全、便捷的購物流程，讓您輕鬆購買所需的商品。</p>
    <div class="contact-info mt-5">
      <p><strong>選擇商品:</strong></p>
      <p>在我們的網站上瀏覽您感興趣的商品，並將其加入購物車。您可以隨時查看購物車內的商品，調整數量或移除不需要的商品。</p><br><br>
      <p><strong>結算訂單:</strong></p>
      <p>當您確定購買商品時，請進入結算頁面填寫收貨信息和付款方式。我們支持多種付款方式，包括信用卡、支付寶、微信支付等。</p><br><br>
      <p><strong>付款確認:</strong></p>
      <p>完成付款後，您將收到訂單確認郵件，表示您的訂單已經成功提交。我們將開始處理您的訂單並安排發貨。</p><br><br>
      <p><strong>訂單處理:</strong></p>
      <p>我們將盡快處理您的訂單，包括確認庫存、配送商品、生成發貨單等。您可以隨時登錄您的帳戶查看訂單狀態。</p><br><br>
      <p><strong>物流追蹤:</strong></p>
      <p>一旦您的訂單發貨，我們將提供物流追蹤信息，讓您隨時跟蹤您的包裹運送情況。您也可以通過客服熱線查詢訂單物流信息。</p><br><br>
      <p><strong>收貨驗收:</strong></p>
      <p>當您收到包裹時，請仔細檢查商品是否完好無損。如有任何問題或瑕疵，請及時與我們聯絡，我們將竭誠為您解決問題。</p><br>
      <p>我們致力於為您提供優質的購物體驗，如果您在購物過程中遇到任何問題或需要幫助，請隨時聯絡我們的客服團隊。</p>
    </div>
  </div>
</template>
