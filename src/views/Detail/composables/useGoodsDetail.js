import { getDetailAPI } from "@/apis/detail";
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'


export const useGoodsDetail = () => {
  const route = useRoute()
  const detailList = ref({})
  const loading = ref(false)
  const error = ref(false)
  let requestId = 0

  const getGoodsDetail = async (id = route.params.id) => {
    const currentRequestId = ++requestId
    loading.value = true
    error.value = false

    try {
      const res = await getDetailAPI(id)
      if (currentRequestId !== requestId) return
      detailList.value = res.result || {}
    } catch (e) {
      if (currentRequestId !== requestId) return
      detailList.value = {}
      error.value = true
    } finally {
      if (currentRequestId === requestId) {
        loading.value = false
      }
    }
  }

  watch(
    () => route.params.id,
    (id) => getGoodsDetail(id),
    { immediate: true }
  )

  return {
    detailList,
    loading,
    error
  }
}
