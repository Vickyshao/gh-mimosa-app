/*
 Title:活期产品详情
 Author:sunli haiyang
 Date:2016-6-21 20:41:37
 Version:v1.0
*/

(function($) {

	var PRODUCTT0DETAIL = function(){
		this.ws = plus.webview.currentWebview();
		this.productName = "";
		this.annualInterestSec = [];
		this.incomeCalcBasis = 0;
		this.investMax = 0;
		this.investMin = 0;
		this.investAdditional = 0;
		this.netUnitShare = 0;
		this.rewardInterest = 0;
		this.investFiles = "";
		this.serviceFiles = "";
		this.lockPeriodDays = 0;
		this.singleDailyMaxRedeem = 0;
		this.time = 0;
		return this;
	}
	PRODUCTT0DETAIL.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			this.time = mui.os.ios ? 0 : 200
			
			_this.initDom();
			
			document.addEventListener("refreshT0Data", function(e) {
				_this.initDom();
			});
		},
		getData:function(){
			var _this = this;
		},
		bindEvent:function(){
			var _this = this;
			
			//初始化页面连接
			GHUTILS.listLinks();
			
			$("#app_investRecord").on("tap", function(){
				GHUTILS.OPENPAGE({
					url: "product-t0-protocol.html",
					id: GHUTILS.PAGESID.PROT0PRODETAIL,
					extras: {
						productOid: _this.ws.productOid,
						productName: _this.productName
					}
				})
				GHUTILS.nativeUI.showWaiting();
			})
			
			$("#app_introduce").on("tap", function(){
				GHUTILS.OPENPAGE({
					url: "product-t0-introduce.html",
					id: GHUTILS.PAGESID.PROT0INTRODUCE,
					extras: {
						productName: _this.productName,
						lockPeriodDays: _this.lockPeriodDays,
						investMin: _this.investMin,
						interest: $("#app_sevDayYrt").html()
					}
				})
				GHUTILS.nativeUI.showWaiting();
			})
			
			$("#app_information").on("tap", function(){
				GHUTILS.OPENPAGE({
					url: "product-t0-information.html",
					id: GHUTILS.PAGESID.PROT0INFO,
					extras: {
						productName: _this.productName,
						investMin: _this.investMin,
						investAdditional: _this.investAdditional,
						singleDailyMaxRedeem: _this.singleDailyMaxRedeem
					}
				})
			})

//			$(".app_iconc3").off().on('tap', function() {
//				GHUTILS.OPENPAGE({
//					url: "../../html/product-t0/product-t0-protocol.html?as=item"+$(this).attr("data-tabindex")+"mobile",
//					id: GHUTILS.PAGESID.PROT0PRODETAIL,
//					extras: {
//						tabindex: $(this).attr("data-tabindex"),
//						productOid: _this.ws.productOid,
//						productName: _this.productName,
//						investMin: _this.investMin,
//						investAdditional: _this.investAdditional,
//						netUnitShare: _this.netUnitShare,
//						annualInterestSec: _this.annualInterestSec,
//						incomeCalcBasis: _this.incomeCalcBasis,
//						investFiles: _this.investFiles,
//						serviceFiles: _this.serviceFiles
//					}
//				})
//				GHUTILS.nativeUI.showWaiting();
//			})
			
			
			_this.bindInput();
		},
		bindInput: function(){
			var _this = this;
			
		},
		initDom: function(){
			var _this = this;
			plus.nativeUI.closeWaiting();
			GHUTILS.LOAD({
				url: GHUTILS.API.TARGET.gett0detail+"?oid="+_this.ws.productOid,
				type: "post",
				sw: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if(GHUTILS.checkErrorCode(result)){
						if(!result.investMin){
							result.investMin = 0
						}
						if(!result.investMax){
							result.investMax = 0
						}
						$('#app_title').html(result.productName);
						$("#app_t0_curDate").html(result.investTime.split(" ")[0]);
						$("#app_t0_valueDate").html(result.interestsFirstDate);
						$('#app_purchasingAmount').html(GHUTILS.formatCurrency(result.investMin));
						$(".purchaseNum").html(result.purchaseNum)
						$(".app_lockPeriodDays").html(result.lockPeriodDays+"天")
						_this.productName = result.productName;
						_this.lockPeriodDays = result.lockPeriodDays;
						_this.singleDailyMaxRedeem = result.singleDailyMaxRedeem;
//						_this.showlabel(result.productLabels);
//						_this.incomeCalcBasis = Number(result.incomeCalcBasis);
//						_this.investMax = GHUTILS.Fmul(result.investMax, result.netUnitShare) || GHUTILS.Fmul(GHUTILS.Fsub(result.maxSaleVolume, result.lockCollectedVolume), result.netUnitShare);
						_this.investMin = result.investMin;
						_this.investAdditional = GHUTILS.Fmul(result.investAdditional, result.netUnitShare);
//						_this.netUnitShare = result.netUnitShare;
//						_this.rewardInterest = result.rewardInterest;
//						_this.investFiles = HOST+result.investFiles[0].furl;
//						_this.serviceFiles = HOST+result.serviceFiles[0].furl;
//						if(_this.investMax > 1000000){
//							_this.investMax = 1000000
//						}
						
						_this.isLogin(function(){
							if(result.state == "RAISEEND"){
								$('#app_invest').html("已售罄").addClass("app_status_off");
//								$('#app_invest').html("募集结束");
							}else if(result.maxSaleVolume == result.lockCollectedVolume || GHUTILS.Fmul(GHUTILS.Fsub(result.maxSaleVolume, result.lockCollectedVolume), result.netUnitShare) < result.investMin){
								$('#app_invest').html("已售罄").addClass("app_status_off");
							}else if(result.isOpenPurchase == "NO"){
								$('#app_invest').html("不可购买").addClass("app_status_off");
							}else{
								$('#app_invest').html("立即抢购");
							}
						}, function(){
							$('#app_invest').html("登录后投资");
						});
						
						//显示七日年化收益和万元收益
						_this.showProfit(result);
						$("#app_invest").off().on("tap",function(){
							if($(this).hasClass("app_loading")){
								return
							}
							$(this).addClass("app_loading")
							_this.isLogin(function(){
								if(!$("#app_invest").hasClass("app_status_off")){
									if(!GHUTILS.checkDealpwd()){
										return
									}
									if(GHUTILS.isLabelProduct(result.productLabels, "1", true)){
										GHUTILS.isFreshman(function(){
											_this.goOrder(result);
										})
									}else{
										_this.goOrder(result);
									}
								}
								setTimeout(function(){
									$("#app_invest").removeClass("app_loading")
								}, 300)
							}, function(){
								mui.toast("请先登录")
								GHUTILS.loginOut(function(){
									var cb = {
										cb:"firePage",
										id:GHUTILS.PAGESID.PROT0DETAIL,
										even:"refreshT0Data"
//										tabindex:1,
//										pageid:plus.webview.currentWebview().id
									}
									GHUTILS.openLogin(JSON.stringify(cb));
									setTimeout(function(){
										$("#app_invest").removeClass("app_loading")
									}, 300)
								});
								setTimeout(function(){
									$("#app_invest").removeClass("app_loading")
								}, 30000)
							})
						});
					}
				}
			});
		},
		goOrder: function(result){
			var _this = this;
			GHUTILS.OPENPAGE({
				url:"../../html/product-t0/product-t0-order.html",
				id:GHUTILS.PAGESID.PROT0ORDER,
				extras:{
					productName: result.productName,
					productOid: result.oid,
					annualInterestSec: result.annualInterestSec.split("-"),
					incomeCalcBasis: Number(result.incomeCalcBasis),
					purchasingAmount: result.investMin,
					increaseAmount: GHUTILS.Fmul(result.investAdditional, result.netUnitShare),
					maxSaleVolume: GHUTILS.Fmul(GHUTILS.Fsub(result.maxSaleVolume, result.lockCollectedVolume), result.netUnitShare),
					investMax: GHUTILS.Fmul(result.investMax, result.netUnitShare),
					investVolume: "",
					proT0Detail: 'PROT0DETAIL',
					investFiles: HOST+result.investFiles[0].furl,
					serviceFiles: HOST+result.serviceFiles[0].furl,
					interestsFirstDays: result.interestsFirstDays,
					lockPeriodDays: result.lockPeriodDays,
					maxHold: result.maxHold,
					rewardInterest: result.rewardInterest,
					couponId: _this.ws.couponId || "",
					couponType: _this.ws.couponType || "",
					couponAmount: _this.ws.couponAmount || ""
				}
			})
			GHUTILS.nativeUI.showWaiting();
		},
		//产品标签显示
