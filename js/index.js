get_city()
//初始化
$(function () {
    var user_name = $.cookie('user_name');
    if (!isEmpty(user_name)){
        $("#login_button").html("登出："+user_name);
    }
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
    //利用对话框返回的值 （true 或者 false）
    if (confirm("您确定要登出账号嘛？")) {
        $.cookie('user_name', null);
        $.cookie('token', null);
        location.reload();
    }
    else {
    }
}

//方法
function get_city() {
    var html_model = '<option value="{city_value}">{city}</option>';
    var html = ""
    var uri = '/city/list';
        $.ajax({
            url: base.sys_param.DOMIN + uri,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                for (i in data) {
                    var recruit=data[i] ;
                    model = html_model;
                    model = model.replace("{city_value}", recruit.cityName);
                    model = model.replace("{city}", recruit.cityName);
                    html += model;

                }
                $("#city").html(html)
            },
            error: function () {
                alert("添加失败");
            }
        });
}