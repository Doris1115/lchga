<template>
  <!-- 我的资料 -->
  <view class="column">
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
          v-for="(item,index) in coulums"
          :key="index"
        >
          <input
            v-if="inputData.includes(item.value)"
            class="input_btn"
            :name="item.value"
            :placeholder="'请输入'+item.title"
            v-model="form[item.value]"
            @blur="validate"
            @input="validate"
          />
          <input
            v-if="numData.includes(item.value)"
            class="input_btn"
            :name="item.value"
            type="number"
            :placeholder="'请输入'+item.title"
            v-model="form[item.value]"
            @blur="validate"
            @input="validate"
          />
          <picker
            v-if="pickerData.includes(item.value)"
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
              <!-- {{form[item.value]!==''?{...[...pickRanges[item.value]][form[item.value]]}.text:`请输入${item.title}`}} -->
            </view>
          </picker>
          <picker
            v-if="pickerDate.includes(item.value)"
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
      <button
        type="primary"
        class="submit_btn"
        form-type="submit"
        @click="formSubmit"
        :loading="loading"
      >{{isAdd?'注册':'保存'}}</button>
    </uni-forms>
  </view>
</template>
<script>
import { mapGetters } from "vuex";
import { validateMobile, getUrl, transfer } from "@/utils/verify.js"
import { saveWXUser, findByOpenid, editWechatUserByOpenid } from "@/api/main.js"
export default {
  computed: {
    ...mapGetters(["certType"]),
    startDate () {
      return this.getDate('start');
    },
    endDate () {
      return this.getDate('end');
    },
    pickRanges () {
      return {
        certType: this.certType,
        sex: [{
          text: "女",
          title: "女",
          value: "0"
        }, {
          text: "男",
          title: "男",
          value: "1"
        }],
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
    getUrl();
    this.getSelectItem();
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    this.isAdd = option.isAdd == 1 ? true : false
    let title = this.isAdd ? "登录注册" : "我的资料"
    if (!this.isAdd) {
      this.init();
    }
    uni.setNavigationBarTitle({
      title
    });
  },
  data () {
    var wxInfo = JSON.parse(uni.getStorageSync("wxInfo"))
    var url = transfer(uni.getStorageSync("urlHos")).url
    return {
      url,
      loading: false,
      isAdd: true,
      form: {
        nickname: wxInfo.nickname,
        sex: wxInfo.sex ? wxInfo.sex : 0,
        birthday: "1990-01-01",
        headimgurl: wxInfo.headimgurl,
        signature: wxInfo.signature,
        tel: wxInfo.tel,
        certType: "0",
        certNumber: '',
        unionid: wxInfo.unionid,
      },
      hospital: [],
      hospitalIndex: 1,
      hospitalTotal: [],
      inputData: ['nickname', 'signature', 'certNumber'],
      numData: ['tel'],
      pickerDate: ['birthday'],
      pickerData: ['sex', 'certType'],
      coulums: [{
        title: "姓名",
        value: "nickname",
        required: true
      }, {
        title: "性别",
        value: "sex",
      }, {
        title: "手机",
        value: "tel",
        required: true
      }, {
        title: "证件类型",
        value: "certType",
      }, {
        title: "证件号码",
        value: "certNumber",
        required: true
      }, {
        title: "出生年月",
        value: "birthday",
        required: true
      }, {
        title: "签名",
        value: "signature"
      }],
      rules: {
        nickname: {
          rules: [{
            required: true,
            errorMessage: '姓名不能为空'
          }]
        },
        birthday: {
          rules: [{
            required: true,
            errorMessage: '出生年月不能为空'
          }]
        },
        tel: {
          rules: [{
            validateFunction: validateMobile,
          }]
        },
        certNumber: {
          rules: [{
            required: true,
            errorMessage: '证件号不能为空'
          }, {
            validateFunction: this.validateCerNum,
          }]
        }
      },
    }
  },
  methods: {
    init () {
      findByOpenid(this.url, {
        openid: uni.getStorageSync('openid')
      }).then(res => {
        this.isAdd = false;
        this.form = {
          ...res.result
        }
      })
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
      this.form[v] = e.detail.value;
    },
    validate (val) {
      this.$refs.form.validate()
    },
    formSubmit () {
      this.$refs.form.validate().then(res => {
        this.loading = true;
        this.form.openid = uni.getStorageSync('openid');
        let params = Object.assign({}, this.form);
        if (this.isAdd) {
          saveWXUser(this.url, { ...params }).then(res => {
            this.loading = false;
            if (res.code == 200) {
              uni.showToast({
                title: res.message,
              })
              setTimeout(() => {
                uni.switchTab({
                  url: '/pages/home/index'
                })
              }, 1000);
            }
          })
        } else {
          editWechatUserByOpenid(this.url, { ...params }).then(res => {
            this.loading = false;
            if (res.code == 200) {
              uni.setStorageSync("birthday", params.birthday)
              uni.showToast({
                title: res.message,
              })
            }
          })
        }

      })
    },
    getSelectItem () {
      if (this.certType.length == 0) {
        this.$store.dispatch('GET_CERTTYPE');
      }
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