//存放购物车相关的数据
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'
import { useGetUser } from './user'
import { insertCartAPI, getNewCartAPI, deleteCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
  const getUser = useGetUser()
  const cartList = ref([])
  const isLogin = computed(() => getUser.userInfo.token)

  //获取并更新购物车列表
  const updateCart = async () => {
    const res = await getNewCartAPI()
    cartList.value = res.result
  }

  const addCartList = async (goods) => {
    const { skuId, count } = goods
    //判断是否登录
    if (isLogin.value) {
      //添加购物车
      await insertCartAPI({ skuId, count })
      //从后端获取最新购物车信息
      updateCart()
    } else {
      //添加购物车操作
      //判断是否已有同种商品
      const item = cartList.value.find((item) => item.skuId === goods.skuId)
      if (item) {
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
  }

  //删除购物车操作
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await deleteCartAPI([skuId])
      updateCart()
    } else {
      const itm = cartList.value.findIndex((item) => item.skuId === skuId)
      //注意splice和slice
      cartList.value.splice(itm, 1)
    }
  }

  //清除购物车操作
  const clearCart = () => {
    cartList.value = []
  }

  //计算属性计算购物车总共的件数和money
  const amount = computed(() => cartList.value.reduce((accumulator, currentNum) => accumulator + currentNum.count, 0))
  const totalMoney = computed(() => cartList.value.reduce((accumulator, currentNum) => accumulator + currentNum.count * currentNum.price, 0))

  //计算选中的数量和价格
  const selectedAmount = computed(() => cartList.value.filter((item) => item.selected).reduce((accumulator, currentNum) => accumulator + currentNum.count, 0))
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((accumulator, currentNum) => accumulator + currentNum.count * currentNum.price, 0))
  //单选框状态绑定
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  //全选逻辑
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  const allCheck = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }

  return {
    cartList,
    addCartList,
    delCart,
    amount,
    totalMoney,
    selectedAmount,
    selectedPrice,
    singleCheck,
    isAll,
    allCheck,
    clearCart,
    updateCart
  }
}, {
  persist: true
})
