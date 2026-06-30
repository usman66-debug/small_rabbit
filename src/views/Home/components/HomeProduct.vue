<script setup>
import HomePanel from './HomePanel.vue'
import { getGoodsAPI } from '@/apis/home'
import { onMounted } from 'vue';
import { ref } from 'vue'
import GoodsItem from './GoodsItem.vue'

const goodsProduct = ref([])
const getGoods = async () => {
  const res = await getGoodsAPI()
  goodsProduct.value = res.result
}

onMounted(() => getGoods())
</script>

<template>
  <div class="home-product">
    <HomePanel :title="cate.name" v-for="cate in  goodsProduct " :key="cate.id">
      <div class="box">
        <RouterLink class="cover" :to="`/category/${cate.id}`">
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for=" good  in  cate.goods " :key="good.id">
            <GoodsItem :good="good" />
          </li>
        </ul>
      </div>
    </HomePanel>
    <div class="product-skeleton" v-if="!goodsProduct.length">
      <div class="container">
        <div class="head">
          <span class="title"></span>
          <span class="sub"></span>
        </div>
        <div class="box">
          <span class="cover"></span>
          <div class="goods-list">
            <span v-for="item in 8" :key="item"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-product {
  background: #fff;
  margin-top: 20px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 100%;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }

  .product-skeleton {
    background: #fff;
    padding-bottom: 30px;

    .head {
      height: 115px;
      display: flex;
      align-items: center;
      gap: 20px;

      .title,
      .sub {
        display: block;
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
    }

    .box {
      display: flex;

      .cover,
      .goods-list span {
        display: block;
        border-radius: 4px;
        background: linear-gradient(90deg, #eee 25%, #f7f7f7 37%, #eee 63%);
        background-size: 400% 100%;
        animation: skeleton-loading 1.4s ease infinite;
      }

      .cover {
        width: 240px;
        height: 610px;
        margin-right: 10px;
      }

      .goods-list {
        width: 990px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        span {
          width: 240px;
          height: 300px;
        }
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
