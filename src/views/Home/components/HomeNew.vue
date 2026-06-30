<script setup>
import HomePanel from './HomePanel.vue';
import { findNewAPI } from '@/apis/home'
import { ref } from 'vue'
import { onMounted } from 'vue'

const newList = ref([])
const getNewList = async () => {
  const res = await findNewAPI()
  newList.value = res.result
}

onMounted(() => getNewList())
</script>

<template>
  <HomePanel title="新鲜好物" subtitle="新鲜出炉 品质靠谱">
    <!-- 下面是插槽主体内容模版 -->
    <ul class="goods-list" v-if="newList.length">
      <li v-for="item in newList" :key="item.id">
        <RouterLink :to="`/detail/${item.id}`">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
    <ul class="goods-list skeleton-list" v-else>
      <li v-for="item in 4" :key="item">
        <span class="pic"></span>
        <span class="text"></span>
        <span class="price"></span>
      </li>
    </ul>
  </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }

  &.skeleton-list {
    li {
      background: #f7f7f7;
      padding: 0;
      box-shadow: none;

      span {
        display: block;
        margin: 0 auto;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 25%, #fff 37%, #eee 63%);
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

      .price {
        width: 110px;
        height: 24px;
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
