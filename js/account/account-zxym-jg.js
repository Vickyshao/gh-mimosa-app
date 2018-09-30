/*
 Title:理财支付结果
 Author:yang sen
 Date:2015-6-23 14:21:50
 Version:v1.0
*/
(function($) {
	mui.init({
		beforeback: function(e) {
			mui.fire(plus.webview.currentWebview(), "beforeback");			
		}
	});
	var LCJG = function(){
		this.ws = null;
		this.pageIndex = null;
		this.moneyNum = 0;
		this.productName = "";
		this.valueDate = '';
		this.accountDate = '';
		this.couponType = '';
		this.coupon = '';
		this.state = false;
		
		this.pagesid = '';
		this.proTnDetail = '';
		this.proT0Detail = '';
		this.proT0OrderList = '';
		this.accT0HoldDet = '';
		
		this.titleTxt = '';
		this.deal = '';
		this.pageTitle = $("#app_title");
		this.conBoxJg = $(".app_con_box_jg");
		this.conBoxJg1 = $("#app_con_box1");
		this.conBoxJg2 = $("#app_con_box2");
		this.conBoxJg3 = $("#app_con_box3");
		this.conBoxJg4 = $("#app_con_box4");
		this.conBoxJg5 = $("#app_con_box5");
		this.conBoxJg6 = $("#app_con_box6");
		this.conBoxJg7 = $("#app_con_box7");
		this.conBoxJg8 = $("#app_con_box8");
		this.conBoxJg9 = $("#app_con_box9");
		this.conBoxJg10 = $("#app_con_box10");
		this.sendNum = $(".app_send_num");
		this.sendNum1 = $("#app_send_num1");
		this.sendNum2 = $("#app_send_num2");
		this.sendNum3 = $("#app_send_num3");
		this.sendNum4 = $("#app_send_num4");
		this.sendNum5 = $("#app_send_num5");
		this.sendNum8 = $("#app_send_num8");
		this.sendNum9 = $("#app_send_num9");
		this.sendNum10 = $("#app_send_num10");
		this.sendTime = $(".app_send_time");
		this.sendTime11 = $("#app_send_time1_1");
		this.sendTime12 = $("#app_send_time1_2");
		this.sendTime13 = $("#app_send_time1_3");
		this.sendTime21 = $("#app_send_time2_1");
		this.sendTime31 = $("#app_send_time3_1");
		this.sendTime41 = $("#app_send_time4_1");
		this.sendTime51 = $("#app_send_time5_1");
		this.sendTime52 = $("#app_send_time5_2");
		this.sendTime53 = $("#app_send_time5_3");
		this.sendTime82 = $("#app_send_time8_2");
		this.sendTime83 = $("#app_send_time8_3");
		this.sendTime92 = $("#app_send_time9_2");
		this.sendTime93 = $("#app_send_time9_3");
		this.sendTime101 = $("#app_send_time10_1");
		this.sendTime102 = $("#app_send_time10_2");
		this.prodname8 = $("#app_prodname8");
		this.prodname9 = $("#app_prodname9");
		this.btnTouzi = $("#app_btn_tz");
		this.btnPttz = $("#app_pttz");
		this.btnTyjtz = $("#app_tyjtz");
		this.btnTouzihq = $("#app_btn_tzhq");
		this.btnFanHuiTouzi = $("#app_btn_fhtz");
		this.btnAccount = $(".app_btn_account");
		this.btnOk = $(".app_btn_ok");
		this.btnSh = $("#app_btn_sh");
		
		return this;
	}
	LCJG.prototype = {
		init:function(){
//			GHUTILS.setUserAgent();
//			$("#app_con_box7").css({"margin-top": GHUTILS.setTop(60)+"px"})
//			$("#app_con_box8").css({"padding-top": GHUTILS.setTop(44)+"px"})
//			$("#app_con_box9").css({"padding-top": GHUTILS.setTop(44)+"px"})
//			$("#app_con_box10").css({"padding-top": GHUTILS.setTop(44)+"px"})
			this.pageInit();//页面初始化
			this.bindEvent();//点击事件
		},		
		pageInit:function(){
			var _this = this;
//			_this.pageTitle.html(_this.titleTxt);
			//投资回调失败
//			if((_this.pageIndex == 0 || _this.pageIndex == 4) && !_this.state){
//				_this.conBoxJg7.show();
//				return
//			}
			//按钮、金额
//			var conBox = [_this.conBoxJg1,_this.conBoxJg2,_this.conBoxJg3,_this.conBoxJg4,_this.conBoxJg5],
//				sendNums = [_this.sendNum1,_this.sendNum2,_this.sendNum3,_this.sendNum4,_this.sendNum5];
			
			//if(_this.pageIndex == ''){return}
//			conBox[_this.pageIndex].show();
//			sendNums[_this.pageIndex].html(GHUTILS.formatCurrency(_this.moneyNum));
			
//			if(_this.valueDate){
//				_this.sendTime12.html(_this.valueDate);
//				_this.sendTime52.html(_this.valueDate);
//			}
//			if(_this.accountDate){
//				_this.sendTime13.html(_this.accountDate);
//				_this.sendTime53.html(_this.accountDate);
//			}
//			if(_this.pageIndex == 0){
//				_this.sendTime11.html(_this.deal.split(" ")[0]);
//				if(_this.couponType == "tasteCoupon"){
//					_this.btnTyjtz.show();
//				}else{
//					_this.btnPttz.show();
//				}
//			}
//			if(_this.pageIndex == 1){
//				_this.sendTime21.html(_this.deal.split(" ")[0]);			
//			}
//			if(_this.pageIndex == 2){
//				_this.sendTime31.html(_this.deal.split(" ")[0]);
//			}
//			if(_this.pageIndex == 3){
//				_this.sendTime41.html(_this.deal.split(" ")[0]);
//			}
//			if(_this.pageIndex == 4){
//				_this.sendTime51.html(_this.deal.split(" ")[0]);
//			}
			
			_this.pageTitle.html(_this.titleTxt);
			//投资回调失败
			if(!_this.state){
				if(_this.pageIndex == 0 || _this.pageIndex == 1){
					$("#app_dealType").html("投资")
				}else if(_this.pageIndex == 3){
					$("#app_dealType").html("充值")
				}
				_this.conBoxJg7.show();
				
				if(_this.pageIndex == 1 && _this.couponType == "tasteCoupon"){
					if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER)){
						plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER).close("none", 0)
					}
					if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0DETAIL)){
						plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0DETAIL).close("none", 0)
					}
				}
				
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.COUPON)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.COUPON).close("none", 0)
				}
				
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.CMSPAGE)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.CMSPAGE).close("none", 0)
				}
				
				return
			}
			
			//按钮、金额
			var conBox = [_this.conBoxJg8,_this.conBoxJg9,_this.conBoxJg10,_this.conBoxJg2,_this.conBoxJg3],
				sendNums = [_this.sendNum8,_this.sendNum9,_this.sendNum10,_this.sendNum2,_this.sendNum3],
				prodname = [_this.prodname8,_this.prodname9,_this.prodname9];
			conBox[_this.pageIndex].show();
			sendNums[_this.pageIndex].html(GHUTILS.formatCurrency(_this.moneyNum));
			if(_this.pageIndex == 0 || _this.pageIndex == 1){
				prodname[_this.pageIndex].html(_this.productName)
			}
			
			if(_this.valueDate){
				_this.sendTime82.html(_this.valueDate);
				_this.sendTime92.html(_this.valueDate);
			}
			if(_this.accountDate){
				_this.sendTime83.html(_this.accountDate);
				_this.sendTime93.html(_this.accountDate);
			}
			
			if(_this.pageIndex == 1 && _this.couponType == "tasteCoupon"){
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER).close("none", 0)
				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0DETAIL)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0DETAIL).close("none", 0)
				}
			}
			
			if(_this.pageIndex == 2){
				_this.sendTime101.html(_this.deal);
				_this.sendTime102.html(_this.deal.split(" ")[0]);
				
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.T0REDEEM), "refreshCanRedeemMoney");
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCT0HOLDDET), "loadData");
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDERLIST), "loadData");

			}
			if(_this.pageIndex == 4){
				_this.sendTime31.html(_this.deal.split(" ")[0]);
			}
			
			if(plus.webview.getWebviewById(GHUTILS.PAGESID.COUPON)){
				plus.webview.getWebviewById(GHUTILS.PAGESID.COUPON).close("none", 0)
			}
			
			if(plus.webview.getWebviewById(GHUTILS.PAGESID.CMSPAGE)){
				plus.webview.getWebviewById(GHUTILS.PAGESID.CMSPAGE).close("none", 0)
			}
		},		
		//点击事件
		bindEvent:function(){
			var _this = this;
			var homePage = plus.webview.getLaunchWebview();
			//继续投资
			_this.btnTouzi.off().on("tap",function(){
//				plus.webview.currentWebview().opener().close();
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNORDER), "refreshAmountLimit")
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNDETAIL), "refreshTnData")
//				if(plus.webview.getWebviewById(GHUTILS.PAGESID.CALLBACKPAGE)){
//					plus.webview.getWebviewById(GHUTILS.PAGESID.CALLBACKPAGE).close()
//				}
			});
			_this.btnTouzihq.off().on("tap",function(){
//				plus.webview.currentWebview().opener().close();
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER), "refreshAmountLimit")
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0DETAIL), "refreshT0Data")
			});
			
			//返回投资
			_this.btnFanHuiTouzi.off().on("tap", function(){
//				plus.webview.currentWebview().opener().close();
				if(_this.pagesid){
					plus.webview.getWebviewById(_this.pagesid).close("none",0);
				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER).close("none",0);
				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNDETAIL)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNDETAIL).close("none",0);
				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNORDER)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNORDER).close("none",0);
				}
				
