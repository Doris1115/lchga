<template>
  <div>
    <uni-forms>
      <uni-group>
        <uni-forms-item
          label="就诊医院"
          v-if="list.length>0"
        >
          <picker
            mode="selector"
            @change="bindPickerChange($event,form)"
            :value="form"
            :range="list"
            range-key="title"
            name="form"
          >
            <view class="input_btn">
              {{list[form]['text']}}
            </view>
          </picker>
        </uni-forms-item>
      </uni-group>
    </uni-forms>
    <button
      type="primary"
      class="submit_btn"
      @click="formSubmit"
      :loading="loading"
    >保存</button>
  </div>
</template>
<script>
import { queryAreaList } from '@/api/main'

export default {
  mounted () {
    this.getHosList();
  },
  data () {
    return {
      list: [],
      form: 0,
      loading: false,
      hosData: {}
    }
  },
  methods: {
    getHosList () {
      queryAreaList().then(res => {
        this.list = []
        if (res.result.length > 0) {
          this.hosData = res.result[0];
          uni.setStorageSync('urlHos', this.hosData.tyfwSystem)
          res.result.map(item => {
            this.list.push({
              text: item.consultationUnitName,
              title: item.consultationUnitName,
              value: item.id,
              url: item.tyfwSystem
            })
          });
        }
      })
    },
    bindPickerChange (e) {
      this.form = e.detail.value;
    },
    formSubmit () {
      this.loading = true;
      this.hosData = this.list[this.form];
      uni.setStorageSync('urlHos', this.hosData.tyfwSystem);
      setTimeout(() => {
        this.loading = false;
        uni.showToast({
          title: '选择就诊医院成功',
        });
        uni.switchTab({
          url: "/pages/home/index"
        })
      }, 300);
    }
  },

}
</script>
<style lang="scss" scoped>
::v-deep .uni-group__content {
  padding: 0 $uni-spacing-row-lg;
  .uni-forms-item__inner {
    padding-bottom: 0;
    overflow: hidden;
    border-bottom: 1px solid $uni-border-color;
  }
  .uni-error-message-text {
    padding-left: 60rpx;
  }
}
::v-deep .uni-forms-item__label {
  width: 6em !important;
  text-align: justify;
  margin-right: $uni-spacing-row-base;
  height: 118rpx;
  line-height: 118rpx;
  .label-text {
    span {
      font-size: $uni-font-size-lg;
      height: 118rpx;
      line-height: 118rpx;
      white-space: nowrap;
      display: block;
      // color: $uni-text-color;
      color: "#666";
    }
  }
}
::v-deep .uni-forms-item__content {
  width: 520rpx;
  height: 118rpx;
  line-height: 118rpx;

  .input_btn {
    height: 100%;
    font-size: $uni-font-size-lg;
  }
}
</style>