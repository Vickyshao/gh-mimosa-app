/**
 * 签到红包
 */
mui.init();
(function($) {
	var LOGININ = function(){
		this.ws  = plus.webview.currentWebview();
		return this;
	}
	LOGININ.prototype = {
		init:function(){
			this.pageInit();//页面初始化   
			this.bindEvent();//事件绑定
		},
		pageInit:function(){
			var _this = this;
			_this.ws.setStyle({"popGesture": "none"})
			_this.getData();
		},		
		getData:function(){
			var _this = this;
			//获取金额
			GHUTILS.LOAD({
				url:GHUTILS.API.CHA.getEventInfo,
				data:{
					eventType:'sign',
					couponType:'coupon'
				},
				type:'post',
				callback:function(result){
					console.log("显示金额="+JSON.stringify(result));
					if(result.errorCode == 0 && result.money !=null){
						var temp = result.money.toFixed(2);
						document.getElementById("app_signIn_money").innerText = temp;
					}
				}
			})
		},
		bindEvent:function(){
			var _this = this;
			//签到弹窗关闭
			document.getElementById("app_signIn_close").addEventListener("tap",function(){
				console.log("关闭");
				mui.back();
				if(_this.ws.goUpdata){
					mui.fire(plus.webview.getLaunchWebview(), "indexLoaded");
				}
			})
			
			//签到成功，马上使用
			$("#app_signIn_use").on("tap",function(){
				//关闭签到成功页面
				mui.fire(plus.webview.getLaunchWebview(), "showtab",{
					tabindex: 1,
					elm:'app_producttn',
					goUpdata: _this.ws.goUpdata
				});
				
				var signIn = plus.webview.getWebviewById("SIGNIN_SUCCESS");
				plus.webview.close(signIn);
			})
		}
	}
	mui.plusReady(function(){
		var sett = new LOGININ();
		sett.init();
	});
	
//	$(function(){
//		var info = new LOGININ();
//			info.init();
//	})
})(Zepto);