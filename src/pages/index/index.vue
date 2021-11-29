<template>
  <view class="content">
    <image class="logo" src="/static/image/bg02.png"></image>
    <view class="contain">
      <view class="nav-bar">
        <view class="uni-flex uni-row">
          <view class="flex-item" v-for="(item,index) in navBar" :key="index">
            <view>
              <view @click="navigatorTag(item.url)" class="navigator-icon">
                <image :src="item.icon"> </image>
              </view>
              <text>{{item.title}}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="toggel-role clear-fix">
        <view class="pull-left clear-fix">
          <text v-if="type==2" class="pull-left">我的身份是医生</text>
          <text v-else class="pull-left">我的身份是家长</text>
          <image v-if="type==2" class="icon pull-left" src="/static/image/iconDoc.png" mode="scaleToFill"></image>
          <image v-else class="icon pull-left" src="/static/image/iconPar.png" mode="scaleToFill"></image>
        </view>
        <view class="pull-right" @click="toggleRole">
          <text v-if="type==2">切换到家长</text>
          <text v-else>切换到医生</text>
        </view>
      </view>
      <view class="nav-layer">
        <view class="nav-column" v-for="(column,index) in navLayer" :key="index">
          <ItemColumn :columns='column' :type="type" :isTeacher="cardId" @setCardId="setCardId" />
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
import { ruyjs, zayjs, jgyjs, getQueryString, navigateToRegist } from '@/utils/nav'
import ItemColumn from '@/pages/components/column'
import { getUserType, toggleUserType, wxuserByOpenId, getSchoolId } from '@/api/main'

export default {
  components: {
    ItemColumn
  },
  data() {
    return {
      title: '数字托育',
      navBar: [{
        url: '/pages/ruyjs/index',
        icon: "/static/image/rtyjs.png",
        title: "入托一件事"
      }, {
        url: '/pages/ztyjs/index',
        icon: "/static/image/ztyjs.png",
        title: "在托一件事"
      }, {
        url: '/pages/jgyjs/index',
        icon: "/static/image/jgyjx.png",
        title: "监管一件事"
      }],
      navLayer: [ruyjs, zayjs, jgyjs],
      id: '',
      type: 1,
      unionid: "",
      msgType: 'success',
      messageText: "切换成功",
      cardId: '',
      registerUrl: '',
      schoolId: ''
    }
  },
  onPullDownRefresh() {
    this.getUserOpenId()
  },
  onLoad() {
    this.getOpenId();
  },
  methods: {
    getOpenId() {
      let wxInfo = JSON.parse(getQueryString('wxuser') || '{}') || {}
      let openid = wxInfo.openid
      this.unionid = wxInfo.unionid
      uni.setStorageSync('openid', openid);
      uni.setStorageSync('wxInfo', getQueryString('wxuser'));
      this.id = openid;
      this.getRoleType();
      this.getUserOpenId()
    },
    getRoleType() {
      getUserType({
        openid: this.id
      }).then(res => {
        this.type = res.usertype
      }).catch((err) => {
        this.msgType = 'error'
        this.messageText = '没有找到注册信息，请前往母子手册注册'
        this.$refs.message.open()
        window.location.href = 'http://wx.fybj365.com/wxoauth/redirect?thirdurl=http://wx.fybj365.com/weixin/chiTrasfer'
      })
    },
    toggleRole() {
      let type = this.type == 1 ? 2 : 1;
      toggleUserType({
        openid: this.id,
        usertype: type
      }).then(res => {
        if (res.flage) {
          this.type = type;
          this.msgType = 'success';
          this.messageText = '切换成功'
          uni.setStorageSync('type', type);
          this.$refs.message.open()
        } else {
          this.msgType = 'error'
          this.messageText = '没有查到医生信息，无法切换到医生角色'
          this.$refs.message.open()
        }
      })
    },
    getUserOpenId() {
      return wxuserByOpenId({
        openid: this.id,
        unionid: this.unionid
      }).then(res => {
        if (res.result.total == 1 && res.result.records[0].bindteachid != null && res.result.records[0].bindteachid != "") {
          this.cardId = JSON.stringify(res.result.records[0].bindteachid);
          uni.setStorageSync('cardId', this.cardId);
          uni.stopPullDownRefresh();
        } else {
          this.cardId = '';
          this.registerUrl = "http://wfw.fybj365.com/kidsorginfo/kt_regist.html?wxuser=" + uni.getStorageSync('wxInfo');
        }
        return res.result.records[0].bindteachid
      }).then(res => {
        this.getSchoolIdByCardId(res)
        return res;
      })
    },
    navigatorTag(url) {
      if (url.indexOf('ztyjs') > 0) {
        if (!!this.cardId) {
          this.navigatorToZY(!!this.cardId, url)
        } else {
          this.getUserOpenId().then(res => {
            this.navigatorToZY(!!res, url)
          })
        }
      } else if (url.indexOf('jgyjs') > 0) {
        if (this.type == '2') {
          uni.navigateTo({
            url: url
          })
        } else {
          this.msgType = 'error'
          this.messageText = '没找查到医生信息，无法进入页面'
          this.$refs.message.open()
        }
      } else {
        uni.navigateTo({
          url
        })
      }
    },
    navigatorToZY(isTeacher, url) {
      if (isTeacher) {
        uni.navigateTo({
          url: url
        })
      } else {
        this.msgType = 'error'
        this.messageText = '没找查到老师信息，无法进入页面'
        this.$refs.message.open()
        navigateToRegist();
      }
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
    setCardId(val) {
      this.cardId = val;
      uni.setStorageSync('cardId', this.cardId);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../static/css/uni.css";

.logo {
  width: 750rpx;
  height: 435rpx;
  margin: 0;
  position: absolute;
  top: 0;
}
.contain {
  position: absolute;
  top: 360rpx;
  overflow: hidden;
  left: 24rpx;
}
.nav-bar {
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
      display: inline-block;
      padding-top: $uni-spacing-row-sm;
      padding-bottom: $uni-spacing-row-lg;
    }
  }
}
.nav-layer {
  overflow: hidden;
  padding-bottom: 60rpx;
  .nav-column {
    @extend .layer-contain;
    margin-bottom: $uni-spacing-row-base;
  }
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
.toggel-role {
  @extend .layer-contain;
  // margin: 0 $uni-spacing-row-base;
  margin-top: $uni-spacing-row-base;
  height: 98rpx;
  line-height: 98rpx;

  .pull-left {
    margin-left: $uni-spacing-row-base;
    text {
      font-size: $uni-font-size-lg;
    }
  }
  .icon {
    width: 48rpx;
    height: 48rpx;
    margin-left: 12rpx;
    margin-top: 25rpx;
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
.pop-tip {
  text-align: center;
}
</style>
