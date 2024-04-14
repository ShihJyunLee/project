<!-- 相關條款 -->

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
    <p class="position-absolute top-50 start-50 translate-middle fs-1">相關條款</p>
  </div>

  <div class="container my-5">
    <p>我們非常重視您的隱私保護，並承諾保護您的個人信息安全。我們的隱私政策詳細說明了我們收集、使用和保護您的個人信息的方式。請您仔細閱讀我們的隱私政策以瞭解更多信息。</p>
    <div class="contact-info mt-5">
      <p><strong>使用條款:</strong></p>
      <p>這裡是我們的使用條款，包含了您在使用我們網站和服務時需遵守的規則和條件。請注意，使用我們的網站即表示您同意遵守這些條款。如果您有任何疑問，請聯絡我們的客服團隊。</p><br><br>
      <p><strong>退換貨政策:</strong></p>
      <p>我們提供優質的商品和服務，並致力於您的滿意度。如果您對購買的商品不滿意或需要退換貨，請仔細閱讀我們的退換貨政策，了解退換貨的流程和條件。</p><br><br>
      <p><strong>付款安全保證:</strong></p>
      <p>我們使用安全加密技術保護您的付款信息，以確保您在我們網站上的付款安全。請放心購物，我們致力於為您提供安全可靠的付款環境。</p><br><br>
      <p><strong>訂單取消與更改:</strong></p>
      <p>如果您需要取消或更改訂單，請在訂單確認後尽早聯絡我們。我們將盡最大努力滿足您的需求，但可能會根據訂單狀態和產品特性進行相應處理。</p><br><br>
      <p><strong>版權與知識產權:</strong></p>
      <p>我們尊重知識產權，所有在本網站上展示的內容（包括但不限於文字、圖片、影音等）均受到版權和知識產權法律的保護。未經授權，禁止擅自使用、轉載或修改上述內容。</p><br><br>
    </div>
  </div>
</template>
