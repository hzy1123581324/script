
/**
 *cyz工具操作js
 *
 * */
//var console=console||{log:function(){return;}}
//var wr_log=(function(){var rtn={a:3,log:function(){console.log.apply(this,arguments)}}; return rtn;;}());
//全局参数定义
var global_url = "http://weizhang.hnwfll.com/";
var Global = {
    //目录参数
    defJs: 'api',//默认JS框架
    baseJS: '',//js目录
    wsURL: '',
    fileURL: '',
    imgAllURL:global_url,
    imgURL: '',//图片处理URL
    allURL: '',
    c_ex: false,//js扩展 ,默认所有都引入
    model: 80,
    b_sign: '',//业务标识,与业务相关 如 80:普通用户手机端 90:后台管理 99:开发配置
    call_err_inj: false,//接口错误注入方法
    call_ajax_para: {},
    is_debug: false,
    Interface: {
        //接口请求全部是post
        login: global_url + 'index/login/index',
				/*
				登录成功（code为1，返回用户数据（暂时全部返回））；登录失败（code为0）
				*/

				province : global_url + 'index/province/index',
				/*

				获取省份，成功（code为1，返回省份简称和ID）；失败（code为0）；

				*/

				city : global_url + 'index/city/index',
				/*

				获取车牌前缀，成功（code为1，返回牌前缀和ID）；失败（code为0）；

				*/

				car : global_url + 'index/car/index',
				/*

				获取车型，成功（code为1，返回牌前缀和ID）；失败（code为0）；

				*/

                car_number: global_url + 'index/violate/car_number',
				/*
						车牌识别接口，识别成功（code为1，返回车牌号）；识别失败（code为0）；
						传参：参数为image，值为手机拍照获取的图片（图片大小不能超过4M）base64加密后的字符串
				*/

                violate_chapter_query: global_url + 'index/violate/violate_chapter',
				/*
						违章查询接口，传参：1.car_type（车型（默认为02小车（除广东地区外，其他地区只支持02小车）：01 大型汽车 ,02 小型汽车 ,
						03 使馆汽车 ,04 领馆汽车 ,05 境外汽车 ,06 外籍汽车 ,07 两三轮摩托车,08 轻便摩托车,09 使馆摩托车 ,10 领馆摩托车,11 境外摩托车 ,12 外籍摩托车 ,
						13 农用运输车 ,14 拖拉机 ,15 挂车,16 教练汽车 ,17 教练摩托车,26 香港入境车,27 澳门入境车），2.car_prefix（车牌号前缀（urlencode编码），例如：粤A，粤B），3.car_number（车牌号）
						4.chejiahao（车架号），5.fadongji（发动机号），6.省份 province（例如："广东省"，urlencode编码），7.市区 city（例如："广州市"，urlencode编码）
						8.超证检测 super_evidence（0为不超证检测（默认），1为超证检测），9.实时查询 real_query（0为不实时查询（默认），1为实时查询），10.车牌号码 car_number
						11.车辆性质 car_nature  (0为个人车，1为单位车)，12.用户ID：参数member_id
				*/

				province_city: global_url + 'index/city/province_city',
				/*
						违章查询地区（省份和市区）选择接口
				*/

                upload_images: global_url + 'index/order/upload_images',
                /*
                        上传行驶证接口，限制5M以下的图片,单个上传图片，传参 file（base64图片，不用过滤头部 ，原原本本的base64数据）
                */

				self_submit_order: global_url + 'index/order/self_submit_order',
				/*
						违章自助下单,提交行驶证正反面，查询违章，为待审核订单，平台重新报价后审核通过，审核通过后成为待付款订单。
						传参：行驶证正本 driving_license_just_image（base64加密），行驶证副本 driving_license_back_image（base64加密），车牌前缀 car_prefix，车牌号码 car_number，
						发动机号 fa_dong_ji，车架号 che_jia_hao，备注 remark，预留手机号码 mobile，用户ID member_id（用户ID）
				*/

                message: global_url + 'index/message/index',
                /*
                        消息接口：传参 receive_user_id （用户ID），消息类型：type（0为系统消息，1为通知消息）
                */

                message_detail: global_url + 'index/message/detail',
                /*
                        消息接口：传参 message_id （消息ID）
                */

                order_list: global_url + 'index/order/index',
                /*
                        我的订单列表：传参 status（订单状态：0为待付款，1为已付款，3为已分配，4为处理中，5为已完成，6处理失败，7为待审核），传参用户ID：member_id
                */

                payment: global_url + 'index/order/payment',
                /*
                        立即付款，传参 order_id（订单ID），返回订单数据（一个订单下面有多个违章记录，record里面就是违章记录）
                */

                cancel: global_url + 'index/order/cancel',
                /*
                        取消订单，传参 order_id（订单ID），返回成功失败信息
                */

                delete: global_url + 'index/order/delete',
                /*
                        删除订单，传参 order_id（订单ID），返回成功失败信息，已付款订单不能删除
                */

                password_reset: global_url + 'index/member/password_reset',
                /*
                    密码重置接口，传参 password（密码），手机号码 mobile，用户ID：参数member_id
                */

                recharge: global_url + 'index/member/recharge',
                /*
                    充值记录，用户ID参数 member_id  ，时间参数：开始时间（start_time），结束时间（end_time）
                */

                order_detail: global_url + 'index/order/order_detail',
                /*
                    订单详情，用户ID参数 member_id  ，订单ID参数：order_id
                */

                handle_index: global_url + 'index/order/handle_index',
                /*
                        违章查询页面接口，查询记录列表显示，传参 member_id（用户ID）
                */
                cancel_handle: global_url + 'index/order/cancel_handle',
                /*
                    取消办理（其实就是删除），用户ID参数 member_id  ，订单ID参数：order_id
                */

                handle: global_url + 'index/order/handle',
                /*
                    前往办理，用户ID参数 member_id  ，订单ID参数：order_id（其实就是查询记录ID）
                */

                pay: global_url + 'index/order/pay',
                /*
                   订单页面立即付款，用户ID参数 member_id  ，订单ID参数：order_id
                */

                go_handle: global_url + 'index/order/go_handle',
                /*
                   去办理下单，
                   非本人本车（传参）：query_order_id（查询订单ID），query_order_record_ids（查询订单记录ID），is_self（是否本人本车：0为本人，1为他人），
                   driving_license_just_image（行驶证正面），driving_license_back_image（行驶证反面），mobile（车主电话），member_id（用户ID）

                   本人本车（传参）：query_order_id（查询订单ID），query_order_record_ids（查询订单记录ID），is_self（是否本人本车：0为本人，1为他人），
                   driving_license_just_image（行驶证正面），driving_license_back_image（行驶证反面），mobile（车主电话），
                   drive_license_just_image（驾驶证正面），drive_license_back_image（驾驶证反面），drive_name（驾驶人姓名），drive_code（驾驶证档案编号），
                   drive_number（驾驶证号码），drive_license_mobile（考驾照电话号码），member_id（用户ID）

                */

                handle_query: global_url + 'index/order/handle_query',
                /*
                    违章查询记录接口，参数：member_id（用户ID）

                */

                history_query: global_url + 'index/violate/history_query',
                /*
                    历史查询记录，返回所有数据，参数：member_id（用户ID）

                */
                license_plate_query: global_url + 'index/violate/license_plate_query',
                /*
                    输入车牌，查询到车牌有关信息，传参：car_number（车牌号码）

                */

                pay_order: global_url + 'index/order/pay_order',
                /*
                    支付订单页面，传参：member_id（用户ID），order_id（订单ID），返回所有数据

                */
                member: global_url + 'index/member/member',
                /*
                    个人中心页面，传参：member_id（用户ID），返回所有数据

                */



    },//后端请求接口

    page_extend: function (obj) {//扩展页面参数
        $.extend(true, Global.page, obj);
    },

    u: {},
    req_header: function (a, b) { return $cyz.setAndGetStorage('req_header', a, b); },
    comm: function (a, b) { return $cyz.setAndGetStorage('comm', a, b); },
    user: function (a, b) { return $cyz.setAndGetStorage('user', a, b); },
    page: {
        dlgs: {},
        tbs: {},
        datas: {
            yesno: [{ code: 1, name: '是' }, { code: 0, name: '否' }],
            state: [{ code: 1, name: '启用' }, { code: 0, name: '禁用' }]
        },

        funcs: {}

    }

	/*
    pageparas:{


    },//页面参数
    comm:{

    },
    user:false
	*/

};

