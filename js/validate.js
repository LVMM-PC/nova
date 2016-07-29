/*!
 * Validate.js
 * 2016-03-15
 * 2016-06-12
 * Sheng Jiang
 * 1.0.0.0
 */

(function (window, $, nova) {

    "use strict";

    if (nova.validate) {
        return false;
    }

    var $document = $(document);  //文档
    var $body = $("body");  //body

    /**
     * 工厂类
     * @constructor
     */
    function Factory(options) {
        options = $.extend({}, Factory.defaults, options);
        return new Validate(options);
    }

    //默认值
    Factory.defaults = {
        target: "body",  //校验区域
        triggerEvent: "change",  //默认改变触发
        rules: {},
        validateCallback: null
    };

    /**
     * 日历类
     * @constructor
     */
    function Validate(options) {
        this.init(options);
    }

    //原型属性方法
    Validate.prototype = {

        //版本号
        version: "1.0.0.0",

        //构造函数
        construction: Validate,

        //析构函数
        destruction: function () {

        },

        //初始化
        init: function (options) {
            this.options = options;
            this.defaults = Factory.defaults;

            this.bindEvent();
        },

        //验证单个input
        validateInput: function (ruleDetails, rule, $input) {

            var inputValidate = true;

            var rules = this.options.rules;
            var validateCallback = this.options.validateCallback;

            for (var ruleDetail in ruleDetails) {
                var thatMessage = rules[rule][ruleDetail + "-message"];

                var val = $input.val();

                var method = this.methods[ruleDetail];
                if (method && $.isFunction(method)) {
                    var result = true;

                    if (ruleDetail !== "required" && val.length === 0) {
                        result = true;
                    } else {
                        result = method.call(this, val, $input);
                    }

                    if (validateCallback && $.isFunction(validateCallback)) {
                        validateCallback.call(this, result, val, $input, thatMessage);
                    }
                    if (result === false) {
                        inputValidate = false;
                        break;
                    }

                }

            }

            return inputValidate;
        },

        //绑定事件
        bindEvent: function () {
            var rules = this.options.rules;
            var self = this;

            for (var rule in rules) {
                (function (rule) {

                    $document.on("change", rule, function () {
                        var $input = $(this);
                        var ruleDetails = rules[rule];

                        self.validateInput(ruleDetails, rule, $input);
                    });

                })(rule)
            }
        },

        //获取是否验证通过
        getValidate: function () {
            var rules = this.options.rules;

            var isThatAllRight = true;

            for (var rule in rules) {
                var $inputs = $(rule);
                var ruleDetails = rules[rule];

                for (var index = 0; index < $inputs.length; index++) {
                    var $input = $inputs.eq(index);

                    var ret = this.validateInput(ruleDetails, rule, $input);
                    if (!ret) {
                        isThatAllRight = false;
                    }

                }
            }

            return isThatAllRight;
        },

        //验证方法
        methods: {
            //必填
            required: function (value, element) {
                return value.length > 0;
            },
            //邮箱
            email: function (value, element) {
                // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
                // Retrieved 2014-01-14
                // If you have a problem with this implementation, report a bug against the above spec
                // Or use custom methods to implement your own email validation
                return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },
            //身份证
            idCard: function (value, element) {

                function calcChecksum(rid) {
                    var arr = rid.split('').reverse();

                    function w(i) {
                        return Math.pow(2, i - 1) % 11;
                    }

                    function s() {
                        var sum = 0;
                        for (var j = 0; j < 17; j++) {
                            sum += arr[j] * w(j + 2);
                        }

                        return sum;
                    }

                    return (12 - (s() % 11)) % 11;
                }

                function idCard18Test(idNumber) {

                    //region 身份证是否是17位数字+一位校验位
                    var idCard18Regular = /^\d{17}[0-9X]$/;

                    var regularTestResult = idCard18Regular.test(idNumber);
                    if (!regularTestResult) {
                        return false;
                    }
                    //endregion

                    //region 身份证生日是否合法
                    var year;
                    var month;
                    var date;

                    year = parseInt(idNumber.substr(6, 4), 10);
                    month = parseInt(idNumber.substr(10, 2), 10);
                    date = parseInt(idNumber.substr(12, 2), 10);

                    var birthday = new Date(year, month - 1, date);
                    if (birthday.getFullYear() !== year ||
                        birthday.getMonth() !== (month - 1) ||
                        birthday.getDate() !== date) {
                        return false;
                    }
                    //endregion

                    //region 校验位是否正确
                    var rid = idNumber.substr(0, 17);
                    var code = idNumber.substr(17, 1);

                    var calcCode = (calcChecksum(rid));
                    if (parseInt(code, 10) === calcCode ||
                        (code === "X" && calcCode === 10)) {

                    } else {
                        return false;
                    }
                    //endregion

                    return true;

                }

                function idCard15Test(idNumber) {

                    //region 身份证是否是15位数字
                    var idCard15Regular = /^\d{15}$/;

                    var regularTestResult = idCard15Regular.test(idNumber);
                    if (!regularTestResult) {
                        return false;
                    }
                    //endregion

                    //region 身份证生日是否合法
                    var year;
                    var month;
                    var date;

                    year = parseInt("19" + idNumber.substr(6, 2), 10);
                    month = parseInt(idNumber.substr(8, 2), 10);
                    date = parseInt(idNumber.substr(10, 2), 10);

                    var birthday = new Date(year, month - 1, date);
                    if (birthday.getFullYear() !== year ||
                        birthday.getMonth() !== (month - 1) ||
                        birthday.getDate() !== date) {
                        return false;
                    }
                    //endregion

                    //region 产品经理要求15个1验证不通过
                    if (idNumber === "111111111111111") {
                        return false;
                    }
                    //endregion

                    return true;

                }

                var idNumber = value.toUpperCase();
                var size = idNumber.length;
                if (size === 18) {
                    return idCard18Test(idNumber);
                }
                if (size === 15) {
                    return idCard15Test(idNumber);
                }
                return false;

            },
            "chinese-and-english": function (value, element) {
                return /^[a-zA-Z\u4e00-\u9fa5\s]+$/.test(value);
            },
            chinese: function (value, element) {
                return /^[\u4e00-\u9fa5]+$/.test(value);
            },
            english: function (value, element) {
                return /^[a-zA-Z\s]+$/.test(value);
            },
            mobile: function (value, element) {
                return /^\d{11}$/.test(value);
            },
            "mobile-strict": function (value, element) {
                return /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17\d{1})|(18([0-4]|[5-9])))\d{8}$/.test(value);
            },
            zip: function (value, element) {
                return /^\d{6}$/.test(value);
            },
            address: function (value) {
                return value.length >= 5;
            }
        }

    };

    nova.validate = Factory;
    window.nova = nova;

    for (var c in Validate) {
        if (typeof Validate[c] === "function") {
            Factory[c] = Validate[c]
        }
    }

})(window, jQuery, window.nova || {});
