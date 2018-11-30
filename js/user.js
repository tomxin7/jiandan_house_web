//初始化页面
var user_name = $.cookie('user_name');
if (isEmpty(user_name)){
    var login = QC.Login.check();
    if(login == true){
        QC.Login.getMe(function(openId, accessToken){
            getInfo(accessToken,openId);
        });
    }else{
        //提示用户是否要登录
        if (confirm("该页面需要QQ登录才能访问，您是否要登录？")) {
            toLogin()
        }
        else {
        }
        location.href="index.html";
    }
}else {
    //如果已经登录过，直接去后端拿记录
    get_record(0,10);
}


//初始化
$(function () {
    if (!isEmpty(user_name)){
        //如果用户登录了，设置用户信息
        setUserInfo(user_name);
    }
})

function setUserInfo(name) {
    $("#login_button").text("登出：" + name);
    $("#user_name").text(name);
}

//请求后端登录
function getInfo(accessToken,openId) {
    var access={
        "accessToken": accessToken,
        "openId": openId,
        "appId": base.sys_param.APP_ID
    };
    var url = base.sys_param.DOMIN + "/user";
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        jsonp: 'jsoncallback',
        data:JSON.stringify(access),
        contentType: "application/json",
        success: function (data) {
            $.cookie('user_name', data['nickName'], { expires: 1 });
            setUserInfo(data['nickName']);
            $.cookie('token', data['token'], { expires: 1 });
            set_record(data['recordList']);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        },
        complete: function (XMLHttpRequest, textStatus) {
            this; // 调用本次AJAX请求时传递的options参数
        }
    });
};

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
    if (confirm("您确定要登出账号嘛？")) {
        $.cookie('user_name', null);
        $.cookie('token', null);
        location.href="index.html";
    }
    else {
    }
}


//后端获取记录
function get_record(pageNum, pageSize) {
    var Authorization = $.cookie('token');
    var uri = '/record?pageNum=' + pageNum + '&pageSize=' + pageSize;
        $.ajax({
            type: 'get',
            dataType: "json",
            url : base.sys_param.DOMIN + uri,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", Authorization);
            },
            success: function (data) {
                set_record(data['content']);
                if (pageNum == 0){
                    paging(data['totalPages'], data['pageable'].pageSize, data['totalElements']);
                }
            },
            error: function (data, textStatus) {
                console.log(data)
            }
        });
}

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
            console.log(page);
            get_record(page-1,pageAmount);

        }
    })
}