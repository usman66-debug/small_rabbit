//获取分类数据
import { onBeforeRouteUpdate } from 'vue-router';
import { detailedCategoryAPI } from '@/apis/category';
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'

export const useCategory = () => {
  const categoryData = ref({})
  const route = useRoute()
  const detailedCategory = async (id = route.params.id) => {
    const res = await detailedCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => detailedCategory())

  onBeforeRouteUpdate((to) => {
    detailedCategory(to.params.id)
  })

  return {
    categoryData
  }
}
