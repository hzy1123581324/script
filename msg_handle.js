//消息处理,事件 


//初始化ajpush
function ajpush_obj() {
  var rlt = false;
  try {
    rlt = api.require('ajpush');
  } catch (ex) {
    console.log(ex);
  }
  return rlt;
}

//初始化极光推送 系统运行就会调用
function push_init(callback) {
  var ajpush = ajpush_obj();
  if (ajpush) {
    //应用恢复到前台时
    api.addEventListener({
      name: 'resume'
    }, function (ret, err) {
      if (ret) {
        //1.清除APP消息数据 IOS
        try {
          var aj = ajpush_obj();
          if (aj) {
            aj.setBadge({
              badge: 0
            });
          }

        } catch (ex) {
          ;
        }
      } else {
        console.log(err);
      }
    });
    if (api.systemType == 'ios') {
      callback();
    } else {
      ajpush.init(function (ret) {
        if (ret && ret.status) {
          $cyz.log('ajpush初始化成功',ret);
          //默认绑定为空
          callback();
          //push_bind('0');
          //success ;
        } else {
          $cyz.log('ajpush初始化出错',ret);
          window.setTimeout('push_init()', 15000);
          //15秒后重复调用
        }
      });
    }


    //推送监听处理
    push_listen();
  }
}

function login_state() {
  var rlt = '未登录';
  if ($api && $api.getStorage('login') && $api.getStorage('login').state)
    rlt = '已登录';
  return rlt;
}
//消息监听处理
function push_listen() {
  $cyz.log('ajpush设置监听');
  var ajpush = ajpush_obj();
  ajpush.setListener(function (ret) {
    // $cyz.showAlert(JSON.stringify(ret));
    $cyz.log(ret, 'listen set..');
    var id = ret.id;
    var title = ret.title;
    var content = ret.content;
    var extra = ret.extra;
    if (typeof extra == 'string') {//
      extra = eval('(' + extra + ')');
    }

    title = extra._title;
    content = extra._msg;

    /*
     //收到消息调用写入日志信息 正式时要取消 my_user().id
     callasyn({
     is_login : false,
     sign : 'u_back_push_test_log_add',
     para : ['setListener:', my_user().id + '_' + login_state(), id, title, content, JSON.stringify(extra), JSON.stringify(ret)]
     }, function(rlt) {
     }, function(rlt) {
     });

     */
    //listen监听处理 a.所有透传消息 b.ios在前台运行时的通知消息

    //1.处理方式 调用处理方式统一处理 共有 透传监听 ios前台运行时的监听
    //a.只有通知类时 (只存在于 ios下) 静默处理
    //b.只有透传时(存在于android与ios)  静默处理
    //c.二者都有时 , 只处理透传消息) 静默处理
    var is_op_m1 = false;
    //如果发送人有值并且推送人不处理并且当前用户=推送人
    var is_no_me = (extra._from_obj != '' && extra._from_obj != '0' && extra._is_push_from == '0' && extra._from_obj == Global.user().id)
    //is_no_me = true;

    if (is_no_me)
      return;

    if (extra._pr_type == '1' || extra._pr_type == '2' || (extra._pr_type == '0' && extra._pushtype == '2')) {
      push_handle(extra, 1);
      is_op_m1 = true;
      //标识已经静默处理过了
    }

    // _cur_plat:当前平台 为0时是透传不能区分  1:android 2:ios
    //_pr_type:推送方式  0:所有 1:通知 2:消息
    //_pushtype:当前的消息类别 1:通知 2:消息
    //2.发送通知 条件有二个 a.仅有透传消息并设置为显示时发送通知    b.ios下的只通知类需要发送通知
    if ((extra._pr_type == '2' && extra._is_show == '1') || ((extra._pushtype == '1') && extra._cur_plat == '2' )) {

      //推送到标题栏
      api.notification({
        notify: {
          title: title,
          //标题，默认值为应用名称，只Android有效
          extra: $.extend(extra, {
            _is_op_m1: is_op_m1
          }), //传递给通知的数据，在通知被点击后，该数据将通过监听函数回调给网页
          updateCurrent: false, //是否覆盖更新已有的通知，取值范围true|false。只Android有效
          content: content
        }
      }, function (ret, err) {
        if (ret) {
          ;
        } else
          $cyz.log('接收消息出错回调', ret, 'notification err');

        //log(ret);
      });
    }

  });

  //安卓点击通知时 只有安卓会触发
  api.addEventListener({
    name: 'appintent'
  }, function (ret, err) {
    if (ret && ret.appParam.ajpush) {
      var ajpush = ret.appParam.ajpush;
      var id = ajpush.id;
      var title = ajpush.title;
      var content = ajpush.content;
      var extra = ajpush.extra;

      if (typeof extra == 'string') {//
        extra = eval('(' + extra + ')');
      }
      title = extra._title;
      content = extra._msg;

      $cyz.log('ajpush.appintent.recive', ret);
      /*
       //收到消息调用写入日志信息 正式时要取消 my_user().id
       callasyn({
       is_login : false,
       sign : 'u_back_push_test_log_add',
       para : ['appintent', my_user().id + '_' + login_state(), id, title, content, JSON.stringify(extra), JSON.stringify(ret)]
       }, function(rlt) {
       }, function(rlt) {
       });

       */

      //如果发送人有值并且推送人不处理并且当前用户=推送人
      var is_no_me = (extra._from_obj != '' && extra._from_obj != '0' && extra._is_push_from == '0' && extra._from_obj == Global.user().id)
      //is_no_me = true;

      $cyz.log('ajpush.appintent isnome',is_no_me);

      if (is_no_me)
        return;

      //调用通用处理方式 处理事件
      //如果是只通知或只透传   就调用统一处理  静默与显示同时处理
      //如果二者都有,只处理通知类消息  只做显示处理  (注:静默处理有对应的listen处理,但如果应用关闭时,透传消息 也会提醒 并触发appintent,这时只能不做处理,因为会造成与通知类点击事件处理重复)
      if (extra._pr_type == '1' || extra._pr_type == '2')
        push_handle(extra, 0);
      else if (extra._pr_type == '0' && extra._pushtype == '1') {//
        push_handle(extra, 2);
      }

    }
  });

  //IOS 通知时  手动推送的点击通知操作
  api.addEventListener({
    name: 'noticeclicked'
  }, function (ret, err) {
    if (ret && ret.value) {
      var extra = ret.value;

      extra = extra ? extra : extra.extra; 

      try {//IOS右上角图标取消
        var aj = ajpush_obj();
        aj.setBadge({
          badge: 0
        });

      } catch (ex) {
        ;
      }


      if (typeof extra == 'string') {//
        extra = eval('(' + extra + ')');
      }

      //$cyz.log(ret, 'ajpush.noticeclicked.recive');

      //收到消息调用写入日志信息 正式时要取消 my_user().id
      /*
       callasyn({
       is_login : false,
       sign : 'u_back_push_test_log_add',
       para : ['noticeclicked', my_user().id + '_' + login_state(), extra._id, '', extra._msg, '', JSON.stringify(ret)]
       }, function(rlt) {
       }, function(rlt) {
       });
       */

      //如果发送人有值并且推送人不处理并且当前用户=推送人
      var is_no_me = (extra._from_obj != '' && extra._from_obj != '0' && extra._is_push_from == '0' && extra._from_obj == Global.user().id);
      //is_no_me = true;

      $cyz.log('ajpush.noticeclicked isnome',is_no_me);

      if (is_no_me) {

        return;
      }

      // _cur_plat:当前平台 为0时是透传不能区分  1:android 2:ios
      //_pr_type:推送方式  0:所有 1:通知 2:消息
      //_pushtype:当前的消息类别 1:通知 2:消息
      //消息处理手动触发的消息(要显示处理的,ios点击触发的消息    根据参数决定静默认是否要处理 is_op_m1
      //如果只是通知,只有ios有这种情况  判断静默是否处理过 决定是否处理静默操作
      //如果只是透传 判断静默是否处理过 决定是否处理静默操作
      //如果二者都有  只有苹果会进入  判断是否静默操作处理过

      if (extra.is_op_m1) {//如果有处理过静默处理
        push_handle(extra, 2);
      } else {
        push_handle(extra, 0);
      }

    }
  })
}

