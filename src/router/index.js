import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/AdministratorLogin.vue'),
    meta: { showFooter: false }
  },
  {
    path: '/dashboard',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/ProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/OrderView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/CouponView.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/UserBoard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue')
      },
      {
        path: 'shopping',
        component: () => import('../views/UserShopping.vue')
      },
      {
        path: 'material',
        component: () => import('../views/UserMaterial.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckout.vue')
      }
    ]
  },
  {
    path: '/about',
    component: () => import('@/components/AboutUs.vue')
  },
  {
    path: '/connection',
    component: () => import('@/components/ConnectionUs.vue')
  },
  {
    path: '/related',
    component: () => import('@/components/RelatedTerms.vue')
  },
  {
    path: '/privacy',
    component: () => import('@/components/PrivacyPolicy.vue')
  },
  {
    path: '/transaction',
    component: () => import('@/components/TransactionProcess.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 指定路由使用的模式，createWebHashHistory，表示使用 hash 模式的路由
  linkActiveClass: 'active', // 當連結對應的路由被激活時，這個連結標籤會被添加一個名為 'active' 的 CSS 類別
  routes
})

export default router
