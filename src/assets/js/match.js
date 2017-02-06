;(function(){

    var controller = function(){

        this.stropsList = [
            {
                id:'1',
                src:'/src/dist/images/straps-1.png'
            },
            {
                id:'2',
                src:'/src/dist/images/straps-3.png'
            },
            {
                id:'3',
                src:'/src/dist/images/straps-4.png'
            },
            {
                id:'4',
                src:'/src/dist/images/straps-2.png'
            },
        ];
        //default selected value
        //background has four: 1,2,3,4
        //color has two: 1,2
        //content:a-zA-Z
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
            baseurl+'single-pipe-1.png',
            baseurl+'single-pipe-4.png',
            baseurl+'single-pipe-3.png',
            baseurl+'m-1.png',
            baseurl+'m-2.png',
            baseurl+'m-3.png',
        ];
        var i = 0;
        new preLoader(imagesArray, {
            onProgress: function(){
                i++;
                var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                $('.preload .v-content').html(''+progress+'%');
            },
            onComplete: function(){
                //
                //
                $('.preload').remove();
                $('.container').addClass('fade');
                //self.welcomePage();
                self.bindEvent();

            //    load match
                var nowId = Common.getParameterByName('id');
                Api.matchlist({id:nowId},function(data){
                    console.log(data);
                    self.match(data);
                });

            //    test
            //    console.log(self.matchFilter(1,1,2,2));

            }
        });


    };

    //go next step:custom letter
    controller.prototype.goCustomLetter = function(){
        var self = this;
        $('.switch-menu .step-1').removeClass('current').siblings('.step').addClass('current');
        $('#select-page .show-word').addClass('fadein');
    };

    //match all the pipe
    controller.prototype.match = function(obj){
        var self = this;
        if(!(obj.status == 1)){
            alert(obj.msg);
            return;
        };


        //not custom,go custom page
        //console.log(!obj.msg);
        //console.log(typeof obj.msg);
        if(!obj.msg){
            Common.goHomePage();
            return;
        }

        //nobody match, show yourself pipe
        if(obj.list.length<1){

            //slideHtml = '<div class="show-animate">'+
            //    '<img src="/src/dist/images/straps1/straps1_00000.jpg" alt=""/>'+
            //    '</div>'+
            //    '<div class="show-word">'+
            //    '<span class="letter letter-a" id="first-letter-1"></span>'+
            //    '<span class="letter letter-b" id="second-letter-2"></span>'+
            //    '</div>';

            Common.gotoPin(1);
            self.objSelect = {
                background:obj.msg.background,
                color:obj.msg.color,
                content:obj.msg.content
            };
            self.doGenerateAni(obj.msg.background);

            return;
        };

        var slideHtml = '';
    //    has match, do the list
        for(var i=0;i<obj.list.length;i++){
            slideHtml = slideHtml+'<div class="swiper-slide"><div class="nickname"><span class="name-you">'+obj.list[i].nickname+'</span>和<span class="name-me">我</span></div>'+
                '<div class="generate-show">'+
                '<div class="item-match item-match-me"> <div class="pipe"> <img src="/src/dist/images/single-pipe-'+obj.msg.background+'.png" alt=""/> </div>'+
                '<div class="show-word '+((obj.msg.color==1)?'':'whiteandblack')+'">'+
                '<span class="sw-1 letter letter-'+obj.msg.content.substring(0,1).toLowerCase()+'"></span>'+
                '<span class="sw-2 dot"></span>'+
                '<span class="sw-3 letter letter-'+obj.msg.content.substring(1,2).toLowerCase()+'"></span>'+
                '<span class="sw-4 dot"></span>'+
                '</div>'+
                '</div>'+
                '<div class="item-match item-match-you">'+
                '<div class="pipe">'+
                '<img src="/src/dist/images/single-pipe-'+obj.list[i].background+'.png" alt=""/>'+
                '</div>'+
                '<div class="show-word '+((obj.list[i].color==1)?'':'whiteandblack')+'">'+
                '<span class="sw-1 letter letter-'+obj.list[i].content.substring(0,1).toLowerCase()+'"></span>'+
                '<span class="sw-2 dot"></span>'+
                '<span class="sw-3 letter letter-'+obj.list[i].content.substring(1,2).toLowerCase()+'"></span>'+
                '<span class="sw-4 dot"></span>'+
                '</div>'+
                '</div>'+
                '<div class="match-des">'+
                '<div class="title">'+
                '<img src="/src/dist/images/m-1.png" alt=""/>'+
                '</div>'+
                '<div class="match-percent">'+
                '<label>相配指数</label>'+
                '<span class="num">'+self.matchFilter(obj.msg.background,obj.list[i].background,obj.msg.color,obj.list[i].color)+'<sup>%</sup></span>'+
                '</div>'+
                '<div class="fromto">'+
                '<span class="fromlabel">from</span>'+
                '<span class="name-me">'+obj.msg.nickname+'</span>'+
                '<span class="andlabel">and</span>'+
                '<span class="name-you">'+obj.list[i].nickname+'</span>'+
                '</div></div></div></div>';
        }

        $('.swiper-wrapper').append(slideHtml);
        Common.gotoPin(0);

        var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            //direction: 'horizen',
            loop: false,

            // If we need pagination
            //pagination: '.swiper-pagination',

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            // And if we need scrollbar
            //scrollbar: '.swiper-scrollbar',
        });


    };
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
        var i= 0,j=0;
        //background-size
        var doGenerateAni;
        var increase = true,showWord = false;
        var imgSrc='';
        var doAni = new reqAnimate($('.show-animate img'),{
            fps: 6,
            totalFrames: 70,
            time: 20,
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
                    if(!showWord){
                        i = i+4;
                    }else{
                        j++;
                        //console.log(j);
                    };
                    if(i>99){
                        //console.log(j);
                        showWord = true;
                        if(j==1){
                            if(self.objSelect.color==2){
                                $('.show-word').addClass('whiteandblack');
                            }
                            $('.show-word').addClass('fadein');
                            $('#doneshare-page .sw-1').attr('class','sw-1 letter letter-'+self.objSelect.content.substring(0,1).toLowerCase());
                            $('#doneshare-page .sw-3').attr('class','sw-3 letter letter-'+self.objSelect.content.substring(1,2).toLowerCase());
                            //self.objSelect
                        }
                        if(j==18){
                            $('.show-word').removeClass('fadein');
                        }
                        if(j>20){
                            increase = false;
                            j=0;
                        }
                    }
                }else{
                    i=i-4;
                    if(i<4){
                        increase = true;
                        showWord = false;
                    }
                };

            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        doAni.start();


    };
    //匹配度
    controller.prototype.matchFilter = function(a1,a2,b1,b2){
    //    包带相同，字体颜色相同，95-100随机
    //    包带相同，字体颜色不同，90-94随机
    //    包带不同，字体颜色相同，85-89随机
    //    包带不同，字体颜色不同，80-84随机
    //    a is 包带，b is 字体颜色
        var matchNum=80;
        if(a1==a2){
            if(b1==b2){
                matchNum = Math.random()*5+95;
            }else{
                matchNum = Math.random()*5+90;
            }
        }else{
            if(b1==b2){
                matchNum = Math.random()*5+85;
            }else{
                matchNum = Math.random()*5+80;
            }
        };
        return Math.round(matchNum);



    };
    //bind event
    controller.prototype.bindEvent = function(){

        var self  = this;

        //    select the style
        $('.step-1 .lists .item').on('touchstart',function(){
            var curIndex = $(this).index();
            $(this).addClass('active').siblings('.item').removeClass('active');
            $('.show-img img').attr('src',self.stropsList[curIndex].src);
            self.objSelect.background = curIndex;
        });

        //select the color
        $('.step-2 .lists .item').on('touchstart',function(){
            var curIndex = $(this).index();
            self.objSelect.color = curIndex;
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
            if(!nextStep) return;
            nextStep = false;
            self.goCustomLetter();
        });

        //    input the alphabet
        $('.input-custom').on('keyup',function(){
            //console.log($(this).val());
            var curVal = $(this).val();
            var firstLetter = curVal.substring(0,1);
            var secondLetter = curVal.substring(1,2);
            if(self.validateAlphabet(firstLetter)){
                $('#first-letter').attr('class','letter letter-'+firstLetter.toLowerCase());
            };
            if(self.validateAlphabet(secondLetter)){
                $('#second-letter').attr('class','letter letter-'+secondLetter.toLowerCase());
            };

        });




    };
    //validate the input is a-z or A-Z
    controller.prototype.validateAlphabet = function(val){
        var self = this;
        var regAlphabet=/^[A-Za-z]$/;
        return regAlphabet.test(val);

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




