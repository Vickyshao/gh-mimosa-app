/*
 Title:首页
 Author:yang sen
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
mui.init();
(function($) {

	var SETTING = function() {
		this.ws = null;
		this.userInfo = null;
		return this;
	}
	SETTING.prototype = {
		init: function() {
			this.pageInit(); //页面初始化
			this.bindEvent(); //事件绑定
			this.loadData(); //获取数据
		},
		pageInit: function() {
			var _this = this;
			document.addEventListener("loadData", function() {
				_this.loadData();
			});
		},
		loadData: function() {
			var _this = this;
			if(GHUTILS.getLocalCfg("spwdcfg")) {
				$("#app-handlock").addClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(20px, 0px);");
				$(".app-handlock").removeClass("app_none");
			} else {
				$("#app-handlock").removeClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(0px, 0px);");
				$(".app-handlock").addClass("app_none");
			}
		},
		bindEvent: function() {
			var _this = this;
			//初始化页面连接
			GHUTILS.listLinks();

			//手势密码开关
			$("#app-handlock").on("toggle", function(event) {
				if(event.detail.isActive == false) {

					if(!GHUTILS.getLocalCfg("spwdcfg")) {
						return
					}

					var btnArray = ['取消', '确定'];

					mui.confirm('关闭手势密码需要验证原密码', '提示', btnArray, function(e) {
						if(e.index == 1) {
							GHUTILS.OPENPAGE({
								url: "setting-spwd.html",
								id: GHUTILS.PAGESID.HANDLOCK,
								extras: {
									style: "close"
								}
							})
						} else {
							$("#app-handlock").addClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(20px, 0px);");
						}
					})

				} else {
					GHUTILS.OPENPAGE({
						url: "setting-spwd.html",
						id: GHUTILS.PAGESID.HANDLOCK
					})
				}
			})
		}
	}
	mui.plusReady(function() {

		var sett = new SETTING();
		sett.init();
	});
})(Zepto);