//				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.WEBPAGES), "pagesClose");
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCOUNTVW), "loadData");
				mui.fire(homePage, "showtab", {
					tabindex: 0,
//					elm:"app_producttn"
				});
			});
			
			//完成
			_this.btnOk.off().on("tap",function(){
				plus.webview.getWebviewById(GHUTILS.PAGESID.WITHDRAW).close();
//				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.WEBPAGES), "pagesClose");
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCOUNTVW), "loadData");
			});
			
			//返回我的账户
			_this.btnAccount.off().on("tap",function(){
//				plus.webview.currentWebview().opener().close();
				
				if(_this.pagesid){
					plus.webview.getWebviewById(_this.pagesid).close("none",0);
				}
				if(_this.proTnDetail){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNDETAIL).close("none",0);
				}
				if(_this.proT0Detail){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0DETAIL).close("none",0);
				}
				if(_this.proT0OrderList){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDERLIST).close("none",0);
				}
				if(_this.accT0HoldDet){
					plus.webview.getWebviewById(GHUTILS.PAGESID.ACCT0HOLDDET).close("none",0);
				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.T0REDEEM)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.T0REDEEM).close("none",0);
				}
//				if(plus.webview.getWebviewById(GHUTILS.PAGESID.CALLBACKPAGE)){
//					plus.webview.getWebviewById(GHUTILS.PAGESID.CALLBACKPAGE).close()
//				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER).close("none",0)
				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNDETAIL)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNDETAIL).close("none",0);
				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNORDER)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNORDER).close("none",0);
				}
				if(_this.coupon){
					plus.webview.getWebviewById(_this.coupon).close("none",0);
				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.COUPON)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.COUPON).close("none", 0)
				}
				if(plus.webview.getWebviewById(GHUTILS.PAGESID.CMSPAGE)){
					plus.webview.getWebviewById(GHUTILS.PAGESID.CMSPAGE).close("none", 0)
				}
