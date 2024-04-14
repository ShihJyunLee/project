<!-- 管理員導覽列 -->

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後臺管理</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard/products" class="nav-link active" aria-current="page">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/orders" class="nav-link">訂單確認</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/coupons" class="nav-link">優惠券</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
