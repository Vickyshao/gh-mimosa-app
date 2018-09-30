/*
 Title:首页
 Author:yang sen
 Date:2016-6-4 18:31:00
 Version:v1.0
*/
(function($) {
	
	var DYNAMICMAIN = function(){
		this.ws = null;
		return this;
	}
	DYNAMICMAIN.prototype = {
		init:function(){
//			GHUTILS.setUserAgent();
			this.pageInit();//页面初始化
			this.bindEvent();//事件绑定
			this.getData();//获取数据
		},
		pageInit:function(){
			var _this = this;
			mui.init({
				gestureConfig:{
					doubletap:true
				},
				subpages:[{
	     	 		url:'index-dynamic.html',//下拉刷新内容页面地址
	      			id:GHUTILS.PAGESID.DYNAMIC,
	      			styles:{
						top: GHUTILS.setTop(45)+'px',
						bottom: '0px',
					}
	    		}]
	   		});
	   		
		},		
		getData:function(){
			var _this = this;
			
		},
		bindEvent:function(){
			var _this = this;

		}
	}
	mui.plusReady(function(){

		var hp = new DYNAMICMAIN();
			hp.init();
	});
})(Zepto);