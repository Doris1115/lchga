<template>
  <view class="column02">
    <view class="uni-flex uni-row " style=" flex-wrap:wrap">
      <view class="column-item" v-for="(item,index) in mzjkNavIcons" :key="index">
        <view>
          <view @click="navigatorTag(item.url)" class="navigator-icon" hover-class="navigator-hover">
            <image :src="item.images" mode="aspectFit"> </image>
          </view>
          <text>{{item.title}}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
//母子健康导航
import { mzjkNavIcons } from '@/utils/nav'
export default {
  props: {
    type: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    type(newValue, oldValue) {
      if (newValue) {
        this.setTypeNavIcon();
      }
    }
  },
  mounted() {
    // this.setTypeNavIcon();
  },
  data() {
    return {
      mzjkNavIcons
    }
  },
  methods: {
    navigatorTag(url) {
      uni.navigateTo({
        url
      })
    },
    setTypeNavIcon() {
      if (this.type.indexOf(0) > -1 && this.type.indexOf(1) < 0) {//家长非医生
        this.mzjkNavIcons = this.mzjkNavIcons.filter(item => {
          if (item.text == 'wdxx') {
            item.url = ''
            item.title = '家长'
          }
          return item.text !== 'yszs'
        })
      } else if (this.type.indexOf(0) < 0 && this.type.indexOf(1) > 0) {//医生非家长
        this.mzjkNavIcons = this.mzjkNavIcons.filter(item => {
          if (item.text == 'wdxx') {
            item.url = ''
            item.title = '医生'
          }
          return item.text !== 'mzjk'
        })
      } else if (this.type.indexOf(0) < 0 && this.type.indexOf(1) < 0) {
        this.$emit('register')
      } else {
        this.mzjkNavIcons = this.mzjkNavIcons.filter(item => {
          return item.text !== 'wdxx'
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.column02 {
  width: 702rpx;
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
.navigator-hover {
  background: none;
}
</style>