<script>
export default {
  data() {
    return {
      msgType: "",
      messageText: "",
      //验证规则
      rules: {
        userTel: {
          rule: /^1[3456789]\d{9}$/,
          msg: "手机号格式错误"
        },
        cardId: {
          rule: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i,
          msg: "无效身份证信息"
        }

      },
    }
  },
  methods: {
    validateFun(key) {
      let bool = true;
      if (!this.rules[key].rule.test(this.form[key])) {
        //提示信息
        this.msgType = 'error'
        this.messageText = this.rules[key].msg
        this.$refs.message.open()
        //取反
        bool = false;
        return false;
      }
      return bool;
    },
    validateForm() {
      return this.rulesArr.every(rule => {
        return this.validateFun(rule)
      })
    }
  },
}
</script>