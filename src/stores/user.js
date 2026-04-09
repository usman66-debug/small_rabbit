import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGetUser = defineStore('user', () => {
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
  }
  const clearUser = () => {
    userInfo.value = {}
  }

  return {
    userInfo,
    getUserInfo,
    clearUser
  }
}, {
  persist: true
})
