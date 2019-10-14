/**
 * 移动端富文本编辑器
 * @author ganzw@gmail.com
 * @url    https://github.com/baixuexiyang/artEditor
 */
$.fn.extend({
	_opt: {
		placeholader: '<p>请输入文章正文内容</p>',
		validHtml: [],
		limitSize: 3,
		cus_img_op:false,//自定义图片操作  
		/*
		cus_img_op:{			
			title : '图片选择',
			img_model : 2, //模式 0:拍照 1:相册 2:全部
			max_count : 1, //最大张数
			is_clip : true, //是否裁剪
			is_compress : true, //是否压缩
			type : 'picture',
			callback : function(rlt){}
		},//自定义图片参数
		*/
		showServer: false
	},
	artEditor: function(options) {
		var _this = this,
			styles = {
				"-webkit-user-select": "text",
				"user-select": "text",
				"overflow-y": "auto",
				"text-break": "brak-all",
				"outline": "none",
				"cursor": "text"
			};
		$(this).css(styles).attr("contenteditable", true);
		_this._opt = $.extend(_this._opt, options);
		try{
			if(_this._opt.cus_img_op){//自定义选择图片 就选择img插件处理
				//选择图片处理
				$(_this._opt.imgTar).on('click',function(){ 
					var img_opts=$.extend( {
						title : '图片选择',
						img_model : 2, //模式 0:拍照 1:相册 2:全部
						max_count : 1, //最大张数
						is_clip : false, //是否裁剪
						is_compress : true, //是否压缩
						type : 'picture',
						callback : function(rlt){
						
							if(rlt){
								console.log('返回图片数据-->',rlt);
								if(!$cyz.isArray(rlt)){
									rlt=[rlt];
								}
								if(rlt.length>0){
									var img='';  
									
									for(var i=0;i<rlt.length;i++){ 
										var src=rlt[i] ; 
										img+='</br><img data-id="0" style=" padding-top:10px; " src="'+ src +'"/></br>';
									}
									
									//$cyz.log('图片img',img);
									
									_this.insertImage(img);
								} 
								
							}
							else{
								consol.log(rlt);
							}
							 
							
							//_this.insertImage(img);
						}},_this._opt.cus_img_op);
						
					selImg(img_opts);  
					
				});
			
			}
			else{
				$(_this._opt.imgTar).on('change', function(e) {
					var file  = e.target.files[0];
					e.target.value = '';
					if(Math.ceil(file.size/1024/1024) > _this._opt.limitSize) {
						console.error('文件太大');
						return;
					}
	                var reader = new FileReader();
	                reader.readAsDataURL(file);
	                reader.onload = function (f) {
	                	if(_this._opt.showServer) {
	                		_this.upload(f.target.result);
	                		return ;
	                	}
	            		var img = '<img src="'+ f.target.result +'" style="width:90%;" />';
	            		
	            	    _this.insertImage(img);
	                };
				});
			}
			
			_this.placeholderHandler();
			_this.pasteHandler();
			
			
		} catch(e) {
			console.log(e);
		}
		if(_this._opt.formInputId && $('#'+_this._opt.formInputId)[0]) {
			$(_this).on('input', function() {
				$('#'+_this._opt.formInputId).val(_this.getValue());
			});
		}
		
		return _this;
	},
	upload: function(data) {//如果是自定义 传入的就是callback
		
		var _this = this, filed = _this._opt.uploadField;
		
		if(_this._opt.cus_img_op){//自定义图片操作   
				
			_this.find('img').img_upload(data,2);//上传后回调处理
		}
		else{
		
			$.ajax({
				url: _this._opt.uploadUrl,
				type: 'post',
				data: $.extend(_this._opt.data, {filed: data}),
				cache: false
			})
			.then(function(res) {
				
				var src = _this._opt.uploadSuccess(res);
				
				
				 
				if(src) {
					var img = '<img src="'+ src +'" style="width:90%;" />';
					
				    _this.insertImage(img);
				} else {
					_this._opt.uploadError(res);
				}
			});
		}
		
		
	},
	insertImage: function(src) {
	 	$cyz.log('上传插入',src);
	    $(this).focus();
		var selection = window.getSelection ? window.getSelection() : document.selection;
		var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
		if (!window.getSelection) {
		    range.pasteHTML(src);
		    range.collapse(false);
		    range.select();
		} else {
		    range.collapse(false);
		    var hasR = range.createContextualFragment(src);
		    var hasLastChild = hasR.lastChild;
		    while (hasLastChild && hasLastChild.nodeName.toLowerCase() == "br" && hasLastChild.previousSibling && hasLastChild.previousSibling.nodeName.toLowerCase() == "br") {
		        var e = hasLastChild;
		        hasLastChild = hasLastChild.previousSibling;
		        hasR.removeChild(e);
		    }
		    range.insertNode(range.createContextualFragment("<br/>"));
		    range.insertNode(hasR);
		    if (hasLastChild) {
		        range.setEndAfter(hasLastChild);
		        range.setStartAfter(hasLastChild);
		    }
		    selection.removeAllRanges();
		    selection.addRange(range);
		}
		/*
		$cyz.log('插入中的值',this._opt.formInputId,$('#'+this._opt.formInputId)[0]);
		
		if(this._opt.formInputId && $('#'+this._opt.formInputId)[0]) {
			$('#'+this._opt.formInputId).val(this.getValue());
		}
		*/
		
		$cyz.log('插入后的值',this.getValue());
		
	},
	pasteHandler: function() {
		var _this = this;
		$(this).on("paste", function(e) {
			console.log(e.clipboardData.items);
			var content = $(this).html();
			console.log(content);
			valiHTML = _this._opt.validHtml;
			content = content.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(/<\/ ?tr[^>]*>/gi, "[br]").replace(/<\/ ?td[^>]*>/gi, "&nbsp;&nbsp;").replace(/<(ul|dl|ol)[^>]*>/gi, "[br]").replace(/<(li|dd)[^>]*>/gi, "[br]").replace(/<p [^>]*>/gi, "[br]").replace(new RegExp("<(/?(?:" + valiHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + valiHTML.join("|") + "|img|span)[^\\]]*)\\]", "gi"), "<$1>");
			if (!/firefox/.test(navigator.userAgent.toLowerCase())) {
			    content = content.replace(/\r?\n/gi, "<br>");
			}
			$(this).html(content);
		});
	},
	placeholderHandler: function() {
		var _this = this;
		$(this).on('focus', function() {
			if($.trim($(this).html()) === _this._opt.placeholader) {
				$(this).html('');
			}
		})
		.on('blur', function() {
			if(!$(this).html()) {
				$(this).html(_this._opt.placeholader);
			}
		});

		if(!$.trim($(this).html())) {
			$(this).html(_this._opt.placeholader);
		}
	},
	getValue: function() {
		return $(this).html();
	},
	setValue: function(str) {
		$(this).html(str);
	}
});