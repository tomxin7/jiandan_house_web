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
        success: function (data, textStatus) {
            $.cookie('user_name', data['nickName'], { expires: 7 });
            setUserInfo(data['nickName']);
            $.cookie('token', data['token'], { expires: 7 });
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