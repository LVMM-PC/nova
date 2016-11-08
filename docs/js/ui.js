/**
 * Created by twili on 16/11/03.
 */

$(function () {

    var ui = nova.ui();

    $("#render").on("click", function () {
        ui.render();
    });

    $("#unrender").on("click", function () {
        ui.unrender();
    });

    $("#submit").on("click", function () {
        var serialized = $("form").serialize();
        console.log(serialized);
    });

});
