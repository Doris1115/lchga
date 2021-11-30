<template>
  <view class="column02">
    <view class="nav-title">
      {{columns.title}}
    </view>
    <view class="uni-flex uni-row " style=" flex-wrap:wrap">
      <view class="column-item" v-for="(item,index) in columns.column" :key="index">
        <view>
          <view v-if="item.url" @click="navigatorTag(item.url,item.icontype)" class="navigator-icon" hover-class="navigator-hover">
            <image :src="item.icon" mode="aspectFit"> </image>
          </view>
          <uni-link v-else-if="item.addurl&&item.icontype.indexOf('ruyjs')>-1" :href="item.addurl+'&openid='+openid" class="navigator-icon" hover-class="navigator-hover">
            <image :src="item.icon" mode="aspectFit"> </image>
          </uni-link>
          <uni-link v-else-if="item.addurl&&item.icontype.indexOf('zayjs')>-1&&!!isTeacher" :href="item.addurl+'&openid='+openid" class="navigator-icon" hover-class="navigator-hover">
            <image :src="item.icon" mode="aspectFit"> </image>
          </uni-link>
          <uni-link v-else-if="item.addurl&&item.icontype.indexOf('jgyjs')>-1&&isDoc" :href="item.addurl+'&openid='+openid" class="navigator-icon" hover-class="navigator-hover">
            <image :src="item.icon" mode="aspectFit"> </image>
          </uni-link>
          <view v-else class="navigator-icon" @click="messageToggle('error',item.title,item.icontype)">
            <image :src="item.icon" mode="aspectFit"> </image>
          </view>
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
import { navigateToRegist, getQueryString } from '@/utils/nav'
import { wxuserByOpenId, getSchoolId } from '@/api/main'
export default {
  props: {
    columns: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      default() {
        return 1
      }
    },
    isTeacher: {
      default() {
        return ''
      }
    }
  },
  computed: {
    openid() {
      return uni.getStorageSync('openid');
    },
    isDoc() {
      return this.type == '2' ? true : false;
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
    messageToggle(type, title, role) {
      this.msgType = type
      this.messageText = title;
      if (role.indexOf('zayjs') > -1) {
        this.messageText = "没找查到老师信息，无法进入页面";
        navigateToRegist();
      } else {
        this.messageText = "没找查到医生信息，无法进入页面";

      }
      this.$refs.message.open()
    },
    navigatorTag(url, type) {
      if (type.indexOf('zayjs') > -1) {
        if (!!this.isTeacher) {
          this.navigatorToZY(!!this.isTeacher, url)
        } else {
          this.getCardId().then(res => {
            if (!!res) {
              this.getSchoolIdByCardId(res)
            }
            this.navigatorToZY(!!res, url)
          });
        }
      } else if (type.indexOf('jgyjs') > -1) {
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
      if (!!isTeacher) {
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
    getCardId(url) {
      let wxInfo = JSON.parse(getQueryString('wxuser') || '{}') || {}
      let openid = wxInfo.openid
      let unionid = wxInfo.unionid
      return wxuserByOpenId({
        openid: openid,
        unionid: unionid
      }).then(res => {
        let cardId = ''
        if (res.result.total == 1 && res.result.records[0].bindteachid != null && res.result.records[0].bindteachid != "") {
          cardId = res.result.records[0].bindteachid;
          this.$emit("setCardId", cardId)
        } else {
          this.navigatorToZY(false, url);
        }
        return cardId
      })
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