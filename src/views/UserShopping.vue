<!-- 購物車列表 -->
<style scoped>
  .line {
    position: absolute;
    top: 50%;
    right: -15px; /* 根據需要調整線的位置 */
    height: 2px;
    width: 15px; /* 根據需要調整線的長度 */
    background-color: #000; /* 根據需要調整線的顏色 */
  }
  .custom-bg {
    background-color: #ffe6cc; /* 设置你想要的颜色 */
  }
</style>

<template>
  <Loading :active="isLoading"></Loading>
  <div class="container mt-5">
    <div class="mt-5"></div>
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item"><router-link to="/user/cart">商品列表</router-link></li>
        <li class="breadcrumb-item">購物車</li>
      </ol>
    </nav>

    <div class="mt-5">
      <h2 class="text-center mb-4">結帳流程</h2>
      <div class="text-center text-nowrap">
        <div class="d-inline-block">
          <div class="border rounded rounded-4 p-2 me-3 position-relative bg-secondary text-white">確認品項
            <div class="line"></div>
          </div>
        </div>
        <div class="d-inline-block">
          <div class="border rounded rounded-4 p-2 me-3 position-relative">填寫資料
            <div class="line"></div>
          </div>
        </div>
        <div class="d-inline-block">
          <div class="border rounded rounded-4 p-2 me-3 position-relative">前往付款
            <div class="line"></div>
          </div>
        </div>
        <div class="d-inline-block">
          <div class="border rounded rounded-4 p-2 position-relative">結帳成功</div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-6">
        <h2 class="text-center border p-3 mb-4 custom-bg">購物車列表</h2>
          <div v-for="item in cart.carts" :key="item.id" class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="item.product.imageUrl" class="img-fluid rounded-start"  alt="Product Image">
              </div>
              <div class="col-md-8 g-1">
                <div class="card-body">
                  <h5 class="card-title">{{ item.product.title }}</h5>
                  <p class="mt-2 text-secondary"><small>產地: {{ item.product.category }}</small></p>
                  <p class="card-text text-danger mt-5" v-if="item.product.origin_price">特價: NT${{ $filters.currency(item.product.price) }}</p>
                  <p class="card-text mt-5" v-else>原價: NT${{ $filters.currency(item.product.origin_price) }}</p>
                  <div class="row">
                    <div class="col-md-6 col-8">
                      <div class="input-group input-group-sm">
                        <button class="btn btn-outline-secondary" type="button" @click="updateQuantity(item, 'decrement')">-</button>
                        <input type="tel" class="form-control" v-model.number="item.qty" min="1" @change="updateCart(item)" :disabled="item.id === status.loadingItem">
                        <button class="btn btn-outline-secondary" type="button" @click="updateQuantity(item, 'increment')">+</button>
                        <div class="input-group-text">/ {{ item.product.unit }}</div>
                      </div>
                    </div>
                    <div class="col-md-6 col-4">
                      <p class="card-text text-end text-success" v-if="coupon_state">折扣價  NT${{ $filters.currency(item.final_total) }}</p>
                      <p class="card-text text-end" v-else>NT${{ $filters.currency(item.total) }}</p>
                    </div>
                  </div>
                  <button type="button" class="btn btn-outline-danger position-absolute top-0 end-0 border-0" :disabled="status.loadingItem === item.id" @click="removeCartItem(item.id)">
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="needs-validation">
            <div class="row mb-4">
            <div class="col-md-6">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary bg-success text-white" type="submit" @click="addCouponCode">套用優惠碼</button>
                </div>
              </div>
            </div>
            <div class="col-md-6 mt-2 mt-md-0 text-end mt-3">
              <button type="button" class="btn btn-outline-danger btn-block rounded-1" data-bs-toggle="modal" data-bs-target="#exampleModal">清除所有購物車</button>
            </div>
          </div>
        </div>
        </div>
      <div class="col-md-6 d-flex flex-column mb-3">
        <div class="border border-black">
          <h2 class="text-center p-3 border-bottom">訂單明細</h2>
          <div class="row mt-5 ms-2">
            <div class="col-md-6 h5"><strong>小計:</strong></div>
            <div class="col-md-6 text-end pe-5">
              <div v-for="item in cart.carts" :key="item.id" class="border-bottom mb-4">
              {{ item.product.title }}
              <span class="ps-4 text-success" v-if="coupon_state"><small>NT${{ item.final_total}}</small></span>
              <span class="ps-4 text-secondary" v-else><small>NT${{ item.total}}</small></span>
              <span class="ps-4">x{{ item.qty }}</span>
              </div>
            </div>
          </div>
          <div class="row mt-5 ms-2 mb-3 border-top p-3">
            <div class="col-md-6 h4"><strong>總計:</strong></div>
            <div class="col-md-6 text-end pe-5">
              <div class="h4 text-success" :id="total" v-if="coupon_state">{{ final_total }}</div>
              <div class="text-success" v-if="coupon_state">已使用優惠卷</div>
              <div class="h4" :id="total" v-else>{{ total }}</div>
            </div>
          </div>
          <button class="btn btn-block text-white bg-dark text-center w-100 p-2 rounded-0" type="button" @click="material()" :disabled="this.total === 0">前往結帳</button>
        </div>
      </div>
    </div>
  </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger" id="exampleModalLabel">確認刪除所有購物車品項</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="removeAllCart()">確定</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      isLoading: false,
      status: {
        loadingItem: '' // 對應品項 id
      },
      cart: {}, // 儲存購物車資訊
      coupon_code: '', // 優惠卷號碼
      coupon_state: '', // 儲存優惠卷狀態
      total: '', // 儲存金額
      final_total: ''// 儲存金額
    }
  },
  methods: {
    getCart () { // 取得購物車資訊
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.cart = response.data.data
        this.isLoading = false
        this.final_total = response.data.data.final_total
        this.total = response.data.data.total
        console.log(this.cart)
      })
    },
    updateQuantity (item, action) { // 控制購物車數量
      if (action === 'increment') {
        item.qty += 1
      } else if (action === 'decrement' && item.qty > 1) {
        item.qty -= 1
      }
      this.updateCart(item)
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id // 當點擊時，該id會存到loadingItem，同時觸發v-bind(:disabled)，當loadingItem跟item.id同樣時會鎖起按鈕
      const cart = { // 儲存商品id跟數量
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        this.status.loadingItem = '' // 更新完產品後把值清空
        this.getCart() // 重新取得
      })
    },
    addCouponCode () { // 新增優惠卷
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = { // 儲存優惠卷號碼
        code: this.coupon_code
      }
      this.$http.post(url, { data: coupon }).then((res) => { // 傳遞給後端
        this.coupon_state = res.data.success // 儲存優惠卷狀態
        if (this.coupon_state === true) { // 判斷優惠卷是否成功
          this.$httpMessageState(res, '套用優惠卷')
        } else {
          this.$httpMessageState(res, '套用優惠卷')
        }
        this.getCart()
      })
    },
    removeCartItem (id) { // 刪除購物車
      this.status.loadingItem = id // 當id一樣時鎖起刪除按鈕
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項') // 成功時彈出視窗
        this.status.loadingItem = '' // 清除暫存的id
        this.getCart() // 重新整理
        this.isLoading = false
      })
    },
    removeAllCart () { // 刪除全部購物車
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.isLoading = true
      this.$http.delete(url)
        .then((response) => {
          this.isLoading = false
          this.$httpMessageState(response, '移除購物車品項') // 成功時彈出視窗
          this.getCart() // 重新整理
        })
    },
    material () {
      this.$router.push('material')
    }
  },
  created () {
    this.getCart()
  }
}
</script>
