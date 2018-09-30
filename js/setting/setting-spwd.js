/*
 Title:首页
 Author:yang sen
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
mui.init();
(function($) {

	var SETTINGSPWD = function(){
		this.ws = null;
		this.fsspwd = [];
		this.localspwd = null;
		this.style = null;
		this.userInfo = null;
		this.oldBack     = mui.back;
//		this.opener = plus.webview.getWebviewById(GHUTILS.PAGESID.SETTING);
		this.opener = plus.webview.getWebviewById("spwdtouchid");
		this.pagesTitle = '';
		this.unLockTime = 5
		return this;
	}
	SETTINGSPWD.prototype = {
		init:function(){
//			GHUTILS.setUserAgent();
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			_this.userInfo = GHUTILS.getLocalUserInfo();
			_this.localspwd = GHUTILS.getLocalCfg("spwd");
			var ws = plus.webview.currentWebview();
			ws.setStyle({"popGesture": "none"})
			if(ws.style == 'close'){
				_this.style = ws.style;
				_this.pagesTitle = "关闭";
				_this.showMsg.success("请绘制原手势密码");
				//$("#app_forget").show();
			}
			
			if( !_this.style && _this.localspwd == ''){
				_this.style = 'set';
				_this.pagesTitle = "设置";
				_this.showMsg.success("为了您的账户安全，请设置手势密码");
			}else if(!_this.style){
				_this.style = 'reset';
				_this.pagesTitle = "修改";
				_this.showMsg.success("请绘制原手势密码");
				$("#app_forget").show();
			}
			
			$("#app_title").html(_this.pagesTitle);

			//显示跳过
			if(!GHUTILS.getLocalCfg("skip")){
				$("#app_btn_skip").show();
			}

			//初始化手势密码
			setTimeout(function(){
				var H5locks = new H5lock({
			        elm:document.getElementById('lockCanvas'),
			        callBack:function(e){
			        	if(e.length >= 4){
			        		if( _this.style == 'set'){
			        			_this.setSpwd(e);
			        		}
			        		if( _this.style == 'reset' ||  _this.style == 'close'){
			        			_this.checkSpwd(e);
			        		}
			        	}else{
			        		_this.showMsg.tips("至少链接4点以上");
			        	}
						//$("#lockCanvas").find("canvas").trigger("touchstart");
			            //console.log(e);
			        }
			   }).init();
			},200);
			
			//回退返回清空信息
			mui.back = function() {
				if(!GHUTILS.getLocalCfg("skip")){
					GHUTILS.upDataLocalCfig({
						ustatus:true,
						skip:true,
						spwdcfg:GHUTILS.getLocalCfg("spwdcfg"),
						touchid:GHUTILS.getLocalCfg("touchid"),
						showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
					});
				}	
					_this.checkPushData();
					mui.fire(_this.opener,"loadData");
					mui.fire(plus.webview.getWebviewById("accountsafty"),"loadData");
					//mui.back();
					setTimeout(function(){
						_this.oldBack();
					},50);	
			};
			
			document.addEventListener("loadData",function(e){
//                                      alert(e)
                location.reload();
            });
//			mui.init({
//				beforeback: function(){
//					var opener = plus.webview.currentWebview().opener();
//					mui.fire(opener,"loadData");
//				}
//			});
			
		},
		setSpwd:function(n){
			var _this = this;
			//console.log(this.fsspwd)
			if(_this.fsspwd.length == 0){
				_this.showMsg.success("请再次绘制手势密码");
				_this.showMsg.tips("");
				_this.fsspwd.push(n);
			}else if(_this.fsspwd.length > 0){
				if(_this.fsspwd[0] == n){
					var _spwd = GHUTILS.makeSpwd(n);
					GHUTILS.upDataLocalCfig({
						spwd:_spwd,
						cfg:true,
						skip:true,
                        touchid:GHUTILS.getLocalCfg("touchid") ? true : false,
                        showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
					});
					_this.showMsg.success("手势密码"+ _this.pagesTitle +"成功");					
					mui.toast("手势密码"+ _this.pagesTitle +"成功");
					mui.fire(_this.opener,"loadData");
					mui.fire(plus.webview.getWebviewById("accountsafty"),"loadData");
					_this.checkPushData();
					setTimeout(function(){
						_this.oldBack();
					},200);
				}else{
					_this.showMsg.error("两次手势密码不一致，需要重新录入");				
				}
				_this.fsspwd = [];
			}
			//_this.showMsg.error("为了您的账户安全，请设置手势密码");
			
		},
		checkSpwd:function(n){
			var _this = this;
			var _spwd = GHUTILS.makeSpwd(n);
			if(_this.localspwd == _spwd){
				
				if( _this.style == 'reset' ){
					_this.showMsg.success("请设置新手势密码");
					_this.unLockTime = 5;
					_this.style = 'set';
				}
				if( _this.style == 'close' ){
					mui.toast("手势密码已经清空");
					_this.unLockTime = 5;
					GHUTILS.upDataLocalCfig({
						spwd:'',
						cfg:false,
						skip:GHUTILS.getLocalCfg("skip") ? true : false,
                        touchid:GHUTILS.getLocalCfg("touchid") ? true : false,
                        showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
					});
					mui.fire(_this.opener,"loadData");
					mui.fire(plus.webview.getWebviewById("accountsafty"),"loadData");
					setTimeout(function(){						
						_this.oldBack();
					},200);
				}
			}else{
//				_this.showMsg.error("原手势密码不正确");
				_this.unLockTime--;
				if(_this.unLockTime > 0) {
					_this.showMsg.error("密码错误,还可以再输入" + _this.unLockTime + "次");
				} else {
					_this.unLockTime = 5;
					_this.forgetSpwd();
				}
			}
			
			
			
//			if(_this.fsspwd.length == 0){
//				_this.showMsg.success("请再次绘制手势密码");
//				_this.fsspwd.push(n);
//			}else if(_this.fsspwd.length > 0){
//				if(_this.fsspwd[0] == n){
//					_this.showMsg.success("手势密码设置成功");
//				}else{
//					_this.showMsg.error("两次手势密码不一致,需要重新录入");	
//				}
//				_this.fsspwd = [];
//			}
			//_this.showMsg.error("为了您的账户安全，请设置手势密码");
			
		},
		forgetSpwd: function() {
			GHUTILS.upDataLocalCfig({
				spwd: '',
				cfg: false,
				skip:GHUTILS.getLocalCfg("skip") ? true : false,
				touchid: GHUTILS.getLocalCfg("touchid") ? true : false,
				showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
			});
			GHUTILS.loginOut(function() {
				GHUTILS.refreshPages();
				GHUTILS.OPENPAGE({
					url: "../usermgmt/usermgmt-login.html",
					id: GHUTILS.PAGESID.LOGIN,
					extras: {
						pagesid: GHUTILS.PAGESID.HANDLOCK,
						isclose1: "close"
					}
				})
				GHUTILS.nativeUI.showWaiting();
			})
		},
		showMsg:{
			success:function(msg){
				$("#app_txt_locktips").html(msg).removeClass("app_cred");
			},
			error:function(msg){
				$("#app_txt_locktips").html(msg).removeClass("app_cgreen").addClass("app_cred");
				
			},
			tips:function(msg){
				$("#locktips").html(msg).removeClass("app_cgreen").addClass("app_cred");
				
			},
		},
		makeSpwd:function(spwd){
			var jssha = new jsSHA("SHA-1", "TEXT");
			var skey = localStorage.getItem("userID") || '';
			jssha.update(skey + spwd);
			
			var hex = jssha.getHash("HEX");
			return hex;
		},
		getData:function(){
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
		bindEvent:function(){
			var _this = this;
			
			//忘记手势密码
			$("#app_forget").on("tap",function(){
				var btnArray = ['取消', '重新登录'];
				
				//console.log(JSON.stringify(GHUTILS.getLocalUserInfo()))
				
				mui.confirm('忘记密码需要重新登录', '提示', btnArray, function(e) {
					if (e.index == 1) {
						GHUTILS.upDataLocalCfig({
							spwd:'',
							cfg:false,
							skip:true,
                            touchid:GHUTILS.getLocalCfg("touchid") ? true : false,
                            showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
						});
						GHUTILS.loginOut(function(){
							GHUTILS.refreshPages();
							//location.reload()
							GHUTILS.OPENPAGE({
								url:"../usermgmt/usermgmt-login.html",
								id:GHUTILS.PAGESID.LOGIN,
								extras:{
									pagesid:GHUTILS.PAGESID.HANDLOCK,
									isclose1:"close"
								}
							})
							GHUTILS.nativeUI.showWaiting();
						})
					}
				})
			});
			
			
			//跳过
			$("#app_btn_skip").on("tap",function(){
				GHUTILS.upDataLocalCfig({
					ustatus:true,
					skip:true,
					spwdcfg:GHUTILS.getLocalCfg("spwdcfg"),
					touchid:GHUTILS.getLocalCfg("touchid"),
					showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
				});
				mui.fire(_this.opener,"loadData");
				mui.fire(plus.webview.getWebviewById("accountsafty"),"loadData");
				_this.checkPushData();
				setTimeout(function(){
					_this.oldBack();
				},200);
			})
		}
	}
	mui.plusReady(function(){
		plus.nativeUI.closeWaiting();
		var settingspwd = new SETTINGSPWD();
			settingspwd.init();
	});
})(Zepto);
