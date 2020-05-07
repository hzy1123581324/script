const FormValidation = {

 	/*
 	 *验证两个密码是否相同
 	 * 相同 return true 
 	 * 不相同 提示密码不相同，并且清楚确认密码
 	 * msg： 提示语
 	 */
 	checkSame(pwd = 'param.pwd', pwd2 = 'param.pwd2', msg) {
 		let $pwd = '';
 		let $pwd2 = '';
 		const self = this;
 		// console.log(pwd,'*************************')
 		let pwdKeyList = pwd.split('.');
 		let pwd2KeyList = pwd2.split('.');
 		let template = self;
 		pwdKeyList.forEach((val, index) => {
 			template = template[val];
 		})
 		$pwd = template;

 		template = self;
 		pwd2KeyList.forEach((val, index) => {

 			template = template[val];
 		})
 		$pwd2 = template;
 		template = null;
 		// console.log($pwd,$pwd2,'&&&&&&&&&&&&&&&&&&&&&&&&&&&');

 		if ($pwd === $pwd2) {
 			return true
 		} else {

 			if (pwd2KeyList.length > 1) {
 				this.$set(this[pwd2KeyList.slice(0, -1).join('.')], pwd2KeyList[pwd2KeyList.length - 1], '');
 			} else {
 				this.$set(this, pwd, '');
 			}
 			return this.toast(msg || this.i18n.$validation.pwdunlike)
 		}
 	},

	/*
 	 *验证密码
 	 * 相同 return true 
 	 * 不相同 提示密码不相同，并且清楚确认密码
 	 * msg： 提示语
 	 */
 	checkPwd(pwd = 'param.pwd' ,msg) {
 		let $pwd = this.$getEachVal(pwd);
 		
 		if (!$pwd) {
 			return this.toast(this.i18n.$validation.pwd_into);
 		}
		
		if (!/\w{6,20}/.test($pwd)){
			return this.toast(this.i18n.$validation.pwdErr);
		}
		return true;
 	
 	},

 	/*
 	 *检查邮箱是否合法
 	 * 合法 return true
 	 * 不合法 清除
 	 * 
 	 */
 	checkEmail(email = "param.email", ) {

 		let $email = this.$getEachVal(email);
 		if (!$email) {
 			return this.toast(this.i18n.$validation.email_into);
 		}

 		if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($email)) {
 			return this.toast(this.i18n.$validation.emailErr);
 		}
		return true;
 	},


 	/*
 	 *检查邮箱是否合法
 	 * 合法 return true
 	 * 不合法 清除
 	 * 
 	 */
 	checkPhone(phone = "param.phone", ) {
		let $phone = this.$getEachVal(phone);
 		if (!$phone) {
 			return this.toast(this.i18n.$validation.phone_into);
 		}
		// console.log(!/^1[34578]\d{9}$/.test($phone),'手机验证++++++++++++++++++')
 		if (!/^1[34578]\d{9}$/.test($phone)) {
 			return this.toast(this.i18n.$validation.phoneErr);
 		}
		return true;
 	},
	
	/*
	 *检查支付密码是否合法
	 * 合法 return true
	 * 
	 * 
	 */
	checkPayPwd(payPwd = "param.payPwd",){
		let $payPwd = this.$getEachVal(payPwd);
		if (!$payPwd) {
			return this.toast(this.i18n.$validation.payPwd_into);
		}
		// console.log(!/^1[34578]\d{9}$/.test($phone),'手机验证++++++++++++++++++')
		if (!/^\d{6}$/.test($payPwd)) {
			return this.toast(this.i18n.$validation.payPwd_into);
		}
		return true;
	},
	
	/*
	* 检查身份证是否合法
	*/
   checkIDCard(IDcard='param.id_card'){
	   let $IDcard = this.$getEachVal(IDcard);
	   	// if (!/^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/.test($IDcard)) {
	   	// 	return this.toast(this.i18n.$validation.into_id_number);
	   	// }
	   	return true;
	},
	
	$getEachVal(key){
		let List = key.split('.');
		let template = this;
		List.forEach((val, index) => {
			template = template[val];
		})
		return template;
	}
	
	
	
	
 }

 export default FormValidation;
