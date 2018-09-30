/*
 Title:活期产品介绍
 Author:sunli haiyang
 Date:2016-6-21 20:41:37
 Version:v1.0
*/

(function($) {
	var PRODUCTT0INTRODUCE = function(){
		this.ws = plus.webview.currentWebview();
		return this;
	}
	PRODUCTT0INTRODUCE.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			plus.nativeUI.closeWaiting();
			$("#app_productName").html(_this.ws.productName)
			$(".app_lockPeriodDays").html(_this.ws.lockPeriodDays)
			$("#app_investMin").html(_this.ws.investMin)
			$("#app_interest").html(_this.ws.interest)
		},
		getData:function(){
			var _this = this;
		},
		bindEvent:function(){
			var _this = this;
		}
	}
	mui.plusReady(function(){
		var t0intr = new PRODUCTT0INTRODUCE();
			t0intr.init();
	});
})(Zepto);