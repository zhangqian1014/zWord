/**
 * Created by My on 2016/11/8.
 */
define(["jquery"],function($){
    function bannerSwiper(){
        setInterval(swiperImg,2000);
        $.ajax({
            url:"http://10.0.161.42:3333/banner",
            type:"get",
            success:handleBanner
        });
    }
    return bannerSwiper;
});
function handleBanner(data){
    data.forEach(function(elem,index){
        $(".lunboImg li a").eq(index).attr("href",elem.href);
        $(".lunboImg li a img").eq(index).attr("src",elem.imgUrl);
    });


};
//轮播方法
var leftValue = 0;
function swiperImg(){
    if(leftValue == -400){
        leftValue = 0;
    }
    $(".lunboImg").get(0).style.left = leftValue +"%";
    leftValue -= 100;

    //轮播动画方法
    // $(".lunboImg").animate({"left":leftValue + "%"},2000);
    // leftValue -= 100;
}
