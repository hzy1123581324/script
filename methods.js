// import {
// 	http
// } from './http.js';
import sysAPI from './sysAPI.js';
import FormValidation from './FormValidation.js';
import Regular from './regular.js';
const regular = new Regular();
import Http from './http.js';
// console.log(sysAPI, '444444444444444444444444444444444444444');
const methods = {

	__init__() {},


	// http: http,
	//转变语言
	changeLang(lang = 'zh-CN') {
		// console.log(this.$store, '*********store***************');
		this.$store.commit('changeLang', lang);
	},


	/*
	提示弹框
	*/
	// toast(title, callback = () => {}) {
	// 	uni.showToast({
	// 		title,
	// 		icon: 'none',
	// 		success: callback
	// 	})
	// },

	/**
	 * 数字转中文
	 * 
	 */
	Rp: function(n) {
		var cnum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
		var s = '';
		n = '' + n; // 数字转为字符串

		for (var i = 0; i < n.length; i++) {
			s += cnum[parseInt(n.charAt(i))];
		}

		return s;
	},

	modal(e) { //modal专用
		let {
			callback
		} = e.currentTarget.dataset;
		return new Promise((resolve, reject) => {
			this.setData({
				modal: !this.data.modal,
			})
			this.callback(callback, e)
			resolve()
		})
	},
	confirm(obj) { //带按钮的提示框
		let {
			sign,
		} = obj;
		if (!sign) {
			({
				sign,
			} = e.currentTarget.dataset); //从uniml带过来
		}
		const self = this;
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: '提示',
				content: sign,
				success: function(res) {
					if (res.confirm) {
						// console.log('用户点击确定');
						resolve();
					} else if (res.cancel) {
						// console.log('用户点击取消');
						reject();
					}
				}
			})
		})
	},

	/*
	————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	*****************************************************************************数据处理*************************************************************
	————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	*/



	/*
	
	*/
	del_one(e) { //删除数组某一项
		let {
			index,
			items,
			sign, //sign删除的提示语
			callback = ''
		} = e.currentTarget.dataset; //index 下标//
		//console.log(index,items,sign);
		let item = this.data[items]; //获取操作数组或对象数组
		let slef = this;
		return this.confirm({
				sign
			}) //sign删除的提示语
			.then((res) => {
				item.splice(index, 1);
				this.setData({
					[items]: item,
				})
				this.callback(callback, e);
			})
			.catch((err) => {
				console.log(err)
			})

	},
	//********选择某一项或多项*************
	switch_btn(e) { //true，false两种状态转换
		let {
			key,
			callback
		} = e.currentTarget.dataset;
		return new Promise((resolve, reject) => {
			this.setData({
				[key]: !this.data[key],
			})
			this.callback(callback, e)
			resolve()
		})
	},
	sel_one(e) { //单选，必须有一个选中
		let {
			key,
			value,
			callback
		} = e.currentTarget.dataset;
		return new Promise((resolve, reject) => {
			this.setData({
				[key]: value,
			})
			this.callback(callback, e);
			resolve()
		})
	},
	sel_one_reverse(e) { //多个项单选,可以都不选
		let {
			key,
			value,
			def, //默认值
			callback
		} = e.currentTarget.dataset;
		if (this.data[key] == value && this.data[key]) {
			value = def || -1; //0==false为true
		}
		return new Promise((resolve, reject) => {
			this.setData({
				[key]: value,
			})
			this.callback(callback, e);
			resolve()
		})
	},
	sel_all(e) { //全部选择
		let {
			key,
			items, //要操作的数组字段
			term = true,
			callback
		} = e.currentTarget.dataset;
		let item = this.data[items];
		let len = item.length;
		let sel_num_str = items + '_sel_num';
		let sel_items_str = items + '_sel_items';
		for (let i = 0; i < len; i++) {
			item[i][key] = true;
		}
		return new Promise((resolve, reject) => {
			this.data[sel_num_str] = len; //返回选择的长度
			this.data[sel_items_str] = item, //返回选中的数组
				this.setData({
					[items]: item, //返回操作后的数组
				})
			this.callback(callback, e)
			resolve()
		})
	},
	sel_not_all(e) { //全部取消 返回选择的数量，选择的项的数组
		let {
			key,
			items,
			term = true,
			callback
		} = e.currentTarget.dataset;
		let item = this.data[items];
		let len = item.length;
		let sel_num_str = items + '_sel_num';
		let sel_items_str = items + '_sel_items';
		for (let i = 0; i < len; i++) {
			item[i][key] = false;
		}
		return new Promise((resolve, reject) => {
			this.data[sel_num_str] = 0;
			this.data[sel_items_str] = [];
			this.setData({
				[items]: item,
			})
			this.callback(callback, e)
			resolve()
		})
	},
	sel_reverse() { //反向选择 返回选择的数量，选择的项的数组
		let {
			key,
			items,
			term = true,
			callback
		} = e.currentTarget.dataset;
		// if(!term)return;//如果不符合条件；返回
		let item = this.data[items];
		let len = item.length;
		let sel_num_str = items + '_sel_num';
		let sel_items_str = items + '_sel_items';
		let sel_num = 0;
		let sel_items = [];
		for (let i = 0; i < len; i++) {
			item[i][key] = !item[i][key];
			if (item[i][key]) {
				sel_num++;
				sel_items.push(item[index])
			}
		}
		return new Promise((resolve, reject) => {
			if (term) {
				this.data[sel_num_str] = sel_num;
				this.data[sel_items_str] = sel_items;
				this.setData({
					[items]: item,
				})
			}
			this.callback(callback, e, index)
			resolve(index)
		})
	},
	sel_more(e) { //多选，返回选择的数量，选择的项的数组
		let {
			key,
			index,
			items,
			term = true,
			callback
		} = e.currentTarget.dataset;
		let item = this.data[items];
		let len = item.length;
		let sel_num_str = items + '_sel_num';
		let sel_items_str = items + '_sel_items';
		let sel_num = 0;
		let sel_items = [];
		if (term) { //条件成立才进行数据处理
			item[index][key] = !item[index][key];
		}
		for (let i = 0; i < len; i++) {
			if (item[i][key]) {
				sel_num++;
				sel_items.push(item[i])
			}
		}
		return new Promise((resolve, reject) => {
			if (term) {
				this.data[sel_num_str] = sel_num;
				this.data[sel_items_str] = sel_items;
				this.setData({
					[items]: item,
				})
			}
			this.callback(callback, e, index)
			resolve(index)
		})
	},
	sel_more_type(e) { //多选 选择多个类型
		// let { key, index, items, callback } = e.currentTarget.dataset;
		// return new Promise((resolve, reject) => {
		//   this.setData({
		//     [items]: !this.data[items][index][key],
		//   })
		//   this.callback(callback, e)
		//   resolve()
		// })
	},
	write(e) {
		let {
			value
		} = e.detail;
		let {
			key,
			callback,
			regular,
			term = true,
			layer = false,
			msg = '输入格式有误',
		} = e.currentTarget.dataset;
		let rep = new RegExp(regular, 'gi');
		if ((regular && !rep.test(value)) || (!term)) { //格式不对regular为正则表达式
			this.toast(msg);
			value = ''
		}
		this.setData({
			[key]: value
		})
		this.callback(callback, e);
	},

	get_addr(e) { //获取系统收货地址
		let this_ = this;
		let {
			key = 'addr', callback
		} = e.currentTarget.dataset;
		uni.getSetting({
			success(res) {
				//console.log(res);
				if (!res.authSetting['scope.address']) {
					uni.authorize({
						scope: 'scope.address',
						success() {
							//console.log('sdfsdfsfdsdfsdfsdfs')
							uni.chooseAddress({
								success: function(res) {
									this_.setData({
										[key]: res
									})
								},
								fail(err) {
									//console.log(JSON.stringify(err));
								}
							})
						},
						fail(err) {
							// console.log(err,'eeeeeeeeeeeeeeeeeeeee');
						}
					})
				} else {
					uni.chooseAddress({
						success: function(res) {
							this_.setData({
								[key]: res
							})
						},
						fail(err) {
							//console.log(JSON.stringify(err));
						}
					})
				}
			},
			fail(err) {
				//console.log(err);
			}
		})
		this.callback(callback, e)
	},

	form_push: function(e) { //模板消息专用
		let {
			formId: formid
		} = e.detail;
		//console.log('formId', formid)
		if (!formid) {
			return;
		}
		http({
			sign: "piao_save_fromid",
			npara: {
				formid,
				user_id: getApp().globalData.logined.id
			}
		}).then((res) => {}).catch((err) => {})
	},
	null_fun() {
		//空函数
		return
	},
	//********操作数据*********操作数据*************操作数据****************
	rep_str(str, n, m) { //n=3，m=4，130****1234123
		//替换中间字符
		return str.replace(/^(\d{3})\d*(\d{4})$/, "$1****$2");
	},
	loginOut() {
		uni.clearStorageSync();
		uni.setStorageSync('first', true);
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}, 1500)

	},
	quickSort(arr) { //快速排序
		//如果数组的个数小于等于1，就返回该数组
		if (arr.length <= 1) {
			return arr;
		} else {
			//否则，取得该数组的中间位置，保存在变量c中
			let c = Math.floor(arr.length / 2);
			//将变量c位置的值取出来存入变量center中
			let center = arr.splice(c, 1)[0];
			//声明两个空数组left、right
			let left = [];
			let right = [];
			//然后遍历arr数组将每个数与center做比较，大的放在right中，小的放在left中
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] <= center) {
					left.push(arr[i]);
				} else {
					right.push(arr[i]);
				}
			}
			//最后返回左边和右边的数组，并对其做相同操作，直到递归完成
			// return quickSort(left).concat(center).concat(quickSort(right));
			return [...quickSort(left), ...quickSort(center), ...quickSort(right)]
		}
	},

	/*
	 *热更新
	 */
	contrast: function(res) {
		if (res == '') {
			return false;
		}
		let _this = this;
		let ismust = false;
		let hasnew = false;
		let version = '';
		if (res.data.isUpdateApp == 1) {
			plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
				version = wgtinfo.version;
				uni.setStorageSync('app_versions', version);
				if (plus.os.name === 'iOS') {
					if (res.data.ios.version !== version && res.data.ios.must_update == 1) {
						ismust = true;
						hasnew = true;
					} else if (res.data.ios.version !== version && res.data.ios.must_update == 0) {
						hasnew = true;
						_this.ismust_one = false;
					}
				} else {
					if (res.data.android.version !== version && res.data.android.must_update == 1) {
						ismust = true;
						hasnew = true;
					} else if (res.data.android.version !== version && res.data.android.must_update == 0) {
						hasnew = true;
						_this.ismust_one = false;
					}
				}
				let openUrl = res.data.download_url;
				let openUrlA = res.data.android.download_url;
				let openUrlI = res.data.ios.download_url;
				let info = {
					appWgtSize: res.data.appWgtSize,
					openUrl: res.data.download_url,
					openUrlI: res.data.android.download_url,
					openUrlI: res.data.ios.download_url,
					updatStatus: 1,
					ismust: ismust
				};
				if (hasnew) {
					console.log(hasnew, '##################################')
					uni.setStorageSync('appUpdateInfo', info);
				} else {
					info.updatStatus = 0;
					uni.setStorageSync('appUpdateInfo', info);
				}
			});



		} else {
			let info = {
				updatStatus: 0
			};
			uni.setStorageSync('appUpdateInfo', info);
		}
	},

	async getAppVersionsInfo() {
		//#ifdef APP-PLUS
		const result = await this.$net.ajax('/app_versions', {}, 'post');
		console.log(result, '5555555555555555555555555555555')
		if (result.code == 200) {
			this.contrast(result);
		}
		//#endif
	}
}
Object.assign(methods, sysAPI, FormValidation);
// console.log(methods,'******************++++++++++++++++++++++');
export default methods;
