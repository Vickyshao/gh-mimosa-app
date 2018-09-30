/*
 Title:协议
 Author:dxy
 Date:2016-6-4 18:31:00
 Version:v1.0
*/

(function($) {

	var LINKPAGE = function() {
		this.ws = null;
		return this;
	}
	LINKPAGE.prototype = {
		init: function() {
			this.pageInit(); //页面初始化
			this.bindEvent(); //事件绑定
			this.getData(); //获取数据
		},
		pageInit: function() {
			var _this = this;
			var ws = plus.webview.currentWebview();
			document.getElementById("app_title").innerHTML = ws.title;
						mui.init({
							subpages: [{
								url: ws.links,
								styles: {
									top: '430px',
									bounce: 'vertical',
									scrollIndicator:"none",
									scalable:false,
								}
							}],
						});
			mui('.mui-scroll-wrapper').scroll({
				scrollY: true, //是否竖向滚动
				scrollX: false, //是否横向滚动
				startX: 0, //初始化时滚动至x
				startY: 0, //初始化时滚动至y
				indicators: true, //是否显示滚动条
				deceleration: 0.0005, //阻尼系数,系数越小滑动越灵敏
				bounce: true, //是否启用回弹
			})
			if (ws.title == "理财计划认购协议") {
				$("#subTitle").html("第一部分：理财计划投资明细");
			}
			var userInfo = GHUTILS.getLocalUserInfo();
			$("#app_realname").html(userInfo.realName);
			$("#app_sysInnerName").html(userInfo.sysInnerName);
			$("#app_idNm").html(userInfo.identifyCode);
			$("#app_amount").html(GHUTILS.formatCurrency(ws.money));
//			$("#app_desp").attr("src", ws.links);
			plus.nativeUI.closeWaiting();
		},
		getData: function() {
			var _this = this;

		},
		bindEvent: function() {
			var _this = this;
			$(".scroll-wrapper").on("touchstart", function(){
				console.log("ffffff");
			})

		},
		resetAfilter: function() {

		},
		closeafilter: function() {

		}
	}
	mui.plusReady(function() {
		var lp = new LINKPAGE();
		lp.init();
	});
})(Zepto);