/**
 * author: Yin Han
 * date: 2017-07-17
 */
$(function() {
    var py = novaPinyin();

    var $result = $(".pinyin-result");
    var $xingResult = $(".xing-result");
    var $mingResult = $(".ming-result");

    // 汉字转拼音
    $(".pinyin-input").on("input", function() {
        var result = py.getPinyin($(this).val()) || "请输入正确的汉字";
        $result.html(result);
    })

    // 姓名转拼音
    $(".name-input").on("input", function() {
        var result = py.getNamePinyin($(this).val());
        var xing = result.lastName || "请输入正确的姓";
        var ming = result.firstName || "请输入正确的名";
        $xingResult.html(xing);
        $mingResult.html(ming);
    })
})
