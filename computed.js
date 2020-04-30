import language from '../../Language/main.js';
const computed = {
		/*
		多语言计算器
		*/ 
		i18n() {
			// console.log(this.$store.getters.getLangLocale, '**************************locale');
			// console.log(this,'****************************');
			const locale = this.$store.getters.getLangLocale;
			let langData = {};
			const common_lang = language[locale].common;
			// let now_lang = 
			let temporary = language[locale];
			// console.log(this,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
			const route_list = (this.$mp&&this.$mp.page.route||'').split('/');
			// console.log(this.Route,route_list,'哈哈哈哈哈哈哈');
			if(route_list.length==1){
				temporary = {}
			}else{
				for (let i = 1; i < route_list.length; i++) {
					// console.log(route_list[i]);
					temporary = temporary[route_list[i]]||{};
					// console.log(route_list[i],temporary);
				}
			}
			// console.log(temporary,common_lang,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
			// let lang = Object.assign(common_lang,temporary, );
			// console.log(lang,common_lang,'这是合成的' )
			return Object.assign(langData,common_lang,temporary, );
		},
}

export default computed;
