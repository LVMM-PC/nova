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
                "required": true,
                "required-message": "非空校验，自定义报错内容。"
            },
            ".JS_chinese_and_english": {
                "chinese-and-english": true,
                "chinese-and-english-message": "请输入姓名。"
            },
            ".JS_chinese": {
                "required": true,
                "required-message": "请输入中文姓名。",
                "chinese": true,
                "chinese-message": "中文姓名只能包含汉字，请重新输入。"
            },
            ".JS_english": {
                "english": true,
                "english-message": "英文姓名只能包含字母，请重新输入。"
            },
            ".JS_mobile": {
                "required": true,
                "required-message": "请输入手机号码。",
                "mobile": true,
                "mobile-message": "手机号码必须为11位的数字，请重新输入。",
                "mobile-strict": true,
                "mobile-strict-message": '暂不支持您输入的号码段，请联系驴妈妈客服<span class="c_f60">1010-6060</span>进行反馈'
            },
            ".JS_email": {
                "required": true,
                "required-message": "请输入邮箱地址。",
                "email": true,
                "email-message": "电子邮箱格式不正确，请重新输入。"
            },
            ".JS_birthday": {
                "required": true,
                "required-message": "请选择出生日期。",
                "datetime": true,
                "datetime-message": "请选择出生日期。"
            },
            ".JS_address": {
                "required": true,
                "required-message": "请输入正确的详细地址。",
                "address": true,
                "address-message": "请输入正确的详细地址。"
            },
            ".JS_zip_code": {
                "zip": true,
                "zip-message": "邮政编码只能为6位数字，请重新输入。"
            },
            ".JS_id_card": {
                "required": true,
                "required-message": "请输入证件号码。",
                "idCard": true,
                "idCard-message": "请输入正确的身份证号码。"
            }
        },
        validateCallback: function (ret, val, $input, errorMessage) {

            var $parent = $input.parent();
            var $tsText = $parent.find(".ts_text");
            var $errorText = $parent.find(".error_text");
            var $successText = $parent.find(".success_text");
            if ($successText.length < 1) {
                $successText=$('<span class="nova-tip-form success_text"><span class="nova-icon-xs nova-icon-success"></span></span>')
                $parent.append($successText)
            }

            if (ret) {
                $tsText.hide();
                $errorText.hide();
                $successText.css("display", "inline-block");
            } else {
                $successText.hide();
                $tsText.hide();
                $errorText.html('<span class="nova-icon-xs nova-icon-error"></span>' + errorMessage);
                $errorText.css("display", "inline-block");
            }

        }
    });

    $(".btn_fk").on("click", function () {
        var validated = myValidate.getValidate();
        console.log(validated);
    })

});
