let url_config = "" 
if(process.env.NODE_ENV === 'development'){ 
    // 开发环境


	    // url_config ="https://0.0.0.0:42443"
	 
	 // #ifndef  APP-PLUS
	 url_config = 'https://192.168.2.102:19443'
	 // #endif
	 // #ifdef APP-PLUS
	 
	 url_config = 'https://app-api.coinemp.vip'
	 // #endif
}

else{
    // 生产环境
    url_config ="https://app-api.coinemp.vip"

}

export default url_config