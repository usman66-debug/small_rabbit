<script setup>
import { onMounted, ref } from 'vue'
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'

const showDeferredModules = ref(false)

onMounted(() => {
  const showModules = () => {
    showDeferredModules.value = true
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(showModules, { timeout: 800 })
  } else {
    setTimeout(showModules, 300)
  }
})
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>

  <template v-if="showDeferredModules">
    <HomeNew />
    <HomeHot />
    <HomeProduct />
  </template>

  <div class="home-deferred-skeleton" v-else>
    <div class="container">
      <div class="panel" v-for="panel in 3" :key="panel">
        <div class="panel-head">
          <span class="title"></span>
          <span class="sub"></span>
        </div>
        <div class="cards">
          <span v-for="item in 4" :key="item"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-deferred-skeleton {
  background: #fff;
  padding-bottom: 30px;

  .panel {
    padding-top: 40px;

    .panel-head {
      height: 35px;
      display: flex;
      align-items: flex-end;
      gap: 20px;
      margin-bottom: 40px;
    }

    .title,
    .sub,
    .cards span {
      border-radius: 4px;
      background: linear-gradient(90deg, #eee 25%, #f7f7f7 37%, #eee 63%);
      background-size: 400% 100%;
      animation: skeleton-loading 1.4s ease infinite;
    }

    .title {
      width: 180px;
      height: 32px;
    }

    .sub {
      width: 220px;
      height: 18px;
    }

    .cards {
      height: 220px;
      display: flex;
      justify-content: space-between;

      span {
        width: 286px;
        height: 220px;
      }
    }
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
