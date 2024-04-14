<!-- 後台優惠卷列表 -->

<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <!-- 將傳入的時間轉換成格式化的日期 -->
        <td>{{ $filters.date(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未起用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">刪除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- @update-coupon="updateCoupon"/前者emit事件名稱，後者為觸發的函示 -->
    <couponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon"/>
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"/>
  </div>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  components: { CouponModal, DelModal },
  props: {
    config: Object
  },
  data () {
    return {
      coupons: {}, // 儲存優惠卷資料
      tempCoupon: { // 臨時變數，用於存儲優惠券的相關資訊
        title: '',
        is_enabled: 0, // 是否啟用
        percent: 100, //  折扣百分比，表示優惠卷的折扣率，範圍為 0-100
        code: '' // 優惠卷的代碼
      },
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    // 新增或編輯
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) { // 如果是新增
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000// 賦予當下時間並儲存在tempCoupon
        }
      } else { // 如果不是新增
        this.tempCoupon = { ...item }
      }
      this.isNew = isNew// 儲存現在isNew的布林值
      this.$refs.couponModal.showModal()// 打開couponModal
    },
    // 刪除
    openDelCouponModal (item) {
      this.tempCoupon = { ...item }// 展開
      const delComponent = this.$refs.delModal// 打開delModal
      delComponent.showModal()
    },
    // 取得優惠卷資料或重新刷新頁面
    getCoupons () {
      this.isLoading = true// 讀取效果
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(url, this.tempProduct).then((response) => {
        this.coupons = response.data.coupons// 將 API 回傳的優惠券數據存儲到 this.coupons 屬性中
        this.isLoading = false
      })
    },
    updateCoupon (tempCoupon) {
      if (this.isNew) { // 如果是新增
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
        this.$http.post(url, { data: tempCoupon }).then((response) => { // 把數據送到後端
          this.$httpMessageState(response, '新增優惠券')// 觸發自訂全域變數$httpMessageState，帶入彈出視窗，兩個參數前者是API請求結果的信息，後者為標題
          this.getCoupons()// 重新整理頁面
          this.$refs.couponModal.hideModal()// 關閉couponModal
        })
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        this.$http.put(url, { data: this.tempCoupon }).then((response) => { // 把數據更改
          this.$httpMessageState(response, '新增優惠券')// 觸發自訂全域變數$httpMessageState，帶入彈出視窗，兩個參數前者是API請求結果的信息，後者為標題
          this.getCoupons()// 重新整理頁面
          this.$refs.couponModal.hideModal()// 關閉頁面
        })
      }
    },
    delCoupon () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`// 取得該項目id
      this.isLoading = true
      this.$http.delete(url).then((response) => { // 後端刪除
        this.$httpMessageState(response, '刪除優惠券')// 觸發自訂全域變數$httpMessageState，帶入彈出視窗，兩個參數前者是API請求結果的信息，後者為標題
        const delComponent = this.$refs.delModal
        delComponent.hideModal()// 關閉delModal
        this.getCoupons()// 重新整理頁面
      })
    }
  },
  created () { // 網頁載進來就會觸發
    this.getCoupons()
  }
}
</script>
