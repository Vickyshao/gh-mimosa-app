/*
 Title:开发者模式
 Author:yang sen
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
mui.init();
(function($) {
	var SETTING = function() {
		this.ws = null;
		return this;
	}
	SETTING.prototype = {
		init: function() {
			this.pageInit(); //页面初始化
			this.bindEvent(); //事件绑定
		},
		pageInit: function(){
			if(localStorage.getItem("localhostconfig")){
				switch(JSON.parse(localStorage.getItem("localhostconfig"))["local"]){
//					case "demo" : 
//						$(".app_cmain").eq(0).html("✓")
//						break
					case "py24" : 
						$(".app_cmain").eq(0).html("✓")
						break
					case "jb50" : 
						$(".app_cmain").eq(1).html("✓")
						break
					default : break
				}
			}else{
				var localhostconfig = {
					"local": "py24",
					"HOST": "http://pydemo.guohuaitech.com",
					"channelOid": "8a9b94df5b89fe09015b8a9c87eb00ba",
					"cid": "111111",
					"ckey": "111111",
					"cmsChannelOid": "8a9b94df5b89fdcd015b8e5d181b0000"
				}
				localStorage.setItem("localhostconfig", JSON.stringify(localhostconfig))
				$(".app_cmain").eq(0).html("✓")
			}
		},
		bindEvent: function() {
			$(".app-touchid").off().on("tap", function(){
				var _this = this;
				if($(_this).children().eq(1).html() == ""){
					var btnArray = ['取消', '确定'];
					mui.confirm('切换环境将会退出当前账号并重启app，确定要切换吗？', '切换到'+$(_this).children().eq(0).html()+'环境', btnArray, function(e) {
						if (e.index == 1) {
							GHUTILS.loginOut(function(){
								$(".app_cmain").html("")
								$(_this).children().eq(1).html("✓")
								
								var localhostconfig = {}
								switch($(_this).children().eq(0).html()){
//									case "demo" : 
//										localhostconfig = {
//											"local": "demo",
//											"HOST": "http://demo.guohuaitech.com",
//											"channelOid": "8a9de9a35b47385b015b473ddee10007",
//											"cid": "123456",
//											"ckey": "123456",
//											"cmsChannelOid": "8a9de9a35b473f7b015b474124400000"
//										}
//										break
									case "py24" : 
										localhostconfig = {
											"local": "py24",
											"HOST": "http://pydemo.guohuaitech.com",
											"channelOid": "8a9b94df5b89fe09015b8a9c87eb00ba",
											"cid": "111111",
											"ckey": "111111",
											"cmsChannelOid": "8a9b94df5b89fdcd015b8e5d181b0000"
										}
										break
									case "jb50" : 
										localhostconfig = {
											"local": "jb50",
											"HOST": "http://jbdemo.guohuaitech.com",
											"channelOid": "8a9b94df5b89fe09015b8a9d680a00bb",
											"cid": "654321",
											"ckey": "654321",
											"cmsChannelOid": "8a9b935a5b8a26d3015b8e5dec530000"
										}
										break
									default : break
								}
								localStorage.setItem("localhostconfig", JSON.stringify(localhostconfig))
								plus.runtime.restart();
							})
						}
					})
				}
			})
		}
	}
	mui.plusReady(function() {
		var sett = new SETTING();
		sett.init();
	});
})(Zepto);