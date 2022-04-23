<template>
  <view>
    <view class="column">
      <view
        class="wrap"
        v-if="coulums.length>0"
      >
        <uni-list
          class="column_baby"
          :border="false"
        >
          <uni-list-item
            v-for="(items,index) in coulums"
            :key="index"
            class="item_column"
            :border="false"
          >
            <!-- to="pages/createFile/index"
            @click="getChildDetail(items)" -->
            <!-- 自定义 header -->
            <view
              slot="body"
              class="slot-body"
              @click.stop="getChildDetail(items)"
            >
              <uni-row
                v-for="(item,iindex) in items"
                :key="iindex"
              >
                <uni-col :span="24">
                  <uni-row
                    class="demo-uni-row"
                    v-if="dic[iindex]"
                  >
                    <uni-col :span="7">
                      <view class="demo-uni-col dark">{{dic[iindex]}}</view>
                    </uni-col>
                    <uni-col :span="17">
                      <view class="demo-uni-col light">{{item}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
              </uni-row>
              <view
                class="status"
                :class="{active:items.domicileType=='0'
                }"
              >{{items.domicileType=="0"?"已建档":"已结案"}}</view>
              <navigator
                class="sf-list"
                url="/pages/sfList/index"
                @click.stop=""
              >随访 ></navigator>
            </view>

          </uni-list-item>
        </uni-list>
        <button
          type="primary"
          class="submit_btn"
          @click="addFile"
        >自助建档</button>
      </view>
      <view
        class="empty"
        v-else
      >
        <image
          :src="empty_icon"
          mode="aspectFit"
          class="empty_image"
        > </image>
        <p class="text">您还没有添加档案信息</p>
        <button
          type="primary"
          size="mini"
          plain
          class="submit_btn02"
          @click="addFile"
        >添加档案</button>
      </view>

    </view>
  </view>
</template>
<script>
import { queryArchivesList } from '@/api/main'

export default {
  data () {
    return {
      empty_icon: "/static/icons/empty.png",
      coulums: [],
      dic: {
        name: "建档人",
        addUnitName: "建档单位",
        consultationTime: "建档日期",
      }
    }
  },
  mounted () {
    this.getInfoList();
  },
  methods: {
    getInfoList () {
      let openid = uni.getStorageSync('openid');
      queryArchivesList({ openid }).then(res => {
        if (res.code) {
          this.coulums = []
          res.result.map(v => {
            this.coulums.push({
              ...v,
              addUnitName: v.treatmentUnitName,
              name: v.name,
              consultationTime: v.createDate,
              domicileType: v.domicileType,
            })
          })
        }
      })
    },
    addFile (data) {
      uni.navigateTo({
        url: `/pages/createFile/index?type=1`
      })
    },
    getChildDetail (data) {
      uni.navigateTo({
        url: `/pages/createFile/index?type=0&&items=${encodeURIComponent(JSON.stringify(data))}`,
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.column {
  padding-bottom: 180rpx;
}
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
      border: 1px solid $uni-text-color-grey;
      padding: 0 $uni-spacing-col-base;
      border-radius: $uni-border-radius-base;
      font-size: $uni-font-size-sm;
      background: #fdfafa;
      &.active {
        color: $uni-color-base;
        border: 1px solid $uni-color-base;
        background: #fdf6f6;
      }
    }
    .sf-list {
      position: absolute;
      right: 0;
      bottom: 0rpx;
      z-index: 999;
      color: $uni-color-base;
      font-size: $uni-font-size-sm;
      // background: red;
      text-align: right;
      padding-left: 20rpx;
      padding-top: 20rpx;
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
.empty {
  text-align: center;
  overflow: hidden;
  .submit_btn02 {
    margin: auto;
    color: $uni-color-base !important;
    border: 1px solid $uni-color-base !important;
  }
  .text {
    color: $uni-text-color;
    font-size: $uni-font-size-base;
    text-align: center;
    margin-top: 48rpx;
    margin-bottom: 32rpx;
  }
  .empty_image {
    width: 320rpx;
    height: 320rpx;
    margin: auto;
    display: block;
    margin-top: 168rpx;
  }
}
</style>