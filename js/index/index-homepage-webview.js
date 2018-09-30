/*
 Title:首页
 Author:yang sen
 Date:2016-6-4 18:31:00
 Version:v1.0
*/

(function($) {
	var HomepageSub = function() {
		this.ws = plus.webview.currentWebview();
		this.recommendObj = {};
		this.index = 0;
		return this;
	}
	HomepageSub.prototype = {
		
		domInit:function(){
			var _this = this;
			
			//for (var i = 0; i < homepageCfg.length; i++) {
			var cfg = homepageCfg[_this.index];
			_this.demoTmp(cfg,_this.index);

			//}
	
		},
		demoTmp:function(cfg,index){
			var _this = this;
			//console.log(JSON.stringify(cfg));
			if( index < homepageCfg.length){
				$.get(cfg.path + ".html",function(templates){
					var temp = $(templates).filter("#app_"+ cfg.module +"_template").html();
					$("#app_content_box").append(temp);
					require([cfg.path],function(){
						_this.domInit();
					});
				});
				_this.index++;
			}else{
				_this.init();
			}
		},
		init: function() {
			this.pageInit();
			this.getOnlineData();
			this.recommend();   //获取定期、活期数据
//			this.getData(); //刷新首页数据
			this.bindEvent();
			this.pushLink();    //推送消息
 		},
		pageInit: function() {
			var _this = this;
			
			var starPage = localStorage.getItem("startPages");
			if (true || starPage) {
				var bannerImg = document.getElementById("app_banner_slider_img");
				var DefImg = new Image();
				DefImg.src = bannerImg.src;
				DefImg.onload = function() {
					//setTimeout(function() {
						//plus.navigator.closeSplashscreen();
						$(".mui-content").addClass("app_pages_show");
						plus.nativeUI.closeWaiting();
						
						//未登录不检测手势密码，签到，直接检测版本更新
						_this.isLogin();
					//}, 100)
				}
			}else{
				$(".mui-content").addClass("app_pages_show");
				
				//引导页未点击，新app未登录，不检测签到，手势密码，版本更新，由引导页点击事件检测版本更新
//				mui.fire(plus.webview.getLaunchWebview(), "indexLoaded");
			}

			_this.pullRefreshPush();
			GHUTILS.listLinks();
			

			

			document.addEventListener("tapLink", function(e) {
				var elm = document.getElementById(e.detail.elm);
				mui.trigger(elm, "tap");
			});
			
			document.addEventListener("scan", function(e) {
				var elm = null;
				switch(e.detail.elm){
			    	case "hd1":
			    	elm = "app_newcomer_activity_left";
			    	break;
			    	case "hd2":
			    	elm = "app_newcomer_activity_right";
			    	break;
			    	case "hq":
			    	elm = "app_productt0";
			    	break;
			    	case "dq":
			    	elm = "app_producttn";
			    	break;
			    	default:
			    	elm = "false";
			    	break;
			    }
				
				if( elm == "app_producttn" || elm == "app_productt0" ){
						
					mui.fire(plus.webview.getLaunchWebview(), "showtab",{
						tabindex: 1,
						elm:elm
					});
					
				}else if( elm == "false" ){
					
					mui.alert("二维码不正确，请重试。");					
					
				}else{
					
					elm = document.getElementById(elm);
					mui.trigger(elm, "tap");
				}
				
				
			});
 
 			//将角标清0
            plus.push.addEventListener("receive", function(msg) {
                topage = msg.aps;
                if(topage == null){
                    plus.runtime.setBadgeNumber(0);
                }
            }, false);

			//重新加载数据
			document.addEventListener("loadData", function(e) {
				_this.getOnlineData();
				_this.recommend();
//				_this.getData(); //刷新首页数据
			});
			
			//有手势密码，指纹解锁，则先执行，然后将执行推送内容
			document.addEventListener("callpush", function(e) {
				_this.pubshDataHandel(e.detail.pushdata);
				localStorage.setItem('pushdata', "");
			});
			
			//mui('.mui-scroll-wrapper').scroll({indicators: false});
		},
		pullRefreshPush: function() {
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
									_this.getOnlineData(); //获取数据
									_this.recommend(); //刷新首页产品
//									_this.getData(); //刷新首页数据
								
							} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
					}
				}
			});
		},
		getOnlineData: function() {
			var _this = this;
			
//			这个是首页的banner
			var imgH = $("#app_banner_slider").find("img").eq(0).height();
			if(imgH != 0){
				$("#app_banner_sliderbox").height(imgH);
			}
//			这个是index-activities页面的加载
			var actimgH = $("#app_activity_slider").find("img").eq(0).height();
			if(actimgH != 0){
				$("#app_activity_sliderbox").height(actimgH + 30);
			}
			GHUTILS.LOAD({
					url: GHUTILS.API.CMS.gethome+'?channelOid='+cmsChannelOid,
					data: {
						//username: _this.nickName.val()
					},
					type: "post",
					async: true,
					callback: function(result) {
						if(GHUTILS.checkErrorCode(result)){
							var result = result.info
							if(result && result.banner && result.actcarousel){
								setTimeout(function() {
										mui('#app_pullRefresh').pullRefresh().endPulldownToRefresh();
								}, 300);
								setTimeout(function() {
										$.each(result, function(key,data) {
											//console.log(key);
											$[key](data);
										});
								}, 500);
							}
						}
						
					},
					errcallback: function() {
						mui.toast("网络错误，请稍后再试")
					}
				}
			);
		},
		getData: function() {
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CHA.dealDate,
				type: "post",
				callback: function(result) {
					var amount = 0;
					var person = 0;
					if(result.totalLoanAmount>10000){
						amount = GHUTILS.formatCurrency(result.totalLoanAmount/10000)
						$("#totalLoanAmount").html(amount+'<span class="app_f1x">万</span>')
					} else if(result.totalLoanAmount>100000000){
						amount = GHUTILS.formatCurrency(result.totalLoanAmount/100000000)
						$("#totalLoanAmount").html(amount+'<span class="app_f1x">亿</span>')
					} else {
						amount = GHUTILS.formatCurrency(result.totalLoanAmount)
						$("#totalLoanAmount").html(amount)
					}
					$("#totalAmount").html(result.registerAmount)
				},
				errcallback: function() {
					mui.toast("网络错误，请稍后再试")
				}
			});
			
			
		},
		recommend:function(){
			var _this = this;
			//活期产品
			GHUTILS.LOAD({
				url: GHUTILS.API.TARGET.getproductlist,
				params: {
//					channeOid: channelOid,
//					productLabel: "7"
					channelOid: channelOid,
					page: 1,
					rows: 6,
					expArorStart: "",
					expArorEnd: "",
					durationPeriodDaysStart: "",
					durationPeriodDaysEnd: ""
				},
				type: "post",
				//sw: true,
				callback: function(result) {
					console.log("首页列表"+JSON.stringify(result))
					if (GHUTILS.checkErrorCode(result)) {
						_this.recommendObj = []
//						_this.recommendObj.tn = []
//						_this.recommendObj.t0 = []
						for (var i = 0; i < result.rows.length; i++) {
							_this.recommendObj.push(result.rows[i]);
//							if(result.rows[i].type == "PRODUCTTYPE_01"){
//								_this.recommendObj.tn.push(result.rows[i]);
//							}
//							if(result.rows[i].type == "PRODUCTTYPE_02"){
//								_this.recommendObj.t0.push(result.rows[i]);
//							}
						}
						$["productlist"](_this.recommendObj);
						if(result.rows && result.rows.length > 0){
							$("#totalAmount").html(result.rows[0].purchaseNum)
						}
					}
				},
				errcallback: function() {
					mui.toast("网络错误，请稍后再试")
				}
			});
		},
		//2首页 “第三方支付”部分获取协议信息
		getProtocolInfo: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CMS.getProtocolInfo+"?typeId=PRODUCT",
				type: "post",
				sw: true,
				callback: function(result) {
					if(GHUTILS.checkErrorCode(result)){
						GHUTILS.OPENPAGE({
							url:"../../html/index/content_pages.html",
							id:GHUTILS.PAGESID.CONTENT,
							extras:{
								title: "安全保障",
								content: encodeURIComponent(result.content)
							}
						})
					}
				}
			})
		},
		isLogin: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CHA.islogin,
				type: "post",
				callback: function(result){
					if(GHUTILS.checkErrorCode(result)){
						if(!result.islogin){
							mui.fire(plus.webview.getLaunchWebview(), "indexLoaded");
						}
					}
				}
			})
		},
		bindEvent: function() {
			var _this = this;
			
			$("#app_xin").off().on('tap', function() {
				//首页新手指南  友盟监听
				//plus.statistic.eventTrig( "app_xin", "app_xin" );
	            
//				if (GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
					GHUTILS.OPENPAGE({
						url: "index-shortcut/index-guide.html",
						id: "index-shortcut/index-guide.html",
					});
//					GHUTILS.nativeUI.showWaiting();
//				}
			})
			$(".app_safe_link").off().on('tap', function() {
				//3第三方支付首页理财按钮  友盟监听
				//plus.statistic.eventTrig( "app_licai", "app_licai" );
	            
//				if (GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
					GHUTILS.OPENPAGE({
							url: "index-shortcut/index-insurance.html",
							id: GHUTILS.PAGESID.INSURANCE,
						});
//						GHUTILS.nativeUI.showWaiting();
//				}
			})
			
			$("#app-shouyi").off().on('tap', function() {
				// 友盟监听
				//plus.statistic.eventTrig( "app_shouyi", "app_shouyi" );
//				var showId = this.getAttribute("data-showid");
				if (GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
//					if (_this.historySY != "0.00") {
						GHUTILS.OPENPAGE({
							url: "../account/account-details.html?as=historySY",
							id: GHUTILS.PAGESID.ACCOUNTDETAIL
						})
						GHUTILS.nativeUI.showWaiting();
//					}
				}
			})
			
			$("#app-mingxi").off().on('tap', function() {
				// 友盟监听
				//plus.statistic.eventTrig( "app_mingxi", "app_mingxi" );
				if (GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
					GHUTILS.OPENPAGE({
						url: "../account/account-deal-parent.html",
						id: GHUTILS.PAGESID.ACCOUNTDEAIL,
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})
			
			$("#app-zichan").off().on('tap', function() {
				// 友盟监听
				//plus.statistic.eventTrig( "app_zichan", "app_zichan" );
				if (GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
					GHUTILS.OPENPAGE({
						url: "../account/account-details.html",
						id: GHUTILS.PAGESID.ACCOUNTDETAIL,
						extras: {
							"tabid": "totalValue"
						}
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})
			
			$("#app-chongzhi").off().on('tap', function() {
				// 友盟监听
				//plus.statistic.eventTrig( "app_chongzhi", "app_chongzhi" );
				if (GHUTILS.linkChackLogin(this.id, _this.ws.id) && GHUTILS.checkDepWit()) {
					GHUTILS.OPENPAGE({
						url: "../account/account-deposit.html",
						id: GHUTILS.PAGESID.DEPOSIT,
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})
			
			$("#app-sign").off().on('tap', function() {
				// 友盟监听
				//plus.statistic.eventTrig( "app_youhuiquan", "app_youhuiquan" );
				//签到
				if (GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
					GHUTILS.OPENPAGE({
						url: "index-shortcut/index-tools.html",
//						id: GHUTILS.PAGESID.COUPON,
					})
//					GHUTILS.nativeUI.showWaiting();
				}
			});
			
			$("#app-yaoqing").off().on('tap', function() {
				// 友盟监听
				//plus.statistic.eventTrig( "app_yaoqing", "app_yaoqing" );
				if (GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
					GHUTILS.OPENPAGE({
						url: "../account/account-invitation.html",
						id: GHUTILS.PAGESID.INVITATION
					})
					GHUTILS.nativeUI.showWaiting();
				}
			});
			
			$("#app-about").on("tap", function() {
//				if (GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
					GHUTILS.OPENPAGE({
						url: "index-shortcut/index-about.html",
//						id: GHUTILS.PAGESID.ACCOUNTDETAIL
					})
//					GHUTILS.nativeUI.showWaiting();
//				}
			});
			
			//每日签到
			$("#app-signIn").on("tap", function() {
				var _this = this;
				if($(this).hasClass("sign")){
					return;
				}
				$(this).addClass("sign");
				var signActive = false;
				if(!GHUTILS.getloginStatus(true)){
					setTimeout(function(){
						$("#app-signIn").removeClass("sign");
					},300)
					return;
				}
				//获得签到活动
				GHUTILS.LOAD({
					url:GHUTILS.API.CHA.getEventInfo,
					data:{
						eventType:'sign',
						couponType:'coupon'
					},
					type:'post',
					callback:function(result){
						console.log("签到活动="+JSON.stringify(result));
						if(result.errorCode == 0 && result.money != null){
							//提示签到或已签到
							GHUTILS.LOAD({
								url: GHUTILS.API.signIn.checkSign,
								params: {},
								type: "post",
								callback: function(result) {
									if(result.errorCode == 0) {
										var sub = plus.webview.create("/html/index/index-shortcut/index-signin.html", "SIGNIN_DIALOG", {
											background: "transparent",
											top: '0',
											bottom: '0'
										});
										sub.show();
										setTimeout(function(){
											$("#app-signIn").removeClass("sign");
										},300)
									} else if(result.errorCode == -1) {
										var sub = plus.webview.create("/html/index/index-shortcut/index-signin-yes.html", "SIGNIN_DIALOG_YES", {
											background: "transparent",
											top: '0',
											bottom: '0'
										});
										sub.show();
										setTimeout(function(){
											$("#app-signIn").removeClass("sign");
										},300)
//									} else if(result.errorMessage == "用户未登录" && result.errorCode == -1) {
//										mui.toast("用户未登录");
//										GHUTILS.OPENPAGE({
//											url: "/html/usermgmt/usermgmt-login.html",
//										})
//										GHUTILS.nativeUI.showWaiting();
//										setTimeout(function(){
//											$("#app-signIn").removeClass("sign");
//										},300)
									} else {
										$("#app-signIn").removeClass("sign");
									}
								},
								errcallback: function(){
									$("#app-signIn").removeClass("sign");
								}
							});
						}else{
							var sub = plus.webview.create("/html/index/index-shortcut/index-signin-end.html", "SIGNIN_DIALOG_END", {
								background: "transparent",
								top: '0',
								bottom: '0'
							});	
							sub.show();
							setTimeout(function(){
								$("#app-signIn").removeClass("sign");
							}, 300)
						}
					},
					errcallback:function(){
						$("#app-signIn").removeClass("sign");
					}
				})
			});
			
			$("#app-accountDeal").off().on('tap', function() {
				// 友盟监听
	            //plus.statistic.eventTrig( "app_baodan", "app_baodan" );
				if (GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
					GHUTILS.OPENPAGE({
						url: "../account/account-deal-parent.html",
						id: "accountDealParent",
					})
					GHUTILS.nativeUI.showWaiting();
				}
			})
		},		
		pushLink:function(){
			var _this = this;
		    // 监听点击消息事件
		    var topage = "";
		    var os = plus.os.name;
	    	if("Android" == os){
	    		plus.push.addEventListener("receive", function(msg) {
			        topage = msg.payload;
			        _this.pushDataLink(topage);
			    }, false);
	    	}else{
	    		plus.push.addEventListener("click", function(msg) {
		            topage = msg.payload.data;
		            _this.pushDataLink(topage);
				}, false);
	    	}
		},
		pushDataLink:function(topage){
			var _this = this;
			if((GHUTILS.getLocalCfg("spwdcfg") || GHUTILS.getLocalCfg("touchid")) && GHUTILS.getLocalCfg("ustatus")) {

	        	var _lockerPage = plus.webview.getWebviewById(GHUTILS.PAGESID.LOCKER);
				
				if(_lockerPage){
					setTimeout(function(){
						if(_lockerPage.isVisible()){
							localStorage.setItem('pushdata', topage);
						}else{											
							_this.pubshDataHandel(topage);
						}
					},200);
				
				}else{
					localStorage.setItem('pushdata', topage);
				}
	        	
            }else{
           		_this.pubshDataHandel(topage);
            }
	    },
	    pubshDataHandel:function(topage){
			if (topage == 'HQ') {
				var elm =  "app_productt0";
				var wg = plus.webview.getLaunchWebview();
					mui.fire(wg, "showtab", {
					tabindex: 1,
					elm:elm
				});
			} else if (topage == 'DQ') {
				var elm =  "app_producttn";
				var wg = plus.webview.getLaunchWebview();
					mui.fire(wg, "showtab", {
					tabindex: 1,
					elm:elm
				});
			} else if (topage == 'information') {
				GHUTILS.OPENPAGE({
					url: "index-information.html",
					id: GHUTILS.PAGESID.INFORMATION
				})
			} else if (topage == 'notice') {
				GHUTILS.OPENPAGE({
				    url: "../../html/account/account-message.html",
					id: GHUTILS.PAGESID.MESSAGE
				})
//				GHUTILS.nativeUI.showWaiting();
			} else if (topage == 'mail') {
				GHUTILS.OPENPAGE({
				    url: "../../html/account/account-message.html",
					id: GHUTILS.PAGESID.MESSAGE,
					extras: {
						topage: 'mail'
					}
				})
//				GHUTILS.nativeUI.showWaiting();
			} else {
				//活动跳转
				GHUTILS.OPENPAGE({
					url:"../index/index-linkpage.html",
					id:GHUTILS.PAGESID.LINKPAGES,
					extras:{
						links:topage,
						title:""
					}
				})
			}
			plus.push.clear();
		},
	}
	mui.plusReady(function() {
		var hpvw = new HomepageSub();
		hpvw.domInit();
		
	});
})(Zepto);
