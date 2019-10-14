import { http } from './http.js';
const config = require('../../config');
const cyz = require('../../utils/cyz.comm');
let app = getApp();
// console.log(app,'()()()()()()_()()()()()()()()()()')
const Methods = {
  //**********微信系统api再封装 */
  login() {//登录通用
    const self = this;
    // wx.checkSession({
    //   success() {
    //     // session_key 未过期，并且在本生命周期一直有效
    //     console.log('4444444444444444444444!!!!!!!!!!!!!!!!!')
    //   },
    //   fail() {
    // session_key 已经失效，需要重新执行登录流程
    var user = cyz.Global.user();
    if (user && user.id && user.id > 0) {
      this.autoLogin()
      // .catch((err) => {
      //   if (err.op.err_code=='211012'){
      //     wx.clearStorageSync();
      //     self.login();
      //   }
      //     console.log(err);
      //   });
    } else {
      wx.login({
        success: rel => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.getSetting({
            success: res => {
              if (res.authSetting["scope.userInfo"]) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    http({
                      sign: "wxxcx_login",
                      npara: {
                        code: rel.code,
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        re_user_id: app.globalData.re_user_id || 0
                      }
                    })
                      .then((res) => {
                        cyz.Global.req_header(null);
                        cyz.Global.user(null);
                        cyz.Global.req_header(res.ext);
                        cyz.Global.user(res.npara);
                        let rlt = res.npara;
                        wx.setStorageSync("userInfo", rlt);
                        if (self && self.data && self.data.canBack) {
                          // if(self.data.id){
                          //   wx.redirectTo({
                          //     url: '../gooddetails/gooddetailsid='+self.data.id,
                          //   })
                          // }else{
                          wx.navigateBack();
                          // }
                        }
                        // self&&self.onShow();
                      }).catch((err) => {
                        console.log(err);
                      });
                  }
                })
              } else {
                wx.navigateTo({
                  url: "/pages/authorize/authorize",
                });
              }
            },
            fail: function (err) {
              wx.navigateTo({
                url: "/pages/authorize/authorize",
              });
            }
          })
        }
      }) // 重新登录
    }
    // }
    // })
  },
  wait() {
    wx.showToast({
      title: '请稍后，正在处理',
      coin: 'none',
    })
  },
  autoLogin() {
    http({
      sign: 'auto_login',
      load_msg: '登录中'
    })
      .then((res) => {
        let rlt = res.npara;
        cyz.Global.user(null);
        cyz.Global.user(rlt);
        wx.setStorageSync("userInfo", rlt);
      }).catch((err) => {
        // wx.clearStorageSync();
        // this.login();
        console.log(err);
      });

  },
  call(e) { //拨打电话
    let {
      tel
    } = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: tel //仅为示例，并非真实的电话号码
    })
  },
  jump(e) { //跳转
    let {
      url,
      open = "navigateTo",
      callback
    } = e.currentTarget.dataset;
    // console.log(open,'0000000000000000000000000000000')
    // open可取navigateTo，redirectTo,reLaunch,switchTab
    wx[open]({
      url,
    })
    this.callback(callback, e)
  },
  back(delta = 1) { //返回
    wx.navigateBack({
      delta
    })
  },
  page_back(key) { //返回上一页，并返回数据
    const self = this;
    const pages = getCurrentPages();
    const currPage = pages[pages.length - 1]; //当前页面
    const prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      [key]: self.data[key],
    })
    wx.navigateBack();
  },
  get_backdata({ key, num = 2, layer = false } = {}) {//拷贝之前页面数据到当前页面
    const self = this;
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - num]; //默认上一个页面  1是当前页面
    if (key) {
      if (!prevPage || !prevPage.data || !prevPage.data[key]) {
        return
      }
      if (layer) {//加载到渲染层
        this.setData({
          [key]: prevPage.data[key]
        })
      } else {
        this.data[key] = prevPage.data[key];
      }
    } else {
      if (layer) {
        this.setData(prevPage.data)
      } else {
        this.data = prevPage.data;
      }
    }
  },
  get_backfun({ key, num = 2, } = {}) {//拷贝之前页面方法到当前页面
    const self = this;
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - num]; //默认上一个页面  1是当前页面
    if (key) {
      this[key] = prevPage[key];
    }
  },
  get_auth() { //获取权限

  },
  get_system() {
    wx.getSystemInfo({
      success(ret) {

      }
    })
  },
  saveImage(e) {
    wx.saveImageToPhotosAlbum({
      success(res) {

      }
    })
  },
  previewImage(e) {//预览图片
    let { imgs } = e.currentTarget.dataset;
    if (typeof (imgs) == 'string') {
      imgs = [imgs];
    }
    wx.previewImage({
      // current: imgs[0], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    });
  },
  getuser(e) {//获取个人信息
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        } else {
          wx.navigateTo({
            url: '../authorize/authorize',
          })
        }
      },
      fail() {
        wx.navigateTo({
          url: '../authorize/authorize',
        })
      }
    })
  },
  getquery(element) {//获取节点
    let self = this;
    let query = wx.createSelectorQuery();
    query.select(element).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      self.setData({
        query: res
      })
    })
  },
  modal(e) { //modal专用
    let {
      callback
    } = e.currentTarget.dataset;
    return new Promise((resolve, reject) => {
      this.setData({
        modal: !this.data.modal,
      })
      this.callback(callback, e)
      resolve()
    })
  },
  confirm(obj) { //带按钮的提示框
    let {
      sign,
    } = obj;
    if (!sign) {
      ({
        sign,
      } = e.currentTarget.dataset); //从wxml带过来
    }
    const self = this;
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '提示',
        content: sign,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定');
            resolve();
          } else if (res.cancel) {
            // console.log('用户点击取消');
            reject();
          }
        }
      })
    })
  },
  del_one(e) { //删除数组某一项
    let {
      index,
      items,
      sign,//sign删除的提示语
      callback = ''
    } = e.currentTarget.dataset; //index 下标//
    //console.log(index,items,sign);
    let item = this.data[items]; //获取操作数组或对象数组
    let slef = this;
    return this.confirm({
      sign
    }) //sign删除的提示语
      .then((res) => {
        item.splice(index, 1);
        this.setData({
          [items]: item,
        })
        this.callback(callback, e);
      })
      .catch((err) => {
        console.log(err)
      })

  },
  //********选择某一项或多项*************
  switch_btn(e) { //true，false两种状态转换
    let {
      key,
      callback
    } = e.currentTarget.dataset;
    return new Promise((resolve, reject) => {
      this.setData({
        [key]: !this.data[key],
      })
      this.callback(callback, e)
      resolve()
    })
  },
  sel_one(e) { //单选，必须有一个选中
    let {
      key,
      value,
      callback
    } = e.currentTarget.dataset;
    return new Promise((resolve, reject) => {
      this.setData({
        [key]: value,
      })
      this.callback(callback, e);
      resolve()
    })
  },
  sel_one_reverse(e) { //多个项单选,可以都不选
    let {
      key,
      value,
      def,//默认值
      callback
    } = e.currentTarget.dataset;
    if (this.data[key] == value && this.data[key]) {
      value = def || -1; //0==false为true
    }
    return new Promise((resolve, reject) => {
      this.setData({
        [key]: value,
      })
      this.callback(callback, e);
      resolve()
    })
  },
  sel_all(e) { //全部选择
    let {
      key,
      items,//要操作的数组字段
      term = true,
      callback
    } = e.currentTarget.dataset;
    let item = this.data[items];
    let len = item.length;
    let sel_num_str = items + '_sel_num';
    let sel_items_str = items + '_sel_items';
    for (let i = 0; i < len; i++) {
      item[i][key] = true;
    }
    return new Promise((resolve, reject) => {
      this.data[sel_num_str] = len;//返回选择的长度
      this.data[sel_items_str] = item, //返回选中的数组
        this.setData({
          [items]: item, //返回操作后的数组
        })
      this.callback(callback, e)
      resolve()
    })
  },
  sel_not_all(e) { //全部取消 返回选择的数量，选择的项的数组
    let {
      key,
      items,
      term = true,
      callback
    } = e.currentTarget.dataset;
    let item = this.data[items];
    let len = item.length;
    let sel_num_str = items + '_sel_num';
    let sel_items_str = items + '_sel_items';
    for (let i = 0; i < len; i++) {
      item[i][key] = false;
    }
    return new Promise((resolve, reject) => {
      this.data[sel_num_str] = 0;
      this.data[sel_items_str] = [];
      this.setData({
        [items]: item,
      })
      this.callback(callback, e)
      resolve()
    })
  },
  sel_reverse() { //反向选择 返回选择的数量，选择的项的数组
    let {
      key,
      items,
      term = true,
      callback
    } = e.currentTarget.dataset;
    // if(!term)return;//如果不符合条件；返回
    let item = this.data[items];
    let len = item.length;
    let sel_num_str = items + '_sel_num';
    let sel_items_str = items + '_sel_items';
    let sel_num = 0;
    let sel_items = [];
    for (let i = 0; i < len; i++) {
      item[i][key] = !item[i][key];
      if (item[i][key]) {
        sel_num++;
        sel_items.push(item[index])
      }
    }
    return new Promise((resolve, reject) => {
      if (term) {
        this.data[sel_num_str] = sel_num;
        this.data[sel_items_str] = sel_items;
        this.setData({
          [items]: item,
        })
      }
      this.callback(callback, e, index)
      resolve(index)
    })
  },
  sel_more(e) { //多选，返回选择的数量，选择的项的数组
    let {
      key,
      index,
      items,
      term = true,
      callback
    } = e.currentTarget.dataset;
    let item = this.data[items];
    let len = item.length;
    let sel_num_str = items + '_sel_num';
    let sel_items_str = items + '_sel_items';
    let sel_num = 0;
    let sel_items = [];
    if (term) { //条件成立才进行数据处理
      item[index][key] = !item[index][key];
    }
    for (let i = 0; i < len; i++) {
      if (item[i][key]) {
        sel_num++;
        sel_items.push(item[i])
      }
    }
    return new Promise((resolve, reject) => {
      if (term) {
        this.data[sel_num_str] = sel_num;
        this.data[sel_items_str] = sel_items;
        this.setData({
          [items]: item,
        })
      }
      this.callback(callback, e, index)
      resolve(index)
    })
  },
  sel_more_type(e) { //多选 选择多个类型
    // let { key, index, items, callback } = e.currentTarget.dataset;
    // return new Promise((resolve, reject) => {
    //   this.setData({
    //     [items]: !this.data[items][index][key],
    //   })
    //   this.callback(callback, e)
    //   resolve()
    // })
  },
  write(e) {
    let {
      value
    } = e.detail;
    let {
      key,
      callback,
      regular,
      term = true,
      layer = false,
      msg = '输入格式有误',
    } = e.currentTarget.dataset;
    let rep = new RegExp(regular, 'gi');
    if ((regular && !rep.test(value)) || (!term)) { //格式不对regular为正则表达式
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      value = ''
    }
    this.setData({
      [key]: value
    })
    this.callback(callback, e);
  },
  copy(e) { //复制到粘贴板
    let {
      value,
      callback
    } = e.currentTarget.dataset;
    //console.log(value);
    wx.setClipboardData({
      data: value,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
    this.callback(callback, e)
  },
  get_copy(e) { //获取粘贴板的内容
    let this_ = this;
    let {
      callback,
      key
    } = e.currentTarget.dataset;
    wx.getClipboardData({
      success: function (res) {
        this_.setData({
          copy: res.data
        })
      }
    })
    this.callback(callback, e)
  },
  get_addr(e) { //获取系统收货地址
    let this_ = this;
    let {
      key = 'addr', callback
    } = e.currentTarget.dataset;
    wx.getSetting({
      success(res) {
        //console.log(res);
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              //console.log('sdfsdfsfdsdfsdfsdfs')
              wx.chooseAddress({
                success: function (res) {
                  this_.setData({
                    [key]: res
                  })
                },
                fail(err) {
                  //console.log(JSON.stringify(err));
                }
              })
            },
            fail(err) {
              // console.log(err,'eeeeeeeeeeeeeeeeeeeee');
            }
          })
        } else {
          wx.chooseAddress({
            success: function (res) {
              this_.setData({
                [key]: res
              })
            },
            fail(err) {
              //console.log(JSON.stringify(err));
            }
          })
        }
      },
      fail(err) {
        //console.log(err);
      }
    })
    this.callback(callback, e)
  },
  set_title(title) { //动态设置当前页面标题
    wx.setNavigationBarTitle({
      title
    })
  },
  get_network() { },
  sel_img({
    count = 1,
    sizeType = ['compressed'],
    sourceType = ['camera', 'album',]
  } = {}) {
    const [self] = [this];
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count, // 默认1
        sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType, // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // console.log(res.tempFiles)
          resolve(res.tempFiles);
        },
        fail: function (err) {
          reject(err);
        }
      })
    })
  },
  uploadFile({
    filePath_index,
    data,
    name = 'file',
    form_data = { 'user': 'test' }
  } = {}) {
    const [self] = [this];
    return new Promise((resolve, reject) => {
      // console.log('上传的临时文件++++++++++++++++++++++++',filePath);
      wx.uploadFile({
        url: `https://${config.host}/SimpleFramework/fileUpload.php`, //仅为示例，非真实的接口地址
        filePath: data[filePath_index || 0].path, //文件临时路径
        header: {
          'content-type': 'multipart/form-data'
        },
        name,
        formData: form_data,
        success: function (res) {
          // console.log('-----======上传后的结果data----==-=-=-=--', res.data);
          let obj = JSON.parse(res.data);
          //console.log('-----======上传后的结果----==-=-=-=--', res);
          resolve(obj.npara)
          //do something
        },
        fail: function (err) {
          reject(err);
        }
      })
    })

  },
  upload_img(e = {}) { //选择并上传图片
    let {
      form_data,
      callback
    } = e.currentTarget.dataset;
    return this.sel_img({}).then((data) => {
      let promises = [];
      for (let i = 0; i < data.length; i++) {
        promises.push(
          this.uploadFile({
            filePath_index: i,
            data,
            name: 'img',
            formData: form_data
          })
        )
      }
      // }
      return Promise.all(promises)
    })
      .catch((err) => {
        //console.log(err)
      })
  },
  callback(callback, e) {
    if (callback) {
      e.currentTarget.dataset.callback = '';
      if (this[callback]) {
        return this[callback](e);
      }
      return [callback](e)
    }
  },
  form_push: function (e) { //模板消息专用
    let { formId: formid } = e.detail;
    //console.log('formId', formid)
    if (!formid) {
      return;
    }
    http({
      sign: "piao_save_fromid",
      npara: {
        formid,
        user_id: getApp().globalData.logined.id
      }
    }).then((res) => { }).catch((err) => { })
  },
  null_fun() {
    //空函数
    return
  },
  //********操作数据*********操作数据*************操作数据****************
  rep_str(str, n, m) { //n=3，m=4，130****1234123
    //替换中间字符
    return str.replace(/^(\d{3})\d*(\d{4})$/, "$1****$2");
  },
  quickSort(arr) { //快速排序
    //如果数组的个数小于等于1，就返回该数组
    if (arr.length <= 1) {
      return arr;
    } else {
      //否则，取得该数组的中间位置，保存在变量c中
      let c = Math.floor(arr.length / 2);
      //将变量c位置的值取出来存入变量center中
      let center = arr.splice(c, 1)[0];
      //声明两个空数组left、right
      let left = [];
      let right = [];
      //然后遍历arr数组将每个数与center做比较，大的放在right中，小的放在left中
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= center) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
      //最后返回左边和右边的数组，并对其做相同操作，直到递归完成
      return quickSort(left).concat(center).concat(quickSort(right));
    }
  },
  //******支付通用********支付通用*******支付通用********
  payorder: function ({ npara = {} } = {}) {
    const self = this;
    wx.showModal({
      title: '提示',
      content: '确认支付该订单？',
      success: function (res) {
        if (res.confirm) {
          return http({
            sign: 'shop_order_pay',
            npara,
          }).then((res) => {
            var paydata = res.npara.pay_data;
            wx.requestPayment({
              'timeStamp': paydata.timeStamp,
              'nonceStr': paydata.nonceStr,
              'package': paydata.package,
              'signType': 'MD5',
              'paySign': paydata.paySign,
              success(res) {
                console.log(res, '##########################');
                if (res.errMsg == 'requestPayment:ok') {
                  wx.showToast({
                    title: '支付成功',
                  });
                  if (self.route == 'pages/order/order') {
                    self.setData({
                      state: 1
                    })
                    self.get_list();
                  } else {
                    self.back();
                  }
                }
              },
              fail(res) {
                console.log(res);
                if (res.errMsg == 'requestPayment:fail cancel') {
                  wx.showToast({
                    title: '取消支付',
                    icon: 'none'
                  });
                }
                wx.redirectTo({
                  url: '../order/order?state=0'
                })
              }
            })
          }).catch((err) => {
            console.log(err);
          });
        } else if (res.cancel) {
          return Promise.resolve();
        }
      }
    })
  },
  // *********创建订单**********创建订单***********创建订单**********
  create_order: function ({ npara = {} } = {}) {
    const self = this;
    return http({
      sign: "shop_order_add",
      npara: npara
    }).then((res) => {
      if (res.npara.state == 1) {
        wx.showToast({
          title: '支付成功',
        })
        wx.redirectTo({
          url: '../order/order?state=1'
        })
      } else if (res.npara.state == 2) {
        wx.showToast({
          title: '请稍后支付',
          icon: 'none'
        })
        wx.redirectTo({
          url: '../order/order?state=0'
        })
      } else {
        let paydata = res.npara.pay_data;
        wx.requestPayment({
          'timeStamp': paydata.timeStamp,
          'nonceStr': paydata.nonceStr,
          'package': paydata.package,
          'signType': 'MD5',
          'paySign': paydata.paySign,
          'success': function (res) {
            if (res.errMsg == 'requestPayment:ok') {
              wx.showToast({
                title: '支付成功',
              });
              if (self.route == 'pages/order/order') {
                self.get_list()
                self.setData({
                  state: 1,
                })
              } else if (self.route == 'pages/orderdetails/orderdetails') {
                self.back();
              } else {
                wx.redirectTo({
                  url: '../order/order?state=1'
                })
              }
            }
          },
          'fail': function (res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.showToast({
                title: '取消支付',
                icon: 'none'
              });
            }
            wx.redirectTo({
              url: '../order/order?state=0'
            })
          }
        })
      }
    }).catch((err) => { })
  },
  countDown(msec, handle, type = 1) {//msec精确到毫秒数的字符串或数组
    const self = this;
    if (typeof (msec) == 'string' || typeof (msec) == 'number') {
      msec = [msec];
      //  console.log('$$$$$$$$$$$$$$$$$$$$')
    } else if (msec instanceof Array) {

    }
    // console.log(msec,'****************');
    let func = function () {
      let num = 0;
      let now = new Date().getTime();
      let items = self.data[handle.source];//目标可能是数组也可以是字符串
      for (let i = 0; i < msec.length; i++) {
        let count = '';
        if (now >= msec[i]) {//超出有效时间
          num++;
          if (num >= msec.length) {
            clearInterval(self.data.ITMER);
            self.data.ITMER = null;
          }
          continue;
        }
        let count_num = msec[i] - now;
        let d = (count_num / (60 * 60 * 1000 * 24)) >> 0;
        let h = (count_num % (60 * 60 * 1000 * 24) / (60 * 60 * 1000)) >> 0;
        let m = (count_num % (60 * 60 * 1000) / (60 * 1000)) >> 0;
        let s = ((count_num % (60 * 1000)) / 1000) >> 0;
        if (type == 1) {//输出格式  01天23小时50分56秒
          count += d > 9 ? d + '天' : d > 0 ? '0' + d + '天' : '';
          count += h > 9 ? h + '小时' : (h > 0 || d > 0) ? '0' + h + '小时' : '';
          count += m > 9 ? m + '分' : (m > 0 || d > 0 || h > 0) ? '0' + m + '分' : '';
          count += s > 9 ? s + '秒' : (s > 0 || m > 0 || d > 0 || h > 0) ? '0' + s + '秒' : '';
        } else {//输出格式   23:50:56
          if (s != 0 || m != 0 || h != 0 || d != 0) {
            count += ((d * 24 + h) > 9 ? d * 24 + h : '0' + (d * 24 + h)) + ':';
            count += (m > 9 ? m : '0' + m) + ':';
            count += (s > 9 ? s : '0' + s);
          }
        }
        if (handle.key) {
          items[i] || (item[i] = {});
          items[i][handle.key] = count;
        } else {
          if (msec.length > 1) {
            items[i] = count;
          } else {
            items = count;
          }
        }
      }//遍历结束
      self.setData({
        [handle.source]: items
      })
    }
    func();
    this.data.ITMER = setInterval(() => {
      // console.log(')))))))))))))))))))))))))))');
      func();
    }, 1000)
  },

  //*******下一个项目删除掉stat*************
  //海报制作
  draw_img() {
    let app = getApp();
    const self = this;
    this.setData({
      modal: true,
    })
    if (app.globalData.poster) {
      self.setData({
        image: app.globalData.poster
      })
      return;
    }
    this.getqrcode();
    wx.showLoading({
      title: '加载中',
    })
    let ctx = wx.createCanvasContext('firstCanvas');
    let can_draw = 0;
    //画主图
    let tiemr0 = setInterval(() => {
      const { poster_bgimg } = app.globalData;
      if (poster_bgimg) {
        // console.log('*********************************************')
        clearInterval(tiemr0);
        tiemr0 = null;
        wx.getImageInfo({
          src: poster_bgimg.replace(/http:/, 'https:'),
          success: function (res) {
            var path = res.path;
            // console.log(path,"++++++++++++++++++++++++++++++++++")
            ctx.drawImage(path, 0, 0, 750, 1334);
            can_draw += 80;
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    }, 10)
    //画二维码
    let tiemr2 = setInterval(() => {
      const { qrcode } = self.data;
      console.log(qrcode);
      if (qrcode && can_draw == 80) {
        clearInterval(tiemr2);
        tiemr2 = null;
        wx.getImageInfo({
          src: qrcode,
          success: function (res) {
            var path = res.path;
            // console.log(path,"++++++++++++++++++++++++++++++++++")
            ctx.save();
            ctx.beginPath(); //开始绘制
            // 先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
            ctx.arc(632, 1216, 78, 0, Math.PI * 2, false);
            ctx.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
            ctx.drawImage(path, 554, 1138, 156, 156);
            ctx.restore();
            can_draw += 30;
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    }, 10)
    let timer = setInterval(function () {
      if (can_draw > 100) {
        clearInterval(timer);
        ctx.draw(true, function () {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750,
            height: 1334,
            destWidth: 750,
            destHeight: 1334,
            canvasId: 'firstCanvas',
            success(res) {
              //  console.log(res, 'YYYYYYYYYYYYYYYY')
              //  self.data.image = res.tempFilePath
              app.globalData.poster = res.tempFilePath;
              wx.hideLoading()
              self.setData({
                image: res.tempFilePath,
              })
            }
          })
        });
      }
    }, 10)
  },
  saveimg() {
    const self = this;
    if (!this.data.image) {
      this.wait();
      return;
    }
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              self.save_img();
            }
          })
        } else {
          self.save_img();
        }
      },
      fail(err) {
        wx.openSetting({
          success(settingdata) {
            console.log(settingdata)
            if (settingdata.authSetting['scope.writePhotosAlbum']) {
              self.save_img();
            } else {
              wx.showToast({
                title: '请授权后再操作',
                coin: 'none'
              })
            }
          }
        })
      }
    })
  },
  save_img() {
    const self = this;
    wx.saveImageToPhotosAlbum({
      filePath: self.data.image,
      success: function (data) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (err) {
        console.log(err);
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          console.log("当初用户拒绝，再次发起授权")
          wx.openSetting({
            success(settingdata) {
              console.log(settingdata)
              if (settingdata.authSetting['scope.writePhotosAlbum']) {
                console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
              } else {
                console.log('获取权限失败，给出不给权限就无法正常使用的提示')
              }
            }
          })
        }
      },
      complete(res) {
        console.log(res);
      }
    })
  },
  getqrcode() {
    const self = this;
    let npara = {};
    console.log(this.route);
    if (this.route == 'pages/gooddetails/gooddetails') {
      npara.goods_id = self.data.good.id;
    }
    http({
      sign: "xcx_qrcode",
      npara,
    }).then((res) => {
      self.data.qrcode = res.npara.qrcode;
    })
      .catch((err) => {
        console.log(err);
      })
  },
  creat_group(e) {
    let { gid } = e.currentTarget.dataset;
    const self = this;
    wx.showModal({
      title: '提示',
      content: '是否确定发起组队？',
      success: function (res) {
        if (res.confirm) {
          http({
            sign: "treasure_add_group",
            npara: {
              gid,
            }
          })
            .then((res) => {
              self.setData({
                prize: false,
              })
              const pages = getCurrentPages();
              if (self.route == 'pages/teamdetails/teamdetails') {
                wx.redirectTo({
                  url: '../organize/organize?groupid=' + res.npara.id,
                })
              } else if (pages[pages.length - 2] && pages[pages.length - 2].route == 'pages/myteam/myteam') {
                self.back();
              } else {
                wx.navigateTo({
                  url: '../organize/organize?groupid=' + res.npara.id
                })
              }
              wx.showToast({
                title: '组队成功',
              })
            })
            .catch((err) => {
              console.log(err)
            })
        } else if (res.cancel) {
          return Promise.resolve();
        }
      }
    })

  },
  //*******下一个项目删除掉end**************
}
export {
  Methods
}
