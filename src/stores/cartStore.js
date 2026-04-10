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

  return {
    cartList,
    addCartList
  }
}, {
  persist: true
})
