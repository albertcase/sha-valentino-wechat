;(function(){
    function weixinshare(obj,callback){
        wx.ready(function(){
            wx.onMenuShareAppMessage({
                title: obj.title1,
                desc: obj.des,
                link: obj.link,
                imgUrl: obj.img,
                type: '',
                dataUrl: '',
                success: function () {
                    callback();
                    //_hmt.push(['_trackEvent', 'buttons', 'click', 'onMenuShareAppMessage']);

                },
                cancel: function () {

                }
            });
            wx.onMenuShareTimeline({
                title: obj.title1,
                link: obj.link,
                imgUrl: obj.img,
                success: function () {
                    callback();
                    //_hmt.push(['_trackEvent', 'buttons', 'click', 'onMenuShareTimeline']);
                },
                cancel: function () {

                }
            });


        })
    }

    this.weixinshare = weixinshare;
}).call(this);

weixinshare({
    title1: '情人节小测试：我们的相配指数是多少？',
    des: '为最爱的她/他定制专属ROCKSTUD吉他肩带吧！',
    link: window.location.href,
    img: window.location.origin+'/src/dist/images/share.jpg'
},function(){

});