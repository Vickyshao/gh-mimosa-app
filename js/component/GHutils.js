//定义公共信息

var GHUTILS = {};

//请求地址相关配置

var HOST = "https://www.hushenlc.cn";//---> jz生产
var channelOid = "2c9180825d009645015d068b91573434";//---> jz生产
var cid = "0001";//---> jz生产
var ckey = "0001"//---> jz生产
var cmsChannelOid = "2c9180835d00963f015d068f7edb0000"//--> jz生产

//var HOST = "http://106.15.158.150";//---> jz150
//var channelOid = "2c9180825d009645015d068b91573434";//---> jz150
//var cid = "0001";//---> jz150
//var ckey = "0001"//---> jz150
//var cmsChannelOid = "2c9180835d00963f015d068f7edb0000"//--> jz150

//var HOST = "http://116.62.245.189:81";//---> jz189
//var channelOid = "2c9180855cf2ec5b015cf2f38ee60059";//---> jz189
//var cid = "123456";//---> jz189
//var ckey = "123456"//---> jz189
//var cmsChannelOid = "2c9180875cf2f260015cf2f3dbda0000"//--> jz189

//var HOST = "http://106.14.171.12";//---> jz12
//var channelOid = "2c9180845dcb79aa015dcb853a470112";
//var cid = "0001";
//var ckey = "0001";
//var cmsChannelOid = "2c9180835dbfa200015dcb8595550017";

//var HOST = "http://139.129.250.127";//---> jz127
//var channelOid = "8a9c88f35b28f35e015b2901cc450031";//---> jz127
//var cid = "123456";//---> jz127
//var ckey = "123456"//---> jz127
//var cmsChannelOid = "8a9c88f35a44f9df015a450bba720000"//--> jz127

//var HOST = "http://118.190.97.39";//---> jz39
//var channelOid = "8a9ebf6f5ad11089015ad120c3bd0028";//---> jz39
//var cid = "123456";//---> jz39
//var ckey = "123456"//---> jz39
//var cmsChannelOid = "8a9c88f35a44f9df015a450bba720000"//--> jz39

//var HOST = "http://114.215.133.84";//---> jz84
//var channelOid = "8a2373945cfce314015cfcf6619f016b";//---> jz84
//var cid = "jinzhu";//---> jz84
//var ckey = "jinzhu"//---> jz84
//var cmsChannelOid = "8a23739459821cd901598223f2a10000"//--> jz84

//var HOST = "http://118.190.115.215";//---> gh215
//var channelOid = "402880885ccf876c015ccf9a25ee0106";//---> gh215
//var cid = "123456";//---> gh215
//var ckey = "123456"//---> gh215
//var cmsChannelOid = "402880865cc9d275015ccf9d867b0000"//--> gh215

//var HOST = "http://139.224.233.7";//---> 7
//var channelOid = "000000005b136e29015b3d332549118b";//---> 7
//var cid = "123456";//---> 7
//var ckey = "123456"//---> 7
//var cmsChannelOid = "000000005b1302c0015b13572c210000"//--> 7

//var HOST = "http://139.129.218.57";//---> 57
//var channelOid = "8aae56915bad7e98015bcc5f74792815";//---> 57
//var cid = "123456";//---> 57
//var ckey = "123456"//---> 57
//var cmsChannelOid = "8aae56915bad7b5a015bcc5fe8b60000"//--> 57

//var HOST = "http://114.215.137.126:8088";//---> 126
//var channelOid = "ff8080815bc8da0b015bcc4e3a840076";//---> 126
//var cid = "123456";//---> 126
//var ckey = "123456"//---> 126
//var cmsChannelOid = "ff8080815bc79149015bcc4ef4bb0000"//--> 126

//var HOST = "http://118.190.105.142";//---> 142
//var channelOid = "f39cbaec5ba3cfdf015ba3de7a2a007e";//---> 142
//var cid = "12306";//---> 142
//var ckey = "12306"//---> 142
//var cmsChannelOid = "f39cbaec5b9f6e46015bb27d6ceb0000"//--> 142

//var HOST = "http://139.129.97.154";//---> 154
//var channelOid = "8aad68085c594f1f015c5ceb4b8633e8";//---> 154
//var cid = "123456";//---> 154
//var ckey = "123456"//---> 154
//var cmsChannelOid = "8aad68085c5ce1f1015c5cee8a3d0000"//--> 154

//var HOST = "http://demo.guohuaitech.com";//---> jzdemo
//var channelOid = "8a9de9a35b47385b015b473ddee10007";//---> jzdemo
//var cid = "123456";//---> jzdemo
//var ckey = "123456"//---> jzdemo
//var cmsChannelOid = "8a9de9a35b473f7b015b474124400000"//--> jzdemo

//var HOST = "http://pydemo.guohuaitech.com";//---> py24
//var channelOid = "8a9b94df5b89fe09015b8a9c87eb00ba";//---> py24
//var cid = "111111";//---> py24
//var ckey = "111111"//---> py24
//var cmsChannelOid = "8a9b94df5b89fdcd015b8e5d181b0000"//--> py24

//var HOST = "http://jbdemo.guohuaitech.com";//---> jb50
//var channelOid = "8a9b94df5b89fe09015b8a9d680a00bb";//---> jb50
//var cid = "654321";//---> jb50
//var ckey = "654321"//---> jb50
//var cmsChannelOid = "8a9b935a5b8a26d3015b8e5dec530000"//--> jb50

//var HOST = "http://139.224.210.164";//---> jz164
//var channelOid = "8a9b11885a3b7073015a3bed756b05a9";//---> jz164
//var cid = "APP1";//---> jz164
//var ckey = "123456"//---> jz164
//var cmsChannelOid = "8a9b11885a3b50f9015a3c06be640000"//--> jz164


//var HOST = "https://106.14.51.61";//---> jz61
//var HOST = "https://www.zhangyuelicai.com";//---> jz61
//var channelOid = "ff8080815a8452de015a89411e683687";//---> jz61
//var cid = "2";//---> jz61
//var ckey = "APP20170301"//---> jz61
//var cmsChannelOid = "000000005a83152e015a894dfa380001"//--> jz61


//var HOST = "http://www.zhangyuelicai.com";//---> jz52
//var channelOid = "8a2d58845a0809ae015a0831d2a501e4";//---> jz52
//var cid = "123";//---> jz52
//var ckey = "123"//---> jz52
//var cmsChannelOid = "8a2d58845a07be80015a08190ceb0000"//--> jz52

//if(localStorage.getItem("localhostconfig")){
//	switch(JSON.parse(localStorage.getItem("localhostconfig"))["local"]){
//		case "demo" : 
//			HOST = "http://demo.guohuaitech.com"//---> demo
//			channelOid = "8a9de9a35b47385b015b473ddee10007"//---> demo
//			cid = "123456"//---> demo
//			ckey = "123456"//---> demo
//			cmsChannelOid = "8a9de9a35b473f7b015b474124400000"//---> demo
//			break
//		case "py24" : 
//			HOST = "http://pydemo.guohuaitech.com"//--> py24
//			channelOid = "8a9b94df5b89fe09015b8a9c87eb00ba"//--> py24
//			cid = "111111"//--> py24
//			ckey = "111111"//--> py24
//			cmsChannelOid = "8a9b94df5b89fdcd015b8e5d181b0000"//--> py24
//			break
//		case "jb50" : 
//			HOST = "http://jbdemo.guohuaitech.com"//---> jb50
//			channelOid = "8a9b94df5b89fe09015b8a9d680a00bb"//---> jb50
//			cid = "654321"//---> jb50
//			ckey = "654321"//---> jb50
//			cmsChannelOid = "8a9b935a5b8a26d3015b8e5dec530000"//---> jb50
//			break
//		default : break
//	}
//}


//var headhtml = document.getElementsByTagName("head").innerHTML;
//(function(){
//	document.getElementsByTagName("head").innerHTML = headhtml + '<script src="https://jic.talkingdata.com/app/h5/v1?appid=3FB49D69FC8843D6A5164A95E25745AF&vn=ZYLC_APP&vc=1.0.0"></script>'
//})();

