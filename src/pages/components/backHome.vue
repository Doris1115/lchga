<template>
  <div
    class="warp"
    @click="backHome"
  >
    <uni-icons
      type="home"
      size="40"
      color="rgba(0, 0, 0, 0.2)"
    ></uni-icons>
  </div>
</template>
<script>
export default {
  methods: {
    backHome () {
      uni.switchTab({
        url: '/pages/file/list'
      })
    }
  },
}
</script>
<style lang="scss">
.warp {
  position: fixed;
  bottom: 20%;
  right: 40rpx;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 100rpx;
  height: 100rpx;
}
.uniui-home {
  display: block;
  line-height: 100rpx;
}
</style>
