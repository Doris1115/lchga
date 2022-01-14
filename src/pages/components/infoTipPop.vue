<template>
  <view>
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="type" :message="message" :duration="2000" class="pop-tip"></uni-popup-message>
    </uni-popup>
  </view>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'error'
    },
    message: {
      type: String,
      default: ''
    },
  },
  methods: {
    open() {
      this.$refs.message.open()
    }
  },
}
</script>
<style lang="scss" scoped>
.pop-tip {
  text-align: center;
}
</style>