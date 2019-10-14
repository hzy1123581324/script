/*
 *  desc	:图片处理扩展方法
 *  anthor	:cyz
 *  time	:2015-12-09
 *  update	:
 * */

var img_new_js_path = getCurrAbsPath();
var img_new_holder = img_new_js_path.substring(0, img_new_js_path.lastIndexOf("/") + 1);

//添加样式注册
//document.getElementsByTagName("head")[0].appendChild('<link rel="stylesheet" type="text/css" href="'+this_css+'">');
$('head').append('<link rel="stylesheet" type="text/css" title="img" href="' + img_new_holder + '../css/img.css">');
//默认图片赋值

/*
 var img_new_js_path = '';
 var img_new_holder = '';

 try{
 alert('s');
 img_new_js_path = getCurrAbsPath();

 alert(img_new_js_path);
 img_new_holder = img_new_js_path.substring(0, img_new_js_path.lastIndexOf("/") + 1);

 alert($);
 alert(img_new_holder);

 $('head').append('<link rel="stylesheet" type="text/css" href="' + img_new_holder + '../css/img.css">');

 }
 catch(e){
 alert(e);
 }
 */

$(function() {
	$.extend({
		img : {
			brower_en : function(sector,second_sector) {//启用预览

		 		if(second_sector){//有二级选择器时,遍历处理
		 			$(sector).find(second_sector).each(function(index,element){
		 					$.img.brower_en($(element));
		 			});
		 		}
		 		else{
					$(sector).on('click.img', 'img', function() {
						var img = $(this);
						var imgs = $(sector).find('img');
						var imgs_src = [];
						var cur_idx = imgs.index(img);
						cur_idx = cur_idx < 0 ? 0 : cur_idx;
						$(imgs).each(function() {
							var img_url = $(this).attr('src');
							img_url = img_url.replace("/thumbnail", "");
							imgs_src.push(img_url);
						});

						my_imgPreview = api.require('imageBrowser');
						my_imgPreview.openImages({
							imageUrls : imgs_src,
							showList : false,
							activeIndex : cur_idx
						});

						//					$api.openPop('imgPreview', {
						//						title : '预览',
						//						index : cur_idx,
						//						imgs : imgs_src
						//					});

					});
				}



			},
			brower_dis : function(sector) {//停用预览
				$(sector).unbind('.img');
			}
		}
	});

	//图片处理扩展方法
	$.fn.extend({

		img : function(options) {
			var defaults = {
				type : 'picture', //默认为图片 可以是video pucture all
				title : '图片选择', //显示文本
				img_model : 2, //图片模式 0:拍照 1:相册  2:二者
				is_multi : false, //是否多图
				max_count : 1, //最大张数
				is_clip : false, //是否裁剪
				clip_rect:{},//裁剪参数

				is_compress : false, //是否压缩
				single_img_css : 'single_img_css', //单图样式
				multi_ul_css : 'multi_ul_css', //多图ul样式
				multi_li_css : false, //多图li样式
				multi_img_css : false, //多图img样式
				multi_i_del_css : false, //多图删除组件样式
				multi_li_add_css : false, //多图增加样式
				callback_addimg : false,  //添加图片回调
				callback_delimg : false  //删除图片回调
			};

			this.ctl = $(this);
			//内属性
			var ctl = this.ctl;
			//图片控件
			this.opts = $.extend(defaults, options);

			if (this.opts.type == 'video') {
				this.opts.img_model = 1;
				this.opts.is_clip = false;
				this.opts.is_compress = false;
			}

			var opts = this.opts;

			//选择图片回调
			// function callback_addimg(arFiles) {
      //
			// }

			//添加图片
			this.add_img = function(files) {


				$cyz.log('files.paras:', files);

				//如果是字符串,就是 2,src; 这个格式
				//如果是object,就是 id:3,src:aaa
				//如果是数组,就是 2,src
				//判断是否是多图还是单图
				var imgs = [];
				if ( typeof files == 'string') {
					var arImgs = files.split(';');
					for (var j = 0; j < arImgs.length; j++) {
						if (arImgs[j] == '')
							break;
						var arImg = arImgs[j].split(',');
						imgs.push([arImg[0], arImg[1]]);
					}
				} else if ($cyz.isArray(files)) {
					if (files.length > 0) {
						if ($cyz.isArray(files[0])) {//也是数组
							for (var i = 0; i < files.length; i++) {
								imgs.push(files[i][0]);
								imgs.push(files[i][1]);
							}
						} else {
							imgs.push(files[0]);
							imgs.push(files[1]);
						}
					}

				}

				if (imgs.length < 1)
					return;

				if (!this.opts.is_multi) {//只有一个图片时
					this.ctl.attr('data-id', imgs[0][0]).attr('src', imgs[0][1]);
				} else {//多图

					var add = this.ctl.children("li:last");

					for (var i = 0; i < imgs.length; i++) {//添加到

						var li_img = '';
						li_img += '<li><img src="';
						li_img += imgs[i][1];
						li_img += '" data-id="' + imgs[i][0] + '" alt="" />';
						li_img += '<i></i>';
						add.before(li_img);
					}
				}
			};

			var html = '';

			if (!opts.is_multi) {//如果不是多图
				opts.max_count = 1;
				//最大张数为1

				if (ctl[0].tagName.toUpperCase() != 'IMG') {//如果不是Img控件,就添加
					html = '<img>';
					ctl.append(html);
					ctl = $(ctl.children('img')[0]);
				}

				if (opts.single_img_css) {//是否有样式
					if (!( typeof opts.single_img_css === 'object')) {// isString(opts.single_img_css))
						if (!ctl.is(opts.single_img_css))
							ctl.addClass(opts.single_img_css);
					} else
						ctl.css(opts.single_img_css);
				}


				ctl.on('click', function() {//点击添加时

					selImg({
						title : opts.title,
						img_model : opts.img_model,
						max_count : opts.max_count,
						is_clip : opts.is_clip,
						clip_rect:opts.clip_rect,
						is_compress : opts.is_compress,
						type : opts.type,

						callback : function(selFiles) {

						$cyz.log('selFiles:', selFiles);


							if (!selFiles || selFiles.length < 1)
								return;
							ctl.attr('src', selFiles[0]);
							ctl.removeAttr("data-id");
							if(typeof (opts.callback_addimg) == "function"){
								opts.callback_addimg(selFiles)
							}

						}
					});

				});

			} else {//多图
				//opts.is_clip=false;//如果是多图,

				if (ctl[0].tagName.toUpperCase() != 'UL') {//如果不是ul控件,就添加
					html = '<ul><li></li></ul>';
					ctl.append(html);
					ctl = $(ctl.children('ul')[0]);
				} else {//是ul组件时
					ctl.html('');
					html = '<li></li>';
					ctl.append(html);
				}

				//设置图片显示框的高度

				$("head link").on("load", function(){
					$(this).each(function (i, sheet){
						sheet = sheet.styleSheet || sheet.sheet;
						if (sheet.title == "img") {
							var rules = sheet.cssRules;
							$(rules).each(function (j, rule){
								if (rule.selectorText == "." + opts.multi_ul_css + " li") {
									rule.style.height = ctl.children("li").outerWidth() + "px";
									return false;
								}
							});
						}
					});
				});

				if (opts.multi_ul_css) {//是否有图片组样式
					if (!( typeof opts.multi_ul_css === 'object')) {//isString(opts.multi_ul_css))
						if (!ctl.is(opts.multi_ul_css))
							ctl.addClass(opts.multi_ul_css);
					} else
						ctl.css(opts.multi_ul_css);
				}

				ctl_add = ctl.children("li:last").addClass('add_img');
				//添加组件
				if (opts.multi_li_add_css) {//增加图片样式 初始化时追加
					if (!( typeof opts.multi_li_add_css === 'object'))//  isString(opts.multi_li_add_css))
						if (!ctl_add.is(opts.multi_li_add_css))
							opts.multi_li_add_css.addClass(opts.multi_li_add_css);
						else
							ctl_add.css(opts.multi_li_add_css);
				}

				$(ctl).on('click', 'i', function() {
					//alert($(this).parent().html());
					$(this).parent().remove();
					if(typeof (opts.callback_delimg) == "function"){
						opts.callback_delimg();
					}
				});

				ctl_add.on('click', function() {//添加组件
					selImg({
						title : opts.title,
						img_model : opts.img_model,
						max_count : opts.max_count,
						is_clip : opts.is_clip,
						clip_rect:opts.clip_rect,
						is_compress : opts.is_compress,
						type : opts.type,
						callback : function(selFiles) {
							if (!selFiles || selFiles.length < 1)
								return;
							var ar_selFiles = [];
							if ( typeof selFiles == 'string')
								ar_selFiles.push(selFiles);
							else
								ar_selFiles = selFiles;

							//alert('0510.ar_selFiles.length:=>'+ar_selFiles.length);

							for (var i = 0; i < ar_selFiles.length; i++) {

								var li_img = '';
								li_img += '<li><img src="';
								li_img += ar_selFiles[i];
								li_img += '" alt="" />';
								li_img += '<i></i>';

								ctl_add.before(li_img);
							}
							if(typeof (opts.callback_addimg) == "function"){
								opts.callback_addimg(selFiles);
							}
						}
					});

				});

			}

			return this;

		},

		img_browser_init : function(img_sector) {//多图预览设置 图片控件,一般需要有直接父级  使用on

			//图片浏览插件

			img_sector = img_sector ? img_sector : 'img';

			//			var imgs=$(this).find(img_sector);

			$(this).on('click', img_sector, function(e) {
				e.stopImmediatePropagation();
				var img = $(this).find('img');

				var imgs = $(this).parent().find('img');

				var imgs_src = [];
				var cur_idx = imgs.index(img);
				cur_idx = cur_idx < 0 ? 0 : cur_idx;
				$(imgs).each(function() {
					var img_url = $(this).attr('src');
					img_url = img_url.replace("/thumbnail", "");
					imgs_src.push(img_url);
				});

				if($cyz.hasCusObj()){
				my_imgPreview = api.require('imageBrowser');
				my_imgPreview.openImages({
					imageUrls : imgs_src,
					showList : false,
					activeIndex : cur_idx
				});
				}
				return false;
			});
			return $(this);
		},

		img_browser_init_byimg : function(img_sector) {//按图片控件 上的自定义属性 data-imgs

			//图片浏览插件

			img_sector = img_sector ? img_sector : 'img';

			$(this).on('click', img_sector, function() {

				//activeIndex
				var img = $(this);
				var imgs = img.attr('data-imgs');
				if (imgs == '')
					return;
				console.log(imgs);

				var imgs_src = [];
				var ar_imgs = imgs.split(';');

				for (var i = 0; i < ar_imgs.length; i++) {
					var img_url = ar_imgs[i].split(',')[1];
					img_url = img_url.replace("/thumbnail", "");
					imgs_src.push(img_url);

				}

				var cur_idx = 0;

				my_imgPreview = api.require('imageBrowser');
				my_imgPreview.openImages({
					imageUrls : imgs_src,
					showList : false,
					activeIndex : cur_idx
				});

			});
			return false;
		},

		img_add_bystr : function(str) {//添加到当前控件中,按字符 传入:  3,http://www.baidu.com/aa.jpg;4,http://www.baidu.com/aa.jpg
			if (str) {
				var imgHtml = '';
				var arImgs = str.split(';');
				for (var j = 0; j < arImgs.length; j++) {
					var arImg = arImgs[j].split(',');
					//					imgHtml += '<img src="' + arImg[1] + '"/>';
					imgHtml += '<div class="img-box" style="background-image: url(\'' + arImg[1] + '\')"> <img style="display: none;" src="' + arImg[1] + '"/></div>';
				}

				$(this).html(imgHtml);

			}
		},

		//图片上传 img图片数组
		img_upload_one : function(callback, data) {
			var i_data = {
				img_suc : '0'
			};
			data = $.extend(data, i_data);
			$cyz.showProgress({
				title : '正在提交...',
				modal : true
			});
			api.ajax({
				url : Global.imgURL+'?cr_thumb=' + (cur.attr('cr_thumb') || 0),
				method : 'post',
				timeout : 30000,
				dataType : 'text',
				data : {
					files : {
						file : $(this).attr('src')
					}
				}
			}, function(ret, err) {
				$cyz.hideProgress();
				if (ret) {
					var jsonStr = ret.substring(1, ret.length - 1);
					jsonStr = jsonStr.replace(/\\/g, "")
					var json = JSON.parse(jsonStr);

					data.img_suc = '1';
					data.img_id = json.id + "";
					data.img_url = json.imgUrl;

				} else {
					data.img_eror = err.msg;
					data.img_suc = '0';
					img_upload_one(callback, data);
				}

				callback(data);

			});
			return $(this);

		},

		//图片上传 如果图片中data-id 有值,就不上传,如果没有值就上传,返回id
		img_upload : function(callback,replace_src) {//replace_src 替换模式 默认不替换 1:小图 2:大图

			//判断控件类型 ul多图 img:单图
			var imgs = getArrImgs($(this));
			var self=$(this);

			//alert(imgs[0].attr('src'));

			//图片标志 data-id =0:未上传    =-1:已经上传,但出错不用重新上传   >0:已经正常上传
			//上传图片内部函数	imgs->img控件数组
			function upload(imgs1, callback) {

								// alert($(imgs1[0]).attr('data-id'));
				var cur = false;
				//上传
				$.each(imgs1, function() {
					var tmpImg = $(this);

					if ( typeof (tmpImg.attr("data-id")) == "undefined")//如果没有id,就添加上传Id=0 表示未上传 -1 表示上传后出错
						tmpImg.attr('data-id', '0');
					//标志为已经未上传

					if (tmpImg.attr('data-id') == '0') {//要上传
						cur = tmpImg;
						return false;
					}
				});

				if (!cur) {//如果都处理了
					if (typeof callback=='function'){
						$cyz.hideProgress();
						//回调图片地址用逗号隔开, id用逗号隔开

						callback(self.img_getpath(),self.img_getuploadid());
					}
					return;
				}

				$cyz.showProgress({
					title : '正在提交...',
					modal : true
				});

				api.ajax({
					url : Global.imgURL+'?cr_thumb=' + (cur.attr('cr_thumb') || 0),
					method : 'post',
					timeout : 30000,
					dataType : 'text',

					//data:{type:type,file_type:file_type,data:this.result},
            		//dataType:"json",

					data : {

						files : {
							file : cur.attr('src')
						}
					}
				}, function(ret, err) {

					/*alert(ret);
					callback(ret);
					return ;*/

					if (ret) {
						//var jsonStr = ret.substring(1, ret.length - 1);
						var jsonStr = ret.replace(/\\/g, "");
						var json = JSON.parse(jsonStr);

						//alert(JSON.stringify(json));
						//console.log('服务器返回上传结果-->',jsonStr);

						if(Number(json.op.succ)==1){
							var img_id =json.npara.id +"";
							cur.attr('data-id', img_id);
							//if(replace_src){
								cur.attr('src',replace_src=='1'?json.npara.url:json.npara.url.replace('thumbnail/',''));
							//}

						}else{
							cur.attr('data-id', '-1');
							api.alert({
								msg : ('上传图片异常：' +json.op.err_msg)
							});
						}
					} else {
						api.alert({
						// msg : ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
							msg: err.code||'上传图片异常，请换一张图片',
						});

						cur.attr('data-id', '-1');

						//upload(imgs, callback);

						//设置当前处理图片控件id -1 为出错
					}

					upload(imgs1, callback);
				});
			};

			upload(imgs, callback);

			return $(this);

		},
		//获取图片路径,多个用逗号隔开 图片src
		img_getpath : function() {

			//判断控件类型 ul多图 img:单图
			/*
			 var ctl = $(this);
			 var imgs = false;
			 if (ctl[0].tagName.toUpperCase() != 'IMG')//如果不是Img控件,就是多图
			 imgs = $(ctl).find('img');
			 else
			 imgs = ctl;
			 */
			var imgs = getArrImgs($(this));

			var rlt = '';
			//上传
			$.each(imgs, function() {
				var img = $(this);
				if (img.attr('src') && img.attr('src').length > 0)//如果有src,就取值
					rlt = rlt + (rlt.length > 0 ? ',' : '') + img.attr('src');
			});
			return rlt;
		},

		//获取图片上传后取到的id,多个用逗号隔开 取自定义属性 data-id
		img_getuploadid : function() {

			//判断控件类型 ul多图 img:单图

			var imgs = getArrImgs($(this));
			var rlt = '';
			//上传
			$.each(imgs, function() {
				var img = $(this);
				if (img.attr('data-id') && img.attr('data-id').length > 0)//如果有src,就取值
					rlt = rlt + (rlt.length > 0 ? ',' : '') + img.attr('data-id');
			});
			return rlt;
		}
	});

});

