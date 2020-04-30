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
	
	copy(data,msg) { //复制到粘贴板
	
		//console.log(value);
		uni.setClipboardData({
			data: data.toString(),
			success: (res) => {
				if(msg != 'none'){
				
					this.toast(msg||this.i18n.copySuccess, //复制成功
						)
				}else{
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
}

export default sysAPI
