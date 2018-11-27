//初始化页面

var user_name = $.cookie('user_name');
if(user_name == undefined || user_name == "null"){
    var login = QC.Login.check();
    if(login == true){
        QC.Login.getMe(function(openId, accessToken){
            getInfo(accessToken,openId);
        });
    }else{
        alert("该页面需要登录后访问");
        location.href="index.html";
    }
}



//登录
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
            alert(data['nickName']);
            $.cookie('token', data['token'], { expires: 7 });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        },
        complete: function (XMLHttpRequest, textStatus) {
            this; // 调用本次AJAX请求时传递的options参数
        }
    });
}