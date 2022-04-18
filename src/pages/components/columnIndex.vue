<template>
  <view class="column02">
    <view class="nav-title">
      {{columns.title}}
      <span class="get-more">查看更多</span>
    </view>
    <uni-row class="content">
      <uni-col
        v-for="(item,index) in columns.items"
        :key="index"
      >
        <navigator
          class="wrap"
          url="/pages/ztyjs/index"
        >
          <view class="column_title">{{item.title}}</view>
          <view class="column_content">{{item.contents}}</view>
          <view class="clear-fix">
            <span class="pull-left column_origin">{{item.parts}}</span>
            <span class="pull-right column_time">{{item.date}}</span>
          </view>
        </navigator>
      </uni-col>
    </uni-row>
  </view>
</template>
<script>
export default {
  props: {
    columns: {
      type: Object,
      default () {
        return {}
      }
    },
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.column02 {
  @extend .layer-contain;
  margin: $uni-spacing-row-base;
  .uni-col {
    border-bottom: 1px solid $uni-border-color;
    padding: $uni-spacing-col-base 0;
  }
  .nav-title {
    font-size: $uni-font-size-lg;
    font-weight: 600;
    margin: 0 $uni-spacing-row-base;
    border-bottom: 1px solid $uni-border-color;
    line-height: 88rpx;
    height: 88rpx;
    position: relative;
    .get-more {
      color: $uni-text-color-grey;
      font-size: $uni-font-size-base;
      font-weight: normal;
      position: absolute;
      right: 0;
    }
  }
  .content {
    background: #fff;
    overflow-y: hidden;
    display: block;
    padding: 0 $uni-spacing-row-base;
    .column_content {
      height: 3em;
      overflow: hidden;
      line-height: 1.5em;
    }
  }
  .column_title {
    color: #333;
    font-size: $uni-font-size-lg;
    line-height: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bolder;
  }
  .column_origin,
  .column_time {
    color: $uni-text-color-grey;
    font-size: $uni-font-size-sm;
  }
}
</style>