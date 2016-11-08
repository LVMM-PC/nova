/*!
 * ui.js
 * 2016-11-03
 * Sheng Jiang
 * 1.0.0.0
 */

(function (window, $, nova) {

    "use strict";

    if (nova.ui) {
        return false;
    }

    var $document = $(document);  //文档

    function Factory(options) {

        options = $.extend({}, Factory.defaults, options);
        return new UI(options);
    }

    /*
     <div class="nova-select">
     <div class="nova-select-toggle"><em>北京市</em></div>
     <div class="nova-select-dropdown">
     <div class="nova-select-optgroup">
     <div class="nova-select-optgroup-label">直辖市</div>
     <div class="nova-select-option">北京市</div>
     <div class="nova-select-option">天津市</div>
     <div class="nova-select-option">上海市</div>
     <div class="nova-select-option">重庆市</div>
     </div>
     <div class="nova-select-option">河北省</div>
     <div class="nova-select-option">山西省</div>
     <div class="nova-select-option">辽宁省</div>
     <div class="nova-select-option">吉林省</div>
     <div class="nova-select-option">黑龙江省</div>
     <div class="nova-select-option">江苏省</div>
     <div class="nova-select-option">浙江省</div>
     <div class="nova-select-option">安徽省</div>
     <div class="nova-select-option">福建省</div>
     <div class="nova-select-option">江西省</div>
     <div class="nova-select-option">山东省</div>
     <div class="nova-select-option">河南省</div>
     <div class="nova-select-option">湖北省</div>
     <div class="nova-select-option">湖南省</div>
     <div class="nova-select-option">广东省</div>
     <div class="nova-select-option">海南省</div>
     <div class="nova-select-option">四川省</div>
     <div class="nova-select-option">贵州省</div>
     <div class="nova-select-option">云南省</div>
     <div class="nova-select-option">陕西省</div>
     <div class="nova-select-option">甘肃省</div>
     <div class="nova-select-option">青海省</div>
     <div class="nova-select-option">台湾省</div>
     <div class="nova-select-optgroup">
     <div class="nova-select-optgroup-label">自治区</div>
     <div class="nova-select-option">内蒙古自治区</div>
     <div class="nova-select-option">广西壮族自治区</div>
     <div class="nova-select-option">西藏自治区</div>
     <div class="nova-select-option">宁夏回族自治区</div>
     <div class="nova-select-option">新疆维吾尔自治区</div>
     </div>
     <div class="nova-select-optgroup">
     <div class="nova-select-optgroup-label">特别行政区</div>
     <div class="nova-select-option">香港特别行政区</div>
     <div class="nova-select-option">澳门特别行政区</div>
     </div>
     </div>
     </div>
     */

    var template = {
        checkbox: '' +
        '<span class="nova-checkbox"></span>',
        radio: '' +
        '<span class="nova-radio"></span>',
        select: {
            main: '' +
            '<div class="nova-select">' +
            '<div class="nova-select-toggle"><em>{{text}}</em></div>' +
            '<div class="nova-select-dropdown">' +
            '{{dropdown}}' +
            '</div>' +
            '</div>',
            optgroup: '<div class="nova-select-optgroup">' +
            '<div class="nova-select-optgroup-label">{{label}}</div>' +
            '{{options}}' +
            '</div>',
            option: '<div class="nova-select-option">{{text}}</div>'
        }
    };

    Factory.defaults = {
        target: "body",
        template: template
    };

    function UI(options) {
        this.init(options);
    }

    UI.prototype = {

        //版本号
        version: "1.0.0.0",

        /**
         * 替换匹配的内容
         * @param str
         * @param obj
         * @returns {*}
         */
        replaceWith: function (str, obj) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    str = str.replace("{{" + i + "}}", obj[i]);
                }
            }
            return str;
        },

        //构造函数
        construction: UI,

        init: function (options) {
            this.options = options;
            this.defaults = Factory.defaults;
            this.bindEvent();
        },

        render: function () {
            this.checkboxRender();
            this.radioRender();
            this.selectRender()
        },

        selectRender: function () {

            var self = this;

            var $labels = $(this.options.target).find(".nova-select-label");

            $labels.each(function (index, ele) {
                var $label = $(ele);

                var $select = $label.find("select");
                var originIndex = $select.get(0).selectedIndex;

                function getOptHtml($children) {
                    var optHtml = "";

                    var size = $children.length;

                    for (var index = 0; index < size; index++) {
                        var $child = $children.eq(index);

                        if ($child.is("optgroup")) {
                            var label = $child.attr("label");
                            optHtml += getOptGroupHtml($child, label);
                        } else {
                            var text = $child.text();
                            optHtml += self.replaceWith(self.options.template.select.option, {
                                text: text
                            });
                        }
                    }

                    return optHtml;
                }

                function getOptGroupHtml($optgroup, label) {
                    var $children = $optgroup.children("option");
                    return self.replaceWith(self.options.template.select.optgroup, {
                        label: label,
                        options: getOptHtml($children)
                    });
                }

                var $selectChildren = $select.children();
                var optHtml = getOptHtml($selectChildren);

                var html = self.replaceWith(self.options.template.select.main, {
                    dropdown: optHtml
                });

                $select.hide();

                $label.find(".nova-select").remove();
                var $novaSelect = $(html);

                var $activeOption = $novaSelect.find(".nova-select-option").eq(originIndex);
                $activeOption.addClass("active");
                var text = $activeOption.text();
                $novaSelect.find(".nova-select-toggle em").text(text);
                var disabled = $select.prop("disabled");
                if (disabled) {
                    $novaSelect.addClass("disabled");
                }

                $label.append($novaSelect);
            })

        },

        unrender: function () {
            this.checkboxUnrender();
            this.radioUnrender();
            this.selectUnrender();
        },

        selectUnrender: function () {
            var $labels = $(this.options.target).find(".nova-select-label");
            $labels.find("select").show();
            $labels.find(".nova-select").remove();
        },

        checkboxUnrender: function () {
            var $label = $(this.options.target).find(".nova-checkbox-label");
            var $input = $label.find("input[type=checkbox]");
            var $checkbox = $label.find(".nova-checkbox");
            $input.show();
            $checkbox.remove();
        },

        radioUnrender: function () {
            var $label = $(this.options.target).find(".nova-radio-label");
            var $input = $label.find("input[type=radio]");
            var $radio = $label.find(".nova-radio");
            $input.show();
            $radio.remove();
        },

        checkboxRender: function () {
            var $labels = $(this.options.target).find(".nova-checkbox-label");
            var $inputs = $labels.find("input[type=checkbox]");
            var $checkboxs = $labels.find(".nova-checkbox");
            $inputs.hide();
            $checkboxs.remove();
            $inputs.after(this.options.template.checkbox);
            $inputs.each(function (index, ele) {
                var $ele = $(ele);
                var checked = $ele.prop("checked");
                var $checkbox = $ele.parents(".nova-checkbox-label").find(".nova-checkbox");
                if (checked) {
                    $checkbox.addClass("checked");
                } else {
                    $checkbox.removeClass("checked");
                }
            })
        },

        radioRender: function () {
            var $labels = $(this.options.target).find(".nova-radio-label");
            var $inputs = $labels.find("input[type=radio]");
            var $radios = $labels.find(".nova-radio");
            $inputs.hide();
            $radios.remove();
            $inputs.after(this.options.template.radio);

            $inputs.each(function (index, ele) {
                var $ele = $(ele);
                var checked = $ele.prop("checked");
                var $radio = $ele.parents(".nova-radio-label").find(".nova-radio");
                if (checked) {
                    $radio.addClass("checked");
                } else {
                    $radio.removeClass("checked");
                }
            })
        },

        bindEvent: function () {
            $(this.options.target).off("change", ".nova-checkbox-label input[type=checkbox]", this.checkboxChangeHandler);
            $(this.options.target).on("change", ".nova-checkbox-label input[type=checkbox]", {self: this}, this.checkboxChangeHandler);
            $(this.options.target).off("change", ".nova-radio-label input[type=radio]", this.radioChangeHandler);
            $(this.options.target).on("change", ".nova-radio-label input[type=radio]", {self: this}, this.radioChangeHandler);

            $(this.options.target).off("click", ".nova-select-toggle", this.selectClickHandler);
            $(this.options.target).on("click", ".nova-select-toggle", {self: this}, this.selectClickHandler);

            $(this.options.target).on("click", ".nova-select-option", {self: this}, this.selectOptionClickHandler);

            $(this.options.target).on("change", ".nova-select-label select", this.selectChangeHandler);

            $($document).on("click", this.selectHideHandler);
        },

        selectChangeHandler: function () {
            var $this = $(this);
            var index = $this.get(0).selectedIndex;

            var $label = $this.parents(".nova-select-label");
            var text = $this.find("option").eq(index).text();
            var $novaSelect = $label.find(".nova-select");
            var $toggle = $novaSelect.find(".nova-select-toggle");
            var $dropdown = $novaSelect.find(".nova-select-dropdown");
            var $options = $dropdown.find(".nova-select-option");
            $options.removeClass("active");
            var $thisOption = $options.eq(index);
            $thisOption.addClass("active");
            $toggle.find("em").text(text);

        },

        selectOptionClickHandler: function () {

            var $this = $(this);
            var $label = $this.parents(".nova-select-label");
            var $select = $label.find("select");
            var $novaSelect = $label.find(".nova-select");

            var text = $this.text();

            var $toggle = $novaSelect.find(".nova-select-toggle");
            var $dropdown = $novaSelect.find(".nova-select-dropdown");

            $toggle.find("em").text(text);

            var $options = $dropdown.find(".nova-select-option");
            $options.removeClass("active");
            $this.addClass("active");
            $select.get(0).selectedIndex = $options.index($this);

            $novaSelect.removeClass("opened");

        },

        selectHideHandler: function (e) {
            var $target = $(e.target);
            if ($target.is(".nova-select") || $target.parents(".nova-select").length > 0) {

                if ($target.is(".nova-select")) {
                    $(".nova-select").not($target).removeClass("opened");
                } else if ($target.parents(".nova-select").length > 0) {
                    $(".nova-select").not($target.parents(".nova-select")).removeClass("opened");
                }
            } else {
                $(".nova-select").removeClass("opened")
            }
        },

        selectClickHandler: function () {
            var $this = $(this);
            var $select = $this.parent(".nova-select");
            if ($select.is(".disabled")) {

            } else {
                $select.toggleClass("opened");
            }
        },

        checkboxChangeHandler: function () {
            var $this = $(this);
            var $label = $this.parents(".nova-checkbox-label");
            var $checkbox = $label.find(".nova-checkbox");
            var checked = $this.prop("checked");
            if (checked) {
                $checkbox.addClass("checked");
            } else {
                $checkbox.removeClass("checked");
            }
        },

        radioChangeHandler: function () {

            var $this = $(this);
            var $label = $this.parents(".nova-radio-label");
            var $radio = $label.find(".nova-radio");
            var name = $this.attr("name");

            var checked = $this.prop("checked");

            var $form = $this.parents("form").first();
            var $inputs = $form.find(".nova-radio-label input[type=radio][name=" + name + "]");
            var $radios = $inputs.parents(".nova-radio-label").find(".nova-radio");

            $radios.removeClass("checked");
            $radio.addClass("checked");

        }

    };

    nova.ui = Factory;
    window.nova = nova;

    for (var c in UI) {
        if (UI.hasOwnProperty(c)) {
            if (typeof UI[c] === "function") {
                Factory[c] = UI[c]
            }
        }
    }

})(window, jQuery, window.nova || {});
