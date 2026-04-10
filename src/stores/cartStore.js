//存放购物车相关的数据
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCartList = (goods) => {
    //添加购物车操作
    //判断是否已有同种商品
    const item = cartList.value.find((item) => item.skuId === goods.skuId)
    if (item) {
      item.count += goods.count
    } else {
      cartList.value.push(goods)
    }
  }

  const delCart = (skuId) => {
    const itm = cartList.value.findIndex((item) => item.skuId === skuId)
    //注意splice和slice
    cartList.value.splice(itm, 1)
  }

  return {
    cartList,
    addCartList,
    delCart
  }
}, {
  persist: true
})
