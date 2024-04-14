<!-- 客戶資料 -->

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
  <div class="my-5 row justify-content-center mx-1">
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
          <div class="border rounded rounded-4 p-2 me-3 position-relative">前往付款
            <div class="line"></div>
          </div>
        </div>
        <div class="d-inline-block">
          <div class="border rounded rounded-4 p-2 position-relative">結帳成功</div>
        </div>
      </div>
    </div>

    <Form class="col-md-6 mt-5" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email<span class="text-danger"> *</span></label>
        <Field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名<span class="text-danger"> *</span></label>
        <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話<span class="text-danger"> *</span></label>
        <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話" rules="required|min:10|numeric" v-model="form.user.tel"></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址<span class="text-danger"> *</span></label>
        <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required" v-model="form.user.address"></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
      </div>
      <div class="row">
        <div class="text-end">
        <button class="btn btn-danger">送出訂單</button>
      </div>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: '',
        orderId: ''
      }
    }
  },
  methods: {
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order })
        .then((res) => {
          this.orderId = res.data.orderId
          this.$router.push(`checkout/${this.orderId}`)
        })
    }
  }
}
</script>
