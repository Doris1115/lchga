<template>
  <view class="container">
    <image src="/static/image/info.png" mode="aspectFit" class="image"> </image>
    <text class="text">暂无数据</text>
  </view>
</template>
<style lang="scss" scoped>
.container {
  padding-top: 320rpx;
  padding-bottom: 60rpx;
  .image {
    width: 320px;
    height: 320rpx;
    margin: auto;
    display: block;
  }
  .text {
    font-size: $uni-font-size-base;
    display: block;
    text-align: center;
    color: #999;
    margin-top: 48rpx;
  }
}
</style>