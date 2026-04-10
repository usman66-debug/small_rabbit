//存放购物车相关的数据
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'

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

  //计算属性计算购物车总共的件数和money
  const amount = computed(() => cartList.value.reduce((accumulator, currentNum) => accumulator + currentNum.count, 0))
  const totalMoney = computed(() => cartList.value.reduce((accumulator, currentNum) => accumulator + currentNum.count * currentNum.price, 0))
  return {
    cartList,
    addCartList,
    delCart,
    amount,
    totalMoney
  }
}, {
  persist: true
})
