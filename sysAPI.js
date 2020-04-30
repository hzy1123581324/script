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
}

export default sysAPI
