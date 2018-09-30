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
		this.pwd = false;
		this.payPd = false;
		return this;
	}
	SETTING.prototype = {
		init: function() {
			var _this = this;
			this.pageInit(); //页面初始化
			this.bindEvent(); //事件绑定
			GHUTILS.getUserInfo(function(){
				_this.loadData(); //获取数据
			})
		},
		pageInit: function() {
			var _this = this;
			document.addEventListener("loadData", function() {
				_this.loadData();
			});
		},
		loadData: function() {
			var _this = this;
			if(GHUTILS.getloginStatus()){
				_this.pwd = GHUTILS.getLocalUserInfo('userPwd');
				if(_this.pwd){
					$('#pwd').html("可重置").addClass("app_cmain")
				} else {
					$('#pwd').html("去设置").removeClass("app_cmain")
				}
				
				_this.payPd = GHUTILS.getLocalUserInfo('paypwd');
				if(_this.payPd){
//					$('#payPd').html("可重置").addClass("app_cmain")
					$('#payPd').html("")
				} else {
					$('#payPd').html("去设置").removeClass("app_cmain")
				}
				
				if(GHUTILS.getLocalCfg("spwdcfg")) {
					$("#app_pwdison").html("已开启").addClass("app_cmain")
				} else {
					$("#app_pwdison").html("未开启").removeClass("app_cmain")
				}
			}
		},
		bindEvent: function() {
			var _this = this;
			//初始化页面连接
			GHUTILS.listLinks();
			
			$('#app-pwd').on('tap',function(){
				var type = _this.pwd ? 'modify' : 'set'
				GHUTILS.OPENPAGE({
					url: "../../html/usermgmt/usermgmt-pwd.html",
					id: GHUTILS.PAGESID.PWD,
					extras: {
						type: type
					}
				})
				GHUTILS.nativeUI.showWaiting();
			});
			
			$('#app-paypswd').on('tap',function(){
				var type = _this.payPd ? 'modify' : 'set'
				GHUTILS.OPENPAGE({
					url: "../../html/usermgmt/usermgmt-dealpwd.html",
					id: GHUTILS.PAGESID.DEALPWD,
					extras: {
						type: type
					}
				})
				GHUTILS.nativeUI.showWaiting();
			});
		}
	}
	mui.plusReady(function() {
		var sett = new SETTING();
		sett.init();
	});
})(Zepto);