"use strict";
(function(exports){
    var doc = exports.document, a = {}, rExtractUri = /(?:http|https|file|widget|contents):\/\/.*?\/.+?.js/,
        isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;
    exports.getCurrAbsPath = function () {
        // FF,Chrome
        if (doc.currentScript) {
            return doc.currentScript.src;
        }

        var stack;
        try {
            a.b();
        } catch (e) {
            stack = e.stack || e.stacktrace || e.fileName || e.sourceURL;
        }
        // IE10
        if (stack) {
            var absPath = rExtractUri.exec(stack)[0];
            if (absPath) {
                return absPath;
            }
        }

        // IE5-9
        for (var scripts = doc.scripts, i = scripts.length - 1, script; script = scripts[i--];) {
            if (script.readyState === 'interactive') {
                // if less than ie 8, must get abs path by getAttribute(src, 4)
                return isLtIE8 ? script.getAttribute('src', 4) : script.src;
            }
        }
    };
}(window));

(function (window) {
    var u = {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    var uzStorage = function () {
        var ls = window.localStorage;
        var os_obj = ( typeof os == 'undefined') ? false : os;
        if (isAndroid && os_obj) {
            ls = os.localStorage();
        }
        return ls;
    };

    function parseArguments(url, data, fnSuc, dataType) {
        if (typeof (data) == 'function') {
            dataType = fnSuc;
            fnSuc = data;
            data = undefined;
        }
        if (typeof (fnSuc) != 'function') {
            dataType = fnSuc;
            fnSuc = undefined;
        }
        return {
            url: url,
            data: data,
            fnSuc: fnSuc,
            dataType: dataType
        };
    }


    u.trim = function (str) {
        if (String.prototype.trim) {
            return str == null ? "" : String.prototype.trim.call(str);
        } else {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    u.trimAll = function (str) {
        return str.replace(/\s*/g, '');
    };
    u.isElement = function (obj) {
        return !!(obj && obj.nodeType == 1);
    };
    u.isArray = function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        } else {
            return obj instanceof Array;
        }
    };
    u.isEmptyObject = function (obj) {
        // if (JSON.stringify(obj) === '{}') {
        //   return true;
        // }
        return JSON.stringify(obj) === '{}';
    };
    u.addEvt = function (el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function (el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function (el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function () {
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function (el, selector) {
        if (arguments.length === 1 && typeof arguments[0] == 'string') {
            if (document.querySelector) {
                return document.querySelector(arguments[0]);
            }
        } else if (arguments.length === 2) {
            if (el.querySelector) {
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function (el, selector) {
        if (arguments.length === 1 && typeof arguments[0] == 'string') {
            if (document.querySelectorAll) {
                return document.querySelectorAll(arguments[0]);
            }
        } else if (arguments.length === 2) {
            if (el.querySelectorAll) {
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function (id) {
        return document.getElementById(id);
    };
    u.first = function (el, selector) {
        if (arguments.length === 1) {
            if (!u.isElement(el)) {
                console.warn('$api.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if (arguments.length === 2) {
            return this.dom(el, selector + ':first-child');
        }
    };
    u.last = function (el, selector) {
        if (arguments.length === 1) {
            if (!u.isElement(el)) {
                console.warn('$api.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if (arguments.length === 2) {
            return this.dom(el, selector + ':last-child');
        }
    };
    u.eq = function (el, index) {
        return this.dom(el, ':nth-child(' + index + ')');
    };
    u.not = function (el, selector) {
        return this.domAll(el, ':not(' + selector + ')');
    };
    u.prev = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if (node.nodeType && node.nodeType === 3) {
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if (node.nodeType && node.nodeType === 3) {
            node = node.nextSibling;
            return node;
        }
    };
    u.closest = function (el, selector) {
        if (!u.isElement(el)) {
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function (doms, el) {
            var i = 0, len = doms.length;
            for (i; i < len; i++) {
                if (doms[i].isEqualNode(el)) {
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function (el, selector) {
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while (!targetDom) {
                el = el.parentNode;
                if (el != null && el.nodeType == el.DOCUMENT_NODE) {
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function (parent, el) {
        var mark = false;
        if (el === parent) {
            mark = true;
            return mark;
        } else {
            do {
                el = el.parentNode;
                if (el === parent) {
                    mark = true;
                    return mark;
                }
            } while (el === document.body || el === document.documentElement);

            return mark;
        }

    };
    u.remove = function (el) {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function (el, name, value) {
        if (!u.isElement(el)) {
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length == 2) {
            return el.getAttribute(name);
        } else if (arguments.length == 3) {
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function (el, name) {
        if (!u.isElement(el)) {
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 2) {
            el.removeAttribute(name);
        }
    };
    u.hasCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        // if (el.className.indexOf(cls) > -1) {
        //   return true;
        // } else {
        //   return false;
        // }
        return el.className.indexOf(cls) > -1;
    };
    u.addCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.add(cls);
        } else {
            var preCls = el.className;
            // var newCls = preCls + ' ' + cls;
            // el.className = newCls;
            el.className = preCls + ' ' + cls;
        }
        return el;
    };
    u.removeCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.remove(cls);
        } else {
            var preCls = el.className;
            // var newCls = preCls.replace(cls, '');
            // el.className = newCls;
            el.className = preCls.replace(cls, '');
        }
        return el;
    };
    u.toggleCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.toggle(cls);
        } else {
            if (u.hasCls(el, cls)) {
                u.removeCls(el, cls);
            } else {
                u.addCls(el, cls);
            }
        }
        return el;
    };
    u.val = function (el, val) {
        if (!u.isElement(el)) {
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            switch (el.tagName) {
                case 'SELECT':
                    // var value = el.options[el.selectedIndex].value;
                    // return value;
                    return el.options[el.selectedIndex].value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if (arguments.length === 2) {
            switch (el.tagName) {
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }

    };
    u.prepend = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            return el.innerHTML;
        } else if (arguments.length === 2) {
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function (el, txt) {
        if (!u.isElement(el)) {
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            return el.textContent;
        } else if (arguments.length === 2) {
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.css = function (el, css) {
        if (!u.isElement(el)) {
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if (typeof css == 'string' && css.indexOf(':') > 0) {
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function (el, prop) {
        if (!u.isElement(el)) {
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 2) {
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
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


 	/*
    u.fixIos7Bar = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
            return;
        }
        var strDM = api.systemType;
        if (strDM == 'ios') {
            var strSV = api.systemVersion;
            var numSV = parseInt(strSV, 10);
            var fullScreen = api.fullScreen;
            var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
            if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                el.style.paddingTop = '20px';
            }
        }
    };
    u.fixStatusBar = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
            return;
        }
        var sysType = api.systemType;
        if (sysType == 'ios') {
            u.fixIos7Bar(el);
        } else if (sysType == 'android') {
            var ver = api.systemVersion;
            ver = parseFloat(ver);
            if (ver >= 4.4) {
                el.style.paddingTop = '25px';
            }
        }
    };
    */

   u.fixIos7Bar = function (el) {
      return u.fixStatusBar(el);
      // 断开
        if (!u.isElement(el)) {
            console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
            return;
        }
        var strDM = api.systemType;
        if (strDM == 'ios') {
            var strSV = api.systemVersion;
            var numSV = parseInt(strSV, 10);
            var fullScreen = api.fullScreen;
            var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
            if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                el.style.paddingTop = '20px';
            }
        }
    };
    u.fixStatusBar = function (el) {
      if(!u.isElement(el)){ console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element'); return 0; } el.style.paddingTop = api.safeArea.top + 'px'; return el.offsetHeight;
        // if (!u.isElement(el)) {
        //     console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
        //     return;
        // }
        // var sysType = api.systemType;
        // if (sysType == 'ios') {
        //     u.fixIos7Bar(el);
        // } else if (sysType == 'android') {
        //     var ver = api.systemVersion;
        //     ver = parseFloat(ver);
        //     if (ver >= 4.4) {
        //         el.style.paddingTop = '25px';
        //     }
        // }
    };
    u.fixTabBar = function(el){
    	if(!u.isElement(el)){
    		console.warn('$api.fixTabBar Function need el param, el param must be DOM Element');
    		return 0;
    	}
    	el.style.paddingBottom = api.safeArea.bottom + 'px'; return el.offsetHeight; }




    u.api_toast = function (options) {


        if (options.msg && typeof (options.msg) != "string") {
            return false;
        }
        var opts = {
            msg: '', //消息
            duration: 3000, //持续时长
            location: 'bottom', //弹出位置
            global: false //是否是全局的toast。若为false，toast将只在当前window范围可见；若为true，安卓手机上面弹出的位置将会固定在底部区域。
        };
        opts = $.extend(opts, options);
        var reg = /^\d+(([\.]\d{1,3})?[s])?$/;
        var time = opts.duration;
        if (time) {
            if (typeof (time) == "number") {
                opts.duration = time;
            } else if (typeof (time) == "string" && reg.test(time)) {
                opts.duration = parseFloat(time) * 1000;
            }
        }

        if ($cyz.hasCusObj())
            api.toast(opts);
        else
            $cyz.showAlert(opts.msg);

    };

    u.toast = function (title, text, time) {
        var opts = {};
        var show = function (opts, time) {
            $cyz.showProgress(opts);
            setTimeout(function () {
                api.hideProgress();
            }, time);
        };
        if (arguments.length === 1) {
            time = time || 500;
            if (typeof title === 'number') {
                time = title;
            } else {
                opts.title = title + '';
            }
            show(opts, time);
        } else if (arguments.length === 2) {
            time = time || 500;
            if (typeof text === "number") {
                time = text;
                text = null;
            }
            if (title) {
                opts.title = title;
            }
            if (text) {
                opts.text = text;
            }
            show(opts, time);
        }
        if (title) {
            opts.title = title;
        }
        if (text) {
            opts.text = text;
        }
        time = time || 500;
        show(opts, time);
    };
    u.post = function (/*url,data,fnSuc,dataType*/) {
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        argsToJson.data && (json.data = argsToJson.data);
        if (argsToJson.dataType) {
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text' || type == 'json') {
                json.dataType = type;
            }
        } else {
            json.dataType = 'json';
        }
        json.method = 'post';
        api.ajax(json, function (ret, err) {
            if (ret) {
                fnSuc && fnSuc(ret);
            }
        });
    };
    u.get = function (/*url,fnSuc,dataType*/) {
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        //argsToJson.data && (json.data = argsToJson.data);
        if (argsToJson.dataType) {
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text' || type == 'json') {
                json.dataType = type;
            }
        } else {
            json.dataType = 'text';
        }
        json.method = 'get';
        api.ajax(json, function (ret, err) {
            if (ret) {
                fnSuc && fnSuc(ret);
            }
        });
    };

    /*end*/

    /*custome cyz 2016-09-21*/

    u.hasCusObj = function () {//是否存在API
        return $cyz.hasObj('api');
    };

    //重写MD5加密
    /*
     u.encodeMd5=function(strSource) {
     var value=strSource;

     if($api.hasCusObj()){
     var signature = api.require('signature');
     value= signature.md5Sync({
     data: value
     });
     }
     else
     value=$.md5(value);

     return value;
     };
     */

    //重写 $cyz函数
    u.showAlert = function (msg, callback) {
        if ("undefined" == typeof msg)
            return;
        var msg_show = msg;
        if ($cyz.isJson(msg)) {
            msg_show = $cyz.jsonToStr(msg);
        }

        if ($cyz.hasCusObj()) {
            api.alert({
                title: '提示',
                msg: msg_show,
                buttons: ['确定']
            }, function (ret, err) {
                if (typeof callback == 'function') {
                    callback();
                }
            });
        } else {
            // alert(msg_show);
            if (typeof callback == 'function') {
                callback();
            }
        }

    };

    //重写confirm
    u.confirm = function (msg, callback) {
        if ("undefined" == typeof msg)
            return;

        if ($cyz.hasCusObj()) {
            api.confirm({
                title: '提示',
                msg: msg,
                buttons: ['是', '否']
            }, function (ret, err) {
                if (ret.buttonIndex == 1) {
                    if (typeof callback == 'function')
                        callback();
                }
            });
        } else {
            if (confirm(msg)) {
                callback();
            }
        }
    };

    //重写showError
    u.showError = function (msg, callback) {
        if ("undefined" == typeof msg)
            return;
        var msg_show = msg;
        if ($cyz.isJson(msg)) {
            msg_show = $cyz.jsonToStr(msg);
        }

        if ($cyz.hasCusObj()) {
            api.alert({
                title: '温馨提示',
                msg: msg_show,
                buttons: ['确定']
            }, function (ret, err) {
                if (typeof callback == 'function') {
                    callback();
                }
            });
        } else {
            // alert(msg_show);
            if (typeof callback == 'function') {
                callback();
            }
        }
    };

    //通用进度窗口
    u.showProgress = function (msg, options) {
        var title = '正在提交...';
        if (typeof msg == 'string') {
            title = msg;
        }

        var opts = $.extend({
            title: title,
            text: "",
            modal: false
        }, options);
        if ($cyz.isJson(msg))
            opts = $.extend(opts, msg);

        if ($cyz.hasCusObj())
            api.showProgress(opts);
    };

    //隐藏进度窗口
    u.hideProgress = function (msg, options) {
        if ($cyz.hasCusObj())
            api.hideProgress();
    };

    //页面操作 与api相关的
    u.open_share = function (sharedata) {
        if ($cyz.hasCusObj()) {
            if (typeof (sharedata.imgUrl) != 'undefined' && sharedata.imgUrl.length > 0) {
                //缓存图片
                imageCache_byurl(sharedata.imgUrl, function (ret) {
                    if (ret.state) {
                        sharedata.imgFile = ret.filepath;
                        $cyz.openFrame('utl_share', sharedata);
                    } else {
                        sharedata.imgUrl = Global.allURL + '/share/images/logo.png';
                        $cyz.openFrame('utl_share', sharedata);
                    }
                });
            } else {
                sharedata.imgUrl = Global.allURL + '/share/images/logo.png';
                $cyz.openFrame('utl_share', sharedata);
            }
        } else {
            console.log('api不存在...');
            //打开分享页面
        }
    };

    /*********************************************页面相关操作处理**************************************/

    u.getPageParam = function () {//获取页面参数
        var paras = {};
        if ($cyz.hasCusObj())
            paras = api.pageParam;
        else {
            paras = $cyz.getStorage('page_' + Global.page.name);
        }
        return paras;
    };

    //弹出打开 name:页面名称  options:参数
    u.openPop = function (name, paras, options) {

        var defparas = {
            page: name, //要打开的页面名称
            is_back: true, //是否有返回
            s_winName: $cyz.hasCusObj() ? api.winName : '', //来源窗体
            s_frameName: $cyz.hasCusObj() ? api.frameName : '', //来源Frame
            title: '编辑', //标题
            rtext: '', //右边文本
            rimg: '',//右边显示图像
            is_open_once: pages[name] && pages[name]._is_open_once_ || 0//是否打开新页面 默认为true   为false时,调用原有页面
        };


        defparas = $.extend(defparas, paras);

        var ect = new Date().getTime();
        if (defparas.is_open_once == '1')
            ect = '';
        //$cyz.log('页面标识',"utl_pop_" + defparas.page + ect);

        var opts = {
            name: "utl_pop_" + defparas.page + ect,
            bounces: false
        };


        /*
         if(defparas.is_open_once=='1'){//如果只打开一次,就先关闭
         $cyz.log('关闭页面',opts.name);
         $cyz.closeWin(opts.name);
         }*/
        //重新打开页面
        if (Global.is_debug) {
            $cyz.log('打开的页面', opts.name);
        }


        opts = $.extend(opts, options);

        if (Global.is_debug) {
            $cyz.log('utl_pop.paras:', defparas);
        }

        this.openWin('utl_pop', defparas, opts);
    };

    //扩展方法 cyz 2015.12.13
    //通用打开窗口方法
    //name:窗体名称 url:地址 paras:参数 options:配置项
    u.openWin = function (name, paras, options) {
        var opts = {
            pageParam: $.extend({}, paras),
            name: name,
            slidBackEnabled: false,
            reload: true,//是否重新加载
            softInputMode:'auto',//设置ios错位问题
            allowEdit:'true',//编辑
            url: pages[name]._url_
        };
        opts = $.extend(opts, options);

        if (Global.is_debug) {
            $cyz.log('win.opts', opts);
        }


        if ($cyz.hasCusObj()) {
            if (Global.is_debug) {
                $cyz.log('打开win相关参数', opts);
            }

            api.openWin(opts);
        }
        else {

            $cyz.setStorage('page_' + name, paras);
            //设置页面参数 写到本地存储

            var path = '';
            for (var i = 0; i < Global.page._level_ - 1; i++) {
                path += '../';
            }
            path += pages[name]._path_ + '/' + name + '.html';

            window.location.href = path;

        }
    };

    u.closeToWin = function (win) {

        if ($cyz.hasCusObj())
            api.closeToWin({
                name: win
            });
    };

    //关闭window
    u.closeWin = function (name) {
        if (arguments.length == 0 || name == '')
            api.closeWin();
        else if ($cyz.hasCusObj())
            api.closeWin({
                name: name
            });
    };

    //打开Frame
    u.openFrame = function (name, paras, options) {
        var opts = {
            pageParam: $.extend({}, paras),
            name: paras.outside_link ? "outside_link_" + name : name,
            url: paras.outside_link ? paras.outside_link : pages[name]._url_,
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: api.winHeight
            },
            allowEdit:'true',//编辑
            // softInputMode:'pan',//设置ios错位问题
            softInputMode:'auto',//设置ios错位问题


        };
        opts = $.extend(opts, options);

        if ($cyz.hasCusObj())
            api.openFrame(opts);
    };

    //关闭Frame
    u.closeFrame = function (name) {
        if ($cyz.hasCusObj()) {
            if (arguments.length == 0 || name == '') {
                api.closeFrame();
            } else {
                api.closeFrame({
                    name: name
                });
            }
        }

    };

    //执行页面js脚本
    u.execScript = function (winname, frameName, script) {
        if (Global.is_debug) {
            console.log(winname + "-----" + frameName);
        }

        //alert('a');
        if ($cyz.hasCusObj()) {
            //alert('b');
            if (winname == '') {
                //api.execScript(winname, frameName, script);
                api.execScript({
                    frameName: frameName,
                    script: script
                });
            } else if (frameName == '') {
                api.execScript({
                    name: winname,
                    script: script
                });
            } else {
                //alert('c');

                api.execScript({
                    name: winname,
                    frameName: frameName,
                    script: script
                });
            }
        }

    };

    //事件处理相关
    u.event_update = function (sign, v) {//事件触发更新

        var val = unescape(v);
        if (typeof $cyz.my_event_update != 'function')
            return;
        if (typeof sign == 'string' || ( typeof sign == 'numeric')) {
            $cyz.my_event_update(sign, val);
        } else if ($cyz.isArray(sign)) {//是数组
            for (var i = 0; i < sign.length; i++) {//长度
                if ($cyz.isArray(sign[i]))
                    $cyz.my_event_update(sign[i][0], sign[i][1]);
            }
        } else {//对象
            for (var item in sign) {//遍历对象
                $cyz.my_event_update(item, sign[item]);
            }
        }
    };
    //当前页面处理事件
    u.my_event_update = false;

    //添加事件处理
    u.addEvent = function (name, callback, extra) {
        if ($cyz.hasCusObj()) {

            var opts = {
                name: name,
                extra: {
                    type: 33
                }
            };
            api.addEventListener(opts, function (ret, err) {

                if (err) {
                    console.log(err);
                } else if (typeof callback == 'function') {

                    callback(ret.value);
                }

            });
        }
    };

    //移除事件监听
    u.removeEvent = function (name) {
        if (typeof name == "string") {
            api.removeEventListener({
                name: name
            });
        }
    };

    //发送事件处理

    u.sendEvent = function (name, extra) {
        if ($cyz.hasCusObj()) {
            var value = arguments.length > 1 ? extra : {};
            api.sendEvent({
                name: name,
                extra: value
            });
        }

    };

    //右键相关处理
    //右键点击事件处理
    u.my_pop_rightclicked = function () {
        return;
    };

    //右键参数设置
    u.utl_pop_right = {
        set: function (opts) {
            var tmp = $.extend({
                rtext: '',
                rimg: '',
                r_sign: '',
                title: '',
                hd_addr: ''
            }, opts);
            //调用主win执行方法
            if ($cyz.hasCusObj()) {
                $cyz.execScript(api.winName, '', 'set_right("' + api.frameName + '","' + tmp.rtext + '","' + tmp.rimg + '","' + tmp.rsign + '","' + tmp.title + '","' + tmp.hd_addr + '")');
            }
            return this;

        },
        click: function (rsign) {

            return;
        }//点击事件
    };

    //html格式化数据(列表)
    u.html_format_data = function (options) {
        var opts = {
            data: false,
            is_mul: true,//是否多数据 列表
            temp_sector: false,
            target_sector: false
        };

        opts = $.extend(true, {}, opts, options);
        opts.temp_sector = $(opts.temp_sector);
        opts.target_sector = $(opts.target_sector);

        var d = opts.data;
        if (d == null || d == false || d == undefined || opts.temp_sector.length < 1)
            return;

        if (opts.target_sector.length < 1)
            opts.target_sector = opts.temp_sector;


        if (d) {
            if (opts.is_mul) {//多行数据处理
                d = $cyz.isArray(opts.data) ? d : [d];
                for (var i = 0; i < d.length; i++) {//遍历
                    var r = d[i];
                    r['for_idx'] = i;
                    opts.target_sector.append(opts.temp_sector.html().format(r));
                }

            }
            else {
                if ($cyz.isArray(opts.data)) {
                    if (opts.data.length > 0)
                        d = d[0];
                    else
                        d = false;

                    if (d) {
                        opts.target_sector.html(opts.temp_sector.html().format(d));
                    }
                }

            }
        }
    };

    //设置滚动刷新操作
    u.set_scroll_refre = function (options) {

        var opts = {
            fdown: function () {//下拉 默认方式

                Global.page.p_lastval = 0;
                //alert(Global.page.p_lastval);

                if (typeof load_data == 'function')
                    load_data();
            },
            fup: function () {//上推 默认上推方法 cyz

                if (typeof load_data == 'function')
                    load_data();
            }
        }

        opts = $.extend(true, {}, opts, options);


        if ($cyz.hasCusObj() && (typeof opts.fdown == 'function')) {//如果存在下拉刷新
            api.setRefreshHeaderInfo({
                visible: true,
                bgColor: 'rgba(0,0,0,0)',
                textColor: '#666',
                textDown: '下拉加载',
                textUp: '释放'
            }, function (ret, err) {
                if (ret) {
                    opts.fdown();
                }
            });
        }
        else if (typeof opts.fdown == 'string') {
            if ($cyz.hasCusObj() && opts.fdown == 'stop') {
                api.refreshHeaderLoadDone();
            }
        }


        if ($cyz.hasCusObj() && (typeof opts.fup == 'function')) {//如果存在上推加载
            api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: 10            //设置距离底部多少距离时触发，默认值为0，数字类型
                }
            }, function (ret, err) {


                //alert(ret);
                opts.fup();
                
                //  alert(JSON.stringify(ret));
                //  if (ret) {
                //  opts.fup();
                //  }
                 
            });
        }

    };

    /*
    //判断是否登录
    u.is_login = function () {
        var self = this;
        var b = false;
        if (Global.user() && Global.user().id && +Global.user().id > 0) {
            b = true;
        } else {
            self.api_toast({
                msg: "请先登录!",
                global: true
            });
            self.openPop("login", {
                title: "登录"
            });
        }
        return b;
    };*/

    //判断是否登录
    u.is_login = function () {
        var self = this;
        var b = false;
        var user=Global.req_header();
        if (user && user.uid && +user.uid > 0) {
            b = true;
        } else {
            self.api_toast({
                msg: "请先登录!",
                global: true
            });
            self.openPop("login", {
                title: "登录"
            });
        }
        return b;
    };

    window.$api = u;
})(window);


//扩展功能合并到cyz中
$.extend(true, $cyz, $api);

$.extend(true, Global, {
    api_init: function () {
    }

});

//加载注册js 相对于cyz.comm.js位置
//document.write('<script src="' + Global.baseJS + 'page_register.js' + '"></script>');

document.write(Global.replaceJsStr.format({jsaddr:'page_register.js'}));
if(Global.c_ex.length>0){//如果有扩展数据
    if($cyz.inArray("f",Global.c_ex)){
        document.write(Global.replaceJsStr.format({jsaddr:'fastclick.js'}));
    };
}

//api加载之前调用处理
function apiready() {
    var apipageparam = {};
    if ($cyz.hasCusObj())
        apipageparam = api.pageParam;

    Global.page = $.extend({}, _pageparas_, Global.page, apipageparam);
    if (typeof (Global.api_init) == 'function') {
        Global.u = Global.user();//赋值用户信息
        Global.api_init();
    }
}
