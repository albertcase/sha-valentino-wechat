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
                    _hmt.push(['_trackEvent', 'buttons', 'click', 'onMenuShareAppMessage']);
                    callback();

                },
                cancel: function () {

                }
            });
            wx.onMenuShareTimeline({
                title: obj.title1,
                link: obj.link,
                imgUrl: obj.img,
                success: function () {
                    _hmt.push(['_trackEvent', 'buttons', 'click', 'onMenuShareTimeline']);
                    callback();
                },
                cancel: function () {

                }
            });


        })
    }

    this.weixinshare = weixinshare;
}).call(this);

weixinshare({
    title1: '相配指数大揭秘：这个情人节，你和我是最佳CP吗？',
    des: '为最爱的她/他定制专属ROCKSTUD吉他肩带',
    link: window.location.origin,
    img: window.location.origin+'/src/dist/images/share.jpg'
},function(){

});