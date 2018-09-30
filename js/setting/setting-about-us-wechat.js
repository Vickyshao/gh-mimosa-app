/*
 Title:首页
 Author:
 Date:2016-6-20 
 Version:v1.0
*/
mui.init();
(function($) {

		
	var ABOUTUS = function(){
		this.ws = null;
		return this;
	}
	ABOUTUS.prototype = {
		init:function(){
//			GHUTILS.setUserAgent();
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			plus.nativeUI.closeWaiting();
		},		
		getData:function(){
			var _this = this;
			
			
		},
		bindEvent:function(){
			
		}
	}
	mui.plusReady(function(){

		var sett = new ABOUTUS();
			sett.init();
	});
})(Zepto);