//		showlabel: function(labelCodes){
//			var labels = "";
//			for(var i in labelCodes){
//				if(labelCodes[i].labelType == "extend"){
//					labels = '<span class="app_detailtag app_tag_c6">'+ labelCodes[i].labelName +'</span>'
//				}
//			}
//			$("#app_label").append(labels)
//		},
		//七日年化收益和万元收益显示
		showProfit: function(tradeObj){
			var _this = this;
			var showTypeObj = GHUTILS.switchShowType(tradeObj);
			$('#app_sevDayYrt').html(showTypeObj.interestSec);
			$("#app_maxInterest").html(parseFloat(showTypeObj.interestSec.split('-')[showTypeObj.interestSec.split('-').length-1]) + '%')
			
//			var annualInterestSec = tradeObj.annualInterestSec.replace(/\%/g,'').split("-")
//			if(annualInterestSec.length > 1){
//				$('#app_sevDayYrt').html(annualInterestSec[0]+'<span class="app_f24">%-</span>'+annualInterestSec[1])
//			}else{
//				$('#app_sevDayYrt').html(annualInterestSec[0])
//			}
			_this.annualInterestSec = showTypeObj.interestSec.split('-')
			
//			_this.annualInterestSec = showTypeObj.interestSec.split('-')
//			_this.getT0Chart(tradeObj.annualYields, 'app_sevenDaysRIdChart', tradeObj);
//			_this.getT0Chart(tradeObj.perMillionIncomes, 'app_tenThousandRIdChart', tradeObj);
			
			_this.getT0RewardChart(tradeObj.rewardYields, 'app_rewardRIdChart');
		},
		//预期每日收益
