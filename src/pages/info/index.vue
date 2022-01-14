<template>
  <view class="wrap">
    <view class="head_info clear-fix">
      <view class="pull-left image_cxt">
        <image :src="imageUrl" mode="scaleToFill"></image>
      </view>
      <view class="pull-left">
        <h1>{{name}}</h1>
        <p>
          <span v-for="role in types" :key="role">{{roles[role]}}{{role!==2?"&nbsp;|&nbsp;":""}}</span>
        </p>
      </view>
    </view>
    <view class="column">
      <uni-list>
        <uni-list-item v-for="(item,index) in coulums" :key="index" :title="item.title" :to="item.url" link>
          <!-- 自定义 header -->
          <view slot="header" class="slot-box">
            <image class="slot-image" :src="item.icon" mode="widthFix"></image>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '/static/icons/touxiang.png',
      name: "姚慧",
      types: [0, 1, 2],
      roles: ['家长', '教师', '医生'],
      coulums: [{
        title: "基本信息",
        icon: "/static/icons/icon_home_wdxx.png",
        url: "/pages/info/baseInfo"
      }, {
        title: "教师信息",
        icon: "/static/icons/iconPar.png",
        url: "/pages/info/teachInfo"
      }, {
        title: "医生信息",
        icon: "/static/icons/iconDoc.png",
        url: "/pages/info/docInfo"
      }, {
        title: "宝宝档案",
        icon: "/static/icons/icon_home_bbda.png",
        url: "/pages/info/babyInfo"
      }]
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
</style>