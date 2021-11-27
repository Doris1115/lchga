<template>
  <view class="column02">
    <view class="nav-title">
      {{columns.title}}
    </view>
    <view class="uni-flex uni-row " style=" flex-wrap:wrap">
      <view class="column-item" v-for="(item,index) in columns.column" :key="index">
        <view>
          <view v-if="item.url&&!!isTeacher" @click="navigatorTag(item.url)" class="navigator-icon" hover-class="navigator-hover">
            <image :src="item.icon" mode="aspectFit"> </image>
          </view>
          <uni-link v-else-if="item.addurl&&!!isTeacher" :href="item.addurl" class="navigator-icon" hover-class="navigator-hover">
            <image :src="item.icon" mode="aspectFit"> </image>
          </uni-link>
          <view v-else-if="!isTeacher" class="navigator-icon" @click="messageToggle('error',textError)">
            <image :src="item.icon" mode="aspectFit"> </image>
          </view>
          <view v-else class="navigator-icon" @click="messageToggle('warn',item.title,true)">
            <image :src="item.icon" mode="aspectFit"> </image>
          </view>
          <!-- <text>{{item.url?item.url:'/pages/webView/index?title='+item.title+'&addurl='+item.addurl}}</text> -->
          <text>{{item.title}}</text>
        </view>
      </view>
    </view>
    <view>
      <!-- 提示信息弹窗 -->
      <uni-popup ref="message" type="message">
        <uni-popup-message :type="msgType" :message="messageText" :duration="2000" class="pop-tip"></uni-popup-message>
      </uni-popup>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    columns: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  computed: {
    isTeacher() {
      return uni.getStorageSync('cardId');

    }
  },
  data() {
    return {
      msgType: 'warn',
      messageText: "开发中...",
      textError: "没找查到老师信息，无法进入页面"
    }
  },
  methods: {
    messageToggle(type, title, status) {
      this.msgType = type
      this.messageText = status ? `${title}功能正在开发中...` : title;
      this.$refs.message.open()
    },
    navigatorTag(url) {
      if (url.indexOf('ztyjs') > 0) {
        if (!!this.cardId) {
          uni.navigateTo({
            url: url
          })
        } else {
          this.msgType = 'error'
          this.messageText = '没找查到老师信息，无法进入页面'
          this.$refs.message.open()
        }
      } else {
        uni.navigateTo({
          url
        })

      }
    }
  },
}
</script>

<style lang="scss" scoped>
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
      &.uni-link {
        padding-bottom: 0 !important;
      }
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
.pop-tip {
  text-align: center;
}
</style>