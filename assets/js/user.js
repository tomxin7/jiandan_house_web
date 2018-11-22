//初始化页面

var user = $.cookie('user');
if(user == undefined || user == "null"){
    var login = QC.Login.check();
    if(login == true){
        QC.Login.getMe(function(openId, accessToken){
            getInfo(accessToken,openId);
        });
    }else{
        alert("该页面需要登录后访问");
        // location.href="index.html";
    }
}else {
    alert(12)
}



//登录
function getInfo(accessToken,openId) {
    var access={
        "accessToken": accessToken,
        "openId": openId,
        // "appId": base.sys_param.APP_ID
    };
    var url = "https://graph.qq.com/user/get_user_info?access_token="+accessToken+"&oauth_consumer_key=101475157&openid="+openId;
    console.log(url)
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        contentType: "application/json",
        success: function (data, textStatus) {
            var user = data['ret'];
            alert(user)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        },
        complete: function (XMLHttpRequest, textStatus) {
            this; // 调用本次AJAX请求时传递的options参数
        }
    });
}