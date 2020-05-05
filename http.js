import urlConfig from './config.js';
import store from '@/store/store.js';
const headers = {};

const http = (url, data, method="POST", power) => {
	/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
		== 不通过access_token校验的接口
		== 文件下载接口列表
		== 验证码登录 */
	//    data.from = 'app';    
	//    data.sign = 'P$Cw5ernRvUil*k2De32rgoCo5ZV$u';    
	const token = uni.getStorageSync('token') || '';
	//    var lang = uni.getStorageSync('locale_key') || '0';
	// // console.log(lang);
	// var edition=['zh-cn','en-us','korea','janpan'];
	// lang = edition[parseInt(lang)];
	//#ifdef APP-VUE
	headers['app-version'] = plus.runtime.version;
	//#endif
	headers['content-type'] = 'application/json';
	headers['request-time'] = new Date().getTime();
	headers['x-auth-token'] = token;
	headers['lang'] = store.getters.getLangLocale;
	
	// headers["Access-Control-Request-Headers"] = method;
	// headers["Access-Control-Allow-Origin"] = method;
	                        
	// switch (power) {
	// 	case 1:
	// 		headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
	// 		break;
	// 	case 2:
	// 		headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
	// 		break;
	// 	case 3:
	// 		responseType = 'blob'
	// 		break;
	// 	default:
	// 		headers['content-type'] = 'application/x-www-form-urlencoded'
	// 		break;
	// }
	if (data.loading) {
		uni.showLoading({
			mask: true
		});
	}
	console.log(urlConfig + url,data,headers,'这是参数————————————————————————————————————————————————————')
	return uni.request({
		url: urlConfig + url,
		method,
		data: data,
		dataType: 'json',
		header: headers
	}).then(res => {
		console.log(res,'这是返回的数据');
		if (data.loading) {
			uni.hideLoading();
		}
		// console.log(res[1].data);
		if (res[1].data.code == 200) {
			return res[1].data;
		} else if (res[1].data.code == 507) {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		} else if (res[1].data.code == 999999) {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		} else {
			throw res[1].data.msg;
		}
	}).catch(res => {
		console.log(res,'err*********************************err')
		if (res) {
			uni.showToast({
				title: res,
				icon: 'none'
			});
		}
		return false;
	})
}

export default {
	http
}
