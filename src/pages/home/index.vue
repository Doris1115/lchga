<template>
  <view class="content">
    <view>
      <image
        class="banner"
        src="/static/image/banner.png"
        mode="scaleToFill"
      ></image>
    </view>
    <view class="column-icons">
      <view class="uni-flex uni-row">
        <view
          class="flex-item"
          v-for="(item,index) in navBar"
          :key="index"
        >
          <view>
            <view
              @click="navigatorTag(item.url)"
              class="navigator-icon"
            >
              <image :src="item.icon"> </image>
            </view>
            <text>{{item.title}}</text>
          </view>
        </view>
      </view>
    </view>
    <column-item :columns="columns" />

  </view>
</template>
<script>
import ColumnItem from "@/pages/components/columnIndex.vue"
import { getQueryString } from '@/utils/nav'
import { findByOpenid } from '@/api/main.js'
import { getUrl, transfer } from "@/utils/verify.js"

export default {
  components: {
    ColumnItem,
  },
  data () {
    var url = uni.getStorageSync("urlHos") ? transfer(uni.getStorageSync("urlHos")).url : "http://39.107.74.117:9999/fybj365-abortion-love"
    return {
      url,
      id: "",
      navBar: [{
        url: '/pages/createFile/index?type=1',
        icon: "/static/image/jgyjx.png",
        title: "关爱服务"
      }, {
        url: '/pages/createFile/index?type=1',
        icon: "/static/image/zzjd.png",
        title: "自助建档"
      }, {
        url: '/pages/createFile/index?type=1',
        icon: "/static/image/zxfw.png",
        title: "流产咨询"
      }],
      columns: {
        title: "推荐阅读",
        items: [{
          title: "气血不足怎样调养身体？",
          contents: "气血不足主要表现在一下方面：一、脸色苍白、皮肤暗淡；二、头晕眼花、疲惫；三、皮肤干燥易脱发，指甲易裂...",
          parts: "流产关爱",
          date: "3小时前"
        }, {
          title: "流产多久来大姨妈正常？",
          contents: "一般来说流产后一个月左右会正常对来月经，但是有些人群因为流产不干净，或者因为子宫回复不良子宫内膜的厚度...",
          parts: "流产关爱",
          date: "3小时前"
        }, {
          title: "流产后吃什么补身体",
          contents: "建议清淡饮食汤水进补，一定要注意休息避免劳累，按照传统的小月子调养身体，鸡汤、鸽子汤、阿胶、海参都是...",
          parts: "流产关爱",
          date: "3小时前"
        }]
      }
    }
  },
  mounted () {
    this.getOpenId()
    this.onload()
  },
  methods: {
    onload () {
      if (!uni.getStorageSync('urlHos')) {
        uni.navigateTo({
          url: '/pages/info/hospital'
        })
      }
    },
    getOpenId () {
      let wxInfo = JSON.parse(getQueryString('wxuser') || '{}') || {}
      let openid = wxInfo.openid
      this.unionid = wxInfo.unionid
      uni.setStorageSync('openid', openid);
      uni.setStorageSync('wxInfo', getQueryString('wxuser'));
      this.id = openid;
      if (openid) {
        findByOpenid(this.url, {
          openid
        }).then(res => {
          if (!res.result) {
            uni.navigateTo({
              url: '/pages/info/baseInfo?isAdd=1'
            })
          } else {
            uni.setStorageSync('name', res.result.nickname);
            uni.setStorageSync('tel', res.result.tel);
            uni.setStorageSync('sex', res.result.sex);
            uni.setStorageSync('birthday', res.result.birthday);
            uni.setStorageSync('certTypes', res.result.certType);
            uni.setStorageSync('certNumber', res.result.certNumber);
          }
        })
      }
    },
    navigatorTag (url) {
      uni.navigateTo({
        url: url
      })
    },

  },
}
</script>
<style lang="scss" scoped>
@import "../../static/css/uni.css";
.banner {
  width: 750rpx;
  height: 514rpx;
}
.column-icons {
  width: 702rpx;
  background: #fff;
  border-radius: $uni-border-radius-lg;
  margin-top: -200rpx;
  z-index: 99;
  @extend .layer-contain;
  .flex-item {
    width: 234rpx;
    text-align: center;
    line-height: 1;
    padding-top: $uni-spacing-row-lg;
    .navigator-icon {
      width: 108rpx;
      height: 108rpx;
      display: inline-block;
      border-radius: 50%;
    }
    image {
      width: 100%;
      height: 100%;
    }
    text {
      display: block;
      padding-top: $uni-spacing-row-sm;
      padding-bottom: $uni-spacing-row-lg;
    }
  }
}
</style>