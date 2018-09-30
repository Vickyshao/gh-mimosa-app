/*
 Title:我的
 Author:yang sen
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
(function($) {

	var ACCOUNT = function() {
		this.ws = null;
		this.userInfo = null;
		this.historySY = '--';
		this.totalVal = '--';
		this.yincome = '--';
		this.t0 = '--';
		this.tn = '--';
		this.canuse = 0;
		this.invitecode = null;
		this.expTipNum = 0;
		return this;
	}
	GHUTILS.listLinks();
	ACCOUNT.prototype = {
		init: function() {
			this.pageInit(); //页面初始化
			this.getData(); //获取数据
			this.bindEvent(); //事件绑定
		},
		pageInit: function() {
			var _this = this;
			//下拉刷新
			mui.init({
				pullRefresh: {
					indicators: false,
					container: "#app_pullRefresh", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
					down: {
						contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
						contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
						contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
						callback: function() {
							setTimeout(function() {
								mui('#app_pullRefresh').pullRefresh().endPulldownToRefresh();
							}, 300);
							setTimeout(function() {
								GHUTILS.getUserInfo(function() {
									_this.getData(true);
								});
							}, 500);
						} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
					}
				}
			});

			//重新加载数据
			document.addEventListener("loadData", function(e) {
				_this.getData();
			});
		},
		getData: function(ifLogin) {
			var that = this;
			var showMobile = GHUTILS.getLocalUserInfo("userAcc")
			if(showMobile){
				showMobile = showMobile.substr(0,3)+"****"+showMobile.substr(7,4);
				$(".appmy_phone").html(showMobile)
			}
			GHUTILS.LOAD({
				url: GHUTILS.API.CHA.useraccount,
				type: "post",
				async: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if (result.errorCode == 0) {
						
						that.totalVal = GHUTILS.formatCurrency(result.capitalAmount); //总资产
						that.historySY = GHUTILS.formatCurrency(result.totalIncomeAmount); //累计收益
						that.yincome = GHUTILS.formatCurrency(result.t0YesterdayIncome); //昨日收益
						that.tn = GHUTILS.formatCurrency(result.tnCapitalAmount); //定期持有中金额
						that.t0 = GHUTILS.formatCurrency(result.t0CapitalAmount); //活期期持有中金额
						that.canuse = GHUTILS.formatCurrency(result.applyAvailableBalance); //可用余额
			
						that.invitecode = result.uid;
						if(that.totalVal.length > 20){
							$("#app-totalValue").addClass("app_f1_5x")
						} else if(that.totalVal.length >= 14){
							$("#app-totalValue").addClass("app_f2x")
						}
						$("#app-totalValue").html(that.totalVal);
						$("#app-historySY").html(that.historySY);
						$("#yesterday-income").html(that.yincome);
						$("#hold-t0").html(that.t0)
						$("#hold-tn").html(that.tn)
						$("#app-canuse").html(that.canuse)
						that.eyeStatus();//小眼睛的状态
					}else if(ifLogin && result.errorCode == 10002){
						GHUTILS.loginOut(function(){
							var cb = {
								cb:"reload",
								pageid:plus.webview.currentWebview().id
							}
							GHUTILS.openLogin(JSON.stringify(cb));
						});
					}else if(result.errorCode == '40004'){
						if(!plus.webview.getWebviewById(GHUTILS.PAGESID.INDEXSYSTEM)){
							plus.webview.create('../../html/index/index-system.html', GHUTILS.PAGESID.INDEXSYSTEM).show()
						}
					}else if(ifLogin){
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						mui.toast(_msg || "数据更新中，请耐心等待");
					}
				},
				errcallback: function() {
					mui.toast("网络错误，请稍后再试")
				}
			});
			
			GHUTILS.LOAD({
				url: GHUTILS.API.CMS.mailQueryPage+"?page=1&rows=100&isRead=no",
				type: "post",
				async: true,
				callback: function(result) {
					console.log(JSON.stringify(result))
					if (result.errorCode == 0) {
						if(result.total>0){
							if(result.total>99){
								$(".appmy_rightcount").html("···")
							}else{
								$(".appmy_rightcount").html(result.total)
							}
							
							$(".appmy_rightcount").removeClass("app_none")
						} else {
							$(".appmy_rightcount").addClass("app_none")
						}
					}else if(ifLogin && result.errorCode == 10002){
						GHUTILS.loginOut(function(){
							var cb = {
								cb:"reload",
								pageid:plus.webview.currentWebview().id
							}
							GHUTILS.openLogin(JSON.stringify(cb));
						});
					}else if(result.errorCode == '40004'){
						if(!plus.webview.getWebviewById(GHUTILS.PAGESID.INDEXSYSTEM)){
							plus.webview.create('../../html/index/index-system.html', GHUTILS.PAGESID.INDEXSYSTEM).show()
						}
					}else if(ifLogin){
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						mui.toast(_msg || "数据更新中，请耐心等待");
					}
				},
				errcallback: function() {
					mui.toast("网络错误，请稍后再试")
				}
			});
		},

		eyeStatus: function() {
			var _this = this;
			
			if(GHUTILS.getLocalCfg("showstatus")) {
				$('.app-icon-eye').addClass("mui-active");
				$("#app-totalValue").html(_this.totalVal).removeClass("app_f22")
				$("#app-historySY").html(_this.historySY)
				$("#hold-t0").html(_this.t0)
				$("#hold-tn").html(_this.tn)
				$("#yesterday-income").html(_this.yincome)
				$("#app-canuse").html(_this.canuse)
			} else {
				$('.app-icon-eye').removeClass("mui-active");
				$("#app-totalValue").html("****").addClass("app_f22")
				$("#app-historySY").html("****")
				$("#yesterday-income").html("****")
				$("#hold-t0").html("****")
				$("#hold-tn").html("****")
				$("#app-canuse").html("****")
			}
		},
		bindEvent: function() {
			var _this = this;
			//总收益
			$(".app-totalValue-box").off().on("tap", function() {
				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: "account-details.html",
						id: GHUTILS.PAGESID.ACCOUNTDETAIL
					})
					GHUTILS.nativeUI.showWaiting();
				}
			});
			$("#app_mymessage").off().on("tap", function(){
				plus.runtime.setBadgeNumber(0)
				GHUTILS.OPENPAGE({
					url: "account-message.html",
					id: GHUTILS.PAGESID.MESSAGE
				})
				GHUTILS.nativeUI.showWaiting();
			})
			$("#app_feedback").off().on("tap", function(){
				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: "../setting/setting-feedback.html",
						id: GHUTILS.PAGESID.FEEDBACK
					})
				}
			})
			$("#app_setting").off().on("tap", function() {
				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: "../setting/setting.html",
						id: GHUTILS.PAGESID.SETTING
					})
				}
			})
			
			$(".app-icon-eye").off().on("tap", function(){
				if($(this).hasClass("mui-active")){
					$(this).removeClass("mui-active");
					$("#app-totalValue").html("****").addClass("app_f22")
					$("#app-historySY").html("****")
					$("#app-canuse").html("****")
					$("#yesterday-income").html("****")
					$("#hold-t0").html("****")
					$("#hold-tn").html("****")
					$("#app-canuse").html("****")
					GHUTILS.upDataLocalCfig({
						spwd:GHUTILS.getLocalCfg("spwd") || '',
						cfg:GHUTILS.getLocalCfg("spwdcfg") ? true : false,
						skip:GHUTILS.getLocalCfg("skip") ? true : false,
                        touchid:GHUTILS.getLocalCfg("touchid") ? true : false,
						showstatus : false
					})
				} else {
					$(this).addClass("mui-active");
					$("#app-totalValue").html(_this.totalVal).removeClass("app_f22")
					$("#app-historySY").html(_this.historySY)
					$("#app-canuse").html(0.00)
					$("#hold-t0").html(_this.t0)
					$("#hold-tn").html(_this.tn)
					$("#app-canuse").html(_this.canuse)
					$("#yesterday-income").html(_this.yincome)
					GHUTILS.upDataLocalCfig({
						spwd:GHUTILS.getLocalCfg("spwd") || '',
						cfg:GHUTILS.getLocalCfg("spwdcfg") ? true : false,
						skip:GHUTILS.getLocalCfg("skip") ? true : false,
                        touchid:GHUTILS.getLocalCfg("touchid") ? true : false,
						showstatus : true
					})
				}
			})
			//累计收益
			$(".app-historySY-box").off().on("tap", function() {
				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: "account-income.html",
						id: "income"
					})
					GHUTILS.nativeUI.showWaiting();
				}
			});
			
			//邀请好友
			$("#app_invitefriends").off().on("tap", function() {
				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: "account-toinvite.html",
						id: "toinvite",
						extras: {
							invitecode: _this.invitecode
						}
					})
					GHUTILS.nativeUI.showWaiting();
				}
			});
			
			//我的邀请
			$("#app_myinvitation").off().on("tap", function() {		
				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: "account-invitation.html",
						id: GHUTILS.PAGESID.INVITATION,
						extras: {
							invitecode: _this.invitecode
						}
					})
					GHUTILS.nativeUI.showWaiting();
				}
			});

			//我的优惠卷
			$("#app_coupon").off().on("tap", function() {
				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: 'account-coupon.html',
						id: GHUTILS.PAGESID.COUPON
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})

			//我的活期
			$("#app_prot0").off().on("tap", function() {
				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: "account-product-t0-orderlist.html",
						id: GHUTILS.PAGESID.PROT0ORDERLIST,
					});
					GHUTILS.nativeUI.showWaiting();
				}
			})

			//我的定期
			$("#app_protn").off().on("tap", function() {
				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: "account-orderlist.html",
						id: GHUTILS.PAGESID.PROTNORDERLIST,
					});
					GHUTILS.nativeUI.showWaiting();
				}
			})
			
			//充提记录
			$("#app_record").off().on("tap",function() {
				if(GHUTILS.getloginStatus(true)) {
					GHUTILS.OPENPAGE({
						url:"account-deposit-widthdraw-record-parent.html",
						id:GHUTILS.PAGESID.ACCDWRPT
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})
			
			//交易明细
			$("#app_detail").off().on("tap",function() {
				if(GHUTILS.getloginStatus(true)) {
					GHUTILS.OPENPAGE({
						url:"account-deal-parent.html",
						id:GHUTILS.PAGESID.ACCDEALPT
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})
			
			//提现
			$("#app-accountWithdraw").off().on("tap", function() {
				if(GHUTILS.getloginStatus(true) && GHUTILS.checkDepWit()) {
					GHUTILS.OPENPAGE({
						url: "account-withdraw.html",
						id: GHUTILS.PAGESID.WITHDRAW,
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})
			
			//充值
			$("#app-accountDeposit").off().on("tap", function() {
				if(GHUTILS.getloginStatus(true) && GHUTILS.checkDepWit()) {
					GHUTILS.OPENPAGE({
						url: "account-deposit.html",
						id: GHUTILS.PAGESID.DEPOSIT,
					})
					GHUTILS.nativeUI.showWaiting();
				}
			});
			
			//关于我们
			$("#app_about").off().on("tap", function() {
//				if(GHUTILS.getloginStatus(true)){
					GHUTILS.OPENPAGE({
						url: "../setting/setting-about-list.html"
					})
//				}
			})
		}
	}
	mui.plusReady(function() {

		var ac = new ACCOUNT();
		ac.init();
	});
})(Zepto);
