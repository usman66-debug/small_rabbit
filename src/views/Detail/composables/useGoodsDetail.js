import { getDetailAPI } from "@/apis/detail";
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'


export const useGoodsDetail = () => {
  const route = useRoute()
  const detailList = ref({})
  const getGoodsDetail = async () => {
    const res = await getDetailAPI(route.params.id)
    detailList.value = res.result
  }

  watch(
    () => route.params.id,
    () => getGoodsDetail(),
    { immediate: true }
  )

  return {
    detailList,
  }
}
