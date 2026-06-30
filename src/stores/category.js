import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useGetCategory = defineStore('category', () => {
  const categoryList = ref([])
  const loading = ref(false)

  const getCategory = async ({ force = false } = {}) => {
    if (loading.value) return
    if (categoryList.value.length && !force) return

    loading.value = true
    try {
      const res = await getCategoryAPI()
      categoryList.value = res.result
    } finally {
      loading.value = false
    }
  }

  return {
    categoryList,
    loading,
    getCategory
  }
}, {
  persist: true
})
