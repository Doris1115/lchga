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
            :disabled="item.value=='name'||addBtn"
          />
          <input
            v-else-if="numData.includes(item.value)"
            class="input_btn"
            type="number"
            v-model="form[item.value]"
            :placeholder="'请输入'+item.title"
            :disabled="addBtn"
            placeholder-class="placeholder"
          />
          <picker
            v-else-if="pickerData.includes(item.value)"
            mode="selector"
            @change="bindPickerChange($event,item.value)"
            :value="form[item.value]"
            :range="pickRanges[item.value]"
            range-key="title"
            :disabled="addBtn"
            :name="item.value"
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
      @click="formSubmit"
      :loading="loading"
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
import { editFirstFollow, deleteFirstFollow, addFirstFollow } from '@/api/main'
import { mapGetters } from "vuex";
import { transfer } from "@/utils/verify.js"

export default {
  mixins: [validate],
  components: {
    InfoTipPop,
    BackHome
  },
  computed: {
    ...mapGetters(["yylypsb", "yesno", "planContraceptionMethod"]),
    pickRanges () {
      return {
        "contraceptionMethod": this.planContraceptionMethod,//目前避孕方法
        "isGoUse": this.yesno,//是否继续使用 
        "isMenstrualRecover": this.yesno,//月经是否恢复 
        "isSexLife": this.yesno,//是否恢复性生活
        "menstrual": this.yylypsb,//月经量与平时比
        "replacement": this.planContraceptionMethod,//替换产品，打算更换为
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
    }

  },
  data () {
    var url = uni.getStorageSync("urlHos") ? transfer(uni.getStorageSync("urlHos")).url : "http://39.107.74.117:9999/fybj365-abortion-love"
    return {
      url,
      type: true,
      loading: false,
      addBtn: false,
      form: {
        "name": uni.getStorageSync('name'),
        "afterAbortionBloodDay": 7,//流产后出血天数
        "afterAbortionDayRecover": 60,//性生活流产后多少天恢复
        "afterAbortionMenstrualRecover": 40,//月经流产后多少天恢复
        "archivesId": uni.getStorageSync('archivesId'),
        "consultationFocus": "",//重点咨询内容
        "contraceptionFeel": "",//目前避孕主要感受
        "contraceptionMethod": 0,//目前避孕方法
        "id": 0,
        "isGoUse": 0,//是否继续使用
        "isMenstrualRecover": 0,//月经是否恢复
        "isSexLife": 0,//是否恢复性生活 
        "menstrual": 0,//月经量与平时比
        "replacement": 0//替换产品，打算更换为 
      },
      rules: {
        consultationFocus: {
          rules: [{
            required: true,
            errorMessage: ' '
          }]
        }
      },
      inputData: ['name', 'contraceptionFeel'],
      pickerData: ['isSexLife', 'isMenstrualRecover', 'menstrual', 'contraceptionMethod', 'isGoUse', 'replacement'],
      pickerDate: ['planAbortionTime'],
      numData: ['afterAbortionDayRecover', 'afterAbortionMenstrualRecover', 'afterAbortionBloodDay'],
      coulumnsSelect: ['isSexLife', 'isMenstrualRecover', 'isGoUse'],
      coulums: [{
        title: "姓名",
        value: "name",
      }, {
        title: "是否恢复性生活",
        value: "isSexLife",
      }, {
        title: "流产后多少天恢复",
        value: "afterAbortionDayRecover"
      }, {
        title: "月经是否恢复",
        value: "isMenstrualRecover",
      }, {
        title: "流产后几天恢复",
        value: "afterAbortionMenstrualRecover"
      }, {
        title: "月经量与平时比",
        value: "menstrual",
      }, {
        title: "流产后出血天数",
        value: "afterAbortionBloodDay",
      }, {
        title: "目前避孕方式",
        value: "contraceptionMethod",
      }, {
        title: "目前避孕感受",
        value: "contraceptionFeel",
      }, {
        title: "是否继续使用",
        value: "isGoUse",
      }, {
        title: "替换产品",
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
    formSubmit () {
      this.$refs.form.validate().then(res => {
        this.loading = true;
        let openid = uni.getStorageSync('openid');
        let archivesId = uni.getStorageSync('archivesId');
        this.form.openid = openid
        this.form.archivesId = archivesId
        this.form.afterAbortionMenstrualRecover = this.form.isMenstrualRecover == 0 ? "" : this.form.afterAbortionMenstrualRecover;
        this.form.afterAbortionDayRecover = this.form.isSexLife == 0 ? "" : this.form.afterAbortionDayRecover;
        let params = Object.assign({}, this.form);
        uni.showLoading({
          title: '加载中'
        });
        if (this.type) {//新增
          addFirstFollow(this.url, params).then(res => {
            uni.hideLoading()
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
          })
        } else {
          editFirstFollow(this.url, params).then(res => {
            uni.hideLoading()
            if (res.code) {
              uni.showToast({
                title: res.message,
              })
            }
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
          })
        }
      })
    },
    formReset () {

    },
    validateShow (item) {
      let v = true
      if (item.value == 'afterAbortionDayRecover') {
        v = this.form.isSexLife == "1"
      } else if (item.value == "afterAbortionMenstrualRecover") {
        v = this.form.isMenstrualRecover == "1"
      } else if (item.value == "replacement") {
        v = this.form.isGoUse == "0" ? true : false
      }
      return v
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
      await this.$store.dispatch('GET_YYLYPSB');
      await this.$store.dispatch('GET_YESNO');
      await this.$store.dispatch('GET_PLANCONTRACEPTIONMETHOD');
    },
    del () {
      deleteFirstFollow(this.url, {
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
  width: 10em !important;
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