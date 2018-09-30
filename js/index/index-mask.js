/*
 Title:首页
 Author:
 Date:2016-6-20 
 Version:v1.0
*/
mui.init();
(function($) {

		
	var MASK = function(){
		this.ws  = plus.webview.currentWebview();
		this.versionInfo = {
		    desc:'',
			versionNo: ''
		};
		
		return this;
	}
	MASK.prototype = {
		init:function(){
			this.pageInit();//页面初始化   
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			
		},		
		getData:function(){
			var _this = this;
			var _this = this;
			GHUTILS.LOAD(
					{
						url: GHUTILS.API.CMS.upDataUrl,
						data: {
						},
						type: "post",
						async: true,
						callback: function(result) {
								var versionNo="";
								var description="";
	
								if(plus.os.name == "iOS"){
									versionNo = result.ios.version;
									description=result.ios.description;
								}else if(plus.os.name =="Android"){
									versionNo = result.Android.version;
									description=result.Android.description;
								}
	
								$("#app_version_verisonNo").html("发现新版本："+versionNo);
								$("#app_version_desc").html(description); 
						}
					});
		},
		bindEvent:function(){
			var _this = this;
			document.getElementById("app-updateVersion_next").addEventListener('tap', function() {
				_this.ws.serverUpDataLocal.checkTime=(new Date()).getTime();
				UPDATA.setLocalUpData(_this.ws.localUpData,_this.ws.serverUpDataLocal);
				mui.back();

			})
			document.getElementById("app_updateVersion_now").addEventListener('tap', function() {
			    mui.back();
			    console.log(_this.ws.serverUpDataLocal.version)
				UPDATA.downLoaderNew(_this.ws.serverUpDataLocal);
                UPDATA.setLocalUpData(_this.ws.localUpData,_this.ws.serverUpDataLocal);
			})
		}
	}
	mui.plusReady(function(){

		var sett = new MASK();
			sett.init();
	});
//		$(function(){
//		var info = new MASK();
//			info.init();
//	})
})(Zepto);