//		setProfit: function(annualInterest, investMoney){
//			var _this = this;
//			if(annualInterest.length == 1){
//				if(_this.rewardInterest){
//					var annualInterestSec = GHUTILS.Fadd(parseFloat(annualInterest[0].replace('%','')), _this.rewardInterest)
//				}else{
//					var annualInterestSec = parseFloat(annualInterest[0].replace('%',''))
//				}
//				var profit = GHUTILS.Fmul(GHUTILS.Fsub(Math.pow(GHUTILS.Fadd(1, GHUTILS.Fdiv(annualInterestSec, 100)), GHUTILS.Fdiv(1, _this.incomeCalcBasis)), 1), investMoney);
//				$('#app_profit').html(GHUTILS.formatCurrency(profit));
//			}else{
//				if(_this.rewardInterest){
//					var annualInterestSec0 = GHUTILS.Fadd(parseFloat(annualInterest[0].replace('%','')), _this.rewardInterest)
//					var annualInterestSec1 = GHUTILS.Fadd(parseFloat(annualInterest[1].replace('%','')), _this.rewardInterest)
//				}else{
//					var annualInterestSec0 = parseFloat(annualInterest[0].replace('%',''))
//					var annualInterestSec1 = parseFloat(annualInterest[1].replace('%',''))
//				}
//				var profit0 = GHUTILS.Fmul(GHUTILS.Fsub(Math.pow(GHUTILS.Fadd(1, GHUTILS.Fdiv(annualInterestSec0, 100)), GHUTILS.Fdiv(1, _this.incomeCalcBasis)), 1), investMoney);
//				var profit1 = GHUTILS.Fmul(GHUTILS.Fsub(Math.pow(GHUTILS.Fadd(1, GHUTILS.Fdiv(annualInterestSec1, 100)), GHUTILS.Fdiv(1, _this.incomeCalcBasis)), 1), investMoney);
//				$('#app_profit').html(GHUTILS.formatCurrency(profit0)+'-'+GHUTILS.formatCurrency(profit1));
//			}
//		},
		isLogin: function(ifTrue, failure){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CHA.islogin,
				type: "post",
				callback: function(result){
					if(GHUTILS.checkErrorCode(result)){
						if(result.islogin){
							ifTrue()
						}else{
							failure()
						}
					}
				},
				errcallback: function() {
					mui.toast("网络错误，请稍后再试")
					$("#app_invest").removeClass("app_loading")
				}
			})
		},
		getT0Chart: function(ProfitWeek, rid, tradeObj){
			var _this = this;
			if(ProfitWeek !=null){
				var xData = [];
				var yData = [];
				var compareData = [];
				for (i = 0; i < ProfitWeek.length; i++) {
					xData[i] = ProfitWeek[i].standard.substring(5);
					yData[i] = ProfitWeek[i].profit;
					compareData[i] = parseFloat(yData[i]);
				}
				var maxY = Math.max.apply({},compareData)+0.3;
				var minY = Math.min.apply({},compareData)-0.3;
				setTimeout(function(){
					
					var myChart = echarts.init(document.getElementById(rid));
					myChart.setOption(_this.getOption(xData,yData,minY.toFixed(1),maxY.toFixed(1),GHUTILS.toFixeds(ProfitWeek[ProfitWeek.length-1].profit,2,""),ProfitWeek.length-1,GHUTILS.toFixeds(ProfitWeek[ProfitWeek.length-1].profit,2)));
					
				},_this.time)
				
			} else {
				var annualInterestSec = [], tenThsPerDayProfit = [];
				var ainterestSec = "", tprofit = "";
				var profit = "", standard = "";
				switch (tradeObj.showType) {
					case "1" : case "4" : annualInterestSec = tradeObj.annualInterestSec.replace(/\%/g,'').split('-');
										  tenThsPerDayProfit = tradeObj.tenThsPerDayProfit.split('-');
										  ainterestSec = GHUTILS.Fdiv(GHUTILS.Fadd(annualInterestSec[0], annualInterestSec[1]), 2);
										  tprofit = GHUTILS.Fdiv(GHUTILS.Fadd(tenThsPerDayProfit[0], tenThsPerDayProfit[1]), 2);
										  break
					case "2" : case "5" : ainterestSec = tradeObj.annualInterestSec.replace('%','');
										  tprofit = tradeObj.tenThsPerDayProfit;
										  break
					default : break
				}
				standard = GHUTILS.currentDate().substr(0,10).substring(5);
				
				setTimeout(function(){
					
					var myChart = echarts.init(document.getElementById(rid));
				
					switch (rid) {
						case "app_sevenDaysRIdChart" : 
							profit = ainterestSec;
							myChart.setOption(_this.getOption([standard],[profit],profit-1,profit+1,GHUTILS.toFixeds(profit,2),0,GHUTILS.toFixeds(profit,2)));
							break
						case "app_tenThousandRIdChart" : 
							profit = tprofit;
							myChart.setOption(_this.getOption([standard],[profit],profit-1,profit+1,GHUTILS.toFixeds(profit,2),0,GHUTILS.toFixeds(profit,2)));
							break
						default : break
					}
					
				},_this.time)
				
			}
		},
		//奖励收益柱状图信息展示处理
		getT0RewardChart: function(ProfitWeek, rid){
			var _this = this;
			if(ProfitWeek !=null){
				var xData = [];
				var yData = [];
				var compareData = [];
				for (i = 0; i < ProfitWeek.length; i++) {
					xData[i] = ProfitWeek[i].level;
					yData[i] = ProfitWeek[i].profit;
					compareData[i] = parseFloat(ProfitWeek[i].profit);
				}
				var maxY = Math.max.apply({},compareData)+0.3;
				var minY = Math.min.apply({},compareData)-1;
				setTimeout(function(){
					var myChart = echarts.init(document.getElementById(rid));
					myChart.setOption(_this.getRewardOption(xData,yData,minY.toFixed(1),maxY.toFixed(1)));
					
				},_this.time)
			}
		},
		getOption: function(xdata, ydata, minY, maxY, v, x, y){

			var chartOption =  {
				legend: {
					data: [''],
					textStyle: {
						color: '#CCC'
					}
				},
				color: ['#0d84f2'],
				grid: {
					x: 40,
					x2: 20,
					y: 30,
					y2: 25
				},
				animation: false,
           		addDataAnimation: false,
				calculable: false,
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: xdata,
					splitLine: {
						show: false,
//						lineStyle: {
//							width: 0.1
//						}
					},
//					splitArea: {
//						show: true,
//						areaStyle:{
//							color: ['#FFFCF7','#FFFFFF']
//						}
//					},
					axisLine: {
						lineStyle: {
							color: '#adadad',
							width: 0.1
						}
					},
					axisTick: {
						show: false,
//						lineStyle: {
//							color: '#ffffff'
//						}
					},
					axisLabel : {
			            show : true,
			            textStyle : {
			                color : '#adadad'
			            }
			        }
				}],
				yAxis: [{
					type: 'value',
					min: minY||'3',
					max: maxY||'5.5',
					splitLine: {
						show: true,
						lineStyle: {
							color: '#adadad',
							width: 0.1
						}
					},
					axisLine: {
						show: false,
//						lineStyle: {
//							color: '#adadad',
//							width: 0
//						}
					},
					axisTick: {
						show: false,
//						lineStyle: {
//							color: '#ffffff'
//						}
					},
					axisLabel : {
			            show : true,
			            textStyle : {
			                color : '#adadad'
			            },
			            formatter: function (value, index) {
							var fixedValue = GHUTILS.toFixeds(value,2);
							return fixedValue;
						}
			        }
				}],
				series: [{
					type: 'line',
					data: ydata,
					symbolSize: 0,
					
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(53, 132, 234, 0.67)'
							}, {
								offset: 1,
								color: 'rgba(218, 245, 253, 0.33)'
							}])
						}
					},
					
					markPoint: v||x||y ? {
						symbol: 'image://../../images/bubble.png',
						symbolSize: [20,10],
						itemStyle: {
						    normal: {
						        color: '#FF5A00'
						    },
						    emphasis: {
						        color: '#FF5A00'
						    }
						},
		                data: [
		                    {value: v, xAxis: x, yAxis: y-(-0.06)}
		                ]
		           } : {}
				}]
			};
			return chartOption;
		},
		//奖励收益柱状图信息数值
		getRewardOption: function(xdata, ydata, minY, maxY){

			var rewardChartOption =  {
				legend: {
					data: [''],
					textStyle: {
						color: '#CCC'
					}
				},
				color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
//					color: 'rgba(53, 132, 234, 0.67)'
					color: '#ffe190'
				}, {
					offset: 1,
//					color: 'rgba(218, 245, 253, 0.33)'
					color: '#ffe190'
				}])],
				grid: {
					x: 20,
					x2: 20,
					y: 30,
					y2: 55
				},
				animation: false,
           		addDataAnimation: false,
				calculable: false,
				xAxis: [{
					type: 'category',
					boundaryGap: true,
					data: xdata,
					splitLine: {
						show: false,
//						lineStyle: {
//							width: 0.1
//						}
					},
//					splitArea: {
//						show: true,
//						areaStyle:{
//							color: ['#FFFCF7','#FFFFFF']
//						}
//					},
					axisLine: {
						lineStyle: {
							color: '#adadad',
							width: 0.1
						}
					},
					axisTick: {
						show: false,
//						lineStyle: {
//							color: '#CCC'
//						}
					},
					axisLabel : {
			            show : true,
			            interval : 0,
			            rotate : 50,
			            textStyle : {
			                color : '#adadad',
//			                align : 'right'
			            }
			        }
				}],
				yAxis: [{
					type: 'value',
					min: minY||'0',
					max: maxY||'5.5',
					splitLine: {
						show: false,
						lineStyle: {
							color: '#adadad',
							width: 0.1
						}
					},
					axisLine: {
						show: false,
//						lineStyle: {
//							color: '#adadad',
//							width: 0
//						}
					},
					axisTick: {
						show: false,
//						lineStyle: {
//							color: '#ccc'
//						}
					},
					axisLabel : {
			            show : false,
			            textStyle : {
			                color : '#adadad'
			            },
			            formatter: function (value, index) {
							var fixedValue = GHUTILS.toFixeds(value,2);
							return fixedValue;
						}
			        }
				}],
				series: [{
					type: 'bar',
					itemStyle: {
		                normal: {
		                    label : {
		                    	show: true,
		                    	position: 'top'
		                    }
		                }
		            },
					data: ydata
				}]
			};
			return rewardChartOption;
		}
	}
	mui.plusReady(function(){
		var t0de = new PRODUCTT0DETAIL();
			t0de.init();
	});
})(Zepto);