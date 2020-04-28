//添加原型链


Number.prototype.toFixed = function (length) {
	var carry = 0; //存放进位标志
	var num, multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
	var str = this + ''; //将调用该方法的数字转为字符串
	var dot = str.indexOf("."); //找到小数点的位置
	if (str.substr(dot + length + 1, 1) >= 5) carry = 1; //找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
	multiple = Math.pow(10, length); //设置浮点数要扩大的倍数
	num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
	var result = num / multiple + ''; //将进位后的整数再缩小为原浮点数
	/*
	 * 处理进位后无小数
	 */
	dot = result.indexOf(".");
	if (dot < 0) {
		result += '.';
		dot = result.indexOf(".");
	}
	/*
	 * 处理多次进位
	 */
	var len = result.length - (dot + 1);
	if (len < length) {
		for (var i = 0; i < length - len; i++) {
			result += 0;
		}
	}
	return result;
}

/*
大数相加
在 js 中，对于超大整数的运算，还存在格式问题
当数字超出某个范围的时候，数字会自动转为科学计数法
这个时候如果还需要输出常规格式，就需要将数字转为字符串，然后实现一个字符串加法
*/
Math.sumBigNumber = function (a, b) {
	var res = '', temp = 0;
	a = a.split('');
	b = b.split('');
	while (a.length || b.length || temp) {
		temp += ~~a.pop() + ~~b.pop();
		res = (temp % 10) + res;
		temp = temp > 9;
	}
	return res.replace(/^0+/, '');
}

/******************************精准运算*************************************/

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：$h.Add(arg1,arg2)
//返回值：arg1加上arg2的精确结果
Math.Add = function (arg1, arg2) {
	arg2 = parseFloat(arg2);
	var r1, r2, m;

	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}

	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}

	m = Math.pow(100, Math.max(r1, r2));
	return (this.Mul(arg1, m) + this.Mul(arg2, m)) / m;
}
//减法函数，用来得到精确的减法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：$h.Sub(arg1,arg2)
//返回值：arg1减去arg2的精确结果
Math.Sub = function (arg1, arg2) {
	arg1 = parseFloat(arg1);
	arg2 = parseFloat(arg2);
	var r1, r2, m, n;

	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}

	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}

	m = Math.pow(10, Math.max(r1, r2)); //动态控制精度长度

	n = r1 >= r2 ? r1 : r2;
	return ((this.Mul(arg1, m) - this.Mul(arg2, m)) / m).toFixed(n);
}
/*乘法函数，用来得到精确的乘法结果
**说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
**调用：$h.Mul(arg1,arg2)
**返回值：arg1乘以arg2的精确结果
*/
Math.Mul = function (arg1, arg2) {
	arg1 = parseFloat(arg1);
	arg2 = parseFloat(arg2);
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();

	try {
		m += s1.split(".")[1].length;
	} catch (e) { }

	try {
		m += s2.split(".")[1].length;
	} catch (e) { }

	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
/*
*除法函数，用来得到精确的除法结果
*说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
*调用：$h.Div(arg1,arg2)
*返回值：arg1除以arg2的精确结果
*/
Math.Div = function (arg1, arg2) {
	arg1 = parseFloat(arg1);
	arg2 = parseFloat(arg2);
	var t1 = 0,
		t2 = 0,
		r1,
		r2;

	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) { }

	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) { }

	r1 = Number(arg1.toString().replace(".", ""));
	r2 = Number(arg2.toString().replace(".", ""));
	return r1 / r2 * Math.pow(10, t2 - t1);
}

/*******************************运算end************************************/