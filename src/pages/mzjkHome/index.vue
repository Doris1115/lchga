<template>
  <view class="content">
    <view @click="navigatorTag('/pages/ruyjs/index')">
      <image class="banner" src="/static/icons/banner01.png" mode="scaleToFill"></image>
    </view>
    <ItemColumn :type="type" @register="getRegister" />
    <view class="mycl_bar uni-flex">
      <view class="left_image">
        <image src="/static/icons/ct01.png" mode="scaleToFill"></image>
      </view>
      <view class="bar_title">
        <uni-link href="https://appuv0dgrco8427.h5.xiaoeknow.com/homepage/10" :showUnderLine="false">
          <h1>
            您的<span>母婴课堂学习了吗</span>
          </h1>
          <p class="bar_text">今天您上课了吗？</p>
        </uni-link>
      </view>
      <view class="right_image">
        <image src="/static/icons/text_02.png" mode="scaleToFill"></image>
      </view>
    </view>
    <view class="home_wrap_column2 uni-flex">
      <view class="home_yybk">
        <item-column-yybk :column="yybkData" />
      </view>
      <view class="home_grap">
      </view>
      <view class="home_fwzs">
        <item-column-myfw :column="myfwData" />
      </view>
    </view>

  </view>
</template>
<script>
import ItemColumn from '@/pages/components/columnMZJK'
import ItemColumnYybk from '@/pages/components/columnYYBK'
import ItemColumnMyfw from '@/pages/components/columnMYFW'
import { wxuserByOpenId, getSchoolId, getUserType, getChiTrasfer } from '@/api/main'
import { getQueryString } from '@/utils/nav'

export default {
  components: {
    ItemColumn,
    ItemColumnYybk,
    ItemColumnMyfw
  },
  data() {
    return {
      id: "",
      type: [0, 1],
      schoolId: '',
      myfwData: {
        title: "母婴服务助手",
        items: [{
          text: "自助建档",
          icon: "/static/icons/icon_home_zzjd.png",
          url: "/pages/createFile/index"
        }, {
          text: "宝宝档案",
          icon: "/static/icons/icon_home_bbda.png",
          url: "/pages/info/babyInfo"
        }, {
          text: "产妇信息",
          icon: "/static/icons/icon_home_cfxx.png",
          url: "/pages/info/baseInfo"
        }]
      },
      yybkData: {
        title: "/static/icons/text_yybk.png",
        items: [{
          title: "科学监测和管理孩子的身高，家长的责任很重要",
          text: "儿童保健",
          time: "3小时前"
        }, {
          title: "科学监测和管理孩子的身高，家长的责任很重要",
          text: "儿童保健",
          time: "3小时前"
        }, {
          title: "科学监测和管理孩子的身高，家长的责任很重要",
          text: "儿童保健",
          time: "3小时前"
        }]
      }
    }
  },
  onLoad() {
    // this.getOpenId();
    this.getRoleType();
  },
  methods: {
    navigatorTag(url) {
      uni.navigateTo({
        url: url
      })
    },
    getOpenId() {
      let wxInfo = JSON.parse(getQueryString('wxuser') || '{}') || {}
      let openid = uni.getStorageSync('openid') || wxInfo.openid;
      if (!!openid) {
        return new Promise((resolve, reject) => {
          this.id = wxInfo.openid;
          this.unionid = wxInfo.unionid;
          uni.setStorageSync('openid', openid);
          uni.setStorageSync('wxInfo', getQueryString('wxuser'));
          this.getCardCodeAndSchoolId()
          return resolve(openid)
        })
      } else {
        alert(3)
      }
    },
    getUserOpenId() {
      return wxuserByOpenId({
        openid: this.id,
        unionid: this.unionid
      }).then(res => {
        let cardId = ''
        if (res.result.total == 1 && res.result.records[0].bindteachid != null && res.result.records[0].bindteachid != "") {
          this.cardId = res.result.records[0].bindteachid;
          cardId = res.result.records[0].bindteachid;
          uni.setStorageSync('cardId', this.cardId);
        } else {
          this.cardId = '';
          this.registerUrl = "http://wfw.fybj365.com/kidsorginfo/kt_regist.html?wxuser=" + uni.getStorageSync('wxInfo');
        }
        uni.stopPullDownRefresh();
        return cardId
      })
    },
    getRoleType() {
      this.getOpenId().then(res => {
        this.getUser(res)
        return res;
      }).then(res => {
        this.getUid(res)
      });
    },
    getUser(openid) {
      getUserType({
        openid
      }).then(res => {
        this.type = [res.usertype - 0];
      }).catch((err) => {
        this.getRegister()
      })
    },
    getUid(openid) {
      getChiTrasfer({ openid }).then(res => {
        if (res.length > 0) {
          let uid = res.find(item => item.uid)['uid'];
          uni.setStorageSync('uid', uid);
        }
      })
    },
    getRegister() {
      this.msgType = 'error'
      this.messageText = '没有找到注册信息，请前往母子手册注册'
      this.$refs.message.open()
      window.location.href = 'http://wx.fybj365.com/wxoauth/redirect?thirdurl=http://wx.fybj365.com/weixin/chiTrasfer'
    },
    getCardCodeAndSchoolId() {
      this.getUserOpenId().then(res => {
        if (!!res) {
          this.getSchoolIdByCardId(res)
        }
      });
    },
    getSchoolIdByCardId(cardId) {
      getSchoolId({
        cardId
      }).then(res => {
        if (!res.code) {
          this.schoolId = res.result[0].schoolId
          uni.setStorageSync('schoolId', this.schoolId);
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import "../../static/css/uni.css";
.banner {
  width: 750rpx;
  height: 356rpx;
}
.mycl_bar {
  @extend .layer-contain;
  align-items: center;
  padding: $uni-spacing-row-base 0;
  .left_image {
    margin-left: $uni-spacing-row-base;
    width: 126rpx;
    height: 126rpx;
    uni-image {
      width: 126rpx;
      height: 126rpx;
    }
  }
  .right_image {
    margin-right: $uni-spacing-row-base;
    uni-image {
      width: 160rpx;
      height: 56rpx;
    }
  }
  .bar_title {
    margin-left: $uni-spacing-row-base;
    flex: 1;
    h1 {
      font-size: $uni-font-size-lg;
    }
    span {
      color: $uni-color-primary;
    }
  }
  .bar_text {
    color: $uni-text-color-grey;
    font-size: $uni-font-size-sm;
  }
}
.home_wrap_column2 {
  @extend .layer-contain;
  background: none;
  margin-top: $uni-spacing-col-base;
  .home_grap {
    width: $uni-spacing-row-sm;
  }
  .home_yybk {
    flex: 1;
    border-radius: 12rpx;
    background: #fff;
    height: 360rpx;
  }
  .home_fwzs {
    flex: 1;
    height: 360rpx;
  }
}
</style>