<!-- 後台訂單列表 -->

<template>
  <Loading :active="isLoading"></Loading>
  <table class="table mt-4">
    <thead>
    <tr>
      <th>購買時間</th>
      <th>Email</th>
      <th>購買款項</th>
      <th>應付金額</th>
      <th>是否付款</th>
      <th>編輯</th>
    </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <!-- 當!item.is_paid是false(未支付)就會帶入text-secondary'的class -->
        <tr v-if="orders.length" :class="{'text-secondary': !item.is_paid}">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">
              <!-- 不同id跟for對應不同的checkbox -->
              <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`" v-model="item.is_paid" @change="updatePaid(item)">
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">檢視</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelOrderModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :order="tempOrder" ref="orderModal" @update-paid="updatePaid"></OrderModal>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
</template>

<script>
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import Pagination from '@/components/PaginationComponents.vue'

export default {
  data () {
    return {
      orders: {}, // 用來儲存從 API 中獲取的訂單資訊
      isNew: false, // 一個布林值，用來標記是否是新的訂單
      pagination: {}, // 分頁資訊的物件
      isLoading: false,
      tempOrder: {}, // 一個臨時變數，用於存儲當前操作的訂單資訊，例如查看、刪除等
      currentPage: 1//  用來記錄當前頁面的數字
    }
  },
  components: {
    Pagination, // 分頁
    DelModal, // 刪除modal
    OrderModal// 訂單modal
  },
  methods: {
    getOrders (currentPage = 1) { // 預設目前頁面為1
      this.currentPage = currentPage// 把頁面暫存在currentPage
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(url, this.tempProduct).then((response) => { // 取得後端資料，並篩選this.tempProduct的資料
        this.orders = response.data.orders// 儲存從 API 中獲取的訂單資訊
        this.pagination = response.data.pagination// 儲存分頁資訊
        this.isLoading = false
      })
    },
    openModal (isNew, item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.orderModal// 指定orderModal
      orderComponent.showModal()// 打開orderModal
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal// 指定delModal
      delComponent.showModal()// 打開delModal
    },
    updatePaid (item) { // 監控付款狀態
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid// 訂單的支付狀態
      }
      this.$http.put(api, { data: paid }).then((response) => { // 更新付款狀態
        this.isLoading = false
        this.getOrders(this.currentPage)// 重新整理頁面
        this.$httpMessageState(response, '更新付款狀態')// 彈出視窗
      })
    },
    delOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`// 指定id
      this.isLoading = true
      this.$http.delete(url).then((response) => { // 刪除指定id
        const delComponent = this.$refs.delModal// 指定delModal
        delComponent.hideModal()// 關閉delModal
        this.getOrders(this.currentPage)// 重新整理頁面
      })
    }
  },
  created () {
    this.getOrders()// 加載畫面
  }
}
</script>
