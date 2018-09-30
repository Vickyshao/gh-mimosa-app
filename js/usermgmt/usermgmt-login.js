/*
 Title:登录
 Author:sunli haiyang
 Date:2016-6-15 20:55:00
 Version:v1.0
*/
mui.init();
(function($) {

	var LOGIN = function(){
//		this.getVcode = $("#app-message");
		this.tips = "#app_tips_login";
		this.ws = plus.webview.currentWebview();
		this.i = 0;
//		this.mobileLogin = false;
		return this;
	}
	LOGIN.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			var userId = localStorage.getItem("userID") || '';
			
			//写入上一次账户
//			$("#app-userAcc").val(userId);
			$("#app-userAcc2").val(userId);
			
			//设置、修改密码，关闭页面
			if(_this.ws.pwd){
				_this.ws.opener().close("none",0);
			}
			
			//登录app忘记或手势密码错误5次，跳转登录，禁止返回
			if(_this.ws.isclose){
				_this.ws.setStyle({"popGesture": "none"})
				$("#app_close").removeClass("mui-action-back").removeClass("app-icon-close");
			}
			//修改手势密码时忘记手势密码，跳转登录，禁止返回
			if(_this.ws.isclose1){
				_this.ws.setStyle({"popGesture": "none"})
				$("#app_close").removeClass("mui-action-back").removeClass("app-icon-close");
			}
			
			plus.nativeUI.closeWaiting();
			
			if(_this.ws.goUpdata){
				mui.fire(plus.webview.getLaunchWebview(), "indexLoaded");
			}
			
			GHUTILS.changeVCode1($("#app_img"));
		},		
		getData:function(){
			var _this = this;
		},
		bindEvent:function(){
			var _this = this;
			$("#app-forgetpwd").off().on("tap",function(){				
				$(_this.tips).html("&nbsp;");
				if(GHUTILS.validate("app_mobileDiv")){
					_this.checklock();
				}
			})
			
			$("#app-regist").off().on("tap",function(){
				GHUTILS.OPENPAGE({
					url:"usermgmt-reg.html",
					id:GHUTILS.PAGESID.REG
				})
			})
			
//			_this.getVcode.off().on("tap",function(){
//				if(_this.getVcode.hasClass("app_btn_loading")){
//					return
//				}
//				$(_this.tips).html('&nbsp;');
//				if(GHUTILS.validate("app-phoneDiv")){
//					_this.getVericode();
//				}
//			});
			
			$("#app-login").off().on("tap",function(){
				$(_this.tips).html("&nbsp;");
//				if(_this.mobileLogin){
//					if (!$(this).hasClass("app_loading") && GHUTILS.validate("app_stepOne")) {
//						_this.switchFind($("#app-userAcc").val(), "", $("#app-vericode").val())
//					}
//				}else{
					if (!$(this).hasClass("app_loading") && GHUTILS.validate("app_mobileDiv") && GHUTILS.validate("app_pwdDiv")) {
						if(_this.i >= 3){
							if(GHUTILS.validate("app_imgDiv")){
								_this.checkimgvc($("#app-userAcc2").val(), $("#app-userPwd").val(), "");
							}
						}else{
							_this.switchFind($("#app-userAcc2").val(), $("#app-userPwd").val(), "")
						}
					}
//				}
			})
			
			$("#app-userAcc2").on('input', function () {
				if($(this).val().length == 11 && $("#app-userPwd").val().length >= 6){
					$("#app-login").removeAttr("disabled")
				}else{
					$("#app-login").attr("disabled","disabled")
				}
			})
			
			$("#app-userPwd")
			.on('focus', function () {
				$(document).on('keyup', function (e) {
					if (e.keyCode === 13 && !$("#app-login").attr("disabled")) {
						$(_this.tips).html("&nbsp;");
						if (!$("#app-login").hasClass("app_loading") && GHUTILS.validate("app_mobileDiv") && GHUTILS.validate("app_pwdDiv")) {
							if(_this.i >= 3){
								if(GHUTILS.validate("app_imgDiv")){
									_this.checkimgvc($("#app-userAcc2").val(), $("#app-userPwd").val(), "");
								}
							}else{
								_this.switchFind($("#app-userAcc2").val(), $("#app-userPwd").val(), "")
							}
						}
					}
				}.bind(this))
			})
			.on('blur', function () {
				$(document).off('keyup')
			})
			.on('input', function(){
				if($("#app-userAcc2").val().length == 11 && $(this).val().length >= 6){
					$("#app-login").removeAttr("disabled")
				}else{
					$("#app-login").attr("disabled","disabled")
				}
			})
			
			GHUTILS.inputFocus("#app-userPwd");
			
//			$("#app_mobileLogin").on("tap", function(){
//				if($(this).hasClass("app_hw_sp")){
//					$(_this.tips).html("&nbsp;");
//					_this.mobileLogin = true
//					$(this).removeClass("app_hw_sp").addClass("app_hb_sp");
//					$("#app_accountLogin").removeClass("app_hb_sp").addClass("app_hw_sp");
//					$("#app_stepTwo").addClass("app_none");
//					$("#app_stepOne").removeClass("app_none");
//					$("#app-userAcc2").blur();
//					$("#app-userPwd").blur();
//				}
//			})
			
//			$("#app_accountLogin").on("tap", function(){
//				if($(this).hasClass("app_hw_sp")){
//					$(_this.tips).html("&nbsp;");
//					_this.mobileLogin = false
//					$(this).removeClass("app_hw_sp").addClass("app_hb_sp");
//					$("#app_mobileLogin").removeClass("app_hb_sp").addClass("app_hw_sp");
//					$("#app_stepOne").addClass("app_none");
//					$("#app_stepTwo").removeClass("app_none");
//					$("#app-userAcc").blur();
//					$("#app-vericode").blur();
//				}
//			})
			
			$("#app_img").off().on('tap',function(){
				GHUTILS.changeVCode1(this);
			});
		},
		//判断用户是否锁定
		checklock: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.checklock + '?userAcc=' + $("#app-userAcc2").val(),
				data: {},
				type: "post",
				sw:true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if (GHUTILS.checkErrorCode(result,_this.tips)) {
						_this.getVericode();
					}
				}
			});
		},
		//忘记密码发送验证码
		getVericode: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.sendverifyv1,
				data: {
					phone: $("#app-userAcc2").val(),
					smsType: "forgetlogin",
					values: ["", 2]
				},
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if (GHUTILS.checkErrorCode(result, _this.tips)) {
						GHUTILS.OPENPAGE({
							url:"../../html/usermgmt/usermgmt-forgetpwd.html",
							id:GHUTILS.PAGESID.FORGETPWD,
							extras:{
								mobile: $("#app-userAcc2").val()
							}
						})
						GHUTILS.nativeUI.showWaiting();
					}
				}
			});
		},
		//获取验证码
