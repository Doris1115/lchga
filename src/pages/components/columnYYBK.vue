<template>
  <view class="column02">
    <view class="title_box">
      <image :src="column.title" class="image_title" mode="widthFix"> </image>
      <uni-row class="content">
        <uni-col v-for="(item,index) in column.items" :key="index">
          <navigator class="wrap" url="/pages/ztyjs/index">
            <view class="column_title">{{item.title}}</view>
            <view class="clearfix">
              <span class="pull-left column_origin">{{item.text}}</span>
              <span class="pull-left column_time">{{item.time}}</span>
            </view>
          </navigator>
        </uni-col>
      </uni-row>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    column: {
      type: Object,
      default() {
        return {}
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.content {
  background: #fff;
  height: 260rpx;
  overflow-y: hidden;
  display: block;
}
.title_box {
  margin: $uni-spacing-row-base;
  align-items: stretch;
}
.image_title {
  width: 116rpx;
}
.column_title {
  color: #333;
  font-size: $uni-font-size-sm;
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: $uni-spacing-col-sm;
}
.column_origin,
.column_time {
  color: $uni-text-color-grey;
  font-size: 18rpx;
  margin-right: $uni-spacing-row-base;
}
</style>