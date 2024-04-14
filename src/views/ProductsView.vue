<!-- 後台產品列表 -->

<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button class="btn btn-primary mt-3" type="button" @click="openModal(true)">
      增加一個產品
    </button>
  </div>
  <table class="table mt-5">
  <thead>
    <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in products" :key="item.id">
      <td>{{ item.category }}</td>
      <td>{{ item.title }}</td>
      <td class="text-right">
        {{ $filters.currency(item.origin_price) }}
      </td>
      <td class="text-right">
        {{ $filters.currency(item.price) }}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-muted" v-else>未啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<!-- 分頁元件 -->
<Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
<!-- :product="tempProduct"為props事件，product為內層props接收的物件名稱，tempProduct為傳遞過去的資料 -->
<!-- @update-product接收內層的emit事件，小老鼠後是要接收的emit事件名稱，updateProduct為外層所接收的函示  -->
<ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
<DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"/>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/PaginationComponents.vue'

export default {
  data () {
    return {
      products: [], // 儲存所有產品資料
      pagination: {}, // 分頁資訊
      tempProduct: {}, // 內層資料傳送接收
      isNew: false, // 確認產品是否為新增狀態
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) { // 預設值第一頁，分頁元件透過emit事件將頁碼帶進來
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}// 如果isNew是true(新增)就清空tempProduct
      } else {
        this.tempProduct = { ...item }// false就展開
      }
      this.isNew = isNew// 儲存現在isNew的布林值
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    updateProduct (item) { // item是儲存內層發送過來的資料
      this.tempProduct = item
      // 新增product
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'

      // 編輯product
      if (!this.isNew) { // 當isNew是false時觸發
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      this.$http[httpMethod](api, { data: this.tempProduct }).then(
        (response) => {
          productComponent.hideModal()// 關閉modal
          if (response.data.success) {
            this.getProducts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: response.data.message.join('、')// 將陣列中的多個錯誤信息合併為一個字串
            })
          }
        }
      )
    },
    // 開啟刪除 Modal
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal// 指向delModal
      delComponent.showModal()// 打開delModal
    },
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((response) => {
        const delComponent = this.$refs.delModal
        delComponent.hideModal()// 關閉delModal
        this.getProducts()// 重新整理product
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
