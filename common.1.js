import filters from './filters.js';
import methods from './methods.js';
import computed from './computed.js';
const debug = true;

const common = {
	data: function() {
		return {
			num: 1, //常用于商品数量
			page: 1, //分页页数
			timer: '', //接收定时器id
		}
	},

	/*
	生命周期开始
	*/

	/*
	-------------------------vue生命周期--------------------------------
	*/
	/*
	beforeCreate
	在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
	*/
	beforeCreate() {
		debug && (console.log('这是VUE生命周期--->beforeCreate'));

	},
	/*
	 created
	在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，
	属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
	*/
	created() {
		debug && (console.log('这是VUE生命周期--->created'));
	},
	/*
	beforeMount
	在挂载开始之前被调用：相关的 render 函数首次被调用。
	该钩子在服务器端渲染期间不被调用。
	*/
	beforeMount() {
		debug && (console.log('这是VUE生命周期--->beforeMount'));
	},
	/*
	mounted
	el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
	注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted：
	该钩子在服务器端渲染期间不被调用。
	*/
	mounted() {
		debug && (console.log('这是VUE生命周期--->beforeMount'));
		this.$nextTick(function() {
			// Code that will run only after the
			// entire view has been rendered
		})
	},
	/*
	beforeUpdate
	数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
	该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
	*/
	beforeUpdate() {
		debug && (console.log('这是VUE生命周期--->beforeUpdate'));
	},
	/*
	updated
	由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
	当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
	注意 updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated：
	该钩子在服务器端渲染期间不被调用。
	*/
	updated() {
		debug && (console.log('这是VUE生命周期--->updated'));
		this.$nextTick(function() {
			// Code that will run only after the
			// entire view has been re-rendered
		})
	},
	/*
	activated
	keep-alive 组件激活时调用。
	该钩子在服务器端渲染期间不被调用。
	*/
	activated() {
		debug && (console.log('这是VUE生命周期--->activated'));

	},
	/*
	deactivated
	keep-alive 组件停用时调用。
	该钩子在服务器端渲染期间不被调用。
	*/
	deactivated() {
		debug && (console.log('这是VUE生命周期--->deactivated'));
	},
	/*
	beforeDestroy
	实例销毁之前调用。在这一步，实例仍然完全可用。
	该钩子在服务器端渲染期间不被调用。
	*/
	beforeDestroy() {
		debug && (console.log('这是VUE生命周期--->beforeDestroy'));
		//卸载页面清除定时器
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},
	/*
	destroyed
	Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
	该钩子在服务器端渲染期间不被调用。
	*/
	destroyed() {
		debug && (console.log('这是VUE生命周期--->destroyed'));
	},
	/*
	errorCaptured
	2.5.0+ 新增
	类型：(err: Error, vm: Component, info: string) => ?boolean
	详细：
	当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。
	你可以在此钩子中修改组件的状态。因此在模板或渲染函数中设置其它内容的短路条件非常重要，它可以防止当一个错误被捕获时该组件进入一个无限的渲染循环。
	错误传播规则
	默认情况下，如果全局的 config.errorHandler 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报。
	如果一个组件的继承或父级从属链路中存在多个 errorCaptured 钩子，则它们将会被相同的错误逐个唤起。
	如果此 errorCaptured 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 config.errorHandler。
	一个 errorCaptured 钩子能够返回 false 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 errorCaptured 钩子和全局的 config.errorHandler。
	*/
	errorCaptured() {
		debug && (console.log('这是VUE生命周期--->errorCaptured'));
	},
	
	
	/*
		---------------------------------小程序生命周期-------------------------
	*/
		
		/*
		onLoad
		页面创建时执行
		*/
		onLoad(options) {
			debug && (console.log('这是生命周期--->onLoad'));
		},
		/*
		onShow
		页面出现在前台时执行
		*/
		onShow() {
			debug && (console.log('这是生命周期--->onShow'));
		},
		/*
		onReady
		页面首次渲染完毕时执行
		*/
		onReady() {
			debug && (console.log('这是生命周期--->onReady'));
		},
		/*
		onHide
		页面从前台变为后台时执行
		*/
		onHide() {
			debug && (console.log('这是生命周期--->onHide'));
		},
		/*
		onUnload
		页面销毁时执行
		*/
		onUnload() {
			debug && (console.log('这是生命周期--->onUnload'));
		},
		/*
		onPullDownRefresh
		触发下拉刷新时执行
		*/
		onPullDownRefresh() {
			debug && (console.log('这是生命周期--->onPullDownRefresh'));
		},
		/*
		onReachBottom
		页面触底时执行
		*/
		onReachBottom() {
			debug && (console.log('这是生命周期--->onReachBottom'));
		},
		/*
		onShareAppMessage
		页面被用户分享时执行
		*/
		onShareAppMessage() {
			debug && (console.log('这是生命周期--->onShareAppMessage'));
		},
		/*
		onPageScroll
		页面滚动时执行
		*/
		onPageScroll() {
			debug && (console.log('这是生命周期--->onPageScroll'));
		},
		/*
		onResize
		页面尺寸变化时执行
		*/
		onResize() {
			debug && (console.log('这是生命周期--->onResize'));
		},
		onTabItemTap(item) {
			// tab 点击时执行
			console.log(item.index)
			console.log(item.pagePath)
			console.log(item.text)
		},
	/*
	-----------------------------------生命周期结束---------------------------------------------
	*/
	watch: {
		//监听页数变化
		page(newval, oldval) {
			// do something
		}
	},
	filters,
	computed,
	methods,
}


export default common;
