/*
 Title:注册
 Author:sunli haiyang
 Date:2016-6-16 15:43:48
 Version:v1.0
*/
mui.init();
(function($) {

	var REGIST = function(){
		this.getVcode = $("#app-message");
		this.tips = $("#app_tips_reg");
		this.imgConfirmed = false;
		this.ws = plus.webview.currentWebview();
		return this;
	}
	REGIST.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			plus.nativeUI.closeWaiting();
		},
		getData:function(){
			var _this = this;
		},
		bindEvent:function(){
			var _this = this;
			
			$('.app_icon_checked input[type="checkbox"]').on("change", function(){
				if($(this).is(':checked')){
					$(this).parent('span').removeClass('app_icon_checknone').addClass('app_icon_checked')
				}else{
					$(this).parent('span').removeClass('app_icon_checked').addClass('app_icon_checknone')
				}
			})
			
			_this.getVcode.off().on("tap",function(){
				if(_this.getVcode.hasClass("app_loading")){
					return
				}
				_this.tips.html('&nbsp;');
				if(GHUTILS.validate("app-phoneDiv")){
					_this.getVericode();
				}
			});

			$("#app-stepOneNext").on("tap",function(){
				if($(this).hasClass("app_loading")){
					return
				}
				if(GHUTILS.validate("app-regForm") && _this.isValid()){
					_this.tips.html('&nbsp;');
//					_this.switchFind($("#app-phoneNo").val())
					_this.register($("#app-phoneNo").val());
				}
			})

			$("#app_login").off().on("tap",function(){
				GHUTILS.OPENPAGE({
					url:"usermgmt-login.html",
					id:GHUTILS.PAGESID.LOGIN
				})
			})

			$('.app_account').on('tap',function(){
				var wg = plus.webview.getLaunchWebview();
				mui.fire(wg, "showtab", {
					tabindex: 2
				});
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.LOGIN)){
     				plus.webview.getWebviewById(GHUTILS.PAGESID.LOGIN).close();
    				}
				_this.ws.close();
				
				//用户签到页面
//				setTimeout(function(){
//					console.log("体验金领取成功签到");
//					_this.doSign();
//				},500);
				
				GHUTILS.upDataLocalCfig({
					ustatus:true,
					skip:true,
					showstatus:true,
					spwd:GHUTILS.getLocalCfg("spwd") || '',
					cfg:GHUTILS.getLocalCfg("spwdcfg") ? true : false,
                    touchid:GHUTILS.getLocalCfg("touchid") ? true : false
				});
				plus.nativeUI.closeWaiting();
			});

			$('#app_person').on('tap',function(){
				_this.getProtocolInfo();
			});
			
			$("#app-regForm input").forEach(function(e, i){
				if(i != 4){
					$(e).on("input", function(){
						_this.buttonEnable();
					})
				}
			})
		},
		buttonEnable: function(){
			if($("#app-phoneNo").val().length == 11 && $("#app-vericode").val().length == 6 && $("#app_pwd").val().length >= 6 && $("#app_pwdConf").val().length >= 6){
				$("#app-stepOneNext").removeAttr("disabled")
			}else{
				$("#app-stepOneNext").attr("disabled","disabled")
			}
		},
		isValid: function(){
			var _this = this;
			var valid = true;
			if(!$('#app_aggrement').is(':checked')){
				GHUTILS.showError("您必须同意并遵守《沪深理财平台服务协议》才能注册",_this.tips);
				valid = false
			}
			return valid
		},
		//获取协议信息
		getProtocolInfo: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CMS.getProtocolInfo+"?typeId=PLATFORM",
				type: "post",
				sw: true,
				callback: function(result) {
					if(GHUTILS.checkErrorCode(result, _this.tips)){
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
		},
		//获取验证码
		getVericode:function(){
			var _this = this;
			_this.getVcode.addClass("app_loading")
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.sendverifyv1,
				data: {
					phone: $("#app-phoneNo").val(),
					smsType: "regist",
					values: ["", 2]
				},
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result,_this.tips)){
						GHUTILS.btnTime2(_this.getVcode);
					}else{
						_this.getVcode.removeClass("app_loading")
					}
				},
				errcallback: function(){
					_this.getVcode.removeClass("app_loading")
				}
			});
		},
		switchFind: function(mobile){
			var _this = this;
			_this.tips.html("&nbsp;")
			GHUTILS.LOAD({
				url: GHUTILS.API.CHA.switchFind+"?code=Register&phone="+mobile,
				type: "post",
				sw: true,
				callback: function(result){
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result,_this.tips)){
						if(result.status && result.status == "enable"){
							_this.register(mobile);
						}else{
							GHUTILS.showError("该用户不可注册！", _this.tips)
						}
					}
				}
			})
		},
		//注册
		register: function(mobile){
			//友盟监听
			//plus.statistic.eventTrig( "app_register", "app_register" );
			var _this = this;
			_this.tips.html("&nbsp;")
			$("#app-stepOneNext").addClass("app_loading");
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.register,
				data: {
					userAcc: mobile,
					vericode: $("#app-vericode").val(),
					userPwd: $("#app_pwd").val(),
					sceneId: $("#app_inviteCode").val(),
					platform: "app",
//					分渠道 填ID
					channelid: "",
					clientId: plus.push.getClientInfo().clientid
				},
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					$("#app-stepOneNext").removeClass("app_loading");
					if (GHUTILS.checkErrorCode(result, _this.tips)) {
						localStorage.setItem("userID", mobile);
						//配置登录状态
						GHUTILS.upDataLocalCfig({
							ustatus:true,
							showstatus:true
						});
						GHUTILS.getUserInfo(function(){
							GHUTILS.refreshPages();
							if(!GHUTILS.getLocalCfg("skip")){
								mui.toast('设置手势密码，账户更安全');
								mui.fire(plus.webview.getLaunchWebview(),"openspwd");
							}
							setTimeout(function(){
								$(".steps").hide();
								$("#app-stepTwo").show();
							},100);
						});
					}
				},
				errcallback: function(){
					$("#app-stepOneNext").removeClass("app_loading");
				}
			});
		},
		//签到弹窗
		doSign: function() {
			//签到活动是否存在
			GHUTILS.LOAD({
				url:GHUTILS.API.CHA.getEventInfo,
				data:{
					eventType:'sign',
					couponType:"coupon"
				},
				type:'post',
				callback:function(result){
					if(result.errorCode == 0 && result.money !=null){
						//签到弹窗方法
						GHUTILS.LOAD({
							url: GHUTILS.API.signIn.checkSign,
							data: {},
							type: "post",
							//sw: true,
							callback: function(result) {
								if(result.errorCode == 0) {
									var sub = plus.webview.create("/html/index/index-shortcut/index-signin.html","SIGNIN_DIALOG", {
										background: "transparent",
										top: '0',
										bottom: '0'
									});
									sub.show();
								} else {
								}
							}
						})
					}
				}
			})
		}
	}
	mui.plusReady(function(){
		var reg = new REGIST();
			reg.init();
	});
})(Zepto);
