<script setup>
import { onMounted } from 'vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';
import { useGetCategory } from '@/stores/category'

const categoryStore = useGetCategory()
onMounted(() => {
  const hasCache = categoryStore.categoryList.length
  categoryStore.getCategory().catch(() => {})

  if (hasCache) {
    categoryStore.getCategory({ force: true }).catch(() => {})
  }
})
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 二级路由出口 -->
  <!-- 解决路由缓存问题，第一种方案：添加key，破坏复用机制，强制销毁重建，但是整个页面都会刷新，不需要刷新的组件比如轮播图也会刷新，有性能缺陷 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <!-- 第二种方案：在category组件中精细化配置函数调用，通过钩子函数监听路由变化并重新调用请求函数 -->
  <RouterView />
  <LayoutFooter />
</template>
