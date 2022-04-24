<template>
  <view class="empty">
    <image
      :src="empty_icon"
      mode="aspectFit"
      class="empty_image"
    > </image>
    <p class="text">{{title}}</p>
    <button
      type="primary"
      size="mini"
      plain
      class="submit_btn02"
      v-if="type!=='3'"
      @click="addFile"
    >{{btnTitle}}</button>
  </view>
</template>
<script>
export default {
  props: {
    title: {
      title: String,
      default: "您还没有添加档案信息"
    },
    btnTitle: {
      title: String,
      default: "添加档案"
    },
    type: {
      title: String,
      default: "0"
    }
  },
  data () {
    return {
      empty_icon: "/static/icons/empty.png",
    }
  },
  methods: {
    addFile () {
      this.$emit('saveBtn')
    }
  },
}
</script>
<style lang="scss" scoped>
.empty {
  text-align: center;
  overflow: hidden;
  .submit_btn02 {
    margin: auto;
    color: $uni-color-base !important;
    border: 1px solid $uni-color-base !important;
  }
  .text {
    color: $uni-text-color;
    font-size: $uni-font-size-base;
    text-align: center;
    margin-top: 48rpx;
    margin-bottom: 32rpx;
  }
  .empty_image {
    width: 320rpx;
    height: 320rpx;
    margin: auto;
    display: block;
    margin-top: 168rpx;
  }
}
</style>