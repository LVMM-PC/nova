/**
 * Created by twili on 16/07/27.
 */

$(function () {

    //生日日历
    var birthdayCalendar = lv.calendar({
        date: "1980-01-01 00:00",
        autoRender: false,
        trigger: ".JS_birthday",
        triggerEvent: "click",
        isBirthday: true,
        template: "birthday",
        minLimit: "1900-01",
        maxLimit: lv.calendar.dateFormat(new Date(), "yyyy-MM"),
        monthPrev: -1,
        monthNext: 0,
        dayPrev: -1,
        dayNext: 0
    });

    var myValidate = nova.validate({
        rules: {
            ".JS_non_empty": {
                "required": true
            },
            ".JS_chinese_and_english": {
                "chineseAndEnglish": true
            },
            ".JS_chinese": {
                "required": true,
                "chinese": true
            },
            ".JS_english": {
                "english": true
            },
            ".JS_mobile": {
                "required": true,
                "mobile": true
            },
            ".JS_email": {
                "required": true,
                "email": true
            },
            ".JS_birthday": {
                "required": true,
                "datetime": true
            },
            ".JS_address": {
                "required": true,
                "address": true
            },
            ".JS_zip_code": {
                "zip": true
            },
            ".JS_id_card": {
                "idCard": true
            }
        },
        message: {
            ".JS_non_empty": {
                "required": "非空校验，自定义报错内容。"
            },
            ".JS_chinese_and_english": {
                "chineseAndEnglish": "请输入姓名。"
            },
            ".JS_chinese": {
                "required": "请输入中文姓名。",
                "chinese": "中文姓名只能包含汉字，请重新输入。"
            },
            ".JS_english": {
                "english": "英文姓名只能包含字母，请重新输入。"
            },
            ".JS_mobile": {
                "required": "请输入证件号码。",
                "mobile": "手机号码必须为11位的数字，请重新输入。"
            },
            ".JS_email": {
                "required": "请输入邮箱地址。",
                "email": "电子邮箱格式不正确，请重新输入。"
            },
            ".JS_birthday": {
                "required": "请选择出生日期。",
                "datetime": "请选择出生日期。"
            },
            ".JS_address": {
                "required": "请输入正确的详细地址。",
                "address": "请输入正确的详细地址。"
            },
            ".JS_zip_code": {
                "zip": "邮政编码只能为6位数字，请重新输入。"
            },
            ".JS_id_card": {
                "required": "请输入证件号码。",
                "idCard": "请输入正确的身份证号码。"
            }
        },
        validateCallback: function (ret, val, $input, errorMessage) {
            // console.log(this);
            //
            // console.log("val: ", val);
            // console.log("ret: ", ret);
            // console.log("$input: ", $input);
            // console.log("errorMessage: ", errorMessage);

            var $parent = $input.parent();
            var $tsText = $parent.find(".ts_text");
            var $errorText = $parent.find(".error_text");

            if (ret) {
                $errorText.hide();
            } else {
                $tsText.hide();
                $errorText.html(errorMessage);
                $errorText.show();
            }

        }
    });

    $(".btn_fk").on("click", function () {
        var validated = myValidate.getValidate();
        console.log(validated);
    })

});
