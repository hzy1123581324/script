let url_config = "" 
if(process.env.NODE_ENV === 'development'){ 
    // 开发环境
	 // url_config = 'http://test.ukacoin.com'
     // url_config = 'http://192.168.2.112:2039'
	 url_config = 'https://www.bolcke.co'
	 // url_config = 'http://192.168.2.102'
     // url_config = 'http://lc.bds'
    // url_config ="http://192.168.43.145"
      // url_config ="https://www.imbroker.vip"
}

else{
    // 生产环境
    //url_config = 'https://www.iimbroker.com'
    url_config ="https://www.bolcke.co"
	// url_config = 'http://192.168.2.112:2039'
}

export default url_config