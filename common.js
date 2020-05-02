import filters from './filters.js';
import methods from './methods.js';
import computed from './computed.js';
import watch from './watch.js';
const debug = true;

const common = {
	data: function() {
		return {
			num: 1, //常用于商品数量
			page: 1, //分页页数
			limit: '16',
			hasmore: true,
			timer: '', //接收定时器id
			Route: '',//当前页面路径
		
		}
	},

	/*
	生命周期开始
	*/

	/*
	onLoad	
	监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参），参考示例
	*/
	onLoad(){
		console.log('home===> this is onload');
	},
	/*
	onShow	
	监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
	*/
	onShow(){
		
	},
	/*
	onReady	
	监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
	*/
	onReady(){
		// #ifdef H5
		this.Route = this.route;//当前页面路径
		// #endif
		// #ifndef H5
		this.Route = this.__route__;//当前页面路径
		// #endif
	},
	/*
	onHide	
	监听页面隐藏	
	*/
	onHide(){
		
	},
	/*
	onUnload	
	监听页面卸载	
	*/
	onUnload(){
		
	},
	/*
	onResize	
	监听窗口尺寸变化
	*/
	onResize(){
		
	},
	/*
	onPullDownRefresh	
	监听用户下拉动作，一般用于下拉刷新，参考示例
	*/
	onPullDownRefresh(){
		
	},
	/*
	onReachBottom	
	页面上拉触底事件的处理函数
	*/
	onReachBottom(){
		
	},
	/*
	onTabItemTap	
	点击 tab 时触发，参数为Object，
	*/
	onTabItemTap(){
		
	},
	/*
	onShareAppMessage	
	用户点击右上角分享
	*/
	onShareAppMessage(){
		
	},
	/*
	onPageScroll	
	监听页面滚动，参数为Object
	*/
	onPageScroll(){
		
	},
	/*
	onNavigationBarButtonTap	
	监听原生标题栏按钮点击事件，参数为Object
	*/
	onNavigationBarButtonTap(){
		
	},
	/*
	onBackPress
	监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；详细说明及使用：onBackPress 详解
	*/
	onBackPress(){
		
	},
	/*
	onNavigationBarSearchInputChanged	
	监听原生标题栏搜索输入框输入内容变化事件
	*/
	onNavigationBarSearchInputChanged(){
		
	},
	/*
	onNavigationBarSearchInputConfirmed	
	监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
	*/
	onNavigationBarSearchInputConfirmed(){
		
	},
	/*
	onNavigationBarSearchInputClicked	
	监听原生标题栏搜索输入框点击事件
	*/
	onNavigationBarSearchInputClicked(){
		
	},
	/*
	-----------------------------------生命周期结束---------------------------------------------
	*/
	watch,
	filters,
	computed,
	methods,
}


export default common;
