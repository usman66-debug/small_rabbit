import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import httpInstance from '@/utils/http'

export const useGetUser = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})
  //用户登录
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //必须等待本地购物车合并和服务端购物车回填完成后，登录流程才算结束
    await cartStore.mergeLocalCartToServer()
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
