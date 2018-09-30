/*
 Title:手势锁屏
 Author:yang sen
 Date:2016年6月16日16:51:56
 Version:v1.0
*/

(function(){
        window.H5lock = function(obj){

            if(!obj.elm){
                alert("elm missing");
            }

            this.height = obj.height || 320;
            this.width = obj.width || 320;
            this.times = obj.times || 3;//缩放比
            this.elm = obj.elm ; 
            this.chooseType =  obj.chooseType || 3;
            this.orbitLine = obj.orbitLine || 'true';//是否显示轨迹
            this.lineColor = obj.lineColor || "#ff7f1a";//线颜色
            this.pointColor = obj.pointColor || "#ff7f1a";//点颜色
            this.arcColor = obj.arcColor || "#ccc";//圆颜色
            this.sucColor = obj.sucColor || "#ff7f1a";//成功颜色
            this.errColor = obj.errColor || "#ff3535";//失败颜色
            this.callBack = obj.callBack || function(){};
        };


        H5lock.prototype.drawCle = function(x, y) { // 初始化解锁密码面板
        	var self = this;
            this.ctx.strokeStyle = this.arcColor;
            this.ctx.lineWidth = self.times;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.r+25, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        H5lock.prototype.drawPoint = function() { // 初始化圆心
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.fillStyle = this.pointColor;
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
        H5lock.prototype.drawStatusPoint = function(type) { // 初始化状态线条
        	var self = this;
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.strokeStyle = type;
                this.ctx.lineWidth = self.times;
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r+25, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
        H5lock.prototype.drawLine = function(po, lastPoint) {// 解锁轨迹
        	var self = this;
            this.ctx.beginPath();
            this.ctx.lineWidth = self.times;
            this.ctx.strokeStyle = this.lineColor;
            this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
            for (var i = 1 ; i < this.lastPoint.length ; i++) {
                this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
            }
            this.ctx.lineTo(po.x, po.y);
            this.ctx.stroke();
            this.ctx.closePath();

        }
        H5lock.prototype.createCircle = function() {// 创建解锁点的坐标，根据canvas的大小来平均分配半径

            var n = this.chooseType;
            var count = 0;
            this.r = this.ctx.canvas.width / (2 + 4 * n);// 公式计算
            this.lastPoint = [];
            this.arr = [];
            this.restPoint = [];
            var r = this.r;
            for (var i = 0 ; i < n ; i++) {
                for (var j = 0 ; j < n ; j++) {
                    count++;
                    var obj = {
                        x: j * 4.5 * r + 2.5 * r,
                        y: i * 4.5 * r + 2.5 * r,
                        index: count
                    };
                    this.arr.push(obj);
                    this.restPoint.push(obj);
                }
            }
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            for (var i = 0 ; i < this.arr.length ; i++) {
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }
            //return arr;
        }
        H5lock.prototype.getPosition = function(e) {// 获取touch点相对于canvas的坐标
        	var self = this;
            var rect = e.currentTarget.getBoundingClientRect();
            
            //console.log(JSON.stringify(rect))
            
            var po = {
                x: (e.touches[0].clientX - rect.left)*self.times,
                y: (e.touches[0].clientY - rect.top)*self.times
              };
            return po;
        }
        H5lock.prototype.update = function(po) {// 核心变换方法在touchmove时候调用
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            for (var i = 0 ; i < this.arr.length ; i++) { // 每帧先把面板画出来
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }

            this.drawPoint(this.lastPoint);// 每帧花轨迹
            this.drawLine(po , this.lastPoint);// 每帧画圆心
			this.drawStatusPoint(this.lineColor);
            for (var i = 0 ; i < this.restPoint.length ; i++) {
                if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
                    this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
                    this.lastPoint.push(this.restPoint[i]);
                    this.restPoint.splice(i, 1);
                    break;
                }
            }

        }
        H5lock.prototype.formatPass = function(psw) {// 检测密码
            var p = '';
            for (var i = 0 ; i < psw.length ; i++) {
                p += psw[i].index;
            }
            return p;
        }
        H5lock.prototype.initDom = function(elmobj){
        	var self = this;
            var wrap = elmobj;
            //console.log(wrap)
            var str = '<canvas id="H5lockcanvas" width="'+ (self.width*self.times) +'" height="'+ (self.width*self.times) 
            			+'" style="width:'+ self.width +'px;height:'+ self.width +'px"></canvas>';
            //wrap.setAttribute('style','width: 320px;height: 320px;');
            wrap.innerHTML = str;
            //document.body.appendChild(wrap);
            
        }
        H5lock.prototype.init = function() {
            var _elm = this.elm;
            this.initDom(_elm);
            this.pswObj = {};
            this.lastPoint = [];
            //this.makeState();
            this.touchFlag = false;
            this.canvas = document.getElementById('H5lockcanvas');
            this.ctx = this.canvas.getContext('2d');
            //this.canvas.style.width = 320 + 'px';
            //this.canvas.style.height = 320 + 'px';
            this.createCircle();
            this.bindEvent();
        }
        H5lock.prototype.reset = function() {
            //this.makeState();
            this.createCircle();
        }
        H5lock.prototype.bindEvent = function() {
            var self = this;
            this.canvas.addEventListener("touchstart", function (e) {
                e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
                 var po = self.getPosition(e);
                 //console.log(JSON.stringify(po));
                 for (var i = 0 ; i < self.arr.length ; i++) {
                    if (Math.abs(po.x - self.arr[i].x) < (self.r * 1.5) && Math.abs(po.y - self.arr[i].y) < (self.r * 1.5)) {

                        self.touchFlag = true;
                        self.drawPoint(self.arr[i].x,self.arr[i].y);
                        self.lastPoint.push(self.arr[i]);
                        self.restPoint.splice(i,1);
                        break;
                    }
                 }
             }, false);
             this.canvas.addEventListener("touchmove", function (e) {
                if (self.touchFlag) {
                    self.update(self.getPosition(e));
                }
             }, false);
             this.canvas.addEventListener("touchend", function (e) {
                 if (self.touchFlag) {
                     self.touchFlag = false;
                     setTimeout(function(){

                        self.reset();
                    },100);
                    self.callBack(self.formatPass(self.lastPoint));
                 }


             }, false);
             document.addEventListener('touchmove', function(e){
                e.preventDefault();
             },false);
//           document.getElementById('updatePassword').addEventListener('click', function(){
//               self.updatePassword();
//            });
        }
})();
