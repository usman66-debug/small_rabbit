import { getCategoryFilterAPI } from '@/apis/category';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export const useSubCategory = () => {
  const categoryList = ref({})
  const route = useRoute()
  const getCategoryFilter = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    categoryList.value = res.result
  }

  onMounted(() => getCategoryFilter())

  return {
    categoryList
  }

}
