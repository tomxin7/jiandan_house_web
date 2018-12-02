//初始化页面
//初始化
$(function () {
var user_name = $.cookie('user_name');
if (tomxin_IsEmpty(user_name)){
    var login = QC.Login.check();
    if(login == true){
        QC.Login.getMe(function(openId, accessToken){
            loginInfo(accessToken,openId);
        });
    }else{
        //提示用户是否要登录
        if (confirm("该页面需要QQ登录才能访问，您是否要登录？")) {
            toLogin()
        }
        location.href="index.html";
    }
}else {
    //如果已经登录过，直接去后端拿记录
    setUserInfo(user_name);
    get_record(0,10);
}
});

//设置用户信息
function setUserInfo(name) {
    $("#login_button").text("登出：" + name);
    $("#user_name").text(name);
}

//请求后端登录
function loginInfo(accessToken,openId) {
    //需要请求的URI
    var uri = "/user";
    //请求的消息体
    var body={
        "accessToken": accessToken,
        "openId": openId,
        "appId": base.sys_param.APP_ID
    };
    //请求成功的处理
    function callbackFunction(data) {
        $.cookie('user_name', data['nickName'], { expires: 1 });
        setUserInfo(data['nickName']);
        $.cookie('token', data['token'], { expires: 1 });

        get_record(0,10);
    }
    //发起post请求
    tomxin_PostInfo(uri, body, callbackFunction)
}

//跳转qq登录
function toLogin() {
    QC.Login.showPopup({
        appId: base.sys_param.APP_ID,
        redirectURI:"http://127.0.0.1:63343/jiandan_house_web/user.html"
    });
}

//弹出一个询问框，有确定和取消登出
function logout() {
    //利用对话框返回的值 （true 或者 false）
    if (confirm("您确定要登出账号吗？")) {
        $.cookie('user_name', null);
        $.cookie('token', null);
        location.href="index.html";
    }
}

//后端获取记录
function get_record(pageNum, pageSize) {
    //拼接发起请求的URI
    var uri = '/record?pageNum=' + pageNum + '&pageSize=' + pageSize;
    //请求成功后的回调函数
    function callbackFunction(data) {
        set_record(data['content']);
        if (pageNum == 0){
            paging(data['totalPages'], data['pageable'].pageSize, data['totalElements']);
        }
    }
    //请求失败后的回调函数
    function errorFunction(data){
        console.log(data.responseJSON.message)
    }
    //发起ajax get请求，注意函数传参不能加括号
    tomxin_GetInfo(uri, callbackFunction, errorFunction);
};


//设置记录到前端
function set_record(record_data) {
    console.log(record_data)
    var html_model = '                <tr>\n' +
        '                  <td>{city}</td>\n' +
        '                  <td>{time}</td>\n' +
        '                  <td>{key}</td>\n' +
        '                  <td>{remind}</td>\n' +
        '                  <td><button type="button" class="am-btn {am-btn}" {disabled} data-am-modal="{target: \'#my-confirm\'}">{status}</button></td>\n' +
        '                </tr>';
    var html_result = "";
    for (i in record_data) {
        var result = record_data[i] ;
        var model = html_model;
        model = model.replace("{city}", result.cityName);
        model = model.replace("{time}", formatDate(result.createTime));
        model = model.replace("{key}", result.keyWord);
        model = model.replace("{remind}", result.remind);
        if (result.status == 1){
            model = model.replace("{status}", "结束");
            model = model.replace("{am-btn}", "am-btn-secondary");
            model = model.replace("{disabled}", "");

        } else{
            model = model.replace("{status}", "已结束");
            model = model.replace("{am-btn}", "am-btn-default");
            model = model.replace("{disabled}", "disabled=\"disabled\"");
        }
        html_result += model;
    }
    $("#record").html(html_result);
}


//格式化时间
function formatDate(time){
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
        month + '-' +
        day + ' ' +
        hour + ':' +
        min + ':' +
        sec;
    return newTime;
}

//分页
// pageTotal: , //必填,总页数
// pageAmount: 10,  //每页多少条
//dataTotal: 500, //总共多少条数据
//     curPage:1, //初始页码,不填默认为1
//     pageSize: 5, //分页个数,不填默认为5
function paging(pageTotal, pageAmount, dataTotal) {
    console.log(dataTotal)
    new Page({
        id: 'page',
        pageTotal: pageTotal, //必填,总页数
        pageAmount: pageAmount,  //每页多少条
        dataTotal: dataTotal, //总共多少条数据
        curPage:1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag:true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数
            get_record(page-1,pageAmount);

        }
    })
}