<template>
  <view class="wrap">
    <view class="head_info clear-fix">
      <view class="pull-left image_cxt">
        <image
          :src="imageUrl"
          mode="scaleToFill"
        ></image>
      </view>
      <view class="pull-left">
        <h1>{{name}}</h1>
        <p>
          <span>{{sex?"男":"女"}}</span>
        </p>
      </view>
    </view>
    <view class="column">
      <uni-list>
        <uni-list-item
          v-for="(item,index) in coulums"
          :key="index"
          :title="item.title"
          :to="item.url"
          link
        >
          <!-- 自定义 header -->
          <view
            slot="header"
            class="slot-box"
          >
            <image
              class="slot-image"
              :src="item.icon"
              mode="widthFix"
            ></image>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view
      class="login-out"
      v-if="false"
    >
      <button
        type="primary"
        class="submit_btn"
      >退出登录</button>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    var wxInfo = JSON.parse(uni.getStorageSync("wxInfo"))
    return {
      imageUrl: wxInfo.headimgurl,
      name: wxInfo.nickname,
      types: [0, 1, 2],
      sex: wxInfo.sex,
      coulums: [{
        title: "我的资料",
        icon: "/static/icons/wdxx.png",
        url: "/pages/info/baseInfo"
      }, {
        title: "随访列表",
        icon: "/static/icons/sflb.png",
        url: "/pages/sfList/lists"
      }, {
        title: "就诊医院",
        icon: "/static/icons/sflb.png",
        url: "/pages/info/hospital"
      },]
    }
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  .head_info {
    padding: $uni-spacing-row-base;
    background: #fff;
  }
  .image_cxt {
    overflow: hidden;
    margin-right: $uni-spacing-row-lg;
    margin-left: 4rpx;
    width: 116rpx;
    height: 116rpx;
    image {
      width: 116rpx;
      height: 116rpx;
    }
  }
  h1 {
    font-size: 42rpx;
    color: #333;
    line-height: 1.5em;
  }
  span {
    color: $uni-text-color-grey;
    font-size: $uni-font-size-base;
  }
  .column {
    margin-top: $uni-spacing-col-base;
  }
}
.slot-image {
  width: 42rpx;
  margin-right: $uni-spacing-row-lg;
}
.slot-box {
  height: 42rpx;
}
::v-deep .uni-list-item__container {
  align-items: center;
}
::v-deep .uni-list-item__content-title {
  font-size: 30rpx;
  line-height: 1em;
}
.submit_btn {
  background: #fff;
  color: #dadada;
  border: 1px solid #dadada !important;
  margin: 60rpx $uni-spacing-row-lg 0 $uni-spacing-row-lg;
  border-radius: 60rpx;
}
</style>