//				if(_this.couponType == "tasteCoupon"){
//					mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PRTTNLIST), "loadData");
//				}
				
//				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.WEBPAGES), "pagesClose");
				mui.fire(homePage, "showtab",{
					tabindex:2
				});
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCOUNTVW), "loadData");
			});
			
			//继续赎回
			_this.btnSh.off().on("tap",function(){
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.T0REDEEM), "refreshCanRedeemMoney");
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCT0HOLDDET), "loadData");
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDERLIST), "loadData");
			});
		},
		pageReset:function(){
			var _this = this;
			_this.pageTitle.html('')
			_this.sendTime.html('');
			_this.sendNum.html('');
			_this.conBoxJg.hide();
		}
	}
	$(function(){
		mui.plusReady(function(){			
			var lcjg = new LCJG();
			ws = plus.webview.currentWebview();
			lcjg.pageIndex = ws.pageindex;			
			lcjg.moneyNum  = ws.moneynum || '';
			lcjg.productName  = ws.productName || '';
			lcjg.titleTxt  = ws.titletxt || '';
			lcjg.deal = ws.deal ||  '';
			lcjg.pagesid = ws.pagesid || '';
			lcjg.proTnDetail = ws.proTnDetail || '';
			lcjg.proT0Detail = ws.proT0Detail || '';
			lcjg.proT0OrderList = ws.proT0OrderList || '';
			lcjg.accT0HoldDet = ws.accT0HoldDet || '';
			lcjg.valueDate = ws.valueDate || '';
			lcjg.accountDate = ws.accountDate || '';
			lcjg.couponType = ws.couponType || '';
			lcjg.coupon = ws.coupon || '';
			lcjg.state = ws.state;
			
			console.log("结果PageId：" + lcjg.pageIndex);	
			lcjg.init();	
			//返回前重置数据
			document.addEventListener("beforeback", function(e) {
				lcjg.pageReset();
			});
		});
	});
})(Zepto);