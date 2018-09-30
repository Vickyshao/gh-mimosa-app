/*
 Title: 终端首页
 Author:yang sen
 Date:2016-6-7 10:08:42
 Version:v1.0
*/
(function($) {
	mui.init();
	var INDEX = function() {
		this.ws = null;
		this.showMenu = false;
		this.loginStatus = false;
		//this.netWorkTime = 0;
		this.starData = true;
		this.refreshTime = 10; //数据刷新时间
		this.netNum = 0;
		this.navNum = 3; //前三个为基本页面
		this.subpages = ['html/index/index-homepage.html', 'html/product-tn/product-tn.html','html/product-t0/product-t0.html', 'html/account/account.html'];
		this.pageid = ['app_homepage', 'app_producttn', 'app_productt0', 'app_account']; //, 'licaidingqi'
		
		this.refreshPage = [];
		this.navPageId = [];
		
		this.subpage_style1 = {
			top: '0',
			bottom: '50px'
		};
		this.activeTab = null;
		this.pagespreload = [];
		this.btnSetting = document.getElementById("app_btn_setting");
		this.btnScan    = document.getElementById("app_btn_scan");
		this.btnAccount = document.getElementById("app_btn_account"); //UPDATA.upDataInit({});
		this.newWorkTimer = null;
		this.lockTimer = null;
		this.lockScrTimer = null;
		this.lockScrTime = new Date();
		this.iosLockTime = 0;
		this.STimes = 5;//秒
		this.flag = true;
		this.homePage = null;
		this.time =0;
		this.indexcfg = index_cfg;
		return this;
	}

	INDEX.prototype = {
		domeInit:function(){
			var _this = this;
			_this.ws = plus.webview.currentWebview();
			
			var headerbox = document.getElementById("app_header_box");
			var navTab = document.getElementById("app_index_bottom_nav");
			
			var tplTitle = '';
			var tplNav = '';
			
			var iconLeft = '';
			var iconRight = '';
			var titleCon = '';
			var titleTab = '';
			var titleTabgrp = '';
			
			var pageindex = 0;
			
			var sub = null;
			
			
			for (var i = 0; i < index_cfg.length; i++) {
				
				var navActive = '';
				var navnone = '';
				var _pageId = '';
				var _pageUrl = '';
				var _pageindex = 0;
				//var _navPageId = '';
				
								
				//判断是否为tab
				if(index_cfg[i].titleGrounp.length > 0){
					
					_pageId = index_cfg[i].titleGrounp[0].pageId;
					_pageUrl = index_cfg[i].titleGrounp[0].pageUrl;
					
					for (var m = 0; m < index_cfg[i].titleGrounp.length; m++) {
						//index_cfg[i].titleGrounp[i]
						var _navActive = '';
						
						var _pid = index_cfg[i].titleGrounp[m].pageId;
						var _purl = index_cfg[i].titleGrounp[m].pageUrl;
						//判断沉浸式状态栏高度
						_this.subpage_style1.top = GHUTILS.setTop(44) +'px';
						
						if(m == 0){
							_navActive = 'app_btn_active';
							_pageindex = pageindex;
						}
						
						titleTab += '<span class="mui-popup-button app_c3b app_bgn app_btn'+ (m+1) +' ' 
								 + _navActive +'" data-id="'+ index_cfg[i].titleGrounp[m].pageId +'" data-index="' + pageindex + '" data-time="0" id="'+ index_cfg[i].titleGrounp[m].pageId +'">'+ index_cfg[i].titleGrounp[m].pageTxt +'</span>';
						
						pageindex++;
						
						//添加数据刷新ID
						_this.refreshPage.push(index_cfg[i].titleGrounp[m].refreshPageId);
						_this.navPageId.push(index_cfg[i].titleGrounp[m].pageId);
						
						//初始化页面
						sub = plus.webview.create(_purl, _pid, _this.subpage_style1);
						sub.hide();
						_this.ws.append(sub);
					}
					
					titleTabgrp = '<div class="mui-popup-buttons app_buttons app_title_box app_none" id="app_title_buttons">' + titleTab + '</div>'
					
				}else{
					_pageId = index_cfg[i].navPageId;
					_pageUrl = index_cfg[i].pageUrl;
					if(_pageId == "app_productlist"){
						//判断沉浸式状态栏高度
						_this.subpage_style1.top = GHUTILS.setTop(44) +'px';
					}else{
						_this.subpage_style1.top = '0'
					}
					
					
					//添加数据刷新ID
					_this.refreshPage.push(index_cfg[i].refreshPageId);
					_this.navPageId.push(index_cfg[i].navPageId);
					
					//初始化页面
					sub = plus.webview.create(_pageUrl, _pageId, _this.subpage_style1);
					sub.hide();
					_this.ws.append(sub);
					_pageindex = pageindex;
					pageindex++;
				}
				
				//初始化显示隐藏
				if(i == 0){
					navActive = 'app-active';
					titleCon = '<h1 id="app_title" class="mui-title app_title_box">'+ index_cfg[i].navTab +'</h1>';
				
					_this.homePage = sub;
				}else{
					navnone = "app_none"
				}

				//title左边图标
				if(index_cfg[i].titleIconLeft.icon){
					iconLeft += '<span class="mui-icon mui-pull-left app_title_icons app_icon ' + navnone
							 + ' '+ index_cfg[i].titleIconLeft.icon +'" id="'+ index_cfg[i].titleIconLeft.id 
							 +'" data-herf="'+ index_cfg[i].titleIconLeft.url +'" data-pageid="'+ index_cfg[i].titleIconLeft.pageid
							 +'" data-checklogin="'+ index_cfg[i].titleIconLeft.checklogin +'"></span>';
				}
				
				//title右边图标
				if(index_cfg[i].titleIconRight.icon){
					iconRight += '<span class="mui-icon mui-pull-right app_title_icons app_icon ' + navnone
							  + ' '+ index_cfg[i].titleIconRight.icon +'" id="'+ index_cfg[i].titleIconRight.id 
							  +'" data-herf="'+ index_cfg[i].titleIconRight.url +'" data-pageid="'+ index_cfg[i].titleIconRight.pageid
							  +'" data-checklogin="'+ index_cfg[i].titleIconRight.checklogin +'"></span>';
				}
				
				//底部链接
				tplNav += '<span class="app-tab-item '+ navActive 
						 +'" data-href="' + _pageUrl + '" data-time="0" data-index="' + _pageindex + '" data-id="' + _pageId + '" id="'+ index_cfg[i].navPageId +'">'
						 +'<span class="mui-icon nav-icon ' + index_cfg[i].navIcon + '"></span>' 
						 +'<span class="mui-tab-label">' + index_cfg[i].navTab + '</span></span>';
				
				
				//初始化页面

				
			}
						
			_this.activeTab = _this.navPageId[0];
			navTab.innerHTML = tplNav;
			headerbox.innerHTML = iconLeft + titleCon + titleTabgrp + iconRight;
			_this.init();
			
			//console.log(document.getElementsByTagName("html")[0].innerHTML);
		},
		init: function() {
//			GHUTILS.setStatusBarWhite();
			GHUTILS.setUserAgent();
			this.funInit();
			this.pageInit(); //初始化页面
			this.bindEvent(); //页面连接
			this.bottomNav(); //底部tab
			this.quitApp(); //两次返回退出APP
			//GHUTILS.getUserInfo();//获取用户信息
			this.lockScrTimeInterval();
		},
		pageInit: function() {
			var _this = this;
			_this.ws = plus.webview.currentWebview();

			GHUTILS.getUserInfo();

			//账户设置检测
//			_this.setupUserInfo();
			_this.isLogin();
			//用户签到检查
//			setTimeout(function(){
//				_this.signIn();
//			},1000);
			document.addEventListener("goUpdata", function(){
				_this.signIn(true);
			})
			
			var adls = "pause";
			//监测状态
			if(GHUTILS.mos() == "AZ") {
				
				adls = "resume";
				
                  document.addEventListener("pause", function() {
                      //_this.enterBackground();
                      var newtime = new Date();
                      _this.lockScrTime = new Date();
                      clearInterval(_this.lockScrTimer);
                  }, false);
				
            }else{
            	document.addEventListener("resume", function(){
            		if(new Date().getTime() - _this.iosLockTime > 180 * 1000){
            			_this.pageLocker();
            		}
            	}, false)
            }
        	document.addEventListener(adls, function() {
                var newtime = new Date();
                _this.iosLockTime = newtime.getTime();
                clearInterval(_this.lockScrTimer);
                
                if( (newtime.getTime() - _this.lockScrTime.getTime()) > 180 * 1000){
                	_this.pageLocker();
                	 
                }
                _this.lockScrTime = newtime;
                _this.lockScrTimeInterval();
                
			}, false);


			//检测网络状态
			document.addEventListener("netchange", function() {
				_this.checkNetWork();
			}, false);

			document.addEventListener("cancldownload", function(e) {
				UPDATA.downLoaderCancl();
			});
			document.addEventListener("showtab", function(e) {
				_this.showtab(e.detail.tabindex);
				
				if(e.detail.elm){
					elm = document.getElementById(e.detail.elm);
					mui.trigger(elm, "tap");
				}
				
				if(e.detail.goUpdata){
					mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PRTT0LIST), "goUpdata")
				}
			});

			document.addEventListener("tapLink", function(e) {
				//_this.btnAccount.click();
				var elm = document.getElementById(e.detail.elm);
				mui.trigger(elm, "tap");
			});

			//用户登录
			document.addEventListener("login", function(e) {
				var cbobj = e.detail.cbobj || '{}'
				_this.openLogin(cbobj);
			});
			//首页加载完毕检测升级
			document.addEventListener("indexLoaded", function(e) {
				UPDATA.upDataInit({});
			});
			
			//打开手势密码
			document.addEventListener("openspwd", function(e) {
				GHUTILS.OPENPAGE({
					url:"html/setting/setting-spwd.html",
					id:GHUTILS.PAGESID.HANDLOCK
				})
				GHUTILS.nativeUI.showWaiting();
			});
 
            //设置系统状态栏颜色 IOS
			//plus.navigator.setStatusBarBackground( "#fff" );
			// 设置系统状态栏样式为浅色文字
			//plus.navigator.setStatusBarStyle( "UIStatusBarStyleBlackOpaque" );
			// 隐藏滚动条
			plus.webview.currentWebview().setStyle({
				scrollIndicator: 'none',
				bounce: 'none'
			});
			//设置下拉背景http://ask.dcloud.net.cn/question/383
		},
		lockScrTimeInterval:function(){
			var _this = this;
			
			_this.lockScrTimer = setInterval(function(){
				var nowtime = new Date();
				_this.lockScrTime = nowtime;
			},_this.STimes * 1000);
		},
		isLogin: function(){
			var _this = this;
			GHUTILS.LOAD({
				url: GHUTILS.API.CHA.islogin,
				type: "post",
				callback: function(result){
					console.log(JSON.stringify(result))
					if(result.errorCode == 0){
						if(result.islogin && (GHUTILS.getLocalCfg("touchid") || GHUTILS.getLocalCfg("spwdcfg"))){
							_this.lockerInit();
						}else{
							if(result.islogin){
								_this.signIn(true);
							}
							var starPage = localStorage.getItem("startPages");
							if(false && !starPage) {
								_this.homePage.show();
								var embed = plus.webview.create('html/index/start_pages.html');
								embed.onloaded = function() {
									plus.navigator.closeSplashscreen();
								};
								_this.ws.append(embed);
							}else{
//								_this.homePage.addEventListener("loaded",function(){
									_this.homePage.show();
									plus.navigator.closeSplashscreen();
//								})
							}
						}
					}else if(result.errorCode == 40004){
						if(!plus.webview.getWebviewById(GHUTILS.PAGESID.INDEXSYSTEM)){
							plus.webview.create('html/index/index-system.html', GHUTILS.PAGESID.INDEXSYSTEM).show()
						}
					}else{
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						mui.toast(_msg || "数据更新中，请耐心等待");
					}
				},
				errcallback: function(){
					var starPage = localStorage.getItem("startPages");
					if(false && !starPage) {
						_this.homePage.show();
						var embed = plus.webview.create('html/index/start_pages.html');
						embed.onloaded = function() {
							plus.navigator.closeSplashscreen();
						};
						_this.ws.append(embed);
					}else{
						_this.homePage.show();
						plus.navigator.closeSplashscreen();
					}
				}
			})
		},
		setupUserInfo: function() {
			var _this = this;
			
			//console.log(localStorage.getItem("userConfigList"))

			if((GHUTILS.getLocalCfg("touchid") || GHUTILS.getLocalCfg("spwdcfg")) && GHUTILS.getLocalCfg("ustatus")) {
				//plus.navigator.closeSplashscreen();

//				UPDATA.upDataInit({});
				_this.lockerInit();
				console.log(1)
			} else {
				//var homePage = plus.webview.getWebviewById("app_homepage");

				//homePage.addEventListener("loaded",function(){
				//启动启动页
				var starPage = localStorage.getItem("startPages");
				if(!starPage) {
					_this.homePage.show();
					var embed = plus.webview.create('html/index/start_pages.html');
					embed.onloaded = function() {
						plus.navigator.closeSplashscreen();
					};
					_this.ws.append(embed);
				}else{
					_this.homePage.addEventListener("loaded",function(){
						//_this.starPageInit();
						_this.homePage.show();
//						GHUTILS.nativeUI.showWaiting();
						plus.navigator.closeSplashscreen();
					})
				}
				
//				_this.homePage.addEventListener("loaded",function(){
//						//_this.starPageInit();
//						_this.homePage.show();
////						GHUTILS.nativeUI.showWaiting();
//						plus.navigator.closeSplashscreen();
//					})
				
				//})	
			}
		},
		enterBackground: function() {
            var _this = this;
            _this.time = 300000;
            var oldtime = new Date();
            localStorage.setItem("oldtime", oldtime.getTime());
            _this.lockTimer =
                setTimeout(function() {
                _this.pageLocker();
            }, _this.time);
        },
		lockerInit: function() {
			var _this = this;

			_this.userInfo = GHUTILS.getLocalUserInfo();
			var spwdcfg = GHUTILS.getLocalCfg("spwdcfg");
			var touchid = GHUTILS.getLocalCfg("touchid");
			if(!_this.lockerPage) {
				_this.lockerPage = mui.preload({
					url: 'html/setting/setting-locker.html',
					id: GHUTILS.PAGESID.LOCKER,
					styles: {
						top: '0',
						bottom: '0'
					},
					extras: {
						spwdcfg: spwdcfg,
						touchid: touchid,
						goUpdata: true
					}
				});
				//_this.ws.append(_this.lockerPage);
			}
			_this.lockerPage.show();
			_this.lockerPage.addEventListener("loaded", function() {
				_this.homePage.show();
				plus.navigator.closeSplashscreen();
			});
		},
		pageLocker: function() {
			var _this = this;
			var spwdcfg = GHUTILS.getLocalCfg("spwdcfg");
			var touchid = GHUTILS.getLocalCfg("touchid");
			
			var _lockerPage = plus.webview.getWebviewById(GHUTILS.PAGESID.LOCKER);
			
			if(_lockerPage &&　_lockerPage.isVisible()){
				return
			}
			
			
			if((GHUTILS.getLocalCfg("spwdcfg") || GHUTILS.getLocalCfg("touchid")) && GHUTILS.getLocalCfg("ustatus")) {
				if(!_this.lockerPage) {
					_this.lockerPage = mui.preload({
						url: 'html/setting/setting-locker.html',
						id: GHUTILS.PAGESID.LOCKER,
						styles: {
							top: '0',
							bottom: '0'
						},
						extras: {
							spwdcfg: spwdcfg,
							touchid: touchid,
							goUpdata: false
						}
					});
                } else {
                    mui.fire(_this.lockerPage, "loadData", {
                        spwdcfg: spwdcfg,
                        touchid: touchid,
                        goUpdata: false
	                });
	            }
				_this.lockerPage.show();
            }
		},
		//页面连接
		bindEvent: function() {
			var _this = this;

//			//安全中心
//			_this.btnAccount.addEventListener("tap", function() {
//
//				if(GHUTILS.linkChackLogin(this.id, _this.ws.id)) {
//					GHUTILS.OPENPAGE({
//						url: "html/usermgmt/usermgmt-centre.html",
//						id: GHUTILS.PAGESID.USERCNETER
//					})
//					GHUTILS.nativeUI.showWaiting();
//				}
//
//			});
//
//			//设置中心
//			_this.btnSetting.addEventListener("tap", function() {
//				GHUTILS.OPENPAGE({
//					url: "html/setting/setting.html",
//					id: GHUTILS.PAGESID.SETTING
//				})
//			});
//			
//			
//			//打开扫码
//			document.getElementById("app_btn_scan").addEventListener("tap", function() {
//				GHUTILS.OPENPAGE({
//					url: "html/index/index-scan.html",
//					id: GHUTILS.PAGESID.SCAN
//				})
//			});
			
			
			mui('#app_header_box').off().on('tap', '.app_title_icons', function(e) {
				var that = this;
				var checklogin = this.getAttribute('data-checklogin');
				var pagehref = this.getAttribute('data-herf');
				var pageid = this.getAttribute('data-pageid');
				
				
				GHUTILS.getUserInfo(function(){
					if( checklogin == "false" || 
						(checklogin == "true" && 
						GHUTILS.linkChackLogin(that.id, _this.ws.id))) {
						
						GHUTILS.OPENPAGE({
							url: pagehref,
							id: pageid
						})
						
					}
				})

				
			});
			
			//活期定期切换
			mui('.app_buttons').off().on('tap', 'span', function(e) {
				var sblings=this.parentNode.children;
				var targetId = this.getAttribute('data-id');
				var dataIndex = this.getAttribute('data-index');
				
				var tabBtn = document.getElementById("app_productlist");
				
				if(targetId == _this.activeTab) {
					return;
				}
				if(!this.classList.contains('app_btn_active')){
					//_this.flag = true;
					this.classList.add('app_btn_active');
					for (var i=0;i<sblings.length;i++){
						if(sblings[i]!=this){
							sblings[i].classList.remove('app_btn_active')
						}
					}
				}else{
					//_this.flag = false;
				}
				//if(_this.flag){
					tabBtn.setAttribute("data-id", targetId);
					tabBtn.setAttribute("data-index", dataIndex);
					
					//显示目标选项卡
					plus.webview.show(targetId);
					_this.refreshDate([Number(dataIndex)]);
	
					//隐藏当前;
					plus.webview.hide(_this.activeTab);
					//更改当前活跃的选项卡
					_this.activeTab = targetId;
				//}
				
			});
			
			
		},
		//底部TAB切换
		bottomNav: function() {
			var _this = this;
			var nowTime = new Date();
			nowTime = nowTime.getTime();
			//初始化首页加载时间
			document.getElementById("app_homepage").setAttribute("data-time", nowTime);

			//选项卡点击事件
			mui('.app-bar-tab').off().on('tap', 'span', function(e) {
				var that = this;
				var targetId = this.getAttribute('data-id');
				var sblings = this.parentNode.children;
				var span = this.getElementsByTagName("span")[1];

				var dataIndex = this.getAttribute('data-index');

				
				if(targetId == _this.activeTab) {
					return;
				}
				
				
				var _thisObj = getIndexCfgInfo(that.id);
				var _titleIcons = $.domclass("app_title_icons");
				var _titleBox = $.domclass("app_title_box");
				
				//console.log(JSON.stringify(_thisObj))
				
				if( _thisObj.checklogin == "false" || 
					(_thisObj.checklogin == "true" && 
					GHUTILS.linkChackLogin(that.id, _this.ws.id))) {
					
					//改变状态
					if(!this.classList.contains('app-active')) {
						this.classList.add('app-active');
						for(var i = 0; i < sblings.length; i++) {
							if(sblings[i] != this) {
								sblings[i].classList.remove('app-active')
							}
						}
					}

					var _leftIcon = _thisObj.titleIconLeft.id;
					var _rightIcon = _thisObj.titleIconRight.id;
					
					//切换显示icon
					for(var i = 0; i < _titleIcons.length; i++) {
						$.none(_titleIcons[i]);
					}
					
					if(_leftIcon){
						$.show($.domid(_leftIcon));
					}
					if(_rightIcon){
						$.show($.domid(_rightIcon));
					}
					
					//更换title
					for(var i = 0; i < _titleBox.length; i++) {
						$.none(_titleBox[i]);
					}
					
					if(_thisObj.titleGrounp.length == 0){
						$.inlineblock($.domid(_thisObj.titleId));
						$.domid(_thisObj.titleId).innerHTML = span.innerHTML;
					}else{
						$.flex($.domid(_thisObj.titleId));
					}
					//显示目标选项卡
					plus.webview.show(targetId);
					_this.refreshDate([Number(dataIndex)]);

					//隐藏当前;
					plus.webview.hide(_this.activeTab);
					//更改当前活跃的选项卡
					_this.activeTab = targetId;	
					
				}

			});
		},
		openLogin: function(cbobj) {
			GHUTILS.OPENPAGE({
				url: "html/usermgmt/usermgmt-login.html",
				id: GHUTILS.PAGESID.LOGIN,
				extras: {
					cbobj: cbobj
				}
			})
			GHUTILS.nativeUI.showWaiting();
		},
		quitApp: function() {
			var _this = this;

			//首页返回键处理
			//处理逻辑：1秒内，连续两次按返回键，则退出应用；
			var first = null;
			mui.back = function() {
				if(_this.showMenu) {
					closeMenu();
				} else {
					//首次按键，提示‘再按一次退出应用’
					if(!first) {
						first = new Date().getTime();
						plus.nativeUI.toast('再按一次退出应用', {
							verticalAlign: "center"
						});
						setTimeout(function() {
							first = null;
						}, 1000);
					} else {
						if(new Date().getTime() - first < 1000) {
							plus.runtime.quit();
						}
					}
				}
			};
		},
		checkNetWork: function() {
			var _this = this;
			var nt = plus.networkinfo.getCurrentType();

			if(Number(nt) != 1 && _this.starData) {
				clearTimeout(_this.newWorkTimer);
				_this.newWorkTimer = setTimeout(function() {
						_this.starData = false;
						_this.refreshDate([0, 1, 2 ,3]);
					}, 2000)
					//console.log( nt + " 网络状态");
					//获取用户信息
				GHUTILS.getUserInfo();
			}

			//switch ( nt ) {
			//	case plus.networkinfo.CONNECTION_ETHERNET:
			//	case plus.networkinfo.CONNECTION_WIFI:
			//	console.log("Switch to Wifi networks!");
			//	break;
			//	case plus.networkinfo.CONNECTION_CELL2G:
			//	case plus.networkinfo.CONNECTION_CELL3G:
			//	case plus.networkinfo.CONNECTION_CELL4G:
			//	console.log("Switch to Cellular networks!");
			//	break;
			//	default:
			//	console.log("Not networks!");
			//	break;
			//}
		},
		refreshDate: function(tab) {
			var _this = this;
			var nowTime = new Date();
			nowTime = nowTime.getTime();
			var lastTime = nowTime - this.refreshTime * 60000;
			var pageId = _this.refreshPage;
			var navBtnId = _this.navPageId;
			
			for(var i = 0; i < tab.length; i++) {
				
				var _navBtn = document.getElementById(navBtnId[tab[i]]);
				var netWorkTime = _navBtn.getAttribute("data-time");
				if(lastTime > Number(netWorkTime) || tab.length > 2) {
					_navBtn.setAttribute("data-time", nowTime);
					mui.fire(plus.webview.getWebviewById(pageId[tab[i]]), "loadData");
				}
			}
		},
		showtab: function(tab) {
			var _this = this;
			var navbtn = mui(".app-tab-item");
			var title = navbtn[tab].getElementsByTagName("span")[1].innerHTML;
			var targetId = navbtn[tab].getAttribute('data-id');

			mui.trigger(navbtn[tab], "tap");
		},
		//弹窗,签到提示框
		signIn: function(goUpdata) {
			var _this = this;
			var signActive = false;
			var userId = GHUTILS.getLocalUserInfo().investorOid;
			if(userId == null){
				return;
			}
			//签到互动是否存在
			GHUTILS.LOAD({
				url:GHUTILS.API.CHA.getEventInfo,
				data:{
					eventType:'sign',
					couponType:'coupon'
				},
				type:'post',
				callback:function(result){
					if(result.errorCode == 0 && result.money !=null){
						GHUTILS.LOAD({
							url: GHUTILS.API.signIn.checkSign+"?userId="+userId,
							data: {},
							type: "post",
							//sw: true,
							callback: function(d) {
								if(d.errorCode == 0) {
									var sub = plus.webview.create("/html/index/index-shortcut/index-signin.html", "SIGNIN_DIALOG", {
										background: "transparent",
										top: '0',
										bottom: '0'
									}, {
										goUpdata: goUpdata
									});
									sub.show();
								} else {
									UPDATA.upDataInit({});
								}
							},
							errcallback: function(){
								UPDATA.upDataInit({});
							}
						})
					}else{
						UPDATA.upDataInit({});
					}
				},
				errcallback: function(){
					UPDATA.upDataInit({});
				}
			})
		},
		funInit:function(){
			$.domid = function(o){
				return document.getElementById(o);
			}
			$.domclass = function(o){
				return document.getElementsByClassName(o);
			}
			$.show = function(o){
				o.style.display = "block";
			}
			$.flex = function(o){
				o.style.display = "-webkit-box";
			}
			$.none = function(o){
				o.style.display = "none";
			}
			$.inlineblock = function(o){
				o.style.display = "inline-block";
			}
		}
	}
	mui.plusReady(function() {
		var index = new INDEX();
		index.domeInit();
		//window.index = index;
	});
})(mui);
