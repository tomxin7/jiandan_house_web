var base ={
    version:"1.0",
    sys_param:{
        //DOMIN:"http://127.0.0.1:8081",
        //后端地址
		DOMIN:"http://127.0.0.1:8080/v0.1",
        //PC端地址
		PCDOMIN:"http://jiandan.live",
        APP_ID:"101475157"
    }
}


//判断string是否为空
function isEmpty(str) {
    if(str == "" || str == null || str == undefined || str == "null" ){ // "",null,undefined
        return true;
    }
    return false;
}

// //百度统计
// var _hmt = _hmt || [];
// var hm = document.createElement("script");
// hm.src = "https://hm.baidu.com/hm.js?b9bfff171d217e089f140ed78b6e3239";
// var s = document.getElementsByTagName("script")[0];
// s.parentNode.insertBefore(hm, s);

/**
 *  Ajax post请求
 * @param body 消息体
 * @param uri
 * @param callbackFunction 回调的函数
 */
function postInfo(body, uri, callbackFunction) {
    var Authorization = $.cookie('token');
    $.ajax({
        type: "POST",
        url: base.sys_param.DOMIN + uri,
        dataType: "json",
        data:JSON.stringify(access),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", Authorization);
        },
        success: function (data) {
            callbackFunction(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        },
        complete: function (XMLHttpRequest, textStatus) {
        }
    });
};