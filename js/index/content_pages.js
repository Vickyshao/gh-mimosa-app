(function($) {
	var Contentpages = function() {
		this.ws = plus.webview.currentWebview();
		return this;
	}
	Contentpages.prototype = {
		init: function() {
//			GHUTILS.setUserAgent();
//			$(".app_content_box").css({"top": ""+GHUTILS.setTop(54)+"px"})
			this.pageInit();
			this.bindEvent();
			this.getData();
		},
		pageInit: function() {
			var _this = this;
			$(".app_title").html(_this.ws.title);
			$(".app_content_txt").append(decodeURIComponent(_this.ws.content));
		},
		getData: function() {
			
		},
		bindEvent: function() {
			
		},
	}
	mui.plusReady(function() {
		var cp = new Contentpages();
		cp.init();
	});
})(Zepto);