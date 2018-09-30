/*
 Title:首页
 Author:yang sen
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
mui.init();
(function($) {

	var SETTINGPROD = function(){
		this.ws = null;
		return this;
	}
	SETTINGPROD.prototype = {
		init:function(){
//			GHUTILS.setUserAgent();
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			var ws = plus.webview.currentWebview();
			$("#app_box_" + ws.showId).show();
			$(".app_title").html(ws.title);
			GHUTILS.getHotline($("#app_hotline"))
			plus.nativeUI.closeWaiting();
		},		
		getData:function(){
			var _this = this;
		},
		bindEvent:function(){
			$(".app_links").on("tap",function() {
				var links = $(this).attr("data-url");
				var title = $(this).attr("data-title");
				GHUTILS.OPENPAGE({
					url: "../index/index-linkpage.html",
					id:GHUTILS.PAGESID.LINKPAGES,
					extras:{
						title: title,
						links: links
					}
				})
			})
			
		}
	}
	mui.plusReady(function(){

		var settprod = new SETTINGPROD();
			settprod.init();
	});
})(Zepto);