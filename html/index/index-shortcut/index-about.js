/*
 Title:关于我们
 Author:
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
(function($) {
	var ABOUT = function() {
		this.ws = null;
		return this;
	}
	ABOUT.prototype = {
		init: function() {
//			GHUTILS.setUserAgent();
//			$(".mui-fullscreen").css({"top": ""+GHUTILS.setTop(44)+"px"})
//			if (GHUTILS.getloginStatus(true)) {
				this.pageInit(); //页面初始化
				plus.nativeUI.closeWaiting();
//			}
		},
		pageInit: function() {
			var _this = this;
			GHUTILS.getHotline($("#hot-tel"))
			GHUTILS.listLinks();
			mui.ready(function() {
				//循环初始化所有下拉刷新，上拉加载。
				mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
//					mui(pullRefreshEl).pullToRefresh({
//						up: {
//							auto: true,
//							callback: function() {
//								var self = this;
//								_this.getList(index, self ,1);
//							}
//						}
//					});
				});
			});
			
		},
		closeWaiting: function(index) {
			plus.nativeUI.closeWaiting();

		},
		bindEvent: function() {
			var _this = this;
			
		}	
	}
	mui.plusReady(function() {
		var ab = new ABOUT();
		ab.init();
	});
})(Zepto);
