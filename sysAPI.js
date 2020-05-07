import url_config from './config.js';

const sysAPI = {

	/***************************uni-app自带****************************/


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

	copy(data, msg) { //复制到粘贴板

		//console.log(value);
		uni.setClipboardData({
			data: data.toString(),
			success: (res) => {
				if (msg != 'none') {

					this.toast(msg || this.i18n.copySuccess, //复制成功
					)
				} else {
					uni.hideToast();
				}
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
	/*
	拨打电话
	*/
	call(phoneNumber) { //
		uni.makePhoneCall({
			phoneNumber: phoneNumber.toString(), //仅为示例，并非真实的电话号码
		})
	},

	set_title(title) { //动态设置当前页面标题
		uni.setNavigationBarTitle({
			title
		})
	},
	get_network() {},
	selimg(param = {}) {
		const [self] = [this];
		return new Promise((resolve, reject) => {
			param = Object.assign({
				count: 1, // 默认1
				sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album', ], // 可以指定来源是相册还是相机，默认二者都有
				success: res => {
					console.log(res.tempFiles)
					resolve(res.tempFiles);
				},
				fail: err => {
					reject(err);
				}
			}, param);
			uni.chooseImage(param)
		})
	},
	uploadFile(param = {}) {
		const [self] = [this];
		return new Promise((resolve, reject) => {

			param = Object.assign(

				{
					url: `${url_config}/member/up/upload`, //仅为示例，非真实的接口地址
					header: {
						'x-auth-token': uni.getStorageSync('token'),
						'app-version': 100
					},
					filePath: param.filePath, //文件临时路径
					name: 'file',
					form_data: {
						'name': 'file'
					},

					success: (res) => {
						// console.log('-----======上传后的结果data----==-=-=-=--', res.data);
						let obj = JSON.parse(res.data);
						console.log('-----======上传后的结果----==-=-=-=--', obj.npara);
						resolve(obj.npara)
						this[param.keyName] = obj.npara;
						//do something
					},
					fail: (err) => {
						reject(err);
					}
				}, param);
			uni.uploadFile(param);
		});

	},
	uploadImg(param = {}) { //选择并上传图片
		const [self] = [this];
		const count = 1;
		if (param.keyNames && param.keyNames.length && typeof(param) == "object") {
			count = param.keyNames.length;
		}
		return this.selimg({
				count
			}).then((data) => {
				param = Object.assign({
					form_data: {
						'name': 'file'
					}
				}, param);
				console.log(data[0], '*****图片返回支付****');
				let promises = [];
				for (let i = 0; i < data.length; i++) {
					const keyName = param.keynames && param.keynames[i] || param.keyName;
					this[keyName] = data[i].path;
					promises.push(
						this.uploadFile({
							filePath_index: i,
							filePath: data[i].path,
							name: 'file',
							formData: param.form_data,
							keyName
						})
					)
				}
				// }
				return Promise.all(promises)
			})
			.catch((err) => {
				console.log(err, '（（（（（（（（（（（（（（')
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

	saveimg(src) {
		const self = this;

		uni.getSetting({
			success(res) {
				if (!res.authSetting['scope.writePhotosAlbum']) {
					uni.authorize({
						scope: 'scope.writePhotosAlbum',
						success() {
							self.save_img(src);
						}
					})
				} else {
					self.save_img(src);
				}
			},
			fail(err) {
				uni.openSetting({
					success(settingdata) {
						console.log(settingdata)
						if (settingdata.authSetting['scope.writePhotosAlbum']) {
							self.save_img(src);
						} else {
							uni.showToast({
								title: '请授权后再操作',
								coin: 'none'
							})
						}
					}
				})
			}
		})
	},
	save_img(src) {
		const self = this;
		// let {
		// 	range_one,
		// 	range_index,
		// 	current
		// } = this.data;
		uni.showLoading({
			title: '保存中',
		})
		uni.getImageInfo({
			src,
			success(res) {
				console.log(res)
				// console.log(res.height)
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: function(data) {
						uni.hideLoading();
						uni.showToast({
							title: '保存成功',
							icon: 'success',
							duration: 2000
						})
					},
					fail: function(err) {
						console.log(err);
						uni.hideLoading();
						if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
							console.log("当初用户拒绝，再次发起授权")
							uni.openSetting({
								success(settingdata) {
									console.log(settingdata)
									if (settingdata.authSetting['scope.writePhotosAlbum']) {
										console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
									} else {
										console.log('获取权限失败，给出不给权限就无法正常使用的提示')
									}
								}
							})
						}
					},
					complete(res) {
						console.log(res);
					}
				})
			}
		})

	},

}

export default sysAPI
