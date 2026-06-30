import { getCategoryFilterAPI } from '@/apis/category'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useSubCategory = () => {
  const categoryList = ref({})
  const route = useRoute()
  let requestId = 0

  const getCategoryFilter = async (id) => {
    const currentRequestId = ++requestId
    const res = await getCategoryFilterAPI(id)
    if (currentRequestId !== requestId) return
    categoryList.value = res.result
  }

  // 同一组件内切换二级分类时，路由组件会被复用，需要监听动态参数
  watch(
    () => route.params.id,
    (id) => getCategoryFilter(id),
    { immediate: true }
  )

  return {
    categoryList
  }
}
