var filters = {
  filters: {

    //时间处理过滤器开始

    //时间格式化
    fromdate(date, format) {
      //date传入的时间戳，精确到秒
      // format时间格式
      if (!date) {
        //date等于'',0,undefined,NaN,null,false
        return ''
      } else {
        //默认返回2018-12-13 23:24:24格式
        return new Date(date * 1000).Format(format || 'yyyy-MM-dd HH:mm:ss');
      }
    },
    //时间截取
    dateTime(str) {
      //str="2018-12-12 12:23:24"
      //返回 12:23:24
      return str.split(' ')[1];
    },
    //日期截取
    dateDay(str) {
      //str="2018-12-12 12:23:24"
      //返回 2018-12-12
      return str.split(' ')[0];
    },
    //倒计时
    timeCountdown(msec, format) {
      //mse传入的毫秒数 精确到秒
      //format输出的时间格式  默认23:23:23
      var count = '';
      var count_num = msec * 1000;
      if (count_num <= 0) {
        if (format == 'd天H小时m分s秒') {//输出格式  01天23小时50分56秒
          return '时间到了'
        } else if (format == 'HH:mm:ss') {//输出格式   23:50:56
          return '00:00:00'
        }

      }
      var d = (count_num / (60 * 60 * 1000 * 24)) >> 0;
      var h = (count_num % (60 * 60 * 1000 * 24) / (60 * 60 * 1000)) >> 0;
      var m = (count_num % (60 * 60 * 1000) / (60 * 1000)) >> 0;
      var s = ((count_num % (60 * 1000)) / 1000) >> 0;

      if (format == 'd天H小时m分s秒') {//输出格式  01天23小时50分56秒
        count += d > 9 ? d + '天' : d > 0 ? '0' + d + '天' : '';
        count += h > 9 ? h + '小时' : (h > 0 || d > 0) ? '0' + h + '小时' : '';
        count += m > 9 ? m + '分' : (m > 0 || d > 0 || h > 0) ? '0' + m + '分' : '';
        count += s > 9 ? s + '秒' : (s > 0 || m > 0 || d > 0 || h > 0) ? '0' + s + '秒' : '';
      } else if (format == 'HH:mm:ss') {//输出格式   23:50:56
        if (s != 0 || m != 0 || h != 0 || d != 0) {
          count += ((d * 24 + h) > 9 ? d * 24 + h : '0' + (d * 24 + h)) + ':';
          count += (m > 9 ? m : '0' + m) + ':';
          count += (s > 9 ? s : '0' + s);
        }
      }
      return count;
    },
    //时间处理过滤器结束

    // 字符处理
    phoneStr(phone) {
      //判断phone是否为数字类型
      //输出 177****234
      var tel = phone;
      if (typeof (tel) == 'number') {
        tel = String(tel);
      }
      return tel.replace(/^(\d{3})\d*(\d{4})$/, "$1****$2");
    },


    // 数字转换为中文数字
    numTochineseNum(num) {
      let Num = parseFloat(num);
      let num_str = '';
      switch (Num) {

        case 1:
          num_str = "一";
          break;
        case 2:
          num_str = "二";
          break;
        case 3:
          num_str = "三";
          break;
        case 4:
          num_str = "四";
          break;
        case 5:
          num_str = "五";
          break;
        case 6:
          num_str = "六";
          break;
        case 7:
          num_str = "七";
          break;
        case 8:
          num_str = "八";
          break;
        case 9:
          num_str = "九";
          break;
        case 10:
          num_str = "十";
          break;
        default:
          num_str = '不在范围'
      }
      return num_str
    },

    //处理数据-----start
    fixed(value, num) {
      // 保留小数点多少位 默认保留两位
      // 判断value是否为数字
      const fixed_before = parseFloat(value);
      //NaN!==NaN
      if (fixed_before !== fixed_before) {
        return '0.00';
      }
      return fixed_before.toFixed(num || 2);
    },
    //处理状态-----end
    stateToStr(val) {
      let state = '';
      switch (parseInt(val)) {
        case 0:
          state = "待付款";
          break;
        case 1:
          state = "已付款";
          break;
        case 2:
          state = "处理中";
          break;
        case 3:
          state = "处理失败";
          break;
        case 4:
          state = "已完成";
          break;
        case 7:
          state = "待审核";
          break;
        case 6:
          state = "已取消";
          break;
        default:
          state = ''
      }
      return state;
    },
    // stateToStr (val, obj) {

    //   var state = '';
    //   if (obj) {
    //     for (var i in obj) {
    //       if (obj[i] == val) {
    //         state = i;
    //         break;
    //       }
    //     }
    //   } else {

    //   }
    //   return state;
    // },

  }
}
