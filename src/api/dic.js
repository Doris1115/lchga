import request from '@/utils/request.js'
const baseUrl = "http://39.107.74.117:9999/baseserver/sys/dict/getDictItems/"
//国籍
export const getShijiegeguohediqumingcheng = () => {
  return request.globalRequest(baseUrl + 'shijiegeguohediqumingcheng')
}
//证件类型
export const card = () => {
  return request.globalRequest(baseUrl + 'card')
}
//户籍分类
export const chengxiangfenlei = () => {
  return request.globalRequest(baseUrl + 'chengxiangfenlei')
}
//文化程度
export const wenhuachengdu = () => {
  return request.globalRequest(baseUrl + 'wenhuachengdu')
}
//民族
export const minzu = () => {
  return request.globalRequest(baseUrl + 'minzu')
}
//户籍归属
export const hukouguishu = () => {
  return request.globalRequest(baseUrl + 'hukouguishu')
}
//职业
export const renqunfenleizhiye = () => {
  return request.globalRequest(baseUrl + 'renqunfenleizhiye')
}
//既往史
export const past_history = () => {
  return request.globalRequest(baseUrl + 'past_history')
}
//现病史
export const present_history = () => {
  return request.globalRequest(baseUrl + 'present_history')
}