/*
 Title:在线页面
 Author:yang sen
 Date:2016-5-4 14:53:39
 Version:v1.0
*/
(function($) {
	var ZXYM = function(){
		this.index = 0;
		this.ws = null;
		
		this.returnUrl = GHUTILS.API.ORDER.callback;
		this.title = document.getElementById("app_title");
		this.times = 0;
		this.maxTimes =1;
		return this;
	}
	ZXYM.prototype = {
		init:function(){
			this.pageInit();//页面初始化
		},
		pageInit:function(){
			var _this = this;
			
			//页面名称
			_this.title.innerHTML = (_this.ws.title);
			var exctra = {
					postindex:_this.ws.postindex,
					value:_this.ws.value,
					returnUrl:_this.returnUrl,
				}
			if(_this.ws.productOid){
				exctra.productOid = _this.ws.productOid
			}
			if(_this.ws.channeloid){
				exctra.channeloid = _this.ws.channeloid
			}
			if(_this.ws.postindex == 0){
				exctra.couponId = _this.ws.couponId,
				exctra.couponType = _this.ws.couponType,
				exctra.couponDeductibleAmount = _this.ws.couponDeductibleAmount,
				exctra.couponAmount = _this.ws.couponAmount,
				exctra.payAmouont = _this.ws.payAmouont
			}
			
			//创建子webwebview
			var nw = plus.webview.create("account-zxym-webview.html", GHUTILS.PAGESID.WEBPAGESNY,
				{top:"45px", bottom:"0px"}, exctra);
				
				nw.addEventListener("loaded", function(e){
					console.log( "回调地址Loaded: "+nw.getURL() );
					if(nw.getURL().indexOf("pay.sina.com.cn") != -1 ){
						setTimeout(function(){
							plus.nativeUI.closeWaiting();
						},200);
					}
					if(nw.getURL() == _this.returnUrl){
						//回调
						console.log("到达回调地址。");
					
						plus.nativeUI.showWaiting("正在查询中...");
						//3-支付密码
						if(_this.ws.postindex == 3){
							_this.setPaypwdState()
						}else{
							_this.checkOrder(_this.orderid);
						}
					}
				}, false );
				_this.ws.append(nw);
				console.log("加载在线页面。");
		},
		//更新支付密码状态
		setPaypwdState: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.USER.uptpaypwd + '?useracc=' + GHUTILS.getLocalUserInfo('userAcc'),
				type: "post",
				sw: true,
				callback: function(result) {
					if(result.errorCode == 0){
						GHUTILS.toast(_this.ws.title + '成功');
						GHUTILS.getUserInfo(function(){
							GHUTILS.refreshPages();
							//关闭当前页
							plus.webview.currentWebview().close();
						});
					}					
					plus.nativeUI.closeWaiting();
				}
			});
		},
		checkOrder:function(orderid){
			var _this = this;
			console.log("查询订单中：" + GHUTILS.API.ORDER.depositisdone + orderid);
			var _date = {};
		
			//投资、充值
			var _urlarr = [GHUTILS.API.ORDER.investisdone, GHUTILS.API.ORDER.depositisdone]
			
			var _url = '';
			var _obj = {};
			
			if(_this.ws.postindex == 0 || _this.ws.postindex == 4){
				_url = _urlarr[0];
				_obj = {"tradeOrderOid": orderid}
			}else if(_this.ws.postindex == 1 || _this.ws.postindex == 2){
				_url = _urlarr[1];
				_obj = {"bankOrderOid": orderid}
			}
			
			GHUTILS.LOAD({					
				url: _url,
				data: _obj,
				type: "post",
				callback: function(d) {
					console.log("订单查询" + JSON.stringify(d));
					if( d && d.errorCode == 0 ){
						_this.times = 0;
						_date.deal = d.completeTime;
						_date.beginInterestDate = d.beginInterestDate;
						_date.interestArrivedDate = d.interestArrivedDate;
	//					if(_this.ws.postindex == 0){
	//						_date.begin = data.begin;
	//						_date.arrival = data.arrival;
	//					}
						_this.openResultPage(_date,true);
						plus.nativeUI.closeWaiting();
				
					}else if(d.errorCode == -1){
						if(_this.times < _this.maxTimes){							
							setTimeout(function(){
								_this.checkOrder(orderid);
							},10000)
						}else{
							plus.nativeUI.toast("订单数据已经提交，请稍后刷新账户数据",{verticalAlign:"center"});
							_this.times = 0;
							//关闭相关页面
							_date.deal = GHUTILS.currentDate();//d.dealDate;
							_date.beginInterestDate = d.beginInterestDate;
							_date.interestArrivedDate = d.interestArrivedDate;
							plus.nativeUI.closeWaiting();
							_this.openResultPage(_date,false);
						}	
						_this.times++;
					}
					else{
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast(d.errorMessage,{verticalAlign:"center"});
					}
				}
			})

		},
		openResultPage:function(dt, state){
			var _this = this;
			//打了结果页面
			console.log("打开结果页面。");
			plus.nativeUI.closeWaiting();
			//plus.nativeUI.toast("充值成功！",{verticalAlign:"center"})
			
			GHUTILS.OPENPAGE({
				url: 'account-zxym-jg.html',
				id: GHUTILS.PAGESID.JYJG,
				extras: {
					titletxt: _this.ws.title,
					pageindex: _this.ws.postindex,
					moneynum: _this.ws.value,
					interestsFirstDays: _this.ws.interestsFirstDays !=null ? _this.ws.interestsFirstDays : '',
					deal: dt.deal,
					valueDate: dt.beginInterestDate,
					accountDate: dt.interestArrivedDate,
					pagesid: _this.ws.pagesid,
					proTnDetail: _this.ws.proTnDetail || '',
					proT0Detail: _this.ws.proT0Detail || '',
					proT0OrderList: _this.ws.proT0OrderList || '',
					accT0HoldDet: _this.ws.accT0HoldDet || '',
					couponType: _this.ws.couponType || '',
					coupon: _this.ws.coupon || '',
					state: state
//					valueDate: _this.ws.valueDate || '',
//					accountDate: _this.ws.accountDate || ''
				}
			});
		},
		pagesClose:function(){
			var _this = this;
			mui.fire(plus.webview.getWebviewById(_this.ws.pagesid),"pageReset");
			if(plus.webview.getWebviewById(_this.ws.pagesid)){
				plus.webview.getWebviewById(_this.ws.pagesid).hide();
			}
			plus.webview.close(_this.ws);
		}
	}
	mui.plusReady(function(){
		var zxym = new ZXYM();
			zxym.ws = plus.webview.currentWebview();
			zxym.init();
		plus.nativeUI.showWaiting("正在跳转...");
		document.addEventListener("loadData", function(e) {
			zxym.orderid = e.detail.orderid
		});
		
		document.addEventListener("paySkip", function(e) {
			setTimeout(function(){
				plus.nativeUI.closeWaiting();
				GHUTILS.OPENPAGE({
					url: 'account-zxym-callbackpage.html',
					id: GHUTILS.PAGESID.CALLBACKPAGE
				});
				plus.nativeUI.showWaiting("正在查询中...");
				zxym.checkOrder(e.detail.orderid);
			},200);
		});
		
		document.addEventListener("pagesClose", function(e) {
			zxym.pagesClose();
		});
	})
})(mui);