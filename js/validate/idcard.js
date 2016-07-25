/**
 * Created by twili on 16/07/25.
 */

"use strict";

/**
 * 计算校验位
 * https://zh.wikipedia.org/wiki/中华人民共和国公民身份号码
 * @param rid 身份证前17位
 * @returns {number} 校验码
 */
// must input 17 bit string of RID from left to right
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
    var idCard18Regular = /\d{17}[0-9X]/;

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
    var idCard15Regular = /\d{15}/;

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

function idCardTest(idNumber) {
    idNumber = idNumber.toUpperCase();
    var size = idNumber.length;
    if (size === 18) {
        return idCard18Test(idNumber);
    }
    if (size === 15) {
        return idCard15Test(idNumber);
    }
    return false;
}
