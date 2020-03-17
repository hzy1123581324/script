import language from '../../Language/main.js';
const computed = {
		i18n() {
			// console.log(this.$store.getters.getLangLocale, '**************************locale');
			// console.log(this,'****************************');
			const locale = this.$store.getters.getLangLocale;
			const common_lang = language[locale].common;
			// let now_lang = 
			let temporary = language[locale];
			// console.log(this.Route,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
			const route_list = (this.Route||'').split('/');
			// console.log(route_list,'哈哈哈哈哈哈哈');
			if(route_list.length==1){
				temporary = {}
			}else{
				for (let i = 1; i < route_list.length; i++) {
					console.log(route_list[i]);
					temporary = temporary[route_list[i]]||{};
					console.log(route_list[i],temporary);
				}
			}
			// console.log(temporary,common_lang,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
			return Object.assign(temporary,common_lang );
		},
}

export default computed;
