<!-- 聯絡我們 -->

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
    <p class="position-absolute top-50 start-50 translate-middle fs-1">聯絡我們</p>
  </div>

  <div class="container my-5">
    <p>我們非常重視您的意見和建議，如果您有任何疑問、反饋或合作意向，請隨時與我們聯絡。我們的客服團隊將竭誠為您提供支援和解答。</p>
    <div class="contact-info mt-5">
      <h3>您可以通過以下多種方式與我們聯絡：</h3>
      <p><strong>電子郵件：</strong></p>
      <p>一般查詢： <a href="HelloWorld@gmail.com">info@HelloWorlde.com</a></p>
      <p>客戶服務： <a href="HelloWorld@gmail.com">customerservice@HelloWorld.com</a></p>
      <p>合作提案： <a href="HelloWorld@gmail.com">partnerships@HelloWorld.com</a></p><br><br>
      <p><strong>客服熱線：</strong></p>
      <p>如果您有緊急問題或需要即時幫助，請撥打我們的客服熱線：<strong>+123-456-7890</strong></p><br><br>
      <p><strong>在線聊天：</strong></p>
      <p>我們提供即時在線聊天功能，您可以在網站右下角找到聊天視窗，與我們的客服人員即時交流。</p><br><br>
      <p><strong>社交媒體：</strong></p>
      <p>您也可以通過社交媒體平台與我們聯絡：</p>
      <p>Facebook： <a href="https://www.facebook.com/HelloWorld" target="_blank">@HelloWorldWebsite</a></p>
      <p>Instagram： <a href="https://www.instagram.com/HelloWorld" target="_blank">@HelloWorldInstagram</a></p>
      <p>Twitter： <a href="https://twitter.com/HelloWorld" target="_blank">@HelloWorldTwitter</a></p>
    </div>
  </div>
</template>
