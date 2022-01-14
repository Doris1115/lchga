<template>
  <view>
    <view class="column">
      <view class="wrap" v-if="coulums.length>0">
        <uni-list class="column_baby">
          <uni-list-item v-for="(item,index) in coulums" :key="index" :title="item.title" :to="item.url" link :class="{'redbg':item.bid==currentBid&&item.sex==1,'bluebg':item.bid==currentBid&&item.sex==0}" class="item_column" @click="getChildDetail(item)">
            <!-- 自定义 header -->
            <view slot="header" class="slot-box">
              <image class="slot-image" :src="item.sex?femaleUrl:maleUrl" mode="widthFix"></image>
            </view>
            <view slot="body" class="slot-body">
              <view class="name">{{item.name}}</view>
              <view class="birth">{{item.birth}}</view>
            </view>
          </uni-list-item>
        </uni-list>
        <button type="primary" class="submit_btn" @click="addChild">增加宝贝</button>
      </view>
      <view class="empty" v-else>
        <image :src="empty_icon" mode="aspectFit" class="empty_image"> </image>
        <p class="text">您还没有添加宝贝信息</p>
        <button type="primary" size="mini" plain class="submit_btn02" @click="addChild">增加宝贝</button>
      </view>

    </view>
  </view>
</template>
<script>
import { getChiTrasfer } from '@/api/main'

export default {
  data() {
    return {
      femaleUrl: "/static/icons/girl.png",
      maleUrl: "/static/icons/boy.png",
      empty_icon: "/static/icons/empty.png",
      active: "mimi",
      currentBid: '764715',
      coulums: []//0为男，1为女
    }
  },
  mounted() {
    this.getBabyInfo();
  },
  methods: {
    getActiveCoulums() {


    },
    getBabyInfo() {
      let openid = uni.getStorageSync('openid');
      getChiTrasfer({ openid }).then(res => {
        this.coulums = res.map(item => {
          return {
            sex: item.babySex == '男孩' ? 0 : 1,
            name: item.childName ? item.childName : "宝宝",
            birth: item.childBirth,
            bid: item.bid
          }
        })
      })
    },
    addChild() {
      uni.navigateTo({
        url: `/pages/info/addBaby`
      })
    },
    getChildDetail(data) {
      uni.navigateTo({
        url: `/pages/info/babyInfoItem?sex=${data.sex}&name=${data.name}&birth=${data.birth}&bid=${data.bid}`
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.slot-image {
  width: 92rpx;
  height: 92rpx;
  margin-right: $uni-spacing-row-base;
}
.name {
  font-size: $uni-font-size-base;
  color: $uni-text-color;
  line-height: 1.5em;
  margin-top: 10rpx;
}
.birth {
  font-size: $uni-font-size-sm;
  color: $uni-text-color-grey;
  line-height: 1.5em;
}
.uni-flex {
  align-items: center;
}
.redbg {
  background: #fae8ec;
}
.bluebg {
  background: #eaedfa;
}
.uni-list {
  background: none;
}
.submit_btn {
  margin: 60rpx $uni-spacing-row-lg 0;
  border-radius: 90rpx;
}
.column_baby {
  margin-top: $uni-spacing-col-lg;
}
.item_column {
  margin-top: $uni-spacing-col-base;
}
.empty_image {
  width: 320rpx;
  height: 320rpx;
  margin: auto;
  display: block;
  margin-top: 168rpx;
}
.text {
  color: $uni-text-color;
  font-size: $uni-font-size-base;
  text-align: center;
  margin-top: 48rpx;
  margin-bottom: 32rpx;
}
.submit_btn02 {
  margin: auto;
}
.empty {
  text-align: center;
  overflow: hidden;
}
</style>