<template>
  <view class="content">
    <image class="logo" src="/static/image/bgrt.png"></image>
    <view class="contain">
      <view class="column01 clear-fix">
        <view class="pull-left clear-fix">
          <text>用心陪伴孩子成长</text>
          <image class="icon" src="/static/image/icon311.png" mode="scaleToFill"></image>
        </view>
        <view class="pull-right">
          <text>{{ruyjs.title}}</text>
        </view>
      </view>
      <ItemColumn :columns='ruyjs' />
    </view>
  </view>
</template>
<script>
import { ruyjs } from '@/utils/nav'
import ItemColumn from '@/pages/components/column'
export default {
  components: {
    ItemColumn
  },
  data() {
    return {
      ruyjs
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  width: 750rpx;
  height: 380rpx;
  margin: 0;
  position: absolute;
  top: 0;
}
.contain {
  position: absolute;
  top: 404rpx;
  .column01 {
    @extend .layer-contain;
    margin: 0 $uni-spacing-row-base;
    height: 98rpx;
    line-height: 98rpx;

    .pull-left {
      margin-left: $uni-spacing-row-base;
      text {
        font-size: $uni-font-size-lg;
      }
    }
    .pull-right {
      margin-right: $uni-spacing-row-base;
      text {
        color: #3d7bdc;
        background: #dee9fa;
        display: inline-block;
        line-height: 50rpx;
        height: 50rpx;
        padding: 0 $uni-spacing-row-lg;
        border-radius: $uni-border-radius-base;
        border: 1px solid #3d7bdc;
      }
    }
  }
  .icon {
    width: 32rpx;
    height: 32rpx;
    margin-left: 8rpx;
  }
  .column02 {
    @extend .layer-contain;
    margin: $uni-spacing-row-base;
    .nav-title {
      font-size: $uni-font-size-lg;
      font-weight: 600;
      margin: 0 $uni-spacing-row-base;
      border-bottom: 1px solid $uni-border-color;
      line-height: 88rpx;
      height: 88rpx;
    }
    .column-item {
      width: 25%;
      overflow: hidden;
      flex-shrink: 0;
      text-align: center;
      .navigator-icon {
        display: flex;
        width: 62rpx;
        height: 62rpx;
        margin: 0 auto;
        padding-top: $uni-spacing-row-lg;
      }
      image {
        width: 62rpx;
        height: 62rpx;
        align-items: flex-end;
        justify-self: space-around;
      }
      text {
        display: inline-block;
        line-height: 1;
        font-size: $uni-font-size-sm;
        padding-top: $uni-spacing-row-sm;
        padding-bottom: $uni-spacing-row-lg;
      }
    }
  }
}
</style>