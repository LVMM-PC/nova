/*!
 * chart.js
 * 2017-12
 * 印韩春
 * 1.0.0.0
 */
//驴妈妈图标组件
(function (window, $, nova) {

    "use strict";

    var defalt = {
        chartID: null,
        chartType: 'line',
        data: [
            {
                xAxis: {
                    value: "07-11",
                    text: "07-11/周二"
                },
                yAxis: {
                    value: "100",
                    text: "<em>￥</em>100<small>起</small>"
                }
            }
        ],
        //折线图下方填充
        fillBottom: true,
        // 最大最小值
        minMax: {
            shown: true,
            prefix: "￥"
        },
        // 主题颜色
        theme: {
            // 边框线（包括中间横线）
            borderLineStyle: {
                width: 1,
                color: "rgb(221,221,221)"
            },
            // 折线图点之间连线
            dataLineStyle: {
                width: 2,
                color: "rgb(255,136,0)"
            },
            // 折线图圆点
            circleStyle: {
                radius: 4,
                color: "rgb(255,136,0)"
            },
            // 折线图底部填充
            fillBottomStyle: {
                color: "rgba(255,136,0,0.15)"
            },
            // 坐标轴标识
            axisStyle: {
                font: "12px 'Helvetica Neue',Helvetica,Arial,sans-serif",
                color: "rgb(51,51,51)"
            },
            // 最大、最小值
            minMax: {
                font: "12px 'Helvetica Neue',Helvetica,Arial,sans-serif",
                color: "rgb(255,102,0)"
            }
        }
    };

    //创建新的对象
    function Factory(options) {
        //合并参数
        options = $.extend({}, defalt, options);
        //构造新的图表对象
        return new novaChart(options);
    }

    //图表对象
    function novaChart(options) {
        this.init(options);
    };

    novaChart.prototype = {
        constructor: novaChart,
        init: function (options) {
            //共享参数
            this.options = options;
            this.$chartBox = $(options.chartBoxSelector);
            this.width = this.$chartBox.width();
            this.height = this.$chartBox.height();
            this.$chartBox.append("<canvas width="+this.width+" height="+this.height+"></canvas>");
            this.$chart = this.$chartBox.find("canvas");
            this.canvas = this.$chart[0];
            this.ctx = this.canvas.getContext("2d");
            // 适配高分屏
            this.ratio = this.getPixelRatio(this.ctx);
            this.canvasWidth = this.$chart.width() * this.ratio;
            this.canvasHeight = this.$chart.height() * this.ratio;
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
            // y轴标识宽度为35
            this.chartWidth = this.canvasWidth - 35*this.ratio;
            // 图表上方距离10
            this.topOffset = 10*this.ratio;
            // x轴标识高度为20
            this.chartHeight = this.canvasHeight - 20*this.ratio - this.topOffset;
            this.render(options.data);
        },
        /**
         * 初始化点
         * @param data
         */
        initPoints: function (data) {
            this.data = data;
            this.dataLength = data.length;
            this.points = [];
            // 计算图标上最高点Y的值
            this.calMinMax();
            for (var i = 0; i < this.dataLength; i++) {
                var thisData = this.data[i];
                var xValue = thisData.xAxis.value;
                var yValue = thisData.yAxis.value;
                var point = {
                    x: (this.chartWidth / this.dataLength) * (i + 0.5)+ (this.canvasWidth-this.chartWidth),
                    y: this.chartHeight + (-yValue / this.yMaxValue) * this.chartHeight + this.topOffset,
                    xValue: xValue,
                    yValue: yValue
                };
                this.points.push(point);
            }
        },
        /**
         * 计算最大最小值
         */
        calMinMax: function() {
            // 最大值系数
            var scale = 1.25;
            // 最大/小值索引
            this.minIndex = 0;
            this.maxIndex = 0;
            var min = this.data[this.minIndex].yAxis.value;
            var max = min;
            for (var i = 0; i < this.dataLength; i++) {
                var value = parseInt(this.data[i].yAxis.value);
                // 寻找最大最小值
                if ( value < min) {
                    this.minIndex = i;
                    min = value;
                }
                if (value > max) {
                    this.maxIndex = i;
                    max = value;
                }
            }
            this.yMaxValue = parseInt((max*scale/100)+1)*100;
        },
        // 绘制图标
        render: function (data) {
            this.renderBasic();

            // 初始化点
            this.initPoints(data);

            if (this.options.chartType == 'line') {
                this.renderLineChart();
            } else {
                this.renderBarChart();
            }
        },
        // 绘制空白图
        renderBasic: function () {
            // 清空画布
            this.clearCanvas();
            // 绘制网格
            this.drawGrid();
        },
        // 清空画布：canvas每当高度或宽度被重设时，画布内容就会被清空
        clearCanvas: function () {
            this.canvas.height = this.canvasHeight;
        },
        /**
         * 画网格
         */
        drawGrid: function () {
            // 横线数量
            var horizontalCount = 4;
            this.ctx.lineWidth = this.options.theme.borderLineStyle.width;
            this.ctx.strokeStyle = this.options.theme.borderLineStyle.color;
            // 画边框
            this.ctx.strokeRect(0.5+(this.canvasWidth-this.chartWidth), 0.5+this.topOffset, this.chartWidth - 1, this.chartHeight - 1);
            // 画横线
            this.ctx.beginPath();
            for (var i = 1; i <= horizontalCount; i++) {
                var yHeight = this.chartHeight / (horizontalCount + 1) * i - 0.5 + this.topOffset;
                this.ctx.moveTo(this.canvasWidth-this.chartWidth, yHeight);
                this.ctx.lineTo(this.canvasWidth, yHeight);
            }
            // 画竖线
            // for (var i = 1; i <= this.dataLength; i++) {
            //     this.ctx.moveTo(this.chartWidth / this.dataLength * i, 0);
            //     this.ctx.lineTo(this.chartWidth / this.dataLength * i, this.chartHeight);
            // }
            this.ctx.closePath();
            this.ctx.stroke();
        },
        /**
         * 绘制折线图
         */
        renderLineChart: function () {
            // 画y轴标识
            var horizontalCount = 4; // 横线数量
            this.ctx.font = this.options.theme.axisStyle.font;
            this.ctx.fillStyle = this.options.theme.axisStyle.color;
            this.ctx.textAlign = "right";
            var x = this.canvasWidth-this.chartWidth-4*this.ratio;//-4是为了右边间距
            for(var i=0;i<=horizontalCount+1;i++){
                var value = ""+this.yMaxValue/5*i;
                var y = this.chartHeight / (horizontalCount + 1) * (horizontalCount+1-i)+4*this.ratio+this.topOffset;//+4是为了水平居中
                this.ctx.fillText(value, x, y);
            }

            //最大最小值
            if(this.options.minMax.shown) {
                this.ctx.font = this.options.theme.minMax.font;
                this.ctx.fillStyle = this.options.theme.minMax.color;
                this.ctx.textAlign = "center";
                var minPoint = this.points[this.minIndex];
                var maxPoint = this.points[this.maxIndex];
                var prefix = this.options.minMax.prefix;
                this.ctx.fillText(prefix+minPoint.yValue, minPoint.x, minPoint.y+20*this.ratio);
                this.ctx.fillText(prefix+maxPoint.yValue, maxPoint.x, maxPoint.y-10*this.ratio);
            }

            //填充折线图下方
            if(this.options.fillBottom){
                this.ctx.fillStyle = this.options.theme.fillBottomStyle.color;
                this.ctx.beginPath();
                this.ctx.moveTo(this.canvasWidth-this.chartWidth, this.chartHeight+this.topOffset);
                for (var i = 0; i < this.dataLength; i++) {
                    var p = this.points[i];
                    this.ctx.lineTo(p.x, p.y);
                }
                this.ctx.lineTo(this.canvasWidth, this.chartHeight+this.topOffset);
                this.ctx.fill();
            }

            //先画线
            for (var i = 0; i < this.dataLength-1; i++) {
                var p = this.points[i];
                var q = this.points[i + 1];
                var x1 = p.x;
                var y1 = p.y;
                var x2 = q.x;
                var y2 = q.y;
                this.ctx.lineWidth = this.options.theme.dataLineStyle.width * this.ratio;
                this.ctx.strokeStyle = this.options.theme.dataLineStyle.color;
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.stroke();
            }

            // 后画点
            for (var j = 0; j < this.dataLength; j++) {
                var p = this.points[j];
                var x = p.x;
                var y = p.y;
                var radius = this.options.theme.circleStyle.radius;
                this.ctx.lineWidth = 1;

                // // 第1个实心圆
                this.ctx.beginPath();
                this.ctx.fillStyle = this.options.theme.circleStyle.color;
                this.ctx.arc(x, y, radius * this.ratio, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.fill();
                // // 第2个实心圆
                this.ctx.beginPath();
                this.ctx.fillStyle = "rgb(255,255,255)";
                this.ctx.arc(x, y, (radius-1) * this.ratio, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.fill();
                // 画标识
                this.ctx.font= this.options.theme.axisStyle.font;
                this.ctx.fillStyle = this.options.theme.axisStyle.color;
                this.ctx.textAlign= "center";
                this.ctx.fillText(p.xValue, p.x, this.canvasHeight);
            }
        },
        /**
         * 适配高分屏
         */
        getPixelRatio: function () {
            var ctx = this.ctx;
            var backingStore = ctx.backingStorePixelRatio ||
                ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        }
    };

    //加载图标
    nova.chart = Factory;
    window.nova = nova;

})(window, jQuery, window.nova || {});