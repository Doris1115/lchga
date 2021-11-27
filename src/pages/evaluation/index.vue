<template>
  <view class="container">
    <image class="image-bg" src="/static/image/code03.png"></image>
    <view class="wrap-container">
      <view class="imagcode">
        <image class="code" src="/static/image/code06.png"></image>
      </view>
      <view class="btn-image">
        <image src="/static/image/code01.png"></image>
        <text>共建和谐家校环境, 健康快乐成长</text>
      </view>
    </view>
    <image class="btn-text" src="/static/image/code05.png"></image>

  </view>
</template>
<style lang="scss" scoped>
@import "../../static/css/uni.css";
.container {
  position: absolute;
  height: 100%;
  .image-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 750rpx;
    height: 100%;
  }
  .wrap-container {
    position: absolute;
    left: 0rpx;
    bottom: 68rpx;
    .imagcode {
      position: absolute;
      bottom: 280rpx;
      left: 32rpx;
      width: 652rpx;
      height: 617rpx;
      background: url("../../static/image/code02.png") no-repeat;
      background-size: 100% 100%;
      .code {
        width: 300rpx;
        height: 290rpx;
        position: absolute;
        top: 204rpx;
        right: 80rpx;
      }
    }
    .btn-image {
      width: 680rpx;
      height: 226rpx;
      z-index: 99;
      margin-left: 24rpx;
      text {
        position: absolute;
        width: 428rpx;
        height: 32rpx;
        top: 120rpx;
        font-size: $uni-font-size-base;
        left: 60rpx;
        line-height: 32rpx;
        text-align: center;
      }
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .btn-text {
    width: 155rpx;
    height: 77rpx;
    position: absolute;
    left: 100rpx;
    top: 84px;
    z-index: 99;
  }
}
</style>