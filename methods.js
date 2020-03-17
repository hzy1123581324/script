const methods = {
	
	__init__() {
	},
	//转变语言
	changeLang(lang = 'zh-CN') {
		console.log(this.$store, '*********store***************');
		this.$store.commit('changeLang', lang);
	},
	// /*
	
	// */
	// geti18ndata(route){
	// 	console.log(this.$store.getters.getLangLocale, '**************************locale');
	// 	console.log(this,'****************************');
	// 	const locale = this.$store.getters.getLangLocale;
	// 	const common_lang = language[locale].common;
	// 	// let now_lang = 
	// 	let temporary = language[locale]||{};
	// 	let route = route|| this.Route ;
	// 	//获取路由地址
	// 	const route_list = route.split('/');
	// 	console.log(route_list,'******************************')
	// 	for (let i = 1; i < route_list.length; i++) {
	// 		console.log(route_list[i]);
	// 		temporary = temporary[route_list[i]]||{};
	// 	}
	// 	console.log(temporary,common_lang,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
	// 	return Object.assign(common_lang );
	// },
	
	/*
	提示弹框
	*/
	toast(title, callback = () => {}) {
		uni.showToast({
			title,
			icon: 'none',
			success: callback
		})
	},

	
	/*
	拨打电话
	*/
	call(phoneNumber) { //
		uni.makePhoneCall({
			phoneNumber:phoneNumber.toString(), //仅为示例，并非真实的电话号码
		})
	},


	jump({
			url,
			open = "navigateTo",
			callback
		}) { //跳转

		// console.log(open,'0000000000000000000000000000000')
		// open可取navigateTo，redirectTo,reLaunch,switchTab
		uni[open]({
			url,
		})
		this.callback(callback, e)
	},
	/*
	页面返回
	*/
	back(delta = 1) { //返回
		uni.navigateBack({
			delta
		})
	},
	/*
	*/
	page_back(key) { //返回上一页，并返回数据
		const self = this;
		const pages = getCurrentPages();
		const currPage = pages[pages.length - 1]; //当前页面
		const prevPage = pages[pages.length - 2]; //上一个页面
		prevPage.setData({
			[key]: self.data[key],
		})
		uni.navigateBack();
	},
	get_backdata({
		key,
		num = 2,
		layer = false
	} = {}) { //拷贝之前页面数据到当前页面
		const self = this;
		const pages = getCurrentPages();
		const prevPage = pages[pages.length - num]; //默认上一个页面  1是当前页面
		if (key) {
			if (!prevPage || !prevPage.data || !prevPage.data[key]) {
				return
			}
			if (layer) { //加载到渲染层
				this.setData({
					[key]: prevPage.data[key]
				})
			} else {
				this.data[key] = prevPage.data[key];
			}
		} else {
			if (layer) {
				this.setData(prevPage.data)
			} else {
				this.data = prevPage.data;
			}
		}
	},
	get_backfun({
		key,
		num = 2,
	} = {}) { //拷贝之前页面方法到当前页面
		const self = this;
		const pages = getCurrentPages();
		const prevPage = pages[pages.length - num]; //默认上一个页面  1是当前页面
		if (key) {
			this[key] = prevPage[key];
		}
	},
	get_auth() { //获取权限

	},
	get_system() {
		uni.getSystemInfo({
			success(ret) {

			}
		})
	},
	saveImage(e) {
		uni.saveImageToPhotosAlbum({
			success(res) {

			}
		})
	},
	previewImage(imgs) { //预览图片

		if (typeof(imgs) == 'string') {
			imgs = [imgs];
		}
		uni.previewImage({
			// current: imgs[0], // 当前显示图片的http链接
			urls: imgs // 需要预览的图片http链接列表
		});
	},
	getuser(e) { //获取个人信息
		// 查看是否授权
		uni.getSetting({
			success: function(res) {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					uni.getUserInfo({
						success: function(res) {
							console.log(res.userInfo)
						}
					})
				} else {
					uni.navigateTo({
						url: '../authorize/authorize',
					})
				}
			},
			fail() {
				uni.navigateTo({
					url: '../authorize/authorize',
				})
			}
		})
	},
	/*
	获取节点信息
	*/
	getquery(element) { 
		let self = this;
		let query = uni.createSelectorQuery();
		query.select(element).boundingClientRect();
		query.selectViewport().scrollOffset();
		query.exec(function(res) {
			self.setData({
				query: res
			})
		})
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
	copy(data) { //复制到粘贴板

		//console.log(value);
		uni.setClipboardData({
			data: data.toString(),
			success: (res) => {
				uni.showToast({
					title: this.i18n.copySuccess, //复制成功
					icon: 'none',
				})
			}
		})

	},
	get_copy(key) { //获取粘贴板的内容
		uni.getClipboardData({
			success: (res) => {
				this[key] = res.data;
			}
		})
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
	set_title(title) { //动态设置当前页面标题
		uni.setNavigationBarTitle({
			title
		})
	},
	get_network() {},
	sel_img({
		count = 1,
		sizeType = ['compressed'],
		sourceType = ['camera', 'album', ]
	} = {}) {
		const [self] = [this];
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count, // 默认1
				sizeType, // 可以指定是原图还是压缩图，默认二者都有
				sourceType, // 可以指定来源是相册还是相机，默认二者都有
				success: function(res) {
					// console.log(res.tempFiles)
					resolve(res.tempFiles);
				},
				fail: function(err) {
					reject(err);
				}
			})
		})
	},
	uploadFile({
		filePath_index,
		data,
		name = 'file',
		form_data = {
			'user': 'test'
		}
	} = {}) {
		const [self] = [this];
		return new Promise((resolve, reject) => {
			// console.log('上传的临时文件++++++++++++++++++++++++',filePath);
			uni.uploadFile({
				url: `https://${config.host}/SimpleFramework/fileUpload.php`, //仅为示例，非真实的接口地址
				filePath: data[filePath_index || 0].path, //文件临时路径
				header: {
					'content-type': 'multipart/form-data'
				},
				name,
				formData: form_data,
				success: function(res) {
					// console.log('-----======上传后的结果data----==-=-=-=--', res.data);
					let obj = JSON.parse(res.data);
					//console.log('-----======上传后的结果----==-=-=-=--', res);
					resolve(obj.npara)
					//do something
				},
				fail: function(err) {
					reject(err);
				}
			})
		})

	},
	upload_img(e = {}) { //选择并上传图片
		let {
			form_data,
			callback
		} = e.currentTarget.dataset;
		return this.sel_img({}).then((data) => {
				let promises = [];
				for (let i = 0; i < data.length; i++) {
					promises.push(
						this.uploadFile({
							filePath_index: i,
							data,
							name: 'img',
							formData: form_data
						})
					)
				}
				// }
				return Promise.all(promises)
			})
			.catch((err) => {
				//console.log(err)
			})
	},
	callback(callback, e) {
		if (callback) {
			e.currentTarget.dataset.callback = '';
			if (this[callback]) {
				return this[callback](e);
			}
			return [callback](e)
		}
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
			return [...quickSort(left),...quickSort(center),...quickSort(right)]
		}
	},

}


export default methods;
