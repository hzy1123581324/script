"use strict";
/**
 *cyz工具操作js
 *
 */
//全局参数定义
var Global = {
  //目录参数
  baseJS: '',//js目录
  wsURL: '',
  fhURL: '',
  allURL: '',

  is_debug: false,
  //pageparas:{},
  page: {},
  //app参数
  comm: {},

  //页面参数
  user: false

};


/**********************************************字符串扩展功能**********************************************/
//是否正整数
String.prototype.IsPosInt = function (s) {
  var re = /^[0-9]+$/;
  return re.test(s);
};

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
//格式化字符串
//两种调用方式
// var template1="我是{0}，今年{1}了";
// var template2="我是{name}，今年{age}了";
// var result1=template1.format("loogn",22);
// var result2=template2.format({name:"loogn",age:22});
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
              console.log($cyz.jsonToStr(args));

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
  oDateText += this.getMonth().LenWithZero(2) + new Number(26376).ChrW();
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
  if (arguments.length < 2 || objDate.constructor != Date) {
    return undefined;
  }
  switch (interval) {
    //计算秒差
    case 's':
      return parseInt((objDate - this) / 1000);
    //计算分差
    case 'n':
      return parseInt((objDate - this) / 60000);
    //计算時差
    case 'h':
      return parseInt((objDate - this) / 3600000);
    //计算日差
    case 'd':
      return parseInt((objDate - this) / 86400000);
    //计算周差
    case 'w':
      return parseInt((objDate - this) / (86400000 * 7));
    //计算月差
    case 'm':
      return (objDate.getMonth() + 1) + ((objDate.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
    //计算年差
    case 'y':
      return objDate.getFullYear() - this.getFullYear();
    //输入有误
    default:
      return undefined;
  }
}

Date.prototype.DateAdd = function (strInterval, Number) {
  var dtTmp = this;
  switch (strInterval) {
    case 's' :
      return new Date(Date.parse(dtTmp) + (1000 * Number));
    case 'n' :
      return new Date(Date.parse(dtTmp) + (60000 * Number));
    case 'h' :
      return new Date(Date.parse(dtTmp) + (3600000 * Number));
    case 'd' :
      return new Date(Date.parse(dtTmp) + (86400000 * Number));
    case 'w' :
      return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
    case 'q' :
      return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'm' :
      return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'y' :
      return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
  }
};


//公共方法
(function (window) {
  var u = {};
  var isAndroid = (/android/gi).test(navigator.appVersion);

  var uzStorage = function () {
    var ls = window.localStorage;
    var os_obj = (typeof os == 'undefined') ? false : os;
    if (isAndroid && os_obj) {
      ls = os.localStorage();
    }
    return ls;
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
          ar_col.push(json[item] == null ? '' : json[item].toString());
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
      console.log(ex);
      return false;
    }

  };

  u.isJson = function (obj) {
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
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
  },


    u.clearStorage = function (key) {
      $cyz.rmStorage(key);
    };
  //设置和获取本地存储
  u.setAndGetStorage = function (key, a, b) {

    return $cyz.setAndGet(
      function (a1) {
        var data = $cyz.getStorage(key);
        if (data) {
          data = data[a1];
        } else {
          data = false;
        }
        return data;
        // return $cyz.getStorage(key)[a1];
      },
      function () {//取所有值
        return $cyz.getStorage(key);

      },
      function (a1, b1) {//赋值
        var u = $cyz.getStorage(key);
        u = $.extend(true, {}, u, eval('({' + a1 + ':' + b1 + '})'));
        $cyz.setStorage(key, u);
        return u;
      },
      function (a1) {
        var u = $cyz.getStorage(key);
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
      if ($cyz.isJson(a)) {//如果是json格式 ,就把参数赋值到
        return func_setall(a);
      } else {//如果不是 判断是否是string,如果也不是,就不做处理
        if (a_type == 'string') {//字符串时,根据b判断赋值还是取值
          if (b_type == 'undefined') {//没有b时,取值
            return func_get(a);
          }
          else {//赋值
            return func_set(a, b);
          }

        }
        else {//不是字符串时 不处理,返回对象
          return func_setall(a);

        }
      }
    }
    else {//没有值,直接返回整个参数对象
      return func_getall();

    }
  };

  u.strToJson = function (str) {
    if (typeof str === 'string') {
      return JSON && JSON.parse(str);
    }
  };

  u.jsonToStr = function (json) {
    if ($cyz.isJson(json))
      return JSON && JSON.stringify(json);
    else if (typeof json == 'undefined' || json == null)
      return '';
    else
      return json.toString();

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
  //u.clearStorage = function () {
  //  var ls = uzStorage();
  //  if (ls) {
  //    ls.clear();
  //  }
  //};


  u.inArray = function (stringToSearch, arrayToSearch) {//判断是否在数组中
    for (var s = 0; s < (u.isArray(arrayToSearch) ? arrayToSearch : [arrayToSearch]).length; s++) {
      var thisEntry = arrayToSearch[s].toString();
      if (thisEntry == stringToSearch) {
        return true;
      }
    }
    return false;
  };


  u.checkMobile = function (str) {//验证手机号
    var re = /^1\d{10}$/
    if (re.test(str)) {
      return true;
    } else {
      return false;
    }
  };


  u.getUrlPara = function (name) //取url参数
  {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  };

  u.getDouble = function (obj) {//获取小数
    var result = 0.00;
    var objStr = (obj == null || (typeof obj == 'undefined')) ? '' : obj.toString();

    result = parseFloat(objStr);
    return result;
  };


  u.crDate = function (str) { //创建日期对象
    if (typeof(str) == 'string') {
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
    var dd = (typeof(d) == 'string') ? new Date(d) : d;//取日期
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
    var dd = (typeof(d) == 'string') ? new Date(d) : d;//取日期
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
    var dd = (typeof(d) == 'string') ? new Date(d) : d;//取日期
    var date = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
    var y = date.getFullYear();
    var m = date.getMonth();
    return new Date(y, m, 1);
  };

//获取本月最后一天 返回日期对象
  u.getmonthlast = function (d) {
    var dd = (typeof(d) == 'string') ? new Date(d) : d;//取日期
    var date = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);

    return date;
  };

//明天
  u.getdatenext = function (d) {
    var dd = (typeof(d) == 'string') ? new Date(d) : d;//取日期
    var date = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
    date.setDate(date.getDate() + 1);
    return date;
  };

//获取日期 按前后天数 + -表示
  u.getdatebynum = function (d, AddDayCount) {
    var dd = (typeof(d) == 'string') ? new Date(d) : d;//取日期
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

  /*
   u.log = function (obj,info){//写日志
   var s=typeof info=='undefined'?'':info;
   if(typeof obj=='undefined'){
   console.log(s,'undefined');
   }
   else if(typeof str=='string')
   console.log(s,str);
   else if($cyz.isJson(obj))
   console.log(s,$cyz.strToJson(obj));

   };
   */

//输出日志
  u.log = function (desc) {//写日志
    var d = $cyz.toString(desc);
    var c = '';
    for (var i = 1; i < arguments.length; i++) {
      c += ('  [' + i + ']=>') + $cyz.toString(arguments[i]);
    }
    var t = d + '==>' + c;
    console.log(t);
    return t;
  };

//转换字符串
  u.toString = function (obj) {
    var str = '';
    var type = typeof obj;

    if (type == 'null' || type == 'undefined') {
      str = type
    }
    else if (type == 'number' || type == 'string' || type == 'boolean') {
      str = obj + '';
    }
    else if (type == 'function') {
      str = ' *function* ';
    }
    else if (type == 'object') {
      if ($cyz.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          str += $cyz.toString(obj[i]);
        }
      }
      else if ($cyz.isJson(obj)) {
        str = $cyz.jsonToStr(obj);
      }
    }

    return str;

  };

  u.isFunction = function (funcName) {
    try {
      if (typeof(eval(funcName)) == "function") {
        return true;
      }
    } catch (e) {
    }
    return false;
  };

  u.confirm = function (msg, callback) {
    if ("undefined" == typeof msg) return;

    if (confirm(msg)) {
      callback();
    }
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
    var isSuc = true;
    var msg = typeof errMsg == 'undefined' ? '' : errMsg;

    if (typeof val === 'string') {
      if (val == '') {
        msg = errMsg ? errMsg : msg;
        $cyz.showError(msg);
        isSuc = false;
      }
    } else {//二维数组
      for (var i = 0; i < val.length; i++) {
        if (typeof val[i][0] === 'string' && val[i][0] == '' || typeof(val[i][0]) === 'boolean' && val[i][0]) {
          msg = val[i][1] ? val[i][1] : msg;
          isSuc = false;
          break;
        }
      }
    }
    if (msg != '') {
      if (typeof ($cyz.api_toast) == "function") {
        $cyz.api_toast({
          msg: msg
        })
      } else {
        $cyz.showError(msg);
      }
    }

    return isSuc;
  };


  //通用进度窗口
  u.showProgress = function (msg, options) {
    var title = '正在提交...';
    if (arguments.length > 0)
      title = msg;
    var opts = $.extend({title: title, modal: false}, options);
    title&&alert(title);

    //此处处理效果

  };

  //隐藏进度窗口
  u.hideProgress = function (msg, options) {
    //此处隐藏效果
    ;
  };


  u.getfirstimg = function (str) {
    var img = '';
    if (!str)
      str = '';

    var img_arr = (str.split(';')[0]).split(',');
    if (img_arr.length > 1)
      img = img_arr[1];
    return img;
  };

  u.getfirstimgid = function (str) {
    var imgid = '0';
    if (!str)
      str = '0';

    var img_arr = (str.split(';')[0]).split(',');
    if (img_arr.length > 1)
      imgid = img_arr[0];
    return imgid;
  };

//搜索json数组 按值搜索对象 arr:json数组,contions:条件 名称和值 {id:3,name:'a'} 可多个 返回数组
  u.seljsonarr = function (arr, condi) {
    var rlt = {
      idx: -1,
      val: false,
      vals: []
    };

    if (condi) {
      for (var i = 0; i < arr.length; i++) {
        var is = true;
        for (var item in condi) {
          if (arr[i][item] != condi[item]) {
            is = false;
            break;
          }
        }

        if (is) {
          if (rlt.idx == -1) {
            rlt.idx = i;
            rlt.val = arr[i];
          }

          rlt.vals.push(arr[i]);
        }
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
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
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

    if (typeof o == "string")     return $cyz.decode_base64(o.toString());

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
      if (!o.sort) {
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
  u.base64DecodeChars = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];


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
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += str.charAt(i - 1);
          break;
        case 12:
        case 13:
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
        }
      }
    }
    else if ($cyz.isJson(arr)) {
      rlt = [arr];
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


  u.crtreedata = function (data, options) {//json数组转换为  tree数据

    var t1 = $cyz.getArrData(data);

    var opts = {
      id_field: 'id',//节点id字段
      father_field: 'fid',//上级字段
      first_fid: '' // 第一级的上级字段的值
    };
    opts = $.extend(opts, options);

    //上级id字段名
    var idField = opts.id_field;


    var tree_data = {};
    tree_data[idField] = opts.first_fid;//判断是否是树状态列表数据
    tree_data['children'] = [];


    //查询第一级数据
    //var level1=$cyz.seljsonarr(data,{opts.father_field:opts.first_fid});


    var func_op = function (fobj) {//fobj:上级对象
      var condi = {};
      condi[opts.father_field] = fobj[idField];//搜索条件

      var level_datas = $cyz.seljsonarr(t1, condi).vals;//搜索到的下级数据


      for (var i = 0; i < level_datas.length; i++) {
        var cur = level_datas[i];//当前数据
        var child = {};


        child = $.extend(true, {children: []}, cur);
        func_op(child);
        fobj.children.push(child);
      }
    };

    func_op(tree_data);
    return tree_data.children;
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
      ckcode: '',
      opcode: '',
      token: '',
      uid: '0',
      ext: {},
      para: [],
      npara: {},
      tbs: {},
      data: new $cyz.utlObj.ObjResult()
    };

    var opts = $.extend(true, def_data, options);
    opts.data.info.sign = opts.sign;
    opts.data.info.ckcode = opts.ckcode;
    opts.data.info.opcode = opts.opcode;
    opts.data.info.token = opts.token;
    opts.data.ext = opts.ext;
    opts.data.para = opts.para;
    opts.data.npara = opts.npara;
    opts.data.tbs = opts.tbs;
    opts.data.info.uid = opts.uid;
    delete opts['sign'];
    delete opts['ckcode'];
    delete opts['opcode'];
    delete opts['token'];
    delete opts['ext'];
    delete opts['para'];
    delete opts['npara'];
    delete opts['tbs'];
    delete opts['uid'];
    $cyz.call_data(opts);
  };


//数据处理
  u.call_data = function (options) {

    var opts = {
      data: new $cyz.utlObj.ObjResult(),
      url: Global.wsURL,
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      async: true,
      dataType: 'json',
      load_msg: '',
      cache: false,//缓存
      tb_format: 0,//tb的返回数据的格式化 0:默认 1:json数组
      func_ckcode: false,//校验码规则 默认为空  外部传入处理
      func_opcode: false,//操作码规则 默认为空  外部传入生成标识
      func_token: false,//用户token鉴权标识码 默认为空  外部传入生成
      func_before: false,//调用前
      func_sunc_before: false,//调用成功时
      func_sunc: false,//成功后调用函数
      func_error: false,//失败调用函数
      func_timeout: false,//超时方式  方法时,进入超时方法 为数字时 表示重试次数
      func_end_before: false,//完成前
      func_end: false,//结束调用方式

      timeout_sec: 30000, //默认超时时长
      is_debug: true,//是否调试状态
      is_html: false//是否取html类型值
    };
    $.extend(true, opts, options);

    opts.is_html = opts.url.toLocaleLowerCase().indexOf(".asmx") < 1;

    if (typeof opts.func_ckcode == 'function') {//校验码
      opts.data.info.ckcode = opts.func_ckcode(opts.data);
    }

    if (typeof opts.func_opcode == 'function') {//操作标识
      opts.data.info.opcode = opts.func_opcode(opts.data);
    }

    if (typeof opts.func_token == 'function') {//鉴权码
      opts.data.info.token = opts.func_token(opts.data);
    }


    //取版本号信息
    if ($cyz.hasCusObj())//如果有api对象,就获取APP版本号
      opts.data.info['cVersion'] = api.appVersion;


    //是否是HTML格式上传的,要根据url判断
    var result = new $cyz.utlObj.ObjResult();


    var _sign = opts.data.info.sign;


    //超时方法
    var _func_timeout = function (rlt) {
      if (typeof opts.func_timeout == 'function') {
        opts.func_timeout(rlt, excute);
      }
      else if (isNaN(opts.func_timeout)) {//如果是数字 表示重试次数
        if (opts.func_timeout > 0) {
          opts.func_timeout--;
          excute();
        }
        else {
          _func_error('连接服务器超时', rlt);

        }
      }
      else
        _func_error('连接服务器超时', rlt);
    };

    //执行用户传入处理方法前
    var _func_end_before = function (rlt) {

      if (rlt.op.succ == '1' && opts.tb_format != 0 && rlt.tbs) {
        if (opts.tb_format == 1) {
          for (var t in rlt.tbs) {
            var tx = rlt.tbs[t];
            rlt.tbs[t] = $cyz.crkvdatas_arr(tx);

          }
        }
      }

      if (typeof opts.func_end_before == 'function')
        opts.func_end_before(rlt);
    };

    var _func_before = function (opts) {

      if (opts.load_msg.length > 0) {
        $cyz.showProgress({
          title: opts.load_msg,
          modal: true
        });
      }

      if (typeof opts.func_before == 'function')
        opts.func_before(rlt);
    };

    var _func_end = function (rlt) {

      //if(Global.is_debug)
      //console.log('接口['+_sign+']调用返回:',rlt);

      if (opts.load_msg.length > 0) {
        $cyz.hideProgress();
      }


      if (typeof opts.func_end == 'function')
        opts.func_end(rlt);
        api.refreshHeaderLoadDone();
    };

    //成功调用中执行的方法
    var _func_sunc = function (html, rlt) {
      var json = false;


      if (Global.is_debug){
        console.log('------------------------------------------------接口[' + _sign + ']调用返回原始数据=>', html);
        console.log('------------------------------------------------接口[' + _sign + ']调用返回数据=>', rlt);
      }


      try {
        if (html) {
          if (typeof html['d'] != 'undefined') {
            json = $cyz.StringToJson_decodebase64(eval('(' + html.d + ')'));
          }
          else
            json = $cyz.StringToJson_decodebase64(eval('(' + html + ')'));
        }
      } catch (ex) {
        console.log('解析json出错:', html);
      }
      $.extend(true, rlt, json);
       // alert(JSON.stringify(json));

      _func_end_before(rlt);


      if (Global.is_debug)
        console.log('------------------------------------------------接口[' + _sign + ']调用--' + (rlt.op.succ == '0' ? '失败' : '成功') + '--返回对象=>', rlt);

      if (rlt.op.succ == "0") {
        if (opts.func_error)
          opts.func_error(rlt);
        else
          console.log(rlt.op.err_msg);
      } else {
        if (typeof opts.func_sunc_before == 'function') {//处理成功时
          opts.func_sunc_before(rlt);
        }
        if (typeof opts.func_sunc == 'function') {
          opts.func_sunc(rlt);
        }
      }

      _func_end(rlt);
    };

    //失败方法中调用的默认方法
    var _func_error = function (error, rlt) {
      rlt.op.succ = "0";
      rlt.op.err_msg = error;

      _func_end_before(rlt);

      if ((typeof opts.func_error) == "function")
        opts.func_error(rlt);
      else
        console.log(rlt.op.err_msg);


      _func_end(rlt);
    };

    if (typeof opts.data != 'object') {//数据不是对象时
      _func_error('要处理的数据格式不正确!', result);
      return result;
    }

    if (Global.is_debug) {//调试模式时
      //console.log('接口['+opts.data.sign+']提交:',$cyz.jsonToStr(opts.data));
      console.log('------------------------------------------------接口[' + opts.data.info.sign + ']提交对象=>', opts.data);

    }


    //根据处理的URL修改数据类型
    if (opts.is_html) {//是ASHX时,可获取参数WEBSERVICE
      opts.data = {
        jsonStr: $cyz.JsonToString_encodebase64(opts.data)
      };
      opts.contentType = "application/x-www-form-urlencoded";
      opts.dataType = "html";
    } else {
      opts.data = "{'jsonStr':'" + $cyz.JsonToString_encodebase64(opts.data) + "'}";

    }

    if (Global.is_debug) {//调试模式时
      console.log('------------------------------------------------接口[' + _sign + ']提交编码后数据=>', opts.data.jsonStr);

    }

    //console.log(opts.data);

    //调用前执行方式
    _func_before(opts);
    if (Global.is_debug) {
      $cyz.log('超时设置', opts.timeout_sec);
    }


    var excute = function () {
      $.ajax({
        data: opts.data,
        timeout: opts.timeout_sec, //超时时间设置，单位毫秒
        type: opts.type,
        contentType: opts.contentType,
        url: opts.url,
        async: opts.async,
        dataType: opts.dataType,
        cache: opts.cache,
        success: function (html) {
          // alert("success：" + html);
          _func_sunc(html, result);
        },
        error: function (xml, status) {
          // alert("success：" + status);
          if (status == 'timeout') {
            result.op.err_code = '-100';
            //超时标识
            result.op.err_msg = '超时';
            result.succ = '0';
            _func_timeout(result);
          } else
            _func_error(xml.responseText, result);
        }
      })
    };

    excute();

    return result;

  };


//对象属性
  u.utlObj = {
    ObjResult: function () {//通用操作对象

      this.info = {sign: '', ckcode: '', opcode: '', token: '', uid: '0'};    //sign:标识 ckcode:校验码(调用接口校验）  opcode:操作码(本次操作标识)
      this.op = {succ: '1', msg: '', err_msg: '', err_code: '0'};
      this.ext = {};
      this.para = [];
      this.npara = {};
      this.tbs = {};

    },
    ShareData: function () {//分享对象
      this.title = '';
      this.text = ''; //文本内容。用于分享链接（文本），只用于链接分享
      this.description = '';//描述信息
      this.url = ''; //分享内容地址
      this.imgFile = 'widget://image/logo.png'; //分享的图片缩略图本地地址，QQ使用
      this.imgUrl = ''; //分享的图片缩略图网络地址，QQ分享使用
      this.has_hongbao = false; //是否有红包
      this.sign = 'share';//分享成功后发送消息的标识
    }

  };
  window.$cyz = u;


  /**********************************************初始化参数处理**********************************************/
//取URL信息
  var scripts = document.getElementsByTagName("script");
  var surl = scripts[scripts.length - 1].getAttribute("src");
  surl = surl == null ? '' : surl.substr(0, surl.lastIndexOf('/') + 1);
  Global.baseJS = (surl == null ? '' : surl.substr(0, surl.lastIndexOf('/') + 1));
  Global.allURL = window.location.protocol + window.location.host + '/'; //url域名
  Global.wsURL = Global.allURL + 'SimpleFramework/handler.php'; //后台处理URL
//Global.fhURL= Global.allURL+'Handler.asmx/UpFile'; //
  Global.fhURL = Global.allURL + 'FileHandler.ashx'; //文件处理URL


  /**********************************************加载其他js文件**********************************************/
//加载第三方

  document.write('<script type="text/javascript" src="' + Global.baseJS + 'api.js' + '"></script>');
})(window);
