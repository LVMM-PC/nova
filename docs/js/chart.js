$(function () {
    var data = [
        {
            xAxis: {
                value: "07-11",
                text: "07-11/周二"
            },
            yAxis: {
                value: "350",
                text: "<em>￥</em>350<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-12",
                text: "07-12/周三"
            },
            yAxis: {
                value: "400",
                text: "<em>￥</em>400<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-13",
                text: "07-14/周四"
            },
            yAxis: {
                value: "360",
                text: "<em>￥</em>360<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-14",
                text: "07-14/周五"
            },
            yAxis: {
                value: "600",
                text: "<em>￥</em>600<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-15",
                text: "07-15/周六"
            },
            yAxis: {
                value: "440",
                text: "<em>￥</em>440<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-16",
                text: "07-16/周日"
            },
            yAxis: {
                value: "320",
                text: "<em>￥</em>320<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-17",
                text: "07-17/周一"
            },
            yAxis: {
                value: "470",
                text: "<em>￥</em>470<small>起</small>"
            }
        }
    ];
    nova.chart({
        chartBoxSelector: '.chart-box',
        data: data
    });
});