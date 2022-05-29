<template>
  <view class="column">
    <uni-forms
      :value="form"
      :rules="rules"
      ref="form"
      validate-trigger="bind"
      err-show-type="undertext"
      class=""
    >
      <uni-group>
        <uni-forms-item
          :name="item.value"
          :required="item.required"
          :label="item.title"
          :key="index"
          v-for="(item,index) in coulums"
          v-show="validateShow(item)"
        >
          <input
            v-if="inputData.includes(item.value)"
            class="input_btn"
            v-model="form[item.value]"
            :placeholder="'请输入'+item.title"
            placeholder-class="placeholder"
            :disabled="item.value=='name'|| addBtn"
          />
          <picker
            v-else-if="pickerData.includes(item.value)"
            mode="selector"
            @change="bindPickerChange($event,item.value)"
            :value="form[item.value]"
            :range="pickRanges[item.value]"
            range-key="title"
            :name="item.value"
            :disabled="addBtn"
          >
            <view
              class="input_btn"
              :class='{"placeholder":form[item.value]===""}'
              v-if="coulumnsSelect.includes(item.value)"
            >
              {{{...pickRanges[item.value].find(v=>{
              return v.value==form[item.value]
            })}.text}}
            </view>
            <view
            v-else
              class="input_btn"
              :class='{"placeholder":form[item.value]===""}'
            >
              {{form[item.value]!==''?{...[...pickRanges[item.value]][form[item.value]]}.text:`请输入${item.title}`}}
            </view>
          </picker>
          <picker
            v-else-if="numData.includes(item.value)"
            mode="selector"
            :value="form[item.value]"
            :range="pickRanges[item.value]"
            range-key="title"
            @change="bindPickerChange($event,item.value)"
            :name="item.value"
            disabled
          >
            <!-- :disabled="addBtn" -->
            <view
              class="input_btn"
              :class='{"placeholder":form[item.value]===""}'
            >
              {{form[item.value]!==''?[...pickRanges[item.value]][form[item.value]]:`请输入${item.title}`}}
            </view>
          </picker>
        </uni-forms-item>
        <uni-forms-item
          name="remark"
          label="备注"
          class="text-area-box"
        >
          <uni-easyinput
            type="textarea"
            v-model="form.remark"
            placeholder="请输入备注"
            :disabled="addBtn"
          />
        </uni-forms-item>
      </uni-group>
    </uni-forms>
    <button
      type="primary"
      class="submit_btn"
      @click="formSubmit"
      v-if="!addBtn"
    >{{type?"新 增":"修 改"}}</button>
    <button
      type="primary"
      class="submit_btn del "
      @click="del"
      v-if="!type"
    >删除随访记录</button>
    <!-- 提示信息弹窗 -->
    <info-tip-pop
      ref="message"
      :type="msgType"
      :message="messageText"
    />
    <back-home />
  </view>
</template>
<script>
import BackHome from "@/pages/components/backHome.vue"

import InfoTipPop from "@/pages/components/infoTipPop"
import validate from '@/mixins/validate'
import { addBehindFollow, deleteBehindFollow, editBehindFollow } from '@/api/main'
import { mapGetters } from "vuex";
import { transfer } from "@/utils/verify.js"

