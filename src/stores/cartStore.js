//存放购物车相关的数据
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'
import { useGetUser } from './user'
import { insertCartAPI, getNewCartAPI, deleteCartAPI, mergeCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
  const getUser = useGetUser()
  const cartList = ref([])
  const isLogin = computed(() => getUser.userInfo.token)

  //获取并更新购物车列表
  const updateCart = async () => {
    const res = await getNewCartAPI()
    cartList.value = res.result.map((item) => ({
      ...item,
      selected: item.isEffective !== false && (item.selected === true || item.selected === 'true')
    }))
  }

  // 登录成功后，先合并未登录购物车，再用服务端数据覆盖本地状态
  const mergeLocalCartToServer = async () => {
    const localCart = cartList.value
      .filter((item) => item.skuId && Number(item.count) > 0)
      .map((item) => ({
        skuId: String(item.skuId),
        count: Number(item.count),
        // 合并接口文档要求 selected 为字符串，而不是布尔值
        selected: item.selected === false || item.selected === 'false' ? 'false' : 'true'
      }))

    if (localCart.length > 0) {
      await mergeCartAPI(localCart)
    }

    await updateCart()
  }

  const addCartList = async (goods) => {
    const { skuId, count } = goods
    //判断是否登录
    if (isLogin.value) {
      //添加购物车
      await insertCartAPI({ skuId, count })
      //从后端获取最新购物车信息
      await updateCart()
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
      await updateCart()
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

  //服务端标记为失效的商品只保留展示，不参与选择和金额计算
  const validCartList = computed(() => cartList.value.filter((item) => item.isEffective !== false))

  //计算属性计算有效购物车商品的件数和money
  const amount = computed(() => validCartList.value.reduce((accumulator, currentNum) => accumulator + currentNum.count, 0))
  const totalMoney = computed(() => validCartList.value.reduce((accumulator, currentNum) => accumulator + currentNum.count * currentNum.price, 0))

  //计算选中的数量和价格
  const selectedAmount = computed(() => validCartList.value.filter((item) => item.selected).reduce((accumulator, currentNum) => accumulator + currentNum.count, 0))
  const selectedPrice = computed(() => validCartList.value.filter((item) => item.selected).reduce((accumulator, currentNum) => accumulator + currentNum.count * currentNum.price, 0))
  //单选框状态绑定
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    if (!item || item.isEffective === false) return
    item.selected = selected
  }

  //全选逻辑
  const isAll = computed(() => validCartList.value.length > 0 && validCartList.value.every((item) => item.selected))
  const allCheck = (selected) => {
    cartList.value.forEach((item) => {
      item.selected = item.isEffective === false ? false : selected
    })
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
    updateCart,
    mergeLocalCartToServer
  }
}, {
  persist: true
})
