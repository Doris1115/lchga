<template>
  <div>
    <!-- 就诊医院 -->
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
            range-key="text"
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
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    this.isAdd = option.isAdd == 1 ? true : false
    let title = this.isAdd ? "选择就诊医院" : "就诊医院"
    uni.setNavigationBarTitle({
      title
    });
  },
  data () {
    return {
      list: [],
      form: 0,
      loading: false,
      hosData: {},
      url: ""
    }
  },
  methods: {
    getHosList () {
      uni.showLoading({
        title: '加载中'
      });
      queryAreaList().then(res => {
        uni.hideLoading()
        this.list = []
        if (res.result.length > 0) {
          uni.getStorageSync('urlHos') || this.setHos(res.result[0])
          res.result.map(item => {
            this.list.push({
              text: item.treatmentUnitName,
              value: item.treatmentUnit,
              title: item.consultationUnitName,
              id: item.id,
              consultationUnit: item.consultationUnit,
              url: item.tyfwSystem
            })
          });
        }
      })
    },
    setHos (v) {
      uni.setStorageSync('urlHos', encodeURIComponent(JSON.stringify(v)))
    },
    bindPickerChange (e) {
      this.form = e.detail.value;
    },
    formSubmit () {
      this.loading = true;
      this.hosData = this.list[this.form];
      this.url = this.list[this.form].url;
      uni.setStorageSync('urlHos', encodeURIComponent(JSON.stringify(this.hosData)));
      setTimeout(() => {
        this.loading = false;
        uni.showToast({
          title: '选择就诊医院成功',
        });
        uni.switchTab({
          url: "/pages/home/index",
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onload(this.url);
          }
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