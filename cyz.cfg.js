// Global.allURL="http://ubay.daapaa.com/";
Global.allURL="https://dshop.szdato.com/";
// Global.allURL="http://yishi.szdato.com/";
Global.wsURL = Global.allURL + 'SimpleFramework/handler.php'; //后台处理URL
// Global.imgURL = Global.allURL + 'SimpleFramework/fileUpload.php'; //图片文件处理URL
Global.imgURL = Global.allURL + 'app/index.php?c=entry&do=app&m=da_tong_store&s=home/upload';//图片文件处理URL
Global.fileURL = Global.allURL + 'SimpleFramework/fileUpload.php'; //文件处理URL
Global.keditorUpURL = Global.allURL + 'SimpleFramework/plug/kindeditor/upload_json.php'; //富文本框文件上传路径
Global.keditorMgURL = Global.allURL + 'SimpleFramework/plug/kindeditor/file_manager_json.php'; //富文本框文件管理路径
Global.c_ex=Global.c_ex||['w','f','d','s','f','k','c','e','i', 'cm'];//默认插件

var call=callasyn;


Global.call_ajax_para={
    subEnBase64:false,
    rltEnBase64:false,
    type:'GET' //默认为post
};//ajax参数

/*
url : Global.wsURL,

subEnBase64:true,//是否base64编码上传(字符串值)
rltEnBase64:true,//是否返回base64编码(字符串值)
type : 'POST',
contentType : 'application/json; charset=utf-8',
async : true,
dataType : 'json',
*/
/*
weui>
wx_auth.js 微信授权处理  w
fastclick.js 手机页面点击优化 f

easyui>
easyui>edatagrid.js 表格 d
easyui>esearchbox.js 搜索 s
easyui>efilebox.js 文件处理 f
easyui>ecombobox.js 扩展下拉选择 c
easyui>jquery.easyui.editor.ex.js 编辑框 e
   editor/kindeditor-4.1.10/kindeditor.js  k
    editor/kindeditor-4.1.10/lang/zh_CN.js
    easyui/jquery.ekindeditor.js
*/
Global.is_debug=true;
Global.b_sign=80;//默认80
//Global.b_sign :业务标识 如 80:前端用户入口 2:后台管理 9:开发配置平台
if(Global.b_sign==80){//如用户前台 comm.js加b参数
    Global.model=80;
    Global.call_err_inj=function(rlt,err_func){
        if(rlt.op.err_code=='211012'){//这里根据需要拦截的错误码做相应处理
            // $cyz.showError(rlt.op.err_msg,function(){
            //     // window.location.href='/html/login.html';
            // });
            api.toast({
                msg: '请重新登录',
                duration: 2000,
                location: "middle"
            })
            $cyz.closeToWin('root');
;
        }
        else
            err_func(rlt);//如果没有匹配的,就调用默认处理方法
    }
    ;
    /*
    Global.call_err_inj=function(rlt,f){//根据rlt相应处理后,如果有匹配错误码,就拦截,否则就调用f

    }
    */
}
else if(Global.b_sign==90){//后台管理
    Global.model=90;
    Global.title='后台管理';
    Global.call_ajax_para={
        subEnBase64:false,
        rltEnBase64:false,
        type:'POST' //默认为post
    };//ajax参数

    Global.call_err_inj=function(rlt,err_func){
        if(rlt.op.err_code=='211012'){//这里根据需要拦截的错误码做相应处理
            // $cyz.showError(rlt.op.err_msg,function(){
            //     // window.location.href='/html/login.html';
            //     $cyz.closeToWin('login');
;
            // });
            api.toast({
                msg: '请重新登录',
                duration: 2000,
                location: "middle"
            })
            $cyz.closeToWin('root');
;

        }
        else
            err_func(rlt);//如果没有匹配的,就调用默认处理方法
    }
    ;
}
else if(Global.b_sign==99){//开发配置
    Global.model=99;
    Global.is_debug=true;
    Global.title='SimpleFrameword';
    Global.call_ajax_para={
        subEnBase64:false,
        rltEnBase64:false,
        type:'POST' //默认为post
    };//ajax参数

    Global.call_err_inj=function(rlt,err_func){
        if(rlt.op.err_code=='211012'){//这里根据需要拦截的错误码做相应处理
            // $cyz.showError(rlt.op.err_msg,function(){
            //     // window.location.href='/html/login.html';
            //     $cyz.closeToWin('login');
;
            // });
            api.toast({
                msg: '请重新登录',
                duration: 2000,
                location: "middle"
            })
            $cyz.closeToWin('root');
;

        }
        else
            err_func(rlt);//如果没有匹配的,就调用默认处理方法
    }
    ;
}
