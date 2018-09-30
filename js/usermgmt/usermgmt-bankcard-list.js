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
		return this;
	}
	BANKCARD.prototype = {
		init:function(){
			var _this = this;
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			GHUTILS.getUserInfo(function(){
				_this.getData();//获取数据
			})
		},
		pageInit:function(){
			var _this = this;
			plus.nativeUI.closeWaiting();
			document.addEventListener("loadData", function() {
				_this.getData();
			});
		},		
		getData:function(){
			var _this = this;
			_this.bankCardFind();
		},
		bindEvent:function(){
			var _this = this;
			$(".app_bank_list_add").on('tap', function(){
				if(!GHUTILS.getLocalUserInfo('paypwd')){
					GHUTILS.toast('请先设置支付密码');
					GHUTILS.OPENPAGE({
						url: "../../html/usermgmt/usermgmt-dealpwd.html",
						id: GHUTILS.PAGESID.DEALPWD,
						extras: {
							type: "set",
							bankadd: true
						}
					})
					GHUTILS.nativeUI.showWaiting();
				}else{
					GHUTILS.OPENPAGE({
						url: "../../html/usermgmt/usermgmt-bankcard-add.html",
						id: GHUTILS.PAGESID.BANKCARDADD
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})
		},
		bankCardFind: function(){
			var _this = this, html = "", bankname = GHUTILS.getLocalUserInfo("bankName");
			if(bankname){
				$(".app_bank_list_add").addClass("app_none")
				
				GHUTILS.LOAD({
					url: GHUTILS.API.CMS.bankCardFind+'?codes=["'+bankcodetrans[bankcode[bankname]]+'"]',
					type: "post",
					sw: true,
					callback: function(result){
						console.log(JSON.stringify(result))
						if(GHUTILS.checkErrorCode(result)){
							if(result.datas && result.datas.length > 0){
								result.datas.forEach(function(e, i){
									html += _this.getBankList(e)
								})
								$("#app_banklist").html(html)
								$(".app_bank_list_owned").off().on('tap', function(){
									GHUTILS.OPENPAGE({
										url: "../../html/usermgmt/usermgmt-bankcard-edit.html",
										id: GHUTILS.PAGESID.BANKCARDEDIT
									})
									GHUTILS.nativeUI.showWaiting();
								})
							}else{
								mui.toast("数据更新中，请稍后...")
							}
						}
					}
				})
			}else{
				$("#app_banklist").html("")
				$(".app_bank_list_add").removeClass("app_none")
			}
		},
		getBankList: function(bankObj){
			var _this = this, html = "", bankCardNum = GHUTILS.getLocalUserInfo("bankCardNum");
			if(bankObj.bankName){
				var payOneLimit = ""
				if(bankObj.payOneLimit){
					payOneLimit = "单笔可支付" + GHUTILS.formatIntCurrency(bankObj.payOneLimit) + "元"
				}else if(bankObj.payOneLimit == 0){
					payOneLimit = "单笔支付金额无上限"
				}else{
					payOneLimit = "未配置单笔可支付金额"
				}
				html = '<div class="app_bank_list_owned" style="background-image:'+
						bankObj.bgColor+'"><div class="app_bank_list_icondiv"><div class="app_bank_list_icon"><img src="'+
						(HOST+bankObj.bankLogo)+'" class="app_w100p"></div></div><div class="app_bank_list_detaildiv"><div>'+
						bankObj.bankName+'</div><div class="app_f10">'+
						payOneLimit+'</div><div class="app_mt10">'+
						bankCardNum+'</div></div></div>'
			}else{
				mui.toast("数据更新中，请稍后...")
			}
			return html
		}
	}
	mui.plusReady(function(){
		var bc = new BANKCARD();
			bc.init();
	});
})(Zepto);