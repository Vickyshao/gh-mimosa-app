/*
 Title:首页
 Author:yang sen
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
mui.init({
	subpages:[{
      url:'account-webview.html',//下拉刷新内容页面地址
      id:GHUTILS.PAGESID.ACCOUNTVW//内容页面标志
    }]
});
(function($) {

	var ACCOUNT = function(){
		this.ws = null;
		return this;
	}
	ACCOUNT.prototype = {
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
			
		},
		bindEvent:function(){
			var _this = this;

		}
	}
	mui.plusReady(function(){

		var ac = new ACCOUNT();
			ac.init();
	});
})(mui);