//图片上传
function uploadImg(src,callback){
	console.log(src,'***************************');
	$cyz.showProgress({
		title : '正在提交...',
		modal : true
	});

	api.ajax({
		// url : Global.imgURL,
		url :Global.allURL+"app/index.php?c=entry&do=app&m=da_tong_store&s=home/upload1",
		method : 'post',
		timeout : 30000,
		dataType : 'text',
		data : {
			files : {
				file : src
			}
		}
	}, function(ret, err) {
		console.log(JSON.stringify(ret));
		console.log(JSON.stringify(err)+"88888888888888888888888888888");
		$cyz.hideProgress();

		if (ret) {
			var jsonStr = ret.replace(/\\/g, "");
			var json = JSON.parse(jsonStr);
			// if(Number(json.op.succ)!=1){
			// 	api.alert({
			// 		msg : ('上传图片异常：' +json.op.err_msg)
			// 	});
			// }
			callback(json);//回调处理

		} else {
			api.alert({
				// msg : ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
				msg: err.code||'上传图片异常，请换一张图片',
			});
		}

	});
}


//按选择器获取图片控件数组
function getArrImgs(selector) {
	var ctl = $(selector);

	var imgs = [];
	ctl.each(function(i, r) {
		var curimg = $(this);
		if (curimg[0].tagName.toUpperCase() != 'IMG') {//如果不是Img控件,就是多图
			curimg.find('img').each(function() {
				imgs.push($(this));
			});

		} else
			imgs.push(curimg);
	});
	return imgs;
}