//		getVericode:function(){
//			var _this = this;
//			_this.getVcode.addClass("app_btn_loading")
//			GHUTILS.LOAD({
//				url: GHUTILS.API.USER.sendverifyv1,
//				data: {
//					phone: $("#app-userAcc").val(),
//					smsType: "login",
//					values: ["", 2]
//				},
//				type: "post",
//				sw: true,
//				callback: function(result) {
//					console.log(JSON.stringify(result))
//					if(GHUTILS.checkErrorCode(result,_this.tips)){
//						GHUTILS.btnTime(_this.getVcode);
//					}else{
//						_this.getVcode.removeClass("app_btn_loading")
//					}
//				},
//				errcallback: function(){
//					_this.getVcode.removeClass("app_btn_loading")
//				}
//			});
//		},
		checkimgvc: function(mobile, password, vericode){
			var _this = this;
			$(_this.tips).html("&nbsp;")
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.checkimgvc,
				data: {
					imgvc: $("#app_imgCode").val().trim()
				},
				type: "post",
				sw: true,
				callback: function(result){
					if(GHUTILS.checkErrorCode(result,_this.tips)){
						_this.switchFind(mobile, password, vericode)
					}
				}
			})
		},
		switchFind: function(mobile, password, vericode){
			var _this = this;
			$(_this.tips).html("&nbsp;")
//			GHUTILS.LOAD({
//				url: GHUTILS.API.CHA.switchFind+"?code=Login&phone="+mobile,
//				type: "post",
//				sw: true,
//				callback: function(result){
//					console.log(JSON.stringify(result))
//					if(GHUTILS.checkErrorCode(result,_this.tips)){
//						if(result.status && result.status == "enable"){
							_this.doLogin(mobile, password, vericode)
//						}else{
//							GHUTILS.showError("该用户不可登录！", _this.tips)
//						}
//					}
//				}
//			})
		},
		doLogin:function(mobile, password, vericode){
			var _this = this;
			$("#app-login").addClass("app_loading");
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.doLogin,
				data: {
					userAcc: mobile,
					userPwd: password,
					vericode: vericode,
					platform: "app",
					clientId: plus.push.getClientInfo().clientid
				},
				type: "post",
				sw:true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					$("#app-login").removeClass("app_loading");
					if (GHUTILS.checkErrorCode(result,_this.tips)) {
						localStorage.setItem("userID", mobile);
						$("#app_imgDiv").addClass("app_none");
						_this.i = 0;
						if(_this.ws.isclose){
							plus.webview.getWebviewById(GHUTILS.PAGESID.LOCKER).hide();
						}
						if(_this.ws.pagesid){
							var fwv = plus.webview.getWebviewById(_this.ws.pagesid);
                        	mui.fire(fwv,"loadData",{"reset":true});
						}
						mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PRTTNLIST), "loadData");
						//关闭注册页
						if(plus.webview.getWebviewById(GHUTILS.PAGESID.REG)){
							plus.webview.getWebviewById(GHUTILS.PAGESID.REG).close("none", 0)
						}
						//配置登录状态
						GHUTILS.upDataLocalCfig({
							ustatus:true,
							spwd:GHUTILS.getLocalCfg("spwd") || '',
							cfg:GHUTILS.getLocalCfg("spwdcfg") ? true : false,
							skip:GHUTILS.getLocalCfg("skip") ? true : false,
                            touchid:GHUTILS.getLocalCfg("touchid") ? true : false,
                            showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true
						});
						mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.SETTING), "loadData");
						GHUTILS.nativeUI.showWaiting();
						GHUTILS.getUserInfo(function(){
							if(_this.ws.cbobj){
								var _cbobj = _this.ws.cbobj;								
									_this.loginRote(_cbobj);
							}
							plus.nativeUI.closeWaiting();
							GHUTILS.refreshPages();
							setTimeout(function(){
								mui.back();
							},50)
							if(!GHUTILS.getLocalCfg("skip")){
								mui.toast('设置手势密码，账户更安全');
								mui.fire(plus.webview.getLaunchWebview(),"openspwd");
							}
						});
					}else{
						if(++ _this.i >= 3){
							$("#app_imgDiv").removeClass("app_none");
						}
					}
				},
				errcallback: function(){
					$("#app-login").removeClass("app_loading");
				}
			});
		},
		loginRote:function(cbobj){
			var _this = this;
			var _cbObj = JSON.parse(cbobj);
			//页面切换
			if(_cbObj.cb == "showTab"){
				var wg = plus.webview.getLaunchWebview();
				mui.fire(wg, "showtab", {
					tabindex: _cbObj.tabidx
				});
			}
			//签到页面
//			setTimeout(function(){
//				_this.doSign();
//			},500);

			//触发回调
			if(_cbObj.cb == "firePage"){
				var fb = plus.webview.getWebviewById(_cbObj.id);
				var extars = _cbObj.extars ? JSON.parse(_cbObj.extars) : {};
				mui.fire(fb, _cbObj.even, extars);
			}
			if(_cbObj.cb == "reload"){
				plus.webview.getWebviewById(_cbObj.pageid).reload();
			}
		},
		//签到弹窗
		doSign: function() {
			var _this = this;
			console.log("签到签到");
			//签到活动是否存在
			GHUTILS.LOAD({
				url:GHUTILS.API.CHA.getEventInfo,
				data:{
					eventType:'sign',
					couponType:'coupon'
				},
				type:'post',
				callback:function(result){
					console.log("签到活动="+JSON.stringify(result));
					if(result.errorCode == 0 && result.money !=null){
						GHUTILS.LOAD({
							url: GHUTILS.API.signIn.checkSign,
							data: {},
							type: "post",
							//sw: true,
							callback: function(result) {
								console.log("检测是否签到=" + JSON.stringify(result));
								if(result.errorCode == 0) {
									var sub = plus.webview.create("/html/index/index-shortcut/index-signin.html", "SIGNIN_DIALOG", {
										background: "transparent",
										top: '0',
										bottom: '0'
									});
									sub.show();
								} else {}
							}
						})
					}
				}
			})
		}
	}
	mui.plusReady(function(){
		var log = new LOGIN();
			log.init();
	});
})(Zepto);
