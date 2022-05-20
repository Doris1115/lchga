<template>
  <!-- 档案详情 -->
  <view class="column">
    <ehPicker
      @conceal="conceal"
      v-if="popup"
      ref="ehpicker"
    />
    <uni-forms
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
            @blur="validate"
            @input="validate"
            placeholder-class="placeholder"
            :disabled="item.value=='consultationUnit'"
          />
          <input
            v-if="addressData.includes(item.value)"
            class="input_btn"
            v-model="form[item.value]"
            :placeholder="'请选择'+item.title"
            placeholder-class="placeholder"
            @focus="getAddress(item.value)"
          />
          <!-- disabled -->
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
      :loading="loading"
    >{{type?"新 增":"修 改"}}</button>
    <button
      type="primary"
      class="submit_btn del"
      @click="del"
      v-if="!type"
      :loading="loading"
    >删除档案</button>
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
import { addArchives, editArchives, deleteArchives, getArea } from '@/api/main'
import { mapGetters } from "vuex";
import { validateMobile, getUrl, transfer } from "@/utils/verify.js"
import ehPicker from '@/pages/components/erha-picker/erha-picker.vue';
export default {
  mixins: [validate],
  components: {
    InfoTipPop,
    ehPicker
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
          text: "女",
          title: "女",
          value: "10"
        }, {
          text: "男",
          title: "男",
          value: "21"
        }],
        childbirthCount: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        pregnancyCount: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }
    }
  },
  watch: {
    "form.certNumber": {
      handler (val) {
        if (this.form.certType == 0) {
          if (this.cardid(val)) {
            this.form.birthday = val.slice(6, 10) + "-" + val.slice(10, 12) + "-" + val.slice(12, 14)
          }
        }
      },
      immediate: true
    }
  },
  mounted () {
    getUrl()
    this.getSelectItem();
    this.init();
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    this.type = option.type == 1 ? true : false;
    if (option.type == 0) {
      this.form = JSON.parse(decodeURIComponent(option.items));
      this.form.consultationUnit = this.hos.title;
    }
  },
  data () {
    var url = transfer(uni.getStorageSync("urlHos")).url
    var hos = transfer(uni.getStorageSync("urlHos"))
    return {
      url,
      hos,
      type: true,
      loading: false,
      popup: false,
      address: "",
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: '姓名不能为空'
          },
          {
            minLength: 1,
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
          }, {
            validateFunction: this.validateCerNum,
          }]
        },
        phone: {
          rules: [{
            validateFunction: validateMobile,
          }]
        }
      },
      form: {
        "accountAddressCode": "",//户口地址code
        "accountAddressDetail": "",//户口地址详情
        "birthday": uni.getStorageSync('birthday'),//出生日期
        "certNumber": uni.getStorageSync('certNumber'),//证件号码
        "certType": uni.getStorageSync('certTypes'),//证件类型
        "openid": uni.getStorageSync('openid'),//证件类型
        "childbirthCount": 0,//产次
        "consultationUnit": hos.title,//就诊单位id
        "consultationUnitName": hos.title,//就诊单位名称
        "domicileType": 1,//户籍分类
        "education": 1,//文化程度
        "ethnic": 1,//民族 
        "gender": uni.getStorageSync('sex'),//性别 
        "homeAddressCode": "",//现住地址
        "homeAddressDetail": "",//现住地址详情
        "homeAddressText": "",//现住地址名称
        "homeRegist": 1,//户籍归属
        "id": "",//
        "name": uni.getStorageSync('name'),//姓名
        "nationality": 43,//国籍
        "occupation": 1,//职业
        "pastHistory": 0,//既往史
        "phone": uni.getStorageSync('tel'),//电话
        "pregnancyCount": 0,//孕次
        "presentHistory": 0,//现病史
        "workUnit": "",//工作单位
      },
      inputData: ['name', 'certNumber', 'phone', 'consultationUnit'],
      pickerData: ['gender', "certType", 'nationality', 'ethnic', 'domicileType', 'homeRegist', 'education', 'occupation', 'pastHistory', 'presentHistory'],
      pickerDate: ['birthday', 'childBirth'],
      numData: ['pregnancyCount', 'childbirthCount',],
      addressData: ['homeAddressDetail', 'accountAddressDetail',],
      coulums: [{
        title: "姓名",
        value: "name",
        required: true
      }, {
        title: "性别",
        value: "gender",
        required: true
      },
      {
        title: "证件类型",
        value: "certType"
      }, {
        title: "证件号",
        value: "certNumber",
        required: true
      }, {
        title: "出生年月",
        value: "birthday",
        required: true
      },
      {
        title: "国籍",
        value: "nationality"
      },
      {
        title: "民族",
        value: "ethnic"
      }, {
        title: "户籍分类",
        value: "domicileType"
      }, {
        title: "户籍归属",
        value: "homeRegist"
      }, {
        title: "手机",
        value: "phone",
      }, {
        title: "文化程度",
        value: "education"
      }, {
        title: "职业",
        value: "occupation"
      }, {
        title: "现住址",
        value: "homeAddressDetail"
      }, {
        title: "户籍地址",
        value: "accountAddressDetail"
      }, {
        title: "怀孕次数",
        value: "pregnancyCount"
      }, {
        title: "生产次数",
        value: "childbirthCount"
      }, {
        title: "现病史",
        value: "presentHistory"
      }, {
        title: "既往史",
        value: "pastHistory"
      }, {
        title: "就诊单位",
        value: "consultationUnit",
      }
      ],
    }
  },
  methods: {
    init () {
      let title = this.type ? "新增档案" : "档案详情"
      uni.setNavigationBarTitle({
        title
      });
      if (!this.type) {
        this.getInfoList()
      }

    },
    transfer (v) {
      return JSON.parse(decodeURIComponent(v));
    },
    getInfoList (data) {
      console.log('data', data);
    },
    formSubmit () {
      this.$refs.form.validate().then(res => {
        this.loading = true;
        this.form.consultationUnit = this.hos.value
        let params = Object.assign({}, this.form);
        uni.showLoading({
          title: '加载中'
        });
        if (this.type) {
          addArchives(this.url, params).then(res => {
            uni.hideLoading()
            if (res.code) {
              uni.showToast({
                title: res.message,
              })
              setTimeout(() => {
                uni.switchTab({
                  url: "/pages/file/list",
                  success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.getInfoList();
                  }
                })
              }, 1000);
            }
          })
        } else {
          editArchives(this.url, params).then(res => {
            uni.hideLoading()
            if (res.code) {
              uni.showToast({
                title: res.message,
              })
              setTimeout(() => {
                uni.switchTab({
                  url: "/pages/file/list",
                  success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.getInfoList();
                  }
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
        year = year - 100;
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
      await this.$store.dispatch('GET_NATIONALITY');
      await this.$store.dispatch('GET_CERTTYPE');
      await this.$store.dispatch('GET_EDUCATION');
      await this.$store.dispatch('GET_DOMICILETYPE');
      await this.$store.dispatch('GET_ETHNIC');
      await this.$store.dispatch('GET_HOMEREGIST');
      await this.$store.dispatch('GET_OCCUPATION');
      await this.$store.dispatch('GET_PASTHISTORY');
      await this.$store.dispatch('GET_PRESENTHISTORY');
    },
    handleInput (e) {
      let a = e.detail
      if (!e.detail) {
        uni.showToast({
          title: "222"
        })
      }
    },
    validate (val) {
      this.$refs.form.validate()
    },
    del () {
      let archivesId = this.form.id
      this.loading = false;
      deleteArchives(this.url, { id: archivesId }).then(res => {
        uni.hideLoading()
        if (res.code) {
          uni.showToast({
            title: res.message,
          })
          setTimeout(() => {
            uni.switchTab({
              url: "/pages/file/list",
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.getInfoList();
              }
            })
          }, 1000);
        }
      })
    },
    conceal (param) {
      // 获取到传过来的 省 市 区 县数据
      this.form[this.address] = param.province + param.city + param.area + param.street
      this.popup = false;
    },
    getAddress (v) {
      this.popup = true;
      this.address = v
    },
    cardid (code) {
      var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!regIdNo.test(code)) {
        return false;
      }
      return true
    },
    validateCerNum (rule, value, data, callback) {
      if (this.form.certType == '0') {
        if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
          callback("请输入正确的证件号码");
        }
      }
      return true;
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