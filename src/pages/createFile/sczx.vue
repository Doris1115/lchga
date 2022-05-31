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
        >
          <input
            v-if="inputData.includes(item.value)"
            class="input_btn"
            v-model="form[item.value]"
            :placeholder="'请输入'+item.title"
            placeholder-class="placeholder"
            :disabled="item.value=='name'"
          />
          <input
            v-if="numData.includes(item.value)"
            class="input_btn"
            type="number"
            v-model="form[item.value]"
            :placeholder="'请输入'+item.title"
            placeholder-class="placeholder"
            :disabled="addBtn"
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
            v-else-if="pickerDate.includes(item.value)"
            mode="date"
            :name="item.value"
            :value="form.planAbortionTime"
            :start="startDate"
            :end="endDate"
            :disabled="addBtn"
            @change="bindPickerChange($event,item.value)"
          >
            <view
              class="input_btn"
              :class='{"placeholder":form[item.value]===""}'
            >{{form[item.value]!==''?form[item.value]:`请输入${item.title}`}}</view>
          </picker>
        </uni-forms-item>
        <uni-forms-item
          name="consultationFocus"
          label="重点咨询内容"
          class="text-area-box"
          required
        >
          <uni-easyinput
            @input="validateField"
            type="textarea"
            v-model="form.consultationFocus"
            placeholder="请输入重点咨询内容"
            :disabled="addBtn"
          />
        </uni-forms-item>
      </uni-group>
    </uni-forms>
    <button
      type="primary"
      class="submit_btn"
      :loading="loading"
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
import InfoTipPop from "@/pages/components/infoTipPop"
import validate from '@/mixins/validate'
import { transfer } from "@/utils/verify.js"
import BackHome from "@/pages/components/backHome.vue"
import { addFirstConsultation, editFirstConsultation, deleteFirstConsultation } from '@/api/main'
import { mapGetters } from "vuex";
export default {
  mixins: [validate],
  components: {
    InfoTipPop,
    BackHome
  },
  computed: {
    ...mapGetters(["gestatePlan", "planAbortionTime", "planContraceptionMethod", "planContraceptionMethodNi", "planContraceptionTime", "pregnancyReason"]),
    startDate () {
      return this.getDate('start');
    },
    endDate () {
      return this.getDate('end');
    },
    pickRanges () {
      return {
        "contraceptionMethod": this.planContraceptionMethod,//目前避孕方法
        "gestatePlan": this.gestatePlan,//近期孕育计划 
        "planAbortionManner": this.planAbortionTime,//拟流产方式 
        "planContraceptionMethod": this.planContraceptionMethodNi,//拟避孕方法
        "pregnancyReason": this.pregnancyReason,//本次妊娠原因
        "planContraceptionTime": this.planContraceptionTime,//拟避孕时间
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
    if (option.type == 0 || option.type == 3) {
      this.form = JSON.parse(decodeURIComponent(option.items));
      this.form.name = option.name || uni.getStorageSync('name')
      this.form.archivesId = option.archivesId || 0
    }
  },
  data () {
    var url = uni.getStorageSync("urlHos") ? transfer(uni.getStorageSync("urlHos")).url : "http://39.107.74.117:9999/fybj365-abortion-love"
    let lcday = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 3)
    return {
      url,
      type: true,
      loading: false,
      addBtn: false,
      form: {
        "archivesId": 0,//档案id
        "name": uni.getStorageSync('name'),//档案id
        "consultationFocus": "",//重点咨询内容
        "contraceptionMethod": 0,//目前避孕方法
        "gestatePlan": 0,//近期孕育计划 
        "id": 0,
        "planAbortionManner": 0,//拟流产方式 
        "planAbortionTime": lcday,//拟流产日期
        "planContraceptionMethod": 0,//拟避孕方法
        "planContraceptionTime": 0,//拟避孕时间
        "pregnancyReason": 0,//本次妊娠原因
        "stopMensesDayCount": 30//停经天数
      },
      rules: {
        consultationFocus: {
          rules: [{
            required: true,
            errorMessage: ' '
          }]
        }
      },
      inputData: ['name',],
      pickerData: ['contraceptionMethod', 'pregnancyReason', 'gestatePlan', 'planAbortionManner', 'planContraceptionMethod', 'planContraceptionTime'],
      pickerDate: ['planAbortionTime'],
      numData: ['stopMensesDayCount',],
      coulumnsSelect: [],
      coulums: [{
        title: "姓名",
        value: "name",
      }, {
        title: "近期孕育计划",
        value: "gestatePlan",
      }, {
        title: "本次妊娠原因",
        value: "pregnancyReason",
        required: true
      }, {
        title: "目前避孕方法",
        value: "contraceptionMethod"
      }, {
        title: "停经天数",
        value: "stopMensesDayCount",
        required: true
      }, {
        title: "拟流产日期",
        value: "planAbortionTime",
        required: true
      }, {
        title: "拟流产方式",
        value: "planAbortionManner",
        required: true
      }, {
        title: "拟避孕方法",
        value: "planContraceptionMethod",
        required: true
      }, {
        title: "拟避孕时间",
        value: "planContraceptionTime",
        required: true
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
    formSubmit () {
      this.$refs.form.validate().then(res => {
        this.loading = true;
        let openid = uni.getStorageSync('openid');
        let archivesId = uni.getStorageSync('archivesId');
        this.form.openid = openid
        this.form.archivesId = archivesId
        let params = Object.assign({}, this.form);
        uni.showLoading({
          title: '加载中'
        });
        if (this.type) {//新增
          addFirstConsultation(this.url, params).then(res => {
            uni.hideLoading()
            if (res.code) {
              uni.showToast({
                title: res.message,
              })
              setTimeout(() => {
                uni.navigateTo({
                  url: `/pages/sfList/index?name=${this.form.name}&archivesId=${this.form.archivesId}`
                })
              }, 1000);
            }
          })
        } else {
          editFirstConsultation(this.url, params).then(res => {
            uni.hideLoading()
            if (res.code) {
              uni.showToast({
                title: res.message,
              })
              setTimeout(() => {
                uni.navigateTo({
                  url: `/pages/sfList/index?name=${this.form.name}&archivesId=${this.form.archivesId}`
                })
              }, 1000);
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
      // if (v == 'currentType') {
      //   this.formReset();
      // }
      this.form[v] = e.detail.value;
    },
    async getSelectItem () {
      await this.$store.dispatch('GET_GESTATEPLAN');
      await this.$store.dispatch('GET_PLANABORTIOMTIME');
      await this.$store.dispatch('GET_PLANCONTRACEPTIONMETHOD');
      await this.$store.dispatch('GET_PLANCONTRACEPTIONMETHODNI');
      await this.$store.dispatch('GET_YESNO');
      await this.$store.dispatch('GET_PREGNANCYREASON');
      await this.$store.dispatch('GET_PLANCONTRACEPTIOMTIME');
    },
    del () {
      deleteFirstConsultation(this.url, {
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