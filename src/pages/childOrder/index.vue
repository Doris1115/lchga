<template>
  <view class="content">
    <image
      class="logo"
      src="/static/image/bg02.png"
      v-if="column.length>0"
    ></image>
    <view
      class="wrap"
      v-if="column.length>0"
    >
      <view
        class="container"
        v-for="(item,index) in column "
        :key="index"
      >
        <view class="column">
          <view class="clear-fix title-column">
            <view class="title">{{item.name}}</view>
            <view class="age">{{item.age}}</view>
            <view
              class="status"
              :class="item.status==='0'?'':item.status==='1'?'icCheck':'overTime'"
            >{{item.status==='0'?'未检':item.status==='1'?'已检':'过期' }}</view>
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
    <view v-else>
      <Empty />
    </view>
  </view>
</template>
<script>
import { getChildBookInfo } from '@/api/main'
import { getAge } from '@/utils/nav'
import Empty from '@/pages/components/empty'
export default {
  components: {
    Empty,
  },
  mounted () {
    this.getDetail();
  },
  data () {
    return {
      column: []
    }
  },
  methods: {
    getDetail () {
      uni.showLoading({
        title: '加载中',
        mask: true
      });
      getChildBookInfo({
        schoolId: uni.getStorageSync('schoolId')
      }).then(res => {
        if (!res.code) {
          this.column = res.result.map(item => {
            return {
              'address': item.xzaddr,
              'contact': item.fathermobile ? item.fathername : item.mothermobile ? item.mothername : "",
              "tel": item.fathermobile || item.mothermobile,
              'code': item.childhealthno,
              'birth': item.childbirthday.split(" ")[0],
              'status': item.checkstatus,
              'mom': item.mothername,
              'item': item.checkitem,
              'dad': item.fathername,
              'time': item.resdate.split(" ")[0],
              'age': getAge(item.childbirthday.split(" ")[0]),
              "name": item.childname
            }
          })
        }
        uni.hideLoading();
      })
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
        &.overTime {
          color: #666;
          background: #dadada;
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