export default {
  mixins: [validate],
  components: {
    InfoTipPop,
    BackHome
  },
  computed: {
    ...mapGetters(["yesno", "planContraceptionMethod", 'followManner']),
    pickRanges () {
      return {
        "contraceptionMethod": this.planContraceptionMethod,//目前避孕方法
        "followManner": this.followManner,//随访方式 
        "isGoUse": this.yesno,//是否坚持使用 
        "isUseOther": this.yesno,//是否换用其他方法
        "replacement": this.planContraceptionMethod,//替换产品
        "surprisePregnancy": this.yesno,//再次意外妊娠
        'followTime': [3, 6, 12, 24],
      }
    }
  },
  mounted () {
    this.init();
    this.getSelectItem();
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    this.type = option.type == 1 || option.type == 3 ? true : false;
    this.addBtn = option.type == 3 ? true : false
    this.form.followTime = option.month == 3 ? 0 : option.month == 6 ? 1 : option.month == 12 ? 2 : 3
    if (option.type == 0 || option.type == 3) {
      this.form = JSON.parse(decodeURIComponent(option.items));
      this.title = this.form.followTime == 3 ? "三" : this.form.followTime == 6 ? "六" : this.form.followTime == 12 ? "十二" : "二十四"
      uni.setNavigationBarTitle({
        title: this.title + "月随访详情"
      });
      this.form.followTime = this.pickRanges.followTime.findIndex(item => {
        return item == this.form.followTime
      })
    }
  },
  data () {
    var url = uni.getStorageSync("urlHos") ? transfer(uni.getStorageSync("urlHos")).url : "http://39.107.74.117:9999/fybj365-abortion-love"
    return {
      url,
      type: true,
      addBtn: false,
      title: "三",
      form: {
        "name": uni.getStorageSync('name'),//档案id
        "archivesId": uni.getStorageSync('archivesId'),
        "contraceptionMethod": 0,//目前避孕方法
        "followManner": 0,//随访方式
        "followTime": 0,//随访时间（月）
        "id": "",
        "isGoUse": 0,//是否坚持使用
        "isUseOther": 0,//是否换用其他方法
        "problem": "",//存在问题
        "reason": "",//原因
        "remark": "",//备注
        "replacement": 0,//替换产品
        "surprisePregnancy": 0//再次意外妊娠
      },
      rules: {},
      inputData: ['name', 'problem', 'reason'],
      pickerData: ['contraceptionMethod', 'followManner', 'isGoUse', 'isUseOther', 'replacement', 'surprisePregnancy'],
      numData: ['followTime'],
      coulumnsSelect: ['isUseOther', 'surprisePregnancy', 'isGoUse'],
      coulums: [{
        title: "姓名",
        value: "name",
      }, {
        title: "随访时间（月）",
        value: "followTime",
      }, {
        title: "随访方式",
        value: "followManner"
      }, {
        title: "目前避孕方法",
        value: "contraceptionMethod",
      }, {
        title: "再次意外妊娠",
        value: "surprisePregnancy"
      }, {
        title: "存在问题",
        value: "problem",
      }, {
        title: "是否坚持使用",
        value: "isGoUse",
      }, {
        title: "原因",
        value: "reason",
      }, {
        title: "换其他方法",
        value: "isUseOther",
      }, {
        title: "打算换为",
        value: "replacement",
      }],
    }
  },
  methods: {
    init () {
      if (!this.type) {
        this.getInfoList()
      }

    },
    getInfoList (data) {
      console.log('data', data);

    },
    validateShow (item) {
      let v = true
      if (item.value == "replacement") {
        v = this.form.isUseOther == "0" ? false : true
      }
      return v
    },
    formSubmit () {
      this.$refs.form.validate().then(res => {
        uni.showLoading({
          title: '正在添加',
        })
        let openid = uni.getStorageSync('openid');
        let archivesId = uni.getStorageSync('archivesId');
        this.form.openid = openid
        this.form.archivesId = archivesId
        this.form.followTime = this.pickRanges.followTime[this.form.followTime]
        let params = Object.assign({}, this.form);
        if (this.type) {//新增
          addBehindFollow(this.url, params).then(res => {
            if (res.code == 200) {
              uni.hideLoading()
              setTimeout(() => {
                uni.navigateTo({
                  url: `/pages/sfList/index?name=${this.form.name}&archivesId=${this.form.archivesId}`,
                  success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.getInfoList();
                  }
                })

              }, 1000);
            } else {
              uni.showToast({
                title: res.message,
              })
            }
          })
        } else {
          editBehindFollow(this.url, params).then(res => {
            uni.hideLoading()
            if (res.code == 200) {
              uni.showToast({
                title: res.message,
              })
              setTimeout(() => {
                uni.navigateTo({
                  url: `/pages/sfList/index?name=${this.form.name}&archivesId=${this.form.archivesId}`,
                  success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.getInfoList();
                  }
                })
              }, 1000);
            } else {
              uni.showToast({
                title: res.message,
              })
            }
          })

        }
      })
    },
    formReset () {

    },
    validateField () {
      this.$refs.form.validate()
    },
    getDate (type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === 'start') {
        year = year - 10;
      } else if (type === 'end') {
        year = year + 2;
      }
      month = month > 9 ? month : '0' + month;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    },
    bindPickerChange (e, v) {
      if (this.coulumnsSelect.includes
        (v)) {
        this.form[v] = this.pickRanges[v][e.detail.value].value;
      } else {
        this.form[v] = e.detail.value;
      }
    },
    async getSelectItem () {
      await this.$store.dispatch('GET_YESNO');
      await this.$store.dispatch('GET_PLANCONTRACEPTIONMETHOD');
      await this.$store.dispatch('GET_FOLLOWMANNER');
    },
    del () {
      deleteBehindFollow(this.url, {
        id: this.form.id
      }).then(res => {
        if (res.code == 200) {
          uni.showToast({
            title: res.message,
          })
          setTimeout(() => {
            uni.navigateTo({
              url: `/pages/sfList/index?name=${this.form.name}&archivesId=${this.form.archivesId}`,
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.getInfoList();
              }
            })
          }, 1000);
        } else {
          uni.showToast({
            title: res.message,
          })
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.column {
  margin-top: $uni-spacing-col-lg;
  padding-bottom: 180rpx;
}
::v-deep .uni-group__content {
  padding: 0 $uni-spacing-row-lg;
  .uni-forms-item__inner {
    padding-bottom: 0;
    overflow: hidden;
    border-bottom: 1px solid $uni-border-color;
  }
  .uni-error-message-text {
    padding-left: 60rpx;
  }
}
::v-deep .uni-forms-item__label {
  width: 8em !important;
  text-align: justify;
  margin-right: $uni-spacing-row-base;
  height: 118rpx;
  line-height: 118rpx;
  .label-text {
    span {
      font-size: $uni-font-size-lg;
      height: 118rpx;
      line-height: 118rpx;
      white-space: nowrap;
      display: block;
      // color: $uni-text-color;
      color: "#666";
    }
  }
}
::v-deep .uni-forms-item__content {
  width: 520rpx;
  height: 118rpx;
  line-height: 118rpx;

  .input_btn {
    height: 100%;
    font-size: $uni-font-size-lg;
  }
}
.submit_btn,
.disable_btn {
  margin: 60rpx $uni-spacing-row-lg 0;
  border-radius: 90rpx;
  &.del {
    border: 1px solid #dadada !important;
    color: #dadada !important;
  }
}
.disable_btn {
  margin-top: $uni-spacing-row-lg;
  border: 1px solid #dadada;
  color: #999;
}

.placeholder {
  color: #dadada;
}
::v-deep .text-area-box {
  .uni-forms-item__content {
    height: auto;
    margin: 20rpx 0;
  }
}
::v-deep .uni-textarea-compute {
  font-size: $uni-font-size-lg !important;
}
::v-deep .uni-textarea-placeholder {
  font-size: $uni-font-size-lg !important;
  color: #dadada;
}
</style>