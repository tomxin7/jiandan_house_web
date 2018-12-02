var city_data;

//初始化
$(function () {
    var user_name = $.cookie('user_name');
    if (!tomxin_IsEmpty(user_name)){
        $("#login_button").html(user_name);
    }
    get_city();
});


//用户登录
function userCenter() {
    var user_name = $.cookie('user_name');
    if (tomxin_IsEmpty(user_name)){
        toLogin();
    }else{
        logout();
    }
}

//登录
function toLogin() {
    QC.Login.showPopup({
        appId: base.sys_param.APP_ID,
        redirectURI:"http://127.0.0.1:63342/jiandan_house_web/user.html"
    });
}

//跳转到个人中心
function logout() {
    location.href = "user.html";
}


//后端读取城市
function get_city() {
    var option_model = '<option value="{city_value}" i="set_city_url({i})">{city}</option>';
    var option = "";
    var option_html = "";
    var uri = '/city/list';
    function callbackFunction(data) {
        city_data = data;
        for (i in city_data) {
            //构建option
            option = option_model;
            option = option.replace("{city_value}", i);
            option = option.replace("{city}", city_data[i].cityName);
            option_html += option;
        }
        $("#city").html(option_html);
        //设置网址一网址二
        set_city_url(0);
    }
    tomxin_GetInfo(uri, callbackFunction);
}

//设置网址一网址二
function set_city_url(value) {
    var city_url = city_data[value].douBanUrl;
    var url_model = '<a href="{city_url}" target="_blank">网址{city_i}</a>';
    var result = city_url.split(",");
    var url_head = "https://www.douban.com/group/";
    var html_a ="";

    for(var i=0; i<result.length; i++){
        var url = url_model;
        url = url_model.replace("{city_url}",url_head + result[i]);
        url = url.replace("{city_i}",i+1);
        html_a += "  " + url;
    }

    $("#city_url").html(html_a);
}

//用户点击提交
function submit() {
    var token = $.cookie('token');
    if (tomxin_IsEmpty(token)) {
        alert("请登录后重试");
        return false;
    }
    //利用对话框返回的值 （true 或者 false）
    if (confirm("您确定要提交吗？")) {
        postRecord()
    }
}

//添加用户的记录
function postRecord() {
    var email = $("#email").val();
    if (checkEmail(email)){
        return false;
    }
    var uri = "/record";
    var body = {
        "cityName": $("#city option:selected").text(),
        "keyWord": $("#key").val(),
        "remindType": $("input[name='remindType']:checked").val(),
        "remind": $("#email").val(),
    };

    function callbackFunction(data){
        alert("添加成功");
    }
    tomxin_PostInfo(uri, body, callbackFunction)
};

//校验邮箱格式
function checkEmail(str){
    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!re.test(str)) {
        alert("邮箱格式不正确");
        return true;
    }
}