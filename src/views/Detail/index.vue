<script setup>
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/stores/cartStore'
import { useGoodsDetail } from './composables/useGoodsDetail'
import DetailHot from './components/detailHot.vue'

const { detailList, loading, error } = useGoodsDetail()
const cartStore = useCartStore()

const skuObj = ref({})
const count = ref(1)
const detailReady = computed(() => detailList.value.categories?.length)

watch(
  () => detailList.value.id,
  () => {
    skuObj.value = {}
    count.value = 1
  }
)

const skuChange = (emit) => {
  skuObj.value = emit
}

const addCartList = () => {
  if (!skuObj.value.skuId) {
    ElMessage.warning('请选择规格')
    return
  }

  cartStore.addCartList({
    id: detailList.value.id,
    name: detailList.value.name,
    picture: detailList.value.mainPictures?.[0],
    price: detailList.value.price,
    count: count.value,
    skuId: skuObj.value.skuId,
    attrsText: skuObj.value.specsText,
    selected: true
  })
}
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container detail-container">
      <template v-if="loading">
        <div class="detail-skeleton">
          <div class="skeleton-bread"></div>
          <div class="skeleton-info">
            <div class="skeleton-left">
              <div class="skeleton-img"></div>
              <div class="skeleton-sales">
                <span v-for="item in 4" :key="item"></span>
              </div>
            </div>
            <div class="skeleton-right">
              <div class="skeleton-line title"></div>
              <div class="skeleton-line desc"></div>
              <div class="skeleton-line price"></div>
              <div class="skeleton-block"></div>
              <div class="skeleton-line spec"></div>
              <div class="skeleton-line spec short"></div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="detailReady">
        <div class="bread-container">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/category/${detailList.categories[1].id}` }">
              {{ detailList.categories[1].name }}
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/category/sub/${detailList.categories[0].id}` }">
              {{ detailList.categories[0].name }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{ detailList.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="info-container">
          <div class="goods-info">
            <div class="media">
              <XtxImageView :image-list="detailList.mainPictures || []" />
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p>{{ detailList.salesCount }}+</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ detailList.commentCount }}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ detailList.collectCount }}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ detailList.brand?.name || '无' }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>

            <div class="spec">
              <p class="g-name">{{ detailList.name }}</p>
              <p class="g-desc">{{ detailList.desc }}</p>
              <p class="g-price">
                <span>{{ detailList.price }}</span>
                <span>{{ detailList.oldPrice }}</span>
              </p>

              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>

              <XtxSku :goods="detailList" @change="skuChange" />
              <el-input-number v-model="count" />
              <div>
                <el-button size="large" class="btn" @click="addCartList">加入购物车</el-button>
              </div>
            </div>
          </div>

          <div class="goods-footer">
            <div class="goods-article">
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <ul class="attrs">
                    <li v-for="item in detailList.details?.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <img v-for="item in detailList.details?.pictures" :src="item" :key="item" />
                </div>
              </div>
            </div>

            <div class="goods-aside">
              <DetailHot :hot-type="1" />
              <DetailHot :hot-type="2" />
            </div>
          </div>
        </div>
      </template>

      <el-empty v-else-if="error" class="detail-empty" description="商品加载失败，请稍后再试" />
      <el-empty v-else class="detail-empty" description="暂无商品信息" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-goods-page {
  background: #f5f5f5;

  .detail-container {
    min-height: calc(100vh - 185px);
  }

  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "￥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.bread-container {
  padding: 25px 0;
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;
}

.detail-empty {
  min-height: 520px;
  background: #fff;
}

.detail-skeleton {
  padding-bottom: 20px;

  .skeleton-bread {
    width: 360px;
    height: 22px;
    margin: 25px 0;
    border-radius: 4px;
    background: linear-gradient(90deg, #eee 25%, #f7f7f7 37%, #eee 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }

  .skeleton-info {
    min-height: 600px;
    display: flex;
    background: #fff;
  }

  .skeleton-left {
    width: 580px;
    padding: 30px 50px;
  }

  .skeleton-img {
    width: 400px;
    height: 400px;
    border-radius: 6px;
    background: linear-gradient(90deg, #eee 25%, #f7f7f7 37%, #eee 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }

  .skeleton-sales {
    width: 400px;
    height: 120px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    span {
      width: 82px;
      height: 72px;
      border-radius: 4px;
      background: #f3f3f3;
    }
  }

  .skeleton-right {
    flex: 1;
    padding: 40px 30px 30px 0;
  }

  .skeleton-line,
  .skeleton-block {
    border-radius: 4px;
    background: linear-gradient(90deg, #eee 25%, #f7f7f7 37%, #eee 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }

  .skeleton-line {
    height: 24px;
    margin-bottom: 20px;

    &.title {
      width: 70%;
      height: 32px;
    }

    &.desc {
      width: 56%;
    }

    &.price {
      width: 180px;
      height: 34px;
    }

    &.spec {
      width: 72%;
    }

    &.short {
      width: 48%;
    }
  }

  .skeleton-block {
    width: 500px;
    height: 116px;
    margin: 18px 0 28px;
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
