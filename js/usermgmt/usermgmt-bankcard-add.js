/*
 Title:银行卡信息
 Author:xu jinjin
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
mui.init();
(function($) {
	var BANKCARD = function(){
		this.ws = plus.webview.currentWebview();
		this.getVcode = $("#app-message");
		this.tips = $("#app_tips_box")
		this.orderNo = "";
		this.bankCodeList = [];
		this.bankNameList = [];
		this.passName = false;
		this.passIdNumb = false;
		this.cardOrderId = "";
		return this;
	}
	BANKCARD.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			_this.bankCardFindall();
			if(GHUTILS.getLocalUserInfo("fullName")){
				$("#app_name").attr("disabled","disabled").val(GHUTILS.getLocalUserInfo("fullName"))
				_this.passName = true
			}
			if(GHUTILS.getLocalUserInfo("fullIdNumb")){
				$("#app_idNumb").attr("disabled","disabled").val(GHUTILS.getLocalUserInfo("fullIdNumb"))
				_this.passIdNumb = true
			}
		},		
		getData:function(){
			var _this = this;
		},
		bindEvent:function(){
			var _this = this;
//			$('.app_icon_checked input[type="checkbox"]').on("change", function(){
//				if($(this).is(':checked')){
//					$(this).parent('span').removeClass('app_icon_checknone').addClass('app_icon_checked')
//				}else{
//					$(this).parent('span').removeClass('app_icon_checked').addClass('app_icon_checknone')
//				}
//			})
			
			_this.getVcode.on('tap', function(){
				if(_this.getVcode.hasClass("app_loading")){
					return
				}
				_this.tips.html('&nbsp;');
				if(_this.inputValid()){
					_this.getVcode.addClass("app_loading")
					GHUTILS.nativeUI.showWaiting();
					_this.findBankByCard($("#app_cardNumb").val(), function(){_this.valid4ele()}, function(){_this.getVcode.removeClass("app_loading")});
				}
			})
			
			$("#app_addBankCard").on('tap', function(){
				if($(this).hasClass("app_loading") || $(this).hasClass("app_btn_loading")){
					return
				}
				if(_this.inputValid() && GHUTILS.validate("app_message_div") && _this.isValid()){
					$(_this.tips).html('&nbsp;');
					$("#app_addBankCard").addClass("app_loading")
					GHUTILS.nativeUI.showWaiting();
					_this.findBankByCard($("#app_cardNumb").val(), function(){_this.bankadd();}, function(){$("#app_addBankCard").removeClass("app_loading")});
				}
			})
			
			$(".app_protocol").on("tap", function(){
				_this.getProtocolInfo($(this).attr("data-tilte"), $(this).attr("data-typeId"));
			})
			
			$("#app_cardNumb").on("blur", function(){
				_this.tips.html('&nbsp;');
				if($(this).val().length > 15){
					GHUTILS.nativeUI.showWaiting();
					_this.findBankByCard($(this).val(), function(){plus.nativeUI.closeWaiting();});
				}
			})
			
			$("#app_bankName").on("change", function(){
				_this.tips.html('&nbsp;');
				if($("#app_cardNumb").val().length > 15){
					GHUTILS.nativeUI.showWaiting();
					_this.findBankByCard($("#app_cardNumb").val(), function(){plus.nativeUI.closeWaiting();});
				}
			})
			
			$(".app_input_group input").forEach(function(e, i){
				$(e).on("input", function(){
					_this.buttonEnable();
				})
			})
			
			$(".bankQuota").on('click', function(){
				GHUTILS.OPENPAGE({
					url:"../../html/usermgmt/bank-quota.html"
				})
			})
			$(".bankQuota").on('tap',function(){
				GHUTILS.OPENPAGE({
					url:"../../html/usermgmt/bank-quota.html"
				})
			});		
		},
		buttonEnable: function(){
			if($("#app_name").val() && $("#app_idNumb").val().length == 18 && $("#app_cardNumb").val().length >= 16 && $("#app_phoneNo").val().length == 11 && $("#app_vericode").val().length == 6){
				$("#app_addBankCard").removeAttr("disabled")
			}else{
				$("#app_addBankCard").attr("disabled","disabled")
			}
		},
		//获取可交易银行列表
		bankCardFindall: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CMS.bankCardFindall,
				type: "post",
				sw: false,
				callback: function(result){
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result,_this.tips)){
						if (result.datas && result.datas.length > 0) {
//							var html = ""
							var html = '<option value="" selected="selected"  class="text-align-center"> 请选择 </option>'
							result.datas.forEach(function(e, i){
								html += '<option value="' + e.bankName + '">' + e.bankName + '</option>'
								_this.bankCodeList.push(e.peopleBankCode)
								_this.bankNameList.push(e.bankName)
							})
							$("#app_bankName").html(html)
						}else{
							GHUTILS.showError("暂无可选择的银行", _this.tips)
						}
					}
					plus.nativeUI.closeWaiting();
				}
			})
		},
		//验证银行卡号与银行是否匹配
		findBankByCard: function(bankCard, iftrue, failure){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.findBankByCard+"?bankCard="+bankCard,
				type: "post",
				sw: false,
				callback: function(result) {
					console.log("findBankByCard:"+JSON.stringify(result))
					if(result && result.errorCode == 0){
						if(result.bankInfo.bankCode){
							if(result.bankInfo.bankCode == _this.bankCodeList[_this.bankNameList.indexOf($("#app_bankName").val())]){
								iftrue.apply(null, arguments);
							}else{
								if(_this.bankCodeList.indexOf(result.bankInfo.bankCode) > -1){
									GHUTILS.showError("银行卡号与银行不匹配！已为您自动匹配银行", _this.tips)
									$("#app_bankName").val(_this.bankNameList[_this.bankCodeList.indexOf(result.bankInfo.bankCode)])
								}else{
									GHUTILS.showError("不支持该银行卡！", _this.tips)
									if(failure){
										failure.apply(null,arguments)
									}
								}
								plus.nativeUI.closeWaiting();
								if(failure){
									failure.apply(null,arguments)
								}
							}
						}else{
							GHUTILS.showError("银行卡号错误或不支持该银行卡！", _this.tips)
							plus.nativeUI.closeWaiting();
							if(failure){
								failure.apply(null,arguments)
							}
						}
					}else if(result.errorCode == 10002){
						plus.nativeUI.closeWaiting();
						if(failure){
							failure.apply(null,arguments)
						}
						GHUTILS.loginOut(function(){
							var cb = {
								cb:"reload",
								pageid:plus.webview.currentWebview().id
							}
							GHUTILS.openLogin(JSON.stringify(cb));
						});
					}else if(result.errorCode == '40004'){
						plus.nativeUI.closeWaiting();
						if(failure){
							failure.apply(null,arguments)
						}
						if(!plus.webview.getWebviewById(GHUTILS.PAGESID.INDEXSYSTEM)){
							plus.webview.create('../../html/index/index-system.html', GHUTILS.PAGESID.INDEXSYSTEM).show()
						}
					}else{
						if(failure){
							failure.apply(null,arguments)
						}
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						GHUTILS.showError(_msg || "数据更新中，请耐心等待", _this.tips)
						plus.nativeUI.closeWaiting();
					}
				},
				errcallback: function(err){
					if(failure){
						failure.apply(null,arguments)
					}
				}
			})
		},
		//用户验证
		valid4ele: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.valid4ele,
				data: {
					realName: GHUTILS.getLocalUserInfo("fullName") || $("#app_name").val(),
					certificateNo: GHUTILS.getLocalUserInfo("fullIdNumb") || $("#app_idNumb").val(),
					bankName: $("#app_bankName").val(),
					cardNo: $("#app_cardNumb").val(),
					phone: $("#app_phoneNo").val()
				},
				type: "post",
				sw: false,
				callback: function(result) {
					console.log("四要素："+JSON.stringify(result))
					if (result.errorCode == 0 || result.errorCode == 9907) {
						_this.cardOrderId = result.cardOrderId
						GHUTILS.btnTime2(_this.getVcode);
						$("#app_addBankCard").removeClass("app_btn_loading")
					}else if(result.errorCode == 10002){
						_this.getVcode.removeClass("app_loading")
						GHUTILS.loginOut(function(){
							var cb = {
								cb:"reload",
								pageid:plus.webview.currentWebview().id
							}
							GHUTILS.openLogin(JSON.stringify(cb));
						});
					}else if(result.errorCode == '40004'){
						_this.getVcode.removeClass("app_loading")
						if(!plus.webview.getWebviewById(GHUTILS.PAGESID.INDEXSYSTEM)){
							plus.webview.create('../../html/index/index-system.html', GHUTILS.PAGESID.INDEXSYSTEM).show()
						}
					}else{
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						GHUTILS.showError(_msg || "数据更新中，请耐心等待", _this.tips)
						$("#app_addBankCard").removeClass("app_loading")
						_this.getVcode.removeClass("app_loading")
					}
					plus.nativeUI.closeWaiting();
				},
				errcallback: function(){
					_this.getVcode.removeClass("app_loading")
					$("#app_addBankCard").removeClass("app_loading")
				}
			});
		},
		//添加银行卡
		bankadd: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.bankadd,
				data: {
					cardOrderId: _this.cardOrderId,
					smsCode: $("#app_vericode").val()
				},
				type: "post",
				sw: false,
				callback: function(result) {
					console.log("绑卡："+JSON.stringify(result))
					plus.nativeUI.closeWaiting();
					if (GHUTILS.checkErrorCode(result, _this.tips)) {
						GHUTILS.getUserInfo(function(){
							$(".steps").hide();
							$("#app_stepTwo").show();
							mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.BANKCARDLIST), "loadData")
							mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.SETTING), "loadData")
						})
					}
					$("#app_addBankCard").removeClass("app_loading")
				},
				errcallback: function(){
					$("#app_addBankCard").removeClass("app_loading")
				}
			});
		},
		//获取协议信息
		getProtocolInfo: function(title, typeId){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CMS.getProtocolInfo+"?typeId="+typeId,
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result, _this.tips)){
						GHUTILS.OPENPAGE({
							url:"../../html/index/content_pages.html",
							id:GHUTILS.PAGESID.CONTENT,
							extras:{
								title: title,
								content: encodeURIComponent(result.content)
							}
						})
					}
				}
			})
		},
		inputValid: function(){
			var _this = this;
			var valid = true, idNumb = $("#app_idNumb").val();
			if(!_this.passName && !GHUTILS.validate("app_realName_div")){
				valid = false
			}else if(!_this.passIdNumb && (!GHUTILS.validate("app_idNumb_div") || !idCardValid.idCardValidate(idNumb,_this.tips))){
				valid = false
			}else if(!GHUTILS.validate("app_phoneNo_div")){
				valid = false
			}else if(!GHUTILS.validate("app_cardNumb_div")){
				valid = false
			}
			return valid
		},
		isValid: function(){
			var _this = this;
			var valid = true;
//			if(!$('#app_aggrement').is(':checked')){
//				GHUTILS.showError("您必须同意并遵守《快捷支付服务协议》才能绑卡",_this.tips);
//				valid = false
//			}
			return valid
		},
	}
	mui.plusReady(function(){
		var bc = new BANKCARD();
			bc.init();
	});
})(Zepto);