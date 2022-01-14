<template>
  <view class="column02">
    <view class="title_box">
      <h1 class="title">{{column.title}}</h1>
      <view class="content">
        <uni-row>
          <uni-col v-for="(item,index) in column.items" :key="index">
            <view class="wrap uni-flex" @click="navigatorTag(item.url)">
              <image :src="item.icon" class="pull-left image_icon" mode="widthFix"> </image>
              <view class="image_text ">{{item.text}}</view>
              <image class="pull-right image_arrow" src="/static/icons/arrow.png"></image>
            </view>
          </uni-col>
        </uni-row>

      </view>
    </view>
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="2000" class="pop-tip"></uni-popup-message>
    </uni-popup>
  </view>
</template>
<script>
//母婴服务
export default {
  props: {
    column: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      msgType: 'error',
      messageText: "该功能暂未开发..."
    }
  },
  methods: {
    navigatorTag(url) {
      if (!!url) {
        uni.navigateTo({
          url: url
        })
      } else {
        this.$refs.message.open()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.column02 {
  border-radius: 10rpx;
  background-color: #3375fe;
  overflow: hidden;
  background-image: url("../../static/icons/shuiyin.png");
  background-size: 105rpx 68rpx;
  background-position: right $uni-spacing-col-base top $uni-spacing-col-sm;
  background-repeat: no-repeat;
  .title {
    font-size: $uni-font-size-base;
    color: $uni-text-color-inverse;
    padding: $uni-spacing-row-base 0 $uni-spacing-col-lg $uni-spacing-col-base;
    line-height: 1em;
  }
  .content {
    background: #fff;
    margin: 0 $uni-spacing-col-base $uni-spacing-col-lg $uni-spacing-col-base;
    border-radius: 10rpx;
    padding: 12rpx 22rpx;
    .uni-col {
      padding: $uni-spacing-col-base 0;
      align-items: center;
    }
    .image_icon {
      width: 52rpx;
      margin-right: $uni-spacing-row-base;
    }
    .image_text {
      flex: 1;
      font-size: $uni-font-size-sm;
    }
    .image_arrow {
      width: 10rpx;
      height: 18rpx;
    }
  }
}
.pop-tip {
  text-align: center;
}
</style>