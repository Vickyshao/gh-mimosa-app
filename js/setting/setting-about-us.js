/*
 Title:关于我们
 Author:
 Date:2016-6-20 
 Version:v1.0
*/
mui.init();
(function($) {
	
	//初始化页面连接
	GHUTILS.listLinks();
	
	var ABOUTUS = function(){
		this.ws = null;
		return this;
	}
	ABOUTUS.prototype = {
		init:function(){
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			GHUTILS.getHotline(false, $("#app_contactService"));
		},		
		getData:function(){
			var _this = this;
//			plus.runtime.getProperty(plus.runtime.appid, function ( wgtinfo ) {
//			    //如果是检测版本，把版本号写入  
//			    console.log("wgtinfo.version==="+wgtinfo.version)
//				document.getElementById("app_txt_ver").innerHTML ='Ver : ' + wgtinfo.version;
//			})
		},
		bindEvent:function(){
			//初始化页面连接
			GHUTILS.listLinks();
			
//			$("#wechat").on('tap',function(){
//				GHUTILS.copyToClip($(this).find("span").html())
//				GHUTILS.OPENPAGE({
//					url:"setting-about-us-wechat.html",
//				})
//				GHUTILS.nativeUI.showWaiting();
//			});
		}
	}
	mui.plusReady(function(){
		var sett = new ABOUTUS();
			sett.init();
	});
})(Zepto);