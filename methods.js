const methods = {
	data: () => {
		return {
			userinfo: {},
			host: Global.allURL,
			token: '',
			user: {},
			page: 0,
			noMore: false,
			code: '', //验证码
			code_txt: '获取验证码',
			code_can: true,
			is_all: false, //不是全选
			range_index: 0,
			num: 1,
		}
	},

	mounted() {
		this.token = localStorage.getItem('token');
		// console.log(this.token,')))))))))))))))');
		if (localStorage.getItem('userinfo')) {
			this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
		}
		// console.log(JSON.stringify(Global.page) + 'this is page data');
		$cyz.addEvent('onShow', () => {
			this.onShow && this.onShow();
		})
		$cyz.sendEvent('onShow');
	},
	methods: {
		null_fun: function () {
			return;
		},
		toast(msg = '这是提示') {
			api.toast({
				msg,
				duration: 2000,
				location: 'bottom'
			});
		},
		console(str) {
			return;
			console.log(str);
		},
		alert(msg) {
			return;
			if (typeof (msg) == 'string') {

				alert(msg);
			} else {
				this.alert(JSON.stringify(msg));
			}
		},
		updateUser() {
			this.userinfo = JSON.parse(localStorage.getItem('userinfo'));
		},
		callback(callback, data) {
			if (this[callback]) {
				console.log('111111');
				this[callback](data);
			} else if (!this[callback] && callback) {
				//匿名函数
				console.log('2222222');
				callback(data);
			} else {
				return data;
			}
		},
		http(data = {}) {
			data.url = this.host + data.url;
			this.console(JSON.stringify(data) + '############');
			console.log(JSON.stringify(data)+"********************************************");
			return new Promise((resolve, reject) => {
				let Data = {
					url: '', //仅为示例，并非真实接口地址。
					type: 'GET',
					dataType: 'json',
					data: {},
					header: {
						// 'custom-header': 'hello' //自定义请求头信息
					},
					success: res => {
						console.log('res----' + JSON.stringify(res));
						if (res.errno == 0) {
							resolve(res);
						} else {
							if (res.info) {
								this.toast(res.info);
							}
							reject(res);
						}
					},
					error: err => {
						console.log('err----:' + JSON.stringify(err));
						reject(err);
					},
					complete: res => {
						console.log(JSON.stringify(res))
					}
				};
				Object.assign(Data, data);
				console.log(JSON.stringify(Data));
				$.ajax(Data);
			})

		},
		//页面跳转
		back(name = '') {
			$cyz.sendEvent('onShow');
			if (name) {
				$cyz.closeToWin(name);
			} else {
				$cyz.closeWin();
			}
		},
		jump(path, param) {
			let { token } = this;
			if (token == 'token') {
				return this.toast('请注册');
			}
			$cyz.openWin(path, {
				param: param
			});
		},
		//路由跳转开始
		//跳转到标签页
		switchTab() { },
		//关闭到某个页面
		reLaunch() { },
		//重定向
		redirectTo() {

			this.navigateTo()
		},
		navigateTo() {
			api.openFrame({
				name: 'page2',
				url: './page2.html',
				rect: {
					x: 0,
					y: 0,
					w: 'auto',
					h: 'auto'
				},
				pageParam: {
					name: 'test'
				}
			});

		},
		//路由跳转结束
		setprevData(keyname, renovate, pageIndex = 2) {
			// 设置之前页面的数据
			const pages = this.$mp.page.$getAppWebview();
			// const currPage = pages[pages.length - 1]; //当前页面
			let prevPage = pages[pages.length - pageIndex]; //上一个页面

			console.log(prevPage.$vm, keyname, renovate);
			prevPage.$vm[keyname] = renovate;
		},

		bindChange(event) {
			this.range_index = event.detail.value;
		},


		//******************************表单验证***************************

		testPhone(phone) {
			//验证手机号
			if (!(/^1[3456789]\d{9}$/.test(phone))) {
				return this.toast("手机号码有误，请重填");
			}else{
				return true;
			}
		},
		testID(ID) {
			//验证身份证
			if (!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(ID))) {
				return this.toast("身份证号码有误，请重填");
			}else{
				return true;
			}
		},
		isempty(value,msg='请输入手机号'){
			//判断是否为空
			//true 是这个值是空的
			// false 这个值不是空的
			if (!value) {
				this.toast(msg);
				return true;
			}else{
				return false;
			}
		},
		//******************************表单验证结束***************************

		//*********数据处理************
		sel_arr(index, arrName, keyname = 'sel') { //数组对象
			// index  数组的下标
			//arrName 为数组名称
			if (!arrName) {
				arrName = 'items';
			}
			if (this[arrName][index].keyname) {
				this.$set(this[arrName][index], keyname || 'sel', false);
			} else {
				this.$set(this[arrName][index], keyname || 'sel', true);
			}
		},
		sel_objArr(index, arrName, objName = 'items', keyname = 'sel') { //对象中的数组
			// index  数组的下标
			//arrName 为数组名称
			//objName 为对象名称
			let blo = false;
			if (!this[objName][arrName][index][keyname]) {
				blo = true;
			}
			this.$set(this[objName][arrName][index], keyname, blo);
		},
		//全选/反全选
		sel_arrAll: function (arrName = 'items', keyname = "sel") {
			//arrName 为数组名称

			for (var i = 0; i < this[arrName].length; i++) {
				if (!this.is_all) {
					this.$set(this[arrName][i], keyname, true);
				} else {
					this.$set(this[arrName][i], keyname, false);
				}
			}
		},
		//全选/取消全选
		sel_objArrAll: function (arrName, objName = 'items', keyname = 'sel') {
			// index  数组的下标
			//arrName 为数组名称

			for (var i = 0; i < this[objName][arrName].length; i++) {
				let blo = false;
				if (!this.is_all) {
					blo = true
				}
				this.$set(this[objName][arrName][i], keyname, blo);
			}
		},
		//反向选择
		sel_arrAll_reverse: function (arrName = 'items', keyname = 'sel') {
			//arrName 为数组名称
			for (var i = 0; i < this[arrName].length; i++) {
				if (!this[arrName][i][keyname]) {
					this.$set(this[arrName][i], keyname, true);
				} else {
					this.$set(this[arrName][i], keyname, false);
				}
			}
		},
		sel_objArrAll_reverse: function (arrName, objName = 'items', keyname = 'sel') {
			//arrName 为数组名称
			for (var i = 0; i < this[objName][arrName].length; i++) {
				if (!this[objName][arrName][i][keyname]) {
					this.$set(this[objName][arrName][i], keyname, true);
				} else {
					this.$set(this[objName][arrName][i], keyname, false);
				}
			}
		},
		addNums: function (index, arrName, keyname) { //数组对象
			// index  数组的下标
			//arrName 为数组名称
			if (!arrName) {
				arrName = 'items';
			}
			if (this[arrName][index].sel) {
				this.$set(this[arrName][index], keyname || 'num', this[arrName][index] + 1);
			}
		},
		delNums: function (index, arrName, keyname) { //数组对象
			// index  数组的下标
			//arrName 为数组名称
			if (!arrName) {
				arrName = 'items';
			}
			if (this[arrName][index].sel) {
				this.$set(this[arrName][index], keyname || 'num', this[arrName][index] - 1);
			}
		},
		//	----------------系统api------------------
		getlocation(callback) {
			// 获取当前定位
			var resultList = api.hasPermission({
				list: ['location',]
			});
			if (!resultList[0].granted) {
				api.requestPermission({
					list: ['location',],
					code: 100001
				}, (ret, err) => {
					//获取处理结果
					var list = ret.list;
					for (var i in list) {
						//只有有一项权限不足，就返回
						if (list[i].granted == false) {
							api.toast({
								msg: '权限不足，无法进行下一步操作',
								duration: 2000,
								location: 'bottom'
							});
							return false;
						}else{

						}
					}
				})
			}
			if (api.systemType == 'ios') {

				api.startLocation({
					accuracy: '100m',
					filter: 1,
					autoStop: true
				}, (ret, err) => {
					// this.alert(JSON.stringify(ret)+'44444444444');
					if (ret && ret.status) {
						//获取位置信息成功
						const lon = ret.longitude;
						const lat = ret.latitude;
						this.lon = ret.longitude;
						this.lat = ret.latitude
						localStorage.setItem('loaction', JSON.stringify({ lon, lat }));
						api.stopLocation();
						this.callback(callback, this);
					} else {
						// this.alert(JSON.stringify(err));
						// this.toast('无法定位请打开授权');
					}
				});
			} else {
				var aMap = api.require('bMap');
				aMap.getLocation((ret, err) => {
					// if (ret.status) {
					// 		alert(JSON.stringify(ret));
					// } else {
					// 		alert(JSON.stringify(err));
					// }
					if (ret && ret.status) {
						//获取位置信息成功
						const lon = ret.lon;
						const lat = ret.lat;
						this.lon = lon;
						this.lat = lat;
						// alert(`lon:${lon},lat:${lat}`);
						localStorage.setItem('loaction', JSON.stringify({ lon, lat }));
						this.callback(callback, this)
					} else {
						// alert('err:'+JSON.stringify(err));
						api.getLocation((ret, err) => {
							if (ret && ret.status) {
								//获取位置信息成功
								const lon = ret.longitude;
								const lat = ret.latitude;
								this.lon = ret.longitude;
								this.lat = ret.latitude;
								if(parseFloat(lon)>0){
									localStorage.setItem('loaction', JSON.stringify({ lon, lat }));
									this.callback(callback, ret);
								}else{
									// this.toast('当前定位失败！');
								}
							}else{
								// this.toast('当前定位失败！');
							}
						});
					}
				});
			}
		},
		//拨打电话
		call(phoneNumber) {
			// phoneNumber为电话号码
			api.call({
				type: 'tel_prompt',
				number: phoneNumber
			});
		},
		//同步获取本机电话号码
		getPhoneSync() {
			return api.getPhoneNumber({
				sync: true
			});
		},
		//异步获取本机电话号码
		getPhone() {
			let phoneNumber;
			api.getPhoneNumber((ret, err) => {
				phoneNumber = ret.value;
			});
			return phoneNumber
		},

		//判断授权，申请授权
		authorize({ list, msg = '权限不足，无法进行下一步操作' } = kwargs, callback) {
			// camera         //相机/拍照/录像
			// contacts       //写入/读取通讯录
			// microphone     //麦克风/录制音频
			// photos         //相册/本地存储。Android上等同storage权限
			// location       //定位
			// locationAlways //后台定位，只支持iOS
			// notification   //状态栏通知
			// calendar       //日历读写，只支持Android
			// phone          //直接拨打电话/获取手机号码、IMEI（设备标识），只支持Android
			// sensor         //传感器，只支持Android
			// sms            //后台发送短信，只支持Android
			// storage        //存储空间，读取相册，多媒体，本地存储相关，只支持Android

			let resultList = api.hasPermission({
				list,
			});
			let authorizeList = [];
			for (let i = 0; i < resultList.length; i++) {
				if (!resultList[i].granted) {
					authorizeList.push(resultList[i].name);
				}

			}
			api.requestPermission({
				list: authorizeList.length > 0 ? authorizeList : list,
				code: 1
			}, (ret, err) => {

				for (let i = 0; i < ret.list.length; i++) {
					// alert(JSON.stringify(ret));
					if (!ret.list[i].granted) {
						return api.alert({
							msg
						});
					}
				}
				this.callback(callback, ret, err);

			});



		},
		//*********************时*******间*************************************
		isLeapYear(Year) {
			//判断是否为闰年
			if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
				return true;
			} else {
				return false;
			}
		},
		getDayNumByYearMonth(month = parseInt(new Date().getMonth()) + 1, year = new Date().getFullYear()) {
			//根据年月判断天数
			switch (month) {
				case 4:
				case 6:
				case 9:
				case 11:
					return 30;
				case 2:
					return this.isLeapYear(year) ? 29 : 28;
				default:
					return 31;
			}
		},

		/*********************图片处理******************************/

		previewImage() {

		},
		uploadImg(keyName) {
			this.sel_img((imgs) => {
				this.alert(JSON.stringify(imgs));
				this.UploadImg(imgs[0], (ret) => {
					this[keyName] = ret.img
				})
			})
		},
		uploadImgs(callback) {
			this.sel_img((imgs) => {
				this.alert(JSON.stringify(imgs));
				this.UploadImg(imgs[0], (res) => {
					let ret = {
						data: JSON.stringify(res)
					}
					this.callback(callback, ret);
				})
			})
		},
		//选择图片，调起拍照，相册
		sel_img: function (callback) {
			// this.authorize({list:['camera','storage','photos']},()=>{

			selImg({
				is_clip: false, //是否裁剪
				is_compress: false, //是否压缩 // 不能压缩，不然有些图片会导致app闪退
				img_model: 2,
				callback: function (rlt) {
					var imgs = rlt;
					if (typeof rlt == 'string')
						imgs = [rlt];
					if ($cyz.isArray(imgs) && imgs.length > 0) { //有图片
						callback(imgs);//后续处理
					}
				}
			});
			// })
		},
		//上传图片
		UploadImg: function (src, callback) {
			uploadImg(src, (ret) => {
				// if (ret.op.succ == 1) { //成功时
				//上传成功
				// alert(JSON.stringify(ret));
				this.callback(callback, ret)
				// }
			});

		},
		//保存base64图片到本地
		save_image: function (image, filename) {
			// image  base64图片文件
			// filename保存后的文件名
			var parts = image.split(';base64,');
			if (parts.length > 1) {
				data = parts[1]
			}
			var trans = api.require('trans');
			trans.saveImage({
				base64Str: data,
				imgPath: "fs://",
				imgName: filename,
				album: true, //是否保存到系统相册
			}, function (ret, err) {
				if (ret.status) {
					return true;
				} else {
					return false;
				}
			});
			return false;
		},

		//图片转base64
		getBase64Image: function (img, callback) {
			// img 下载后的图片
			// var image = new Image();
			// image.src = img;
			// image.onload = function(){
			// var base64 = getBase64Image(image);
			// console.log(base64);
			// }
			var canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, img.width, img.height);
			var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
			var dataURL = canvas.toDataURL("image/" + ext);
			if (this[callback]) {
				this[callback](dataURL);
			} else if (callback) {
				callback(dataURL)
			} else {
				return dataURL;
			}
		},

		//限制canvas文本长度
		canvasTextAutoLine: function (str, ctx, initX, initY, lineHeight) {

			//  str:要绘制的字符串
			//  ctx:canvas对象
			//  initX:绘制字符串起始x坐标
			//  initY:绘制字符串起始y坐标
			//  lineHeight:字行高，自己定义个值即可

			var lineWidth = 0;
			var canvasWidth = 658;
			var lastSubStrIndex = 0;
			ctx.font = '32px Arial';
			ctx.fillStyle = "#f9dd95";
			ctx.textBaseline = "top";
			for (var i = 0; i < str.length; i++) {
				lineWidth += ctx.measureText(str[i]).width;
				if (lineWidth > canvasWidth - initX) { //减去initX,防止边界出现的问题
					ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
					initY += lineHeight;
					lineWidth = 0;
					lastSubStrIndex = i;
				}
				if (i == str.length - 1) {
					ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
				}
			}
		},



		//  将html代码变成图片
		domToPic: function () {
			var UILoading = api.require('UILoading');
			var wrapper = document.body;
			//document.body;
			var id = 0;
			UILoading.flower({
				center: {
					x: api.winWidth / 2.0,
					y: api.winHeight / 2.0
				},
				size: 30,
				fixed: true
			}, function (ret) {
				id = ret.id
			});
			var trans = api.require('trans');
			var w = $api.offset(wrapper).w;
			var h = $api.offset(wrapper).h;
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			var getPixelRatio = function (context) {
				var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio ||
					context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
				return (window.devicePixelRatio || 1) / backingStore;
			};
			var ratio = getPixelRatio(context);
			canvas.width = w * ratio;
			canvas.height = h * ratio;
			canvas.style.width = w + 'px';
			canvas.style.height = h + 'px';
			context.scale(ratio, ratio);
			html2canvas(wrapper, {
				canvas: canvas,
				background: '#fff',
				allowTaint: true
			}).then(function (canvas) {
				var imgData = canvas.toDataURL('image/png');
				imgData = imgData.replace('data:image/png;base64,', '');
				trans.saveImage({
					base64Str: imgData,
					album: true,
					imgName: 'sample.png',
				}, function (ret, err) {
					if (ret.status) {
						UILoading.closeFlower({
							id: id
						});
						// alert("页面截图已保存到相册！")
					} else {
						UILoading.closeFlower({
							id: id
						});
						// alert("图片保存失败！")
					}
				});
			});
		},

		//弹出选项
		actionSheet: function (param, callback) {
			//param
			var self = this;
			api.actionSheet({
				title: param.title || '请选择',
				cancelTitle: param.cancelTitle || '取消',
				buttons: param.buttons,
			}, (ret, err) => {

				if (ret.buttonIndex != param.buttons.length + 1 && ret.buttonIndex > 0) {
					const INDEX = ret.buttonIndex - 1;
					this.callback(callback, INDEX);
				}
			});
		},

		//上拉加载更多,下拉刷新
		refresh(callback) {
			//fun为扫描成功后调用的函数
			var this_ = this;
			$cyz.set_scroll_refre({
				fdown: function () {
					this_.page = 1;
					this.callback();
					api.refreshHeaderLoadDone();
				},
				fup: function () {
					this_.page++;
					callback();
					api.refreshHeaderLoadDone();
				},
			});
		},
		//不上拉加载更多,仅仅下拉刷新
		fdown: function (callback) {
			//fun为扫描成功后调用的函数
			var this_ = this;
			$cyz.set_scroll_refre({
				fdown: () => {
					this.page = 0;
					this.callback(callback);
					api.refreshHeaderLoadDone();
				},
				fup: false,
			});
		},
		//仅仅上拉加载更多,不下拉刷新
		fup(callback) {
			//fun为扫描成功后调用的函数
			$cyz.set_scroll_refre({
				fdown: false,
				fup: () => {
					// this.page++;
					this.alert('调起上拉加载更多')
					this.callback(callback);
					api.refreshHeaderLoadDone();
				},
			});
		},
		//分页接口
		get_paging_data(sign, npara, keys) {
			//sign 接口名
			// npara 参数对象
			// keys 操作对象的键this[keys]
			var this_ = this;
			callasyn({
				sign: sign,
				load_msg: '加载中',
				npara: npara,
				ext: {
					page: this_.page, //请求页次
					row_page: 20 //每页行数
				},
				func_sunc: function (rlt) {
					api.refreshHeaderLoadDone();
					var t1 = $cyz.crkvdatas_arr(rlt.tbs.t1);
					if (this_.page == 1) {
						if (t1.length == 0) {
							api.toast({
								msg: '暂无数据',
								duration: 2000,
								location: "middle"
							})
						}
						this_[keys] = t1;

					} else {
						if (t1.length == 0) {
							api.toast({
								msg: '暂无更多数据',
								duration: 2000,
								location: "middle"
							})
						} else {
							this_[keys] = this_[keys].concat(t1);
						}
					}
				},
			});
		},

		getUser(res) {
			console.log(res, '点击');
			this.mask = false;
			let userinfo = {};
			let data = res.detail.rawData;
			if (typeof (data) == 'string') {
				data = JSON.parse(data);
			}
			console.log('this is userinfo', data);
			console.log('this is userinfo', res);
			Object.assign(userinfo, data, { iv: res.detail.iv, encryptedData: res.detail.encryptedData });

			console.log('this is userinfo', userinfo);
			localStorage.setItem('userinfo', JSON.stringify(userinfo));
			this.userinfo = userinfo;
			this.login();
		},


		//获取手机验证码
		getPhoenCode() {
			const {
				phone,
			} = this;
			//如果用户没有输入手机号就不能获取验证码
			if (!phone) {
				this.toast('手机号不能为空')
				return false
			}
			if (!this.code_can) {
				return this.toast('请勿频繁操作');
			}
			this.code_can = false;
			this.code = '';
			this.http({
				url: 'app/index.php?c=entry&do=app&m=da_tong_store&s=login/getcode',

				data: {
					phone,
				},
			}).then(res => {
				this.toast('短信发送成功');
				var num = 60;
				var timer = setInterval(() => {
					if (num > 0) {
						num--;
						this.code_txt = num + 's';
					} else {
						clearInterval(timer);
						timer = null;
						this.code_txt = '获取验证码';
						this.code_can = true;
					}
				}, 1000)
			}).catch(err => {
				this.code_can = true;
			})
		},


		//************模块api*************
		//复制
		copy(value, callback) {
			var clipBoard = api.require('clipBoard');
			clipBoard.set({
				value,
			}, (ret, err) => {
				this.toast('复制成功');
				this.callback(callback, ret);
			})
		},
		getCopy(callback) {
			//获取粘贴板里的内容
			var clipBoard = api.require('clipBoard');
			clipBoard.get((ret, err) => {
				this.callback(callback, ret);
			})
		},

		//扫描二维码
		scan: function (callback) {
			//callback为扫描成功后调用的函数
			var FNScanner = api.require('FNScanner');
			FNScanner.open({
				autorotation: true
			}, (ret, err) => {
				if (ret.eventType == 'success') {
					// alert(JSON.stringify(ret.content));
					// var address = ret.content;
					this.callback(callback, ret.content);
				}
			});
		},
		//picker组件
		show_picker() {
			this.$refs.picker.show();
		},
		// *****************地图模块***************************
		getCoordsFromName(city, address, callback) {
			//根据地址返回经纬度
			var map = api.require('aMap');
			if (api.systemType == 'ios') {

				func(city, address, callback)
			} else {
				func(city, address, callback)
			}
			function func(city, address, callback) {
				map.getCoordsFromName({
					city,
					address,
				}, function (ret, err) {
					// alert(JSON.stringify(ret));
					if (ret.status) {
						this.callback(callback, ret);
					}
				});
			}
		},

		//检查更新版本

		checkUpdate() {
			var that = this;
			var mam = api.require('mam');
			mam.checkUpdate(function (ret, err) {
				if (ret) {
					var result = ret.result;
					if (result.update == true && result.closed == false) {
						var str = '新版本型号:' + result.version + ';更新提示语:' + result.updateTip + ';发布时间:' + result.time;
						api.confirm({
							title: '有新的版本,是否下载并安装 ',
							msg: str,
							buttons: ['确定', '取消']
						}, function (ret, err) {
							if (ret.buttonIndex == 1) {
								if (api.systemType == "android") {
									api.download({
										url: result.source,
										report: true
									}, function (ret, err) {
										if (ret && 0 == ret.state) { /* 下载进度 */
											api.toast({
												msg: "正在下载应用" + ret.percent + "%",
												duration: 2000
											});
										}
										if (ret && 1 == ret.state) { /* 下载完成 */
											var savePath = ret.savePath;
											api.installApp({
												appUri: savePath
											});
										}
									});
								}
								if (api.systemType == "ios") {
									api.installApp({
										appUri: result.source
									});
								}
							}
						});
					} else {
						// api.alert({
						// 	msg: no_update,
						// });
					}
				} else {
					err && err.msg && api.alert({
						msg: err.msg
					});
				}
			});
		},
		/*******************导航**********************/
		openmap(kwargs = {}) {
			var systemType = api.systemType;
			var buttons = new Array();
			var amap_installed = false;
			var bmap_installed = false;
			if (systemType == 'ios') {
				let installed = api.appInstalled({
					sync: true,
					appBundle: 'iosamap://'
				});
				// if (installed) {
				amap_installed = true;
				buttons.push('高德地图');
				// }
				installed = api.appInstalled({
					sync: true,
					appBundle: 'baidumap://'
				});
				// if (installed) {
				bmap_installed = true;
				buttons.push('百度地图');
				// }
			} else {
				let installed = api.appInstalled({
					sync: true,
					appBundle: 'com.autonavi.minimap'
				});
				if (installed) {
					amap_installed = true;
					buttons.push('高德地图');
				}
				installed = api.appInstalled({
					sync: true,
					appBundle: 'com.baidu.BaiduMap'
				});
				if (installed) {
					bmap_installed = true;
					buttons.push('百度地图');
				}
			}
			if (bmap_installed == false && amap_installed == false) {
				api.toast({
					msg: '您没有安装任何地图软件'
				});
				return false;
			}

			// var address = $('.latlon').attr('address');
			// var lat = $('.latlon').attr('lat');
			// var lon = $('.latlon').attr('lon');
			// var lat = $('.latlon').attr('lat');
			// var lon = $('.latlon').attr('lon');
			let { lon, lat, address } = kwargs;

			function open_amap() {
				if (systemType == 'ios') {
					//苹果打开高德地图
					api.openApp({
						iosUrl: 'iosamap://path?sourceApplication=applicationName&sid=BGVIS1&did=BGVIS2&dlat=' + lat + '&dlon=' + lon + '&dname=' + address + '&dev=0&t=3',
					}, function (ret, err) {

					});
				} else {
					//安卓打开高德地图
					api.openApp({
						androidPkg: 'android.intent.action.VIEW',
						// uri: 'amapuri://route/plan/?dlat='+lat+'&dlon='+lon+'&dname='+address+'&dev=0&t=3',
						uri: `androidamap://route?sourceApplication=softname&dlat=${lat}&dlon=${lon}&dname=${address}&dev=0&t=1`
					}, function (ret, err) {

					});
				}
			}
			function opne_bmap() {
				if (systemType == 'ios') {
					api.openApp({
						iosUrl: 'baidumap://map/direction?destination=latlng:' + lat + ',' + lon + '|name:' + address + '&mode=riding',
					}, function (ret, err) {
						if (err) {

							//alert(JSON.stringify(err));
						}
					});
				} else {
					api.openApp({
						androidPkg: 'android.intent.action.VIEW',
						// uri: 'baidumap://map/direction?destination=latlon:' + lat + ',' + lon + '|name:' + address + '&mode=riding'
						uri: 'baidumap://map/direction?destination=' + address + '&mode=riding'
					}, function (ret, err) {

					});
					// api.openApp({
					// 	androidPkg:'android.intent.action.VIEW' ,
					// 	appParam:{
					// 	// origin:'latlon:37.51266,122.130724',
					// 	// destination:'latlng:37.508545,122.128254',
					// 	destination:address,
					// 	// name: address,
					// 	mode:'driving',
					// 	// region:'北京',
					// 	// src:api.appName
					// 	},
					// 	uri:'baidumap://map/direction'

					// 			},function(ret,err){
					// 							if(ret){
					// 											 //alert(JSON.stringify(ret));
					// 							}
					// 							else{
					// 											api.toast({msg:"请先安装百度地图app", location: 'middle'})
					// 							}
					// 			})
				}
			}
			api.actionSheet({
				cancelTitle: '取消',
				buttons: buttons
			}, function (ret, err) {
				var index = ret.buttonIndex;
				if (ret.buttonIndex != buttons.length + 1 && ret.buttonIndex > 0) {
					switch (index) {
						case 1:
							if (amap_installed && bmap_installed) {
								open_amap();
							} else {
								amap_installed && open_amap();
								bmap_installed && opne_bmap();
								break;
							}
						case 2:
							opne_bmap();
							break;
					}
				}
			});
		},
		/**** 第三方模块 *
		/**** 第三方应用授权登录， 支付***** */
		weixin_login() {
			var systemType = api.systemType;
			var wx = api.require('wx');
			this.wx_login(wx, systemType, 0);
		},
		wx_login(wx, systemType, type) {

			wx.isInstalled((ret, err) => {
				if (ret.installed) {
					if (type == 1) {
						return;
					}
					// alert(JSON.stringify('88888888888'));
					wx.auth({}, (ret1, err1) => {
						// alert(JSON.stringify(ret1));
						if (ret1.status) {
							$cyz.showProgress({
								title: "授权中",
								modal: true
							});
							wx.getToken({
								code: ret1.code
							}, (ret2, err2) => {
								if (ret2.status) {
									wx.getUserInfo({
										accessToken: ret2["accessToken"],
										openId: ret2["openId"]
									}, (info, err3) => {
										// $cyz.showAlert("info:" + JSON.stringify(info));
										$cyz.hideProgress();
										if (info.status) {


											const {
												openid,
												nickname,
												headimgurl,
												unionid,
											} = info;

											this.http({
												url: 'app/index.php?i=1&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=app_openid&&m=da_tong_store',
												data: {
													openid,
													nickname,
													headimgurl,
													unionid,
												}
											}).then((res) => {
												localStorage.setItem('userinfo', JSON.stringify(info));
												localStorage.setItem('token', res.data.token);
												$cyz.openWin('main');
											}).catch((err) => {
												this.alert(JSON.stringify(err) + '---------err');
											})
										} else {
											$cyz.showAlert("获取用户信息失败!");
										}
									});
								} else {
									$cyz.hideProgress();
									// $cyz.showAlert('微信getToken失败');
								}
							});
						} else {
							var a = null;
							// $cyz.showAlert('微信登录授权失败');
						}
					});
				} else {
					if (type == 1) {
						return;
					}
					// if ((systemType === "ios")) {
					$cyz.showAlert("未检测有安装微信软件,请下载后重新登录");
					// }
				}
			});
		},

		wx_pay(param = {}, callback) {
			//微信支付
			// alert(JSON.stringify(param));
			var wxPay = api.require('wxPay');
			const {

				appid,
				mch_id,
				nonce_str,
				sign,
				prepay_id,
				timeStamp,
			} = param;
			// alert(JSON.stringify({
			// 	apiKey: appid,
			// 	mchId: mch_id,
			// 	package: 'Sign=WXPay',
			// 	nonceStr: nonce_str,
			// 	sign,
			// 	timeStamp,
			// 	orderId: prepay_id,
			// }));
			wxPay.payOrder({
				apiKey: appid,
				mchId: mch_id,
				package: 'Sign=WXPay',
				nonceStr: nonce_str,
				sign,
				timeStamp,
				orderId: prepay_id,

			}, (ret, err) => {
					// alert(JSON.stringify(err) + '4444444444444444&&&&&&&&&&&&&&');
				// alert(JSON.stringify(ret) + '&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
				if (ret.status) {
					//支付成功
					this.callback(callback, ret);
				} else {
					// this.alert(JSON.stringify(err));
				}
			});
		},
		wx_pay2() {
			//测试
			var wxPay = api.require('wxPay');

			wxPay.config({}, function (ret, err) {
				$cyz.log('======================支付参数配置ret', ret, err);
				if (ret.status) {
					$cyz.log('======================支付参数配置成功', ret, wxPay.pay);

					//alert('配置商户支付参数成功1');
					wxPay.pay({
						description: 'iPad mini 16G 白色',
						totalFee: '888',
						tradeNo: '1217752501201407033233368131',
						// spbillCreateIP: '196.168.1.1',
						// deviceInfo: '013467007045764',
						// detail: 'iPad mini 16G 白色',
						// attach: '说明',
						// feeType: 'CNY',
						// timeStart: '20190621114110',
						// timeExpire: '20190621205010',
						// goodsTag: 'WXG',
						// productId: '12235413214070356458058',
						// openId: 'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o'
					}, function (ret, err) {
						$cyz.log('======================支付callback', ret, err);

						if (ret.status) {
							// alert(ret.result + "*********************");
						} else {
							// alert(JSON.stringify(err) + '0000000');
						}
					});
				} else {
					this.alert(err.code);
				}
			});
		},
		aliPay_pay(str, callback) {
			//支付宝支付

			var aliPayPlus = api.require('aliPayPlus');
			if(!aliPayPlus){
				return this.toast('请前往下载支付宝');
			}
			aliPayPlus.payOrder({
				orderInfo: str,
			}, (ret, err) => {
				// alert('this is error:'+JSON.stringify(err));
				// alert('this is res:'+JSON.stringify(ret));
				// console.log(JSON.stringify(ret));
				// console.log(JSON.stringify(err));
				api.alert({
					title: '支付结果',
					msg: ret.code == 9000 ? "支付成功" : "支付失败或取消支付",
					buttons: ['确定']
				});
				if (ret.code == 9000) {
					this.callback(callback, ret);
				} else {
					this.back();
				}

			});
		}



	},


}
