<template>
  <view class="column">
    <uni-forms
      :rules="rules"
      :value="formData"
      ref="form"
      validate-trigger="bind"
      err-show-type="undertext"
    >
      <uni-group top="0">
        <uni-forms-item
          name="name"
          required
          label="用户名"
        >
          <uni-easyinput
            type="text"
            :inputBorder="true"
            v-model="formData.name"
            placeholder="请输入用户名"
          ></uni-easyinput>
        </uni-forms-item>
        <!-- 使用原生input，需要绑定binddata -->
        <uni-forms-item
          name="age"
          required
          label="年龄"
        >
          <input
            type="text"
            v-model="formData.age"
            class="uni-input-border"
            @blur="binddata('age', $event.detail.value)"
            placeholder="请输入年龄"
          />
        </uni-forms-item>
        <uni-forms-item
          name="email"
          label="邮箱"
        >
          <uni-easyinput
            type="text"
            v-model="formData.email"
            placeholder="请输入邮箱"
          ></uni-easyinput>
        </uni-forms-item>
        <!-- #ifndef APP-NVUE -->
        <uni-forms-item
          required
          name="birth"
          label="出生日期"
        >
          <uni-datetime-picker
            type="date"
            v-model="formData.birth"
            start="2000-06-01 06:30:30"
            end="2030-6-1"
            return-type="timestamp"
          ></uni-datetime-picker>
        </uni-forms-item>
        <uni-forms-item
          name="checked"
          label="详细信息"
        >
          <switch
            :checked="formData.checked"
            @change="change('checked', $event.detail.value)"
          />
        </uni-forms-item>
        <!-- #endif -->
      </uni-group>

      <view class="example">
        <button
          class="button"
          @click="submitForm('form')"
        >校验表单</button>
        <button
          class="button"
          @click="validateField('form')"
        >只校验用户名和邮箱项</button>
        <button
          class="button"
          @click="clearValidate('form', 'name')"
        >移除用户名的校验结果</button>
        <button
          class="button"
          @click="clearValidate('form')"
        >移除全部表单校验结果</button>
        <button
          class="button"
          @click="resetForm"
        >重置表单</button>
      </view>
    </uni-forms>
  </view>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        age: '',
        email: '',
        sex: '',
        hobby: [],
        remarks: '',
        checked: false,
        country: -1,
        birth: ''
      },
      sex: [{
        text: '男',
        value: '0'
      },
      {
        text: '女',
        value: '1'
      },
      {
        text: '未知',
        value: '2'
      }
      ],
      hobby: [{
        text: '足球',
        value: 0
      },
      {
        text: '篮球',
        value: 1
      },
      {
        text: '游泳',
        value: 2
      }
      ],
      range: ['中国', '美国', '澳大利亚'],
      show: false,
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
        age: {
          rules: [{
            required: true,
            errorMessage: '请输入年龄'
          },
          {
            format: 'int',
            errorMessage: '年龄必须是数字'
          },
          {
            minimum: 18,
            maximum: 30,
            errorMessage: '年龄应该大于 {minimum} 岁，小于 {maximum} 岁'
          }
          ]
        },
        birth: {
          rules: [{
            required: true,
            errorMessage: '请选择时间'
          }]
        },
        email: {
          rules: [{
            format: 'email',
            errorMessage: '请输入正确的邮箱地址'
          }]
        },
        checked: {
          rules: [{
            format: 'bool'
          }]
        },
        sex: {
          rules: [{
            format: 'string'
          }]
        },
        hobby: {
          rules: [{
            format: 'array'
          },
          {
            validateFunction: function (rule, value, data, callback) {
              if (value.length < 2) {
                callback('请至少勾选两个兴趣爱好')
              }
              return true
            }
          }
          ]
        }
      }
    }
  },
  onLoad () {
    uni.showLoading()
    // this.formData 应该包含所有需要校验的表单
    // 模拟异步请求数据
    setTimeout(() => {
      this.formData = {
        name: 'DCloud',
        age: 21,
        email: '',
        sex: '0',
        hobby: [],
        remarks: '热爱学习，热爱生活',
        checked: false,
        country: 2,
        birth: ''
      }
      uni.hideLoading()
    }, 500)
  },
  onReady () {
    this.$refs.form.setRules(this.rules)
  },
  methods: {
    birthChange (e) {
      console.log(e)
    },
    change (name, value) {
      this.formData.checked = value
      this.$refs.form.setValue(name, value)
    },

    /**
     * 手动提交
     * @param {Object} form
     */
    submitForm (form) {
      // console.log(this.formData);
      this.$refs[form]
        .submit()
        .then(res => {
          console.log('表单的值：', res)
          uni.showToast({
            title: '验证成功'
          })
        })
        .catch(errors => {
          console.error('验证失败：', errors)
        })
    },

    /**
     * 手动重置表单
     */
    resetForm () {
      this.$refs.form.resetFields()
    },
    /**
     * 部分表单校验
     * @param {Object} form
     */
    validateField (form) {
      this.$refs[form]
        .validateField(['name', 'email'])
        .then(res => {
          uni.showToast({
            title: '验证成功'
          })
          console.log('表单的值：', res)
        })
        .catch(errors => {
          console.error('验证失败：', errors)
        })
    },

    /**
     * 清除表单校验
     * @param {Object} form
     * @param {Object} name
     */
    clearValidate (form, name) {
      if (!name) name = []
      this.$refs[form].clearValidate(name)
    }
  }
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