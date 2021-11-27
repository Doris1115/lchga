<template>
  <view class="content">
    <image class="logo" src="/static/image/bg02.png"></image>
    <view class="wrap">
      <view class="container" v-for="(item,index) in column " :key="index">
        <view class="column">
          <view class="clear-fix title-column">
            <view class="title">{{item.name}}</view>
            <view class="age">{{item.age}}</view>
            <view class="status" :class="{'isCheck':!item.status}">{{item.status?'未检':"已检"}}</view>
          </view>
          <view class="item-column clear-fix">
            <view class="item">{{item.item}}</view>
            <view class="time">（{{item.time}}）</view>
          </view>
          <view class="table-column clear-fix">
            <view class="table-item">
              <text class="table-header">
                出生年月
              </text>
              <text class="table-detail">
                {{item.birth}}
              </text>
            </view>
            <view class="table-item">
              <text class="table-header">
                保健卡号
              </text>
              <text class="table-detail">
                {{item.code}}
              </text>
            </view>
            <view class="table-item">
              <text class="table-header">
                父亲姓名
              </text>
              <text class="table-detail">
                {{item.dad}}
              </text>
            </view>
            <view class="table-item">
              <text class="table-header">
                母亲姓名
              </text>
              <text class="table-detail">
                {{item.mom}}
              </text>
            </view>
            <view class="table-item">
              <text class="table-header">
                联系人
              </text>
              <text class="table-detail">
                {{item.contact}}
              </text>
            </view>
            <view class="table-item">
              <text class="table-header">
                联系电话
              </text>
              <text class="table-detail">
                {{item.tel}}
              </text>
            </view>
          </view>
          <view class="address">
            {{item.address}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      column: [{
        'address': "江苏省泰州市靖江市景城街道办团结路",
        'contact': "李天",
        "tel": "18874287780",
        'code': "221321312",
        'birth': "2021-07-30",
        'status': 1,
        'mom': "章悦",
        'item': "一岁内体检",
        'dad': "李天",
        'time': "2021-11-10",
        'age': "6月20天",
        "name": "李小璐"
      }, {
        'address': "江苏省泰州市靖江市景城街道办团结路",
        'contact': "李天",
        "tel": "18874287780",
        'code': "221321312",
        'birth': "2021-07-30",
        'status': 1,
        'mom': "章悦",
        'item': "一岁内体检",
        'dad': "李天",
        'time': "2021-11-10",
        'age': "6月20天",
        "name": "李小璐"
      }, {
        'address': "江苏省泰州市靖江市景城街道办团结路",
        'contact': "李天",
        "tes": "18874287780",
        'code': "221321312",
        'birth': "2021-07-30",
        'status': 0,
        'mom': "章悦",
        'item': "一岁内体检",
        'dad': "李天",
        'time': "2021-11-10",
        'age': "6月20天",
        "name": "李小璐"
      }, {
        'address': "江苏省泰州市靖江市景城街道办团结路",
        'contact': "李天",
        "tes": "18874287780",
        'code': "221321312",
        'birth': "2021-07-30",
        'status': 1,
        'mom': "章悦",
        'item': "一岁内体检",
        'dad': "李天",
        'time': "2021-11-10",
        'age': "6月20天",
        "name": "李小璐"
      }]
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../../static/css/uni.css";
.logo {
  width: 750rpx;
  height: 435rpx;
  margin: 0;
  position: fixed;
  top: 0;
}
.tag {
  height: 32rpx;
  line-height: 32rpx;
  font-size: $uni-font-size-sm;
  margin-left: 12rpx;
  padding: 0 12rpx;
  border-radius: $uni-border-radius-sm;
}
.wrap {
  z-index: 99;
  width: 100%;
  margin-top: $uni-spacing-row-lg;
  .container {
    @extend .layer-contain;
    margin: 0 $uni-spacing-row-base $uni-spacing-row-base;
    .title-column {
      border-bottom: 1px solid $uni-border-color;
      padding-top: $uni-spacing-col-sm;
      padding-bottom: $uni-spacing-col-lg;
    }
    .column {
      padding: $uni-spacing-row-base;
      .title {
        @extend.pull-left;
        font-size: $uni-font-size-base;
        font-weight: 600;
        line-height: 32rpx;
      }
      .age {
        @extend.pull-left;
        @extend.tag;
        color: #e99235;
        background: #fcefe1;
      }
      .status {
        @extend.pull-left;
        @extend.tag;
        color: #d34247;
        background: #fedee4;
        &.isCheck {
          color: #1fa63b;
          background: #def2e2;
        }
      }
    }
    .item-column {
      .item {
        @extend.pull-left;
        color: #333;
        font-size: $uni-font-size-base;
        font-weight: 600;
      }
      .time {
        @extend.pull-left;
        color: #999;
        padding-left: $uni-spacing-row-sm;
        padding-bottom: $uni-spacing-col-base;
      }
    }
    .table-column {
      .table-item {
        @extend.pull-left;
        width: 50%;
        line-height: 1em;
        padding-bottom: $uni-spacing-col-base;
        .table-header {
          color: #666666;
          width: 4em;
          text-align: right;
          display: inline-blocks;
          padding-right: $uni-spacing-row-sm;
        }
        .table-detail {
          display: inline-blocks;
          color: #333;
        }
      }
    }
    .address {
      background: #ebf1fd;
      color: #333;
      border-radius: $uni-border-radius-base;
      padding: $uni-spacing-row-sm $uni-spacing-row-base;
      line-height: 1.5em;
    }
  }
}
</style>