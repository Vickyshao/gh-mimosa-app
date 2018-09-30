/*
 Title:赎回页面
 Author:xu jinjin
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
mui.init();
(function($) {

	var T0REDEEM = function(){
		this.ws = plus.webview.currentWebview();
		this.tips = "#app_tips_box";
		return this;
	}
	T0REDEEM.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
//			_this.ws.maxRredeem ? $("#app_canRedeem").html(GHUTILS.formatCurrency(_this.ws.maxRredeem)+'元') : $("#app_canRedeem").html('无限制')
			
			//刷新可赎回金额
			document.addEventListener("refreshCanRedeemMoney", function(e) {
				_this.refreshCanRedeemMoney();
			});
		},		
		getData:function(){
			var _this = this;
			$('.app_productNm').html(_this.ws.productName)
			$("#app-amount").html(_this.ws.allValue)
			$("#app_redeemMoney").attr("placeholder", "可赎回金额"+GHUTILS.formatCurrency(_this.ws.redeem))
			if(_this.ws.singleDailyMaxRedeem){
				$("#app_singleDailyMaxRedeem").html("不得超过每人每日"+GHUTILS.formatCurrency(_this.ws.singleDailyMaxRedeem)+"的赎回限额")
			}else{
				$("#app_singleDailyMaxRedeem").html("无限制")
			}
			plus.nativeUI.closeWaiting();
		},
		bindEvent:function(){
			var _this = this;
			//赎回金额
			$("#app_redeemMoney").on({
				"focus":function(){
					$(document).on('keyup', function (e) {
						if (e.keyCode === 13) {
							$("#app_redeemMoney").blur();
						}
					}.bind(this))
				},
				"blur":function(){
					var formatMoney = GHUTILS.formatCurrency($("#app_redeemMoney").val());
					formatMoney = formatMoney == '0.00' ? '' : formatMoney;
					$("#app_redeemMoney").val(formatMoney);
					$(document).off('keyup')
				},
				"input":function(){
					var redeemMoney = parseFloat($('#app_redeemMoney').val().trim().replace(/\,/g,''))
					if(redeemMoney > _this.ws.redeem){
						$('#app_redeemMoney').val(_this.ws.redeem);
					}
					
					if(redeemMoney > 0){
						$("#app_redeemBtn").removeAttr("disabled")
					}else{
						$("#app_redeemBtn").attr("disabled","disabled")
					}
				}
			});
			//全部赎回
			$("#app_redeemAll").on('tap',function(){
				var canRedeem = GHUTILS.formatCurrency(_this.ws.redeem);
				$("#app_redeemMoney").val(canRedeem);
				
				if(canRedeem == '0.00'){
					$("#app_redeemBtn").attr("disabled","disabled")
				}else{
					$("#app_redeemBtn").removeAttr("disabled")
				}
			});
			
//			$('.app_aggrementSpan input[type="checkbox"]').on("change", function(){
//				if($(this).is(':checked')){
//					$(this).parent('span').removeClass('app_icon_checknone').addClass('app_icon_checked')
//				}else {
//					$(this).parent('span').removeClass('app_icon_checked').addClass('app_icon_checknone')
//				}
//			})
			
			//最终赎回
			$('#app_redeemBtn').on('tap',function(){
				if($(this).hasClass("app_btn_loading")){
					return
				}
				var redeemMoney = $("#app_redeemMoney").val().trim().replace(/\,/g,'');
				$(_this.tips).html('&nbsp;')
				if(!GHUTILS.validate('app_redeemMoney_div')){
					return
				}else if(_this.checkRedeemMoney()){
//					if(!$('#app_aggrement').is(':checked')){
//						GHUTILS.showError("您必须同意《定向委托投资协议》和《风险揭示书》才能进行转出",_this.tips);
//						return
//					}
					GHUTILS.OPENPAGE({
						url: '../../html/usermgmt/usermgmt-dealpwd.html',
						id: GHUTILS.PAGESID.DEALPWD,
						extras: {
							type: 'redeem',
							productOid: _this.ws.productOid,
							moneyVolume: $("#app_redeemMoney").val().trim().replace(/\,/g,''),
							pageindex: 2,
							title: "转出成功",
							productName: _this.ws.productName,
							proT0OrderList: _this.ws.proT0OrderList || '',
//							accT0HoldDet: _this.ws.accT0HoldDet || '',
						}
					});
					GHUTILS.nativeUI.showWaiting();
				}
			});
			
//			$("#app_serviceFiles").on('tap',function(){
//				GHUTILS.OPENPAGE({
//					url:"../index/index-linkpage.html",
//					id:GHUTILS.PAGESID.LINKPAGES,
//					extras:{
//						contentId : "app-serviceFiles",
//						title : '风险揭示书',
//						links : _this.ws.serviceFiles
//					}
//				})
//				GHUTILS.nativeUI.showWaiting();
//			});
			
//			$("#app_investFiles").on('tap',function(){
//				GHUTILS.OPENPAGE({
//					url:"../index/index-linkpage.html",
//					id:GHUTILS.PAGESID.LINKPAGES,
//					extras:{
//						contentId : "app-investFiles",
//						title : '定向委托投资协议',
//						links : _this.ws.investFiles,
//						incomeCalcBasis: _this.ws.incomeCalcBasis
//					}
//				})
//				GHUTILS.nativeUI.showWaiting();
//			});
		},
		checkRedeemMoney: function(){
			var valid = true;
			var _this = this;
			var redeemMoney = parseFloat($('#app_redeemMoney').val().replace(/\,/g,'') || 0);
			if(_this.ws.maxRredeem){
				var redeemMaxMoney = _this.ws.redeem >= _this.ws.maxRredeem ? _this.ws.maxRredeem : _this.ws.redeem,
					warnText = _this.ws.redeem >= _this.ws.maxRredeem ? "输入金额不可大于赎回限额" : "输入金额不可大于目前可赎回金额";
			}else{
				var redeemMaxMoney = _this.ws.redeem,
					warnText = "输入金额不可大于目前可赎回金额";
			}
			if(!redeemMoney){
				GHUTILS.showError("请输入赎回金额!",_this.tips);
				valid = false;
			}else if(redeemMoney > redeemMaxMoney){
				GHUTILS.showError(warnText+redeemMaxMoney+'元!',_this.tips);
				$("#app_redeemMoney").val(GHUTILS.formatCurrency(redeemMaxMoney));
				if($("#app_redeemMoney").val() == '0.00'){
					$("#app_redeemBtn").attr("disabled","disabled")
				}else{
					$("#app_redeemBtn").removeAttr("disabled")
				}
				valid = false;
			}else if(redeemMoney < _this.ws.minRredeem){
				GHUTILS.showError("金额不可小于最低起赎回金额!",_this.tips);
				$("#app_redeemMoney").val(GHUTILS.formatCurrency(_this.ws.minRredeem));
				if($("#app_redeemMoney").val() == '0.00'){
					$("#app_redeemBtn").attr("disabled","disabled")
				}else{
					$("#app_redeemBtn").removeAttr("disabled")
				}
				valid = false;
			}else if(GHUTILS.Fdiv(GHUTILS.Fsub(redeemMoney, _this.ws.minRredeem), _this.ws.additionalRredeem).toString().indexOf('.') > 0){
				GHUTILS.showError('超出'+_this.ws.minRredeem+'元部分必须为'+_this.ws.additionalRredeem+'元的整数倍!',_this.tips);
				valid = false;
			}else if(_this.ws.singleDailyMaxRedeem && redeemMoney > _this.ws.singleDailyMaxRredeem){
				GHUTILS.showError("赎回金额不可超过单人单日赎回上限!",_this.tips);
				valid = false;
			}else if(_this.ws.netMaxRredeemDay && redeemMoney > _this.ws.dailyNetMaxRredeem){
				GHUTILS.showError("赎回金额不可超过产品单日净赎回上限",_this.tips);
				valid = false;
			}else if(_this.ws.isPreviousCurVolume == "YES" && redeemMoney > _this.ws.previousCurVolume){
				GHUTILS.showError("赎回金额不可超过上一交易日产品当前规模",_this.tips);
				valid = false;
			}
			return valid;
		},
		refreshCanRedeemMoney: function(){
			var _this = this;
			$("#app_redeemMoney").val("");
			$("#app_redeemBtn").attr("disabled","disabled")
			GHUTILS.LOAD({
				url: GHUTILS.API.CHA.prot0detail +"?productOid=" + _this.ws.productOid,
				type: "post",
				sw: true,
				callback: function(result) {
					if (GHUTILS.checkErrorCode(result, _this.tips)) {
						_this.ws.redeem = result.redeemableHoldVolume;
						_this.ws.dailyNetMaxRredeem = result.dailyNetMaxRredeem;
						_this.ws.singleDailyMaxRredeem = GHUTILS.Fsub(result.singleDailyMaxRedeem, result.dayRedeemVolume);
						_this.ws.netMaxRredeemDay = result.netMaxRredeemDay;
						_this.ws.singleDailyMaxRedeem = result.singleDailyMaxRedeem;
						$("#app_redeemMoney").attr("placeholder", "可赎回金额"+GHUTILS.formatCurrency(result.redeemableHoldVolume))
						if(result.singleDayRedeemCount && result.dayRedeemCount >= result.singleDayRedeemCount){
							$("#app_redeemBtn").addClass("app_btn_loading").html("赎回次数已达上限");
						}
					}
				}
			});
			
			GHUTILS.LOAD({
				url: GHUTILS.buildQueryUrl(GHUTILS.API.TARGET.gett0detail, {
					oid: _this.ws.productOid
				}),
				type: "post",
				sw: true,
				callback: function(result) {
					if(GHUTILS.checkErrorCode(result, _this.tips)){
						if(result.isOpenRemeed == "NO"){
							$("#app_redeemBtn").addClass("app_btn_loading").html("不可赎回");
						}
						_this.ws.isPreviousCurVolume = result.isPreviousCurVolume
						_this.ws.previousCurVolume = result.previousCurVolume
						_this.ws.previousCurVolumePercent = result.previousCurVolumePercent
					}
				}
			})
		}
	}
	mui.plusReady(function(){

		var t0redeem = new T0REDEEM();
			t0redeem.init();
	});
})(Zepto);