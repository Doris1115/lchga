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

/**
 * 判断身份证号码
 */
export function cardid (code) {
  let list = [];
  let result = true;
  let msg = '';
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  if (!validatenull(code)) {
    if (code.length == 18) {
      if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
        msg = "证件号码格式错误";
      } else if (!city[code.substr(0, 2)]) {
        msg = "地址编码错误";
      } else {
        //18位身份证需要验证最后一位校验位
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        if (parity[sum % 11] != code[17]) {
          msg = "证件号码校验位错误";
        } else {
          result = false;
        }

      }
    } else {
      msg = "证件号码长度不为18位";
    }

  } else {
    msg = "证件号码不能为空";
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断是否为空
 */
export function validatenull (val) {
  if (typeof val == 'boolean') {
    return false;
  }
  if (typeof val == 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}
