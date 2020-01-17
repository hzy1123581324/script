import language from '../../Language/main.js';
const computed = {
		i18n() {
			console.log(this.$store.getters.getLangLocale, '**************************locale');
			console.log(this,'****************************');
			const locale = this.$store.getters.getLangLocale;
			const common_lang = language[locale].common;
			// let now_lang = 
			let temporary = language[locale];
			const route_list = (this.Route||'').split('/');
			for (let i = 1; i < route_list.length; i++) {
				console.log(route_list[i]);
				temporary = temporary[route_list[i]]||{};
			}
			console.log(temporary,common_lang,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
			return Object.assign(temporary,common_lang );
		},
}

export default computed;
