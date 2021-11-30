import request from '@/utils/request.js'
// 查询身份类型
export const getUserType = (data) => {
    return request.globalRequest('/weixin/shuzituoyuGetUserType', data)
}
export const toggleUserType = (data) => {
    return request.globalRequest('/weixin/changeUserRole', data)
}
//根据openid获取微信绑定参数
export const wxuserByOpenId = (data) => {
    // return request.globalRequest('http://39.107.74.117:9999/fybj365-nurserymanage/chi/weixinUser/list', data)
    return request.globalRequest('http://101.69.143.245:9999/fybj365-nurserymanage/chi/weixinUser/list', data)
}
//获取schoolId
export const getSchoolId = (data) => {
    return request.globalRequest('http://101.69.143.245:9999/fybj365-nurserymanage/teacher/chiTeacher/queryByCardId', data)
}
//获取儿童预约信息
export const getChildBookInfo = (data) => {
    // return request.globalRequest('http://39.107.74.117:9999/fybj365-nurserymanage/baby/chiPerson/selectChiReser7DayList', data)
    return request.globalRequest('http://101.69.143.245:9999/fybj365-nurserymanage/baby/chiPerson/selectChiReser7DayList', data)
}