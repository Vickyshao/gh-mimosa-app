/*
 Title:首页
 Author:yang sen
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
mui.init();
(function($) {

	var SETTINGSPWD = function() {
		this.fsspwd = [];
		this.localspwd = null;
		this.style = null;
		this.userInfo = null;
		this.oldBack = mui.back;
		this.ws = null;
		this.pagesTitle = '';
		this.unLockTime = 5
		return this;
	}
	SETTINGSPWD.prototype = {
		init: function() {
//			GHUTILS.setUserAgent();
			this.pageInit(); //页面初始化
			this.bindEvent(); //事件绑定
			this.getData(); //获取数据
			this.quitApp();
		},
		pageInit: function() {
			var _this = this;
			_this.lockInit();
			document.addEventListener("loadData", function(e) {
				_this.loadData(e);
			});
		},
		lockInit: function() {
			var _this = this;
			_this.ws = plus.webview.currentWebview();
			_this.ws.setStyle({"popGesture": "none"})
			if(_this.ws.touchid && _this.ws.spwdcfg) {
				$(".app_body_con").removeClass("app_body_hide");
				_this.H5locksInit();
				var finger = plus.ios.newObject("Finger");
				var result = plus.ios.invoke(finger, "checkFingerFunc");
				if(result != null) {
					if(result == 1) {
						setTimeout(function() {
							_this.touchidLock();
						}, 180);
					}
				}
			} else if(_this.ws.touchid && !_this.ws.spwdcfg) {
				setTimeout(function() {
					_this.touchidLock();
				}, 180);
			} else if(!_this.ws.touchid && _this.ws.spwdcfg) {
				$(".app_body_con").removeClass("app_body_hide");
				_this.H5locksInit();
			}
			if(!GHUTILS.getLocalCfg("touchid")) {
				$("#app_touchid").addClass("app_none");
			}
		},

		loadData: function(e) {
			var _this = this;
			if(!e.detail.goUpdata){
				_this.ws.goUpdata = false
			}
			if(e.detail.touchid && e.detail.spwdcfg) {
				$(".app_body_con").removeClass("app_body_hide");
				_this.H5locksInit();
				var finger = plus.ios.newObject("Finger");
				var result = plus.ios.invoke(finger, "checkFingerFunc");
				if(result != null) {
					if(result == 1) {
						setTimeout(function() {
							_this.touchidLock();
						}, 180);
					}
				}
			} else if(e.detail.touchid && !e.detail.spwdcfg) {
				$(".app_body_con").addClass("app_body_hide");
				setTimeout(function() {
					_this.touchidLock();
				}, 180);
			} else if(!e.detail.touchid && e.detail.spwdcfg) {
				$(".app_body_con").removeClass("app_body_hide");
				_this.H5locksInit();
			}

			if(!GHUTILS.getLocalCfg("touchid")) {
				$("#app_touchid").addClass("app_none");
			}
		},

		touchidLock: function() {
			var _this = this;
			var finger = plus.ios.newObject("Finger");
			var fingerFuncSecondResult = plus.ios.invoke(finger, "fingerFuncSecond");
			if(plus.ios.invoke(finger, "checkFingerFunc") == 1) {
				if(fingerFuncSecondResult == 1) {
					_this.ws.hide();
				} else if(fingerFuncSecondResult == -1) {
					_this.doLogin();
					//mui.toast("超过3次进行手势解锁");
					//alert("超过3次进行手势解锁");
				} else if(fingerFuncSecondResult == -2) {
					_this.doLogin();
					//alert("点击了手指密码的取消按钮");
				} else if(fingerFuncSecondResult == -3) {
					//点击了手指密码的 输入密码按钮
					//alert("点击了手指密码的 输入密码按钮");
				} else if(fingerFuncSecondResult == -8) {
					//指纹解锁被锁住
                } else if(fingerFuncSecondResult == -4) {
                    //系统取消
                    _this.doLogin();
                }
			}
		},

		doLogin: function() {
			if(GHUTILS.getLocalCfg("spwdcfg")) {
				$("#app_touchid").removeClass("app_none");
			} else {
				GHUTILS.loginOut(function() {
					GHUTILS.refreshPages();
					GHUTILS.OPENPAGE({
						url: "../usermgmt/usermgmt-login.html",
						id: GHUTILS.PAGESID.LOGIN,
						extras: {
							isclose: "close"
						}
					})
					GHUTILS.nativeUI.showWaiting();
				})
			}
		},

		H5locksInit: function() {
			var _this = this;
			var time = mui.os.ios ? 0 : 500
			setTimeout(function(){
				var H5locks = new H5lock({
					elm: document.getElementById('lockCanvas'),
					callBack: function(e) {
						if(e.length >= 4) {
							_this.checkSpwd(e);
						} else {
							_this.showMsg.error("至少链接4点以上");
						}
						//$("#lockCanvas").find("canvas").trigger("touchstart");
						//console.log(e);
					}
				}).init();
			},time)
		},

		checkSpwd: function(n) {
			var _this = this;
			var _spwd = GHUTILS.makeSpwd(n);

			if(GHUTILS.getLocalCfg("spwd") == _spwd) {
				setTimeout(function() {
					_this.ws.hide();
					$(".app_body_con").addClass("app_body_hide");
					_this.showMsg.success("请绘制手势密码进行解锁");
					mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.HOMEPAGEWV), "loadData");
				}, 180);
				_this.showMsg.success("手势解锁成功");
				_this.unLockTime = 5;
				_this.checkPushData();
				if(_this.ws.goUpdata){
					mui.fire(plus.webview.getLaunchWebview(), "goUpdata");
				}
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.HOMEPAGEWV), "loadData");
			} else {
				_this.unLockTime--;
				if(_this.unLockTime > 0) {
					_this.showMsg.error("密码错误,还可以再输入" + _this.unLockTime + "次");
				} else {
					GHUTILS.nativeUI.showWaiting();
					_this.forgetSpwd(true);
					
				}
			}

		},
		showMsg: {
			success: function(msg) {
				$("#app_txt_locktips").html(msg).removeClass("app_cred");
			},
			error: function(msg) {
				$("#app_txt_locktips").html(msg).removeClass("app_cgreen").addClass("app_cred");

			}
		},
		makeSpwd: function(skey, spwd) {
			var jssha = new jsSHA("SHA-1", "TEXT");
			jssha.update(skey + spwd);

			var hex = jssha.getHash("HEX");
			return hex;
		},
		getData: function() {
			var _this = this;

		},
		checkPushData:function(){
			var pushdata = localStorage.getItem('pushdata') || "";
			
			if(pushdata && pushdata != ""){
				var homePages = plus.webview.getWebviewById("homopagewebview");
		    	
		    	mui.fire(homePages,"callpush",{
                    pushdata: pushdata
                });
			}
		},
		bindEvent: function() {
			var _this = this;

			$("#app_touchid").on("tap", function() {
				_this.touchidLock();
			});

			//忘记手势密码
			$("#app_forget").on("tap", function() {
				var btnArray = ['取消', '重新登录'];

				//console.log(JSON.stringify(GHUTILS.getLocalUserInfo()))

				mui.confirm('忘记密码需要重新登录', '提示', btnArray, function(e) {
					if(e.index == 1) {
						_this.forgetSpwd();
					}
				})
			});

		},
		forgetSpwd: function(alert) {
			var _this = this;
			GHUTILS.upDataLocalCfig({
				ustatus:false,
				spwd: '',
				cfg: false,
				skip: false,
				touchid: GHUTILS.getLocalCfg("touchid") ? true : false,
				showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
			});
			GHUTILS.loginOut(function() {
				GHUTILS.refreshPages();
				
				if(alert){
					plus.nativeUI.closeWaiting();
					mui.alert('密码输错5次，将重新登录进行验证', '提示', function() {
						_this.unLockTime = 5;					
						_this.showMsg.success("请绘制手势密码进行解锁");
						_this.openLogin(_this.ws.goUpdata);
					});
				}else{
					_this.openLogin();
				}
			})
		},
		openLogin:function(goUpdata){
			GHUTILS.OPENPAGE({
				url: "../usermgmt/usermgmt-login.html",
				id: GHUTILS.PAGESID.LOGIN,
				extras: {
					pagesid: GHUTILS.PAGESID.HANDLOCK,
					isclose: "close",
					goUpdata: goUpdata
				}
			})
			GHUTILS.nativeUI.showWaiting();
		},
		quitApp: function() {
			var _this = this;

			//首页返回键处理
			//处理逻辑：1秒内，连续两次按返回键，则退出应用；
			var first = null;
			mui.back = function() {
				if(_this.showMenu) {
					closeMenu();
				} else {
					//首次按键，提示‘再按一次退出应用’
					if(!first) {
						first = new Date().getTime();
						plus.nativeUI.toast('再按一次退出应用', {
							verticalAlign: "center"
						});
						setTimeout(function() {
							first = null;
						}, 1000);
					} else {
						if(new Date().getTime() - first < 1000) {
							plus.runtime.quit();
						}
					}
				}
			};
		}
	}
	mui.plusReady(function() {

		var settingspwd = new SETTINGSPWD();
		settingspwd.init();
		//初始化手势密码
		//		setTimeout(function() {
		//			settingspwd.pageInit()
		//		}, 50);
	});
})(Zepto);
