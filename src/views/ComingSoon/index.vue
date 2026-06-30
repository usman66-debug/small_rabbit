<template>
  <main class="coming-soon-page">
    <section class="notice">
      <div class="dot"></div>
      <h2>当前功能尚在开发中，先逛逛其他地方吧！</h2>
      <p>小兔鲜儿正在补充这部分内容，你可以先返回首页或看看商品分类。</p>
      <div class="actions">
        <RouterLink to="/">返回首页</RouterLink>
        <RouterLink to="/category/1005000">查看分类</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.coming-soon-page {
  min-height: calc(100vh - 185px);
  padding: 70px 0;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notice {
  width: 620px;
  min-height: 300px;
  padding: 56px 64px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 6%);

  .dot {
    width: 76px;
    height: 76px;
    margin: 0 auto 28px;
    border-radius: 50%;
    background: rgba(39, 186, 155, .12);
    position: relative;
    animation: breathing 1.8s ease-in-out infinite;

    &::after {
      content: "";
      position: absolute;
      left: 24px;
      top: 24px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: $xtxColor;
      box-shadow: 0 0 0 8px rgba(39, 186, 155, .16);
    }
  }

  h2 {
    font-size: 24px;
    font-weight: normal;
    color: #333;
    line-height: 36px;
  }

  p {
    margin-top: 14px;
    color: #999;
    font-size: 15px;
  }

  .actions {
    margin-top: 34px;
    display: flex;
    justify-content: center;
    gap: 16px;

    a {
      width: 118px;
      height: 38px;
      line-height: 38px;
      border-radius: 4px;
      color: #666;
      border: 1px solid #e4e4e4;

      &:first-child {
        color: #fff;
        border-color: $xtxColor;
        background: $xtxColor;
      }

      &:hover {
        color: #fff;
        border-color: $xtxColor;
        background: $xtxColor;
      }
    }
  }
}

@keyframes breathing {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }
}
</style>