/**********************************************字符串扩展功能**********************************************/
//字符串对象检测是否为空
String.prototype.IsNullOrEmpty = function () {
    var obj = this;
    var flag = false;
    if (obj == null || obj == undefined || typeof (obj) == 'undefined' || obj == '') {
        flag = true;
    } else if (typeof (obj) == 'string') {
        obj = obj.trim();
        if (obj == '') {//为空
            flag = true;
        } else {//不为空
            obj = obj.toUpperCase();
            if (obj == 'NULL' || obj == 'UNDEFINED' || obj == '{}') {
                flag = true;
            }
        }
    }
    else {
        flag = false;
    }
    return flag;
};
//右取字符串
String.prototype.Right = function (len) {

    if (isNaN(len) || len == null) {
        len = this.length;
    }
    else {
        if (parseInt(len) < 0 || parseInt(len) > this.length) {
            len = this.length;
        }
    }

    return this.substring(this.length - len, this.length);
};

// 清除两边的空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
// 合并多个空白为一个空白
String.prototype.ResetBlank = function () {
    var regEx = /\s+/g;
    return this.replace(regEx, ' ');
};

// 保留数字
String.prototype.GetNum = function () {
    var regEx = /[^\d]/g;
    return this.replace(regEx, '');
};

// 保留中文
String.prototype.GetCN = function () {
    var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
    return this.replace(regEx, '');
};

// String转化为Number
String.prototype.ToInt = function () {
    return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
};

// 得到字节长度
String.prototype.GetLen = function () {
    var regEx = /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/;
    if (regEx.test(this)) {
        return this.length * 2;
    } else {
        var oMatches = this.match(/[\x00-\xff]/g);
        var oLength = this.length * 2 - oMatches.length;
        return oLength;
    }
};

// 获取文件全名
String.prototype.GetFileName = function () {
    var regEx = /^.*\/([^\/\?]*).*$/;
    return this.replace(regEx, '$1');
};

// 获取文件扩展名
String.prototype.GetExtensionName = function () {
    var regEx = /^.*\/[^\/]*(\.[^\.\?]*).*$/;
    return this.replace(regEx, '$1');
};

//替换所有
String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};
String.prototype.format = function (args) {
    var result = this;
    var para_arr = result.match(/\{[^\}]+\}/g);//获取{}匹配的内容 含大括号
    if (para_arr == null)//没匹配到时,返回原
        return result;

    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {

            for (var i = 0; i < para_arr.length; i++) {//遍历匹配到的数组
                var para = para_arr[i];//含括号
                var para_val = para.substr(1, para.length - 2);//值
                var p_arr = para_val.split("##");//拆分参数

                var p = p_arr[0];
                if (p.length > 0 && args[p] != 'undefined') {//参数
                    var v = args[p];
                    if (p_arr.length > 1) {//有特殊处理时
                        if (p_arr[1] == 'img') {//如果是图片地址显示
                            // 以分号分隔,再以逗号分隔,取第二个
                            var v1_arr = v.split(";");
                            var v2_arr = v1_arr[0].split(",");
                            if (v2_arr.length > 1) {
                                v = v2_arr[1];
                            }

                        }
                        else if (p_arr[1] == 'bigimg') {//如果是图片地址显示
                            if (Global.is_debug)
                                $cyz.log(args, '图片地址');

                            // 以分号分隔,再以逗号分隔,取第二个
                            var v1_arr = v.split(";");
                            var v2_arr = v1_arr[0].split(",");
                            if (v2_arr.length > 1)
                                v = v2_arr[1].replace('thumbnail/', '');
                        }
                        else if (p_arr[1] == 'eval' && p_arr.length > 2) {
                            var v1 = p_arr[2];

                            var arrEntities = {
                                '&lt;': '<',
                                '&gt;': '>',
                                '&nbsp;': ' ',
                                '&amp;': '&',
                                '&quot;': '"',
                                "@@": v || v == 0 ? v + '' : ''
                            };
                            // v1 = v1.replace(new RegExp("@@", 'g'), "'" + v + "'");
                            v1 = v1.replace(/(&(lt|gt|nbsp|amp|quot);)|(@@)/ig, function (all, t) {
                                return arrEntities[all + ""];
                            });
                            v = eval("(" + v1 + ")");
                        }

                    }

                    result = result.replace(para, v || v == 0 ? v : "");//替换数据

                }

            }
            result = result.replace(new RegExp("(data-src)", "g"), "src");

        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

//格式化字符串
String.Format = function () {
    if (arguments.length == 0) {
        return '';
    }

    if (arguments.length == 1) {
        return arguments[0];
    }

    var reg = /{(\d+)?}/g;
    var args = arguments;
    var result = arguments[0].replace(reg, function ($0, $1) {
        return args[parseInt($1) + 1];
    });
    return result;
};











/**********************************************数字扩展功能**********************************************/
// 数字补零
Number.prototype.LenWithZero = function (oCount) {
    var strText = this.toString();
    while (strText.length < oCount) {
        strText = '0' + strText;
    }
    return strText;
};

// Unicode还原
Number.prototype.ChrW = function () {
    return String.fromCharCode(this);
};


/**********************************************数组扩展功能**********************************************/
// 数字数组由小到大排序
Array.prototype.Min2Max = function () {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] < this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};

// 数字数组由大到小排序
Array.prototype.Max2Min = function () {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] > this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};

// 获得数字数组中最大项
Array.prototype.GetMax = function () {
    var oValue = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i] > oValue) {
            oValue = this[i];
        }
    }
    return oValue;
};

// 获得数字数组中最小项
Array.prototype.GetMin = function () {
    var oValue = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i] < oValue) {
            oValue = this[i];
        }
    }
    return oValue;
};


/**********************************************日期扩展功能**********************************************/
// 获取当前时间的中文形式
Date.prototype.GetCNDate = function () {
    var oDateText = '';
    oDateText += this.getFullYear().LenWithZero(4) + new Number(24180).ChrW();
    oDateText += (this.getMonth() + 1).LenWithZero(2) + new Number(26376).ChrW();
    oDateText += this.getDate().LenWithZero(2) + new Number(26085).ChrW();
    oDateText += this.getHours().LenWithZero(2) + new Number(26102).ChrW();
    oDateText += this.getMinutes().LenWithZero(2) + new Number(20998).ChrW();
    oDateText += this.getSeconds().LenWithZero(2) + new Number(31186).ChrW();
    oDateText += new Number(32).ChrW() + new Number(32).ChrW() + new Number(26143).ChrW() + new Number(26399).ChrW() + new String('26085199682010819977222352011620845').substr(this.getDay() * 5, 5).ToInt().ChrW();
    return oDateText;
};
//扩展Date格式化
Date.prototype.Format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": ("00" + this.getMilliseconds()).Right(3) //毫秒
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {

            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
}


