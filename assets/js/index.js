
//初始化
$(function () {
    var user_name = $.cookie('user_name');
    if (user_name != "undefined"){
        $("#login_button").html(user_name);
    }
});


function userCenter() {
    toLogin();
}

function toLogin() {
    QC.Login.showPopup({
        appId: base.sys_param.APP_ID,
        redirectURI:"http://127.0.0.1:63343/jiandan_house_web/user.html"
    });
}