/*
 Title:修改密码
 Author:sunli haiyang
 Date:2016-6-17 16:28:03
 Version:v1.0
*/
mui.init();
(function($) {

	var PWD = function(){
		this.tips = "#app_tips_box";
		this.ws = plus.webview.currentWebview();
		return this;
	}
	PWD.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			
			switch(_this.ws.type){
				case "set" : 
					$("#app-stepThree").removeClass("app_none")
					$("#app_confirm_div").removeClass("app_none")
					$("#app_title").html("设置")
					break
				case "modify" : 
					$("#app-stepOne").removeClass("app_none")
					$("#app_stepOne_next_div").removeClass("app_none")
					$("#app_title").html("修改")
					break
				default : 
					break
			}
			
			plus.nativeUI.closeWaiting();
		},		
		getData:function(){
			var _this = this;
		},
		bindEvent:function(){
			var _this = this;
			$('#app_stepOne_next').off().on('tap',function(){
				$(_this.tips).html("&nbsp;")
				if(GHUTILS.validate("app-stepOne")){
					$('#app-oriPwd').blur()
					_this.getSeq()
				}
			});
			
			$('#app_confirm').off().on('tap',function(){
				$(_this.tips).html("&nbsp;")
				if(_this.ws.type == "set"){
					if(GHUTILS.validate("app-stepThree")){
						_this.resetPassword($('#app-userPwd').val(), "设置")
					}
				}else{
					if(GHUTILS.validate("app-stepTwo")){
						if($("#app-userPwdNew").val() == $("#app-oriPwd").val()){
							GHUTILS.showError("新密码不能与原密码相同", _this.tips)
						}else{
							_this.resetPassword($('#app-userPwdNew').val(), "修改");
						}
					}
				}
			});
			
			GHUTILS.inputFocus("#app-oriPwd");
			
			GHUTILS.inputFocus("#app-userPwdNew");
			
			GHUTILS.inputFocus("#app-userPwdNewConfirm");
			
			GHUTILS.inputFocus("#app-userPwd");
			
			GHUTILS.inputFocus("#app-userPwdConfirm");
		},
		getSeq: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.seq,
				data: {
					platform: "app",
					userPwd: $('#app-oriPwd').val()
				},
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if (GHUTILS.checkErrorCode(result,_this.tips)) {
						$("#app-stepOne").addClass("app_none")
						$("#app_stepOne_next_div").addClass("app_none")
						$("#app-stepTwo").removeClass("app_none")
						$("#app_confirm_div").removeClass("app_none")
					}
				}
			});
		},
		resetPassword: function(userPwd, message){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.modifypassword,
				type: "post",
				sw: true,
				data: {
					userPwd: userPwd,
					platform: "app"
				},
				callback: function(result) {
					if (GHUTILS.checkErrorCode(result,_this.tips)) {
						_this.doLogout(message);
					}
				}
			});
		},
		doLogout: function(message){
			var _this = this;
			GHUTILS.loginOut(function(){
				mui.toast("密码已"+message+"，请重新登录！");
				_this.ws.opener().close("none",0);
				plus.webview.getWebviewById(GHUTILS.PAGESID.SETTING).close("none",0);
				var wg = plus.webview.getLaunchWebview();
				mui.fire(wg, "showtab", {
					tabindex: 0
				});
				GHUTILS.OPENPAGE({
					url:"../../html/usermgmt/usermgmt-login.html",
					id:GHUTILS.PAGESID.LOGIN,
					extras:{
						pwd: true
					}
				})
				GHUTILS.nativeUI.showWaiting();
			})
		}
	}
	mui.plusReady(function(){
		var pwd = new PWD();
			pwd.init();
	});
})(Zepto);