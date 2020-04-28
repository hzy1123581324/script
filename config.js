let url_config = "" 
if(process.env.NODE_ENV === 'development'){ 
    // 开发环境
	 url_config = 'https://192.168.2.200:42443'
}

else{
    // 生产环境
    url_config ="https://www.bolcke.co"

}

export default url_config