//图片选择
function selImg(imgParas) {
	var paras = {
		title : '图片选择',
		img_model : 2, //模式 0:拍照 1:相册 2:全部
		max_count : 1, //最大张数
		is_clip : true, //是否裁剪
		clip_rect:{},//裁剪参数
		is_compress : false, //是否压缩
		type : 'picture',
		callback : false //回调函数
	};

	if (imgParas)
		paras = $.extend(paras, imgParas);

	var btns = ['拍照', '从相册选择'];
	if (paras.img_model == 0)
		btns = ['拍照'];
	else if (paras.img_model == 1)
		btns = ['从相册选择'];

	//alert(paras.max_count);

	if (paras.img_model == 0)
		getPicFromCamera(paras.is_clip, paras.is_compress, paras.callback,paras.clip_rect);
	else if (paras.img_model == 1)
		getPicFromLibrary(paras.type, paras.title, paras.max_count, paras.is_clip, paras.is_compress, paras.callback,paras.clip_rect);
	else {//二者
		api.actionSheet({
			title : paras.title,
			cancelTitle : '取消',
			buttons : ['拍照', '从相册选择']
		}, function(ret, err) {
			if (ret.buttonIndex == 1) {//拍照
				getPicFromCamera(paras.is_clip, paras.is_compress, paras.callback,paras.clip_rect);
			}
			if (ret.buttonIndex == 2) {//从相册选择
				//album();

				//alert('0510.从相册选择.:=>getPicFromLibrary' );

				getPicFromLibrary(paras.type, paras.title, paras.max_count, paras.is_clip, paras.is_compress, paras.callback,paras.clip_rect);
			}
		});
	}
	;

}

