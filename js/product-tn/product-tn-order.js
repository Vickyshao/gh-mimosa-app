/*
 Title:定期认购
 Author:sunli haiyang
 Date:2016-6-21 14:58:11
 Version:v1.0
*/
mui.init();
(function($) {

	var PRODUCTTNORDER = function(){
		this.tips = "#app_tips_box";
		this.productLabels = [];
		
		this.couponId = "";//使用卡券id
		this.couponType = "";//卡券种类
		this.couponDeductibleAmount = "";//实际优惠金额
		this.couponAmount = "";//卡券金额
		this.payAmouont = "";//实付金额
		this.couponList = [];//投资人所有的优惠券，加息券
		this.availableCouponList = [];//指定投资金额下可用卡券
		this.notAvailableCouponList = [];//指定投资金额下不可用卡券
		this.checkedCoupon = {};//已选卡券
		this.maxProfitList = [];//最高优惠金额卡券集合
		this.maxProfitOidList = [];//最高优惠金额卡券id数组
		this.flag = true;
		this.ws = plus.webview.currentWebview();
		return this;
	}
	PRODUCTTNORDER.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
		},
		pageInit:function(){
			var _this = this;
			$('#app_productNm').html(_this.ws.productName);
			$("#app_investMoney").val(_this.ws.investVolume || '');
			_this.setAmount(_this.ws.purchasingAmount,_this.ws.increaseAmount);
			_this.initProfit(_this.ws.annualInterestSec,parseFloat(_this.ws.durationPeriod),parseFloat(_this.ws.purchasingAmount));
			_this.getCouponList();
			//安卓更换键盘
			if(mui.os.android){
				$("#app_investMoney").attr("type","tel")
			}
			document.addEventListener("refreshAmountLimit", function(e) {
				_this.refreshAmountLimit();
			});
			document.addEventListener("uncheckCoupon", function(e) {
				document.getElementById('app_couponCkeck').checked = true
				$('#app_couponCkeck').parent('span').removeClass('app_icon_checknone').addClass('app_icon_checked')
				$("#app_discount").html('无')
				$("#app_maxyield").html('&nbsp;')
				_this.couponId = "";//使用卡券id
				_this.couponType = "";//卡券种类
				_this.couponDeductibleAmount = "";//实际优惠金额
				_this.couponAmount = "";//卡券金额
				_this.payAmouont = "";//实付金额
				_this.showDeposit($("#app_availableBalance").html().trim().replace(/\,/g,''), parseFloat($('#app_investMoney').val().replace(/\,/g,'') || 0));
			});
			document.addEventListener("checkCoupon", function(e) {
				_this.availableCouponList.forEach(function(ele,i) {
					if(ele.oid == e.detail.oid){
						_this.checkedCoupon = ele;
						if(_this.maxProfitOidList.indexOf(ele.oid) > -1){
							_this.checkedCoupon.maxProfit = true
						}else{
							_this.checkedCoupon.maxProfit = false
						}
						document.getElementById('app_couponCkeck').checked = false
						$('#app_couponCkeck').parent('span').removeClass('app_icon_checked').addClass('app_icon_checknone')
						var investMoney = parseFloat($('#app_investMoney').val().replace(/\,/g,''))
						switch(ele.type){
							case 'coupon' : 
								$("#app_discount").html('代金券'+ele.amount+'元')
								$("#app_maxyield").html(_this.checkedCoupon.maxProfit ? '收益最高' : '&nbsp;')
								if(ele.amount > investMoney){
									_this.couponDeductibleAmount = investMoney;//实际优惠金额
									_this.payAmouont = 0;//实付金额
								}else{
									_this.couponDeductibleAmount = ele.amount;//实际优惠金额
									_this.payAmouont = GHUTILS.Fsub(investMoney, ele.amount);//实付金额
								}
								break
							case 'rateCoupon' : 
								$("#app_discount").html('加息券'+ele.amount+'%')
								$("#app_maxyield").html(_this.checkedCoupon.maxProfit ? '收益最高' : '&nbsp;')
								_this.couponDeductibleAmount = 0;//实际优惠金额
								_this.payAmouont = investMoney;//实付金额
								break
							default : break
						}
						_this.showDeposit($("#app_availableBalance").html().trim().replace(/\,/g,''), _this.payAmouont);
						_this.couponId = ele.oid;//使用卡券id
						_this.couponType = ele.type;//卡券种类
						_this.couponAmount = ele.amount;//卡券金额
					}
				});
			});
		},
		bindEvent:function(){
			var _this = this;
			$('.app_aggrementSpan input[type="checkbox"]').on("change", function(){
				if($(this).is(':checked')){
					$(this).parent('span').removeClass('app_icon_checknone').addClass('app_icon_checked')
					if(this == document.getElementById('app_couponCkeck')){
						$("#app_discount").html('无')
						$("#app_maxyield").html('&nbsp;')
						_this.couponId = "";//使用卡券id
						_this.couponType = "";//卡券种类
						_this.couponDeductibleAmount = "";//实际优惠金额
						_this.couponAmount = "";//卡券金额
						_this.payAmouont = "";//实付金额
						_this.showDeposit($("#app_availableBalance").html().trim().replace(/\,/g,''), parseFloat($('#app_investMoney').val().replace(/\,/g,'') || 0));
					}
				}else {
					$(this).parent('span').removeClass('app_icon_checked').addClass('app_icon_checknone')
					if(this == document.getElementById('app_couponCkeck')){
						if(!$("#app_investMoney").val()){
							mui.toast('请先输入投资金额!')
							this.checked = true
							$(this).parent('span').removeClass('app_icon_checknone').addClass('app_icon_checked')
						}else if(JSON.stringify(_this.checkedCoupon) == '{}'){
							mui.toast('投资金额范围内没有可用的优惠券!')
							this.checked = true
							$(this).parent('span').removeClass('app_icon_checknone').addClass('app_icon_checked')
						}else{
							var investMoney = parseFloat($('#app_investMoney').val().replace(/\,/g,''))
							switch(_this.checkedCoupon.type){
								case 'coupon' : 
									$("#app_discount").html('代金券'+_this.checkedCoupon.amount+'元')
									$("#app_maxyield").html(_this.checkedCoupon.maxProfit ? '收益最高' : '&nbsp;')
									if(_this.checkedCoupon.amount > investMoney){
										_this.couponDeductibleAmount = investMoney;//实际优惠金额
										_this.payAmouont = 0;//实付金额
									}else{
										_this.couponDeductibleAmount = _this.checkedCoupon.amount;//实际优惠金额
										_this.payAmouont = GHUTILS.Fsub(investMoney, _this.checkedCoupon.amount);//实付金额
									}
									break
								case 'rateCoupon' : 
									$("#app_discount").html('加息券'+_this.checkedCoupon.amount+'%')
									$("#app_maxyield").html(_this.checkedCoupon.maxProfit ? '收益最高' : '&nbsp;')
									_this.couponDeductibleAmount = 0;//实际优惠金额
									_this.payAmouont = investMoney;//实付金额
									break
								default : break
							}
							_this.showDeposit($("#app_availableBalance").html().trim().replace(/\,/g,''), _this.payAmouont);
							_this.couponId = _this.checkedCoupon.oid;//使用卡券id
							_this.couponType = _this.checkedCoupon.type;//卡券种类
							_this.couponAmount = _this.checkedCoupon.amount;//卡券金额
						}
					}
				}
			})
			
			$('#app_investFiles').on('tap',function(){
				GHUTILS.OPENPAGE({
					url:"../index/index-linkpage.html",
					id:GHUTILS.PAGESID.LINKPAGES,
					extras:{
						contentId : "app-investFiles",
						title : '定向委托投资协议',
						links : _this.ws.investFiles,
						incomeCalcBasis: _this.ws.incomeCalcBasis
					}
				})
				GHUTILS.nativeUI.showWaiting();
			});
			
			$("#app_serviceFiles").on('tap',function(){
				GHUTILS.OPENPAGE({
					url:"../index/index-linkpage.html",
					id:GHUTILS.PAGESID.LINKPAGES,
					extras:{
						contentId : "app-serviceFiles",
						title : '风险揭示书',
						links : _this.ws.serviceFiles
					}
				})
				GHUTILS.nativeUI.showWaiting();
			});
			
			$("#app_files").on('tap', function(){
				if(_this.ws.files && _this.ws.files.length > 0){
					GHUTILS.OPENPAGE({
						url:"../index/index-linkpage.html",
						id:GHUTILS.PAGESID.LINKPAGES,
						extras:{
							contentId : "app-files",
							title : '定向委托投资管理交易说明书',
							links : HOST+_this.ws.files[0].furl,
							productName : _this.ws.productName,
							incomeCalcBasis : _this.ws.incomeCalcBasis,
							money : GHUTILS.formatCurrency($("#app_investMoney").val().replace(/\,/g,'')),
							interestsStartDate: _this.ws.interestsStartDate,
							interestsEndDate: _this.ws.interestsEndDate,
							durationPeriod: _this.ws.durationPeriod,
							annualInterest: _this.ws.annualInterest,
						}
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})
			
			//选择优惠券
			$("#app_chooseCoupon").on('tap', function(){
				GHUTILS.OPENPAGE({
					url:"../../html/product-tn/product-tn-coupon.html",
					id:GHUTILS.PAGESID.PROTNCOUPON,
					extras:{
						availableCouponList: _this.availableCouponList,
						notAvailableCouponList: _this.notAvailableCouponList,
						checkedCoupon: $("#app_couponCkeck").is(':checked') ? {} : _this.checkedCoupon
					}
				})
				GHUTILS.nativeUI.showWaiting();
			})

			$("#app_investMoney").on({
				"focus":function(){
					$(document).on('keyup', function (e) {
						if (e.keyCode === 13) {
							$("#app_investMoney").blur();
						}
					}.bind(this))
				},
				"blur":function(){
					var formatMoney = GHUTILS.formatCurrency($("#app_investMoney").val());
					formatMoney = formatMoney == '0.00' ? '' : formatMoney;
					$("#app_investMoney").val(formatMoney);
					if(_this.couponList && _this.couponList.length > 0){
						_this.chooseCoupon(parseFloat(formatMoney.replace(/\,/g,'')))
					}
					$(document).off('keyup')
				},
				"input":function(){
					_this.chooseCoupon(parseFloat($("#app_investMoney").val().replace(/\,/g,'')))
				}
			});
			
			$('#app_confirm').on('tap',function(){
				if($(this).hasClass("app_btn_loading")){
					return
				}
				$(_this.tips).html("&nbsp;")
				if(GHUTILS.checkDealpwd() && _this.isValid()){
					if($('#app_aggrement').is(':checked')){
						if(GHUTILS.isLabelProduct(_this.productLabels, '1', true)){
							GHUTILS.isFreshman(function(){
								//防止低端机未blur输入框导致卡券未选中
								GHUTILS.nativeUI.showWaiting();
								setTimeout(function(){
									_this.switchFind();
								},500)
							})
						}else{
							//防止低端机未blur输入框导致卡券未选中
							GHUTILS.nativeUI.showWaiting();
							setTimeout(function(){
								_this.switchFind();
							},500)
						}
					}else{
						GHUTILS.showError("您必须同意《定向委托投资协议》，《风险揭示书》和《定向委托投资管理交易说明书》才能进行投标",_this.tips);
					}
				}
			});
		},
		switchFind: function(){
			var _this = this;
			$(_this.tips).html("&nbsp;")
//			GHUTILS.LOAD({
//				url: GHUTILS.API.CHA.switchFind+"?code=ApplyPurchase",
//				type: "post",
//				sw: true,
//				callback: function(result){
//					console.log(JSON.stringify(result))
//					if(GHUTILS.checkErrorCode(result,_this.tips)){
//						if(result.status && result.status == "enable"){
							GHUTILS.OPENPAGE({
								url: '../../html/usermgmt/usermgmt-dealpwd.html',
								id: GHUTILS.PAGESID.DEALPWD,
								extras: {
									type: 'deal',
									productOid: _this.ws.productOid,
									moneyVolume: $("#app_investMoney").val().trim().replace(/\,/g,''),
									pageindex: 0,
									title: "转入成功",
									productName: _this.ws.productName,
									pagesid: GHUTILS.PAGESID.PROTNORDER,
									proTnDetail: _this.ws.proTnDetail || '',
									couponId: _this.couponId,
									couponType: _this.couponType,
									couponDeductibleAmount: _this.couponDeductibleAmount,
									couponAmount: _this.couponAmount,
									payAmouont: _this.payAmouont !== "" ? _this.payAmouont : $('#app_investMoney').val().replace(/\,/g,''),
								}
							});
//						}else{
//							GHUTILS.showError("该用户不可申购！", _this.tips)
//						}
//					}
//				}
//			})
		},
		setAmount: function(purchasingAmount,increaseAmount,investMax){
			var _this = this;
			$("#app_tips").html( GHUTILS.formatCurrency(purchasingAmount)+"元起投，"+GHUTILS.formatCurrency(increaseAmount)+"元递增")
			_this.getAvailableBalance(purchasingAmount);
		},
		initProfit: function(annualInterest,investPeriod,purchasingAmount){
			var _this = this;
			var investMoney = parseFloat($('#app_investMoney').val().replace(/\,/g,''));
			if(investMoney >= purchasingAmount){
				_this.setProfit(annualInterest, investMoney, investPeriod);
			}else{
				$('#app_profit').html('0.00');
			};
			$('#app_investMoney').on('input',function(){
				investMoney = $(this).val().replace(/\,/g,'');
				if(investMoney >= purchasingAmount){
					_this.setProfit(annualInterest, investMoney, investPeriod);
				}else{
					$('#app_profit').html('0.00');
				}
			})
		},
		isValid: function(){
			var valid = true;
			var _this = this;
			var investPeriod = parseFloat(_this.ws.durationPeriod);
			var annualInterest = _this.ws.annualInterestSec;
			var investMoney = parseFloat($('#app_investMoney').val().replace(/\,/g,'') || 0);
			var warnText = "输入金额不可大于目前最高可投金额";
			var payAmouont = _this.payAmouont !== "" ? _this.payAmouont : investMoney
			if(_this.ws.investMax){
				var investMaxMoney = _this.ws.maxSaleVolume >= _this.ws.investMax ? _this.ws.investMax : _this.ws.maxSaleVolume
			}else{
				var investMaxMoney = _this.ws.maxSaleVolume
			}
			if(!investMoney){
				GHUTILS.showError("请输入投资金额!",_this.tips);
				valid = false;
			}else if(investMoney > investMaxMoney){
				GHUTILS.showError(warnText+investMaxMoney+'元!',_this.tips);
				$("#app_investMoney").val(GHUTILS.formatCurrency(investMaxMoney));
				_this.chooseCoupon(investMaxMoney);
				_this.setProfit(annualInterest, investMaxMoney, investPeriod);
				valid = false;
			}else if(investMoney < _this.ws.purchasingAmount){
				GHUTILS.showError("金额不可小于最低起投金额!",_this.tips);
				$("#app_investMoney").val(_this.ws.purchasingAmount > 100000000 ? "100,000,000" : GHUTILS.formatCurrency(_this.ws.purchasingAmount));
				_this.chooseCoupon(parseFloat($("#app_investMoney").val().replace(/\,/g,'')));
				_this.setProfit(annualInterest, $("#app_investMoney").val().replace(/\,/g,''), investPeriod);
				valid = false;
			}else if(GHUTILS.Fdiv((GHUTILS.Fmul(GHUTILS.Fsub(investMoney, _this.ws.purchasingAmount), 100)), (GHUTILS.Fmul(_this.ws.increaseAmount, 100))).toString().indexOf('.') > 0){
				GHUTILS.showError('超出'+_this.ws.purchasingAmount+'元部分必须为'+_this.ws.increaseAmount+'元的整数倍!',_this.tips);
				valid = false;
			}else if(GHUTILS.Fsub(payAmouont, $("#app_availableBalance").html().trim().replace(/\,/g,'')) > 0){
				GHUTILS.showError('余额不足!',_this.tips);
				valid = false;
			}
			return valid;
		},
		setProfit: function(annualInterest, investMoney, investPeriod){
			var _this = this;
			if(annualInterest.length == 1){
				if(_this.ws.rewardInterest){
					var annualInterestSec = GHUTILS.Fadd(parseFloat(annualInterest[0].replace('%','')), _this.ws.rewardInterest)
				}else{
					var annualInterestSec = parseFloat(annualInterest[0].replace('%',''))
				}
				var profit = GHUTILS.Fdiv(GHUTILS.Fdiv(GHUTILS.Fmul(GHUTILS.Fmul(investMoney, annualInterestSec), investPeriod), _this.ws.incomeCalcBasis), 100);
				$('#app_profit').html(GHUTILS.formatCurrency(profit));
			}else{
				if(_this.ws.rewardInterest){
					var annualInterestSec0 = GHUTILS.Fadd(parseFloat(annualInterest[0].replace('%','')), _this.ws.rewardInterest)
					var annualInterestSec1 = GHUTILS.Fadd(parseFloat(annualInterest[1].replace('%','')), _this.ws.rewardInterest)
				}else{
					var annualInterestSec0 = parseFloat(annualInterest[0].replace('%',''))
					var annualInterestSec1 = parseFloat(annualInterest[1].replace('%',''))
				}
				var profit0 = GHUTILS.Fdiv(GHUTILS.Fdiv(GHUTILS.Fmul(GHUTILS.Fmul(investMoney, annualInterestSec0), investPeriod), _this.ws.incomeCalcBasis), 100);
				var profit1 = GHUTILS.Fdiv(GHUTILS.Fdiv(GHUTILS.Fmul(GHUTILS.Fmul(investMoney, annualInterestSec1), investPeriod), _this.ws.incomeCalcBasis), 100);
				$('#app_profit').html(GHUTILS.formatCurrency(profit0)+'-'+GHUTILS.formatCurrency(profit1));
			}
		},
		refreshAmountLimit: function(){
			var _this = this;
			GHUTILS.nativeUI.showWaiting();
			$("#app_investMoney").val("");
			$("#app_profit").html("0.00")
			GHUTILS.LOAD({
				url: GHUTILS.buildQueryUrl(GHUTILS.API.TARGET.getproductdetail, {
					oid: _this.ws.productOid
				}),
				type: "post",
				sw: true,
				callback: function(result) {
					if(GHUTILS.checkErrorCode(result,_this.tips)){
						_this.ws.maxSaleVolume = GHUTILS.Fmul(GHUTILS.Fsub(result.maxSaleVolume, result.lockCollectedVolume), result.netUnitShare)
						_this.ws.rewardInterest = result.rewardInterest;
						_this.productLabels = result.productLabels;
						_this.setAmount(_this.ws.purchasingAmount,_this.ws.increaseAmount);
						if(!result.investMin){
							result.investMin = 0
						}
						if(result.state != "RAISING" || result.maxSaleVolume == result.lockCollectedVolume || _this.ws.maxSaleVolume < result.investMin){
							$("#app_confirm").addClass("app_btn_loading").html("已售罄");
						}else if(result.isOpenPurchase == "NO"){
							$("#app_confirm").addClass("app_btn_loading").html("不可购买");
						}
					}
					plus.nativeUI.closeWaiting();
				},
				errcallback: function(err) {
					plus.nativeUI.closeWaiting();
				}
			})
			
			_this.getCouponList();
		},
		getAvailableBalance: function(purchasingAmount){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CHA.usermoneyinfo,
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result,_this.tips)){
						//显示账户余额
						$("#app_availableBalance").html(GHUTILS.formatCurrency(result.applyAvailableBalance) || 0);
						_this.showDeposit(result.applyAvailableBalance, purchasingAmount);
					}
					//关闭等待图标
					plus.nativeUI.closeWaiting();
				},
				errcallback: function(){
					plus.nativeUI.closeWaiting();
				}
			});
		},
		showDeposit: function(accountBalance, investMoney){
			var _this = this;
			if(accountBalance && accountBalance >= investMoney){
				$("#app_goDeposit_div").html("&nbsp;")
			}else{
				$("#app_goDeposit_div").html('<div id="app_goDeposit">余额不足,请充值</div>')
				
				$("#app_goDeposit").off().on('tap', function(){
					if(GHUTILS.checkDepWit()){
						GHUTILS.OPENPAGE({
							url: "../../html/account/account-deposit.html",
							id: GHUTILS.PAGESID.DEPOSIT
						})
					}
				})
			}
		},
		//初始化可用卡券信息
		getCouponList: function(){
			var _this = this;
			_this.couponList = [];
			_this.notAvailableCouponList = [];
			GHUTILS.LOAD({
				url: GHUTILS.API.TARGET.mycouponofpro+'?proOid='+_this.ws.productOid,
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result,_this.tips)){
						if(result.total != 0){
							for(var p in result.rows){
								switch(result.rows[p].type){
									case 'coupon' : case 'rateCoupon' : 
										_this.couponList.push(result.rows[p])
										break
									default : break
								}
							}
							_this.notAvailableCouponList = _this.couponList
							console.log('总卡券：-----'+JSON.stringify(_this.couponList))
							
							if(_this.couponList && _this.couponList.length > 0){
								_this.chooseCoupon(0);
								$("#app_chooseCoupon").removeClass("app_none")
								$("#app_checkCoupon").removeClass("app_none")
							}else{
								_this.ifNoCoupon();
							}
							//首次进入页面选择卡券
							if(_this.flag){
								_this.chooseCoupon($("#app_investMoney").val());
								_this.flag = false
							}
						}else{
							_this.ifNoCoupon();
						}
					}
				}
			});
		},
		ifNoCoupon: function(){
			if(!$("#app_chooseCoupon").hasClass("app_none")){
				$("#app_chooseCoupon").addClass("app_none")
			}
			if(!$("#app_checkCoupon").hasClass("app_none")){
				$("#app_checkCoupon").addClass("app_none")
			}
		},
		//金额输入完成或投资金额重置后，获取适用卡券，选取收益最高卡券
		chooseCoupon: function(investMoney){
			var _this = this;
			_this.notAvailableCouponList = [];
			_this.availableCouponList = [];
			_this.maxProfitList = [];
			_this.checkedCoupon = {};
			_this.maxProfitOidList = [];
			_this.couponId = "";//使用卡券id
			_this.couponType = "";//卡券种类
			_this.couponDeductibleAmount = "";//实际优惠金额
			_this.couponAmount = "";//卡券金额
			_this.payAmouont = investMoney;//实付金额
			if(investMoney){
				for(var p in _this.couponList){
					var minAmt = _this.couponList[p].minAmt, maxAmt = _this.couponList[p].maxAmt;
					if((minAmt && investMoney < minAmt) || (maxAmt && investMoney > maxAmt)){
						_this.notAvailableCouponList.push(_this.couponList[p])
					}else if(_this.couponList[p].type == "coupon" && _this.couponList[p].amount >= investMoney){
						_this.notAvailableCouponList.push(_this.couponList[p])
					}else{
						_this.availableCouponList.push(_this.couponList[p])
					}
				}
				console.log('总卡券：-----'+JSON.stringify(_this.couponList))
				console.log('不可用卡券：-----'+JSON.stringify(_this.notAvailableCouponList))
				console.log('可用卡券：-----'+JSON.stringify(_this.availableCouponList))
				
				//有可用卡券，默认选择收益最高
				if(_this.availableCouponList && _this.availableCouponList.length > 0){
					var discountMoney = 0, rateDays = 0, discountArr = [], discountObjArr = [], discountObj = {};
					
					//获取可用卡券中各卡券实际优惠金额
					for(var p in _this.availableCouponList){
						if(_this.availableCouponList[p].type == 'coupon'){
							if(_this.availableCouponList[p].amount > investMoney){
								discountMoney = investMoney
							}else{
								discountMoney = _this.availableCouponList[p].amount
							}
						}else{
							if(_this.availableCouponList[p].rateDays){
								rateDays = _this.availableCouponList[p].rateDays > _this.ws.durationPeriod ? _this.ws.durationPeriod : _this.availableCouponList[p].rateDays
							}else{
								rateDays = _this.ws.durationPeriod
							}
							discountMoney = GHUTILS.Fdiv(GHUTILS.Fdiv(GHUTILS.Fmul(GHUTILS.Fmul(investMoney, _this.availableCouponList[p].amount), rateDays), _this.ws.incomeCalcBasis), 100)
							if(_this.availableCouponList[p].maxRateAmount){
								discountMoney = discountMoney > _this.availableCouponList[p].maxRateAmount ? _this.availableCouponList[p].maxRateAmount : discountMoney
							}
						}
						discountObj = _this.availableCouponList[p]
						discountObj.money = discountMoney
						discountArr.push(discountMoney)
						discountObjArr.push(discountObj)
					}
					
					//计算最大优惠金额，获取最大优惠金额卡券数组
					var maxDiscount = Math.max.apply(Math, discountArr), couponObj = {};
					for(var p in discountObjArr){
						if(discountObjArr[p].money == maxDiscount){
							couponObj = discountObjArr[p]
							couponObj.maxProfit = true
							_this.maxProfitList.push(couponObj)
						}
					}
					console.log('最高优惠金额卡券-----'+JSON.stringify(_this.maxProfitList))
					
					//优惠金额最大卡券有多张，选择时间最近的卡券，获取优惠金额最大卡券oid数组
					if(_this.maxProfitList.length > 1){
						var msecArr = [];
						for(var p in _this.maxProfitList){
							var dateArr = _this.maxProfitList[p].expiredDate.split(' ')[0].split('-');
							var timeArr = _this.maxProfitList[p].expiredDate.split(' ')[1].split(':');
							msecArr.push(new Date(dateArr[0],(dateArr[1]-1),dateArr[2],timeArr[0],timeArr[1],timeArr[2]).getTime());
							_this.maxProfitList[p].msec = msecArr[p];
							_this.maxProfitOidList.push(_this.maxProfitList[p].oid)
						}
						var minMsec = Math.min.apply(Math, msecArr), minMsecArr = [];
						for(var p in _this.maxProfitList){
							if(_this.maxProfitList[p].msec == minMsec){
								minMsecArr.push(_this.maxProfitList[p])
							}
						}
						_this.checkedCoupon = minMsecArr[0]
					}else{
						_this.checkedCoupon = _this.maxProfitList[0]
						_this.maxProfitOidList.push(_this.checkedCoupon.oid)
					}
					
					//选择使用卡券
					document.getElementById('app_couponCkeck').checked = false
					$('#app_couponCkeck').parent('span').removeClass('app_icon_checked').addClass('app_icon_checknone')
					switch(_this.checkedCoupon.type){
						case 'coupon' : 
							$("#app_discount").html('代金券'+_this.checkedCoupon.amount+'元')
							$("#app_maxyield").html('收益最高')
							if(_this.checkedCoupon.amount > investMoney){
								_this.couponDeductibleAmount = investMoney;//实际优惠金额
								_this.payAmouont = 0;//实付金额
							}else{
								_this.couponDeductibleAmount = _this.checkedCoupon.amount;//实际优惠金额
								_this.payAmouont = GHUTILS.Fsub(investMoney, _this.checkedCoupon.amount);//实付金额
							}
							break
						case 'rateCoupon' : 
							$("#app_discount").html('加息券'+_this.checkedCoupon.amount+'%')
							$("#app_maxyield").html('收益最高')
							_this.couponDeductibleAmount = 0;//实际优惠金额
							_this.payAmouont = investMoney;//实付金额
							break
						default : break
					}
					_this.showDeposit($("#app_availableBalance").html().trim().replace(/\,/g,''), _this.payAmouont);
					_this.couponId = _this.checkedCoupon.oid;//使用卡券id
					_this.couponType = _this.checkedCoupon.type;//卡券种类
					_this.couponAmount = _this.checkedCoupon.amount;//卡券金额
				}else{
					_this.ifNoAvailableCoupon();
					_this.showDeposit($("#app_availableBalance").html().trim().replace(/\,/g,''), investMoney);
				}
			}else{
				_this.ifNoAvailableCoupon();
			}
		},
		ifNoAvailableCoupon: function(){
			var _this = this;
			_this.notAvailableCouponList = _this.couponList;
			document.getElementById('app_couponCkeck').checked = true
			$('#app_couponCkeck').parent('span').removeClass('app_icon_checknone').addClass('app_icon_checked')
			$("#app_discount").html('无')
			$("#app_maxyield").html('&nbsp;')
		}
	}
	mui.plusReady(function(){
		var tnor = new PRODUCTTNORDER();
			tnor.init();
	});
})(Zepto);