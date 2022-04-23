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
//目前避孕方法
export const byMethod = () => {
  return request.globalRequest(baseUrl + 'abortion_love_contraception_method')
}
//近期孕育计划
export const byPlan = () => {
  return request.globalRequest(baseUrl + 'abortion_love_inoculation_plan')
}
//拟流产方式 
export const lcMethod = () => {
  return request.globalRequest(baseUrl + 'abortion_love_abortion_method')
}
//拟避孕时间
export const byTime = () => {
  return request.globalRequest(baseUrl + 'abortion_love_intend_abortion_time')
}
//本次妊娠原因
export const rsyy = () => {
  return request.globalRequest(baseUrl + 'abortion_love_pregnancy_reason')
}
//是否继续使用
export const yesno = () => {
  return request.globalRequest(baseUrl + 'yesno')
}
//月经量与平时比
export const abortion_love_menstrual = () => {
  return request.globalRequest(baseUrl + 'abortion_love_menstrual')
}
//随访方式
export const follow_manner = () => {
  return request.globalRequest(baseUrl + 'abortion_love_follow_manner')
}