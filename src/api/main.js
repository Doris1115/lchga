import request from '@/utils/request.js'
// let baseUrl = "/fybj365-abortion-love/tyfwSystem"
let baseUrl = "/fybj365-abortion-love/"
// let baseUrl = uni.getStorageSync('urlHos') ? uni.getStorageSync('urlHos') : "/fybj365-abortion-love/tyfwSystem";
//获取就诊医院列表
export const queryAreaList = (data) => {
  return request.globalRequest(baseUrl + '/mobile/common/queryAreaList', data)
}
//添加微信用户信息
export const saveWXUser = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/wechatUser/addWechatUser', data)
}
//查找微信用户信息
export const findByOpenid = (baseUrl, data) => {
  return request.globalRequest(baseUrl + '/mobile/wechatUser/findByOpenid', data)
}
//编辑微信用户信息
export const editWechatUserByOpenid = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/wechatUser/editWechatUserByOpenid', data)
}
// 档案信息 添加档案
export const addArchives = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/archives/addArchives', data)
}
//通过id删除
export const deleteArchives = (baseUrl, data) => {
  return request.globalRequest(baseUrl + '/mobile/archives/deleteArchives', data)
}
//编辑档案
export const editArchives = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/archives/editArchives', data)
}
//档案列表
export const queryArchivesList = (baseUrl, data) => {
  return request.globalRequest(baseUrl + '/mobile/archives/queryArchivesList', data)
}
//随访列表
export const queryFollowList = (baseUrl, data) => {
  return request.globalRequest(baseUrl + '/mobile/archives/queryFollowList', data)
}
//所有随访列表
export const queryAllFollowList = (baseUrl, data) => {
  return request.globalRequest(baseUrl + '/mobile/archives/queryAllFollowList', data)
}
//首次咨询  添加首次咨询
export const addFirstConsultation = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/firstConsultation/addFirstConsultation', data)
}
//编辑首次咨询
export const editFirstConsultation = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/firstConsultation/editFirstConsultation', data)
}
//通过id删除
export const deleteFirstConsultation = (baseUrl, data) => {
  return request.globalRequest(baseUrl + '/mobile/firstConsultation/deleteFirstConsultation', data)
}
//首次随访新增
export const addFirstFollow = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/firstFollow/addFirstFollow', data)
}
//通过id删除
export const deleteFirstFollow = (baseUrl, data) => {
  return request.globalRequest(baseUrl + '/mobile/firstFollow/deleteFirstFollow', data)
}
//编辑首次随访
export const editFirstFollow = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/firstFollow/editFirstFollow', data)
}
//后续随访新增
export const addBehindFollow = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/behindFollow/addBehindFollow', data)
}
//通过id删除
export const deleteBehindFollow = (baseUrl, data) => {
  return request.globalRequest(baseUrl + '/mobile/behindFollow/deleteBehindFollow', data)
}
//编辑首次随访
export const editBehindFollow = (baseUrl, data) => {
  return request.globalPostRequest(baseUrl + '/mobile/behindFollow/editBehindFollow', data)
}
//地址地区联动
export const getArea = (data) => {
  return request.globalRequest('http://39.107.74.117:9999/baseserver/cache/dicRegion/queryChildrenTreeByCode', data)
}