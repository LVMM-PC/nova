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
        // 横线数量
        horizontalCount: 3,
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
            }
        }
    };

    //创建新的对象
    function Factory(options) {
        //合并参数
        options = $.extend({}, defalt, options);
        //构造新的图标对象
        return new novaChart(options);
    }

    //图标对象
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
            this.render(options.data);
        },
        /**
         * 初始化点
         * @param
         */
        initPoints: function (data) {
            var fixHeight = 0;
            this.data = data;
            this.dataLength = data.length;
            this.points = [];
            // 图标上最高点Y的值
            var yMaxValue = this.calExtremum(1.3);
            for (var i = 0; i < this.dataLength; i++) {
                var thisData = this.data[i];
                var xValue = thisData.xAxis.value;
                var yValue = thisData.yAxis.value;
                var point = {
                    x: (this.canvasWidth / this.dataLength) * (i + 0.5),
                    y: this.canvasHeight + (-yValue / yMaxValue) * this.canvasHeight + fixHeight * this.ratio,
                    xValue: xValue,
                    yValue: yValue
                };
                this.points.push(point);
            }
            console.log(this.points)
        },
        /**
         * 计算最大最小值
         * @param scale 图表可显示范围为 0-(scale*最高价格)
         */
        calExtremum: function(scale) {
            // 最大/小值索引
            this.minIndex = 0;
            this.maxIndex = 0;
            var min = this.data[this.minIndex].yAxis.value;
            var max = min;
            for (var i = 0; i < this.dataLength; i++) {
                // 寻找最大最小值
                if (this.data[i].yAxis.value < min) {
                    this.minIndex = i;
                    min = this.data[i].yAxis.value;
                }
                if (this.data[i].yAxis.value > max) {
                    this.maxIndex = i;
                    max = this.data[i].yAxis.value;
                }
            }
            return max * scale;
        },
        // 绘制图标
        render: function (data) {
            // 初始化点
            this.initPoints(data);

            this.renderBasic();

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
            this.drawGrid(this.options.horizontalCount);
        },
        // 清空画布：canvas每当高度或宽度被重设时，画布内容就会被清空
        clearCanvas: function () {
            this.canvas.height = this.canvasHeight;
        },
        /**
         * 画网格
         * @param horizontalCount 横线数量
         */
        drawGrid: function () {
            this.ctx.lineWidth = this.options.theme.borderLineStyle.width;
            this.ctx.strokeStyle = this.options.theme.borderLineStyle.color;
            // 画边框
            this.ctx.strokeRect(0.5, 0.5, this.canvasWidth - 1, this.canvasHeight - 1);
            // 画横线
            this.ctx.beginPath();
            for (var i = 1; i <= this.options.horizontalCount; i++) {
                this.ctx.moveTo(0, this.canvasHeight / (this.options.horizontalCount + 1) * i - 0.5);
                this.ctx.lineTo(this.canvasWidth, this.canvasHeight / (this.options.horizontalCount + 1) * i - 0.5);
            }
            // 画竖线
            // for (var i = 1; i <= this.dataLength; i++) {
            //     this.ctx.moveTo(this.canvasWidth / this.dataLength * i, 0);
            //     this.ctx.lineTo(this.canvasWidth / this.dataLength * i, this.canvasHeight);
            // }
            this.ctx.closePath();
            this.ctx.stroke();
        },
        /**
         * 绘制折线图
         */
        renderLineChart: function () {
            //先画线
            for (var i = 0; i < this.dataLength-1; i++) {
                var p = this.points[i];
                var q = this.points[i + 1];
                this.drawLine(p, q);
            }

            // 后画点
            for (var j = 0; j < this.dataLength; j++) {
                var p = this.points[j];
                this.drawPoint(p);
            }

            //填充下方
            this.fillBottom();
        },
        /**
         * 画点
         */
        drawPoint: function(p) {
            var x = p.x;
            var y = p.y;
            var radius = this.options.theme.circleStyle.radius;
            this.ctx.lineWidth = 1;

            // 第1个实心圆
            this.ctx.beginPath();
            this.ctx.fillStyle = this.options.theme.circleStyle.color;
            this.ctx.arc(x, y, radius * this.ratio, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fill();
            // 第2个实心圆
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgb(255,255,255)";
            this.ctx.arc(x, y, (radius-1) * this.ratio, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fill();
        },
        /**
         * 画线
         * @param p 第1个点
         * @param q 第2个点
         */
        drawLine: function(p, q) {
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
        },
        /**
         * 折线图下方
         */
        fillBottom: function() {
            this.ctx.fillStyle = this.options.theme.fillBottomStyle.color;
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.canvasHeight);
            for (var i = 0; i < this.dataLength; i++) {
                var p = this.points[i];
                this.ctx.lineTo(p.x, p.y);
            }
            this.ctx.lineTo(this.canvasWidth, this.canvasHeight);
            this.ctx.fill();
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