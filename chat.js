/*
 *  desc	:聊天处理
 *  anthor	:cyz
 *  time	:2015-12-09
 *  update	:
 * */

/*
 $.ft1={
 f1:function(){
 alert('f1');
 },

 f2:function(){
 alert('f2');
 }

 };

 $.extend({
 f3:function(){alert('f3');},
 f4:function(){alert('f4');},
 });
 */

$.extend({
  chat: {
    _uichatbox: {},
    _op: {},
    obj: false,
    opts: false,
    show: function () {
      if (this.obj)
        this.obj.show();
      return this;
    },
    hide: function () {
      if (this.obj)
        this.obj.hide();
      return this;
    },
    open: function () {
      //this.obj.open(opts.uichatbox, opts.op);
      if (this.obj)
        this.obj.open(this._uichatbox, this._op);

      return this;
    },
    close: function () {
      if (this.obj)
        this.obj.close();
      return this;
    },
    setPlaceholder: function (txt) {
      if (this.obj)
        this.obj.setPlaceholder({
          placeholder: txt
        });
      return this;
    },
    extras: {
      img: {
        idx: -1,
        type: 'img',
        title: '图片',
        normalImg: 'widget://image/comm_sel_img.png',
        op: false
        //activeImg : 'widget://html/main2/images/yuyin_icon.png'
      }
    },
    is_autohide: false,
    send_text: false,
    is_popupKeyboard: false,
    init: function (options) {//初始化聊天窗口
      //this.init(3);
      var defaults = {
        placeholder: '请输入...',
        extras: ['img'], //扩展功能 0:赠U币 1:图片 2:...
        selected_img: false,
        selected_u: false,
        send_text: false, //发送文本
        is_autohide: false, //是否自动隐藏 如果是 ,点击处理后,会自动隐藏
        is_popupKeyboard: false, //是否弹出键盘
        op: function (ret) {//操作默认函数
          if (ret.eventType == 'clickExtras') {

            //seletcHeadImage();
            //获取类型
            var type = '';
            for (var item in $.chat.extras) {
              var extra = $.chat.extras[item];

              if (extra.idx == ret.index) {
                switch (item) {
                  case 'img':
                    selImg({
                      is_multi: true,
                      max_count: 1,
                      is_clip: false,
                      callback: function (rlt) {//选择图片处理
                        if (extra.op)
                          extra.op(rlt);
                      }
                    });
                    break;
                  case 'u':

                    if (extra.op)
                      extra.op();
                    break;
                  default:
                    break;
                }
                break;
              }
            }
            $.chat.obj.closeBoard();
          }
          //点击发送按钮
          else if (ret.eventType == 'send') {
            // alert(JSON.stringify(Global.page));
            var level_path = '';
            if (pages[Global.page["page"]]["_level_"] == 3)
              level_path = '../';
            else if (pages[Global.page["page"]]["_level_"] == 4)
              level_path = '../../';

            $.getJSON(level_path + "../image/emotion/emotion.json", function (emo) {
              var new_str = ret.msg.match(/\[[\u4E00-\u9FA5A-Z]+\]/ig);
              // var src = [];
              var msg = ret.msg;
              if (new_str) {
                for (var i = 0; i < new_str.length; i++) {
                  for (var j = 0; j < emo.length; j++) {
                    if (new_str[i] === emo[j].text) {
                      msg = msg.replace(new_str[i], "<img class='face' src='" + level_path + "../image/emotion/" + emo[j].name + ".png' />");
                      // src.push(emo[j].name);
                    }
                  }
                }
                // for (var k = 0; k < new_str.length; k++) {
                // 	msg = msg.replace(new_str[k], "<img class='face' src='../image/emotion/" + src[k] + ".png' />");
                // }
              }
              if ($.chat.send_text)
                $.chat.send_text(msg);
              $.chat.obj.closeKeyboard();
            })

          }
          if ($.chat.is_autohide)//是否自动隐藏
            $.chat.hide();
        },
        uichatbox: {
          placeholder: '请输入...',
          maxRows: 2,
          emotionPath: 'widget://image/emotion',
          texts: {
            recordBtn: {
              normalTitle: '按住 说话',
              activeTitle: '松开 结束'
            },
            sendBtn: {
              title: '发送'
            }
          },
          styles: {
            inputBar: {
              borderColor: '#d9d9d9',
              bgColor: '#f2f2f2'
            },
            inputBox: {
              borderColor: '#b3b3b3',
              bgColor: '#fff'
            },
            emotionBtn: {
              // normalImg: '../images/yuyin_icon.png'
            },
            extrasBtn: {
              normalImg: 'widget://image/tianjia_iconicon.png'
            },
            keyboardBtn: {
              // normalImg: 'widget://html/main2//images/yuyin_icon.png'
            },
            recordBtn: {
              narmalBg: '#c4c4c4',
              activeBg: '#fcae10',
              color: '#fff',
              size: 14
            },

            indicator: {
              target: 'both',
              color: 'ff0000',
              activeColor: '#9e9e9e'
            },
            sendBtn: {
              titleColor: '#fff',
              bg: '#fcae10',
              activeBg: '#33c3f3',
              titleSize: 14
            }
          },
          extras: {
            titleSize: 10,
            titleColor: '#a3a3a3',
            btns: []
          }
        },
      };
      var opts = $.extend(defaults, options);
      this.extras.img.op = opts.selected_img;
      //发送图片处理后事件
      // this.extras.u.op = opts.selected_u;
      //赠送U币
      this.send_text = opts.send_text;
      //发送文本内容
      this.is_autohide = opts.is_autohide;
      // 是否弹出键盘
      this.is_popupKeyboard = opts.is_popupKeyboard;
      opts.uichatbox.placeholder = opts.placeholder;
      //if(!$cyz.hasCusObj())
      this.obj = api.require('UIChatBox');

      //初始化聊天控件
      //加载扩展功能
      for (var i = 0; i < opts.extras.length; i++) {
        var extra = this.extras[opts.extras[i]];
        if (!extra)
          continue;
        opts.uichatbox.extras.btns.push({
          title: extra.title,
          normalImg: extra.normalImg
        });
        //添加
        extra.idx = i;
      }
      if (opts.extras.length < 1) {
        delete opts.uichatbox.styles.extrasBtn;
      }
      this.obj.open(opts.uichatbox, opts.op);

      this._uichatbox = opts.uichatbox;
      this._op = opts.op;

      if (opts.is_autohide)
        this.obj.hide();

      if (opts.is_popupKeyboard) {
        var self = this;
        var timer = setTimeout(function () {
          self.obj.popupKeyboard();
          clearTimeout(timer);
          timer = null;
        }, 100);

      }
      return this;
    },
    f5: function () {
      // alert('f5');
    },
    f6: function () {
      // alert('f6');
    }
  },
  ft3: {
    ft31: function () {
      // alert('ft31')
    }
  }
}); 