/**
 * Created by My on 2016/11/7.
 */
define(["jquery","exports"],function($,exports){
    handleLi();
    function getMenuData(){
        $.ajax({
            url:"http://10.0.161.42:3333/menu",
            type:"get",
            success:handleMenu
        });
    }
    return getMenuData;
});
function handleMenu(data){
    $(data).each(function(index,elem){
        $(".cityList_Ul dl dd h2").eq(index).text(elem.title);
        //主要城市部分
        var mainCity = elem.mainCity;
        mainCity.forEach(function(e,i){
            var a =  $("<a></a>");
            a.text(e);
            $(".mainCity").eq(index).find("p").append(a);
        });
        //更多城市
        var moreCity = elem.moreCity;
        moreCity.forEach(function(ele,ind){
            var h2 = $("<h2></h2>");
            h2.addClass("citiesTitle");
            h2.text(ele.cityName);
            $(".listDetailsDiv").eq(index).find('.cities_actives').eq(ind).append(h2);
            //items
            var items = ele.items;
            var ul = $("<ul></ul>");
            ul.addClass("citiesList");
            items.forEach(function(el,idx){
                var li = $("<li></li>");
                var a = $("<a></a>");
                var img = $('<img>');
                if(index == 5){
                    img.attr('src',el);
                    a.append(img);
                }else{
                    a.text(el);
                };
                li.append(a);
                ul.append(li);
                $(".listDetailsDiv").eq(index).find('.cities_actives').eq(ind).append(ul);

            });
            //单元图片
            $(".cityImg").eq(index).find("img").attr("src",elem.moreCityImg);
        });

    });
};

 function handleLi() {
     $(".cityList_Ul li").on("mouseenter", function () {
         $(".listDetails").show();
         $(".cityList_Ul dl dd h2").eq($(this).index()).css({"color": "#323232"});
         $(".listDetails>div").eq($(this).index()).show();
     }).on("mouseleave", function () {
         $(".cityList_Ul dl dd h2").eq($(this).index()).css({"color": "#fff"});
         $(".listDetails>div").eq($(this).index()).on("mouseenter", function () {
             $(".listDetails>div").eq($(this).index()).show();
             $(".listDetails").show();
             $(".cityList_Ul li").eq($(this).index()).css({"background": "#fff"});
             $(".cityList_Ul dl dd h2").eq($(this).index()).css({"color": "#323232"});
         }).on("mouseleave", function () {
             $(".listDetails").hide();
             $(".cityList_Ul li").eq($(this).index()).css({"background": ""});
             $(".cityList_Ul dl dd h2").eq($(this).index()).css({"color": "#fff"});
         }).siblings().hide();
         $(".listDetails").hide();
         $(".listDetails>div").eq($(this).index()).hide();
     })
 }
