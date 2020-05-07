import language from '../../Language/main.js';
const computed = {
	/*
	多语言计算器
	*/
	i18n() {
		// console.log(this.$store.getters.getLangLocale, '**************************locale');
		// console.log(this,'****************************');
		let {
			$$langRoute
		} = this; //手动指定 三种情况，空字符串，路由地址字符串，路由地址一维数组
		const locale = this.$store.getters.getLangLocale;
		let langData = {};
		const common_lang = language[locale].common;
		// let now_lang = 
		let temporary = language[locale];
		// console.log(this,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
		const route_list = (this.Route || this.$mp && this.$mp.page.route || '').split('/');
		// console.log(this.Route,route_list,'哈哈哈哈哈哈哈');
		if (route_list.length == 1) {
			temporary = {}
		} else {
			for (let i = 1; i < route_list.length; i++) {
				// console.log(route_list[i]);
				temporary = temporary[route_list[i]] || {};
				// console.log(route_list[i],temporary);
			}
		}
		// console.log(temporary,common_lang,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
		// let lang = Object.assign(common_lang,temporary, );
		// console.log(lang,common_lang,'这是合成的' )
		return Object.assign(langData, common_lang, temporary, );
	},
	account_txt() {
		if(this.account.indexOf('@')==-1){
			return this.rep_str(this.account || '');
			
		}else{
			return this.account.replace(/(\w{3})\w*(@)/, "$1****$2");
		}
	},
}

class pageComputed{
	/*
	构造器
	*/ 
	constructor(){
		
	}
}


export default computed;
