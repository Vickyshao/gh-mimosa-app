/*
 Title:活动列表
 Author:sunli haiyang
 Date:2016-6-19 13:50:34
 Version:v1.0
*/
mui.init({
	subpages:[{
      url:'activities-webview.html',//下拉刷新内容页面地址
      id:GHUTILS.PAGESID.ACTIVITYWV,//内容页面标志
      styles:{
      	top:"0",
      	bottom:"0"
      }
    }]
});
(function($) {

	var ACTIVITIES = function(){
		this.ws = null;
		return this;
	}
	ACTIVITIES.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
		},		
		getData:function(){
			var _this = this;
			plus.nativeUI.closeWaiting();
		},
		bindEvent:function(){
			var _this = this;
		}
	}
	mui.plusReady(function(){
		var act = new ACTIVITIES();
			act.init();
	});
})(Zepto);