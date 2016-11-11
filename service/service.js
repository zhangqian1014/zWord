/**
 * Created by My on 2016/11/7.
 */
var express = require("express");
var fs = require("fs");
var app = express();
var http = require("http");

var gData = null; // 导航数据
var mData = null; // 菜单数据
var bData = null; // 导航数据
var fData = null; // 机酒自由行数据
var wData = null;

// 读取json文件
fs.readFile("data/menu.json",function(err,data){
    if(err){
        throw new Error("数据读取失败");
    }
    gData = data;
    fs.readFile("data/index/menu.json",function(err1,data1){
        if(err1){
            throw new Error("数据读取失败");
        }
        mData = data1;
        fs.readFile("data/index/banner.json",function(err2,data2){
            if(err2){
                throw new Error("数据读取失败");
            }
            bData = data2;
            fs.readFile("data/index/freeWalk.json",function(err3,data3){
                if(err3){
                    throw new Error("数据读取失败");
                }
                fData = data3;
                fs.readFile("data/citywalk/cityWalkList.json",function(err4,data4){
                    if(err4){
                        throw new Error('数据读取失败');
                    }
                    wData = data4;
                })
            });
        })
    });
    console.log("数据读取完毕");
    app.listen(3333);
});
app.use(express.static("html"));

//请求数据
//设置跟目录的跨域
app.all("/*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*"); // 解决跨域
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
// 导航菜单数据
app.get("/nav",function(req,res){
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.send(gData);
});
//首页主菜单数据
app.get("/menu",function(req,res){
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.send(mData);
});
//轮播图数据
app.get("/banner",function(req,res){
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.send(bData);
});
// 机酒自由行数据
app.get("/freeWalk",function(req,res){
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.send(fData);
});
// cityWalk数据
app.get("/cityWalk",function(req,res){
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.send(wData);
});


app.get('/',function(req,res){
    //获取用户传递过来的参数
    var arg = req.query['kw'];
    httpSearch(arg,function(info){
        res.send(JSON.parse(info));
    });
});

function httpSearch(kwVal,callback){
    http.get('http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword=' + kwVal, function(httpRes) {
        var buffers = [];
        httpRes.on('data', function(chunk) {
            buffers.push(chunk);
        });
        httpRes.on('end', function(chunk) {
            var wholeData = Buffer.concat(buffers);
            var dataStr = wholeData.toString('utf8');
            callback(wholeData);
        });
    }).on('error', function(e) {
        console.log(e);
    });
}
// httpSearch();
/*app.get('/sitesearch/:keyword' , function (req , res) {
        var url = req.params.keyword;
        // 查询本机ip
        // http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword=b&timer=1478686648677&_=1478678019964
        var sreq = http.request({
            host:     'z.qyer.com', // 目标主机
            path:     '/qcross/home/ajax?action=sitesearch&keyword='+url, // 目标路径
            method:   'get' // 请求方式
        }, function(sres){
            sres.pipe(res);
            sres.on('end', function(){
                console.log('done');
            });
        });
        if (/POST|PUT/i.test(req.method)) {
            req.pipe(sreq);
        } else {
            sreq.end();
        }
    }*/

