<template>
  <view class="column">
    <uni-forms
      :rules="rules"
      :value="form"
      ref="form"
      validate-trigger="bind"
      err-show-type="undertext"
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
    <uni-list v-if="false">
      <uni-list-item
        :key="index"
        v-for="(item,index) in coulums"
        :class="{'required':item.rules?item.rules.required:false}"
      >
        <!-- 自定义 header -->
        <view
          slot="header"
          class="slot-box"
        >
          {{item.title}}
        </view>
        <view
          slot="body"
          class="slot-body"
        >
          <uni-easyinput
            type="text"
            :inputBorder="true"
            v-model="form[item.value]"
            :placeholder="'请输入'+item.title"
          ></uni-easyinput>

          <!-- <input
            v-if="inputData.includes(item.value)"
            class="input_btn"
            v-model="form[item.value]"
            :placeholder="'请输入'+item.title"
            placeholder-class="placeholder"
            @blur="handleInput"
          /> -->
          <input
            v-if="numData.includes(item.value)"
            type="number"
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
          <!-- <picker
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
          </picker> -->
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
        </view>
      </uni-list-item>
      <uni-list-item v-if="false">
        <view
          slot="header"
          class="slot-box"
        >
          证件类型
        </view>
        <view
          slot="body"
          class="slot-body"
        >
          <picker
            mode="selector"
            @change="bindPickerChange($event,'certType')"
            :value="form['certType']"
            :range="pickRanges['certType']"
            range-key="title"
          >
            <view class="input_btn">
              {{form['certType']!==''?certType[form.certType].text:"3333"}}
            </view>
          </picker>
        </view>
      </uni-list-item>
    </uni-list>
    <button
      type="primary"
      class="submit_btn"
      @click="formSubmit"
    >保存</button>
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
import { addArchives, getTrantodangan, queryArchivesList, queryAreaList } from '@/api/main'
import { mapGetters } from "vuex";

export default {
  mixins: [validate],
  components: {
    InfoTipPop
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
  data () {
    return {
      type: true,
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: '请输入用户名'
          },
          {
            minLength: 3,
            maxLength: 15,
            errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
          }
          ]
        },
      },
      form: {
        "accountAddressCode": "",//户口地址code
        "accountAddressDetail": "",//户口地址详情
        "accountAddressText": "",//户口地址名称
        "birthday": "",//出生日期
        "certNumber": "",//证件号码
        "certType": "2",//证件类型
        "childbirthCount": 0,//产次
        "consultationUnit": "",//就诊单位id
        "consultationUnitName": "",//就诊单位名称
        "domicileType": 1,//户籍分类
        "education": 1,//文化程度
        "ethnic": 1,//民族 
        "gender": "0",//性别 
        "homeAddressCode": "",//现住地址
        "homeAddressDetail": "",//现住地址详情
        "homeAddressText": "",//现住地址名称
        "homeRegist": 1,//户籍归属
        "id": "",//
        "name": "",//姓名
        "nationality": 43,//国籍
        "occupation": 1,//职业
        "openid": "",
        "pastHistory": 0,//既往史
        "phone": "",//电话
        "pregnancyCount": 0,//孕次
        "presentHistory": 0,//现病史
        "workUnit": "",//工作单位
      },
      inputData: ['name', 'certNumber', 'accountAddressDetail', 'phone', 'consultationUnit'],
      pickerData: ['gender', "certType", 'nationality', 'ethnic', 'domicileType', 'homeRegist', 'education', 'occupation', 'pastHistory', 'presentHistory'],
      pickerDate: ['birthday', 'childBirth'],
      numData: ['pregnancyCount', 'childbirthCount',],
      coulums: [{
        title: "姓名",
        value: "name",
        required: true
      }, {
        title: "性别",
        value: "gender",
        required: true
      }, {
        title: "出生年月",
        value: "birthday",
        required: true
      }, {
        title: "证件类型",
        value: "certType"
      }, {
        title: "证件号",
        value: "certNumber",
        required: true
      }, {
        title: "国籍",
        value: "nationality"
      }, {
        title: "民族",
        value: "ethnic"
      }, {
        title: "户籍",
        value: "huji"
      }, {
        title: "户籍分类",
        value: "domicileType"
      }, {
        title: "户籍归属",
        value: "homeRegist"
      }, {
        title: "联系方式",
        value: "phone",
        required: true
      }, {
        title: "文化程度",
        value: "education"
      }, {
        title: "职业",
        value: "occupation"
      }, {
        title: "现住址",
        value: "xianzhuzhi"
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
        required: true
      }],
    }
  },
  methods: {
    init () {
      this.type = this.$route.query.type ? true : false;
      let title = this.$route.query.type ? "新增档案" : "档案详情"
      console.log('ddddd', this.pickRanges);
      uni.setNavigationBarTitle({
        title
      });
    },
    formSubmit () {
      let params = Object.assign({}, this.form);
      debugger
      addArchives(params).then(res => {
        let a = res
        debugger
      })
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
  width: 7em;
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