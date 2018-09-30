/*
 Title:我的定期
 Author:fanyu
 Date:2016-8-22 09:31:00
 Version:v1.0
*/

mui.init();

(function($) {
	var urlParams=GHUTILS.parseUrlParam();
	if (urlParams.as) {
		$("."+urlParams.as).addClass("mui-active");
	}
	
	var PR = function() {
		this.ws = plus.webview.currentWebview();
		this.pageNum = [1, 1, 1];
		return this;
	}
	PR.prototype = {
		init: function() {
			this.pageInit(); //页面初始化
			this.bindEvent(); //事件绑定
			this.pullRefresh();
		},
		pageInit: function() {
			var _this = this;
//			if(_this.ws.tabindex == "1" || _this.ws.tabindex == "2"){
//				plus.nativeUI.closeWaiting();
//			}
			$(".app_productName").html(_this.ws.productName)
//			//tab1
//			$("#app_investMin").html(_this.ws.investMin)
//			$("#app_investAdditional").html(_this.ws.investAdditional)
//			$("#app_netUnitShare").html(_this.ws.netUnitShare)
//			
//			//tab2
//			$(".app_annualInterestSec").html(function(){
//				if(_this.ws.annualInterestSec[0].indexOf("+") > -1){
//					_this.ws.annualInterestSec[0] = _this.ws.annualInterestSec[0].substr(0, _this.ws.annualInterestSec[0].indexOf("+"))
//				}
//				return _this.ws.annualInterestSec[0]
//			})
//			$("#app_incomeCalcBasis").html(_this.ws.incomeCalcBasis)
//			
//			var profit = GHUTILS.Fmul(GHUTILS.Fsub(Math.pow(GHUTILS.Fadd(GHUTILS.Fdiv(_this.ws.annualInterestSec[0], 100), 1), GHUTILS.Fdiv(1, 365)), 1), 10000)
//			$(".app_profit").html(GHUTILS.toFixeds(profit, 2))
//			$("#app_dayProfit").html(GHUTILS.toFixeds(GHUTILS.Fmul(profit, 5), 2))
		},
		getData: function(index, refresh) {
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.TARGET.tradeordermng+"?page="+_this.pageNum[index]+"&rows=10&orderType=invest&productOid="+_this.ws.productOid,
				type: "post",
				async: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if (GHUTILS.checkErrorCode(result)) {
						var list = result.rows, html = "";
						for(var p in list){
							html += _this.getInvestList(list[p]);
						}
						$("#app_box_list").append(html)
						_this.closeWaiting(index);
						refresh.endPullUpToRefresh(_this.pageNum[index]*10 < result.total ? false : true);
						_this.pageNum[index]++;
					}
				},
				errcallback: function(result) {
					_this.closeWaiting(index);
					refresh.endPullUpToRefresh(true);
				}
			});
		},
		closeWaiting: function(index) {
//			if (mui("#slider").slider().getSlideNumber() == index) {
				plus.nativeUI.closeWaiting();
//			}
		},
		getInvestList: function(tradeObj){
			var html = "";
			html = '<ul class="mui-table-view mui-grid-view app_notborder app_list_con"><li class="mui-table-view-cell mui-media mui-col-xs-4 mui-text-left"><div class="mui-h5 app_c3">'
					+tradeObj.phoneNum+'</div></li><li class="mui-table-view-cell mui-media mui-col-xs-4 mui-text-center"><div class="mui-h5 app_c3">'
					+GHUTILS.formatCurrency(tradeObj.orderAmount)+'</div></li><li class="mui-table-view-cell mui-media mui-col-xs-4 mui-text-right"><div class="mui-h5 app_c5">'
					+tradeObj.orderTime.split(" ")[0]+'</div><div class="mui-h5 app_c5">'
					+tradeObj.orderTime.split(" ")[1]+'</div></li></ul>'
			return html
		},
		bindEvent: function() {
			var _this = this;
//			$("#app_serviceFiles").on("tap", function(){
//				if(GHUTILS.getloginStatus(false)){
//					GHUTILS.OPENPAGE({
//						url:"../index/index-linkpage.html",
//						id:GHUTILS.PAGESID.LINKPAGES,
//						extras:{
//							contentId : "app-serviceFiles",
//							title : '风险揭示书',
//							links : _this.ws.serviceFiles
//						}
//					})
//					GHUTILS.nativeUI.showWaiting();
//				}
//			})
			
//			$("#app_investFiles").on("tap", function(){
//				if(GHUTILS.getloginStatus(false)){
//					GHUTILS.OPENPAGE({
//						url:"../index/index-linkpage.html",
//						id:GHUTILS.PAGESID.LINKPAGES,
//						extras:{
//							contentId : "app-investFiles",
//							title : '定向委托投资协议',
//							links : _this.ws.investFiles,
//							incomeCalcBasis: _this.ws.incomeCalcBasis
//						}
//					})
//					GHUTILS.nativeUI.showWaiting();
//				}
//			})
		},
		pullRefresh: function() {
			var _this = this;
			//阻尼系数
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: false,
				indicators: true, //是否显示滚动条
				deceleration: deceleration
			});
			mui.ready(function() {
				//循环初始化所有下拉刷新，上拉加载。
				mui.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
					mui("#app_scroll").pullToRefresh({
						up: {
							auto: true,
							callback: function() {
								var self = this;
								_this.getData(2, self);
							}
						}
					});
				});
			});
		}
	}
	mui.plusReady(function() {
		var pr = new PR();
		pr.init();
	});
	//	$(function() {
	//		var pr = new PR();
	//		pr.init();
	//	});
})(Zepto);