//相册选择图片
function getPicFromLibrary(type, title, max_count, is_clip, is_compress, callback,clip_rect) {
	var obj = api.require('UIMediaScanner');
	// var obj = api.require('UIAlbumBrowser');
	
	obj.open({
		type : type,
		column : 4,
		max : max_count,
		sort : {
			key : 'time',
			order : 'desc'
		},
		texts : {
			stateText : title,
			cancelText : '取消',
			finishText : '完成'
		},
		styles : {
			bg : '#fff',
			mark : {
				icon : '',
				position : 'bottom_right',
				size : 20
			},
			nav : {
				bg : '#FCAE10',
				stateColor : '#fefefe',
				stateSize : 20,
				cancleBg : 'rgba(0,0,0,0)',
				cancelColor : '#fefefe',
				cancelSize : 18,
				finishBg : 'rgba(0,0,0,0)',
				finishColor : '#fefefe',
				finishSize : 18
			}
		}
	}, function(ret) {
		//alert(JsonToStr(ret));
		if (ret) {

			if (!ret.list||ret.list.length < 1) {//如果没有时,返回
				if (callback)
					callback(false);
				return;
			}

			var files = [];
			var is_error = false;

			// alert('0510.list.length:=>'+ret.list.length);

			for (var i = 0; i < ret.list.length; i++) {
				if (is_error)
					break;

					//alert('转换前的图片文件=>'+ret.list[i].path);

				 //$cyz.log('转换前的图片文件',ret.list[i].path);

				// alert(obj.transPath);

				obj.transPath({
					path : ret.list[i].path
				}, function(retl, err) {

					 $cyz.log('转换后的图片文件',retl,err);
					if (retl) {
						files.push(retl.path);

						if (files.length == ret.list.length) {

							getPicFromLibrary_Reslut(files, is_clip, is_compress, callback,clip_rect);
						}
					} else {
						is_error = true;
						getPicFromLibrary_Reslut(files, is_clip, is_compress, callback,clip_rect);

					}
				});
			}
		}
	});
}

