<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getHotGoodsAPI } from '@/apis/detail'

const props = defineProps({
  hotType: {
    type: Number
  }
})

const typeMap = {
  1: '24小时热榜',
  2: '周热榜'
}

const title = computed(() => typeMap[props.hotType])
const hotList = ref([])
const loading = ref(false)
const route = useRoute()
let requestId = 0

const getHotGoods = async (id = route.params.id) => {
  const currentRequestId = ++requestId
  loading.value = true

  try {
    const res = await getHotGoodsAPI({
      id,
      type: props.hotType
    })
    if (currentRequestId !== requestId) return
    hotList.value = res.result || []
  } catch (e) {
    if (currentRequestId !== requestId) return
    hotList.value = []
  } finally {
    if (currentRequestId === requestId) {
      loading.value = false
    }
  }
}

watch(
  () => route.params.id,
  (id) => getHotGoods(id),
  { immediate: true }
)
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>

    <template v-if="!loading">
      <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in hotList" :key="item.id">
        <img :src="item.picture" alt="" />
        <p class="name ellipsis">{{ item.name }}</p>
        <p class="desc ellipsis">{{ item.desc }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </template>

    <div class="hot-skeleton" v-else>
      <div class="skeleton-item" v-for="item in 3" :key="item">
        <span class="pic"></span>
        <span class="name"></span>
        <span class="desc"></span>
        <span class="price"></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
      object-fit: cover;
      background: #f5f5f5;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .hot-skeleton {
    background: #fff;

    .skeleton-item {
      padding: 20px 30px;
      text-align: center;

      span {
        display: block;
        margin: 0 auto 12px;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 25%, #f7f7f7 37%, #eee 63%);
        background-size: 400% 100%;
        animation: skeleton-loading 1.4s ease infinite;
      }

      .pic {
        width: 160px;
        height: 160px;
      }

      .name {
        width: 180px;
        height: 20px;
      }

      .desc {
        width: 130px;
        height: 18px;
      }

      .price {
        width: 96px;
        height: 24px;
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
