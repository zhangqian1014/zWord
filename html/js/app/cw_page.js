/**
 * Created by My on 2016/11/10.
 */
define(['jquery'],function($){
    function getCWData(){
        $.ajax({
            type:'get',
            url:'http://10.0.161.42:3333/cityWalk',
            success:showCityWalk
        })
    }
    return getCWData;
});
function showCityWalk(data){
    $(data).each(function(index,elem){
        var bigdiv = $('<div ></div>');
        bigdiv.addClass('fw_sort_list');
        var contDiv = $('<div></div>');
        contDiv.addClass('show_sortList');
        var dl = $('<dl></dl>');
        var dt = $('<dt></dt>');
        var dd = $('<dd></dd>');
        var imga = $('<a></a>');
        var img = $('<img/>');
        img.attr('src',elem.imgurl);
        var cw_details = $('<div></div>');
        cw_details.addClass('cw_details');
        var placeName = $('<span></span>');
        placeName.addClass('placeName');
        placeName.html(elem.address);
        var view = $('<p></p>');
        view.addClass('view');
        cw_details.append(placeName);
        var span1 = $('<span></span>');
        span1.html(elem.browseCount);
        var span2 = $('<span></span>');
        span2.html(elem.soldCount);
        view.append(span1);
        view.html(view.html() + '次浏览');
        view.append(span2);
        view.html(view.html() + '件已售');
        cw_details.append(view);
        var h2 = $('<h2></h2>');
        h2.addClass('sort_title');
        var titlea = $('<a></a>');
        titlea.html(elem.title);
        h2.append(titlea);
        cw_details.append(h2);
        var cw_introduce = $('<div></div>');
        cw_introduce.addClass('cw_introduce');
        var ul = $('<ul></ul>');
        elem.introduce.forEach(function(e,i){
            var li = $('<li></li>');
            li.html(e);
            ul.append(li);
        })
        cw_introduce.append(ul);
        var p = $('<p></p>');
        var del = $('<del></del>');
        var span = $('<span></span>');
        del.html(elem.oldPrice+'元');
        span.html(elem.newPrice);
        p.append(del);
        p.append(span);
        p.html(p.html()+'元起');
        cw_introduce.append(p);
        cw_details.append(cw_introduce);
        var order = $('<div></div>');
        order.addClass('order');
        var orderA = $('<a></a>');
        orderA.html('立即预定');
        order.append(orderA);
        cw_introduce.append(order);
        dd.append(cw_details);
        // dt部分
        imga.append(img);
        dt.append(imga);
        dl.append(dt);
        dl.append(dd);
        contDiv.append(dl);
        bigdiv.append(contDiv);
        $('.cityWalkData').append(bigdiv);
    });
    //分页功能
    var pagesize = 3;
    var pageCount = $('.cityWalkData').children().length/pagesize;
    for(var i = 0;i <pageCount;i++){
        var a = $("<a>"+(i+1)+"</a>");
        $('.pageIndex').append(a);
    }
    $('.fw_sort_list:gt('+ (pagesize - 1)+ ')').hide();
    $('.pageIndex a').first().addClass('active');

    $('.pageIndex a').on('click',function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        var currentPage = $(this).html();
        var startIndex = (currentPage - 1)*pagesize;
        if(startIndex == 0){
            $('.fw_sort_list:gt('+ (pagesize - 1)+ ')').hide();
            $('.fw_sort_list:lt('+ (pagesize)+ ')').show();
        }else{
            $('.fw_sort_list').hide();
            $('.fw_sort_list').eq(startIndex - 1).nextUntil($('.fw_sort_list').eq(startIndex + pagesize)).show();
        }
    })
    // 上一页
    $('.prevPage').click(function(e){
        e.preventDefault();
        var index = $('.pageIndex a.active').html();
        if(index == 1){
            return;
        }
        $('.fw_sort_list').hide();
        var prevIndex = ($('.pageIndex a.active').prev().html()-1)*pagesize;

        if(index - 1 == 1){
            $('.fw_sort_list:gt('+ (pagesize - 1)+ ')').hide();
            $('.fw_sort_list:lt('+ (pagesize)+ ')').show();
        }else{
            $('.fw_sort_list').eq(prevIndex - 1).nextUntil($('.fw_sort_list').eq(Number(prevIndex)+pagesize)).show();
        }
        $('.pageIndex a.active').removeClass('active').prev().addClass('active');
    });

    // 下一页
    $('.nextPage').click(function(e){
        e.preventDefault();
        console.log(pageCount);
        var index = $('.pageIndex a.active').html();
        var nextIndex = $('.pageIndex a.active').html()*pagesize;
        $('.fw_sort_list').hide();
        if(Number(index) == pageCount){
            return;
        }else{
            $('.fw_sort_list').hide();
            $('.fw_sort_list').eq(nextIndex - 1).nextUntil($('.fw_sort_list').eq(nextIndex + pagesize)).show();
        }
        $('.pageIndex a.active').removeClass('active').next().addClass('active');
    })
}