function getPicFromLibrary_Reslut(files, is_clip, is_compress, callback,clip_rect) {

	 //alert('0510.result:=>getPicFromLibrary_Reslut' );

	//  alert('fromlibrary_rlt=>'+JSON.stringify(files));
	if (files.length < 1) {//如果没有时,返回
		if (callback)
			callback(false);
		return;
	}



	function fcompress(arFiles) {
		// alert(JSON.stringify(arFiles));

		// alert(arFiles);

		if (is_compress) {
			//	 alert('0510.result:=>fcompress='+ is_compress);
			imgCompress(arFiles, callback);

		} else {
			//   alert('0510.result:=>fcompress=callback' );
			callback(arFiles);
		}
	};

	if (is_clip)//如果需求裁剪,就调用
		imgClip(files, fcompress,clip_rect);

	else//不要求裁剪时 判断压缩
		fcompress(files);

}

//相机拍照选择图片
function getPicFromCamera(is_clip, is_compress, callback,clip_rect) {
	api.getPicture({
		sourceType: 'camera',
		encodingType: 'png',
		mediaValue: 'pic',
		allowEdit: false,
		quality: 90,
		saveToPhotoAlbum: true
	}, function(ret, err) {

		if (ret) {
			if (ret.data.length > 0) {

				//压缩处理 判断是否压缩
				function fcompress(arFiles) {
					if (is_compress)
						imgCompress(arFiles, callback);
					else {
						if (callback)
							callback(arFiles);
					}
				};

				if (is_clip)//如果需求裁剪,就调用
					imgClip(ret.data, fcompress,clip_rect);

				else//不要求裁剪时 判断压缩
					fcompress(ret.data);
			}
		} else {

			err&&err.msg&&api.alert({
				msg : err.msg
			});
			callback(false);
		};
	});
}

