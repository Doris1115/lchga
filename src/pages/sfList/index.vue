<template>
  <!-- 随访列表 -->
  <view>
    <view class="column">
      <view
        class="wrap"
        v-if="firstConsultation"
      >
        <uni-list
          class="column_baby"
          :border="false"
        >
          <uni-list-item
            class="item_column"
            :to="`/pages/createFile/sczx?type=0&items=${encodeURIComponent(JSON.stringify(firstConsultation))}`"
            v-if="firstConsultation"
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
                      <view class="demo-uni-col light">{{gestatePlan[firstConsultation.gestatePlan].title}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">本次妊娠原因</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">{{pregnancyReason[firstConsultation.pregnancyReason].title}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
              </uni-row>
              <view class="status">2022-03-23</view>
              <view class="sf-list">查看详情</view>
            </view>
          </uni-list-item>
          <uni-list-item
            class="item_column"
            :to="`/pages/createFile/scsf?type=0&items=${encodeURIComponent(JSON.stringify(firstFollow))}`"
            v-if="firstFollow"
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
                      <view class="demo-uni-col light">{{firstFollow.isSexLife?"是":"否"}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">&nbsp;恢&nbsp;复&nbsp;月&nbsp;经&nbsp;</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">{{firstFollow.isMenstrualRecover?"是":"否"}}</view>
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
            :to="`/pages/createFile/sfxq?type=0&items=${encodeURIComponent(JSON.stringify(items))}`"
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
              <uni-row>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">随 诊 方 式</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">{{items.manner}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
                <uni-col :span="24">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">再次意外妊娠</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col light">{{items.surprisePregnancy?"是":"否"}}</view>
                    </uni-col>
                  </uni-row>
                </uni-col>
              </uni-row>
              <view class="status">{{items.addTime}}</view>
              <navigator class="sf-list">查看详情</navigator>
            </view>

          </uni-list-item>
        </uni-list>
        <button
          type="primary"
          class="submit_btn"
          v-if="coulums.length<4"
          @click="addSfRecord"
        >新增随访记录</button>
      </view>
      <empty-column
        v-else
        title="您还没有添加随访信息"
        btnTitle="添加首次咨询"
        @saveBtn="addSfRecord"
      />

    </view>
  </view>
</template>
<script>
import { queryFollowList } from '@/api/main'
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
    // this.getInfoList();
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
    getInfoList () {
      queryFollowList(this.url, {
        archivesId: this.archivesId
      }).then(res => {
        let data = res.result
        if (data.firstConsultation) {
          this.firstConsultation = data.firstConsultation;
          this.firstConsultation.gestatePlan = this.gestatePlan[data.firstConsultation.gestatePlan].value;
          this.firstConsultation.pregnancyReason = this.pregnancyReason[data.firstConsultation.pregnancyReason].value;
        }
        this.firstFollow = data.firstFollow;
        this.coulums = []
        if (!!data.month3Follow) {
          let p = data.month3Follow
          p.manner = this.followManner[p.followManner].title;
          p.title = "三月随访"
          this.coulums.push({ ...p })
        }
        if (data.month6Follow) {
          let s = data.month6Follow
          s.manner = this.followManner[s.followManner].title;
          s.title = "六月随访"
          this.coulums.push({ ...s })
        }
        if (data.month12Follow) {
          let t = data.month12Follow
          t.manner = this.followManner[t.followManner].title;
          t.title = "十二月随访"
          this.coulums.push({ ...t })
        }
        if (data.month24Follow) {
          let w = data.month24Follow
          w.title = "二十四月随访"
          w.manner = this.followManner[w.followManner].title;
          this.coulums.push({ ...w })
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
    async getSelectItem () {
      await this.$store.dispatch('GET_GESTATEPLAN');
      await this.$store.dispatch('GET_FOLLOWMANNER');
      await this.$store.dispatch('GET_PREGNANCYREASON');
      this.getInfoList();
    },
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