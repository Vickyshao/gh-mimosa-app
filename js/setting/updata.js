/*
 Title:软件升级
 Author:yang sen
 Date:2015-7-24 10:08:57
 Version:v1.0
*/

//定义全局变量
var	localUpData = null;//存储本地的升级信息
var	serverUpDataOS = null;//服务器的最新版本信息--区分机型后的
var serverUpData=null;//服务器的最新版本信息--原始数据

var	downLoader = null;//下载变量
var serverUpDataLocal=null;
var localWgtVersion=null; //本地增量版本
var UPDATA = {},
	upDataUrl = GHUTILS.API.CMS.upDataUrl;
	
	UPDATA = {
		upDataInit:function(callback){
			var _this = this;			
			var	upDataArr = {};
			//获取本地版本信息  
			localUpData = localStorage.getItem("localUpData") || '{}';
			//本地版本信息解析
			localUpData = JSON.parse(localUpData);
			
			plus.runtime.getProperty( plus.runtime.appid, function ( wgtinfo ) {
				//本地包升级记录版本号
								
                //本地增量版本信息
                
//              if(!localUpData.wgtversion){
//              	localWgtVersion=0;
//              }else{
//				    localWgtVersion=localUpData.wgtversion;
//              }
                //初始化本地升级记录
				upDataArr = {
					"appid":wgtinfo.appid,
					"version":wgtinfo.version,
					"wgtversion":"",
					"ignoreversion":"",
					"checkTime":(new Date()).getTime(),
					
				}
				if( localUpData != {} ){
					upDataArr.ignoreversion = localUpData.ignoreversion;
					upDataArr.checkTime = localUpData.checkTime;
				}
                upDataArr.wgtversion=(wgtinfo.version).split(".")[2].toString();
                localWgtVersion = upDataArr.wgtversion;
				localUpData = upDataArr;
				_this.checkVersion(callback);
			} );
		},	
		checkVersion:function(callback){
			var _this = this;
			var  nd = new Date();
			nd = nd.getTime();
			GHUTILS.LOAD(
			{
					url: upDataUrl + "?t=" + nd,
					data: {
					},
					type: "post",
					async: true,
					callback: function(d) {
						serverUpData = d ;
						console.log(JSON.stringify(d))
						
						if(　serverUpData.errorCode ){
							return
						}
						
						if(plus.os.name =="iOS"){
							serverUpDataOS = serverUpData.ios;
						}else if(plus.os.name =="Android"){
							serverUpDataOS = serverUpData.Android;
						}
						if(!serverUpDataOS.version){
							serverUpDataOS.version=localUpData.version;
						}
						if(!serverUpData.wgtversionNO){
							serverUpData.wgtversionNO=localUpData.wgtversion;
						}
						serverUpDataLocal=serverUpDataOS;
						serverUpDataLocal.wgtversionNO = serverUpData.wgtversionNO;

						// 本地主版本
						var localVersion = (localUpData.version).split(".")[0].toString();
						var serverVersion = (serverUpDataOS.version).split(".")[0].toString();
						
						//本地次版本
						var localMversion = (localUpData.version).split(".")[1].toString();
						var serverMversion = (serverUpDataOS.version).split(".")[1].toString();
						//增量版本
						var localWgtver =(localUpData.version).split(".")[2].toString();
                        var serverWgtver=0;
                        
                        //三位增量版本前两位
                        var wgtVersion = 0;
						var wgtMversion = 0;
                    	if(serverUpData.wgtversionNO.indexOf(".") < 0){
							serverWgtver=serverUpData.wgtversionNO;
                    	}else{
							wgtVersion = serverUpData.wgtversionNO.split(".")[0].toString();
							wgtMversion = serverUpData.wgtversionNO.split(".")[1].toString();
							serverWgtver=serverUpData.wgtversionNO.split(".")[2].toString();
						}

						//对比主版本号和次主版本号。
						if( Number(localVersion) < Number(serverVersion) || (Number(localVersion) == Number(serverVersion) && Number(localMversion) < Number(serverMversion)) ){
							console.log("发现新版本更新  -   -   -------")
							//判断是否为忽略版本号
							var checkInterval = Number(serverUpDataOS.checkInterval) * 86400000;//1天(d)=86400000毫秒(ms)
							var checkTime = Number(localUpData.checkTime);
							var nowDate = (new Date()).getTime();
							//升级提示
							var showAlert = function(){
								plus.nativeUI.closeWaiting();

								var sub = plus.webview.create("html/index/index-mask.html", GHUTILS.PAGESID.MASK, {background:"transparent",top: '0',bottom: '0'}, {
								       desc: serverUpDataOS.description,
								       versionNo:serverUpDataOS.version,
								       localUpData:localUpData,
								       serverUpDataLocal:serverUpDataLocal
							        });
									sub.show();
							}
							//新版本提示

							//判断是否强制更新 是 || 否 ： 1 || 0
							if( serverUpDataOS.Compulsory == "0" ){
								console.log("============-----------------===============");
								//判断检测时间 
								if( (nowDate - checkTime) > checkInterval || localUpData.ignoreversion != serverUpDataOS.version){
									showAlert();
								}else{
									plus.nativeUI.closeWaiting();
								}
							}else{
								showAlert();
							}
						}else{
							if(serverUpData.wgtversionNO.indexOf(".") < 0){
								if(Number(localVersion) == Number(serverVersion) && Number(localMversion) == Number(serverMversion) && Number(localWgtver) < Number(serverWgtver)){
									console.log("发现一位增量更新============  -   -   -------")
									if(plus.networkinfo.getCurrentType() !== 3){
//										if(plus.networkinfo.getCurrentType() === 6){
											mui.confirm("有新的内容更新,是否下载?","",["否","是"],function(e){
												if(e.index == 1){
													serverUpDataOS.wgtversionNO=localWgtVersion;
													_this.downLoadWgt(serverUpData.wgturl);
												}
											})
//										}
									}else{
										serverUpDataOS.wgtversionNO=localWgtVersion;
										_this.downLoadWgt(serverUpData.wgturl);
									}
								}
							}else if(Number(localVersion) == Number(wgtVersion) && Number(localMversion) == Number(wgtMversion) && Number(localWgtver) < Number(serverWgtver)){
								console.log("发现三位增量更新============  -   -   -------")
								if(plus.networkinfo.getCurrentType() !== 3){
//									if(plus.networkinfo.getCurrentType() === 6){
										mui.confirm("有新的内容更新,是否下载?","",["否","是"],function(e){
											if(e.index == 1){
												serverUpDataOS.wgtversionNO=localWgtVersion;
												_this.downLoadWgt(serverUpData.wgturl);
											}
										})
//									}
								}else{
									serverUpDataOS.wgtversionNO=localWgtVersion;
									_this.downLoadWgt(serverUpData.wgturl);
								}
							}
						}
					}
			});
		},
		downLoadWgt:function(url){
			var _this = this;
            var options = {method:"GET",filename:"_doc/update/"};
            var f = 0;
            url=HOST+url;
            downLoader = plus.downloader.createDownload( url, options);
            downLoader.start();
            downLoader.addEventListener( "statechanged", function(data,status){
                switch(data.state) {
                    case 1: // 开始
                    break;
                    case 2: // 已连接到服务器
                    break;
                    case 3:
                        var p = data.downloadedSize/data.totalSize*100;
                        if(p >= f){ 
                        	f += 10;
                        	console.log(p);
                        }
                    break;
                    case 4: // 下载完成
                        _this.installWgt(data.filename);
                    break;
                }
            } );
		},
		installWgt:function(path){
			var _this = this;
            console.log("开始安装文件=================")
    		plus.runtime.install(path,{force: true},function(){

        		console.log("安装wgt文件成功！");
        		//本地储存写入
        	   serverUpDataOS.wgtversionNO=serverUpData.wgtversionNO;
        		UPDATA.setLocalUpData(localUpData,serverUpDataOS);
    		},function(e){
        		plus.nativeUI.closeWaiting();

        		plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    		});
		},
		downLoaderCancl:function(){
			downLoader.abort();//取消下载
//			maskpage.hide(); 
			
		},
		upDataConfirm:function(){
			var btnArray = ['是', '否'];
			plus.nativeUI.confirm('发现新版本是否更新', function(e) {				
				if (e.index == 0) {
					GHUTILS.globalTips({version:"0"});
					UPDATA.downLoaderNew(serverUpDataOS);
				}
			},'新版本提示', btnArray );
		},
		downLoaderNew:function(serverUpDataOS){
			var loadUrl=HOST+serverUpDataOS.url;
			var os=mui.os;
			if(os.ios){
				loadUrl=serverUpDataOS.url;
			}else{
				loadUrl=HOST+serverUpDataOS.url+"?realname="+serverUpDataOS.fileName;
			} 

			console.log("loadUrl==========="+loadUrl)
			plus.runtime.openURL( loadUrl, function ( e ) {
				console.log( "默认浏览器打开失败: " + e.message );
				mui.toast("默认浏览器打开失败,更新不成功");
			} );
		},
		setLocalUpData:function(localUpDataA,serverUpDataLocalA){
			var _this = this;
			console.log("写入本地数据=======");
			localUpData = {
					"appid":"",
					"version":"",
					"wgtversion":"",
					"ignoreversion":"",
					"checkTime":(new Date()).getTime(),
					
				}
				// 本地主版本
			var localVersion = (localUpDataA.version).split(".")[0].toString();
			var serverVersion = (serverUpDataLocalA.version).split(".")[0].toString();
						
			//本地次版本
			var localMversion = (localUpDataA.version).split(".")[1].toString();
			var serverMversion = (serverUpDataLocalA.version).split(".")[1].toString();
			//增量版本
			var localWgtver=localUpDataA.wgtversion;
			var serverWgtver=0
			
			//三位增量版本前两位
			var wgtVersion = 0;
			var wgtMversion = 0;
			if(serverUpDataLocalA.wgtversionNO.indexOf(".") < 0){
				serverWgtver = serverUpDataLocalA.wgtversionNO;
			}else{
				wgtVersion = serverUpDataLocalA.wgtversionNO.split(".")[0].toString();
				wgtMversion = serverUpDataLocalA.wgtversionNO.split(".")[1].toString();
				serverWgtver = serverUpDataLocalA.wgtversionNO.split(".")[2].toString();
			}
			//1,本地主版本号小于服务器版本  
			//2，本地主版本号等于、大于服务器版本   增量版本小于服务器版本
			if( Number(localVersion) < Number(serverVersion) || (Number(localVersion) == Number(serverVersion) && Number(localMversion) < Number(serverMversion)) ){//如果小于服务器以服务器为准
//				localUpData.version=serverUpDataLocalA.version;
//				localUpData.wgtversion=serverWgtver;
				localUpData.ignoreversion=serverUpDataLocalA.version;
			}else{//增量版本小于服务器的
				if(serverUpDataLocalA.wgtversionNO.indexOf(".") < 0){
					if(Number(localVersion) == Number(serverVersion) && Number(localMversion) == Number(serverMversion) && Number(localWgtver) < Number(serverWgtver)){
//						localUpData.version=serverUpDataLocalA.version;
//					    localUpData.wgtversion=serverWgtver;
					    localUpData.ignoreversion=serverUpDataLocalA.version;
					}
				}else if(Number(localVersion) == Number(wgtVersion) && Number(localMversion) == Number(wgtMversion) && Number(localWgtver) < Number(serverWgtver)){
//					localUpData.version=serverUpDataLocalA.version;
//				    localUpData.wgtversion=serverWgtver;
				    localUpData.ignoreversion=serverUpDataLocalA.version;
				}
			}
			localStorage.setItem("localUpData", JSON.stringify(localUpData));
		}, 
		checkNetWork:function(){
			GHUTILS.LOAD(Config.host,{},function(){},{tipscode:1,errcode:602,errcb:function(){
				setTimeout(function(){
					var btnArray = ['是', '否'];
					mui.confirm('当前网络断开，是否重试？', '提示', btnArray, function(e) {
						if (e.index == 0) {
							plus.webview.currentWebview().reload(true);
						}
					})				
				},5000)
			}});
		}
		}

