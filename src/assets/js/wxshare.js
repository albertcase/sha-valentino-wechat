;(function(){
    $.ajax({
        url:'/jssdk?url='+ encodeURIComponent(location.href.split('#')[0]),
        success:function(response){
            var data = $.parseJSON(response);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
                //wx.hideOptionMenu({
                //    menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:QZone","menuItem:copyUrl","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email"] // 要显示的菜单项，所有menu项见附录3
                //});
                wx.onMenuShareAppMessage({
                    title: '众异送你好时机，丁酉一七度佳节',
                    desc: '',
                    link: window.location.href,
                    imgUrl: window.location.origin+'/src/dist/images/share.jpg',
                    type: '',
                    dataUrl: '',
                    success: function () {


                    },
                    cancel: function () {
                    }
                });
                wx.onMenuShareTimeline({
                    title: '众异送你好时机，丁酉一七度佳节',
                    link: window.location.href,
                    imgUrl: window.location.origin+'/src/dist/images/share.jpg',
                    success: function () {

                    },
                    cancel: function () {

                    }
                });

            })
        }
    });

})();
