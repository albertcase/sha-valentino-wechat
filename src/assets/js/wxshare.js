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
    title1: 'RockStud Guitar Strap',
    des: 'RockStud Guitar Strap',
    link: 'http://guitarstrapvalentino.samesamechina.com',
    img: 'http://guitarstrapvalentino.samesamechina.com/src/dist/images/done-bg-1.jpg'
},function(){

});