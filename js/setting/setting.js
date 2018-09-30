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
		return this;
	}
	SETTING.prototype = {
		init: function() {
			var _this = this
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
			
			GHUTILS.getHotline($("#app_hotlineNumber"), $("#app_hotline"));
//			var apppush = localStorage.getItem("apppush");
//			var os = GHUTILS.mos();
//			if(os == 'IP') {
//				var finger = plus.ios.newObject("Finger");
//				var result = plus.ios.invoke(finger, "checkFingerFunc");
//				if(result != null) {
//					if(result == 1) {
//						$(".app-touchid").removeClass("app_none");
//					}
//				}
//				if(apppush == 'off') {
//					$("#app-push").removeClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(0px, 0px);");
//				} else {
//					$("#app-push").addClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(20px, 0px);");
//				}
//			} else {
//				var pushManager = plus.android.importClass("com.igexin.sdk.PushManager");
//				var context = plus.android.runtimeMainActivity();
//				if(apppush == 'off') {
//					pushManager.getInstance().turnOffPush(context);
//					$("#app-push").removeClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(0px, 0px);");
//				} else {
//					pushManager.getInstance().turnOnPush(context);
//					$("#app-push").addClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(20px, 0px);");
//				}
//			}
		},
		loadData: function() {
			var _this = this;
//          if(GHUTILS.getLocalCfg("touchid")) {
//              $("#app-touchid").addClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(20px, 0px);");
//          } else {
//              $("#app-touchid").removeClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(0px, 0px);");
//          }
            
            //实名认证
			var realNameDisp = GHUTILS.getLocalUserInfo('name') || "";
			if(!realNameDisp){
				$('#realName').html('未认证');
				$('#realNameDiv').addClass('mui-navigate-right');
			} else {
				$('#realNameDiv').removeClass('mui-navigate-right');
				$('#realName').html(realNameDisp);
			}
			//手机认证
			var userAcc = GHUTILS.getLocalUserInfo('userAcc') || "", showMobile = "";
			if(userAcc){
				showMobile = userAcc.substr(0,3)+"****"+userAcc.substr(7,4);
			}
			$('#showMobile').html(showMobile);
			//银行卡
			var bankName = GHUTILS.getLocalUserInfo('bankName') || "";
			if(bankName){
				$("#app_banks").html("1张")
			}else{
				$("#app_banks").html("未绑定")
			}
		},
 
		touchidLock: function() {
			var _this = this;
            var _spwd = GHUTILS.getLocalCfg("spwd");
            var _cfg = GHUTILS.getLocalCfg("spwdcfg");
 			var finger = plus.ios.newObject("Finger");
			var fingerFuncSecondResult = plus.ios.invoke(finger, "fingerFuncSecond");
			if(plus.ios.invoke(finger, "checkFingerFunc") == 1) {
				if(fingerFuncSecondResult == 1) {
					GHUTILS.upDataLocalCfig({
						touchid: true,
                        spwd:_spwd,
                        cfg:_cfg,
                        showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
					});
					mui.toast("指纹密码设置成功");
					_this.loadData();
				} else if(fingerFuncSecondResult == -1) {
					//超过3次进行手势解锁
					GHUTILS.upDataLocalCfig({
						touchid: false,
                        spwd:_spwd,
                        cfg:_cfg,
                        showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
					});
					//mui.toast("超过3次进行手势解锁");
					_this.loadData();
					//alert("超过3次进行手势解锁");
				} else if(fingerFuncSecondResult == -2) {
					//点击了手指密码的取消按钮
					GHUTILS.upDataLocalCfig({
						touchid: false,
                        spwd:_spwd,
                        cfg:_cfg,
                        showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
					});
					_this.loadData();
					//alert("点击了手指密码的取消按钮");
				} else if(fingerFuncSecondResult == -3) {
					//点击了手指密码的 输入密码按钮
					//alert("点击了手指密码的 输入密码按钮");
				} else if(fingerFuncSecondResult == -8) {
					GHUTILS.upDataLocalCfig({
						touchid: false,
                        spwd:_spwd,
                        cfg:_cfg,
                        showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
					});
					//mui.toast("指纹解锁被锁住");
					_this.loadData();
					//指纹解锁被锁住
				}
			}
		},

		bindEvent: function() {
			var _this = this;
			//初始化页面连接
			GHUTILS.listLinks();
			
			$("#app-realname").on('tap', function(){
				GHUTILS.getUserInfo(function(){
					if(!GHUTILS.getLocalUserInfo('paypwd')){
						mui.toast("请先设置支付密码")
						GHUTILS.OPENPAGE({
							url: "../../html/usermgmt/usermgmt-dealpwd.html",
							id: GHUTILS.PAGESID.DEALPWD,
							extras: {
								type: "set",
								bankadd: true
							}
						})
						GHUTILS.nativeUI.showWaiting();
					}else if(!GHUTILS.getLocalUserInfo('name')){
						GHUTILS.OPENPAGE({
							url: "../../html/usermgmt/usermgmt-bankcard-add.html",
							id: GHUTILS.PAGESID.BANKCARDADD
						})
						GHUTILS.nativeUI.showWaiting();
					}
				})
			})

			//touchId开关
			$("#app-touchid").on("toggle", function(event) {
				if(event.detail.isActive == false) {

					if(!GHUTILS.getLocalCfg("touchid")) {
						return
					}

					var btnArray = ['取消', '确定'];

					mui.confirm('确认关闭指纹解锁？', '提示', btnArray, function(e) {
						if(e.index == 1) {
							$("#app-touchid").removeClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(0px, 0px);");
							GHUTILS.upDataLocalCfig({
								touchid: false,
                                spwd : GHUTILS.getLocalCfg("spwd"),
                                cfg:GHUTILS.getLocalCfg("spwdcfg"),
                                showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
							});
                            _this.loadData();
						} else {
							$("#app-touchid").addClass("mui-active").find(".mui-switch-handle").attr("style", "transform: translate(20px, 0px);");
						}
					})

				} else {
					_this.touchidLock();
				}
			})

			//推送开关
			$("#app-push").on("toggle", function(event) {
				var os = GHUTILS.mos();
				if(os == 'IP') {
					if(event.detail.isActive == false) {
						localStorage.setItem("apppush", "off")
						mui.alert('请到"系统"-"通知"-"国槐金融"中，关闭允许通知这项 ，确保您不再收到消息通知');
					} else {
						localStorage.setItem("apppush", "on")
						mui.alert('请到"系统"-"通知"-"国槐金融"中，开启允许通知这项 ，确保您可以收到消息通知');
					}

				} else {
					var pushManager = plus.android.importClass("com.igexin.sdk.PushManager");
					var context = plus.android.runtimeMainActivity();
					if(event.detail.isActive == false) {
						pushManager.getInstance().turnOffPush(context);
						localStorage.setItem("apppush", "off")
					} else {

						pushManager.getInstance().turnOnPush(context);
						localStorage.setItem("apppush", "on")
					}
				}

			})

			$("#app_bankcard").on('tap', function(){
				GHUTILS.OPENPAGE({
					url: "../../html/usermgmt/usermgmt-bankcard-list.html",
					id: GHUTILS.PAGESID.BANKCARDLIST
				})
				GHUTILS.nativeUI.showWaiting();
			})
			
			$('#app-confirm').on('tap',function(){
				GHUTILS.nativeUI.showWaiting();
				GHUTILS.loginOut(function(){
					plus.nativeUI.closeWaiting();
					//打开首页
					var wg = plus.webview.getLaunchWebview();
					mui.fire(wg, "showtab", {
						tabindex: 0
					});
					mui.back();					
				});
			});
			
			$("#app_serviceagreement").off().on("tap", function(){
				_this.getProtocolInfo();
			})
		},
		//获取协议信息
		getProtocolInfo: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CMS.getProtocolInfo+"?typeId=PLATFORM",
				type: "post",
				sw: true,
				callback: function(result) {
					if(GHUTILS.checkErrorCode(result)){
						GHUTILS.OPENPAGE({
							url:"../../html/index/content_pages.html",
							id:GHUTILS.PAGESID.CONTENT,
							extras:{
								title: "沪深理财平台服务协议",
								content: encodeURIComponent(result.content)
							}
						})
					}
				}
			})
		}
	}
	mui.plusReady(function() {

		var sett = new SETTING();
		sett.init();
	});
})(Zepto);