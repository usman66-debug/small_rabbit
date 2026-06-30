<script setup>
import { getBannerAPI } from '@/apis/home';
import { onMounted } from 'vue';
import { ref } from 'vue'
const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerAPI()
  bannerList.value = res.result
}

onMounted(() => getBanner())

</script>



<template>
  <div class="home-banner">
    <el-carousel v-if="bannerList.length" height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
    <div v-else class="banner-skeleton"></div>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }

  .banner-skeleton {
    width: 100%;
    height: 500px;
    background: linear-gradient(90deg, #eee 25%, #f7f7f7 37%, #eee 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
