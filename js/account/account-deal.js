/*
 Title:交易明细
 Author:chen
 Date:2016-6-19 16:03:00
 Version:v1.0
*/
(function($) {
	var ACCOUNT_DEAL = function() {
		this.ws = null;
		this.counter = 1;
		this.rows = 10;
		this.tradeType = "";
		this.nodata = false;
		this.pullobj = null;
		this.dataLoading = true;
		return this;
	}
	ACCOUNT_DEAL.prototype = {
		init: function() {
			this.pageInit(); //页面初始化
			this.bindEvent();
		},
		pageInit: function() {
			var _this = this;
			_this.ws = plus.webview.currentWebview();

			if (_this.ws.type != undefined) {
				_this.tradeType = _this.ws.type;
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCDEALPT), "changeTitle", {
					title: "提现成功"
				});
				$(".app-tixian").addClass("app_active");
			}

			if (GHUTILS.getloginStatus(true)) {

				mui(".mui-scroll").pullToRefresh({
					up: {
						auto: true,
						callback: function() {
							_this.pullobj = this;
							setTimeout(function() {
								if(_this.dataLoading){
									_this.getData();
								}
							}, 500);
						}
					}
				});
				_this.getData();
			}

			//监听弹出筛选弹层
			document.addEventListener("showMenu", function(e) {
				_this.showMenu(e.detail.show);
			});

			//监听列表
			document.addEventListener("showList", function(e) {
				_this.tradeType = "";
				_this.reloadData();
			});

		},

		getData: function() {
			var _this = this;
			var myDate  = new Date();
			//月
			var _m = (myDate.getMonth()+1);
			_m = _m >9 ? _m : "0" + _m;
			//日+1
			var _d = myDate.getDate() + 1;			
			_d = _d >9 ? _d : "0" + _d;
			//开始时间：去年时间
			var startDate = myDate.getFullYear() - 1  + "-" + _m + "-" + _d;	
			//结束时间：明年时间(正式环境就取当前时间)
			var endDate = myDate.getFullYear() + 1 + "-" + _m + "-" + _d;
			
			//请求数据标识，防止重复请求
			_this.dataLoading = false;
			GHUTILS.LOAD({
				url: GHUTILS.buildQueryUrl(GHUTILS.API.CHA.prot0qrydetail, {
					page: _this.counter,
					rows: _this.rows,
					orderType: _this.tradeType
				}),
				data: {},
				async: true,
				callback: function(result) {
					_this.dataLoading = true;
					if (GHUTILS.checkErrorCode(result)) {
						
						var tradeList = result.rows;
						_this.counter += 1;
						var tradeHtml = '';
						for (var i in tradeList) {
							tradeHtml += _this.getTradeHtml(tradeList[i]);
						}

						if (tradeList.length < 10 || $.isEmptyObject(tradeList)) {
							_this.nodata = true;
						}
						$("#tradeList").append(tradeHtml);

						if (_this.nodata && $('#tradeList').html() == "") {
							_this.nodata = true;
							//无数据
						}
						if(_this.pullobj){
							_this.pullobj.endPullUpToRefresh(_this.nodata);
						}
						
						plus.nativeUI.closeWaiting();
					}
				},
				errcallback: function(result) {
					_this.dataLoading = true;
					_this.pullobj.endPullUpToRefresh(true);
				}
			});
		},
		showMenu: function(show) {
			var _this = this;
			var obj = $(".app_dialog");
			if (show == "hide") {
				obj.removeClass("app_show");

				setTimeout(function() {
					obj.removeClass("app_active");
				}, 500);
			} else {
				obj.addClass("app_active");
				setTimeout(function() {
					obj.addClass("app_show");
				}, 50);
			}
		},
		bindEvent: function() {
			var _this = this;

			$('.app_links').on('tap', function() {
				_this.tradeType = JSON.parse($(this).attr("data-tradeType"));
				$(".app_links").removeClass("app_active");
				$(this).addClass("app_active");
				$(".app_dialog").removeClass("app_show");
				$(".app_icon_box").removeClass("app_active");
				var _txt = $(this).find(".app_sort_list_txt").html();
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCDEALPT), "changeTitle", {
					title: _txt
				});
				mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCDEALPT), "closeAfilter");
				_this.reloadData();
				_this.showMenu('hide');
				GHUTILS.nativeUI.showWaiting();
			});

			$("#app_dialog_box").on("tap", function(e) {
				if (e.target.id == 'app_dialog_box') {
					_this.showMenu('hide');
					mui.fire(plus.webview.getWebviewById(GHUTILS.PAGESID.ACCDEALPT), "closeAfilter");
				}
			});

		},
		getTradeHtml: function(tradeObj) {
			var _this = this;
			var tradeNum = tradeObj.orderCode;
			
            var itemHtml = '<ul class="mui-table-view mui-grid-view app_mt10"><li class="mui-table-view-cell mui-col-xs-3 mui-text-left"><div class="app_pl10">交易流水</div><div class="app_pl10 app_mt15">交易金额</div><div class="app_pl10 app_mt15">交易时间</div><div class="app_pl10 app_mt15">交易状态</div></li><li class="mui-table-view-cell mui-col-xs-6 mui-text-left"><div class=""> '+ tradeNum + '</div><div class=" app_mt15">'+GHUTILS.formatCurrency(tradeObj.orderAmount)+'元</div><div class=" app_mt15">'+tradeObj.orderTime+'</div>'+ '<div class=" app_mt15">'+ tradeObj.orderStatusDisp +'</div>' +'</li><li class="mui-table-view-cell mui-col-xs-3 mui-text-right"><div class="app_cmain app_f12">'+tradeObj.orderTypeDisp+'</div></li></ul>';
//			
			return itemHtml;
		},
		reloadData: function() {
			var _this = this;
			if (_this.tradeType == "") {
				$(".app_links").removeClass("app_active");
			}
			_this.nodata = false;
			_this.counter = 1;
			mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
			if(_this.pullobj){
				_this.pullobj.refresh(true);
			}
			$('#tradeList').html('');
			_this.getData();
		}
	}
	mui.plusReady(function() {
		var ad = new ACCOUNT_DEAL();
		ad.init();
	});
})(Zepto);