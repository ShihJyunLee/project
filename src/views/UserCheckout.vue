<!-- 客戶訂單 -->

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
  <div class="mt-5"></div>
  <div class="mt-5">
      <h2 class="text-center mb-4">結帳流程</h2>
      <div class="text-center text-nowrap">
        <div class="d-inline-block">
          <div class="border rounded rounded-4 p-2 me-3 position-relative bg-secondary text-white">確認品項
            <div class="line"></div>
          </div>
        </div>
        <div class="d-inline-block">
          <div class="border rounded rounded-4 p-2 me-3 position-relative bg-secondary text-white">填寫資料
            <div class="line"></div>
          </div>
        </div>
        <div class="d-inline-block">
          <div class="border rounded rounded-4 p-2 me-3 position-relative bg-secondary text-white">前往付款
            <div class="line"></div>
          </div>
        </div>
        <div class="d-inline-block">
          <div class="border rounded rounded-4 p-2 position-relative">結帳成功</div>
        </div>
      </div>
    </div>

    <div class="row mt-5 container mx-auto">
      <div class="col-md-6 p-2 mb-5">
        <div class="border border-1 border-dark">
          <div class="h2 text-center p-4">個人資料</div>
          <ul class="list-group" >
            <li class="list-group-item d-flex justify-content-between align-items-center">
              姓名
              <span>{{ order.user.name }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              電子郵件
              <span>{{ order.user.email }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              電話號碼
              <span>{{ order.user.tel }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              地址
              <span>{{ order.user.address }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              付款狀態
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              留言
              <span>{{ order.message }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6 p-2 mb-5">
        <div class="border border-1 border-dark">
          <div class="h2 text-center border-bottom p-4">訂單明細</div>
          <div class="ms-4 mb-5">
            <b>訂單建立時間: <span class="text-primary">{{ order.created_at }}</span></b>
          </div>
          <div class="row my-4">
            <div class="col-md-6">
              <h4 class="ms-4">品項:</h4>
            </div>
            <div class="col-md-6 text-end pe-5">
              <div v-for="item in order.products" :key="item.id">
                <div class="border-bottom mb-4">
                  {{ item.product.title }}<span class="ps-3">x{{ item.qty }}</span><span class="ps-1">{{ item.product.unit }}</span>
                  <div>
                    <small class="text-secondary">NT$<span class="ps-1">{{ item.final_total }}</span></small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-4 mt-5 mx-2">
            <div class="col-md-6">
              <h4>總計:</h4>
            </div>
            <div class="col-md-6">
              <div class="text-end">
                <strong class="text-danger">NT$ <span class="ps-1">{{ total }}元</span></strong>
              </div>
            </div>
          </div>
          <div class="row mx-2">
            <div class="col-md-6">
              <h4>付款狀態:</h4>
            </div>
            <div class="col-md-6">
              <div class="text-end">
                {{ is_paid }}
              </div>
            </div>
            <button class="text-white bg-dark p-2 mb-2 mt-5" type="button" @click="payOrder" data-bs-toggle="modal" data-bs-target="#exampleModal">確認付款</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-success" id="exampleModalLabel">付款成功</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            感謝您的付款，您的訂單已成功支付。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="goCart">繼續購物</button>
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
      order: {
        user: {},
        created_at: '' // 新增建立時間屬性
      },
      orderId: '', // 訂單id
      total: '',
      is_paid: '未付款',
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`// 取得某一筆訂單
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order
            this.total = res.data.order.total
            if (res.data.order.is_paid) {
              this.is_paid = '已付款'
            }
            this.order.created_at = new Date(res.data.order.create_at * 1000).toLocaleString() // 設置建立時間
            console.log(res)
          }
        })
    },
    payOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`// 付款API
      this.isLoading = true
      this.$http.post(url)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.getOrder()
          }
        })
    },
    goCart () {
      this.$router.push('/user/cart')
    }
  },
  created () {
    this.orderId = this.$route.params.orderId// 取得瀏覽器路由id
    this.getOrder()
  }
}
</script>