var imgClip_callback = false;

function imgClip(files, callback,clip_rect) {
	imgClip_callback = callback;
	//赋值要回调的函数
	$api.openWin('utl_img_clip', {//传入文件集合,打开裁剪页面
		files : files,
		s_winName : api.winName,
		s_frameName : api.frameName,
		clip_rect:clip_rect,
		callbackMethod : imgClip_callback ? 'imgClip_callback' : false
	});
}

//图片文件压缩 files:图片文件集合 callback:回调
function imgCompress(files, callback) {

	var arFiles = files;
	if (!$.isArray(arFiles))//不是数组,就组合
		arFiles = [[arFiles, false]];
	//遍历
	//如果全部完成了,就返回
	var cur = -1;
	for (var i = 0; i < arFiles.length; i++) {
		if (!$.isArray(arFiles[i])) {//不是数组,就修改为数组样式
			arFiles[i] = [arFiles[i], false];
		}
		if (arFiles[i][1] == false) {
			cur = i;
			break;
		}
	}
	if (cur == -1) {//为-1时回调退出
		if (callback) {
			var rltFiles = [];
			for (var i = 0; i < arFiles.length; i++) {
				rltFiles.push(arFiles[i][1]);
			}
			callback(rltFiles);
		}
		return;
	}

	var cacheDir = api.cacheDir;


	var fileName = arFiles[cur][0].substring(arFiles[cur][0].lastIndexOf('/') + 1);
	var fileExName = fileName.substring(fileName.lastIndexOf('.'));
	var fileNewName = (new Date()).valueOf() + fileExName;

	//alert('压缩后'+fileName+fileExName+fileNewName);
	//$cyz.log('压缩后',fileName,fileExName,fileNewName);

	//	var fs = api.require('fs');
	//	var retl = fs.getAttributeSync({
	//		path : arFiles[cur][0]
	//	});
	var imageFilter = api.require('imageFilter');
	//alert(imageFilter);
	//alert('imagefileter:'+arFiles[cur][0]);

	imageFilter.getAttr({
		path : arFiles[cur][0]
	}, function(retl, err) {
	//alert('retl');
		//alert(JSON.stringify(retl));
		//alert(JSON.stringify(err));

		if (retl.status) {
			var size_k = retl.size / 1024;
			size_k = size_k.toFixed(0);
			var w = retl.width;
			var h=retl.height;
			var scale=0;
			if (size_k <= 100) {
				//100K以下不压缩
				arFiles[cur][1] = arFiles[cur][0];
				//alert('100k:'+arFiles);
				imgCompress(arFiles, callback);
			} else {
				var scale = 1;
				if (w <= 1000) {
					//					宽度在800以内不缩放
					scale = 1;
				} else {
					scale = 1000 / w;
				}
				scale = scale.toFixed(4);
				//alert('100');
				var scale_w=1000;
				var scale_h=h*scale;

				scale_h= scale_h.toFixed(0);
				//alert('101:'+scale_h);
				var quality = 0.5;
				if (size_k <= 100) {
					//100K以下不压缩
					arFiles[cur][1] = arFiles[cur][0];


					imgCompress(arFiles, callback);
				} else if (size_k <= 1024) {
					//1M以内
					quality = 300 / size_k;
				} else if (size_k <= 1024 * 3) {
					quality = 400 / size_k;
				} else {
					quality = 500 / size_k;
				}
				quality = quality.toFixed(1);
				if(scale<1){
					quality = 1;
//					if (quality <= 0.5)
//						quality = 0.5;
				}else{

				}

			     if(w<scale_w)
			      scale_w=w;
			   /*
				$cyz.showAlert('原图大小：' + size_k +'K'
				+ '\n原图宽度：' + w
				+ '\n原图高度：' + h
				+ '\n上传宽度：' + scale_w
				+ '\n上传高度：' + scale_h
				+ '\n压缩质量：' + quality
				+ '\n缩放比例：' + scale); */

$cyz.log('size',scale,w,h,scale_w,scale_h);


				imageFilter.compress( {
					img : arFiles[cur][0],
					quality : quality,
//					scale : scale,
					size:{
						w:scale_w,
						h:scale_h
					},
					save : {
						album : false,
						imgPath : cacheDir,
						imgName : fileNewName
					}
				}, function(ret, err) {
				$cyz.log('压缩后',ret,err);
					if (ret.status) {
						arFiles[cur][1] = cacheDir + "/" + fileNewName;
						imgCompress(arFiles, callback);
					} else {
						arFiles[cur][1] = arFiles[cur][0];
						imgCompress(arFiles, callback);
					}
				});
			}
		} else {
			arFiles[cur][1] = arFiles[cur][0];
			imgCompress(arFiles, callback);
		}

	});

	//	if (retl.status) {
	//		//图片大小，单位K
	//		var size_k = retl.attribute.size / 1024;
	//
	//		if (size_k <= 100) {
	//			//100K以下不压缩
	//			arFiles[cur][1] = arFiles[cur][0];
	//			imgCompress(arFiles, callback);
	//		} else {
	//			var quality = 0.5;
	//			if (size_k <= 1024) {
	//				//1M以内
	//				quality = 100 / size_k;
	//			} else {
	//				quality = 200 / size_k;
	//			}
	//			quality = quality.toFixed(1);
	//
	//			var imageFilter = api.require('imageFilter');
	//			imageFilter.compress({
	//				img : arFiles[cur][0],
	//				quality : quality,
	//				save : {
	//					album : false,
	//					imgPath : cacheDir,
	//					imgName : fileNewName
	//				}
	//			}, function(ret, err) {
	//				if (ret.status) {
	//					arFiles[cur][1] = cacheDir + "/" + fileNewName;
	//					imgCompress(arFiles, callback);
	//				} else {
	//					arFiles[cur][1] = arFiles[cur][0];
	//				}
	//			});
	//		}
	//	} else {
	//		arFiles[cur][1] = arFiles[cur][0];
	//		imgCompress(arFiles, callback);
	//	}
}

