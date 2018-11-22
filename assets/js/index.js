function userCenter() {

        if(confirm("收藏功能需要登录，您是否继续？")){
            toLogin();
        }
        else{
            return;
        }

}

function toLogin() {
    QC.Login.showPopup({
        appId:"101475157",
        redirectURI:"http://127.0.0.1:63343/jiandan_house_web/user.html"
    });
}