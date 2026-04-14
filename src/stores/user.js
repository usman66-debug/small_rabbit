import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'
import httpInstance from '@/utils/http'

export const useGetUser = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})
  //用户登录
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //合并购物车
    await mergeCartAPI(cartStore.cartList.map((item) => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    //更新购物车
    cartStore.updateCart()
  }
  //退出登录
  const clearUser = () => {
    userInfo.value = {}
    cartStore.clearCart()
  }

  return {
    userInfo,
    getUserInfo,
    clearUser
  }
}, {
  persist: true
})


export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}
