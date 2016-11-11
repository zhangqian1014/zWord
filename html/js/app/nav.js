/**
 * Created by My on 2016/11/7.
 */
define(["jquery","exports"],function($,exports){
    function getNavData(){
        $.ajax({
            url:"http://10.0.161.42:3333/nav",
            type:"get",
            success:handleNav
        });
    }
    return getNavData;
});
function handleNav(data){
    $(data).each(function(index,elem){
        $(".navList li a span").eq(index).text(elem.name);
        $(".navList li a").eq(index).attr("href",elem.url);
    })
};