Date.prototype.Diff = function (interval, objDate) {
    //若参数不足或 objDate 不是日期类型則回传 undefined
    if (arguments.length < 2 || objDate.constructor != Date) { return undefined; }
    switch (interval) {
        //计算秒差
        case 's': return parseInt((objDate - this) / 1000);
        //计算分差
        case 'n': return parseInt((objDate - this) / 60000);
        //计算時差
        case 'h': return parseInt((objDate - this) / 3600000);
        //计算日差
        case 'd': return parseInt((objDate - this) / 86400000);
        //计算周差
        case 'w': return parseInt((objDate - this) / (86400000 * 7));
        //计算月差
        case 'm': return (objDate.getMonth() + 1) + ((objDate.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
        //计算年差
        case 'y': return objDate.getFullYear() - this.getFullYear();
        //输入有误
        default: return undefined;
    }
}

Date.prototype.DateAdd = function (strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
};

















//公共方法
(function (window) {
    var u = {};
    var isAndroid = (/android/gi).test(navigator.appVersion);

    var uzStorage = function () {
        var ls;
        try {
            ls = window.localStorage;
        } catch (ex) {

            console.warn(ex);
        }
        return ls;
    };

    u.loadJs = function (url, success) {

        var domScript = document.createElement('script');
        domScript.src = url;
        success = success || function () { };

        //domScript.onload = domScript.onreadystatechange = function() {
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            domScript.onreadystatechange = function () {
                if ('loaded' === this.readyState || 'complete' === this.readyState) {
                    success();
                    this.onload = this.onreadystatechange = null;
                    this.parentNode.removeChild(this);
                }
            }
        } else {
            domScript.onload = function () {
                success();
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
            }
        }
        document.getElementsByTagName('head')[0].appendChild(domScript);

    };


    u.isArray = function (obj) {//判断是否是数组
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    //生成数组数据
    u.getArrData = function (d) {
        var data = [];
        if ($cyz.isArray(d)) {
            if (d.length > 1) {//超过一个时,判断第二个是数组还是json
                if ($cyz.isArray(d[1]))//就是紧凑列表方式
                    data = $cyz.crkvdatas_arr(d);
                else if ($cyz.isJson(d[1]))
                    data = d;//取所有
            }
            else if (d.length == 1 && $cyz.isJson(d[0])) {// 只有一行时,判断列表是紧凑数据还是正常数据 根据第一个
                var json = d[0];
                var ar_col = [];
                var i = 0;
                //取对应的值
                for (var item in json) {
                    var colval = json[item];
                    colval = colval == null ? '' : json[item].toString();
                    ar_col.push(colval);
                    i++;
                }
                var is_comp = true;//是否紧凑数据
                for (var j = 0; j < i; j++) {
                    if (ar_col.indexOf(j.toString()) < 0)//有一个不符合规则时,就是正常数据
                        is_comp = false;
                }

                if (!is_comp)//如果不是紧凑列表数据时,就取         如果是就为空数据
                    data = d;
            }
        }
        else if ($cyz.isJson(d)) {//为json时
            data = [d];
        }

        return data;
    };


    u.hasObj = function (str) {
        if (typeof str == 'undefined') return false;

        try {
            var o = str.toString();
            return eval(' typeof ' + o + ' !="undefined" ');
        } catch (ex) {
            console.warn(ex);
            return false;
        }

    };

    u.isJson = function (obj) {
        var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isjson;
    };

    u.getVal = function (k, d) {//o:对象,子级用.表示,def:默认值(未取到时用默认值)
        var r = d;//默认值为 undefined
        if (typeof k != 'string' || k == '') return d;//不是字符串时,返回默认值
        try {
            r = eval('(' + k + ')');
            if (typeof r == 'undefined')
                r = d;
        } catch (ex) {//出错时,赋值默认值
            r = d;
        }

        return r;
    };

    u.setStorage = function (key, value) {
        if (arguments.length === 2) {
            var v = value;
            if (typeof v == 'object') {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
            var ls = uzStorage();
            if (ls) {
                ls.setItem(key, v);
            }
        }
    };
    u.getStorage = function (key) {
        var ls = uzStorage();
        if (ls) {
            var v = ls.getItem(key);
            if (!v) {
                return;
            }
            if (v.indexOf('obj-') === 0) {
                v = v.slice(4);
                return JSON.parse(v);
            } else if (v.indexOf('str-') === 0) {
                return v.slice(4);
            }
        }
    };
    u.rmStorage = function (key) {
        var ls = uzStorage();
        if (ls && key) {
            ls.removeItem(key);
        }
    };



    //设置和获取本地存储
    u.setAndGetStorage = function (key, a, b) {
        return $cyz.setAndGet(
            function (a1) {
                var o = $cyz.getStorage(key);
                if ($cyz.isJson(o)) return o[a1];
                //return $cyz.getStorage(key)[a1];
            },
            function () {//取所有值
                return $cyz.getStorage(key);

            },
            function (a1, b1) {//赋值
                var u = $cyz.getStorage(key);
                u = $.extend(true, {}, u, eval('({' + a1 + ':"' + b1 + '"})'));
                $cyz.setStorage(key, u);
                return u;
            },
            function (a1) {
                var u = $cyz.getStorage(key);
                if (a1 == null) {
                    u = a1;
                }
                else
                    u = $.extend(true, {}, u, a1);
                $cyz.setStorage(key, u);
                return u;

            }, a, b);//通用赋值取值操作
    };
    //get:单取值(字符串变量) getall(取所有值) set:赋值(按字符串变量) setall:赋值所有json对象 a,b 操作数
    u.setAndGet = function (func_get, func_getall, func_set, func_setall, a, b) {//通用赋值取值操作

        var a_type = typeof a;
        var b_type = typeof b;
        if (a_type != 'undefined') {//有值时
            if ($cyz.isJson(a)) {//如果是json格式 ,就把参数赋值到dialog,并返回对象
                return func_setall(a);
            }
            else {//如果不是 判断是否是string,如果也不是,就不做处理
                if (a_type == 'string') {//字符串时,根据b判断赋值还是取值
                    if (b_type == 'undefined') {//没有b时,取值
                        return func_get(a);
                    }
                    else {//赋值
                        return func_set(a, b);
                    }

                }
                else {//不是字符串时 不处理,返回对象
                    if (a == null)
                        return func_setall(a);
                    else
                        return func_setall({});

                }
            }
        }
        else {//没有值,直接返回整个参数对象
            return func_getall();

        }
    };

    u.strToJson = function (str) {
        if (typeof str === 'string') {
            try {
                //return  JSON && JSON.parse(str);
                var v = eval('(' + str + ')');
                if ($cyz.isJson(v) || $cyz.isArray(v))
                    return v;
                else
                    return undefined;
            } catch (ex) {
                console.warn(str, ex);
                return undefined;
            }

        }
        else if ($cyz.isJson(str))
            return str;
        else
            return undefined;
    };

    u.jsonToStr = function (json) {
        if ($cyz.isJson(json) || $cyz.isArray(json))
            return JSON && JSON.stringify(json);
        else if (typeof json == 'undefined' || json == null)
            return '';
        else
            return json.toString();

    };

    u.toStr = function (json) {
        if ($cyz.isJson(json) || $cyz.isArray(json))
            return JSON && JSON.stringify(json);
        else if (typeof json == 'undefined' || json == null)
            return '';
        else
            return json.toString();

    };



    u.inArray = function (stringToSearch, arrayToSearch) {//判断是否在数组中
        for (s = 0; s < (u.isArray(arrayToSearch) ? arrayToSearch : [arrayToSearch]).length; s++) {
            thisEntry = arrayToSearch[s].toString();
            if (thisEntry == stringToSearch) {
                return true;
            }
        }
        return false;
    };


    u.checkMobile = function (str) {//验证手机号
        var re = /^1\d{10}$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    };
    u.checkDate = function (str) {//验证日期
        if (/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test(str)) {
            return true;
        }
        else
            return false;
    };

    u.checkTel = function (str) {//验证固定电话

        if (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(str)) {
            return true;
        }
        else
            return false;
    };

    u.checkIDCard = function (str) {//验证身份证

        if (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(str)) {
            return true;
        }
        else
            return false;
    };

    u.checkRegExp = function (regobj, str) {//按正则表达式验证 reg为字符串或正则对象
        try {
            var reg = regobj;
            if (typeof reg == 'String')
                reg = eval('/' + reg + '/');
            if (reg.test(str))
                return true;
            else
                return false;
        } catch (ex) {
            console.warn('正则处理失败', regobj, ex);
            return false;
        }
    };


    u.getUrlPara = function (name, url) //取url参数
    {
        var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式
        var r = null;
        if (url)
            r = url.match(reg);
        else
            r = window.location.search.substr(1).match(reg);  //匹配目标参数

        if (r != null) return unescape(r[2]); return null; //返回参数值
    };


    u.removeUrlPara = function (paramKey, r) //取url参数
    {
        // var reg = new RegExp("(^|&|/?)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式
        var url = null;
        if (r)
            url = r;
        else
            url = window.location.href;  //匹配目标参数

        var rKeys = [];
        if (typeof paramKey == 'string') {
            rKeys = [paramKey];
        }
        else if ($cyz.isArray(paramKey)) {
            rKeys = paramKey;
        }

        var urlParam = url.substr(url.indexOf("?") + 1);
        var beforeUrl = url.substr(0, url.indexOf("?"));
        var nextUrl = "";

        var arr = new Array();
        if (urlParam != "") {
            var urlParamArr = urlParam.split("&");

            for (var i = 0; i < urlParamArr.length; i++) {
                var paramArr = urlParamArr[i].split("=");

                if (!$cyz.inArray(paramArr[0], rKeys)) {//没在移除范围内
                    arr.push(urlParamArr[i]);
                }


            }
        }

        if (arr.length > 0) {

            nextUrl = (beforeUrl == "" ? "" : "?") + arr.join("&");
        }

        url = beforeUrl + nextUrl;
        return url;


    };


    u.getDouble = function (obj) {//获取小数
        var result = 0.00;
        var objStr = (obj == null || (typeof obj == 'undefined')) ? '' : obj.toString();

        result = parseFloat(objStr);
        return result;
    };


    u.getTimeStr = function (second) {
        var str = '';
        var s = parseInt(second);
        return Math.floor(s / 60 / 60 / 24) + '天' + Math.floor(s / 60 / 60 % 24) + '小时' + Math.floor(s / 60 % 60) + '分' + Math.floor(s % 60) + '秒';
		/*
		var d=(date/(60*60*24))>>0;
		var h=((date-60*60*24*d)/(60*60))>>0;
		var m=((date-60*60*24*d-60*60*h)/(60))>>0;
		var s=(date-60*60*24*d-60*60*h-60*m)>>0;
		if(d>0){
			str+=d+'天';
		}
		if(date/(60*60)>0){
			str+=h+'小时'
		}
		if(data/60>0){
			str+=m+'分';
		}
		if(date>0){
			str+=s+'秒'
		}
		return str
		*/
    }

    u.crDate = function (str) { //创建日期对象
        if (typeof (str) == 'string') {
            str = str.split('-');
            var date = new Date();
            date.setUTCFullYear(str[0], str[1] - 1, str[2]);
            date.setUTCHours(0, 0, 0, 0);
            return date;
        }
        else
            return new Date(str.Format('yyyy-MM-dd'));
    };


    //获取本周第一天日期 返回日期对象
    u.getweekfirst = function (d) {
        var dd = (typeof (d) == 'string') ? new Date(d) : d;//取日期
        var date = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();

        var nowDayOfWeek = date.getDay();
        if (0 == nowDayOfWeek) {
            nowDayOfWeek = 7;
        }
        return new Date(y, m, d - nowDayOfWeek + 1);
    };

    //获取本周最后一天日期 返回日期对象
    u.getweeklast = function (d) {
        var dd = (typeof (d) == 'string') ? new Date(d) : d;//取日期
        var date = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();
        var nowDayOfWeek = date.getDay();
        if (0 == nowDayOfWeek) {
            nowDayOfWeek = 7;
        }
        return new Date(y, m, d + (6 - nowDayOfWeek + 1));
    };



    //获取本月第一天日期 返回日期对象
    u.getmonthfirst = function (d) {
        var dd = (typeof (d) == 'string') ? new Date(d) : d;//取日期
        var date = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
        var y = date.getFullYear();
        var m = date.getMonth();
        return new Date(y, m, 1);
    };

    //获取本月最后一天 返回日期对象
    u.getmonthlast = function (d) {
        var dd = (typeof (d) == 'string') ? new Date(d) : d;//取日期
        var date = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        date.setDate(date.getDate() - 1);

        return date;
    };

    //明天
    u.getdatenext = function (d) {
        var dd = (typeof (d) == 'string') ? new Date(d) : d;//取日期
        var date = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
        date.setDate(date.getDate() + 1);
        return date;
    };

    //获取日期 按前后天数 + -表示
    u.getdatebynum = function (d, AddDayCount) {
        var dd = (typeof (d) == 'string') ? new Date(d) : d;//取日期
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        return dd;
    };

    u.splitbypunc = function (s) {

        var ss = [];
        ss.push(s);
        ss.push('');

        var m = s.match(/[^，;。？！：\s,;.?!:]+(?=[，;。？！：\s,;.?!:])/g);
        if (m == null) {
            ss[0] = s.substring(0, 18);
            ss[1] = s.substring(18);
        }
        else {

            var idx = s.indexOf(m[0]) + m[0].length;
            if (idx > 18) {
                ss[0] = s.substring(0, 18);
                ss[1] = s.substring(18);
            }
            else {
                ss[0] = m[0];
                ss[1] = s.substring(idx + 1);
            }

        }

        return ss;

    };


    //u.log = function (obj,info){//写日志
    u.log = function () {//写日志 修改 参数不限
        if (Global.is_debug && arguments.length > 0) { //最后一个参数表示
            var rlt = [];
            for (var i = 0; i < arguments.length; i++) {
                var s = $cyz.jsonToStr(arguments[i]);
                rlt.push(s);
            }

            console.log(rlt);
        }
		/*
        if(Global.is_debug){
            var s=typeof info=='undefined'?'':info;
            console.log(s,obj);
        }
        */

    };

    u.isFunction = function (funcName) {
        try {
            if (typeof (eval(funcName)) == "function") {
                return true;
            }
        } catch (e) { }
        return false;
    };

    u.confirm = function (msg, callback) {
        if ("undefined" == typeof msg) return;

        if (confirm(msg)) {
            callback();
        }
    };


    //重写prompt
    u.prompt = function (p1, p2, p3) {
        if ("undefined" == typeof p1) return;

        var title = '输入';
        var msg = '';
        var f = function (r) { console.log(r); };
        var v = null;
        if (arguments.length == 1)
            msg = p1;
        else if (arguments.length == 2) {
            if (typeof p2 == 'function') {
                msg = p1;
                f = p2;
            }
            else {
                title = p1;
                msg = p2;
            }
        }
        else if (arguments.length > 2) {
            title = p1;
            msg = p2;
            if (typeof p3 == 'function')
                f = p3;
        }

        v = prompt(msg, '');
        if (v && typeof callback == 'function') {
            f(v);
        }

        /*
    if($cyz.hasCusObj()){

        $.messager.prompt(title, msg, function(r){
            if (r){
                f(r);
            }
        });

    }
    else{
        v=prompt(msg,'');
        if(v&&typeof callback=='function'){
            f(v);
        }
    }*/

    };



    //显示消息  在不同环境中重写
    u.showAlert = function (msg, callback) {
        if ("undefined" == typeof msg) return;

        var msg_show = msg;
        if ($cyz.isJson(msg)) {
            msg_show = $cyz.jsonToStr(msg);
        }
        msg_show&&alert(msg_show);
        if (typeof callback == 'function') {
            callback();
        }

    };

    //显示错误 在不同环境中重写
    u.showError = function (msg, callback) {
        if ("undefined" == typeof msg) return;
        var msg_show = msg;
        if ($cyz.isJson(msg)) {
            msg_show = $cyz.jsonToStr(msg);
        }
        msg_show&&alert(msg_show);
        if (typeof callback == 'function') {
            callback();
        }

    };



    //验证空值dom对象
    u.valiNull = function (obj, isAlert) {
        var isSunc = true;
        var err = '未输入值';
        $(obj).each(function (i, r) {
            var val = '';
            if (r.tagName == 'INPUT' || r.tagName == 'TEXTAREA') {//文本
                val = $(r).val();
            }
            else
                val = $(r).html();

            if ($(r).attr('data-nullerror'))
                err = $(r).attr('data-nullerror');
            if (val.trim() == '') {
                $(r)[0].focus();
                isSunc = false;
                return false;
            }
        });
        if (!isSunc && isAlert) {
            $cyz.showError(err);
        }

        return isSunc;
    };




    //对象值验证为空
    u.valiNullVal = function (val, errMsg) { //如果是字符串 判断为空 如果是数组[[32,'不能为空'],[]] 并且为空 就取配置的字符串消息
        isSuc = true;
        var msg = typeof errMsg == 'undefined' ? '' : errMsg;

        if (typeof val === 'string') {
            if (val == '') {
                msg = errMsg ? errMsg : msg;
                $cyz.showError(msg);
                isSuc = false;
            }
        }
        else {//二维数组
            for (var i = 0; i < val.length; i++) {
                if (typeof val[i][0] === 'string' && val[i][0] == '' || typeof (val[i][0]) === 'boolean' && val[i][0]) {
                    msg = val[i][1] ? val[i][1] : msg;
                    isSuc = false;
                    break;
                }
            }
        }
        if (msg != '')
            $cyz.showError(msg);
        return isSuc;
    };

    u.dataVali = function (objs) {//验证元素数据 从data-vali取值验证
        var isSucc = true;
        $.each(objs, function (i, o) {
            var s = $(o);
            if (typeof (s.attr("data-vali")) != "undefined") {//如果有验证参数,就取值
                var valis = [];
                try {
                    valis = eval('(' + s.attr("data-vali") + ')');
                } catch (ex) { console.warn(ex) };

                if ($cyz.isArray(valis)) {
                    //取值
                    var v = '';
                    if (s[0].tagName == 'INPUT' || s.tagName == 'TEXTAREA') {//文本
                        v = s.val();
                    }
                    else
                        v = s.html();

                    for (var i = 0; i < valis.length; i++) {
                        var vali = valis[i];
                        if (vali.length > 0) {//有值
                            var t = vali[0];
                            var len = v.length;
                            var p1 = vali.length > 1 ? vali[1] : '';
                            var p2 = vali.length > 2 ? vali[2] : '';
                            var p3 = vali.length > 3 ? vali[3] : '';
                            var errMsg = p2;//默认第三个为错误消息
                            var numberV = parseFloat(v);
                            if (isNaN(numberV))
                                numberV = 0;

                            if (t == 'notnull') {//非空
                                if (len == 0) {
                                    isSucc = false;
                                    if (p1.length > 0) errMsg = p1;
                                    else errMsg = '值不能为空!';
                                }
                            }
                            else if (t == 'eq') {//等于
                                if (v != p1) {//不等于指定字符时
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '值不相等!';
                                }

                            }
                            else if (t == 'mobile') {//手机
                                if (len > 0 && !$cyz.checkMobile(v)) {
                                    isSucc = false;
                                    if (p1.length > 0) errMsg = p1;
                                    else errMsg = '手机号格式不正确!';
                                }
                            }
                            else if (t == 'tel') {//电话

                                if (len > 0 && !$cyz.checkTel(v)) {
                                    isSucc = false;
                                    if (p1.length > 0) errMsg = p1;
                                    else errMsg = '电话号码格式不正确!';
                                }

                            }
                            else if (t == 'IDCard') {//身份证

                                if (len > 0 && !$cyz.checkIDCard(v)) {
                                    isSucc = false;
                                    if (p1.length > 0) errMsg = p1;
                                    else errMsg = '身份证号码格式不正确!';
                                }

                            }
                            else if (t == 'date') {//日期

                                if (len > 0 && !$cyz.checkDate(v)) {
                                    isSucc = false;
                                    if (p1.length > 0) errMsg = p1;
                                    else errMsg = '日期格式不正确!';
                                }

                            }
                            else if (t == 'zint') {//正整数
                                if (len > 0 && !/^\d+$/.test(v)) {
                                    isSucc = false;
                                    if (p1.length > 0) errMsg = p1;
                                    else errMsg = '请输入有效整数!';
                                }

                            }
                            else if (t == 'zdecimal') {//正数字
                                if (len > 0 && !/^\d+\.?\d*$/.test(v)) {
                                    isSucc = false;
                                    if (p1.length > 0) errMsg = p1;
                                    else errMsg = '请输入有效数字!';
                                }

                            }
                            else if (t == 'gr') {//大于
                                if (len > 0 && numberV <= p1) {
                                    isSucc = false;
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '输入值要求大于' + p1;
                                }

                            }
                            else if (t == 'greq') {//大于等于
                                if (len > 0 && numberV < p1) {
                                    isSucc = false;
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '输入值要求大于等于' + p1;
                                }

                            }
                            else if (t == 'le') {//小于
                                if (len > 0 && numberV >= p1) {
                                    isSucc = false;
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '输入值要求小于' + p1;
                                }

                            }
                            else if (t == 'leeq') {//小于等于
                                if (len > 0 && numberV > p1) {
                                    isSucc = false;
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '输入值要求小于等于' + p1;
                                }

                            }
                            else if (t == 'lengr') {//长度大于
                                if (len <= p1) {
                                    isSucc = false;
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '输入长度要求大于' + p1;
                                }

                            }
                            else if (t == 'lengreq') {//长度大于等于
                                if (len < p1) {
                                    isSucc = false;
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '输入长度要求大于等于' + p1;
                                }

                            }
                            else if (t == 'lenle') {//长度小于
                                if (len >= p1) {
                                    isSucc = false;
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '输入长度要求小于' + p1;
                                }

                            }
                            else if (t == 'lenleeq') {//长度小于等于
                                if (len > p1) {
                                    isSucc = false;
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '输入长度要求小于等于' + p1;
                                }
                            }
                            else if (t == 'regexp') {//正则
                                if (len > 0 && !$cyz.checkRegExp(p1, v)) {
                                    isSucc = false;
                                    if (p2.length > 0) errMsg = p2;
                                    else errMsg = '请输入有效数据';
                                }

                            }


                            if (isSucc == false) {//如果有错误,就退出
                                $cyz.showError(errMsg);
                                return false;
                            }

                        }

                    }
                }


            }



        });
        return isSucc;
    };


    //通用进度窗口
    u.showProgress = function (msg, options) {
        var title = '正在提交...';
        if (arguments.length > 0)
            title = msg;
        var opts = $.extend({ title: title, modal: false }, options);
        title&&alert(title);

        //此处处理效果

    };

    //隐藏进度窗口
    u.hideProgress = function (msg, options) {
        //此处隐藏效果
        ;
    };




    //搜索json数组 按值搜索对象 arr:json数组,contions:条件 名称和值 {id:3,name:'a'} 可多个 返回数组
    u.seljsonarr = function (arr, marry, nomarry) {
        var rlt = {
            idx: -1,
            val: false,
            vals: []
        };

        if (!arr) return rlt;
        if (!marry && !nomarry) return rlt;

        var ar_marry = [];
        var ar_nomarry = [];

        for (var i = 0; i < arr.length; i++) {
            var source = arr[i];

            var is = true;
            //条件配置
            if ($cyz.isJson(marry))
                ar_marry = [marry];
            else if ($cyz.isArray(marry))
                ar_marry = marry;
            if ($cyz.isJson(nomarry))
                ar_nomarry = [nomarry];
            else if ($cyz.isArray(nomarry))
                ar_nomarry = nomarry;

            //匹配条件判断 多个用或
            var isok = true;//匹配条件是否通过
            for (var j = 0; j < ar_marry.length; j++) {
                var condi = ar_marry[j];
                isok = true;//初始通过
                for (var item in condi) {
                    if (source[item] != condi[item]) {//如果不匹配
                        isok = false;
                        break;
                    }
                }
                if (isok) break; //通过一次,就算通过
            }

            if (!isok) continue;//如果条件不通过,就继续下一个数据
            //不匹配条件判断 多个用或
            for (var j = 0; j < ar_nomarry.length; j++) {
                var condi = ar_nomarry[j];
                isok = true;//初始通过
                for (var item in condi) {
                    if (source[item] == condi[item]) {//如果匹配 表示不通过
                        isok = false;
                        break;
                    }
                }
                if (isok) break; //通过一次,就算通过
            }

            if (isok) {//如果通过了
                if (rlt.idx == -1) {
                    rlt.idx = i;
                    rlt.val = arr[i];
                }
                rlt.vals.push(arr[i]);
            }
        }


        return rlt;

    };











    //数据编解码处理

    //md5加密
    u.encodeMd5 = function (string) {
        var rotateLeft = function (lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
        var addUnsigned = function (lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            if (lX4 | lY4) {
                if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }
        var F = function (x, y, z) {
            return (x & y) | ((~x) & z);
        }
        var G = function (x, y, z) {
            return (x & z) | (y & (~z));
        }
        var H = function (x, y, z) {
            return (x ^ y ^ z);
        }
        var I = function (x, y, z) {
            return (y ^ (x | (~z)));
        }
        var FF = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };
        var GG = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };
        var HH = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };
        var II = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };
        var convertToWordArray = function (string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWordsTempOne = lMessageLength + 8;
            var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
            var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };
        var wordToHex = function (lValue) {
            var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValueTemp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
            }
            return WordToHexValue;
        };
        var uTF8Encode = function (string) {

            string = string.replace(/\x0d\x0a/g, "\x0a");

            var output = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    output += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    output += String.fromCharCode((c >> 6) | 192);
                    output += String.fromCharCode((c & 63) | 128);
                } else {
                    output += String.fromCharCode((c >> 12) | 224);
                    output += String.fromCharCode(((c >> 6) & 63) | 128);
                    output += String.fromCharCode((c & 63) | 128);
                }
            }
            return output;
        };
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

        string = uTF8Encode(string);
        x = convertToWordArray(string);
        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a; BB = b; CC = c; DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }
        var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
        return tempValue.toLowerCase();





    };


    //另外: 如果不想json中的数字也被字符串化. 可以改造: return /^(string|number)$/.test(typeof s) ? '"' + s + '"' : s; 为 : return /^(string)$/.test(typeof s) ? '"' + s + '"' : s; (其实就是把number类型的忽略掉而已)

    //JSON对象中的字符串类型,64位转码为16位
    u.StringToJson_decodebase64 = function (o) {

        if (o == undefined)
            return null;

        if (typeof o == "string") return $cyz.decode_base64(o.toString());

        if (typeof o == "object") {
            if (!o.sort) {
                for (var i in o)
                    o[i] = $cyz.StringToJson_decodebase64(o[i]);


            } else {
                for (var i = 0; i < o.length; i++)
                    o[i] = $cyz.StringToJson_decodebase64(o[i]);
            }
        }

        return o;


    };


    u.JsonToString_encodebase64 = function (o) {

        var sing = "\""; //单引号标识 \"
        if (o == undefined) {
            return "";
        }
        var r = [];
        if ((typeof o == "string"))
            return sing + $cyz.encode_base64(o.toString()) + sing;
        else if (typeof o == "number" || typeof o == "boolean")
            return o.toString();

        if (typeof o == "object") {
            if (typeof o['sort'] != 'function') {
                for (var i in o)
                    r.push("\"" + i + "\":" + $cyz.JsonToString_encodebase64(o[i]));
                if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push("toString:" + o.toString.toString());
                }
                r = "{" + r.join() + "}"
            } else {
                for (var i = 0; i < o.length; i++)
                    r.push($cyz.JsonToString_encodebase64(o[i]))
                r = "[" + r.join() + "]";
            }
            return r;
        }
        return o.toString().replace(/\"\:/g, '":""');
    };






    u.base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    u.base64DecodeChars = new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);


    u.base64encode = function (str) {
        var out, i, len;
        var c1, c2, c3;

        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += $cyz.base64EncodeChars.charAt(c1 >> 2);
                out += $cyz.base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += $cyz.base64EncodeChars.charAt(c1 >> 2);
                out += $cyz.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += $cyz.base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += $cyz.base64EncodeChars.charAt(c1 >> 2);
            out += $cyz.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += $cyz.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += $cyz.base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    };


    u.encode_base64 = function (str) {
        if (typeof str == 'undefined' || str == null)
            return '';
        else if ($cyz.isJson(str)) {
            return $cyz.base64encode($cyz.utf16to8($cyz.jsonToStr(str)));
        }
        else
            return $cyz.base64encode($cyz.utf16to8(str.toString()));
    };

    u.decode_base64 = function (str, is_obj) {
        if (typeof str != 'string')
            return undefined;
        else {
            var rlt = $cyz.utf8to16($cyz.base64decode(str));

            if (is_obj) {
                return eval('(' + rlt + ')');
            }
            else
                return rlt;
        }

    };



    u.base64decode = function (str) {
        var c1, c2, c3, c4;
        var i, len, out;

        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = $cyz.base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;

            /* c2 */
            do {
                c2 = $cyz.base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;

            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = $cyz.base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;

            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = $cyz.base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    };

    u.utf16to8 = function (str) {
        var out, i, len, c;

        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    };


    u.utf8to16 = function (str) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    };




    //数据转换处理.....................
    u.crdicdata_arr = function (arr, pk) { // [{id:3,name:'张三'},{id:4,name:'陈七'}]  ==> {"3":{id:3,name:'张三'},"4":{id:4,name:'陈七'}}
        if (!$cyz.isArray(arr))
            arr = [arr];
        var rlt = {};
        for (var i = 0; i < arr.length; i++) {
            rlt[arr[i][pk]] = arr[i];
        }
        return rlt;
    };




    //创建键值对数据,按列表数据  [{id:0,name:1},[1,'abc']] ==> {id:1,name:'abc'}
    u.crkvdata_arr = function (arr) {

        var newval = {};

        if ($cyz.isJson(arr))
            newval = $.extend(true, {}, arr);
        else if ($cyz.isArray(arr)) {//数组才处理
            var is_tbdata = true;//默认为数据处理格式  [{id:0,name:1},[1,'abc']]

            if (arr.length > 1) {
                if ($cyz.isJson(arr[1])) //第二个也是json,就取第一个数据
                    newval = arr[0];
                else {//按tbdata处理
                    newval = {};
                    var cols = arr[0];
                    //列
                    for (var item in cols) {
                        if (typeof cols[item] === 'string' || typeof cols[item] === 'number') {
                            var idx = parseInt(cols[item]);
                            //索引
                            newval[item] = arr[1][cols[item]];
                        }
                    }
                }
            }
            else {//只有一项时
                for (var k in arr[0]) {//如果值中有一个不是数字,就不是tbdata
                    if (typeof arr[0][k] != 'number') {
                        newval = arr[0];
                        break;
                    }
                }
            }
        }

        return newval;

    };

    //创建键值对数据,按列表数据  [{id:0,name:1},[1,'abc']] ==> [{id:1,name:'abc'}]
    u.crkvdatas_arr = function (arr) {

        var rlt = [];
        if ($cyz.isArray(arr)) {
            if (arr.length > 0) {
                var col = arr[0];
                for (var i = 1; i < arr.length; i++) {
                    rlt.push($cyz.crkvdata_arr([col, arr[i]]));
                };
            }
        }


        return rlt;
    };


    //创建表数据,按json 属性 按键值对生成 {id:1,name:'abc'} ==> [{cKey:0,cVal:1},['id',0],['name','abc']]
    u.crtbdata_keyval = function (options) {
        var tb = [];
        tb.push({
            cKey: 0,
            cVal: 1
        });

        var idx = 1;
        for (var item in options) {
            tb.push([item, options[item]]);
        }
        return tb;
    };

    //创建表数据,按json 属性字符 一行列 一行数据 [{id:1,name:'abc'},{id:2,name'bcd'}] ==>[{id:0,name:1},[1,'abc'],[2,'bcd]]
    u.crtbdata = function (arr) {

        if (!$cyz.isArray(arr))
            arr = [arr];

        var tb = [];
        tb.push({});
        var def_row = [];

        var idx = 1;
        for (var i = 0; i < arr.length; i++) {
            //第一行,先取列
            if (i == 0) {
                for (var item in arr[i]) {
                    tb[0][item] = idx - 1;
                    idx++;
                    def_row.push('');
                }
            }


            var row = [];

            for (var j = 0; j < def_row.length; j++) {
                row.push('');

            }


            for (var item in tb[0]) {
                row[tb[0][item]] = arr[i][item] == undefined ? row[tb[0][item]] : arr[i][item];

            }

            tb.push(row);
        }
        return tb;
    };




    //位置坐标换算
    u.getDis = function (lon1, lat1, lon2, lat2) {
        var mi = getDistance(lon1, lat1, lon2, lat2);
        if (mi >= 1000)
            mi = (mi / 1000).toFixed(2) + '公里';
        else
            mi = mi + '米';
        return mi;
    };

    //百度地图坐标拾取系统        http://api.map.baidu.com/lbsapi/getpoint/index.html
    u.getDistance = function (lon1, lat1, lon2, lat2) {
        var R = 6371393;
        var X1 = lon1 * Math.PI / 180;
        var Y1 = lat1 * Math.PI / 180;
        var X2 = lon2 * Math.PI / 180;
        var Y2 = lat2 * Math.PI / 180;
        var d = R * Math.acos(Math.cos(Y1) * Math.cos(Y2) * Math.cos(X1 - X2) + Math.sin(Y1) * Math.sin(Y2));
        return Math.round(d);
    };



    //停止 事件
    u.stopEvent = function (e) {
        var ev = e || window.event;
        if (ev.stopPropagation) {

            ev.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
            //兼容IE
        }
    };


    /**********************************通讯处理 **********************************/
    u.callasyn = function (options) {
        var def_data = {
            sign: '',
            //ckcode:'',
            //opcode:'',
            //token:'',
            //uid:0,
            //utype:0,
            //ltype:0,
            /*
            para:[],
            npara:{},
            ext:{},
            tbs:{},
            */
            async: true//,
            //data:new $cyz.utlObj.ObjResult()
        };
        var data = {};
        if (options) {
            if (options['npara']) data['npara'] = options['npara'];
            if (options['ext']) data['ext'] = options['ext'];
            if (options['para']) data['para'] = options['para'];
            if (options['tbs']) data['tbs'] = options['tbs'];
            delete options['npara'];
            delete options['ext'];
            delete options['para'];
            delete options['tbs'];
        };
        if (!data['ext']) data['ext'] = {};
        data['ext']['lang'] = 'zh';
        if (localStorage.getItem('locale')) data['ext']['lang'] = localStorage.getItem('locale')
        var opts = $.extend(true, def_data, options, { data: data });

        //console.log('opts',opts);

        /*
            opts.data.info.sign=opts.sign;

            opts.data.info.ckcode=opts.ckcode;
            opts.data.info.opcode=opts.opcode;

            opts.data.info.token=opts.token;
            opts.data.info.uid=opts.uid;

            opts.data.info.utype=opts.utype;
            opts.data.info.ltype=opts.ltype;

            opts.data.para=opts.para;
            opts.data.npara=opts.npara;
            opts.data.ext=opts.ext;
            opts.data.tbs=opts.tbs;
            opts.data.info.uid=opts.uid;

            delete opts['sign'];
            delete opts['ckcode'];
            delete opts['opcode'];
            delete opts['token'];
            delete opts['para'];
            delete opts['ext'];
            delete opts['npara'];
            delete opts['tbs'];
            delete opts['uid'];
            delete opts['utype'];
            delete opts['ltype'];*/


        return $cyz.call_data(opts);
    };


    //数据处理
    u.call_data = function (options) {

        var opts = {
            sign: '',
            data: {},
            url: Global.wsURL,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            async: true,
            dataType: 'json',
            subEnBase64: true,//是否base64编码上传(字符串值)
            rltEnBase64: true,//是否返回base64编码(字符串值)
            load_msg: '',
            cache: false,//缓存
            func_listen: false,//监听函数
            //func_ckcode:false,//校验码规则 默认为空  外部传入处理
            //func_opcode:false,//操作码规则 默认为空  外部传入生成标识
            //func_token:false,//用户token鉴权标识码 默认为空  外部传入生成
            //func_before:false,//调用前
            func_sunc_before: false,//调用成功时
            func_sunc: false,//成功后调用函数
            func_error: false,//失败调用函数
            func_timeout: false,//超时方式  方法时,进入超时方法 为数字时 表示重试次数
            func_end: false,//结束调用方式
            timeout_sec: 10000, //默认超时时长

            is_html: false//是否取html类型值
        };

        $.extend(true, opts, Global.call_ajax_para, options);//引入配置的ajax参数


        //监听函数
        var _func_listen = function () {
            ;
        }


        if (opts.func_listen)
            _func_listen = opts.func_listen;


        _func_listen('开始监听请求过程');


        opts.is_html = opts.url.toLocaleLowerCase().indexOf(".asmx") < 1;


        /*
        if(typeof opts.func_ckcode == 'function'){//校验码
            opts.data.info.ckcode=opts.func_ckcode(opts.data);
        };
        if(typeof opts.func_opcode == 'function'){//操作标识
            opts.data.info.opcode=opts.func_opcode(opts.data);
        };
        if(typeof opts.func_token == 'function'){//鉴权码
            opts.data.info.token=opts.func_token(opts.data);
        };
        */



        //是否是HTML格式上传的,要根据url判断
        var result = new $cyz.utlObj.ObjResult();


        //var _sign=opts.data.info.sign;
        var _sign = opts.sign;


        _func_listen('定义处理函数(超时,成功,失败,成败拦截等)');
        //超时方法
        var _func_timeout = function (rlt) {
            if (typeof opts.func_timeout == 'function') {
                opts.func_timeout(rlt, excute);
            }
            else if (isNaN(opts.func_timeout)) {//如果是数字 表示重试次数
                if (opts.func_timeout > 0) {
                    opts.func_timeout--;
                    excute(opts);
                }
                else {
                    _func_error('连接服务器超时', rlt);

                }
            }
            else
                _func_error('连接服务器超时', rlt);
        };

        var _func_before = function (opts) {
            if (opts.load_msg.length > 0) {
                $cyz.showProgress({
                    title: opts.load_msg,
                    modal: false
                });
            }
            if (typeof opts.func_before == 'function')
                opts.func_before(rlt);
        };

        var _func_end = function (rlt) {
            if (typeof opts.func_end == 'function')
                opts.func_end(rlt);
        };

        //错误拦截方法
        var func_err_inj = function (ret) {
            var err_func = function (r1) {//错误处理方法
                if (opts.func_error)
                    opts.func_error(r1);
                else
                    console.info(r1.op.err_msg);
                _func_end(r1);
            }

            if (typeof Global.call_err_inj == 'function') { //如果需要拦截
                Global.call_err_inj(ret, err_func);
            }
            else {
                err_func(ret);
            }
        }



        //成功调用中执行的方法
        var _func_sunc = function (html, rlt) {
            var json = false;
            try {

                if (html) {
                    var rHtml = null;



                    if (typeof html['d'] != 'undefined') {
                        rHtml = html.d;
                        //rHtml=eval('('+html.d+')'); //可能会执行代码
                    }
                    else {
                        //rHtml=eval('('+html+')');
                        rHtml = html;
                    }

                    //console.log('rhtml',opts.rltEnBase64,rHtml);

                    if (opts.rltEnBase64)
                        json = $cyz.StringToJson_decodebase64($cyz.strToJson(rHtml));
                    else
                        json = $cyz.strToJson(rHtml);

                }
                else
                    throw '返回数据无效';


            } catch (ex) {
                console.error('解析json出错:', ex, html);
                rlt.op.succ = 0;
                rlt.op.err_msg = '解析json出错:' + ex;
                rlt.op.err_code = '10000';
            }



            $.extend(true, rlt, json);

            // if(Global.is_debug)
            $cyz.log(rlt, '接口[' + _sign + ']调用--' + (rlt.op.succ == '0' ? '失败' : '成功'));

            if (rlt.op.succ == "0") {

                func_err_inj(rlt);
            } else {
                if (typeof opts.func_sunc_before == 'function') {//处理成功时
                    opts.func_sunc_before(rlt);
                }
                if (typeof opts.func_sunc == 'function') {
                    opts.func_sunc(rlt);
                }
                _func_end(rlt);
            }

        };

        //失败方法中调用的默认方法
        var _func_error = function (error, rlt) {
            rlt.op.succ = 0;
            rlt.op.err_msg = error;
            func_err_inj(rlt);
        };



        if (typeof opts.data != 'object') {//数据不是对象时
            if (opts.load_msg.length > 0) {
                $cyz.hideProgress();
            }

            _func_listen('判断提交对象', "格式不正确", opts.data);

            _func_error('要处理的数据格式不正确!', result);
            return result;
        }


        //处理opts.data数据, 如果某些数据为空,可不传入,减少数据量
        // info.ckcode info.token info.opcode info.uid info.utype info.ltype para npara tbs ext
        // op去掉
        // delete opts.data.op;
        // if(opts.data.info.ckcode=='') delete opts.data.info.ckcode;
        // if(opts.data.info.token=='') delete opts.data.info.token;
        // if(opts.data.info.opcode=='') delete opts.data.info.opcode;
        // if(opts.data.info.uid==0) delete opts.data.info.uid;
        // if(opts.data.info.utype==0) delete opts.data.info.utype;
        // if(opts.data.info.ltype==0) delete opts.data.info.ltype;
        /*
         if(!opts.data.para.length) delete opts.data.para;
         if($.isEmptyObject(opts.data.npara)) delete opts.data.npara;
         if($.isEmptyObject(opts.data.tbs)) delete opts.data.tbs;
         if($.isEmptyObject(opts.data.ext)) delete opts.data.ext;
         */

        //if(Global.is_debug)
        //$cyz.log(opts.data,'接口['+opts.data.info.sign+']提交对象');
        $cyz.log(opts.data, '接口[' + opts.sign + ']提交对象');


        _func_listen('提交对象值', opts.data);




        opts['data_str'] = "";
        //根据处理的URL修改数据类型
        if (opts.is_html) {//是ASHX时,可获取参数WEBSERVICE
            opts.data_str = opts.subEnBase64 ? $cyz.JsonToString_encodebase64(opts.data) : $cyz.jsonToStr(opts.data);
            opts.data = {
                jsonStr: opts.data_str
            };
            opts.contentType = "application/x-www-form-urlencoded";
            opts.dataType = "html";
        } else {
            opts.data_str = opts.subEnBase64 ? $cyz.JsonToString_encodebase64(opts.data) : $cyz.jsonToStr(opts.data);
            opts.data = "{'jsonStr':'" + opts.data_str + "'}";

        }

        _func_listen('提交对象转码后的值', opts.data);


        if (!opts['header']) {//如果没有传入header,才赋值

            opts['header'] = { sign: opts['sign'], model: Global.model };//

            //头部信息
            var header = Global.req_header();
            if (header) {

                for (var k in header) {//添加到头部信息中
                    if (k != 'cksecret')//cksecret不用传 应该保存在本地
                        opts['header'][k] = header[k];
                }
                opts['header']['tm'] = new Date().getTime();
                //操作码 取15位
                opts['header']['opcode'] = $cyz.encodeMd5(header['usign'] + header['token'] + opts['data_str'] + opts['header']['tm']).substr(0, 15);

                //根据数据对象及加密串生成
                if (header['cksecret']) {
                    var header_ckcode = $cyz.encodeMd5(header['usign'] + navigator.userAgent + opts['data_str'] + header['cksecret']);
                    opts['header']['ckcode'] = header_ckcode.substr(0, 15);
                }
            }

            _func_listen('生成的header参数', opts['header']);
        }
        else {
            _func_listen('外部传入的header参数', opts['header']);
        }


        _func_listen('调用执行请求前函数');
        _func_before(opts);


        var excute = function (exec_opts) {
            var opts_para = exec_opts || opts;
            $.ajax({
                data: opts_para.data,
                timeout: opts_para.timeout_sec, //超时时间设置，单位毫秒
                type: opts_para.type,
                contentType: opts_para.contentType,
                url: opts_para.url,
                async: opts_para.async,
                dataType: opts_para.dataType,
                cache: opts_para.cache,
                success: function (html) {
                    _func_listen('接收数据', html);
                    if (opts_para.load_msg.length > 0) {
                        $cyz.hideProgress();
                    }
                    _func_sunc(html, result);
                },
                beforeSend: function (request) {//添加头部信息

                    if (opts_para['header']) {
                        _func_listen('发送前注入header参数', opts_para['header']);
                        for (var k in opts_para['header']) {//添加到头部信息中
                            request.setRequestHeader(k, opts_para['header'][k]);
                        }
                    }
                },
                error: function (xml, status) {
                    _func_listen('接收错误', status, xml);

                    if (opts_para.load_msg.length > 0) {
                        $cyz.hideProgress();
                    }
                    if (status == 'timeout') {
                        result.op.cErrCode = '-100';
                        //超时标识
                        result.op.err_msg = '超时';
                        result.succ = '0';
                        _func_timeout(result);

                    } else
                        _func_error(xml.responseText, result);


                }
            })
        };

        //调用前执行方式


        excute(opts);

        return result;

    };


    /**
     * 动态加载JS options二个参数
     * @param {string} url 脚本地址
     * @param {function} callback  回调函数
     */
    u.load_js = function (options) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = options.url;
        if (typeof (options.callback) == 'function') {
            script.onload = script.onreadystatechange = function () {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                    options.callback();
                    script.onload = script.onreadystatechange = null;
                }
            };
        }
        head.appendChild(script);
    };

    /*
    * @function 动态加载css文件
    * @param {string} options.url -- css资源路径
    * @param {function} options.callback -- 加载后回调函数
    * @param {string} options.id -- link标签id
    */
    u.load_css = function (options) {
        var url = options.url,
            callback = typeof options.callback == "function" ? options.callback : function () { },
            id = options.id,
            node = document.createElement("link"),
            supportOnload = "onload" in node,
            isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536, // webkit旧内核做特殊处理
            protectNum = 300000; // 阈值10分钟，一秒钟执行pollCss 500次

        node.rel = "stylesheet";
        node.type = "text/css";
        node.href = url;
        if (typeof id !== "undefined") {
            node.id = id;
        }
        document.getElementsByTagName("head")[0].appendChild(node);

        // for Old WebKit and Old Firefox
        if (isOldWebKit || !supportOnload) {
            // Begin after node insertion
            setTimeout(function () {
                pollCss(node, callback, 0);
            }, 1);
            return;
        }

        if (supportOnload) {
            node.onload = onload;
            node.onerror = function () {
                // 加载失败(404)
                onload();
            }
        } else {
            node.onreadystatechange = function () {
                if (/loaded|complete/.test(node.readyState)) {
                    onload();
                }
            }
        }

        function onload() {
            // 确保只跑一次下载操作
            node.onload = node.onerror = node.onreadystatechange = null;

            // 清空node引用，在低版本IE，不清除会造成内存泄露
            node = null;

            callback();
        }

        // 循环判断css是否已加载成功
        /*
        * @param node -- link节点
        * @param callback -- 回调函数
        * @param step -- 计步器，避免无限循环
        */
        function pollCss(node, callback, step) {
            var sheet = node.sheet,
                isLoaded;

            step += 1;

            // 保护，大于10分钟，则不再轮询
            if (step > protectNum) {
                isLoaded = true;

                // 清空node引用
                node = null;

                callback();
                return;
            }

            if (isOldWebKit) {
                // for WebKit < 536
                if (sheet) {
                    isLoaded = true;
                }
            } else if (sheet) {
                // for Firefox < 9.0
                try {
                    if (sheet.cssRules) {
                        isLoaded = true;
                    }
                } catch (ex) {
                    // 火狐特殊版本，通过特定值获知是否下载成功
                    // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
                    // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
                    // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
                    if (ex.name === "NS_ERROR_DOM_SECURITY_ERR") {
                        isLoaded = true;
                    }
                }
            }

            setTimeout(function () {
                if (isLoaded) {
                    // 延迟20ms是为了给下载的样式留够渲染的时间
                    callback();
                } else {
                    pollCss(node, callback, step);
                }
            }, 20);
        }
    }
        ;



    //对象属性
    u.utlObj = {
        ObjResult: function (is_sub) {//通用操作对象 不是提交时, 有op参数

            //this.info = { sign: '',ckcode:'',opcode:'',token:'',uid:0,utype:0,ltype:0};    //sign:标识 ckcode:校验码(调用接口校验）  opcode:操作码(本次操作标识)
            if (!is_sub)
                this.op = { succ: '1', msg: '', err_msg: '', err_code: '0' };

            this.ext = {};
            this.para = [];
            this.npara = {};
            this.tbs = {};

        }

    };
    window.$cyz = u;







    /**********************************************初始化参数处理**********************************************/
    //取URL信息
    var cyz_scripts = document.getElementsByTagName("script");
    var cyz_surl = cyz_scripts[cyz_scripts.length - 1].getAttribute("src");

    var cyzwebtype = $cyz.getUrlPara('cyzwebtype', cyz_surl)
    if (cyzwebtype == null)
        cyzwebtype = Global.defJs;//默认框架
    var cyzctls = $cyz.getUrlPara('c', cyz_surl);
    if (cyzctls != null) {//扩展JS
        Global.c_ex = cyzctls.split(',');
    }

    var cyzbsign = $cyz.getUrlPara('b', cyz_surl);
    if (cyzbsign != null && cyzbsign.length > 0) {//扩展JS
        Global.b_sign = cyzbsign;
    }

    cyz_surl = cyz_surl == null ? '' : cyz_surl.substr(0, cyz_surl.lastIndexOf('/') + 1);

    Global.baseJS = (cyz_surl == null ? '' : cyz_surl.substr(0, cyz_surl.lastIndexOf('/') + 1));
    Global.allURL = window.location.protocol + "//" + window.location.host + '/'; //url域名

    Global.replaceJsStr = '<script type="text/javascript" src="' + Global.baseJS + '{jsaddr}' + '"></script>';


    /**********************************************加载其他js文件**********************************************/
    //加载第三方
    // document.write('<script type="text/javascript" src="'+Global.baseJS+'cyz.web.js?a='+(new Date())+'"></script>');

    document.write(Global.replaceJsStr.format({ jsaddr: 'cyz.cfg.js' }));
    /*document.write(Global.replaceJsStr.format({jsaddr:'cyz.util.img.js'}));*/
    document.write(Global.replaceJsStr.format({ jsaddr: 'cyz.web.' + cyzwebtype + '.js' }));


})(window);

