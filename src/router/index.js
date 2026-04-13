import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from "@/views/Pay/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        // 一级分类
        {
          path: '/category/:id',
          component: Category
        },
        // 二级分类
        {
          path: '/category/sub/:id',
          component: SubCategory
        },
        // 详情页
        {
          path: '/detail/:id',
          component: Detail
        },
        //购物车详情页
        {
          path: 'cartlist',
          component: CartList
        },
        //订单详情页
        {
          path: 'checkout',
          component: Checkout
        },
        //支付页面
        {
          path: 'pay',
          component: Pay
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],
  // 路由滚动行为配置
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
