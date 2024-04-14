<!-- 使用者商品列表 -->

<style scoped>
  .card:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* 設定滑鼠懸停時的陰影效果 */
    cursor: pointer; /* 讓滑鼠懸停時游標變成手指頭 */
    transform: scale(1.05); /* 使卡片內容放大 5% */
    transition: transform 0.3s ease; /* 添加縮放的過渡效果 */
  }

  .card:hover i {
    color: red; /* 或是您想要的其他顏色 */
    /* 或者您可以添加其他樣式，例如 text-shadow、背景色等 */
  }

  @media screen and (min-width: 768px) {
    .equal-size {
      min-height: 280px; /* 设置相同的高度 */
    }
  }
</style>

<template>
  <Loading :active="isLoading"></Loading>
  <div class="container mt-5">
    <div class="row mt-4">
      <div class="col-md-6 col-lg-5 mb-3">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn" :class="{ 'btn-outline-secondary': selectedCategory !== '全部產品', 'btn-secondary text-white': selectedCategory === '全部產品', 'active': selectedCategory === '全部產品' }" @click="filterAll()">全部產品</button>
          <button type="button" class="btn" :class="{ 'btn-outline-secondary': selectedCategory !== '日本', 'btn-secondary text-white': selectedCategory === '日本', 'active': selectedCategory === '日本' }" @click="filterProducts('日本')">日本</button>
          <button type="button" class="btn" :class="{ 'btn-outline-secondary': selectedCategory !== '韓國', 'btn-secondary text-white': selectedCategory === '韓國', 'active': selectedCategory === '韓國' }" @click="filterProducts('韓國')">韓國</button>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 ms-auto">
        <div class="input-group mb-3">
          <input type="text" class="form-control border-bottom border-0 rounded-0" placeholder="搜尋產品" v-model="searchInput">
          <span class="input-group-text">
            <i class="bi bi-search" @click="searchProducts()" style="cursor: pointer"></i>
          </span>
        </div>
      </div>
    </div>

    <div v-if="showFiltered">
      <div class="row">
        <div v-for="item in filteredProducts" :key="item.id" class="col-md-6 col-lg-3 mb-4">
          <div class="card" @click="getProduct(item.id)">
            <img :src="item.imageUrl" class="card-img-top equal-size" alt="Product Image">
            <div class="card-body">
              <h4 class="card-title font-weight-bold mb-4">{{ item.title }}</h4>
              <div class="price-section d-flex justify-content-between">
                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="h6" v-if="item.price">原價 NT${{ item.origin_price }} 元</del>
                <div class="h5 text-danger" v-if="item.price">NT${{ item.price }} 元</div>
              </div>
              <div class="text-end">
                <button type="button" class="btn" @click="addCart(item.id, $event)" :disabled="this.status.loadingItem === item.id">
                  <div class="spinner-border spinner-border-sm text-dark" role="status" v-if="this.status.loadingItem === item.id">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <i class="bi bi-cart" :class="{ 'text-danger': item.inCart }"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div v-for="item in products" :key="item.id" class="col-md-6 col-lg-3 mb-4">
          <div class="card" @click="getProduct(item.id)">
            <img :src="item.imageUrl" class="card-img-top equal-size" alt="Product Image">
            <div class="card-body">
              <h4 class="card-title font-weight-bold mb-4">{{ item.title }}</h4>
              <div class="price-section d-flex justify-content-between">
                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="h6" v-if="item.price">原價 NT${{ item.origin_price }} 元</del>
                <div class="h5 text-danger" v-if="item.price">NT${{ item.price }} 元</div>
              </div>
              <div class="text-end">
                <button type="button" class="btn" @click="addCart(item.id, $event)" :disabled="this.status.loadingItem === item.id">
                  <div class="spinner-border spinner-border-sm text-dark" role="status" v-if="this.status.loadingItem === item.id">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <i class="bi bi-cart" :class="{ 'text-danger': item.inCart }"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [], // 用來存放產品列表的陣列
      product: {}, // 用來存放單一產品的物件
      filteredProducts: [], // 存放篩選後的列表的数组
      selectedCategory: '全部產品', // 存放選中的分类
      showFiltered: false, // 控制顯示原始列表還是篩選後的列表
      searchInput: '', // 用來保存搜索關鍵字
      status: {
        loadingItem: '' // 對應品項 id
      }
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`// 取得後台products商品
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products // 將 API 回傳的產品列表存入 data 中的 products
        this.isLoading = false
        console.log(this.products)
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`) // 導航至特定產品頁面
    },
    addCart (id) {
      event.stopPropagation()
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id // 當點擊加入購物車時，該id會存到loadingItem，同時觸發v-bind，當loadingItem跟item.id同樣時會鎖起按鈕
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = '' // 當AJAX成功時，把儲存的id清掉，就會解鎖被鎖起來的按鈕
          this.$httpMessageState(res, '加入購物車')
        })
      const product = this.products.find(product => product.id === id)// 將該商品標記為已在購物車
      if (product) {
        product.inCart = true
      }
    },
    filterProducts (category) { // 篩選
      this.selectedCategory = category
      this.filteredProducts = this.products.filter(product => { // product這個參數指向products
        return product.category === this.selectedCategory
      })
      this.showFiltered = true
      this.getProducts()
      this.isLoading = false
    },
    filterAll () {
      this.showFiltered = false
      this.selectedCategory = '全部產品' // 添加 'active'
      this.getProducts()
    },
    searchProducts () {
      this.filteredProducts = this.products.filter(product => {
        return product.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
      this.showFiltered = true
      this.getProducts()
      this.isLoading = false
    }
  },
  created () {
    this.getProducts() // 重新整理頁面
  }
}
</script>