//异步调用 d:数据 sfunc:成功回调 efunc:失败回调 tfunc:超时回调 endfunc:结束后回调
callasyn = function (d) {

    var opts = {
        func_sunc: false,
        func_error: function (rlt) {//默认错误处理方式1
            $cyz.showError(rlt.op.err_msg);
            //console.log(rlt.op.err_msg+'('+rlt.op.err_code+')');
        },
        func_timeout: function (rlt, func) {

            if ($cyz.confirm("服务器超时,是否重试?")) {
                if (typeof func == 'function')
                    func();
            }/*
			else
				$cyz.hideProgress();
            */
        }
    };
    opts = $.extend(true, {}, opts, d);
    return $cyz.callasyn(opts);
}


//文件上传 t: img *
function upload_file(file, t, c, is_last) {

    var type = t || 'file';
    var callback = function (r) { };
    if (typeof c == 'function')
        callback = c;
    var file_type = "data";//扩展名
    if (file) {
        var pos = file.name.lastIndexOf(".");
        file_type = file.name.substring(pos + 1, file.name.length)
    }
    else {
        $cyz.showError('请选择文件!');
        return false;

    }

    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
    if (type == 'img') {
        if (!/image\/\w+/.test(file.type)) {
            $cyz.showError('请选择图片文件上传!');
            return false;
        }
    }
    var result = new $cyz.utlObj.ObjResult();

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {



        // if(loading_msg!=false){
        $cyz.showProgress({
            title: '正在上传,请稍候...',
            modal: true
        });
        //}

        //console.log('图片BASE64数据',this.result.substring(0,50));
        $.ajax({
            type: 'POST',
            url: Global.fileURL,
            data: { type: type, file_type: file_type, data: this.result },
            dataType: "json",
            success: function (html) {
                console.log('html', html);

                if (is_last !== false)
                    $cyz.hideProgress();


                if (html) {

                    //console.log('上传返回数据',html);

                    if ($cyz.isJson(html)) {
                        $.extend(result, html);
                    }
                    else {
                        if (typeof html['d'] != 'undefined') {
                            $.extend(result, eval('(' + html.d + ')'));
                        }
                        else
                            $.extend(result, eval('(' + html + ')'));
                    }

                }
                else {
                    console.error('解析json出错:', html);
                    result.op.succ = '0';
                    result.op.err_msg = "'解析json出错";
                }

                //$cyz.log('上传文件返回数据',result);
                callback(result);


            },
            error: function (xx, tt, ee) {
                $cyz.hideProgress();
                console.error('上传失败:' + (tt || "") + (ee || ""));
                result.op.succ = '0';
                result.op.err_msg = '上传失败:' + (tt || "") + (ee || "");
                callback(result);
            }
        });

    }
}
