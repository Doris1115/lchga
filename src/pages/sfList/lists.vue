<template>
  <!-- 随访列表s -->
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
            class="item_column"
            v-for="(item,index) in coulums"
            :key="index"
            :to="`/pages/createFile/${item.url}?type=3&items=${encodeURIComponent(JSON.stringify(item))}`"
          >
            <view
              slot="body"
              class="slot-body"
              v-if="item.type=='0'"
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
                      <view class="demo-uni-col light">{{item.plan}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">本次妊娠原因</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">{{item.reason}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
              </uni-row>
              <view class="status">2022-03-23</view>
              <view class="sf-list">查看详情</view>
            </view>
            <view
              slot="body"
              class="slot-body"
              v-else-if="item.type=='1'"
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
                      <view class="demo-uni-col light">{{item.isSexLife?"是":"否"}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">&nbsp;恢&nbsp;复&nbsp;月&nbsp;经&nbsp;</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">{{item.isMenstrualRecover?"是":"否"}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
              </uni-row>
              <view class="status">2022-04-12</view>
              <navigator class="sf-list">查看详情</navigator>
            </view>
            <view
              slot="body"
              class="slot-body"
              v-else
            >
              <uni-row>
                <uni-col
                  :span='24'
                  class="title-column"
                >
                  {{item.followName}}
                </uni-col>
              </uni-row>
              <uni-row>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">随 诊 方 式</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">{{item.manner}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">再次意外妊娠</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">{{item.surprisePregnancy?"是":"否"}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
              </uni-row>
              <view class="status">{{item.addTime.slice(0,10)}}</view>
              <navigator class="sf-list">查看详情</navigator>
            </view>

          </uni-list-item>
        </uni-list>
      </view>
      <empty-column
        v-else
        title="您还没有添加随访信息"
        btnTitle=""
        type="3"
        @saveBtn="addSfRecord"
      />

    </view>
  </view>
</template>
<script>
import { queryAllFollowList } from '@/api/main'
import EmptyColumn from "@/pages/components/emptyColumn"
import { mapGetters } from "vuex";
import { transfer } from "@/utils/verify.js"

export default {
  components: {
    EmptyColumn,
  },
  computed: {
    ...mapGetters(["followManner", "gestatePlan", "pregnancyReason"]),
  },
  data () {
    var url = uni.getStorageSync("urlHos") ? transfer(uni.getStorageSync("urlHos")).url : "http://39.107.74.117:9999/fybj365-abortion-love"
    return {
      url,
      empty_icon: "/static/icons/empty.png",
      coulums: [],
      name: "",
      dic: {
        type: `  随 诊 方 式 `,
        sfywhy: "再次意外妊娠",
      },
      firstConsultation: null,
      firstFollow: null
    }
  },
  mounted () {
    this.getSelectItem();
    this.getLists();
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    this.type = option.type == 1 ? true : false;
    this.name = option.name
    this.archivesId = option.archivesId
    uni.setStorageSync("name", option.name)
    uni.setStorageSync("archivesId", option.archivesId)
    if (option.type == 0) {
      this.form = JSON.parse(decodeURIComponent(option.items));
    }
  },
  methods: {
    getLists () {
      uni.showLoading({
        title: '加载中'
      });
      queryAllFollowList(this.url, {
        openid: uni.getStorageSync('openid')
      }).then(res => {
        uni.hideLoading()
        this.coulums = []
        if (res.result.length > 0) {

          res.result.map(item => {
            if (item.followName == '首次咨询') {
              item.type = 0;
              item.plan = this.gestatePlan[item.gestatePlan].title;
              item.reason = this.pregnancyReason[item.pregnancyReason].title;
              item.url = "sczx"
            } else if (item.followName == '首次随访') {
              item.type = 1
              item.url = "scsf"
            } else {
              item.type = 2
              item.manner = this.followManner[item.followManner].title;
              item.url = "sfxq"
            }
            this.coulums.push({
              ...item
            })
          })

        }
      })
    },
    addSfRecord () {
      let url = `/pages/createFile/sczx?type=1`;
      if (this.firstConsultation && !this.firstFollow) {
        url = "/pages/createFile/scsf?type=1"
      } else if (this.firstConsultation && this.firstFollow) {
        url = "/pages/createFile/sfxq?type=1"
      }
      uni.navigateTo({
        url
      })
    },
    getChildDetail (data) {
      uni.navigateTo({
        url: `/pages/createFile/scsf?type=0&&items=${encodeURIComponent(JSON.stringify(data))}`
      })
    },
    getSelectItem () {
      return new Promise((res) => {
        this.$store.dispatch('GET_GESTATEPLAN');
        this.$store.dispatch('GET_FOLLOWMANNER');
        this.$store.dispatch('GET_PREGNANCYREASON');
        res()
      })
    },
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
      z-index: 1;
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