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
    goodsList.value = res.result.items
  }

  onMounted(() => getSubDetail())

  const tabChange = () => {
    console.log('排序方式改变了', data.value.sortField);
    data.value.page = 1
    getSubDetail()
  }
  //无限滚动加载
  const disabled = ref(false)

  const load = async () => {
    console.log('加载了新数据');
    //获取下一页数据
    data.value.page++
    const res = await getSubCategoryAPI(data.value)
    goodsList.value = [...goodsList.value, ...res.result.items]
    //加载完毕，停止监听
    if (res.result.items.length === 0) {
      disabled.value = true
    }
  }

  return {
    goodsList,
    data,
    tabChange,
    load,
    disabled
  }
}

