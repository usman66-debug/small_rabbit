<script setup>
import HomePanel from './HomePanel.vue';
import { findHotAPI } from '@/apis/home'
import { ref } from 'vue'
import { onMounted } from 'vue'

const hotList = ref([])
const getHotList = async () => {
  const res = await findHotAPI()
  hotList.value = res.result
}

onMounted(() => getHotList())
</script>

<template>
  <HomePanel title="人气推荐" subtitle="人气爆款 不容错过">
    <!-- 下面是插槽主体内容模版 -->
    <ul class="goods-list" v-if="hotList.length">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/coming-soon">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <ul class="goods-list skeleton-list" v-else>
      <li v-for="item in 4" :key="item">
        <span class="pic"></span>
        <span class="text"></span>
        <span class="desc"></span>
      </li>
    </ul>
  </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }

  &.skeleton-list {
    li {
      box-shadow: none;

      span {
        display: block;
        margin: 0 auto;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 25%, #f7f7f7 37%, #eee 63%);
        background-size: 400% 100%;
        animation: skeleton-loading 1.4s ease infinite;
      }

      .pic {
        width: 306px;
        height: 306px;
      }

      .text {
        width: 210px;
        height: 22px;
        margin-top: 22px;
      }

      .desc {
        width: 150px;
        height: 18px;
        margin-top: 18px;
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
