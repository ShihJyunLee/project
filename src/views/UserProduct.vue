<!-- 使用者商品資訊 -->

<template>
  <Loading :active="isLoading"></Loading>
  <div class="mt-5"></div>
  <div class="container mt-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item"><router-link to="/user/cart">商品列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-6">
        <img :src="product.imageUrl" alt="天啊!圖片不見了QQ" class="img-fluid mb-3">
      </div>
      <div class="col-md-6">
        <div class="row d-flex flex-column h-100">
          <div class="col-12">
            <h2>{{ product.title }}</h2>
            <hr>
            <div class="mt-5">{{ product.description }}</div>
            <div class="mt-5">{{ product.content }}</div>
          </div>
          <div class="col-12 mt-5 mt-auto">
            <div class="d-flex align-items-center mt-3">
              <select v-model="selectedQuantity" class="form-select mt-2 mb-4 me-4 w-25">
                <option v-for="option in quantityOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <div class="h5 me-4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h5 me-3" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h5 text-danger" v-if="product.price"><strong>特價 {{ product.price }} 元</strong></div>
            </div>
            <div class="d-flex align-items-center">
              <button type="button" class="btn btn-outline-secondary mt-2 mb-4 me-3 w-75" @click="addToCart(product.id)">立即加到購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProductIllustrate />
</template>

<script>
import ProductIllustrate from '@/components/ProductIllustrate.vue'

export default {
  data () {
    return {
      product: {}, // 存儲商品詳細資訊的物件
      id: '', // 商品的ID
      quantityOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9], // 數量的選項列表
      selectedQuantity: 1 // 預設選擇的數量
    }
  },
  components: {
    ProductIllustrate // 引入子元件 ProductIllustrate
  },
  methods: { // 透過 API 取得商品資訊的方法
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product // 將取得的商品資訊存入 product 變數
        }
      })
    },
    // 將商品加入購物車的方法
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // 儲存商品id跟數量
      const cart = {
        product_id: id,
        qty: this.selectedQuantity
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, '加入購物車')// 顯示加入購物車的訊息
        this.$router.push('/user/cart')// 導向至購物車頁面
      })
    }
  },
  created () {
    this.id = this.$route.params.productId // 從路由中取得商品 ID
    this.getProduct()// 取得商品詳細資訊
  }
}
</script>
