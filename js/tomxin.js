/**
 * Ajax get请求
 * @param uri
 * @param callbackFunction 回调的函数
 * @param errorFunction 错误处理的函数
 */
function tomxin_GetInfo(uri, callbackFunction, errorFunction) {
    var Authorization = $.cookie('token');
    uri = encodeURI(uri);//中文要转换
    $.ajax({
        url: base.sys_param.DOMIN + uri,
        type: 'get',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", Authorization);
        },
        success: function (data) {
            callbackFunction(data);
        },
        error: function (data, textStatus) {
            errorFunction(data)
        }
    });
}

/**
 *  Ajax post请求
 * @param uri
 * @param body 消息体
 * @param callbackFunction 回调的函数
 * @param errorFunction 错误处理的函数
 */
function tomxin_PostInfo(uri, body, callbackFunction, errorFunction) {
    var Authorization = $.cookie('token');
    $.ajax({
        type: "POST",
        url: base.sys_param.DOMIN + uri,
        dataType: "json",
        data:JSON.stringify(body),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", Authorization);
        },
        success: function (data) {
            callbackFunction(data);
        },
        error: function (data) {
            errorFunction(data);
        },
        complete: function (XMLHttpRequest, textStatus) {
        }
    });
};


/**
 * 判断string是否为空
 * @param str
 * @returns {boolean}
 */
function tomxin_IsEmpty(str) {
    if(str == "" || str == null || str == undefined || str == "null" ){ // "",null,undefined
        return true;
    }
    return false;
}

