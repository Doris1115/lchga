<template>
  <view>
    <form @submit="formSubmit">
      <uni-list class="column">
        <view class="a" v-for="(item,index) in columns" :key="index">
          <uni-list-item v-if="isShow.includes(item.value)">
            <!-- 自定义 header -->
            <view slot="header" class="slot-box">
              {{item.title}}
            </view>
            <view slot="body" class="slot-body">
              <input v-if="inputData.includes(item.value)" class="input_btn" v-model="form[item.value]" :placeholder="'请输入'+item.title" placeholder-class="placeholder" />
              <picker v-else-if="pickerData.includes(item.value)" mode="selector" @change="bindPickerChange($event,item.value)" :value="form[item.value]" :range="pickRange[item.value]" :name="item.value">
                <view class="input_btn" :class='{"placeholder":form[item.value]===""}'>{{form[item.value]!==''?pickRange[item.value][form[item.value]]:`请输入${item.title}`}}</view>
              </picker>
              <picker v-else-if="pickerDate.includes(item.value)" mode="date" :name="item.value" :value="form.childBirth" :start="startDate" :end="endDate" @change="bindPickerChange($event,item.value)">
                <view class="input_btn" :class='{"placeholder":form[item.value]===""}'>{{form[item.value]!==''?form[item.value]:`请输入${msgTip[item.value]}`}}</view>
              </picker>
            </view>
            <view class="slot-foot" slot="footer" v-if="!inputData.includes(item.value)">
              <uni-icons type="right" size="14" style="color:rgb(187, 187, 187)"></uni-icons>
            </view>
          </uni-list-item>
        </view>
        <uni-list-item to="/pages/vue/index/index" v-if="form.currentType===1">
          <view slot="header" class="slot-box">
            测量记录
          </view>
          <view slot="body" class="slot-body">
            <button type="primary" size="mini" @click="navigatorLink">
              查看记录
            </button>
          </view>
          <view class="slot-foot" slot="footer">
            <uni-icons type="right" size="14" style="color:rgb(187, 187, 187)"></uni-icons>
          </view>
        </uni-list-item>
      </uni-list>
      <button type="primary" class="submit_btn" form-type="submit">保存</button>
    </form>
    <!-- 提示信息弹窗 -->
    <info-tip-pop ref="message" :type="msgType" :message="messageText" />
  </view>
</template>
<script>
import InfoTipPop from "@/pages/components/infoTipPop"
import { savebaby } from '@/api/main'
import validate from '@/mixins/validate'

export default {
  components: {
    InfoTipPop,
  },
  mixins: [validate],
  computed: {
    startDate() {
      return this.getDate('start');
    },
    endDate() {
      return this.getDate('end');
    },
    isShow() {
      return this.currentType[this.form.currentType]
    }
  },
  data() {
    const currentDate = this.getDate({
      format: true
    })
    return {
      hospitalIndex: 0,
      form: {
        openid: uni.getStorageSync('openid'),
        uid: uni.getStorageSync('uid'),
        bid: "",
        nickName: "",
        relation: 1,
        currentType: 0,
        childName: "",
        childBirth: "",
        weight: "",
        babySex: 0,
        prepareDate: ""
      },
      inputData: ['nickName', 'childName', 'weight'],
      pickerData: ['relation', 'currentType', 'babySex'],
      pickerDate: ['prepareDate', 'childBirth'],
      pickRange: {
        relation: ['父亲', '母亲', '爷爷', '奶奶', '外公', '外婆', '其他'],
        currentType: ['正在孕期', '已有宝宝', '准备怀孕', '其他'],
        babySex: ['男孩', '女孩'],
      },
      currentType: [
        ['nickName', 'relation', 'currentType', 'prepareDate'],
        ['nickName', 'relation', 'currentType', 'childName', 'childBirth', 'weight', 'babySex'],
        ['nickName', 'relation', 'currentType'],
        ['nickName', 'relation', 'currentType']
      ],
      msgTip: {
        prepareDate: "预产期",
        childBirth: "宝宝生日",
      },
      columns: [{
        title: "昵称",
        value: "nickName"
      }, {
        title: "亲属关系",
        value: "relation"
      }, {
        title: "所在状态",
        value: "currentType"
      }, {
        title: "宝宝名称",
        value: "childName"
      }, {
        title: "宝宝生日",
        value: "childBirth"
      }, {
        title: "宝宝体重",
        value: "weight"
      }, {
        title: "宝宝性别",
        value: "babySex"
      }, {
        title: "预产期",
        value: "prepareDate"
      }],
      date: currentDate

    }
  },
  methods: {
    formSubmit() {
      let form = Object.assign({}, this.form)
      form.relation = this.pickRange.relation[form.relation]
      form.currentType = this.pickRange.currentType[form.currentType]
      form.babySex = this.pickRange.babySex[form.babySex]
      savebaby(form).then(res => {
        if (!!res.status) {
          uni.navigateTo({
            url: '/pages/info/babyInfo'
          })
        }
      })
    },
    formReset() {
      this.form = Object.assign({}, this.form, {
        currentType: 0,
        childName: "",
        childBirth: "",
        weight: "",
        babySex: 0,
        prepareDate: ""
      })
    },
    getDate(type) {
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
    bindPickerChange(e, v) {
      if (v == 'currentType') {
        this.formReset();
      }
      this.form[v] = e.detail.value;
    },
    navigatorLink() {
      let openid = uni.getStorageSync('openid')
      let uid = uni.getStorageSync('uid')
      let url = `http://wx.fybj365.com/weixin/listMeasurementRecord?openid=${openid}&wxVersion=18120423&uid=${uid}&memberInfoId=`;
      window.location.href = url
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
  width: 5em;
  text-align: justify;
  margin-right: $uni-spacing-row-sm;
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