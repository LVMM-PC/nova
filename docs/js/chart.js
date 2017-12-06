$(window).on("load", function() {
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
        }, {
            xAxis: {
                value: "07-18",
                text: "07-18/周二"
            },
            yAxis: {
                value: "350",
                text: "<em>￥</em>350<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-19",
                text: "07-19/周三"
            },
            yAxis: {
                value: "560",
                text: "<em>￥</em>560<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-20",
                text: "07-20/周四"
            },
            yAxis: {
                value: "480",
                text: "<em>￥</em>480<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-21",
                text: "07-21/周五"
            },
            yAxis: {
                value: "640",
                text: "<em>￥</em>640<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-22",
                text: "07-22/周六"
            },
            yAxis: {
                value: "420",
                text: "<em>￥</em>420<small>起</small>"
            }
        }, {
            xAxis: {
                value: "07-23",
                text: "07-23/周日"
            },
            yAxis: {
                value: "410",
                text: "<em>￥</em>410<small>起</small>"
            }
        }
    ];
    nova.chart({
        chartBoxSelector: '.chart-box',
        width: 800,
        height: 400,
        data: data,
        mousemoveCallback: function (point) {
            console.log(point)
        },
        mouseleaveCallback: function () {
            console.log("leave")
        }
    });

});

