const cyz = require('../../utils/cyz.comm');
import { Methods } from './methods.js';
function http(data) {
    return new Promise((resolve, reject) => {
        Object.assign(data, {
            func_sunc(rlt) { //成功时
                resolve(rlt)
            },
            func_error(err) {
              if (err.op.err_code=='211012'){
                wx.clearStorageSync();
                Methods.login();
              }else{
                wx.showModal({
                  title: '提示',
                  content: err.op.err_msg||'',
                })
              }
                reject(err)
            },
            _func_listen(title) {
                var log = "\r\n" + new Date().Format('H:m:s S') + "\t" + title + "\r\n\t";

                for (var i = 1; i < arguments.length; i++) {
                    log += $cyz.toStr(arguments[i]) + "\t";
                }
                log += "\r\n";
                // console.log(log);
                // $('.cls_test_listen').textbox('setValue', $('.cls_test_listen').textbox('getValue') + log);

            }
        })
        cyz.callasyn(data)
    })
}
export {
    http
}