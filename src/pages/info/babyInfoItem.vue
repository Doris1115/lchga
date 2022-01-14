<template>
  <view>
    <uni-list class="column">
      <uni-list-item v-for="(item,index) in columns" :key="index">
        <!-- 自定义 header -->
        <view slot="header" class="slot-box">
          {{item}}
        </view>
        <view slot="body" class="slot-body">
          <input disabled class="input_btn" v-model="form[index]" />
        </view>
      </uni-list-item>
      <uni-list-item>
        <view slot="header" class="slot-box">
          状态
        </view>
        <view class="slot-body status_box" slot="body">
          <switch :checked="status" @change="switchChange" style="transform:scale(0.7)" :disabled="status" />
          <view class="status_txt">{{status?"已选中":"关闭中"}}</view>
        </view>
      </uni-list-item>
    </uni-list>
    <button type="primary" class="submit_btn" @click="delchild">删除宝宝</button>
    <!-- 提示信息弹窗 -->
    <info-tip-pop ref="message" :type="msgType" :message="messageText" />
  </view>
</template>
<script>
import { deletebaby, currentChildById } from '@/api/main'
import validate from '@/mixins/validate'
import InfoTipPop from "@/pages/components/infoTipPop"

export default {
  onLoad(option) {
    this.form = {
      sex: option.sex ? "女孩" : "男孩",
      name: option.name,
      birth: option.birth,
      bid: option.bid
    }
  },
  computed: {
    status() {
      return this.currentBid === this.form.bid;
    }
  },
  mixins: [validate],
  components: {
    InfoTipPop
  },
  data() {
    return {
      form: {
        sex: "",
        name: "",
        birth: "",
        bid: ""
      },
      columns: {
        name: "宝宝昵称",
        sex: "性别",
        birth: "生日"
      },
      currentBid: "764715"
    }
  },
  methods: {
    delchild() {
      let bid = this.form.bid
      deletebaby({
        bid
      }).then(res => {
        this.msgType = 'success';
        this.messageText = `删除完成`;
        this.$refs.message.open()
        setTimeout(() => {
          this.$router.go(-1)
        }, 400)
      }).catch(err => {
        this.msgType = 'error';
        this.messageText = `当前网络不通请稍后再试`;
        this.$refs.message.open();
        setTimeout(() => {
          this.$router.go(0)
        }, 400)
      })
    },
    switchChange(e) {
      currentChildById({
        memberInfoId: this.form.bid
      }).then(res => {
        this.currentBid = this.form.bid;
        this.msgType = 'success';
        this.messageText = `已选中${this.form.name}为当前宝贝`;
        this.$refs.message.open()
      }).catch(err => {
        this.msgType = 'error';
        this.messageText = `当前网络不通请稍后再试`;
        this.$refs.message.open();
        setTimeout(() => {
          this.$router.go(0)
        }, 400)
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
.submit_btn {
  margin: 60rpx $uni-spacing-row-lg 0;
  border-radius: 90rpx;
}
.slot-body {
  width: 520rpx;
  height: 2em;
  line-height: 2em;
  .input_btn {
    height: 100%;
  }
}
.status_box {
  display: flex;
  .status_txt {
    margin-left: $uni-spacing-row-sm;
  }
}
</style>