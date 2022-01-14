<template>
  <view class="column">
    <uni-list>
      <uni-list-item v-for="(item,index) in coulums" :key="index">
        <!-- 自定义 header -->
        <view slot="header" class="slot-box">
          {{item.title}}
        </view>
        <view slot="body" class="slot-body">
          <picker mode="selector" @change="bindPickerChange($event,item.value)" :value="form[item.value]" range-key="name" :range="pickRange[item.value]" :name="item.value">
            <view v-if="item.value=='regions'" class="input_btn" :class='{"placeholder":form[item.value]===""}'>{{form[item.value]!==''?pickRange[item.value][form[item.value]].name:`请输入${item.title}`}}</view>
            <view v-else class="input_btn" :class='{"placeholder":form[item.value]===""}'>{{form[item.value]!==''?pickRange[item.value][form[item.value]]:`请输入${item.title}`}}</view>
          </picker>
        </view>
      </uni-list-item>
    </uni-list>
    <button type="primary" class="submit_btn" @click="formSubmit">建档</button>
    <!-- 提示信息弹窗 -->
    <info-tip-pop ref="message" :type="msgType" :message="messageText" />
  </view>
</template>
<script>
import InfoTipPop from "@/pages/components/infoTipPop"
import validate from '@/mixins/validate'
import { getTrantodangan } from '@/api/main'

export default {
  mixins: [validate],
  components: {
    InfoTipPop
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      form: {
        regions: "",
        fileType: 0
      },
      coulums: [{
        title: "所在地区",
        value: "regions"
      }, {
        title: "档案类型",
        value: "fileType"
      }],
      pickRange: {
        regions: [],
        fileType: ['孕妇建档', '两癌建档']
      }
    }
  },
  methods: {
    init() {
      let uid = uni.getStorageSync('uid');
      getTrantodangan({
        uid,
        memberFileId: 0,
        ifAdd: 0
      }).then(res => {
        this.pickRange.regions = res.data.hospital.map((item, index) => {
          if (item.id == res.data.fileMap.hospital) {
            this.form.regions = index;
          }
          return {
            id: item.id,
            name: item.name,
            serverUrl: item.serverUrl,
          }
        })
        // this.form.regions = res.data.fileMap.hospital
        // this.form.regions = res.data.fileMap.hospital
      })
    },
    formSubmit() {
      let url = ''
      if (this.form.fileType == 0) {//孕妇建档
        let openid = uni.getStorageSync('openid')
        let hospital = this.pickRange.regions[this.form.regions].serverUrl
        let hospitalid = this.pickRange.regions[this.form.regions].id
        url = `http://wx.fybj365.com/weixin/archives/showView?url=create_archives&openid=${openid}&hospitalid=${hospitalid}&hospital=${hospital}`

      } else if (this.form.fileType == 1) {//两癌建档

      }
      window.location.href = url
    },
    formReset() {

    },
    bindPickerChange(e, v) {
      this.form[v] = e.detail.value;
    }
  },
}
</script>
<style lang="scss" scoped>
.column {
  margin-top: $uni-spacing-col-lg;
}
.slot-box {
  font-size: $uni-font-size-lg;
  width: 4em;
  text-align: justify;
  margin-right: $uni-spacing-row-base;
  height: 2em;
  line-height: 2em;
}
.submit_btn,
.disable_btn {
  margin: 60rpx $uni-spacing-row-lg 0;
  border-radius: 90rpx;
}
.disable_btn {
  margin-top: $uni-spacing-row-lg;
  border: 1px solid #dadada;
  color: #999;
}
.slot-body {
  width: 520rpx;
  height: 2em;
  line-height: 2em;
  .input_btn {
    height: 100%;
  }
}
.placeholder {
  color: #dadada;
}
</style>