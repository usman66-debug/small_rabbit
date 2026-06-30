<script setup>
import GoodsItem from '../Home/components/GoodsItem.vue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getSubCategoryAPI } from '@/apis/category'

const route = useRoute()

const goodsList = ref([])
const loading = ref(false)
const finished = ref(false)
const queryParams = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})

let requestId = 0

const disabled = computed(() => loading.value || finished.value)

const getGoodsList = async ({ append = false } = {}) => {
  const currentRequestId = ++requestId
  loading.value = true

  try {
    const requestData = { ...queryParams.value }
    const res = await getSubCategoryAPI(requestData)
    if (currentRequestId !== requestId) return

    const result = res.result || {}
    const items = result.items || []
    goodsList.value = append ? [...goodsList.value, ...items] : items
    finished.value = requestData.page >= Number(result.pages || 1) || items.length < requestData.pageSize
  } finally {
    if (currentRequestId === requestId) {
      loading.value = false
    }
  }
}

const resetAndFetch = () => {
  queryParams.value.page = 1
  goodsList.value = []
  finished.value = false
  getGoodsList()
}

const load = async () => {
  if (disabled.value) return
  queryParams.value.page++

  try {
    await getGoodsList({ append: true })
  } catch (error) {
    queryParams.value.page--
    throw error
  }
}

watch(
  () => route.params.id,
  (id) => {
    queryParams.value.categoryId = id
    resetAndFetch()
  },
  { immediate: true }
)
</script>

<template>
  <div class="container">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="all-container">
      <div
        class="body"
        v-if="goodsList.length"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-immediate="false"
      >
        <GoodsItem v-for="goods in goodsList" :good="goods" :key="goods.id" />
      </div>

      <el-empty v-else-if="!loading" description="暂无商品" />

      <div class="load-state" v-if="loading">商品加载中...</div>
      <div class="load-state" v-else-if="finished && goodsList.length">已经到底了</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.all-container {
  min-height: 520px;
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;
  }

  .load-state {
    height: 54px;
    line-height: 54px;
    text-align: center;
    color: #999;
  }
}
</style>