//按字符串 获取图片控件HTML
function imgGetHtmlByStr(str) {
	var rlt = '';
	if (str) {
		var imgHtml = '';
		var arImgs = str.split(';');
		for (var j = 0; j < arImgs.length; j++) {
			var arImg = arImgs[j].split(',');
			//			imgHtml += '<div class="img-box" style="background-image: url(\'' + arImg[1] + '\');background-size:cover;background-position: center;"> <img style="display: none;" src="' + arImg[1] + '" onload="imgload(this);" /></div>';
			imgHtml += '<div class="img-box" style="background-image: url(\'' + arImg[1] + '\');background-size:cover;background-position: center;"> <img style="display: none;width:1px;height:1px;" src="' + arImg[1] + '" /></div>';
		}

		rlt = imgHtml;
	}
	return rlt;
}

function imgGetHtmlByStr_old(str) {
	var rlt = '';
	if (str) {
		var imgHtml = '';
		var arImgs = str.split(';');
		for (var j = 0; j < arImgs.length; j++) {
			var arImg = arImgs[j].split(',');
			imgHtml += '<img   src="' + arImg[1] + '"/>';
			//imgHtml += '<div class="img-box" style="background-image: url(\'' + arImg[1] + '\')"> <img style="display: none;" src="' + arImg[1] + '"/></div>';

		}

		rlt = imgHtml;
	}
	return rlt;
}

