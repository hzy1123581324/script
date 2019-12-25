import language from '../../Language/main.js';
const computed = {
		i18n() {
			console.log(this.$store.getters.getLangLocale, '**************************locale');
			console.log(this,'****************************');
			const locale = this.$store.getters.getLangLocale;
			const common_lang = language[locale].common;
			// let now_lang = 
			let temporary = language[locale];
			const route_list = this.Route.split('/');
			for (let i = 1; i < route_list.length; i++) {
				console.log(route_list[i]);
				if(temporary[route_list[i]]){
					temporary = temporary[route_list[i]];
				}else{
					// uni.showToast({
					// 	title: '该页面没有语言包',
					// 	icon: 'none'
					// })
					// throw '该页面没有语言包';
				}
			}
			console.log(temporary,common_lang,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
			return Object.assign(common_lang, temporary);
		},
}

export default computed;
