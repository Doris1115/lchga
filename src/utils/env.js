// 配置编译环境和线上环境之间的切换
const env = process.env

let baseUrl = ''
if (env.NODE_ENV == 'development') {
  baseUrl = 'http://wx.fybj365.com'
} else if (env.NODE_ENV == 'production') {
  baseUrl = 'http://wx.fybj365.com'
} else if (env.NODE_ENV == 'test') {
  baseUrl = ''
}
export {
  baseUrl
}
