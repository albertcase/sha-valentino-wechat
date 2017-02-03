;(function(){

    var controller = function(){

        this.stropsList = [
            {
                id:'1',
                src:'/src/dist/images/straps-1.png'
            },
            {
                id:'2',
                src:'/src/dist/images/straps-4.png'
            },
            {
                id:'3',
                src:'/src/dist/images/straps-2.png'
            },
            {
                id:'4',
                src:'/src/dist/images/straps-3.png'
            },
        ];
        //default selected value
        //background has three: 1,2,3,4
        //color has two: 1,2
        //content:a-zA-Z

        var ArrLength=101;
        this.straps1 = [];
        this.straps2 = [];
        this.straps3 = [];
        var newstring1='',newstring2='',newstring3='';
        for(var i=0;i<ArrLength;i=i+4){
            if(i<10){
                newstring1='/src/dist/images/'+'straps1/straps1_0000'+i+'.jpg';
                newstring2='/src/dist/images/'+'straps2/straps2__0000'+i+'.jpg';
                newstring3='/src/dist/images/'+'straps3/straps3__0000'+i+'.jpg';
            }else if(i>9 && i<100){
                newstring1='/src/dist/images/'+'straps1/straps1_000'+i+'.jpg';
                newstring2='/src/dist/images/'+'straps2/straps2__000'+i+'.jpg';
                newstring3='/src/dist/images/'+'straps3/straps3__000'+i+'.jpg';
            }else{
                newstring1='/src/dist/images/'+'straps1/straps1_00'+i+'.jpg';
                newstring2='/src/dist/images/'+'straps2/straps2__00'+i+'.jpg';
                newstring3='/src/dist/images/'+'straps3/straps3__00'+i+'.jpg';
            }
            this.straps1.push(newstring1);
            this.straps2.push(newstring2);
            this.straps3.push(newstring3);
        };

        this.objSelect = {
            background:'1',
            color:'1',
            content:'ab'
            //background  color  content
        };

    };
    //init
    controller.prototype.init = function(){
        var self = this;
        var baseurl = '/src/dist/images/';
        var imagesArray = [
            baseurl+'logo.png',
            baseurl+'pipe-1.png',
            baseurl+'pipe-2.png',
            baseurl+'p1-t1.png',
            baseurl+'p2-text-1.png',
            baseurl+'done-bg-1.jpg',
            baseurl+'done-bg-4.jpg',
            baseurl+'done-bg-3.jpg',
            baseurl+'dot.png',
            baseurl+'list-color.png',
            baseurl+'list-straps.png',
            baseurl+'poster.jpg',
            baseurl+'prev-step.png',
            baseurl+'straps-1.png',
            baseurl+'straps-4.png',
            baseurl+'straps-3.png',
            baseurl+'alphabet/alphabet-black.png',
            baseurl+'alphabet/alphabet-color.png',
        ];
        imagesArray = imagesArray.concat(self.straps1).concat(self.straps2).concat(self.straps3);

        var i = 0;
        new preLoader(imagesArray, {
            onProgress: function(){
                i++;
                var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                $('.preload .v-content').html('已加载'+progress+'%');
            },
            onComplete: function(){

                $('.preload').remove();
                $('.container').addClass('fade');

                Common.gotoPin(0);
                self.bindEvent();
            }
        });


    };

    //go next step:custom letter
    controller.prototype.goCustomLetter = function(){
        var self = this;
        $('.switch-menu .step-1').removeClass('current').siblings('.step').addClass('current');
        $('#select-page .show-word').addClass('fadein');
        $('#select-page .steps').addClass('next');
        $('.go-prev').addClass('show');
    };
    //go prev step:custom style
    controller.prototype.goCustomStyle = function(){
        var self = this;
        $('.switch-menu .step-1').addClass('current').siblings('.step').removeClass('current');
        $('#select-page .show-word').removeClass('fadein');
        $('#select-page .steps').removeClass('next');
        $('.go-prev').removeClass('show');
    };
    //bind event
    controller.prototype.bindEvent = function(){

        var self  = this;
        $('.btn-start-custom').on('touchstart',function(){
            Common.gotoPin(1);
        });

    //    select the style
        $('.step-1 .lists .item').on('touchstart',function(){
            var curIndex = $(this).index();
            $(this).addClass('active').siblings('.item').removeClass('active');
            $('.show-img img').attr('src',self.stropsList[curIndex].src);
            self.objSelect.background = curIndex+1;
        });

        //select the color
        $('.step-2 .lists .item').on('touchstart',function(){
            var curIndex = $(this).index();
            self.objSelect.color = curIndex+1;
            $(this).addClass('active').siblings('.item').removeClass('active');
            if(curIndex==1){
                $('.show-word').addClass('whiteandblack');
            }else{
                $('.show-word').removeClass('whiteandblack');
            }
        });

    //   go next step
        var nextStep = true;
        $('.control').on('touchstart',function(){
            if(nextStep){
                nextStep = false;
                self.goCustomLetter();
                return;
            };

            if(!($('.input-custom').val().length==2 && self.validateAlphabet($('.input-custom').val().substring(0,1)) && self.validateAlphabet($('.input-custom').val().substring(1,2)))){
                Common.alertBox.add('请输入两个字母');
                return;
            }

            var customAlphabet = $('.input-custom').val()?$('.input-custom').val():'ab';
            self.objSelect.content = customAlphabet;
            self.generate();

        });

    //    go prev step
        $('.go-prev').on('touchstart',function(){
            nextStep = true;
            self.goCustomStyle();
        });

    //    input the alphabet
        $('.input-custom').on('keyup',function(){
            //console.log($(this).val());
            var curVal = $(this).val();
            var firstLetter = curVal.substring(0,1);
            var secondLetter = curVal.substring(1,2);
            if(self.validateAlphabet(firstLetter)){
                $('#select-page .sw-1').attr('class','sw-1 letter letter-'+firstLetter.toLowerCase());
            }
            if(self.validateAlphabet(secondLetter)){
                $('#select-page .sw-3').attr('class','sw-3 letter letter-'+secondLetter.toLowerCase());
            }

        });

        //$('.btn-goreservation').on('touchstart',function(){
        //
        //});


    };
    //validate the input is a-z or A-Z
    controller.prototype.validateAlphabet = function(val){
        var self = this;
        var regAlphabet=/^[A-Za-z]$/;
        return regAlphabet.test(val);

    };
    //go generate part and do animation
    //controller.prototype.doGenerateAni = function(){
    //
    //};
    //位数不足 补0
    controller.prototype.appendLeft = function(str){
        var self = this;
        if (str.length == 5){
            return str;
        }else{
            return self.appendLeft("0" + str);
        }

    };
    controller.prototype.doGenerateAni = function (num) {
        var self = this;
        var i= 0;
        //background-size
        var doGenerateAni;
        var increase = true;
        var imgSrc='';
        var doAni = new reqAnimate($('.show-animate img'),{
            fps: 6,
            totalFrames: 25,
            time: 2,
            processAnimation: function(){
                //num is 1,2,3,in fact num is selected background
                switch(num){
                    case 1:
                        imgSrc = '/src/dist/images/straps1/straps1_'+self.appendLeft(i)+'.jpg';
                        break;
                    case 2:
                        imgSrc = '/src/dist/images/straps2/straps2__'+self.appendLeft(i)+'.jpg';
                        break;
                    case 3:
                        imgSrc = '/src/dist/images/straps3/straps3__'+self.appendLeft(i)+'.jpg';
                        break;
                    default:
                        imgSrc = '/src/dist/images/straps1/straps1_'+self.appendLeft(i)+'.jpg';
                }
                $('.show-animate img').attr('src',imgSrc);
                if(increase){
                    i = i+4;
                    if(i>99){
                        increase = false;
                    }
                }else{
                    i=i-4;
                    if(i<4){
                        increase = true;
                    }
                };

            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        doAni.start();


    };
    //generate product,go share page
    controller.prototype.generate = function(){
        var self = this;
        //    api
        Api.make(self.objSelect,function(data){
            if(data.status==1){
                var curId = data.msg;
                Common.gotoPin(2);
                self.doGenerateAni(self.objSelect.background);
                weixinshare({
                    title1: 'RockStud Guitar Strap',
                    des: 'RockStud Guitar Strap',
                    link: 'http://guitarstrapvalentino.samesamechina.com/match?id='+curId,
                    img: 'http://guitarstrapvalentino.samesamechina.com/src/dist/images/done-bg-1.jpg'
                },function(){
                    window.location.href = '/match?id='+curId
                });
            }
        });

        //Common.gotoPin(2);
        //self.doGenerateAni(self.objSelect.background);
        //weixinshare({
        //    title1: 'tt',
        //    des: 'des',
        //    link: 'http://guitarstrapvalentino.samesamechina.com/match?id=1',
        //    img: 'http://guitarstrapvalentino.samesamechina.com/dist/images/done-bg-1.jpg'
        //},function(){
        //
        //});




    };

    if (typeof define === 'function' && define.amd){
        // we have an AMD loader.
        define(function(){
            return controller;
        });
    }
    else {
        this.controller = controller;
    }

}).call(this);

//dom ready
$(document).ready(function(){

    var welcome = new controller();
    welcome.init();


});




