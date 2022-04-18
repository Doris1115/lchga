<template>
  <view>
    <view class="column">
      <view class="wrap">
        <uni-list
          class="column_baby"
          :border="false"
        >
          <uni-list-item
            class="item_column"
            to="/pages/createFile/sczx"
          >
            <view
              slot="body"
              class="slot-body"
            >
              <uni-row>
                <uni-col
                  :span='24'
                  class="title-column"
                >
                  首次咨询
                </uni-col>
              </uni-row>
              <uni-row>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">近期孕育计划</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">0</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">本次妊娠原因</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">0</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
              </uni-row>
              <view class="status">2022-03-23</view>
              <navigator class="sf-list">查看详情</navigator>
            </view>
          </uni-list-item>
          <uni-list-item
            class="item_column"
            to="/pages/createFile/scsf"
          >
            <view
              slot="body"
              class="slot-body"
            >
              <uni-row>
                <uni-col
                  :span='24'
                  class="title-column"
                >
                  首次随访
                </uni-col>
              </uni-row>
              <uni-row>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">&nbsp;恢复性生活&nbsp;</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">0</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">&nbsp;恢&nbsp;复&nbsp;月&nbsp;经&nbsp;</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">0</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
              </uni-row>
              <view class="status">2022-04-12</view>
              <navigator class="sf-list">查看详情</navigator>
            </view>
          </uni-list-item>
          <uni-list-item
            v-for="(items,index) in coulums"
            :key="index"
            class="item_column"
            :border="false"
            to="/pages/createFile/sfxq"
          >
            <view
              slot="body"
              class="slot-body"
            >
              <uni-row>
                <uni-col
                  :span='24'
                  class="title-column"
                >
                  {{items.title}}
                </uni-col>
              </uni-row>
              <uni-row
                v-for="(item,iindex) in items"
                :key="iindex"
              >
                <uni-col :span="24">
                  <uni-row
                    class="demo-uni-row"
                    v-if="dic[iindex]"
                  >
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">{{dic[iindex]}}</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">{{item}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
              </uni-row>
              <view class="status">{{items.time}}</view>
              <navigator class="sf-list">查看详情</navigator>
            </view>

          </uni-list-item>
        </uni-list>
        <button
          type="primary"
          class="submit_btn"
          @click="addChild"
        >新增随访记录</button>
      </view>

    </view>
  </view>
</template>
<script>
import { getChiTrasfer } from '@/api/main'

export default {
  data () {
    return {
      empty_icon: "/static/icons/empty.png",
      coulums: [],
      dic: {
        type: `  随 诊 方 式 `,
        sfywhy: "再次意外妊娠",
      }
    }
  },
  mounted () {
    this.getBabyInfo();
  },
  methods: {
    getBabyInfo () {
      getChiTrasfer({}).then(res => {
        this.coulums = [{
          title: "三月随访",
          type: "1",
          time: "2022-04-18",
          sfywhy: "1",
        }, {
          title: "六月随访",
          type: "1",
          time: "2022-04-18",
          sfywhy: "1",
        }]
      })
    },
    addChild (data) {
      uni.navigateTo({
        url: `/pages/info/addBaby`
      })
    },
    getChildDetail (data) {
      uni.navigateTo({
        url: `/pages/createFile/index`
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.column_baby {
  @extend .layer-contain;
  background: none;
  padding-top: $uni-spacing-col-lg;
  .slot-body {
    width: 100%;
    position: relative;
    .status {
      position: absolute;
      right: 0;
      top: 10rpx;
      z-index: 99;
      color: $uni-text-color-grey;
      // border: 1px solid $uni-text-color-grey;
      // padding: 0 $uni-spacing-col-base;
      // border-radius: $uni-border-radius-base;
      font-size: $uni-font-size-sm;
      // background: #fdfafa;
      &.active {
        color: $uni-color-base;
        border: 1px solid $uni-color-base;
        background: #fdf6f6;
      }
    }
    .sf-list {
      position: absolute;
      right: 0;
      bottom: 10rpx;
      z-index: 999;
      font-size: $uni-font-size-sm;
      // background: red;
      text-align: right;
      color: $uni-color-base;
      border: 1px solid $uni-color-base;
      background: #fdf6f6;
      padding: 0 $uni-spacing-col-base;
      border-radius: $uni-border-radius-base;
    }
  }
  .uni-list-item {
    margin-bottom: $uni-spacing-col-base;
  }
}
.uni-list {
  &::before,
  &::after {
    height: 0px !important;
  }
}
.title-column {
  font-size: $uni-font-size-lg;
  font-weight: bolder;
  border-bottom: 1px solid $uni-border-color;
  padding-bottom: $uni-spacing-col-sm;
  margin-bottom: $uni-spacing-col-base;
}
</style>