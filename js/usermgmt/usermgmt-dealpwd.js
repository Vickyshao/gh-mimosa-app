/*
 Title:交易密码
 Author:sunli haiyang
 Date:2016-6-21 14:58:11
 Version:v1.0
*/
mui.init();
(function($) {

	var DEALPWD = function(){
		this.ws = plus.webview.currentWebview();
		this.getVcode = $("#app_message");
		this.times = 0;
		this.dodeal = false;
		this.tips = $("#app_tips_box")
		this.tips1 = $("#app_tips_box1")
		this.tips2 = $("#app_tips_box2")
		this.tips3 = $("#app_tips_box3")
		this.tips4 = $("#app_tips_box4")
		this.set = 0;
		this.reset = 0;
		this.forget = 0;
		this.setpwd1 = "";
		this.setpwd2 = "";
		this.resetPwd1 = "";
		this.resetpwd2 = "";
		this.resetpwd3 = "";
		this.forgetpwd1 = ""
		this.forgetpwd2 = "";
		return this;
	}
	DEALPWD.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
		},
		pageInit:function(){
			var _this = this;
			switch(_this.ws.type){
				case "deal" : case "redeem" : case "deposit" : case "withdraw" : 
					$("#stepOne").show()
					$("#app_title").html("")
					_this.getFocus("#app_dealpwd");
					break
				case "set" : 
					$("#stepTwo").show()
					$("#app_title").html("设置")
					_this.getFocus("#app_dealpwd1");
					break
				case "modify" :
					$("#stepFour").show()
					$("#app_title").html("重置")
					$("#app_mobile").html('+86 '+localStorage.getItem("userID"))
					break
				default : 
					break
			}
			plus.nativeUI.closeWaiting();
			
			//交易结果页面未关闭，先关闭页面
			if(plus.webview.getWebviewById(GHUTILS.PAGESID.JYJG)){
				plus.webview.getWebviewById(GHUTILS.PAGESID.JYJG).close("none", 0)
			}
		},
		bindEvent:function(){
			var _this = this,
				re = /^\d{0,6}$/;
			$(".app_input_safenum").on("input", function(){
				var _val = $(this).val();
				$(this).val(_val.match(re));
				var _numsafebox = $(this).parent(".app_num_safe_view").find(".app_num_safebox");				
				_len = _val.match(re) ? _val.length : 0;
				for (var i = 0; i < 6; i++) {
					if( i < _len ){
						_numsafebox.find("td").eq(i).find("div").addClass("app_point");						
					}else{
						_numsafebox.find("td").eq(i).find("div").removeClass("app_point");
					}
				}
				if(_val.length == 6){
					$(this).blur();
				}else{
					return
				}
			})
			
			$("#app_dealpwd").on("input", function(){
				var _val = $(this).val();
				if(_val.length == 6){
					_this.checkpaypwd($("#app_dealpwd").val(), _this.tips, function(){
						_this.dodeal = true;
						if(_this.ws.type == "deal"){
							_this.doInvest();
						}else if(_this.ws.type == "redeem"){
							_this.doRedeem();
						}else if(_this.ws.type == "deposit"){
							_this.doDeposit();
						}else if(_this.ws.type == "withdraw"){
							_this.doWithdraw();
						}
					}, function(){
						_this.inputClear();
					});
				}else{
					_this.tips.html("&nbsp;")
				}
			})
			
			$("#app_dealpwd1").on("input", function(){
				var _val = $(this).val();
				if(_val.length == 6){
					if(_this.set == 0){
						_this.set++
						_this.setpwd1 = $("#app_dealpwd1").val();
						_this.inputClear();
						$("#app_setdealpwd1").html("请确认您的交易密码")
						_this.getFocus("#app_dealpwd1");
						return
					}else{
						_this.set= 0;
						_this.setpwd2 = $("#app_dealpwd1").val();
						if(_this.setpwd1 == _this.setpwd2){
							_this.setpaypwd(_this.setpwd1, "", function(){
								mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCOUNTSAFTY), "loadData")
								mui.toast("交易密码设置成功！")
								if(_this.ws.bankadd){
									GHUTILS.OPENPAGE({
										url: "../../html/usermgmt/usermgmt-bankcard-add.html",
										id: GHUTILS.PAGESID.BANKCARDADD
									})
									GHUTILS.nativeUI.showWaiting();
									setTimeout(function(){
										plus.webview.getWebviewById(GHUTILS.PAGESID.DEALPWD).close("none", 0)
									}, 500)
								}else{
									mui.back();
								}
							}, function(){
								_this.inputClear();
								_this.pwdClear();
								$("#app_setdealpwd1").html("请设置您的交易密码")
								_this.getFocus("#app_dealpwd1");
							}, _this.tips1);
						}else{
							GHUTILS.showError("两次密码不相同，请重试！", _this.tips1)
							_this.inputClear();
							_this.pwdClear();
							$("#app_setdealpwd1").html("请设置您的交易密码")
							_this.getFocus("#app_dealpwd1");
						}
					}
				}else{
					_this.tips1.html("&nbsp;")
				}
			})
			
			$("#app_dealpwd2").on("input", function(){
				var _val = $(this).val();
				if(_val.length == 6){
					if(_this.reset == 0){
						_this.checkpaypwd($("#app_dealpwd2").val(), _this.tips2, function(){
							plus.nativeUI.closeWaiting();
							_this.reset++
							_this.resetPwd1 = $("#app_dealpwd2").val();
							_this.inputClear();
							$("#app_setdealpwd2").html("请输入新的交易密码")
						}, function(){
							_this.inputClear();
						});
					}else if(_this.reset == 1){
						_this.resetPwd2 = $("#app_dealpwd2").val();
						_this.inputClear();
						if(_this.resetPwd1 == _this.resetPwd2){
							GHUTILS.showError("新密码不可与旧密码相同，请重试！", _this.tips2)
							$("#app_setdealpwd2").html("请输入您的原交易密码")
							_this.reset= 0;
							_this.pwdClear();
						}else{
							_this.reset++
							$("#app_setdealpwd2").html("请再次输入新的交易密码")
						}
					}else{
						_this.reset= 0;
						_this.resetPwd3 = $("#app_dealpwd2").val();
						if(_this.resetPwd2 == _this.resetPwd3){
							_this.setpaypwd(_this.resetPwd1, _this.resetPwd2, function(){
								mui.toast("交易密码修改成功！")
								mui.back();
							}, function(){
								_this.inputClear();
								_this.pwdClear();
								$("#app_setdealpwd2").html("请输入您的原交易密码")
							}, _this.tips2);
						}else{
							GHUTILS.showError("两次密码不相同，请重试！", _this.tips2)
							_this.inputClear();
							_this.pwdClear();
							$("#app_setdealpwd2").html("请输入您的原交易密码")
						}
					}
				}else{
					_this.tips2.html("&nbsp;")
				}
			})
			
			$("#app_dealpwd3").on("input", function(){
				var _val = $(this).val();
				if(_val.length == 6){
					if(_this.forget == 0){
						_this.forget++
						_this.forgetpwd1 = $("#app_dealpwd3").val();
						_this.inputClear();
						$("#app_setdealpwd3").html("请再次输入新的交易密码")
						_this.getFocus("#app_dealpwd3");
						return
					}else{
						_this.forget= 0;
						_this.forgetpwd2 = $("#app_dealpwd3").val();
						if(_this.forgetpwd1 == _this.forgetpwd2){
							_this.setpaypwd(_this.forgetpwd1, "", function(){
								mui.toast("交易密码重置成功！")
								mui.back();
							}, function(){
								_this.inputClear();
								_this.pwdClear();
								$("#app_setdealpwd3").html("请输入新的交易密码")
								_this.getFocus("#app_dealpwd3");
							}, _this.tips4);
						}else{
							GHUTILS.showError("两次密码不相同，请重试！", _this.tips4)
							_this.inputClear();
							_this.pwdClear();
							$("#app_setdealpwd3").html("请输入新的交易密码")
							_this.getFocus("#app_dealpwd3");
						}
					}
				}else{
					_this.tips4.html("&nbsp;")
				}
			})
			
			_this.getVcode.on('tap', function(){
				if(_this.getVcode.hasClass("app_btn_loading")){
					return
				}
				$(_this.tips3).html('&nbsp;');
				_this.getVericode();
			})
			
			$("#app_resetPwd").on('tap', function(){
				$("#app_vericode").blur()
				if(GHUTILS.validate("stepFour")){
					_this.checkPhoneCode();
				}
			})
		},
		//获取验证码
		getVericode:function(){
			var _this = this;
			_this.getVcode.addClass("app_btn_loading")
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.sendverifyv1,
				data: {
					phone: localStorage.getItem("userID"),
					smsType: "normal",
					values: ["", 2]
				},
				type: "post",
				sw: true,
				callback: function(result) {
					if(GHUTILS.checkErrorCode(result,_this.tips3)){
						GHUTILS.btnTime(_this.getVcode);
					}else{
						_this.getVcode.removeClass("app_btn_loading")
					}
				},
				errcallback: function(){
					_this.getVcode.removeClass("app_btn_loading")
				}
			});
		},
		//短信验证码检测
		checkPhoneCode: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.verify,
				data: {
					phone: localStorage.getItem("userID"),
					veriCode: $("#app_vericode").val(),
					smsType: "normal"
				},
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if (GHUTILS.checkErrorCode(result, _this.tips3)) {
						$(".steps").hide();
						$("#stepFive").show();
						_this.getFocus("#app_dealpwd3");
					}
				}
			});
		},
		checkpaypwd: function(payPwd, tips, success, failure){
			var _this = this;
			tips.html("&nbsp;")
			if(_this.dodeal){
				GHUTILS.showError("同笔订单不可重复进行交易！", tips)
				_this.inputClear();
				return
			}
			GHUTILS.nativeUI.showWaiting();
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.checkpaypwd,
				data: {
					payPwd: payPwd
				},
				type: "post",
				sw: false,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if(result && result.errorCode == 0){
						success.apply(null, arguments)
					}else if(result.errorCode == 10002){
						failure.apply(null, arguments)
						plus.nativeUI.closeWaiting();
						GHUTILS.loginOut(function(){
							var cb = {
								cb:"reload",
								pageid:plus.webview.currentWebview().id
							}
							GHUTILS.openLogin(JSON.stringify(cb));
						});
					}else if(result.errorCode == '40004'){
						failure.apply(null, arguments)
						plus.nativeUI.closeWaiting();
						if(!plus.webview.getWebviewById(GHUTILS.PAGESID.INDEXSYSTEM)){
							plus.webview.create('../../html/index/index-system.html', GHUTILS.PAGESID.INDEXSYSTEM).show()
						}
					}else{
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						GHUTILS.showError(_msg || "数据更新中，请耐心等待", tips)
						failure.apply(null, arguments)
						plus.nativeUI.closeWaiting();
					}
				},
				errcallback: function(err){
					failure.apply(null, arguments)
					GHUTILS.showError("密码验证失败，请重试！", tips)
				}
			})
		},
		setpaypwd: function(payPwd, newPayPwd, success, failure, tips){
			var _this = this;
			console.log(payPwd)
			console.log(newPayPwd)
			console.log(_this.ws.type)
			tips.html("&nbsp;")
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.dealpaypwd,
				data: {
					payPwd: payPwd,
					newPayPwd: newPayPwd,
					payPwdType: 'set'
				},
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result, tips)){
						GHUTILS.getUserInfo(function(){
							success.apply(null, arguments)
						})
					}else{
						failure.apply(null, arguments)
					}
				},
				errcallback: function(err){
					GHUTILS.showError("密码设置失败，请重试！", tips)
					failure.apply(null, arguments)
				}
			})
		},
		doInvest: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.ORDER.invest,
				data: {
					productOid: _this.ws.productOid,
					moneyVolume: _this.ws.moneyVolume,
					cid: cid,
					ckey: ckey,
					couponId: _this.ws.couponId || "",
					couponType: _this.ws.couponType || "",
					couponDeductibleAmount: _this.ws.couponDeductibleAmount || "",
					couponAmount: _this.ws.couponAmount || "",
					payAmouont: _this.ws.payAmouont == 0 ? 0 : (_this.ws.payAmouont || "")
				},
				type: "post",
				sw: false,
				callback: function(result) {
					_this.inputClear();
					console.log(JSON.stringify(result))
					if(result && result.errorCode == 0){
						_this.checkOrder(result.tradeOrderOid);
					}else{
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						mui.toast(_msg || "数据更新中，请耐心等待")
						plus.nativeUI.closeWaiting();
						mui.back()
					}
				}
			})
		},
		doRedeem: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.ORDER.performredeem,
				data: {
					productOid: _this.ws.productOid,
					orderAmount: _this.ws.moneyVolume,
					cid: cid,
					ckey: ckey,
					province: _this.ws.province || "",
					city: _this.ws.city || ""
				},
				type: "post",
				async: true,
				sw:true,
				callback: function(result) {
					_this.inputClear();
					console.log(JSON.stringify(result))
					if(result && result.errorCode == 0){
						GHUTILS.getUserInfo(function(){
							GHUTILS.refreshPages();
							_this.openResultPage({beginInterestDate: '',interestArrivedDate: '',deal: GHUTILS.currentDate()}, true);
						});
					}else{
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						mui.toast(_msg || "数据更新中，请耐心等待")
						mui.back()
					}
				}
			}); 
		},
		
		doDeposit: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.ORDER.deposit,
				data: {
					orderAmount: _this.ws.moneyVolume,
					payNo: _this.ws.payNo,
					smsCode: _this.ws.smsCode
				},
				type: "post",
				async: true,
				sw:false,
				callback: function(result) {
					_this.inputClear();
					console.log(JSON.stringify(result))
					if(result && result.errorCode == 0){
						_this.checkOrder(result.bankOrderOid);
					}else{
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						mui.toast(_msg || "数据更新中，请耐心等待")
						plus.nativeUI.closeWaiting();
						mui.back()
					}
				}
			}); 
		},
		
		doWithdraw: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.ORDER.withdraw,
				data: {
					orderAmount: _this.ws.moneyVolume
				},
				type: "post",
				async: true,
				sw:true,
				callback: function(result) {
					_this.inputClear();
					console.log(JSON.stringify(result))
					if(result && result.errorCode == 0){
						GHUTILS.getUserInfo(function(){
							GHUTILS.refreshPages();
							_this.openResultPage({beginInterestDate: '',interestArrivedDate: '',deal: GHUTILS.currentDate()}, true);
						});
					}else{
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						mui.toast(_msg || "数据更新中，请耐心等待")
						mui.back()
					}
				}
			}); 
		},
		
		checkOrder:function(orderid){
			var _this = this;
			var _date = {};
			var url = "", data = {};
			if(_this.ws.type == "deal"){
				url = GHUTILS.API.ORDER.investisdone
				data.tradeOrderOid = orderid
			}else if(_this.ws.type == "deposit"){
				url = GHUTILS.API.ORDER.depositisdone
				data.bankOrderOid = orderid
			}
			GHUTILS.LOAD({
				url: url,
				data: data,
				type: "post",
				callback: function(d) {
					console.log("订单查询" + JSON.stringify(d));
					if( d && d.errorCode == 0 ){
						_this.times = 0;
						_date.deal = d.completeTime;
						_date.beginInterestDate = d.beginInterestDate;
						_date.interestArrivedDate = d.interestArrivedDate;
						_this.openResultPage(_date,true);
				
					}else if(d.errorCode == -1){
						if(_this.times < 10){							
							setTimeout(function(){
								_this.checkOrder(orderid);
							},3000)
						}else{
							_this.times = 0;
							//关闭相关页面
							_date.deal = GHUTILS.currentDate();//d.dealDate;
							_date.beginInterestDate = d.beginInterestDate;
							_date.interestArrivedDate = d.interestArrivedDate;
							_this.openResultPage(_date,false);
						}	
						_this.times++;
					}else{
						plus.nativeUI.closeWaiting();
						var _msg = d.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						GHUTILS.showError(_msg || "数据更新中，请耐心等待", _this.tips)
					}
				},
				errcallback: function(){
					GHUTILS.nativeUI.showWaiting();
					if(_this.times < 10){
						_this.checkOrder(orderid);
					}else{
						_this.times = 0;
						//关闭相关页面
						_date.deal = GHUTILS.currentDate();//d.dealDate;
						_date.beginInterestDate = null;
						_date.interestArrivedDate = null;
						_this.openResultPage(_date,false);
					}
					_this.times++;
				}
			})
		},
		openResultPage:function(dt, state){
			var _this = this;
			//打了结果页面
			console.log("打开结果页面。");
			plus.nativeUI.closeWaiting();
			
			GHUTILS.OPENPAGE({
				url: '../../html/account/account-zxym-jg.html',
				id: GHUTILS.PAGESID.JYJG,
				extras: {
					titletxt: _this.ws.title,
					pageindex: _this.ws.pageindex,
					productName: _this.ws.productName,
					moneynum: _this.ws.moneyVolume,
					valueDate: dt.beginInterestDate,
					accountDate: dt.interestArrivedDate,
					pagesid: _this.ws.pagesid || '',
					deal: dt.deal,
					proTnDetail: _this.ws.proTnDetail || '',
					proT0Detail: _this.ws.proT0Detail || '',
					proT0OrderList: _this.ws.proT0OrderList || '',
					accT0HoldDet: _this.ws.accT0HoldDet || '',
					couponType: _this.ws.couponType || '',
					coupon: _this.ws.coupon || '',
					state: state
				}
			});
			
			setTimeout(function(){
				plus.webview.currentWebview().close("none", 0)
			}, mui.os.ios ? 500 : 1000)
		},
		//获取焦点
		getFocus: function(inputId){
			$(inputId).attr("disabled","disabled")
			var imm, InputMethodManager;
			var nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
			if (mui.os.android) {
				//强制当前webview获得焦点
				var wv_current = plus.android.currentWebview();
				plus.android.importClass(wv_current);
				wv_current.requestFocus();
				
				var main = plus.android.runtimeMainActivity();
				var Context = plus.android.importClass("android.content.Context");
				InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
				imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
				imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
			} else {
				nativeWebview.plusCallMethod({
					"setKeyboardDisplayRequiresUserAction": false
				});
			}
			setTimeout(function() {
				var inputElem = document.querySelector(inputId);
				$(inputId).removeAttr("disabled")
				inputElem.focus(); 
			}, 350);
		},
		inputClear:function(){
			var _this = this;
			$(".app_input_safenum").val('');
			$(".app_num_safebox").find("td").find("div").removeClass("app_point");
		},
		pwdClear: function(){
			var _this = this;
			_this.setpwd1 = "";
			_this.setpwd2 = "";
			_this.resetPwd1 = "";
			_this.resetpwd2 = "";
			_this.resetpwd3 = "";
			_this.forgetpwd1 = ""
			_this.forgetpwd2 = "";
		}
	}
	mui.plusReady(function(){
		var dealpwd = new DEALPWD();
			dealpwd.init();
	});
})(Zepto);