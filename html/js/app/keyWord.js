/**
 * Created by My on 2016/11/8.
 */
define(["jquery"],function($){
    // showInp();

    //&keyword=w&timer=1478613758877&_=1478613754856
    function suggestion(){
        $(".user_login input").on("keyup",function(e){
            if( (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)){
                var key = $(this).val();
                $.ajax({
                    type:"get",
                    url:'http://10.0.161.42:3333?kw='+key,
                    success:showData
                });
            }
        })
    };
    return suggestion;
});
function getStyle(node,attr){
    if(node.currentStyle){
        return parseInt(node.currentStyle[attr]);
    }else{
        return parseInt(getComputedStyle(node,false)[attr]);
    }
};
// 鼠标滑过input事件
function showInp(){
    $(".user_login form").on("mouseenter",function(){
        $(this).css("background","none");
        $(".user_login input").animate({"margin-right":"0"},1000);
    }).
    on("mouseleave",function(){
        $(".user_login input").animate({"margin-right":"-165px"},1000);
        if(getStyle($(".user_login input")[0],"margin-right") >= -165 && getStyle($(".user_login input")[0],"margin-right") <= -160){
            $(this).css({
                'background':'url("images/bg_03.png") no-repeat center',
                'background-position': '0 6px',
                'background-size': '60%'
            });
        }

    })
}

//回执函数
function showData(data){
    $(".suggestMsg").show();
    $(".suggestMsg").html("");
    $(data).each(function(index,elem){
        var list = elem.data.list;
        var ul = $("<ol></ol>");
        ul.css({padding:'4px 5px'})
        for(var i in list){
            var li = $("<li></li>");
            li.css({width:'100%'});
            if(list[i]['type_name'] == 'item'){
                var a = $("<a></a>");
                a.attr('href',list[i].url);
                var dl = $("<dl></dl>");
                dl.css({
                    padding:'5px',
                    height:'30px',
                    borderBottom:'1px solid #eee'
                });
                var dt = $("<dt></dt>");
                var img = $("<img>");
                img.attr('src',list[i].src);
                img.css({width:'30px',height:'30px'});
                dt.append(img);
                dt.css({
                    float:'left',
                    height:'30px'
                })
                var dd = $("<dd></dd>");
                dd.css({float:'left'});
                dd.removeClass('related');
                var p1 = $("<p></p>");
                p1.html(list[i].en_name);
                var p2 = $("<p></p>");
                p2.html(list[i].belong_name);
                dl.append(dt);
                dl.append(p1);
                dl.append(p2);
                a.append(dl);
                li.append(a);
            }else{
                var a = $("<a></a>");
                a.attr('href',list[i].url);
                a.html(list[i].word);
                li.append(a);
            }
        ul.append(li);
        $(".suggestMsg").append(ul);
        }
    })
}
