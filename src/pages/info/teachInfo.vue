<template>
  <view class="column">
    <form @submit="formSubmit" @reset="formReset">
      <uni-list>
        <uni-list-item v-for="(item,index) in coulums" :key="index">
          <!-- 自定义 header -->
          <view slot="header" class="slot-box">
            {{item.title}}
          </view>
          <view slot="body" class="slot-body">
            <input v-if="item.value==='userXm'" class="input_btn" :name="item.value" :placeholder="'请输入'+item.title" v-model="form.userXm" auto-blur />
            <input v-if="item.value==='cardId'" class="input_btn" :name="item.value" :placeholder="'请输入'+item.title" v-model="form.cardId" type="idcard" auto-blur />
            <input v-if="item.value==='userTel'" class="input_btn" :name="item.value" :placeholder="'请输入'+item.title" v-model="form.userTel" type="tel" auto-blur @blur="validateTel" />
            <input v-if="item.value==='schoolname'" disabled class="input_btn" :name="item.value" :placeholder="'请输入'+item.title" v-model="form.schoolname" />
          </view>
        </uni-list-item>
      </uni-list>
      <button type="primary" class="submit_btn" form-type="submit">保存</button>
      <!-- <button type="default" class="disable_btn">退出教师身份</button> -->
    </form>
    <!-- 提示信息弹窗 -->
    <info-tip-pop ref="message" :type="msgType" :message="messageText" />
  </view>
</template>
<script>
import { editTeacherByCardId, getSchoolId } from '@/api/main'
import InfoTipPop from "@/pages/components/infoTipPop"
import validate from '@/mixins/validate'
export default {
  mounted() {
    this.getBaseInfo();
  },
  mixins: [validate],
  components: {
    InfoTipPop
  },
  data() {
    return {
      form: {
        userXm: "",
        cardId: "",
        userTel: "",
        schoolname: ""
      },
      rules: {
        userXm: {
          rule: /\S/,
          msg: "姓名不能为空"
        }
      },
      rulesArr: ['userXm', 'userTel', 'cardId'],
      hospital: [],
      hospitalIndex: 1,
      hospitalTotal: [],
      coulums: [{
        title: "教师姓名",
        value: "userXm"
      }, {
        title: "手机号",
        value: "userTel"
      }, {
        title: "证件号",
        value: "cardId"
      }, {
        title: "托育机构",
        value: "schoolname"
      }],
    }
  },
  methods: {
    formSubmit(e) {
      let form = {
        userXm: this.form.userXm,
        cardId: this.form.cardId,
        userTel: this.form.userTel
      }
      if (this.validateForm()) {
        editTeacherByCardId(form).then(res => {
          this.msgType = 'success'
          this.messageText = '保存成功'
          this.$refs.message.open()
        })
      }
    },
    formReset() {

    },
    getBaseInfo() {
      let cardId = uni.getStorageSync('cardId');
      getSchoolId({
        cardId
      }).then(res => {
        if (!res.code) {
          let result = res.result[0];
          this.form = {
            userXm: result.userXm,
            cardId: result.userCardId,
            userTel: result.userTel,
            schoolname: result.schoolname
          }
        }
      })
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
</style>