<script setup>
import GoodsItem from '../Home/components/GoodsItem.vue'
import { computed, ref } from 'vue'
import { useSubCategory } from './composables/useSubCategory'

const { categoryList } = useSubCategory()
const activeSort = ref('default')

const sortOptions = [
  { label: '默认排序', value: 'default' },
  { label: '最高人气', value: 'orderNum' },
  { label: '价格从低到高', value: 'priceAsc' },
  { label: '价格从高到低', value: 'priceDesc' }
]

const goodsList = computed(() => {
  const list = [...(categoryList.value.goods || [])]

  if (activeSort.value === 'orderNum') {
    return list.sort((a, b) => Number(b.orderNum || 0) - Number(a.orderNum || 0))
  }

  if (activeSort.value === 'priceAsc') {
    return list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
  }

  if (activeSort.value === 'priceDesc') {
    return list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
  }

  return list
})
</script>

<template>
  <div class="container">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryList.parentId}` }">
          {{ categoryList.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="sub-container">
      <div class="sub-header">
        <div>
          <h3>{{ categoryList.name }}</h3>
          <p>{{ categoryList.parentName }} 分类下共 {{ goodsList.length }} 件商品</p>
        </div>
        <RouterLink class="all-link" :to="`/category/all/${categoryList.parentId}`">查看全部商品</RouterLink>
      </div>

      <div class="filter-block" v-if="categoryList.categories?.length">
        <div class="filter-title">同级分类</div>
        <div class="filter-content">
          <RouterLink v-for="item in categoryList.categories" :key="item.id" :to="`/category/sub/${item.id}`"
            :class="{ active: item.id === categoryList.id }">
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
      <div class="sort-bar">
        <button v-for="item in sortOptions" :key="item.value" :class="{ active: activeSort === item.value }"
          @click="activeSort = item.value">
          {{ item.label }}
        </button>
      </div>

      <div class="body" v-if="goodsList.length">
        <GoodsItem v-for="goods in goodsList" :good="goods" :key="goods.id" />
      </div>
      <el-empty v-else description="当前分类暂无商品" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .sub-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 24px;
    border-bottom: 1px solid #f2f2f2;

    h3 {
      font-size: 24px;
      font-weight: normal;
      color: #333;
      line-height: 36px;
    }

    p {
      color: #999;
      font-size: 14px;
    }

    .all-link {
      width: 118px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      color: #fff;
      background-color: $xtxColor;
      border-radius: 4px;

      &:hover {
        background-color: #27ba9b;
      }
    }
  }

  .filter-block {
    display: flex;
    padding: 18px 20px;
    border-bottom: 1px solid #f2f2f2;

    .filter-title {
      width: 90px;
      flex-shrink: 0;
      color: #999;
      line-height: 32px;
    }

    .filter-content {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      a,
      span {
        min-width: 72px;
        height: 32px;
        padding: 0 14px;
        line-height: 32px;
        text-align: center;
        color: #666;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
      }

      a:hover,
      a.active {
        color: #fff;
        background-color: $xtxColor;
        border-color: $xtxColor;
      }
    }

    .brand-content {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .brand-item {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 40px;
        padding: 0 12px;
        color: #666;
        border: 1px solid #e4e4e4;
        border-radius: 4px;

        img {
          width: 28px;
          height: 28px;
          object-fit: cover;
        }
      }
    }
  }

  .sort-bar {
    display: flex;
    gap: 12px;
    padding: 20px;

    button {
      height: 34px;
      padding: 0 18px;
      color: #666;
      background-color: #fff;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      cursor: pointer;

      &:hover,
      &.active {
        color: #fff;
        background-color: $xtxColor;
        border-color: $xtxColor;
      }
    }
  }

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px 20px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
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
}
</style>