function imageCache() {
	var imgDir = 'fs://images/';
	var srcs = $('img.cache');
	if (srcs.length > 0) {
		var imgObj = srcs.first();
		var imgUrl = imgObj.attr('srcs');
		var filename = imgUrl.GetFileName();
		if (imgUrl.length > 0) {
			var fs = api.require('fs');
			fs.exist({
				path : imgDir + filename
			}, function(ret, err) {
				if (ret.exist) {
					imgObj.attr("src", api.fsDir + "/images/" + filename);
					imgObj.attr("srcs", '');
					imgObj.removeClass("cache");
					imageCache();
					//					alert('读取图片缓存：'+imgDir+filename);
				} else {
					api.download({
						url : imgUrl,
						savePath : imgDir + filename,
						report : false,
						cache : true,
						allowResume : true
					}, function(ret, err) {
						if (ret) {
							imgObj.attr("src", ret.savePath);
							imgObj.removeClass("cache");
							imgObj.attr("srcs", '');
							imageCache();
						} else {
							//缓存失败
							imgObj.removeClass("cache");
							imageCache();

							var value = err.msg;
						};
					});
				}
			});

		}
	}
}

function imageCache_byurl(url, callback, data) {
	var imgDir = 'fs://images/';
	var filename = imgDir + url.GetFileName();
	if (url.length > 0) {
		var fs = api.require('fs');
		fs.exist({
			path : filename
		}, function(ret, err) {
			if (ret.exist) {
				//					alert('读取图片缓存：'+filename);
				callback({
					state : true,
					filepath : filename,
					data : data
				});
			} else {
				api.download({
					url : url,
					savePath : filename,
					report : false,
					cache : true,
					allowResume : true
				}, function(ret, err) {
					if (ret) {
						callback({
							state : true,
							filepath : filename,
							data : data
						});
					} else {
						callback({
							state : false,
							filepath : url,
							data : data
						});
					};
				});
			}
		});

	} else {
		callback({
			state : false,
			filepath : url,
			data : data
		});
	}
}
