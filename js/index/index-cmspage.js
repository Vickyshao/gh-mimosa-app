mui.init();
(function($) {
	var SETT = function() {
		this.ws = plus.webview.currentWebview();
		return this;
	}
	GHUTILS.listLinks();
	SETT.prototype = {
		init: function() {
			this.pageInit(); //页面初始化   
			this.bindEvent(); //事件绑定
			this.getData();
		},
		pageInit: function() {
			var _this = this;
			plus.nativeUI.closeWaiting();
		},
		getData: function() {
			var _this = this;   
			$('#coupon_btn').off().on('tap', function() {
				if(GHUTILS.getloginStatus(true)){
					var btnArray = ['我知道了', '立即查看'];
					mui.confirm('您已经注册，可在"我的-优惠券"查看体验金，投资就可坐等收益啦。', '提示', btnArray, function(e) {
						if (e.index == 1) {
							GHUTILS.OPENPAGE({
								url: '../../html/account/account-coupon.html',
								id: GHUTILS.PAGESID.COUPON
							})
							GHUTILS.nativeUI.showWaiting();
						}
					})
				}
			})
		},
		bindEvent: function() {
			var _this = this;
			if (GHUTILS.getloginStatus()) {
					$("#to_register .txt").html('立即变现');
					$('.logined').css('display','block');
					$('.no-login').css('display','none');
					
			} else {
					$("#to_register .txt").html('立即领取');
					$('.logined').css('display','none');
					$('.no-login').css('display','block');
			}
			$("#to_register").off().on('tap', function(){
//			如果是已登录状态,按钮显示立即变现,并且链接跳转到优惠券页面
				if (GHUTILS.getloginStatus()) {
					GHUTILS.OPENPAGE({
						url: "../account/account-coupon.html",
						id:''
					});
				} else {
	//			如果是未登录状态,按钮显示立即领取,并且链接跳转到注册页面
					GHUTILS.OPENPAGE({
						url: "../usermgmt/usermgmt-reg.html",
						id: ''
					});
				}
			});
			//	登录状态按钮跳转到“我的”页面
			$("#to_login").off().on('tap', function(){
				if (GHUTILS.getloginStatus()) {
					GHUTILS.OPENPAGE({
						url: "../account/account-toinvite.html",
						id: ''
					})
				} else {
				//	未登录状态按钮跳转到“登录”页面
					GHUTILS.OPENPAGE({
						url: "../usermgmt/usermgmt-login.html",
						id: GHUTILS.PAGESID.LOGIN,
					})
					
				}
			});
		}
	}
	mui.plusReady(function() {
		var sett = new SETT();
		sett.init();
	});
})(Zepto);