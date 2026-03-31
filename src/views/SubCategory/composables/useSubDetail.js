import { getSubCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export const useSubDetail = () => {
  const goodsList = ref([])
  const route = useRoute()
  const data = ref({
    categoryId: route.params.id,
    page: 1,
    pagesize: 20,
    sortField: 'publishTime'
  })
  const getSubDetail = async () => {
    const res = await getSubCategoryAPI(data.value)
    console.log(res);
    goodsList.value = res.result.items
  }

  onMounted(() => getSubDetail())

  return {
    goodsList
  }
}

