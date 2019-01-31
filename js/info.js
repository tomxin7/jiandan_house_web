var id = getQueryString("id");
get_info(id)


//获取url中的参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function get_info(id) {
    //拼接发起请求的URI
    var uri = '/info/'+ id;
    //请求成功后的回调函数
    function callbackFunction(data) {
        // console.log(data)
        set_info(data)
    }
    //请求失败后的回调函数,可以不处理
    function errorFunction(data){
        console.log(data.responseJSON.message)
    }
    //发起ajax get请求，注意函数传参不能加括号
    tomxin_GetInfo(uri, callbackFunction, errorFunction);
}

function set_info(data) {
    var model = '  <p>  亲爱的：{user_name} 你的任务:【{task}】</p><p> 在{create_time} 监控到以下房源</p>\n' +
        '\n' +
        '      <div class="remind"> 风险提醒：以下内容来自互联网，未经验证，请自行甄别，谨防受骗</div>'

    model = model.replace("{user_name}", data['userName'])
    model = model.replace("{create_time}", data['createTime'])
    model = model.replace("{task}", data['task'])
    $("#info").html(model);

    //字符串转json
    // var content_json =  $.parseJSON(data['content']); //可以将json字符串转换成json对象

    console.log(eval('(' + data['content'] + ')'))


}