import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'// 錯誤彈出視窗
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AOS from 'aos'// js動畫
import 'aos/dist/aos.css'
import { currency, date } from '@/methods/filters'
import $httpMessageState from './methods/pushMessageState'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate' // 表單驗證
import * as AllRules from '@vee-validate/rules' // 全部規則
import { localize, setLocale } from '@vee-validate/i18n' // 18國語系
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json' // 繁體中文

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})// 定義規則

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW')// 設定預設語系

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

const app = createApp(App)

app.config.globalProperties.$filters = { // 自訂全域註冊，app.config.globalProperties固定寫法，$filters自訂譯名稱，currency帶入$filters的函示
  currency,
  date
}
// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
app.config.globalProperties.$httpMessageState = $httpMessageState
app.use(AOS)
app.use(VueAxios, axios)
app.use(router)
app.use(Notifications)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Loading', Loading)// app.use是全域插件，app.component是全域組件，而括號裡面前者為組件註冊名稱，後者為引用插件名稱
AOS.init()

// eslint-disable-next-line vue/multi-word-component-names
app.component('Form', Form)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
