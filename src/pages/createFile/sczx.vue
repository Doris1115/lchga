<template>
  <view class="column">
    <uni-list>
      <uni-list-item
        v-for="(item,index) in coulums"
        :key="index"
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
            :range="pickRange[item.value]"
            :name="item.value"
          >
            <view
              class="input_btn"
              :class='{"placeholder":form[item.value]===""}'
            >{{form[item.value]!==''?pickRange[item.value][form[item.value]]:`请输入${item.title}`}}</view>
          </picker>
          <picker
            v-else-if="pickerDate.includes(item.value)"
            mode="date"
            :name="item.value"
            :value="form.birth"
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
import { getTrantodangan } from '@/api/main'

export default {
  mixins: [validate],
  components: {
    InfoTipPop
  },
  computed: {
    startDate () {
      return this.getDate('start');
    },
    endDate () {
      return this.getDate('end');
    },
  },
  mounted () {
    this.init();
  },
  data () {
    return {
      form: {
        regions: "",
        fileType: 0,
        sex: 0,
        birth: "",
        idType: "",
        idCode: "",
        guoji: "",
        minzu: "",
        huji: "",
        hujifenlei: "",
        hujiguishu: "",
        phone: "",
        whcd: "",
        zhiye: "",
        xianzhuzhi: "",
        hujidizhi: "",
        hycs: "",
        sccs: "",
        xbs: "",
        jws: "",
        jzdw: "",
      },
      inputData: ['name', 'childName', 'weight', 'idCode', 'xianzhuzhi', 'xianzhuzhi', 'phone'],
      pickerData: ['sex', "idType", 'guoji', 'minzu', 'huji', 'hujifenlei', 'hujiguishu', 'whcd', 'hycs', 'sccs', 'zhiye', 'xbs', 'jws', 'jzdw'],
      pickerDate: ['birth', 'childBirth'],
      coulums: [{
        title: "姓名",
        value: "name"
      }, {
        title: "性别",
        value: "sex"
      }, {
        title: "出生年月",
        value: "birth"
      }, {
        title: "证件类型",
        value: "idType"
      }, {
        title: "证件号",
        value: "idCode"
      }, {
        title: "国籍",
        value: "guoji"
      }, {
        title: "民族",
        value: "minzu"
      }, {
        title: "户籍",
        value: "huji"
      }, {
        title: "户籍分类",
        value: "hujifenlei"
      }, {
        title: "户籍归属",
        value: "hujiguishu"
      }, {
        title: "联系方式",
        value: "phone"
      }, {
        title: "文化程度",
        value: "whcd"
      }, {
        title: "职业",
        value: "zhiye"
      }, {
        title: "现住址",
        value: "xianzhuzhi"
      }, {
        title: "户籍地址",
        value: "hujidizhi"
      }, {
        title: "怀孕次数",
        value: "hycs"
      }, {
        title: "生产次数",
        value: "sccs"
      }, {
        title: "现病史",
        value: "xbs"
      }, {
        title: "既往史",
        value: "jws"
      }, {
        title: "就诊单位",
        value: "jzdw"
      }],
      pickRange: {
        idType: ['居民身份证', '港澳居民身份证', '护照', '军官证（士兵证）', '居民身份证15位', '其他'],
        guoji: [],
        minzu: [],
        huji: [],
        hujifenlei: ['农业户口', '非农业户口', '其他'],
        hujiguishu: ['本地', '外地一年以上', '外地一年以内'],
        whcd: ['研究生', '大学本科', '大学专科及专科学校', '中等专业学校', '技工学校', '高中', '初中', '小学', '文盲或半文盲', '其他'],
        zhiye: [],
        xbs: [],
        jws: [],
        jzdw: [],
        sex: ['男孩', '女孩'],
        hycs: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        sccs: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
    }
  },
  methods: {
    init () {
      // getTrantodangan({
      // }).then(res => {
      // })
    },
    formSubmit () {
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