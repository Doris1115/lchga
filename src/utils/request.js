import {
	baseUrl
} from './env.js'

/**
 * url: 接口地址(相对地址)
 * method: 请求方式,
 * data: 请求参数
 */
let request = {}
request.globalRequest = (url, data = {}, method = 'get') => {
	let baseurl = baseUrl;
	let token = uni.getStorageSync('token');
	let headers = {}

	if (token) {
		headers['Authorization'] = token
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: url.indexOf('http') > -1 ? url : baseurl + url,
			method,
			data: data,
			dataType: 'json',
			header: headers,
			success: (res) => {
				if (res.data.code != 500) {
					resolve(res.data)
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data.message,
						duration: 1000
					});
					reject(res.data)
				}
			},
			fail: (err) => {
				uni.showToast({
					icon: 'none',
					title: '请求失败',
					duration: 1000
				});
				reject(err)
			}
		})
	})
}
request.globalPostRequest = (url, data = {}) => {
	let token = uni.getStorageSync('token');
	let headers = {}

	if (token) {
		headers['Authorization'] = token
	}
	headers['content-type'] = 'application/x-www-form-urlencoded'
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: 'POST',
			data: data,
			dataType: 'json',
			header: headers,
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					icon: 'none',
					title: '请求失败',
					duration: 1000
				});
				reject(err)
			}
		})
	})
}

export default request
