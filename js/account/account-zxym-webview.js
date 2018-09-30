/*
 Title:活期理财
 Author:yang sen
 Date:2015-6-23 14:21:50
 Version:v1.0
*/
(function($) {
	var ZXYM = function(){
		this.index = 0;
		this.ws = null;
		this.value = 0;
		this.tipsbox = document.getElementById("app_list_tips");
		this.tipsTxt = document.getElementById("app_nodata_txt");
		return this;
	}
	ZXYM.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//页面连接
			//this.pullupRefresh();//下拉刷新
		},
		pageInit:function(){
			var _this = this;
			_this.getData(_this.ws.postindex);
		},
		//页面连接
		bindEvent:function(){
			var _this = this;
		},
		getData:function(index){
			var _this = this;
			
			var APIarry = [GHUTILS.API.ORDER.invest, GHUTILS.API.ORDER.deposit, GHUTILS.API.ORDER.withdraw, GHUTILS.API.USER.dealpaypwd, GHUTILS.API.ORDER.invest]
			
			var dataArry =  [{
							  "moneyVolume":_this.ws.value,
							  "returnUrl":_this.ws.returnUrl,
//							  "channelOid":_this.ws.channeloid,
							  cid: cid,
							  ckey: ckey,
							  couponId: _this.ws.couponId,
							  couponType: _this.ws.couponType,
							  couponDeductibleAmount: _this.ws.couponDeductibleAmount,
							  couponAmount: _this.ws.couponAmount,
							  payAmouont: _this.ws.payAmouont
			   			     },{
							   "moneyVolume":_this.ws.value,
							   "returnUrl":_this.ws.returnUrl,
						     },{
							   "moneyVolume":_this.ws.value,
							   "returnUrl":_this.ws.returnUrl,
						     },{
						     	"returnUrl": _this.ws.returnUrl,
							    "dealPayCode": _this.ws.value
						     },{
						     	"moneyVolume":_this.ws.value,
							    "returnUrl":_this.ws.returnUrl,
							    cid: cid,
							    ckey: ckey
						     }];
			
			if(_this.ws.productOid){
				dataArry[0].productOid = _this.ws.productOid
				dataArry[4].productOid = _this.ws.productOid
			}
			console.log("获取回调HTML。");
			console.log('----------couponId:'+dataArry[index].couponId)
			console.log('----------couponType:'+dataArry[index].couponType)
			console.log('----------couponDeductibleAmount:'+dataArry[index].couponDeductibleAmount)
			console.log('----------couponAmount:'+dataArry[index].couponAmount)
			console.log('----------payAmouont:'+dataArry[index].payAmouont)
			GHUTILS.LOAD({					
				url: APIarry[index],
				data: dataArry[index],
				type: "post",
				callback: function(d) {
					console.log("跳转到新浪页面：" + JSON.stringify(d));
					var orderid = '';
					if(GHUTILS.checkErrorCode(d, _this.tipsTxt)){
						switch(index){
							case 0 :
							   orderid = d.tradeOrderOid;
							   break;
							case 1 :
							   orderid = d.bankOrderOid;
							   break;
							case 2 :
							   orderid = d.bankOrderOid;
							   break;
							case 4 :
							   orderid = d.tradeOrderOid;
							   break;
							default :
							   break;
						}
						//3-支付密码修改页面
						if(index == 3){
							location.href = d.redirectUrl;
						}else if(index == 0 && !d.paySkip){
							//定期认购订单实付金额为0，不跳转至新浪页面
							mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.WEBPAGES),"paySkip",{orderid: orderid});
						}else{
							mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.WEBPAGES),"loadData",{orderid: orderid});
							document.write(d.retHtml);
						}
					}else{
						plus.nativeUI.closeWaiting();
						_this.tipsbox.style.display = "block";
						if(d.errorMessage == '您已成功设置过支付密码'){
							GHUTILS.LOAD({
								url: GHUTILS.API.USER.uptpaypwd + '?useracc=' + GHUTILS.getLocalUserInfo('userAcc'),
								type: "post",
								sw: true,
								callback: function(result) {
									if(result.errorCode == 0){
										GHUTILS.getUserInfo(function(){
											GHUTILS.refreshPages();
											//关闭当前页
											mui.back();
										});
									}
									plus.nativeUI.closeWaiting();
								}
							});
						}
					}
				}
			})
			
		}
	}
	mui.plusReady(function(){
		var zxym = new ZXYM();
			zxym.ws = plus.webview.currentWebview();
			zxym.init();
	})
})(mui);