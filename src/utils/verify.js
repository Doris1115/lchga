export const validateMobile = (rule, value, data, callback) => {
  if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
    callback("请输入正确的手机号格式");
  }
  return true;
};
export const validateIdNo = (rule, value, data, callback) => {
  let id18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  let id15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
  if (!id18.test(value) && !id15.test(value)) {
    callback("请输入正确的身份证号格式");
  }
  return true;
};

export const number = (rule, value, callback) => {
  if (!/^[0-9]*$/.test(value) && value) {
    callback(new Error("请输入数字！"));
  } else {
    callback();
  }
}

export const ChineseWord = (rule, value, callback) => {
  if (!/^[\u4E00-\u9FA5\uF900-\uFA2D\u0020]*$/.test(value) && value != '') {
    callback(new Error("请输入中文！"));
  } else {
    callback();
  }
}
export const getUrl = () => {
  if (!uni.getStorageSync('urlHos')) {
    uni.navigateTo({
      url: '/pages/info/hospital'
    })
  }
}

export const transfer = (v) => {
  return JSON.parse(decodeURIComponent(v));
}

