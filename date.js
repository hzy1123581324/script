/*
 cyz
 selector_tr:触发控件
 selector_show:显示控件
 options:参数
 callback:回调
 * */
//加载对应js css

var js_path = document.scripts;
js_path = js_path[js_path.length - 1].src.substring(0, js_path[js_path.length - 1].src.lastIndexOf("/") + 1);
win_register_js_path = js_path + '../plugs/mobiscroll/';

//js_path="plugs/mobiscroll/";
win_register_js_path = "plugs/mobiscroll/";
var m_c_css = '<link href="' + win_register_js_path + 'mobiscroll.core-2.6.2.css" rel="stylesheet" type="text/css"/>';
var m_a_css = '<link href="' + win_register_js_path + 'mobiscroll.android-ics-2.6.2.css" rel="stylesheet" type="text/css"/>';

var m_c_js = '<script src="' + win_register_js_path + 'mobiscroll.core-2.6.2.js" type="text/javascript"></script>';
var m_d_js = '<script src="' + win_register_js_path + 'mobiscroll.datetime-2.6.2.js" type="text/javascript"></script>';
//var m_a_js = '<script src="' + win_register_js_path + 'mobiscroll.android-ics-2.6.2.js" type="text/javascript"></script>';
document.write(m_c_css);
document.write(m_a_css);

document.write(m_c_js);
document.write(m_d_js);
//document.write(m_a_js);//这个可以不要使用,样式文件


//  alert(m_c_css);
//  alert(m_a_css);
//  alert(m_d_js);
//  alert(m_a_js);
 


function date_init(selector_tr, selector_show, options, callback) {
  //if ($(selector_tr).attr('for'))//如果这个控件有触发,就不要处理了
  //  return false;

  var opts = $.extend({
    preset: 'date',
    theme: 'android-ics light',
    mode: "scroller",
    display: "modal",
    lang: '',
    dateFormat: 'yyyy-mm-dd', // 日期格式
    setText: '确定', //确认按钮名称
    cancelText: '取消', //取消按钮名籍我
    dateOrder: 'yymmdd', //面板中日期排列格
    dayText: '日',
    monthText: '月',
    yearText: '年', //面板中年月日文字
    startYear: new Date().getFullYear() - 100, //开始年份
    endYear: new Date().getFullYear() + 1 //结束年份
  }, options);
  //console.log(options);

//动态创建日期控件
  var date_id = 'date' + Math.random().toString().replace('.', '');
  console.log(date_id);
  //添加元素
  var html = ' <input type="text"  id="' + date_id + '"  style="display: none;"/>';
  $('body').append(html);


  var tr_date_id = 'tr_' + date_id;//触发的label
  html = '<label id="' + tr_date_id + '" for="' + date_id + '" style="display:none"></label>';
  $('body').append(html);

  //$(selector_tr).attr('for',date_id);

  //点击关联元素时
  $(selector_show).on('click', function () {

    /*
     ctl-sts:"0" 元素当前状态
     ctl-sts-en:"1" 元素启用状态
     ctl-sts-dis:"2" 元素的禁用状态
     ctl-sts-show:'' 元素的显示状态
     ctl-sts-hide:'' 元素隐藏状态

     * */
    //如果元素的启用状态有值并且当前状态有值,就按值判断,否则就按


    //$('#'+tr_date_id)[0].click();//.html('ddd').click();

    //$('#'+tr_date_id)[0].click();
    $('#' + date_id).val(this.nodeName == "INPUT" ? $(this).val() : $(this).html()).trigger("click");

    //$('#'+tr_date_id).focus();//.click();
    //trigger('click')
    //$('#'+date_id).attr("readonly",false).focus();
    //$('#'+date_id)[0].read.focus().show();
  });


  //alert($('#'+date_id).scroller);
  //console.log(JSON.stringify($('#'+date_id)));

  var rlt = $('#' + date_id).scroller(opts);

  //console.log(rlt);

  $('#' + date_id).change(function () {
    var val = $(this).val();


    $(selector_show).attr('data-val', val);

    if (callback != null)
      callback(val);
    else if ($(selector_show).length > 0) {
      $(selector_show).removeClass('co-ccc');

      if ($(selector_show)[0].tagName == 'INPUT')
        $(selector_show).val(val);
      else
        $(selector_show).html(val);

    }
  });

  return {
    obj: rlt,
    selector_tr: selector_tr,
    enable: function () {
      $(this.selector_tr).attr('data-date-status', '1');
    },
    disable: function () {
      $(this.selector_tr).attr('data-date-status', '0');
    }
  };


}