//重新绑定用户身份信息,根据用户身份 从my_user中取值  {alias:'myalias',tags:['tag1','tag2']};
function push_bind(opts) {// 第一个为:别名 ,后续的标签 ,用逗号隔开
  $cyz.log('ajpush.绑定标签',opts); 
  opts = '' + opts; 
  var ajpush = ajpush_obj();

  if (ajpush) {
    var param = {
      alias: '0',
      tags: []
    };

    var arr = opts.split(',');
    for (var i = 0; i < arr.length; i++) {
      var tag = arr[i];
      //if (tag.length > 2) {//标签必须大于二位
      if (i == 0)//别名
        param.alias = tag;
      else//标签
        param.tags.push(tag);
      //}
    }
    $cyz.log('ajpush.绑定的标签',$cyz.jsonToStr(param) ); 
    
    ajpush.bindAliasAndTags(param, function (ret) {
 
      $cyz.log('ajpush.绑定的结果',ret);
      var statusCode = ret.statusCode;
    });
    
  }


}

//推送处理 opts:参数 op_mode:处理模式 0:全部 1:静默 2:显示
//系统参数:
/*
 _id:消息标识
 _pr_type:推送类型(0:全部 1:通知 2:消息)
 _from_obj:推送人id
 _title:标识
 _msg:内容
 _is_push_from:是否推送给发起人
 _op_mode_sil:静默处理方式  0:无 1:事件 2:自定义
 _op_mode_sil_sn : 事件处理标识
 _op_mode_dis_sn : 页面处理标识
 _op_mode_dis:显示处理方式  0:无 1:内部页面 2:外部页面
 _op_mode_sil_dis:处理标识(页面)
 _is_show:是否显示(针对透传消息)
 _pushtype:当前推送类型(1:通知 2:消息 )
 _cus_plat:当前平台(1:android 2:ios 0:未知(透传消息时没区分)
 ...其他为自定义参数

 */
function push_handle(opts, op_mode) {
  console.log(JSON.stringify(opts));
  $cyz.log('push_handle',opts);
  $cyz.log('push_handle',op_mode);

  //静默处理
  if ((op_mode == 0 || op_mode == 1) && opts._op_mode_sil != 0 && opts._op_mode_sil_sn != '') {
    if (opts._op_mode_sil == '1') {

      $cyz.log('接收事件处理', opts._op_mode_sil_sn, opts);

      $api.sendEvent(opts._op_mode_sil_sn, opts);
    }
    //发送事件
    else if (opts._op_mode_sil == '2') {
      ;//后续完善,自定义处理 cyz
    }
  }


  //显示处理 
  if ((op_mode == 0 || op_mode == 2) && opts._op_mode_dis != 0 && opts._op_mode_dis_sn != '') {
    if (opts._op_mode_dis == '1') {//弹出打开页面


      $cyz.log('弹出页面时标识', opts);

      $cyz.openPop(opts._op_mode_dis_sn, opts);

    } else if (opts._op_mode_dis == '2') {//打开外部页面


      api.openWin({
        pageParam: {
          url: opts._op_mode_dis_sn
        },
        name: 'web_page_win',
        url: 'html/utl/webPage.html'
      });

    }
  }

} 