var city_data;

//初始化
$(function () {
    var user_name = $.cookie('user_name');
    if (!isEmpty(user_name)){
        $("#login_button").html(user_name);
    }
    get_city();
});


//用户登录
function userCenter() {
    var user_name = $.cookie('user_name');
    if (isEmpty(user_name)){
        toLogin();
    }else{
        logout();
    }
}

//登录
function toLogin() {
    QC.Login.showPopup({
        appId: base.sys_param.APP_ID,
        redirectURI:"http://127.0.0.1:63343/jiandan_house_web/user.html"
    });
}

//弹出一个询问框，有确定和取消登出
function logout() {
    location.href = "user.html";
}

//后端读取城市
function get_city() {
    var option_model = '<option value="{city_value}" i="set_city_url({i})">{city}</option>';
    var option = "";
    var option_html = "";
    var uri = '/city/list';
        $.ajax({
            url: base.sys_param.DOMIN + uri,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                city_data = data;
                for (i in city_data) {
                    //构建option
                    option = option_model;
                    option = option.replace("{city_value}", i);
                    option = option.replace("{city}", city_data[i].cityName);
                    option_html += option;
                }
                set_city_url(0);
                $("#city").html(option_html);
            },
            error: function () {
                alert("添加失败");
            }
        });
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
