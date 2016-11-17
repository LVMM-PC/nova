/**
 * Created by twili on 16/11/04.
 */
$(function () {
    $.ajax({
        url: "header.html",
        dataType: "html"
    }).done(function (html) {
        $("body").prepend(html);
    }).fail(function () {

    })
});