GHUTILS = {

	//请求接口
	API: {
		//用户相关
		USER: {
			doLogin:         HOST + '/mimosa/client/investor/baseaccount/login',	//登录
			doLogout:        HOST + '/mimosa/client/investor/baseaccount/logout',	//登出
			checkimgvc:      HOST + '/mimosa/client/captcha/checkimgvc',			//校验验证码
			checklock:		 HOST + '/mimosa/client/investor/baseaccount/checklock',//查看锁定状态
			sendverifyv1:    HOST + '/mimosa/client/sms/sendvc',					//注册、忘记密码发送验证码
			verify:   	     HOST + '/mimosa/client/sms/checkvc',					//验证手机验证码是否正确
			register:        HOST + '/mimosa/client/investor/baseaccount/regist',	//注册
			seq:             HOST + '/mimosa/client/investor/baseaccount/checkloginpwd',			//修改登录密码时判断是否与之前密码相同
			modifypassword:  HOST + '/mimosa/client/investor/baseaccount/editloginpwd',				//修改登录密码
			updatepassword:  HOST + '/mimosa/client/investor/baseaccount/forgetloginpwd',			//重置登录密码
			dealpaypwd:      HOST + '/mimosa/client/investor/baseaccount/editpaypwd',				//设置/修改支付密码
			checkpaypwd:     HOST + '/mimosa/client/investor/baseaccount/checkpaypwd',				//验证原支付密码
			userinfo: 	     HOST + '/mimosa/client/investor/baseaccount/accountinfo',				//用户相关信息
			findBankByCard:	 HOST + '/settlement/channelBank/findBankInfoByCard',	//判断银行卡与卡号是否匹配
//			isbind:	         HOST + '/mimosa/client/investor/bank/isbind',			//判断银行卡是否已绑定
			valid4ele:	     HOST + '/mimosa/client/investor/bank/bindcardapply',	//绑卡四要素验证
			bankadd:	     HOST + '/mimosa/client/investor/bank/add',				//新增银行卡
			removebank:      HOST + '/mimosa/boot/investor/bank/removebank'			//解绑银行卡
		},
		//账户信息相关
		CHA:{
			usermoneyinfo:   HOST + '/mimosa/client/investor/baseaccount/userinfo',	//用户资金相关信息  
			islogin: 	     HOST + '/mimosa/client/investor/baseaccount/islogin',	//用户是否登录
			getmyinvites:    HOST + '/mimosa/client/investor/baseaccount/referdetail/referlist',	//我的邀请
			invitecharts:    HOST + '/mimosa/client/investor/baseaccount/referdetail/recomtop10',	//邀请排行榜
			dealDate:        HOST + '/mimosa/client/platform/baseaccount/deta',		//首页交易额
			prot0list:       HOST + '/mimosa/client/tradeorder/currentOrderList',	//我的沪深一号
			prot0detail:     HOST + '/mimosa/client/holdconfirm/mycurrdetail',		//我的活期产品详情
			prot0orderdetail:HOST + '/mimosa/client/tradeorder/currentOrderDetail',	//我的活期产品订单详情
			prot0redeem:     HOST + '/mimosa/client/tradeorder/currentOrderClose',	//我的赎回记录
			prot0qrydetail:  HOST + '/mimosa/client/tradeorder/mng',				//交易明细
			prot0qryincome:  HOST + '/mimosa/client/investor/holdincome/qryincome2',//我的活期交易明细--收益
			protnlist:       HOST + '/mimosa/client/holdconfirm/tnhold',			//我的定期列表
			proholdtndetail: HOST + '/mimosa/client/holdconfirm/tningdetailer',		//我的定期持有中详情
			proclosetndetail:HOST + '/mimosa/client/holdconfirm/closedregularinfo',	//我的定期已结清详情
			depwdrawlist:    HOST + '/mimosa/client/investor/bankorder/mng',		//充提记录
			accountIncome:   HOST + '/mimosa/client/investor/holdincome/mydatedetail',				//累计收益页面
			useraccount:     HOST + '/mimosa/client/investor/baseaccount/myhome',	//我的首页
			accountdetail:   HOST + '/mimosa/client/investor/baseaccount/mycaptial',//我的资产详情
			coupon:          HOST + '/mimosa/client/tulip/myallcoupon',				//我的卡券
			receiveCoupon:   HOST + '/mimosa/client/investor/bankorder/receiveredenvelope',			//领取红包
			tdetail:         HOST + '/mimosa/product/client/tdetail',				//获取体验金产品oid
			getEventInfo:    HOST + '/mimosa/client/tulip/getEventInfo',			//活动红包
			switchFind:      HOST + '/mimosa/client/switch/find'					//操作限制管理接口
		},
		//用户签到相关
		signIn:{
			sign:	         HOST + '/mimosa/client/tulip/signIn',					//签到
			checkSign:	     HOST + '/mimosa/client/tulip/checkSign'				//检查是否签到
		},
		//理财信息相关
		TARGET:{
			gettnproductlist:HOST + '/mimosa/product/client/tnproducts',			//定期产品列表
//			gett0productlist:HOST + '/mimosa/product/client/currents',				//活期产品列表
			gett0productlist:HOST + '/mimosa/product/client/t0products',			//活期产品列表
			getproductlist:  HOST + '/mimosa/product/client/apphome',				//首页产品列表
			getproductdetail:HOST + '/mimosa/product/client/pdetail',				//定期产品详情
			mycouponofpro:   HOST + '/mimosa/client/tulip/mycouponofpro',			//认购获取优惠券
			mholdvol:        HOST + '/mimosa/client/holdconfirm/mholdvol',			//获取活期产品单人已持有金额
			gett0detail:     HOST + '/mimosa/product/client/cdetail',				//活期产品详情
			tradeordermng:   HOST + '/mimosa/boot/tradeorder/mng'					//获取产品投资信息
		},
		//交易相关
		ORDER:{
			dapply:	         HOST + '/mimosa/client/investor/bankorder/apply/dapply',				//充值发送验证码
			deposit:	     HOST + '/mimosa/client/investor/bankorder/deposit',	//充值
			withdraw:	     HOST + '/mimosa/client/investor/bankorder/withdraw',	//提现
			invest:          HOST + '/mimosa/client/tradeorder/invest',				//产品购买
			performredeem:   HOST + '/mimosa/client/tradeorder/redeem',				//活期赎回
			depositisdone:   HOST + '/mimosa/client/investor/bankorder/isdone',		//检测充值订单是否完成
			investisdone:    HOST + '/mimosa/client/tradeorder/isdone'				//检测申购订单是否完成
		},
		//接口日志
		LOGS:{
			slog:            HOST + '/mimosa/client/platform/errorlog/slog'			//接口日志
		},
		//CMS相关
		CMS:{
			gethome:         HOST + '/cms/app/home',								//获取主页信息
			getnotices:      HOST + '/cms/app/getNotices',							//获取公告信息
			feedback:        HOST + '/cms/app/addAdvice',							//意见反馈
//			messages:        HOST + '/cms/boot/push/pushQuery',						//消息中心
			messages:        HOST + '/cms/app/pushQuery',							//消息中心
			mailQueryPage:   HOST + '/cms/client/mail/queryPage',					//查询站内信(已读未读)
			mailDetail:      HOST + '/cms/client/mail/detail',						//站内信详情
			mailAllread:     HOST + '/cms/client/mail/allread',						//站内信全部设置为已读
			bankCardFind:    HOST + '/cms/client/bankCard/find',					//银行卡信息
			bankCardFindall: HOST + '/cms/client/bankCard/findall',					//查询所有银行信息
			getProtocolInfo: HOST + '/cms/app/getProtocolInfo',						//获取协议接口
			getActRuleInfo:  HOST + '/cms/app/getActRuleInfo',						//获取邀请规则
			elementConfig:   HOST + '/cms/client/element/find',						//元素配置
			upDataUrl:       HOST + '/cms/app/getVersionUpdateInfo',				//版本信息获取
			infromationtype: HOST + '/cms/app/getInformationType',					//获取资讯类型
			getinformationsalltoapp:HOST + '/cms/app/getInformationsAlltoApp',
			getinformations: HOST + '/cms/app/getInformations',						//或许资讯信息

		}
	},
	

	//获取图形码
	changeVCode1:function(obj){
		$(obj).attr('src',HOST + '/mimosa/client/captcha/getimgvc?t='+new Date().getTime());
	},
	//页面ID
	PAGESID :{
		TEST				: 'test',
		HOMEPAGEWV      : 'homopagewebview',						//首页内页
		ACCOUNTVW       : 'accountwebview',							//我的内页
		PRTTNLIST       : 'producttnlist',							//定期理财列表内页
		PRTT0LIST       : 'productt0list',							//活期理财列表内页
		ACTIVITYWV      : 'activitywebview',						//活动内页
		SETTING         : 'setting',								//设置中心
		MESSAGE         : 'message',								//消息中心
		ACCOUNTSAFTY    : 'accountsafty',							//设置中心安全中心
		PRTTN           : 'app_producttn',							//定期理财列表外页
		PWD             : 'pwd',									//登陆密码
		DEALPWD         : 'dealpwd',								//交易密码
		BANKCARDLIST    : 'bankcardlist',							//我的银行卡
		BANKCARDADD     : 'bankcardadd',							//添加银行卡
		BANKCARDEDIT    : 'bankcardedit',							//编辑银行卡
		DEPOSIT         : 'deposit',								//充值
		WITHDRAW        : 'withdraw',								//提现
		FORGETPWD       : 'forgetpwd',								//忘记登录密码
		REG             : 'reg',									//注册
		LOGIN           : 'login',									//登录
		INVITATION      : 'invitation',								//我的邀请
		PROTNDETAIL     : 'protndetail',							//定期产品详情
		PROT0DETAIL     : 'prot0detail',							//活期产品详情
		PROTNPRODETAIL  : 'producttnprotocol',						//定期产品二级详情
		PROT0PRODETAIL  : 'productt0protocol',						//活期产品投资记录
		PROT0INTRODUCE  : 'productt0introduce',						//活期产品产品介绍
		PROT0INFO       : 'productt0info',							//活期产品项目信息
		PROTNORDER      : 'protnorder',								//定期产品认购
		PROT0ORDER      : 'prot0order',								//活期产品认购
		PROTNCOUPON     : 'protncoupon',							//定期产品认购优惠券列表
		PROTNORDERLIST  : 'protnorderlist',							//我的定期页面
		PROT0ORDERLIST  : 'prot0orderlist',							//我的活期页面
		ACCT0HOLDDET    : 'acct0holddet',							//活期持有详情
		T0REDEEM        : 't0redeem',								//活期赎回详情
		FEEDBACK        : 'feedback',								//意见反馈
		DYNAMIC         : 'dynamic',								//最新动态内页
		DYNAMICMAIN     : 'dynamicmain',							//最新动态外页
		INFORMATION     : 'information',							//资讯
		ACCOUNTDETAIL   : 'accountdetail',							//资产详情
		LINKPAGES       : 'linkpages',								//跳转页面
		HANDLOCK        : "handlock",								//spwd手势密码页
		MASK            :"mask",									//版本更新弹窗页
		CONTENT         :"content",									//数据显示页面
		ACCDEALPT       : "accountDealParent",						//交易明细外页
		ACCOUNTDEAL     : "accountdeal",							//交易明细内页
		LOCKER          :"app_locker",								//locker手势密码页
		JYJG            : "jiaoyijieguo",							//交易结果页面
		ACCDW           : "accountDepositWidthdrowRecord",			//充提记录内页
		ACCDWRPT        : "accountDepositWidthdrowRecordParent",	//充提记录外页
		COUPON          : "coupon",									//优惠券
		INSURANCE       :  "insurance",								//安全保障页面
		INDEXSYSTEM     :  "indexsystem",							//系统维护页面
		CMSPAGE         :  "cmspage"								//CMS活动内部跳转页面
	},

	//打开新页面
	OPENPAGE :function(op) {
		//op -- >url,id,top,bottom,extras,autoshow,anishow,duration.
		if (!op.url) {
			return
		}
//		if(op.top){
//			op.top = op.top + 20
//		}
		mui.openWindow({
			url: op.url || '',
			id: op.id || '',
			styles: {
				top: op.top || 0, //新页面顶部位置
				bottom: op.bottom || 0 //新页面底部位置0
			},
			extras: op.extras || {}, //自定义扩展参数，可以用来处理页面间传值
			show: {
				autoShow: op.autoshow || true, //页面loaded事件发生后自动显示，默认为true
				aniShow: op.anishow || "pop-in", //页面显示动画，默认为”pop-in“；
				duration: op.duration || 200 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			},
			waiting: {
				autoShow: op.autoShow||false, //自动显示等待框，默认为true
				title: '正在加载...' ,//等待对话框上显示的提示内容
				options:{
					background:'rgba(0,0,0,0.4)'
				}
			}
		})
	},

	/**
	 * 公共ajax请求方法
	 * 参数说明：{}
	 * url: 请求地址 (string)
	 * params: 请求参数 (string || object)
	 * callback: 成功回调 function
	 * errcallback: 错误回调(错误提示类型tipscode,错误代码errcode, 错误回调 errcb ) (0 || object)
	 * type: 请求类型，"GET" || "POST" 默认是"POST"。(string)
	 * contentType: 请求内容类型，默认为"application/json"。
	 */
	LOAD : function(op) {
		if (!op || !op.url) {
			return;
		}

		if (op.params) {
			op.url = op.url + "?" + decodeURIComponent($.param(op.params));
		}

		if (op.sw && window.plus) {
			GHUTILS.nativeUI.showWaiting();
		}
				
		var _async = op.async == false ? false : true;

		var options = {
			url: op.url,
			data: JSON.stringify(op.data) || "",
			type: op.type || "POST",//HTTP请求类型
			async: _async,
			contentType:op.contentType || "application/json",
			dataType: "json",
			timeout: op.timeout || 30000,
//			crossDomain: mui.os.ios,
			success: function(d) {
				//console.log(window.location.href)
				//console.log("load success:"+op.url)
				if (op.callback && typeof(op.callback) == 'function') {
					op.callback.apply(null, arguments);
				}

				if(op.sw && window.plus){
					setTimeout(function() {
						plus.nativeUI.closeWaiting();
						plus.webview.currentWebview().endPullToRefresh();
					}, 200);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (op.errcallback) {
					op.errcallback();
				}
				//if( window.plus ){
					plus.nativeUI.closeWaiting();
					setTimeout(function() {
						plus.webview.currentWebview().endPullToRefresh();
					}, 200);
				//}
				if(op.url != GHUTILS.API.LOGS.slog){
					GHUTILS.LOAD({
						url: GHUTILS.API.LOGS.slog,
						data: {
							reqUri: op.url,
							params: JSON.stringify(op.data) || ""
						},
						sw: false
					})
				}
				console.log(op.url);
				console.log(XMLHttpRequest.status)
				console.log(JSON.stringify(textStatus))
				//console.log(JSON.stringify(errorThrown))
//              mui.toast('网络错误，请稍后再试',{verticalAlign:"center"});
			}
		};
		try {
			mui.ajax(options);
		} catch (e) {
		 	console.log("网络错误，请稍后再试");
		 	if( window.plus){
				plus.nativeUI.closeWaiting();
				setTimeout(function() {
					plus.webview.currentWebview().endPullToRefresh();
				}, 200);
			}
		}

	},
	
	/**
	 * 将对象转换成带参数的形式 &a=1&b=2
	 */
	buildQueryUrl: function(url, param) {
		var x = url
		var ba = true
		if (x.indexOf('?') != -1) {
			if (x.indexOf('?') == url.length - 1) {
				ba = false
			} else {
				ba = true
			}
		} else {
			x = x + '?'
			ba = false
		}
		var builder = ''
		for (var i in param) {
			var p = '&' + i + '='
			if (param[i]) {
				var v = param[i]
				if (Object.prototype.toString.call(v) === '[object Array]') {
					for (var j = 0; j < v.length; j++) {
						builder = builder + p + encodeURIComponent(v[j])
					}
				} else if (typeof(v) == "object" && Object.prototype.toString.call(v).toLowerCase() == "[object object]" && !v.length) {
					builder = builder + p + encodeURIComponent(JSON.stringify(v))
				} else {
					builder = builder + p + encodeURIComponent(v)
				}
			}
		}
		if (!ba) {
			builder = builder.substring(1)
		}
		return x + builder
	},

	//验证接口返回ErrorCode是否为0
	checkErrorCode:function(result,tips){
		var tips = tips || false;
		var icon = '<span class="app-icon app-icon-clear"></span>';
//		console.log(JSON.stringify(result))
		if (result.errorCode == 0) {
			return true;
		}else {
			var _msg = '';
			if ( result.errorCode == 502 ||  result.errorCode == 404 ){
				_msg = '请求错误,请稍后重试';

			}else{
				_msg = result.errorMessage
				if(_msg && _msg.indexOf("(CODE") > 0){
					_msg = _msg.substr(0, _msg.indexOf("(CODE"))
				}
			}
			if((result.errorCode == '10002'|| result.errorCode == '20005') && !plus.webview.getWebviewById(GHUTILS.PAGESID.LOGIN)){
//				mui.toast("当前用户未登录，请先登录");
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
			}else{
				GHUTILS.toast(_msg || "数据更新中，请耐心等待");
			}

//			if ( result.errorCode == 'E10000' && _msg.length > 100){
//
//				return false;
//			}

//			if(tips){
//				$(tips).html(_msg);
//			}else{
				
//			}

			if(window.plus){
				plus.nativeUI.closeWaiting();
				plus.webview.currentWebview().endPullToRefresh();
			}

			return false;
		}
	},

	//获取浏览器参数
	parseUrlParam : function(url) {
		if (!url) {
			url=window.location.href;
		}
		var urlParam = {};
		if (url.indexOf("?") < 0) {
			return urlParam;
		}
		var params = url.substring(url.indexOf("?") + 1).split("&");
		for (var i = 0; i < params.length; i++) {
			var k = params[i].substring(0,params[i].indexOf("="));
			var v = params[i].substring(params[i].indexOf("=")+1);
			if (v.indexOf("#") > 0) {
				v = v.substring(0, v.indexOf("#"));
			}
			urlParam[k] = v;
		}
		return urlParam;
	},

	nativeUI:{
//		app加载loading
		showWaiting:function(msg){
			var _msg = msg || '';
			plus.nativeUI.showWaiting(_msg,{background:"rgba(0,0,0,0.2)"});
		}

	},
	dialogBox:{
		show: function(){
			$(".app_dialog_warp").addClass("app_active");
			setTimeout(function(){
				$(".app_dialog_warp").addClass("app_show");
			},100);
			
			$(".app_close_box").off().on("click",function(){
				GHUTILS.dialogBox.hide();
			})
			
		},
		hide:function(){
			$(".app_dialog_warp").removeClass("app_show");
			setTimeout(function(){
				$(".app_dialog_warp").removeClass("app_active");
			},200)
		}
	},
	//获取用户信息
	getUserInfo:function(cb){
		GHUTILS.LOAD({
			url: GHUTILS.API.USER.userinfo,
			type: "post",
			//async: false,
			sw:false,
			callback: function(result) {
				console.log(JSON.stringify(result))
				var userInfo = {};
				if (result.errorCode == 0 &&　result.islogin) {
					//GHUTILS.userInfoList(result);
					/*
					 *这里是字段说明
					 *
					 *
					 *
					 *
					 *
					 *
					 *
					 *
					 * */
					userInfo = result;
					userInfo.loginStatus = true;
					//localStorage.setItem("userInfo", JSON.stringify(userInfo));
				}else{
					userInfo.loginStatus = false;
					GHUTILS.upDataLocalCfig({
						ustatus:false,
						spwd:GHUTILS.getLocalCfg("spwd"),
						showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true,
						cfg:GHUTILS.getLocalCfg("spwdcfg") ? true : false,
						skip:GHUTILS.getLocalCfg("skip") ? true : false,
						touchid:GHUTILS.getLocalCfg("touchid") ? true : false
					});
				}

				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				//回调
				if (cb && typeof(cb) == 'function') {
					cb.apply(null, arguments);
				}
			},
			errcallback: function() {
				mui.toast("网络错误，请稍后再试")
			}
		});
	},
	//判断产品是否为某种标签产品,labelArr为标签数组,label为标签,通过code判断增加code参数为true
	isLabelProduct: function(labelArr, label, code){
		var labelProduct = false
		if(labelArr && labelArr.length > 0){
			labelArr.forEach(function(e, i){
				if(e.labelName == label && !code){
					labelProduct = true
				}else if(e.labelCode == label && code){
					labelProduct = true
				}
			})
		}
		return labelProduct
	},
	//获取当前用户体验金
	getTasteCoupon: function(){
		var tasteCouponList = [], couponId = "", amount = 0;
		GHUTILS.LOAD({
			url: GHUTILS.API.CHA.coupon +"?page=1&rows=10000&status=notUsed",
			type:'post',
			async: false,
			callback: function(result){
				console.log(JSON.stringify(result))
				if(result.errorCode == 0){
					if(result.rows && result.rows.length > 0){
						for(var p in result.rows){
							if(result.rows[p].type == "tasteCoupon"){
								tasteCouponList.push(result.rows[p])
							}
						}
						if(tasteCouponList.length > 0){
							var amountList = [], maxAmountObjList = [], msecList = [], minMsecObjList = [], maxAmount = 0, minMsec = 0;
							for(var p in tasteCouponList){
								amountList.push(tasteCouponList[p].amount)
							}
							maxAmount = Math.max.apply(Math, amountList)
							for(var p in tasteCouponList){
								if(tasteCouponList[p].amount == maxAmount){
									maxAmountObjList.push(tasteCouponList[p]);
								}
							}
							for(var p in maxAmountObjList){
								var dateArr = maxAmountObjList[p].finish.split('-');
								msecList.push(new Date(dateArr[0],(dateArr[1]-1),dateArr[2]).getTime());
								maxAmountObjList[p].msec = msecList[p];
							}
							minMsec = Math.min.apply(Math, msecList)
							for(var p in maxAmountObjList){
								if(maxAmountObjList[p].msec == minMsec){
									minMsecObjList.push(maxAmountObjList[p]);
								}
							}
							couponId = minMsecObjList[0].oid
							amount = minMsecObjList[0].amount
						}
					}
				}else if(result.errorCode == 10002 || result.errorCode == 20005){
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
				}else{
					var _msg = result.errorMessage
					if(_msg && _msg.indexOf("(CODE") > 0){
						_msg = _msg.substr(0, _msg.indexOf("(CODE"))
					}
					mui.toast(_msg || "数据更新中，请耐心等待")
				}

			}
		})
		return {"tasteCouponList": tasteCouponList, "couponId": couponId, "amount": amount}
	},
	//购买新手产品时判断用户是否为新手用户
	isFreshman: function(ifTrue){
		GHUTILS.LOAD({
			url: GHUTILS.API.CHA.usermoneyinfo,
			type: "post",
			async: true,
			sw: true,
			callback: function(result) {
				if(GHUTILS.checkErrorCode(result)){
					if(result.isFreshman && result.isFreshman == 'yes'){
						ifTrue()
					}else{
						mui.toast('非新手用户不可购买新手产品')
					}
				}
			}
		});
	},
	//产品标签显示
	showProductLabels: function(labelCodes){
		var type = "";
		if(labelCodes && labelCodes.length > 0){
//			labelCodes.forEach(function(e, i){
//				if(e.labelCode == "1"){
//					type += '<span class="app_tag_icon app_tag_c1">'+e.labelName+'</span>'
//				}else if(e.labelCode == "7"){
//					type += '<span class="app_tag_icon app_tag_c4">'+e.labelName+'</span>'
//				}else if(e.labelCode == "8"){
//					type += '<span class="app_tag_icon app_tag_c5">'+e.labelName+'</span>'
//				}else if(e.labelCode == "2"){
//					type += '<span class="app_tag_icon app_tag_c2">'+e.labelName+'</span>'
//				}else if(e.labelCode == "3" || e.labelCode == "4" || e.labelCode == "5" || e.labelCode == "6"){
//					type += '<span class="app_tag_icon app_tag_c3">'+e.labelName+'</span>'
//				}
//			})
//			labelCodes.forEach(function(e, i){
//				if(e.labelType == "extend"){
//					type += '<span class="app_tag_icon app_tag_c6">'+e.labelName+'</span>'
//				}
//			})
			labelCodes.forEach(function(e, i){
				if(e.labelType == "general"){
					type = '<div class="app_product_icon">'+e.labelName+'</div>'
				}
			})
		}
		return type
	},
	//沉浸式配置
	setUserAgent: function(){
		//===================沉浸式判断并设置=====================
		var immersed = 0;
		var topoffset = 44;
		var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
//		console.log(ms)
		if(ms && ms.length>=3){ // 当前环境为沉浸式状态栏模式
			immersed = parseFloat(ms[2]);// 获取状态栏的高度
			topoffset = topoffset + immersed;
			var t = document.getElementsByTagName('header')[0];
			if(t){
				t.style.paddingTop = immersed+'px';
				t.style.height= topoffset +'px';
			}
			var mc = document.getElementsByClassName('mui-content')[0];
			if (mc) {
				var newpt = 44 + immersed +'px';
				mc.style.paddingTop = newpt;
			}
			//下拉刷新位置
			var mptp = document.getElementsByClassName('mui-pull-top-pocket')[0];
			if (mptp) {
				mptp.style.top = immersed +'px';
			}
		}
		//======================================================
	},
	//沉浸式状态栏页面高度设置
	setTop: function(topoffset){
		var immersed = 0;
		var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
		if(ms && ms.length>=3){ // 当前环境为沉浸式状态栏模式
			immersed = parseFloat(ms[2]);// 获取状态栏的高度
			topoffset = topoffset + immersed;
		}
		return topoffset
	},
	//设置系统状态栏黑色
	setStatusBarBlack: function(){
		plus.navigator.setStatusBarStyle('UIStatusBarStyleDefault')
	},
	//设置系统状态栏白色
	setStatusBarWhite: function(){
		plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackOpaque')
	},
	//安卓切换小眼睛图标,获取输入框焦点
	inputFocus: function(inputId){
		$(inputId)
		.on('focus', function () {
			$(inputId).parent().find(".app-icon-eye").on("tap", function(){
				var imm, InputMethodManager;
				if (mui.os.android) {
					//强制当前webview获得焦点
					var wv_current = plus.android.currentWebview();
					plus.android.importClass(wv_current);
					wv_current.requestFocus();
					
					var main = plus.android.runtimeMainActivity();
					var Context = plus.android.importClass("android.content.Context");
					InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
					imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
					imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
					
					setTimeout(function() {
						var inputElem = document.querySelector(inputId);
						inputElem.focus(); 
					}, 200);
				}
			})
		})
		.on('blur', function () {
			$(".app-icon-eye").off("tap")
		})
	},
	//获取当前手机号
	getMobileNum: function(){
		if(GHUTILS.mos() == 'AZ'){
			var main = plus.android.runtimeMainActivity();
			var Context = plus.android.importClass("android.content.Context");
			var tm = main.getSystemService(Context.TELEPHONY_SERVICE);
			
			// 方法一：
			plus.android.importClass(tm);
			var simSerialNumber = tm.getSimSerialNumber();
			//返回SIM卡的序列号(IMEI)
			console.log(simSerialNumber);
			var phoneNumber = tm.getLine1Number().toString();
			console.log(phoneNumber);
		}
	},

	//获取本地用户信息：传key返回指定key的值。不传key返回所有信息
	getLocalUserInfo:function(key){
		var userInfo = localStorage.getItem("userInfo") || '[]';
		userInfo = JSON.parse(userInfo);
		var info = null;
		if(key){
			$.each(userInfo, function(m,n) {
				if(key == m){
					info = n;
				}
			});
		}else{
			info = userInfo;
		}
		return info
	},
	//获取登录状态 gologin:是否打开登录页面
	getloginStatus:function(gologin){
		var userInfo = localStorage.getItem("userInfo") || '{"loginStatus":false}';
			userInfo = JSON.parse(userInfo);
			//console.log(gologin)
		if(gologin && !userInfo.loginStatus){
			mui.toast("请先登录");
			mui.fire(plus.webview.getLaunchWebview(), "login",{});
		}
		return userInfo.loginStatus;
	},
	//更新相关页面信息
	refreshPages:function(){
		//更新相关页面信息
		mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCOUNTVW),"loadData");
		mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.SETTING),"loadData");

		//刷新认购页面
		if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNORDER)){
			mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PROTNORDER),"loadData");
		}else if(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER)){
			mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PROT0ORDER),"loadData");
		}
	},
	//更新手势信息
	upDataLocalCfig:function(op){
		var _this =  this;
		var userId = localStorage.getItem("userID") || '';
		var uConfigList = localStorage.getItem("userConfigList") || '[]',
			uConfigList = JSON.parse(uConfigList);
		var _d = new Date();
		var hasInfo = false;
		var _ustatus = op.ustatus == false ? false : true ;
		var _cfg = op.cfg || false ;
		var _spwd = op.spwd || '';
		var _showstatus = op.showstatus || false;
		var _skip =  op.skip || false;
		var _touchid = op.touchid || false;

		var defcfg = {
			mobile : userId,
			spwd : _spwd,
			showstatus : _showstatus,
			spwdcfg : _cfg,
			ustatus : _ustatus,
			skip : _skip,
			touchid : _touchid
		};
		//console.log(JSON.stringify(uConfigList))
		for (var i = 0; i < uConfigList.length; i++) {
			if(uConfigList[i].mobile == '' || uConfigList[i].mobile == userId){
				uConfigList[i].mobile = userId;
				uConfigList[i].spwd = _spwd;
				uConfigList[i].showstatus = _showstatus;
				uConfigList[i].spwdcfg = _cfg;
				uConfigList[i].ustatus = _ustatus;
				uConfigList[i].skip = _skip;
				uConfigList[i].touchid = _touchid;
				hasInfo = true;				
			}
			
		}
		if(!hasInfo){
			defcfg.spwd = _spwd;
			defcfg.showstatus = _showstatus;
			defcfg.spwdcfg = _cfg;
			defcfg.touchid = _touchid;
			uConfigList.push(defcfg);
		}
		
		//console.log(JSON.stringify(uConfigList))
		localStorage.setItem("userConfigList", JSON.stringify(uConfigList));
		
		//console.log(JSON.stringify(uConfigList));
	},
	//获取本地信息
	getLocalCfg:function(key){
		var userId = localStorage.getItem("userID") || '';
		var uConfigList = localStorage.getItem("userConfigList") || '[]',
		uConfigList = JSON.parse(uConfigList);
		var cfg = null;
		
		for (var i = 0; i < uConfigList.length; i++) {
			if(uConfigList[i].mobile == userId){
				if(key){
					mui.each(uConfigList[i], function(m,n) {
						if(key == m){
							cfg = n;
						}
					});
				}else{
					cfg = uConfigList[i];
				}
			}
				
		}
		return cfg
	},
	//加密指纹
	makeSpwd:function(spwd){
		var jssha = new jsSHA("SHA-1", "TEXT");
		var skey = localStorage.getItem("userID") || '';
		jssha.update(skey + spwd);
		
		var hex = jssha.getHash("HEX");
		return hex;
	},
	//
	linkChackLogin:function(elmid,wsid){

		if(GHUTILS.getloginStatus()){
			return true;
		}else{
			var cbobj = {
				cb:"firePage",
				even:"tapLink",
				id:wsid,
				extars:'{"elm":"'+ elmid +'"}'
			}
			mui.fire(plus.webview.getLaunchWebview(), "login",{
				cbobj:JSON.stringify(cbobj)
			} );
			mui.toast("请先登录")
			return false;
		}
	},

	//排序
	/**
	 * @description
	 * data json obj
	 * field field to be sorted
	 * direction desc,esc
	 * @param {Object} data
	 * @param {Object} field
	 * @param {Object} direction
	 */
	sort:function (data,field,direction) {
		if (!field || !direction) {
			return;
		}
		if (direction.toLowerCase() == "esc") {//升序
			data.sort(function(a,b) {
				var f=a[field]?a[field]:0;
				var s=b[field]?b[field]:0;
				return f -s;
			});
		}else{
			data.sort(function(a,b) {
				var f=a[field]?a[field]:0;
				var s=b[field]?b[field]:0;
				return s -f;
			});
		}
	},

	//转几位小数点（按位数截取），带后缀（单位）GHUTILS.toFixed(10000,4,"元") = 10000.0000元
	toFixeds: function(numb, digital,suffix) {
		var digital = digital ? digital : 0;
		var fixed = 1;
		for (var i = 0; i < digital; i++) {
			fixed = fixed * 10;
		}

		if (numb == undefined || numb.length == 0) {
			return "--";
		}else {
			var numb = GHUTILS.Fmul(Number(numb), fixed);
			return (parseInt(numb)/fixed).toFixed(digital) + (suffix ? suffix : "");
		}
	},

	//转几位小数点（四舍五入），带后缀（单位）GHUTILS.toDecimal(10000,4,"元") = 10000.0000元
	toDecimal: function(numb, digital,suffix) {
		var digital = digital ? digital : 0;
		var fixed = 1;
		for (var i = 0; i < digital; i++) {
			fixed =fixed * 10;
		}
		if (numb == undefined || numb.length == 0) {
			return "--";
		}else {
			var numb = GHUTILS.Fmul(Number(numb), fixed);
			return (Math.round(numb)/fixed).toFixed(digital) + (suffix ? suffix : "");
		}
	},

	//数值单位转换 GHUTILS.NumbF100(10000,4) = 1.0000万
	NumbF0: function(v,digital) {
		if (v == undefined || v.length == 0) {
			 return "--";
		}
		var fixed= digital ? digital : 0;
		var d=v<0?"-":"";
		v = Math.abs(v);
		if (v < 10) {
			v = GHUTILS.toDecimal(v,fixed);
		}else if (v > 10000 * 10000) {
			v = GHUTILS.toDecimal(v / 10000 / 10000,fixed) + '亿';
		}else if (v > 10000) {
			v = GHUTILS.toDecimal(v / 10000,fixed) + '万';
		} else {
			var x = (v / 1000).toFixed(fixed);
			v = (x >= 10) ? '1万' : (v).toFixed(fixed);
		}
		return d+v;
	},

	//日期时间 0000-00-00 00:00:00
	currentDate: function(t) {
		var nowdata = t ? new Date(t) : new Date();
		var y = nowdata.getFullYear(),
			m = nowdata.getMonth() + 1,
			d = nowdata.getDate(),
			h = nowdata.getHours(),
			min = nowdata.getMinutes(),
			s = nowdata.getSeconds(),
			time = null;
		var totr = function(t) {
			t < 10 ? t = '0' + t : t;
			return t;
		};

		time = y + '-' + totr(m) + '-' + totr(d) + ' ' + totr(h) + ':' + totr(min) + ':' + totr(s)

		return time

	},

	//格式化数字 GHUTILS.fmnum(10000,2) = 10,000.00
	fmnum:function(s, n){
		   n = n > 0 && n <= 20 ? n : 2;
		   s = Number(GHUTILS.toFixeds(parseFloat((s + "").replace(/[^\d\.-]/g, "")),n)).toFixed(n) + "";
		   var l = s.split(".")[0].split("").reverse(),
		   r = s.split(".")[1];
		   t = "";
		   for(i = 0; i < l.length; i ++ )
		   {
		      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		   }
		   return t.split("").reverse().join("") + "." + r;
	},
	//修复JS浮点的加减乘除运算 Fadd加 Fsub减 Fmul乘 Fdiv除
	Fadd:function(a, b) {
    	var c, d, e;
	    try {
	        c = a.toString().split(".")[1].length;
	    } catch (f) {
	        c = 0;
	    }
	    try {
	        d = b.toString().split(".")[1].length;
	    } catch (f) {
	        d = 0;
	    }
	    return e = Math.pow(10, Math.max(c, d)), (GHUTILS.Fmul(a, e) + GHUTILS.Fmul(b, e)) / e;
	},
	Fsub:function(a, b) {
	    var c, d, e;
	    try {
	        c = a.toString().split(".")[1].length;
	    } catch (f) {
	        c = 0;
	    }
	    try {
	        d = b.toString().split(".")[1].length;
	    } catch (f) {
	        d = 0;
	    }
	    return e = Math.pow(10, Math.max(c, d)), (GHUTILS.Fmul(a, e) - GHUTILS.Fmul(b, e)) / e;
	},

	Fmul:function(a, b) {
	    var c = 0,
	        d = a.toString(),
	        e = b.toString();
	    try {
	        c += d.split(".")[1].length;
	    } catch (f) {}
	    try {
	        c += e.split(".")[1].length;
	    } catch (f) {}
	    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
	},

	Fdiv:function(a, b) {
	    var c, d, e = 0,
	        f = 0;
	    try {
	        e = a.toString().split(".")[1].length;
	    } catch (g) {}
	    try {
	        f = b.toString().split(".")[1].length;
	    } catch (g) {}
	    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), GHUTILS.Fmul(c / d, Math.pow(10, f - e));
	},

	checkInput :function(obj, regnum){
		var regTel = /^[0-9]{0,11}$/g; //电话号码(0)
		var regPwd = /^([\x21-\x7e]|[a-zA-Z0-9]){0,16}$/g; //密码(1)
		var regNum = /^\d+$/g; //纯数字(2)
		var regNump = /^(([1-9]\d*)|0)(\.\d{0,2})?$/g; //含两位小数数字(3)
		var regNumId = /^\d{0,17}(\d|X)$/g; //身份验证(4)
		var regYzm = /^\d{0,6}$/g; //纯数字验证码(5)
		var regMoney = /^((([1-9]{1}\d{0,7}))|(100000000))?$/;//1亿以内整数金额(6)
		//var	regTxt    = /^[\u4E00-\u9FA5]$/g;//汉字(4)

		var value = obj.value;
		if (3 == regnum || 6 == regnum) {
			value=value.replace(",","");
		}
		var regs = [regTel, regPwd, regNum, regNump, regNumId, regYzm, regMoney];

		if (value && !value.match(regs[regnum])) {
			obj.value = obj.getAttribute("app_backvalue");
		}else{
			obj.setAttribute("app_backvalue",value);
		}
	},

	//验证文本框
	testInput:{
		tel: function(t) {
			var re = /^1[3|4|5|7|8][0-9]{9}$/;
			var test = re.test(t) ? true : false;
			return test;
		},
		pw: function(t) {
			var re = /^([\x21-\x7e]|[a-zA-Z0-9]){8,20}$/;
			var test = re.test(t) ? true : false;
			return test;
		},
		txt: function(t) {
			var re = /^[\u4E00-\u9FA5]+$/;
			var test = re.test(t) ? true : false;
			return test;
		},
		IDnum: function(t) {
			var re = /^\d{15}$|\d{17}(\d|x|X)$/;
			var test = re.test(t) ? true : false;
			return test;
		},
		num: function(t) {
			var re = /^[0-9]{6}$/;//安全码和验证码都是6位数字
			var test = re.test(t) ? true : false;
			return test;
		},
		floatNum: function(t) {
			var re = /^(([1-9]\d*)|0)(\.\d{0,2})?$/;//两位小数
			var test = re.test(t) ? true : false;
			return test;
		},
		cardNum: function(t) {
			var re = /^(\d{16,19})$/;
			var test = re.test(t) ? true : false;
			return test;
		}
	},

	//全局提示
	globalTips:function(tip){
		var homePage = plus.webview.getLaunchWebview();
		var pagelczh = plus.webview.getWebviewById(GHUTILS.PAGESID.LCZH);
		var pagezhsz = plus.webview.getWebviewById(GHUTILS.PAGESID.ZHSZ);
		mui.fire(homePage,"showtips",{
			version:tip.version || "0",
			msg:tip.msg || "0"
		});
		mui.fire(pagelczh,"showtips",{
			version:tip.version || "0",
			msg:tip.msg || "0"
		});
		mui.fire(pagezhsz,"showtips",{
			version:tip.version || "0"
		});
	},

	//打开登录页面
	openLogin:function(cbobj){
		var index = plus.webview.getLaunchWebview();
		var cbobj = cbobj || '{}'
		mui.fire(index, "login", {
			cbobj: cbobj
		});
	},

	//登出
	loginOut:function(callback){

		GHUTILS.LOAD({
				url: GHUTILS.API.USER.doLogout,
//				data: {},
				type: "post",
				async: false,
				callback: function(result) {
					if (result.errorCode == '0') {
						GHUTILS.getUserInfo(function(){
							GHUTILS.refreshPages();
							GHUTILS.upDataLocalCfig({
								ustatus:false,
								spwd:GHUTILS.getLocalCfg("spwd") || '',
								showstatus:GHUTILS.getLocalCfg("showstatus") == false ? false : true,
								cfg:GHUTILS.getLocalCfg("spwdcfg") ? true : false,
								skip:GHUTILS.getLocalCfg("skip") ? true : false,
								touchid:GHUTILS.getLocalCfg("touchid") ? true : false
							});
							mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.PRTTNLIST), "loadData");
							if(callback){
								callback();
							}else{
								mui.toast("已经退出登录");
							}

						});
					} else {
						var _msg = result.errorMessage
						if(_msg && _msg.indexOf("(CODE") > 0){
							_msg = _msg.substr(0, _msg.indexOf("(CODE"))
						}
						mui.toast(_msg || "数据更新中，请耐心等待")
					}
				}
			});
	},
	//表单提交验证
	validate:function(scope){
		var result = true;
		$(scope ? "#" + scope + " input,select" : "input,select").forEach(function(d, i) {
			var dom = $(d);
			var valid = dom.attr("valid");
			if (valid && result) {
				var ops = JSON.parse(valid);

				var tips = ops.tipsbox || false;
				if (ops.required || dom.val()) {
					if (!dom.val()) {
						GHUTILS.showError(ops.msg,tips);
						result = false;
						return;
					}
					if (ops.subvalid){
						for (var i = 0; i < ops.subvalid.length; i++) {
							var e = ops.subvalid[i];
							if (e.minLength) {
								if (dom.val().length < e.minLength) {
									GHUTILS.showError(e.msg,tips);
									result = false;
									return;
								}
							}
							if (e.maxLength) {
								if (dom.val().length > e.maxLength) {
									GHUTILS.showError(e.msg,tips);
									result = false;
									return;
								}
							}
							if (e.between) {
								if (dom.val().length < e.between[0] || dom.val().length > e.between[1]) {
									GHUTILS.showError(e.msg,tips);
									result = false;
									return;
								}
							}
							if (e.finalLength) {
								if (dom.val().length != e.finalLength) {
									GHUTILS.showError(e.msg,tips);
									result = false;
									return;
								}
							}
							if (e.equals) {
								if (dom.val() != $("#" + e.equals).val()) {
									GHUTILS.showError(e.msg,tips);
									result = false;
									return;
								}
							}

							if (e.mobilePhone) {
								if (!dom.val().match("^1[3|4|5|7|8][0-9]{9}$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							} else if (e.identityCard) {
								if (!dom.val().match("^\\d{17}[X|\\d|x]$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							} else if (e.passWord) {
								if (!dom.val().match("^([\x21-\x7e]|[a-zA-Z0-9]){0,16}$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							} else if (e.debitCard) {
								if (!dom.val().match("^\\d{16,19}$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							} else if (e.positiveInteger) {
								if (!dom.val().match("^[0-9]+\\d*$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							} else if (e.positiveNumber) {
								if (!dom.val().match("^[0-9]+\.?[0-9]*$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							} else if (e.floatNum) {
								if (!dom.val().match("^(([1-9]\\d*)|0)(\.\\d{0,2})?$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							}else if (e.nickName) {
								if (!dom.val().match("^[\u4E00-\u9FA5A-Za-z0-9_]{2,15}$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							}else if (e.invitationNum) {
								if (!dom.val().match("^[A-Za-z0-9]{7}$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							}else if (e.realName) {
								if (!dom.val().match("^[\u4E00-\u9FA5A-Za-z_·]{1,20}$")) {
									GHUTILS.showError(e.msg,tips);
									result = false;
								}
							}
						};
					}
				}
			}
		});
		return result;
	},


	//获取验证码按钮倒计时
	btnTime:function(obj){
		if(obj){
			var t = 120;
	        var btntime = setInterval(function(){
	            if(t >= 0){
	                obj.html('重新获取('+ t +')');
	                t--;
	            }else{
	                obj.removeClass("app_btn_loading");
	                obj.html("短信获取");
	                clearInterval(btntime);
	                t = 120;
	            }
	        },1000)
		}
	},
	
	btnTime2:function(obj){
		if(obj){
			var t = 120;
			var num = 0;
	        var btntime = setInterval(function(){
	            if(t >= 0){
	                $(".my_tips").html("");
	            	$(".circle").removeClass("app_none")
	                $("#my_time").html(t);
	                num = t * 3;
					if (num<180) {
						$('.circle').find('.right').css('transform', "rotate(" + num + "deg)");
					} else {
						$('.circle').find('.right').css('transform', "rotate(180deg)");
						$('.circle').find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
					};
					t--;
	            }else{
	                obj.removeClass("app_loading");
	            	$(".circle").addClass("app_none")
	                $(".my_tips").html("重新获取");
	                clearInterval(btntime);
	                t = 120;
	            }
	        },1000)
		}
	},

	/**
	 * 将数值截取后2位小数,格式化成金额形式
	 *
	 * @param num 数值(Number或者String)
	 * @return 金额格式的字符串,如'1,234,567.45'
	 * @type String
	 */
	formatCurrency: function(num) {
		if (num != null) {
			num = num.toString().replace(/\$|\,/g, '');
		}
		if (isNaN(num))
			num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(GHUTILS.Fmul(num, 100));
		cents = num % 100;
		num = Math.floor(num / 100).toString();
		if (cents < 10)
			cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
			num = num.substring(0, num.length - (4 * i + 3)) + ',' +
			num.substring(num.length - (4 * i + 3));
		return (((sign) ? '' : '-') + num + '.' + cents);
	},

	formatIntCurrency:function(num){
		num = parseInt(num.toString().replace(/\$|\,/g,'')).toString();
		if(isNaN(num))
	    num = "0";
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	    num = num.substring(0,num.length-(4*i+3))+','+
	    num.substring(num.length-(4*i+3));
	    return num;
	},

	//格式化时间格式
	/*param{
	 * data:time,
	 * type:0,
	 * showtime:"true"
	 * }
	 * */
	formatTimestamp : function(param) {
		var d = new Date();
		d.setTime(param && param.time || d);
		var datetime = null;
		var x = d.getFullYear() + "-" + (d.getMonth() < 9 ? "0" : "") + (d.getMonth() + 1) + "-" + (d.getDate() < 10 ? "0" : "") + d.getDate();
		var y = (d.getHours() < 10 ? " 0" : " ") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes() + ":" + (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();

		if (param.showtime == "false") {
			datetime = x + y;
		} else {
			datetime = x;
		}
		return datetime;
	},

	//错误提示
	toast:function(content){
		mui.toast(content);
	},

	showError:function(content,tips){
//		if(tips){
//			var icon = '<span class="app-icon app-icon-clear"></span>';
//			$(tips).html(icon + content);
//			return
//		}
		if(content){
			GHUTILS.toast(content);
		}
	},

	//判断手机系统
	mos:function(){
		var os = "";
		if(mui.os.android){
			os = "AZ";
		}else if(mui.os.ios){
			os = "IP";
		}
		return os
	},

	//复制到剪切板
	copyToClip:function(content){
		if(GHUTILS.mos() == "AZ"){
			console.log('platfrom: android');
			var Context = plus.android.importClass("android.content.Context");
			var main = plus.android.runtimeMainActivity();
			var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
			plus.android.invoke(clip,"setText",content);
		} else if(GHUTILS.mos() == "IP"){
			console.log('platfrom: ios');
			var UIPasteboard = plus.ios.importClass("UIPasteboard");
			var generalPasteboard = UIPasteboard.generalPasteboard();
			generalPasteboard.setValueforPasteboardType(content, "public.utf8-plain-text");
		}
		GHUTILS.toast("复制成功");
	},

	//IOS隐藏键盘
	//blurInput:function(){
	//	var $ = $ || false;
	//	if($){
	//		$(function(){
	//			document.addEventListener( "pause", function(){
	//				$("input").blur();
	//			}, false );
	//
	//		})
	//	}
	//},

	popupBox:{
		show:function(obj){
			$(obj).show();
			$(".mui-popup-backdrop").show();
			setTimeout(function(){
				$(obj).addClass("mui-popup-in");
				$(".mui-popup-backdrop").addClass("mui-active");
			},100)
		},
		hide:function(obj){
			$(obj).removeClass("mui-popup-in");
			$(".mui-popup-backdrop").removeClass("mui-active");
			setTimeout(function(){
				$(obj).hide();
				$(".mui-popup-backdrop").hide();
			},400);
		}
	},
	silderBox:{
		show:function(obj){
			$(obj).addClass("app_active");
			setTimeout(function(){
				$(obj).addClass("app_show");
			},50);
			$(obj).off().on("tap",function(e){

				if("#"+e.target.id == obj){
					GHUTILS.silderBox.hide(obj);
				}
			})
		},
		hide:function(obj){
			$(obj).removeClass("app_show");
			setTimeout(function(){
				$(obj).removeClass("app_active");
			},500);
		}
	},
	listLinks:function(){
		var $ = Zepto || false;
		if($){
			$('.app_links').on('tap',function(){
				var _url = $(this).attr("data-url");//URL
				var _id = $(this).attr("data-id") || _url;//ID
				var _checklogin = $(this).attr("data-checklogin") || false;//检测登录状态
				var _autoShow = $(this).attr("data-autoShow") || false;//显示load动画

				GHUTILS.OPENPAGE({
					url:_url,
					id:_id,
					autoShow:_autoShow
				})
			});
		}
	},
	linkPages:function(){
		var $ = Zepto || false;
		if($){
			$('.app_link_pages').off().on('tap',function(){
				var _links = $(this).attr("data-links") || "";//URL
				var _title = $(this).attr("data-title") || "";//TITLE
				var _autoShow = $(this).attr("data-autoShow") || true;//显示load动画
				
				if(_links == ""){
					return
				}
				
				GHUTILS.OPENPAGE({
					url:"../index/index-linkpage.html",
					id:GHUTILS.PAGESID.LINKPAGES,
					autoShow:_autoShow,
					extras:{
						links:_links,
						title:_title
					}
				})
			});
		}
	},
	//获取客服热线
	getHotline: function(obj1, obj2){
		GHUTILS.LOAD({
			url: GHUTILS.API.CMS.elementConfig+'?codes=["hotline"]',
			type: "post",
			callback: function(result){
				if(GHUTILS.checkErrorCode(result) && result.datas.length > 0){
					result.datas.forEach(function(e, i){
						switch (e.code){
							case "hotline" : 
								if(obj1){
									obj1.html(e.content)
								}
								if(obj2){
									obj2.off().on('tap', function() {
										GHUTILS.phoneCall(e.content.trim().replace(/\-/g,''));
									})
								}
								break
							default : break
						}
					})
				}
			}
		})
	},
	//拨打电话 num 为电话号码
	phoneCall:function(num){
		var btnArray = ['否', '是'];
		mui.confirm('是否要打电话询问客服？', '提示', btnArray, function(e) {
			if (e.index == 1) {
				if (mui.os.plus) {
					plus.device.dial(num);
				} else {
					location.href = 'tel:' + num;
				}
			}
		})
	},
	//判断是否实名认证或是否设置支付密码
	checkDepWit: function(){
		var iftrue = true
		if(!GHUTILS.getLocalUserInfo('paypwd')){
			GHUTILS.toast('请先设置支付密码');
			GHUTILS.OPENPAGE({
				url: "../../html/usermgmt/usermgmt-dealpwd.html",
				id: GHUTILS.PAGESID.DEALPWD,
				extras: {
					type: "set"
				}
			})
			iftrue = false;
		} else if (!GHUTILS.getLocalUserInfo('bankCardNum')) {
			GHUTILS.toast('请先绑卡');
			GHUTILS.OPENPAGE({
				url: "../../html/usermgmt/usermgmt-bankcard-add.html",
				id: GHUTILS.PAGESID.BANKCARDADD
			})
			iftrue = false;
		}
		return iftrue;
	},
	//判断是否设置支付密码
	checkDealpwd: function(){
		var iftrue = true
		if(!GHUTILS.getLocalUserInfo('paypwd')){
			GHUTILS.toast('请先设置支付密码');
			GHUTILS.OPENPAGE({
				url: "../../html/usermgmt/usermgmt-dealpwd.html",
				id: GHUTILS.PAGESID.DEALPWD,
				extras: {
					type: "set"
				}
			})
			iftrue = false;
		}
		return iftrue;
	},
	//活期产品根据不同状态返回收益率和万份收益数据
//	switchShowType: function(tradeObj, detail, showSign){
//		if(!tradeObj){
//			return {"interestSec": 0, "profit": 0}
//		}
//		var annualInterestSec = [], rewardYieldRange = [], tenThsPerDayProfit = [], rewardTenThsProfit = [];
//		var annualInterestSec0 = "", annualInterestSec1 = "", rewardYieldRange1 = "";
//		var tenThsPerDayProfit0 = "", tenThsPerDayProfit1 = "", rewardTenThsProfit1 = "";
//		var interestSec = "", profit = "";
//		switch (tradeObj.showType) {
//			case "1" : annualInterestSec = tradeObj.annualInterestSec.split("-");
//					   annualInterestSec0 = annualInterestSec[0].replace('%','');
//					   annualInterestSec1 = annualInterestSec[1].replace('%','');
//					   if(detail){
//							interestSec = tradeObj.annualInterestSec;
//					   }else if(showSign){
//							interestSec = annualInterestSec0+showSign+"-"+annualInterestSec1
//					   }else{
//							interestSec = annualInterestSec0+"-"+annualInterestSec1
//					   }
//					   if(tradeObj.rewardInterest){
//					   		interestSec += "+"+GHUTILS.toFixeds(tradeObj.rewardInterest, 2)
//					   }
//					   tenThsPerDayProfit = tradeObj.tenThsPerDayProfit.split("-");
//					   tenThsPerDayProfit0 = tenThsPerDayProfit[0];
//					   tenThsPerDayProfit1 = tenThsPerDayProfit[1];
//					   profit = GHUTILS.toFixeds(tenThsPerDayProfit0,2,'')+"-"+GHUTILS.toFixeds(tenThsPerDayProfit1,2,'')
//					   break
//			case "2" : if(detail){
//							interestSec = tradeObj.annualInterestSec;
//					   }else{
//							interestSec = tradeObj.annualInterestSec.replace('%','');
//					   }
//					   if(tradeObj.rewardInterest){
//					   		interestSec += "+"+GHUTILS.toFixeds(tradeObj.rewardInterest, 2)
//					   }
//					   profit = GHUTILS.toFixeds(tradeObj.tenThsPerDayProfit,2,'');
//					   break
//			case "4" : annualInterestSec = tradeObj.annualInterestSec.split("-");
//					   annualInterestSec1 = parseFloat(annualInterestSec[1].replace('%',''));
//					   rewardYieldRange = tradeObj.rewardYieldRange.split("-");
//					   if(rewardYieldRange.length == 1){
//							rewardYieldRange1 = parseFloat(rewardYieldRange[0].replace('%',''));
//					   }else{
//							rewardYieldRange1 = parseFloat(rewardYieldRange[1].replace('%',''));
//					   }
//					   tenThsPerDayProfit = tradeObj.tenThsPerDayProfit.split("-");
//					   tenThsPerDayProfit0 = tenThsPerDayProfit[0];
//					   tenThsPerDayProfit1 = parseFloat(tenThsPerDayProfit[1]);
//					   rewardTenThsProfit = tradeObj.rewardTenThsProfit.split("-");
//					   if(rewardTenThsProfit.length == 1){
//							rewardTenThsProfit1 = parseFloat(rewardTenThsProfit[0]);
//					   }else{
//							rewardTenThsProfit1 = parseFloat(rewardTenThsProfit[1]);
//					   }
//					   if(detail){
//							annualInterestSec0 = annualInterestSec[0];
//							interestSec = annualInterestSec0+"-"+GHUTILS.toFixeds(annualInterestSec1 + rewardYieldRange1,2,'%')
//					   }else if(showSign){
//							annualInterestSec0 = annualInterestSec[0].replace('%',showSign);
//							interestSec = annualInterestSec0+"-"+GHUTILS.toFixeds(annualInterestSec1 + rewardYieldRange1,2)
//					   }else{
//							annualInterestSec0 = annualInterestSec[0].replace('%','');
//							interestSec = annualInterestSec0+"-"+GHUTILS.toFixeds(annualInterestSec1 + rewardYieldRange1,2,'')
//					   }
//					   profit = GHUTILS.toFixeds(tenThsPerDayProfit0,2,'')+"-"+GHUTILS.toFixeds(tenThsPerDayProfit1 + rewardTenThsProfit1,2,'')
//					   break
//			case "5" : annualInterestSec0 = parseFloat(tradeObj.annualInterestSec.replace('%',''));
//					   rewardYieldRange = tradeObj.rewardYieldRange.split("-");
//					   if(rewardYieldRange.length == 1){
//							rewardYieldRange1 = parseFloat(rewardYieldRange[0].replace('%',''));
//					   }else{
//							rewardYieldRange1 = parseFloat(rewardYieldRange[1].replace('%',''));
//					   }
//					   tenThsPerDayProfit0 = parseFloat(tradeObj.tenThsPerDayProfit);
//					   rewardTenThsProfit = tradeObj.rewardTenThsProfit.split("-");
//					   if(rewardTenThsProfit.length == 1){
//							rewardTenThsProfit1 = parseFloat(rewardTenThsProfit[0]);
//					   }else{
//							rewardTenThsProfit1 = parseFloat(rewardTenThsProfit[1]);
//					   }
//					   if(detail){
//							interestSec = GHUTILS.toFixeds(annualInterestSec0,2,'')+"%-"+GHUTILS.toFixeds(annualInterestSec0 + rewardYieldRange1,2,'%')
//					   }else if(showSign){
//							interestSec = GHUTILS.toFixeds(annualInterestSec0,2,showSign)+"-"+GHUTILS.toFixeds(annualInterestSec0 + rewardYieldRange1,2)
//					   }else{
//							interestSec = GHUTILS.toFixeds(annualInterestSec0,2,'')+"-"+GHUTILS.toFixeds(annualInterestSec0 + rewardYieldRange1,2,'')
//					   }
//					   profit = GHUTILS.toFixeds(tenThsPerDayProfit0,2,'')+"-"+GHUTILS.toFixeds(tenThsPerDayProfit0 + rewardTenThsProfit1,2,'')
//					   break
//			default : break
//		}
//		
//		return {"interestSec": interestSec, "profit": profit}
//	},
	switchShowType: function(tradeObj){
		if(!tradeObj){
			return {"interestSec": 0,"profit": 0}
		}
		var annualInterestSec = [];
		var annualInterestSec0 = "", annualInterestSec1 = "";
		var interestSec = "", profit = "";
		
		if(tradeObj.annualInterestSec.split("-").length > 1){
			annualInterestSec = tradeObj.annualInterestSec.split("-");
			annualInterestSec0 = annualInterestSec[0].replace('%','');
			annualInterestSec1 = annualInterestSec[1].replace('%','');
			
//			if(tradeObj.rewardInterest){
//				annualInterestSec0 = GHUTILS.toFixeds(GHUTILS.Fadd(annualInterestSec0, tradeObj.rewardInterest), 2)
//				annualInterestSec1 = GHUTILS.toFixeds(GHUTILS.Fadd(annualInterestSec1, tradeObj.rewardInterest), 2)
//			}
			
			if(tradeObj.rewardYieldRange){
				var rewardYield = tradeObj.rewardYieldRange.replace(/\%/g,'').split('-')
				if(rewardYield.length == 1){
					annualInterestSec1 = GHUTILS.toFixeds(GHUTILS.Fadd(annualInterestSec1, rewardYield[0]), 2)
				}else{
					annualInterestSec1 = GHUTILS.toFixeds(GHUTILS.Fadd(annualInterestSec1, rewardYield[1]), 2)
				}
			}
			
			interestSec = annualInterestSec0 + "-" + annualInterestSec1
		}else{
			interestSec = tradeObj.annualInterestSec.replace('%','');
//			if(tradeObj.rewardInterest){
//				interestSec = GHUTILS.toFixeds(GHUTILS.Fadd(interestSec, tradeObj.rewardInterest), 2)
//			}
			
			if(tradeObj.rewardYieldRange){
				var rewardYield = tradeObj.rewardYieldRange.replace(/\%/g,'').split('-')
				if(rewardYield.length == 1){
					interestSec += '-' + GHUTILS.toFixeds(GHUTILS.Fadd(interestSec, rewardYield[0]), 2)
				}else{
					interestSec += '-' + GHUTILS.toFixeds(GHUTILS.Fadd(interestSec, rewardYield[1]), 2)
				}
			}
		}
		
		if(tradeObj.rewardInterest){
			interestSec += '%+' + GHUTILS.toFixeds(tradeObj.rewardInterest, 2)
		}
		
		var tenThsPerDayProfit = tradeObj.tenThsPerDayProfit.split('-')
		if(tradeObj.rewardTenThsProfit){
			if(tenThsPerDayProfit.length > 1){
				if(tradeObj.rewardTenThsProfit.split('-').length > 1){
					profit = tenThsPerDayProfit[0] + '-' + GHUTILS.Fadd(tenThsPerDayProfit[1], tradeObj.rewardTenThsProfit.split('-')[1])
				}else{
					profit = tenThsPerDayProfit[0] + '-' + GHUTILS.Fadd(tenThsPerDayProfit[1], tradeObj.rewardTenThsProfit)
				}
			}else{
				if(tradeObj.rewardTenThsProfit.split('-').length > 1){
					profit = tenThsPerDayProfit[0] + '-' + GHUTILS.Fadd(tenThsPerDayProfit[0], tradeObj.rewardTenThsProfit.split('-')[1])
				}else{
					profit = tenThsPerDayProfit[0] + '-' + GHUTILS.Fadd(tenThsPerDayProfit[0], tradeObj.rewardTenThsProfit)
				}
			}
		}else{
			profit = tradeObj.tenThsPerDayProfit
		}
		
		return {"interestSec": interestSec,"profit": profit}
	},
	/**
	 * get cookie
	 * @param {Object} cookie
	 * @param {Object} name
	 */
	getCookie: function(cookie, name) {
		var str = "; " + cookie + "; ",
			index = str.indexOf("; " + name + "=");
		if (index != -1) {
			var tempStr = str.substring(index + name.length + 3, str.length),
				target = tempStr.substring(0, tempStr.indexOf("; "));
			return decodeURIComponent(target);
		}
		return null;
	}
};

