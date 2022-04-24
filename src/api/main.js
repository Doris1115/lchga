import request from '@/utils/request.js'
// let baseUrl = "/fybj365-abortion-love/tyfwSystem"
let baseUrl = "/fybj365-abortion-love/"
// let baseUrl = uni.getStorageSync('urlHos') ? uni.getStorageSync('urlHos') : "/fybj365-abortion-love/tyfwSystem";
//获取就诊医院列表
export const queryAreaList = (data) => {
  return request.globalRequest(baseUrl + '/mobile/common/queryAreaList', data)
}
//添加微信用户信息
export const saveWXUser = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/wechatUser/addWechatUser', data)
}
//查找微信用户信息
export const findByOpenid = (data) => {
  return request.globalRequest(baseUrl + '/mobile/wechatUser/findByOpenid', data)
}
//编辑微信用户信息
export const editWechatUserByOpenid = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/wechatUser/editWechatUserByOpenid', data)
}
// 档案信息 添加档案
export const addArchives = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/archives/addArchives', data)
}
//通过id删除
export const deleteArchives = (data) => {
  return request.globalRequest(baseUrl + '/mobile/archives/deleteArchives', data)
}
//编辑档案
export const editArchives = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/archives/editArchives', data)
}
//档案列表
export const queryArchivesList = (data) => {
  return request.globalRequest(baseUrl + '/mobile/archives/queryArchivesList', data)
}
//随访列表
export const queryFollowList = (data) => {
  return request.globalRequest(baseUrl + '/mobile/archives/queryFollowList', data)
}
//所有随访列表
export const queryAllFollowList = (data) => {
  return request.globalRequest(baseUrl + '/mobile/archives/queryAllFollowList', data)
}
//首次咨询  添加首次咨询
export const addFirstConsultation = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/firstConsultation/addFirstConsultation', data)
}
//编辑首次咨询
export const editFirstConsultation = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/firstConsultation/editFirstConsultation', data)
}
//通过id删除
export const deleteFirstConsultation = (data) => {
  return request.globalRequest(baseUrl + '/mobile/firstConsultation/deleteFirstConsultation', data)
}
//首次随访新增
export const addFirstFollow = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/firstFollow/addFirstFollow', data)
}
//通过id删除
export const deleteFirstFollow = (data) => {
  return request.globalRequest(baseUrl + '/mobile/firstFollow/deleteFirstFollow', data)
}
//编辑首次随访
export const editFirstFollow = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/behindFollow/editFirstFollow', data)
}
//后续随访新增
export const addBehindFollow = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/behindFollow/addBehindFollow', data)
}
//通过id删除
export const deleteBehindFollow = (data) => {
  return request.globalRequest(baseUrl + '/mobile/behindFollow/deleteBehindFollow', data)
}
//编辑首次随访
export const editBehindFollow = (data) => {
  return request.globalPostRequest(baseUrl + '/mobile/behindFollow/editBehindFollow', data)
}
