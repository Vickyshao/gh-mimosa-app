/**
 * 签到红包
 */
mui.init();
(function($) {
	var LOGININ = function() {
		this.ws = plus.webview.currentWebview();
		return this;
	}
	LOGININ.prototype = {
		init: function() {
			this.pageInit(); //页面初始化   
			this.bindEvent(); //事件绑定
		},
		pageInit: function() {
			var _this = this;
			_this.ws.setStyle({"popGesture": "none"})
			$(".expgold_box").find(".expgold_btn").css('line-height', $(".expgold_btn").height() + 'px')
			_this.getData();
		},
		getData: function() {
			var _this = this;
		},
		bindEvent: function() {
			var _this = this;
			document.getElementById("app_close").addEventListener('tap', function() {
					console.log("close");
					mui.back();
					if(_this.ws.goUpdata){
						mui.fire(plus.webview.getLaunchWebview(), "indexLoaded");
					}
				})
			//签到
			$("#app_signIn").on('tap', function() {
				var userId = GHUTILS.getLocalUserInfo().investorOid;
				if(userId == null){
					mui.toast("用户未登录");
					GHUTILS.OPENPAGE({
						url: "/html/usermgmt/usermgmt-login.html",
					})
					return;
				}
				GHUTILS.LOAD({
					url: GHUTILS.API.signIn.sign,
					type: "post",
					callback: function(result) {
						if(result.errorCode == 0) {
							//判断用户今日是否签到
							var sub = plus.webview.create("index-signin-success.html", "SIGNIN_SUCCESS", {
								background: "transparent",
								top: '0',
								bottom: '0'
							}, {
								goUpdata: _this.ws.goUpdata
							});
							sub.show();

							var signIn = plus.webview.getWebviewById("SIGNIN_DIALOG");
							plus.webview.close(signIn);
						} else {
							console.log("签到信息=" + result.errorMessage);
						}
					}
				})
			})
		}
	}
	mui.plusReady(function() {
		var sett = new LOGININ();
		sett.init();
	});
	//	$(function(){
	//		var info = new LOGININ();
	//			info.init();
	//	})
})(Zepto);