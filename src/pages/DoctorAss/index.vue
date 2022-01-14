<template>
  <view class="content">
    <image class="logo" src="/static/icons/banner.png" mode="widthFix"></image>
    <view class="contain">
      <ItemColumn :columns='yszs' />
    </view>
  </view>
</template>
<script>
import ItemColumn from '@/pages/components/column'

export default {
  components: {
    ItemColumn,
  },
  data() {
    return {
      yszs: {
        title: "医生助手",
        column: [{
          addurl: 'http://wx.fybj365.com/weixin/housecall/findGraList?openid=onfOMt_SfHBAfebi3Wx9egzSXqCM',
          icon: "/static/icons/ycfgl.png",
          icontype: "ruyjs",
          title: "孕产妇管理"
        }, {
          addurl: 'http://wx.fybj365.com/weixin/chiTrasfer2?wxVersion=17032601&userType=2&userid=387450&flag=0',
          icon: "/static/icons/gwycfgl.png",
          icontype: "ruyjs",
          title: "高危孕产妇管理"
        }, {
          addurl: 'http://wx.fybj365.com/weixin/chiTrasfer2?wxVersion=17032601&userType=2&userid=387450&flag=0',
          icon: "/static/icons/ycfyy.png",
          icontype: "ruyjs",
          title: "孕产妇预约"
        }, {
          addurl: 'http://wx.fybj365.com/weixin/chiTrasfer2?wxVersion=17032601&userType=2&userid=387450&flag=0',
          icon: "/static/icons/chfs.png",
          icontype: "ruyjs",
          title: "产后访视"
        }, {
          addurl: 'http://wx.fybj365.com/weixin/chiTrasfer2?wxVersion=17032601&userType=2&userid=387450&flag=0',
          icon: "/static/icons/etgl.png",
          icontype: "ruyjs",
          title: "儿童管理"
        }, {
          addurl: 'http://wx.fybj365.com/weixin/chiTrasfer2?wxVersion=17032601&userType=2&userid=387450&flag=0',
          icon: "/static/icons/ytjf.png",
          icontype: "ruyjs",
          title: "儿童家访"
        }, {
          addurl: 'http://wx.fybj365.com/weixin/chiTrasfer2?wxVersion=17032601&userType=2&userid=387450&flag=0',
          icon: "/static/icons/etyy.png",
          icontype: "ruyjs",
          title: "儿童预约"
        }, {
          addurl: 'http://wx.fybj365.com/weixin/chiTrasfer2?wxVersion=17032601&userType=2&userid=387450&flag=0',
          icon: "/static/icons/jgyjs.png",
          icontype: "ruyjs",
          title: "监督一件事"
        },]
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.logo {
  width: calc(100% - 2 * $uni-spacing-row-base);
  margin-top: $uni-spacing-row-lg;
}
</style>