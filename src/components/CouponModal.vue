<!-- 優惠卷模板 -->

<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code" placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input type="number" class="form-control" id="price" v-model.number="tempCoupon.percent" placeholder="請輸入折扣百分比">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled" id="is_enabled">
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">更新優惠券</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'couponModal',
  props: {
    coupon: {}// props名稱
  },
  data () {
    return {
      tempCoupon: {}, // 用於存放編輯或新增的優惠券資料
      due_date: '', // 用於存放優惠券的到期日期
      dateAndTime: null // 用於存放處理後的日期和時間
    }
  },
  emits: ['update-coupon'],
  watch: {
    // 外部資料透過props傳進來到coupon，就會觸發watch
    coupon () {
      this.tempCoupon = { ...this.coupon }
      // 將時間格式改為 YYYY-MM-DD
      this.dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')[0]
      // 將日期賦值給 due_date
      this.tempCoupon.due_date = this.dateAndTime
    },
    due_date () {
      // 將日期(YYYY-MM-DD)轉換為時間(數字)並存入tempCoupon.due_date
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  mixins: [modalMixin]
}
</script>
