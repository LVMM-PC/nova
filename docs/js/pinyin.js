/**
 * author: Yin Han
 * date: 2017-07-17
 */
$(function() {
    var py = novaPinyin();

    var $result = $(".pinyin-result");
    var $polyphoneResult = $(".pinyin-polyphone-result");
    var $fuxingResult = $(".fuxing-result");
    var $xingResult = $(".xing-result");
    var $mingResult = $(".ming-result");

    // 汉字转拼音：不支持多音字
    $(".pinyin-input").on("input", function() {
        var result = py.getPinyin($(this).val()) || "请输入正确的汉字";
        $result.html(result);
    })

    // 汉字转拼音：支持多音字
    $(".pinyin-polyphone-input").on("input", function() {
        var result = py.getPinyin($(this).val(), {
            isPolyphone: true
        });
        result = result.length ? JSON.stringify(result) : "请输入正确的汉字";
        $polyphoneResult.html(result);
    })

    // 复姓测试
    $(".fuxing-input").on("input", function() {
        var inputValue = $.trim($(this).val());
        var result = "请输入正确的汉字姓名";
        if (inputValue) {
            result = py.getFuxingPinyinByName(inputValue);
            result = result ? "复姓：" + result : "单姓"
        }
        $fuxingResult.html(result);
    })

    // 姓名转拼音
    $(".name-input").on("input", function() {
        var inputValue = $.trim($(this).val());
        var lastName = inputValue.slice(0, 2);
        var firstName = inputValue.slice(2, length);
        var length = inputValue.length;
        var fuxingTestResult = py.getFuxingPinyinByName(inputValue);
        // 测试是否为复姓
        if (fuxingTestResult) {
            $xingResult.val(fuxingTestResult);
        } else {
            lastName = inputValue.slice(0, 1);
            firstName = inputValue.slice(1, length);
            handlePolyphone(lastName, $xingResult);
        }
        handlePolyphone(firstName, $mingResult);
    })

    function handlePolyphone(chinese, $element) {
        var isPolyphone = false;
        var pinyinArr = py.getPinyin(chinese, {
            isPolyphone: true
        });
        for (var i = 0, len = pinyinArr.length; i < len; i++) {
            var obj = pinyinArr[i];
            for (var j in obj) {
                if (obj[j].indexOf(",") != -1) {
                    isPolyphone = true;
                }
            }
        }
        if (isPolyphone) {
            $element.val("");
            var $test = $(generateHtml(pinyinArr))
            $("body").append($test);
            $element.data("py", $test);
        } else {
            $element.val(py.getPinyin(chinese, {
                separator: ""
            }));
        }
    }

    function generateHtml(pinyinArr) {
        return "<div>你好</div>";
    }

})
