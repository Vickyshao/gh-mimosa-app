/*
 Title:交易明细
 Author:fanyu
 Date:2016-8-23 08:50:34
 Version:v1.0
*/

(function($) {

	var PRODUCTTN = function() {
		this.ws = null;
		return this;
	}
	PRODUCTTN.prototype = {
		init: function() {
//			GHUTILS.setUserAgent();
			this.pageInit(); //页面初始化
			this.bindEvent(); //事件绑定
			this.getData(); //获取数据
		},
		pageInit: function() {
			var _this = this;
			var ws = plus.webview.currentWebview();

			mui.init({
				subpages: [{
					url: "account-deal.html",
					id: GHUTILS.PAGESID.ACCOUNTDEAL,
					styles: {
						top: GHUTILS.setTop(85)+"px",
						bottom: "0",
					},
					extras: {
						type: plus.webview.currentWebview().tradeType
					}
				}]
			});

			document.addEventListener("closeAfilter", function(e) {
				$("#app_filter_btn").addClass("app_btn_loading");
				setTimeout(function(){
					$("#app_filter_btn").removeClass("app_btn_loading");
				},550);

				$(".app_icon_box").removeClass("app_active");
			});

			document.addEventListener("changeTitle", function(e) {
				_this.changeTitle(e.detail);
			});

		},
		getData: function() {
			var _this = this;

		},
		bindEvent: function() {
			var _this = this;
			$("#app_filter_btn").on("tap", function() {
				var show = '';
				var obj = $("#app_icon_box") //.app_icon_box
				var that = $(this);
				if(that.hasClass("app_btn_loading")){
					return
				}
				that.addClass("app_btn_loading");
				setTimeout(function(){
					that.removeClass("app_btn_loading");
				},550);

				if (obj.hasClass("app_active")) {
					obj.removeClass("app_active");
					show = 'hide';
				} else {
					obj.addClass("app_active");
					show = 'show';
				}
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCOUNTDEAL), "showMenu", {
					show: show
				});
			});

			$("#app_filter_btn_all").on("tap", function() {

				if (!$(this).hasClass("app_active")) {
					$(this).addClass("app_active");
					_this.changeTitle({
						title: "交易类型"
					});
					_this.closeafilter();
					GHUTILS.nativeUI.showWaiting();
				}
			});

		},
		resetAfilter: function() {

		},
		closeafilter: function() {
			$(".app_icon_box").removeClass("app_active");
			mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCOUNTDEAL), "showMenu", {
				show: 'hide'
			});
			mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCOUNTDEAL), "showList");
		},
		changeTitle: function(_txt) {
			_txt = _txt.title;
			if (_txt == "交易类型") {
				$("#typeName").html("交易类型");
				$("#app_filter_btn").removeClass("app_links app_active");
			} else {
				$("#typeName").html(_txt);
				$("#app_filter_btn").addClass("app_links app_active");
				$("#app_filter_btn_all").removeClass("app_links app_active");
			}
		},

	}
	mui.plusReady(function() {

		var ptn = new PRODUCTTN();
		ptn.init();
	});
})(Zepto);