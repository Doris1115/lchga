<template>
  <view class="column">
    <form
      @submit="formSubmit"
      @reset="formReset"
    >
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
              v-if="item.value==='name'"
              class="input_btn"
              :name="item.value"
              :placeholder="'请输入'+item.title"
              v-model="form.name"
              disabled
            />
            <input
              v-if="item.value==='sex'"
              class="input_btn"
              :name="item.value"
              :placeholder="'请输入'+item.title"
              v-model="form.sex"
              disabled
            />
          </view>
        </uni-list-item>
      </uni-list>
      <button
        v-if="false"
        type="primary"
        class="submit_btn"
        form-type="submit"
      >保存</button>
    </form>
  </view>
</template>
<script>
import { getTrantodangan, savedanganmessage } from '@/api/main'

export default {
  mounted () {
    this.getBaseInfo();
  },
  data () {
    var wxInfo = JSON.parse(uni.getStorageSync("wxInfo"))

    const currentDate = this.getDate({
      format: true
    })
    return {
      form: {
        name: wxInfo.nickname,
        sex: wxInfo.sex ? "男" : "女",
      },
      hospital: [],
      hospitalIndex: 1,
      hospitalTotal: [],
      coulums: [{
        title: "姓名",
        value: "name"
      }, {
        title: "性别",
        value: "sex"
      }],
      date: currentDate
    }
  },
  computed: {
    startDate () {
      return this.getDate('start');
    },
    endDate () {
      return this.getDate('end');
    }
  },
  methods: {
    formSubmit (e) {
      uni.showLoading()
      let form = this.form
      savedanganmessage(form).then(res => {
        uni.hideLoading()
        debugger
      })
    },
    bindPickerChange (e) {
      this.hospitalIndex = e.target.value;
      this.form.hospital = this.hospitalTotal[e.target.value].id
    },
    bindDateChange (e) {
      this.form.lastEmmenia = e.target.value;
    },
    getBaseInfo () {
      let uid = uni.getStorageSync('uid');
      getTrantodangan({
        uid,
        memberFileId: 0,
        ifAdd: 0
      }).then(res => {
        let result = res.data;
        this.form = {
          motherName: result.fileMap.motherName,
          cardCode: result.fileMap.cardCode,
          hospital: result.fileMap.hospital,
          lastEmmenia: result.fileMap.lastEmmenia
        }
        this.hospitalTotal = result.hospital;
        this.hospital = Object.values(result.hospital.map(item => item.name));
        this.hospital.forEach((item, index) => {
          if (item.id == result.fileMap.hospital) {
            this.hospitalIndex = index;
            return false;
          }
        })
      })
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
    }
  },
}
</script>
<style lang="scss">
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
  margin: 60rpx $uni-spacing-row-lg;
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
</style>