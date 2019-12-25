

const LifeCycle = {
	props:{
		pageState:{
			type: String,
			default: ''
		},
		show: {
			type: Boolean,
			default: false,
		}
	},
	watch:{
		show(newval){
			if(newval){
				if(this.onshow){
					this.onshow();
				}else{
					console.log('onshow未定义')
				}
				
			}else{
				if(this.onhide){
					this.onhide();
				}else{
					console.log('onhide未定义')
				}
			}
		}
	},
	mounted() {
	},
	destroyed() {
	},
	
}
export {LifeCycle};




