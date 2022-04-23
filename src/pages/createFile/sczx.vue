<template>
  <view class="column">
    <uni-forms
      v-if="true"
      :rules="rules"
      :value="form"
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
          />
          <picker
            v-else-if="pickerData.includes(item.value)"
            mode="selector"
            @change="bindPickerChange($event,item.value)"
            :value="form[item.value]"
            :range="pickRanges[item.value]"
            range-key="title"
            :name="item.value"
          >
            <view
              class="input_btn"
              :class='{"placeholder":form[item.value]===""}'
            >
              {{form[item.value]!==''?{...[...pickRanges[item.value]][form[item.value]]}.text:`请输入${item.title}`}}
            </view>
          </picker>
          <picker
            v-else-if="numData.includes(item.value)"
            mode="selector"
            @change="bindPickerChange($event,item.value)"
            :value="form[item.value]"
            :range="pickRanges[item.value]"
            range-key="title"
            :name="item.value"
          >
            <view
              class="input_btn"
              :class='{"placeholder":form[item.value]===""}'
            >
              {{form[item.value]!==''?[...pickRanges[item.value]][form[item.value]]:`请输入${item.title}`}}
            </view>
          </picker>
          <picker
            v-else-if="pickerDate.includes(item.value)"
            mode="date"
            :name="item.value"
            :value="form.birthday"
            :start="startDate"
            :end="endDate"
            @change="bindPickerChange($event,item.value)"
          >
            <view
              class="input_btn"
              :class='{"placeholder":form[item.value]===""}'
            >{{form[item.value]!==''?form[item.value]:`请输入${item.title}`}}</view>
          </picker>
        </uni-forms-item>
      </uni-group>
    </uni-forms>
    <button
      type="primary"
      class="submit_btn"
      @click="formSubmit"
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
  </view>
</template>
<script>
import InfoTipPop from "@/pages/components/infoTipPop"
import validate from '@/mixins/validate'
import { addArchives, editArchives, queryArchivesList, queryAreaList } from '@/api/main'
import { mapGetters } from "vuex";
import { validateMobile } from "@/utils/verify.js"
export default {
  mixins: [validate],
  components: {
    InfoTipPop
  },
  watch: {
  },
  computed: {
    ...mapGetters(["nationality", "certType", "domicileType", "education", "ethnic", "homeRegist", "occupation", "pastHistory", "presentHistory"]),
    startDate () {
      return this.getDate('start');
    },
    endDate () {
      return this.getDate('end');
    },
    pickRanges () {
      return {
        nationality: this.nationality,
        certType: this.certType,
        domicileType: this.domicileType,
        education: this.education,
        ethnic: this.ethnic,
        homeRegist: this.homeRegist,
        occupation: this.occupation,
        pastHistory: this.pastHistory,
        presentHistory: this.presentHistory,
        gender: [{
          text: "女孩",
          title: "女孩",
          value: "10"
        }, {
          text: "男孩",
          title: "男孩",
          value: "21"
        }],
        childbirthCount: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        pregnancyCount: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }
    }
  },
  mounted () {
    this.getSelectItem();
    this.init();
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    this.type = option.type == 1 ? true : false;
    if (option.type == 0) {
      this.form = JSON.parse(decodeURIComponent(option.items));
    }
  },
  data () {
    return {
      type: true,
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: '姓名不能为空'
          },
          {
            minLength: 3,
            maxLength: 15,
            errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
          }
          ]
        },
        birthday: {
          rules: [{
            required: true,
            errorMessage: '出生年月不能为空'
          }]
        },
        certNumber: {
          rules: [{
            required: true,
            errorMessage: '证件号不能为空'
          }]
        },
        phone: {
          rules: [{
            required: true,
            errorMessage: '联系方式不能为空'
          }, {
            validateFunction: validateMobile,
          }]
        }
      },
      form: {
        "archivesId": 0,//档案id
        "consultationFocus": "",//重点咨询内容
        "contraceptionMethod": "",//目前避孕方法
        "gestatePlan": "",//近期孕育计划 
        "id": 0,
        "planAbortionManner": "",//拟流产方式 
        "planAbortionTime": "",//拟流产日期
        "planContraceptionMethod": "",//拟避孕方法
        "planContraceptionTime": "",//拟避孕时间
        "pregnancyReason": "",//本次妊娠原因
        "stopMensesDayCount": 0//停经天数
      },
      inputData: ['name', 'accountAddressText', 'homeAddressDetail', 'accountAddressDetail', 'certNumber', 'accountAddressDetail', 'phone', 'consultationUnit'],
      pickerData: ['gender', "certType", 'nationality', 'ethnic', 'domicileType', 'homeRegist', 'education', 'occupation', 'pastHistory', 'presentHistory'],
      pickerDate: ['birthday', 'childBirth'],
      numData: ['pregnancyCount', 'childbirthCount',],
      coulums: [{
        title: "姓名",
        value: "name",
        required: true
      }, {
        title: "近期孕育计划",
        value: "gestatePlan",
        required: true
      }, {
        title: "本次妊娠原因",
        value: "pregnancyReason",
        required: true
      }, {
        title: "停经天数",
        value: "stopMensesDayCount"
      }, {
        title: "拟流产日期",
        value: "planAbortionTime",
        required: true
      }, {
        title: "拟流产方式",
        value: "planAbortionManner"
      }, {
        title: "拟避孕方法",
        value: "planContraceptionMethod"
      }, {
        title: "拟避孕时间",
        value: "planContraceptionTime"
      }, {
        title: "重点咨询内容",
        value: "consultationFocus"
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
        let openid = uni.getStorageSync('openid');
        this.form.openid = openid
        let params = Object.assign({}, this.form);
        uni.showLoading({
          title: '加载中'
        });
        if (type) {
          addArchives(params).then(res => {
            uni.hideLoading()
            if (res.code) {
              uni.showToast({
                title: res.message,
              })
              setTimeout(() => {
                uni.switchTab({
                  url: "/pages/file/list"
                })
              }, 1000);
            }
          })
        } else {
          editArchives(params).then(res => {
            uni.hideLoading()
            if (res.code) {
              uni.showToast({
                title: res.message,
              })
              setTimeout(() => {
                uni.switchTab({
                  url: "/pages/file/list"
                })
              }, 1000);
            }
          })

        }

      }).catch(err => {
        uni.showToast({
          title: err[0].errorMessage,
        })
      }

      )

    },
    formReset () {

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
    handleInput (e) {
      if (!e.detail) {
        uni.showToast({
          title: "222"
        })
      }
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
  width: 6em !important;
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
</style>