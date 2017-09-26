/**
 * author: Sheng JIANG
 * date: 2017-09-26
 */

$(function(){

    //主导航
    nova.navScroll({
        fixedObj : $('.js_fixed'),
        navList : $('.js_fixed li'),
        activeIndex : -1,
        callback: function(index){
            console.log(index);
            $('.js_fixed').show();
        },
        endCallback:function(){
            console.log('已经滚完最后一个了！');
            $('.js_fixed').hide();
        }
    });

    //注意事项导航
    nova.navScroll({
        fixedObj : $('.js_fixed2'),
        navList : $('.js_fixed2 li'),
        activeIndex : -1,
        deviationNav : 40,
        deviationScroll : 100,
        callback: function(index){
            console.log(index);
            $('.js_fixed2').show();
        },
        endCallback:function(){
            console.log('已经滚完最后一个了！');
            $('.js_fixed2').hide();
        }
    });

    //左侧导航
    nova.navScroll({
        fixedObj : $('.js_fixed3'),
        navList : $('.js_fixed3 li'),
        activeIndex : 0,
        navStyle : false,
        callback: function(index){
            $('.js_fixed3').show();
        },
        endCallback:function(){
            $('.js_fixed3').hide();
        }
    });

    $(document).on('click','.btn',function(e){
        $(this).before('<br><br>追加测试文字，模拟高度变化位置实时刷新。<br><br>追加测试文字，模拟高度变化位置实时刷新。<br><br>追加测试文字，模拟高度变化位置实时刷新。<br><br>追加测试文字，模拟高度变化位置实时刷新。<br><br>追加测试文字，模拟高度变化位置实时刷新。<br><br>追加测试文字，模拟高度变化位置实时刷新。<br><br>追加测试文字，模拟高度变化位置实时刷新。<br><br>追加测试文字，模拟高度变化位置实时刷新。<br><br>追加测试文字，模拟高度变化位置实时刷新。<br><br>追加测试文字，模拟高度变化位置实时刷新。');
    });

});
