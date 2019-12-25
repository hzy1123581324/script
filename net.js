import urlConfig from './config.js'

const net = {}
const headers = {}
    
net.ajax = (url, data, method, power) => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
== 不通过access_token校验的接口
== 文件下载接口列表
== 验证码登录 */
    data.from = 'app';    
    data.sign = 'P$Cw5ernRvUil*k2De32rgoCo5ZV$u';    
    data.token = uni.getStorageSync('token') || '';    
    var lang = uni.getStorageSync('locale_key') || '0';
	// console.log(lang);
	var edition=['zh-cn','en-us','korea','janpan'];
	 lang = edition[parseInt(lang)];
    switch (power){
        case 1:
            headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
            break;
        case 2:
            headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
            break;
        case 3:
            responseType = 'blob'
            break;
        default:
            headers['content-type'] = 'application/x-www-form-urlencoded'
            break;
    }
	if(data.loading){
		uni.showLoading({mask:true});
	}
    return uni.request({
        url: urlConfig + url + "?lang="+lang,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
		if(data.loading){
			uni.hideLoading();
		}
		// console.log(res[1].data);
        if (res[1].data.code == 200) {
            return res[1].data;
        } else if(res[1].data.code == 300) {
			uni.reLaunch({
				url:'../login/login'
			})
        } else if(res[1].data.code == 999999) {
			uni.reLaunch({
				url:'../index/index'
			})
        } else {
			throw res[1].data.message;
        }
    }).catch(res => {
		if(res){
	　　　　uni.showToast({
	　　　　　　title: res,
	　　　　　　icon: 'none'
	　　　　});
		}
		return false;
	// 　　　　return Promise.reject('break without exception.');
　　})
 } 

export default net