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
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/component/UserInfo.vue'
import UserOrder from '@/views/Member/component/UserOrder.vue'

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
        },
        //支付结果页面
        {
          path: 'paycallback',
          component: PayBack
        },
        //会员中心
        {
          path: 'member',
          component: Member,
          children: [
            {
              path: 'user',
              component: UserInfo,
            },
            {
              path: 'order',
              component: UserOrder,
            }
          ]
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
