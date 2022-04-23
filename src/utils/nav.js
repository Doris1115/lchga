import {
  getShijiegeguohediqumingcheng,//国籍
  card,//证件类型
  chengxiangfenlei,//户籍分类
  wenhuachengdu,//文化程度
  minzu,//民族
  hukouguishu,//户籍归属
  renqunfenleizhiye,//职业
  past_history,//既往史
  present_history//现病史
} from '@/api/dic'

export function getQueryString (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
//国籍
export function Set_Nationality () {
  return getShijiegeguohediqumingcheng().then(resolve => {
    uni.setStorageSync('nationality', encodeURIComponent(JSON.stringify(resolve.result)));
    return resolve.result;
  });
}
//证件类型
export function Set_CertType () {
  return card().then(resolve => {
    uni.setStorageSync('certType', encodeURIComponent(JSON.stringify(resolve.result)));
    return resolve.result;
  });
}
//民族
export function Set_Ethnic () {
  return minzu().then(resolve => {
    uni.setStorageSync('ethnic', encodeURIComponent(JSON.stringify(resolve.result)));
    return resolve.result;

  });
}
//户籍分类
export function Set_DomicileType () {
  return chengxiangfenlei().then(resolve => {
    uni.setStorageSync('domicileType', encodeURIComponent(JSON.stringify(resolve.result)));
    return resolve.result;

  });
}
//户籍归属
export function Set_HomeRegist () {
  return hukouguishu().then(resolve => {
    uni.setStorageSync('homeRegist', encodeURIComponent(JSON.stringify(resolve.result)));
  });
}
//文化程度
export function Set_Education () {
  return wenhuachengdu().then(resolve => {
    uni.setStorageSync('education', encodeURIComponent(JSON.stringify(resolve.result)));
    return resolve.result;

  });
}
//职业
export function Set_Occupation () {
  return renqunfenleizhiye().then(resolve => {
    uni.setStorageSync('occupation', encodeURIComponent(JSON.stringify(resolve.result)));
    return resolve.result;

  });
}
//现病史
export function Set_PresentHistory () {
  return present_history().then(resolve => {
    uni.setStorageSync('presentHistory', encodeURIComponent(JSON.stringify(resolve.result)));
    return resolve.result;

  });
}
//既往史
export function Set_PastHistory () {
  return past_history().then(resolve => {
    uni.setStorageSync('pastHistory', encodeURIComponent(JSON.stringify(resolve.result)));
    return resolve.result;

  });
}