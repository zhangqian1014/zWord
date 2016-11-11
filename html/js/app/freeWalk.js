/**
 * Created by My on 2016/11/8.
 */
define(["jquery","exports"],function($,exports){
    function getFreealkData(){
        $.ajax({
            url:"http://10.0.161.42:3333/freeWalk",
            type:"get",
            success:handleFreewalk
        })
    };
    return getFreealkData;
});
function handleFreewalk(data){
    data.forEach(function(elem,index){
        var li = $("<li></li>");
        var a = $("<a></a>");
        a.text(elem.title);
        li.append(a);
        $(".freeWalkTitle ul").append(li);
        // console.log(elem.data);
        var fwData = elem.data;
        fwData.forEach(function(ele,idx){
            $(".freeWalkDetails ul").eq(index).find(" li img").eq(idx).attr("src",ele.imgUrl);
            $(".freeWalkDetails ul").eq(index).find("div h3").eq(idx).text(ele.title);
            $(".freeWalkDetails ul").eq(index).find(".list_price span").eq(idx).text(ele.price);
        });
    });
    handleFWTitle();
}
// DOM元素操作
function handleFWTitle(){
    $(".freeWalkTitle ul li").on("mouseenter",function(){
        $(".freeWalkDetails ul").eq($(".freeWalkTitle ul li").index(this)).fadeIn(200).siblings().fadeOut(200);
    })
}
