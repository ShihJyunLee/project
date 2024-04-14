<!-- footer -->

<template>
<div class="footer container-fluid bg-secondary">
  <div class="container">
    <div class="row p-4">
      <div class="col-md-8">
        <div class="row">
          <div class="col-sm-6 mb-4 mb-md-0">
            <ul class="navbar-nav text-white">
              <li><router-link to="/about" class="text-light lh-lg">關於我們</router-link></li>
              <li><router-link to="/connection" class="text-light lh-lg">聯絡我們</router-link></li>
              <li><router-link to="/related" class="text-light lh-lg">相關條款</router-link></li>
              <li><router-link to="/privacy" class="text-light lh-lg">隱私權政策</router-link></li>
            </ul>
          </div>
          <div class="col-sm-6 mb-4 mb-md-0">
            <ul class="navbar-nav text-white">
              <li><router-link to="/transaction" class="text-white lh-lg">交易流程</router-link></li>
              <li class="text-white lh-lg">聯絡電話: 02-0000-0000</li>
              <li class="text-white lh-lg">電子信箱: HelloWorld@gmail.com</li>
              <li class="text-white lh-lg">公司地址: XX市XX區XX路XX號XX樓</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-4 d-flex justify-content-sm-end">
        <div class="flex-column d-flex justify-content-start">
          <ul class="nav text-white justify-content-between mb-3">
            <li class="navbar-nav">
              <a href="#">
                <i class="bi bi-facebook text-white" style="font-size: 2em"></i>
              </a>
            </li>
            <li class="navbar-nav">
              <a href="#">
                <i class="bi bi-instagram text-white" style="font-size: 2em"></i>
              </a>
            </li>
            <li class="navbar-nav">
              <a href="#">
                <i class="bi bi-youtube text-white" style="font-size: 2em"></i>
              </a>
            </li>
            <li class="navbar-nav">
              <a href="#">
                <i class="bi bi-envelope text-white" style="font-size: 2em"></i>
              </a>
            </li>
            <li class="navbar-nav">
              <a href="#">
                <i class="bi bi-line text-white" style="font-size: 2em"></i>
              </a>
            </li>
          </ul>
          <p class="text-white">©2024 Vue相關練習作品，無其他商業用途。</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
