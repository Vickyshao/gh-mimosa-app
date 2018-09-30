/*
 Title:充值
 Author:chen
 Date:2016-6-23 15:31:00
 Version:v1.0
*/
mui.init();
(function($) {
	var DP = function(){
		this.ws = plus.webview.currentWebview();
		this.tips = "#app_tips_box1";
		this.singleQuota = null;
		this.times = 0;
		this.flag = true;
		return this;
	}
	DP.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			$("#app_bankName").html(GHUTILS.getLocalUserInfo("bankName"))
			$("#app_bankCardNum").html(GHUTILS.getLocalUserInfo("bankCardNum"))
			_this.bankCardFind();
		},		
		getData:function(){
			var _this = this;
		},
		//获取银行卡icon
		bankCardFind: function(){
			var _this = this, bankname = GHUTILS.getLocalUserInfo("bankName");
			if(bankname){
				GHUTILS.LOAD({
					url: GHUTILS.API.CMS.bankCardFind+'?codes=["'+bankcodetrans[bankcode[bankname]]+'"]',
					type: "post",
					sw: true,
					callback: function(result){
						console.log(JSON.stringify(result))
						if(GHUTILS.checkErrorCode(result,_this.tips)){
							if(result.datas && result.datas.length > 0){
								if(result.datas[0].bankLogo){
									$("#app_bankimg").attr("src", HOST+result.datas[0].bankLogo)
								}else{
									GHUTILS.showError("数据更新中，请稍后...", _this.tips)
								}
								if(result.datas[0].payOneLimit){
									$("#app_bankLimit").html(GHUTILS.formatIntCurrency(result.datas[0].payOneLimit) + " 元")
									_this.singleQuota = result.datas[0].payOneLimit
								}else if(result.datas[0].payOneLimit == 0){
									$("#app_bankLimit").html("金额无限制")
									_this.singleQuota = result.datas[0].payOneLimit
								}else{
									GHUTILS.showError("数据更新中，请稍后...", _this.tips)
								}
							}else{
								GHUTILS.showError("数据更新中，请稍后...", _this.tips)
							}
						}
						plus.nativeUI.closeWaiting();
					}
				})
			}else{
				GHUTILS.showError("用户未绑卡", _this.tips)
			}
		},
		bindEvent:function(){
			var _this = this;
//			$('#app_confirm[type="checkbox"]').on("change", function(){
//			    if($(this).is(':checked')){
//			       $(this).parent('span').removeClass('app_icon_checknone').addClass('app_icon_checked')
//			    }else {
//			        $(this).parent('span').removeClass('app_icon_checked').addClass('app_icon_checknone')
//			    }
//		    })
			//充值金额
			$("#app_money").on({
				"focus":function(){
					$(document).on('keyup', function (e) {
						if (e.keyCode === 13 && !$("#app_getRechargeFrom").attr("disabled")) {
							$("#app_money").blur();
						}
					}.bind(this))
				},
				"blur": function() {
					var formatMoney = GHUTILS.formatCurrency($("#app_money").val());
					formatMoney = formatMoney == '0.00' ? '' : formatMoney;
					$("#app_money").val(formatMoney);
					$(document).off('keyup')
				}
			});
			
			$("#app_getRechargeFrom").on("tap", function() {
				$(_this.tips).html("&nbsp;");
				if($(this).hasClass("app_btn_loading")){
					return
				}else if (!GHUTILS.validate()) {
					return
				} else if (_this.validMoney()) {
					return
				} 
//				else if (!$("#app_confirm")[0].checked) {
//					GHUTILS.showError("您必须同意《充值代扣委托书》", _this.tips);
//					return
//				} 
				else {
					$("#app_getRechargeFrom").addClass("app_btn_loading")
//					_this.switchFind();
					_this.checkpaypwd();
				}
			});
			
			$("input").forEach(function(e, i){
				$(e).on("input", function(){
					_this.buttonEnable();
				})
			})
		},
		buttonEnable: function(){
			if($("#app_money").val() && parseFloat($('#app_money').val().trim().replace(/\,/g,'')) >= 2 && $("#app_dealpwd").val().length == 6){
				$("#app_getRechargeFrom").removeAttr("disabled")
			}else{
				$("#app_getRechargeFrom").attr("disabled","disabled")
			}
		},
		//校验金额
		validMoney: function() {
			var valid = false;
			var _this = this;
			//金额
			var money = parseFloat($('#app_money').val().trim().replace(/\,/g, ''));
			if(money < 2){
				GHUTILS.showError('充值金额有误，最低大于2元起充',_this.tips);
				valid = true;
			}else if (_this.singleQuota && money > _this.singleQuota) {
				GHUTILS.showError("充值金额有误，充值金额不能超过"+_this.singleQuota+"元!", _this.tips);
				valid = true;
			}else if (_this.singleQuota == null) {
				GHUTILS.showError("数据更新中，请稍后...", _this.tips);
				valid = true;
			}
			return valid;
		},
		switchFind: function(){
			var _this = this;
			$(_this.tips).html("&nbsp;")
			GHUTILS.LOAD({
				url: GHUTILS.API.CHA.switchFind+"?code=Recharge",
				type: "post",
				sw: true,
				callback: function(result){
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result,_this.tips)){
						if(result.status && result.status == "enable"){
							_this.checkpaypwd();
						}else{
							$("#app_getRechargeFrom").removeClass("app_btn_loading")
							GHUTILS.showError("该用户不可充值！", _this.tips)
						}
					}else{
						$("#app_getRechargeFrom").removeClass("app_btn_loading")
					}
				},
				errcallback: function(){
					$("#app_getRechargeFrom").removeClass("app_btn_loading")
				}
			})
		},
		dapply: function(){
			var _this = this;
			var orderAmount = $("#app_money").val().trim().replace(/\,/g, '');
			GHUTILS.LOAD({
				url: GHUTILS.API.ORDER.dapply,
				data: {
					orderAmount: orderAmount
				},
				type: "post",
				sw: true,
				callback: function(result){
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result, _this.tips)){
						$("#app_money").blur();
						$("#app_dealpwd").blur();
						mui.confirm('<input type="tel" id="app_message" maxlength = "6" oninput="GHUTILS.checkInput(this,5)" />', '请输入短信验证码', null, function(event) {
							var index = event.index;
							if(index === 1) {
								var pwd = document.getElementById('app_message').value;
								if(pwd.length < 6){
									mui.toast("请输入6位验证码！")
									return false
								}else{
									_this.doDeposit(result.payNo, pwd);
//									$("#app_getRechargeFrom").removeClass("app_btn_loading")
//									GHUTILS.OPENPAGE({
//										url: '../../html/usermgmt/usermgmt-dealpwd.html',
//										id: GHUTILS.PAGESID.DEALPWD,
//										extras:{
//											type: 'deposit',
//											payNo: result.payNo,
//											moneyVolume: orderAmount,
//											smsCode: pwd,
//											pageindex: 3,
//											title: "充值成功",
//											pagesid: GHUTILS.PAGESID.DEPOSIT
//										}
//									})
//									GHUTILS.nativeUI.showWaiting();
								}
							}else{
								$("#app_getRechargeFrom").removeClass("app_btn_loading")
							}
						},'div');
					}else{
						$("#app_getRechargeFrom").removeClass("app_btn_loading")
					}
				},
				errcallback: function(){
					$("#app_getRechargeFrom").removeClass("app_btn_loading")
				}
			})
		},
		checkpaypwd: function(){
			var _this = this;
			$(_this.tips).html("&nbsp;")
			GHUTILS.nativeUI.showWaiting();
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.checkpaypwd,
				data: {
					payPwd: $("#app_dealpwd").val()
				},
				type: "post",
				sw: false,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if(result && result.errorCode == 0){
						_this.dapply();
					}else if(result.errorCode == 10002){
						plus.nativeUI.closeWaiting();
						$("#app_dealpwd").val("");
						$("#app_getRechargeFrom").attr("disabled","disabled")
						$("#app_getRechargeFrom").removeClass("app_btn_loading")
						GHUTILS.loginOut(function(){
							var cb = {
								cb:"reload",
								pageid:plus.webview.currentWebview().id
							}
							GHUTILS.openLogin(JSON.stringify(cb));
						});
					}else if(result.errorCode == '40004'){
						plus.nativeUI.closeWaiting();
						$("#app_dealpwd").val("");
						$("#app_getRechargeFrom").attr("disabled","disabled")
						$("#app_getRechargeFrom").removeClass("app_btn_loading")
						if(!plus.webview.getWebviewById(GHUTILS.PAGESID.INDEXSYSTEM)){
							plus.webview.create('../../html/index/index-system.html', GHUTILS.PAGESID.INDEXSYSTEM).show()
						}
					}else{
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						GHUTILS.showError(_msg || "数据更新中，请耐心等待", _this.tips)
						plus.nativeUI.closeWaiting();
						$("#app_dealpwd").val("");
						$("#app_getRechargeFrom").attr("disabled","disabled")
						$("#app_getRechargeFrom").removeClass("app_btn_loading")
					}
				},
				errcallback: function(err){
					$("#app_dealpwd").val("");
					$("#app_getRechargeFrom").attr("disabled","disabled")
					$("#app_getRechargeFrom").removeClass("app_btn_loading")
					GHUTILS.showError("密码验证失败，请重试！", _this.tips)
				}
			})
		},
		doDeposit: function(payNo, smsCode){
			var _this = this;
			if(!_this.flag){
				return
			}
			_this.flag = false
			GHUTILS.LOAD({
				url: GHUTILS.API.ORDER.deposit,
				data: {
					orderAmount: $("#app_money").val().trim().replace(/\,/g, ''),
					payNo: payNo,
					smsCode: smsCode
				},
				type: "post",
				async: true,
				sw:false,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if(result && result.errorCode == 0){
						_this.checkOrder(result.bankOrderOid);
					}else{
						_this.flag = true
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						mui.toast(_msg || "数据更新中，请耐心等待")
						plus.nativeUI.closeWaiting();
						$("#app_getRechargeFrom").removeClass("app_btn_loading")
					}
				},
				errcallback: function(err){
					_this.flag = true
					$("#app_getRechargeFrom").removeClass("app_btn_loading")
				}
			}); 
		},
		checkOrder:function(orderid){
			var _this = this;
			var _date = {};
			GHUTILS.LOAD({
				url: GHUTILS.API.ORDER.depositisdone,
				data: {
					bankOrderOid: orderid
				},
				type: "post",
				callback: function(d) {
					console.log("订单查询" + JSON.stringify(d));
					_this.flag = true
					if( d && d.errorCode == 0 ){
						_this.times = 0;
						_date.deal = d.completeTime;
						_date.beginInterestDate = d.beginInterestDate;
						_date.interestArrivedDate = d.interestArrivedDate;
						_this.openResultPage(_date,true);
					}else if(d.errorCode == -1){
						if(_this.times < 3){							
							setTimeout(function(){
								_this.checkOrder(orderid);
							},1000)
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
						$("#app_getRechargeFrom").removeClass("app_btn_loading")
					}
				},
				errcallback: function(){
					GHUTILS.nativeUI.showWaiting();
					_this.flag = true
					if(_this.times < 3){
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
					titletxt: "充值成功",
					pageindex: 3,
					productName: "",
					moneynum: $("#app_money").val().trim().replace(/\,/g, ''),
					valueDate: dt.beginInterestDate,
					accountDate: dt.interestArrivedDate,
					pagesid: GHUTILS.PAGESID.DEPOSIT,
					deal: dt.deal,
					proTnDetail: '',
					proT0Detail: '',
					proT0OrderList: '',
					accT0HoldDet: '',
					couponType: '',
					coupon: '',
					state: state
				}
			});
			
			setTimeout(function(){
				$("#app_getRechargeFrom").removeClass("app_btn_loading")
			}, 500)
		}
	}
	mui.plusReady(function(){
		var dp = new DP();
			dp.init();
	});
})(Zepto);
