;(function(){

    var controller = function(){
        this.enableMove = true;
        this.firstStop = true;
        this.secondStop = false;
        this.thirdStop = false;
        this.enableTrackingAnimated = false;
        /*each transition end set to ++*/
        /*we have 8 transition end for chicken element*/
        this.curStep = 0;
        //this.firstStop = true;
        this.floor1_imageArray = [];
        this.facade_imageArray = [];
        this.floor2_before_imageArray = [];
        this.floor2_after_imageArray = [];
        this.floor3_afterArrow_imageArray = [];
        this.suprise_imageArray = [];
        var ArrLength=120;
        var newstring='',newstring2='',newstring3='',newstring4='',newstring5='',newstring6='';
        for(var i=0;i<ArrLength;i=i+6){
            if(i<10){
                newstring='src/dist/images/'+'floor_withoutbg/1floorwithoutbg_0000'+i+'.png';
                newstring2='src/dist/images/'+'facade_alone/facadealone_0000'+i+'.png';
                newstring3='src/dist/images/'+'2before/2before_0000'+i+'.png';
                newstring4='src/dist/images/'+'3afterarrow/3afterarrow_0000'+i+'.png';
                newstring5='src/dist/images/'+'endingpage_frame2/endingpage_0000'+i+'.jpg';
                newstring6='src/dist/images/'+'2afterframe/2afterframe_0000'+i+'.png';
            }else if(i>9 && i<100){
                newstring='src/dist/images/'+'floor_withoutbg/1floorwithoutbg_000'+i+'.png';
                newstring2='src/dist/images/'+'facade_alone/facadealone_000'+i+'.png';
                newstring3='src/dist/images/'+'2before/2before_000'+i+'.png';
                newstring4='src/dist/images/'+'3afterarrow/3afterarrow_000'+i+'.png';
                newstring5='src/dist/images/'+'endingpage_frame2/endingpage_000'+i+'.jpg';
                newstring6='src/dist/images/'+'2afterframe/2afterframe_000'+i+'.png';
            }else{
                newstring='src/dist/images/'+'floor_withoutbg/1floorwithoutbg_00'+i+'.png';
                newstring2='src/dist/images/'+'facade_alone/facadealone_00'+i+'.png';
                newstring3='src/dist/images/'+'2before/2before_00'+i+'.png';
                newstring4='src/dist/images/'+'3afterarrow/3afterarrow_00'+i+'.png';
                newstring5='src/dist/images/'+'endingpage_frame2/endingpage_00'+i+'.jpg';
                newstring6='src/dist/images/'+'2afterframe/2afterframe_00'+i+'.png';
            }
            this.floor1_imageArray.push(newstring);
            this.facade_imageArray.push(newstring2);
            this.floor2_before_imageArray.push(newstring3);
            this.floor3_afterArrow_imageArray.push(newstring4);
            this.suprise_imageArray.push(newstring5);
            this.floor2_after_imageArray.push(newstring6);
        };


    };
    //init
    controller.prototype.init = function(){
        var self = this;
        var baseurl = 'src/dist/images/';
        var imagesArray = [
            baseurl+'3eventbefore.png',
            baseurl+'f3-1.png',
            baseurl+'maintips.png',
            baseurl+'mask-floor2.png',
            baseurl+'mask-floor3.png',
            baseurl+'text-2.png',
            baseurl+'0facade_bg.gif',
            baseurl+'0facade_title.gif',
            baseurl+'1eventafter2.gif',
            baseurl+'1eventbefore2.gif',
            baseurl+'1floorbg.jpg',
            baseurl+'2floorbg.jpg',
            baseurl+'3floorbg.jpg',
            baseurl+'chickens.gif',
            baseurl+'dialogue-btn-text.png',
            baseurl+'dialogue-content-text.png',
            baseurl+'dialoguebg1.gif',
            baseurl+'dialoguebg2.gif',
            baseurl+'p3-t1.png',
            baseurl+'pipe.png',
            baseurl+'qr-code.png',
            baseurl+'result1.png',
            baseurl+'result2.png',
            baseurl+'result3.png',
            baseurl+'share.jpg',
            baseurl+'icon-bgm.png',
        ];
        imagesArray = imagesArray.concat(self.floor1_imageArray).concat(self.facade_imageArray).concat(self.floor2_before_imageArray).concat(self.floor3_afterArrow_imageArray).concat(self.suprise_imageArray).concat(self.floor2_after_imageArray);
        var i = 0;
        new preLoader(imagesArray, {
            onProgress: function(){
                i++;
                var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                $('.preload .v-content').html('已加载'+progress+'%');
            },
            onComplete: function(){
                //
                //
                $('.preload').remove();
                $('.container').addClass('fade');
                //self.welcomePage();
                self.doGame();
                //self.getSurprise();
                self.bindEvent();
            }
        });


    };

    //welcome page
    controller.prototype.welcomePage = function(){
        var self = this;
        //go first page
        Common.gotoPin(0);
        var j=0;
        var reqAnimateHome = new reqAnimate($('#pin-home .content img'),{
            fps: 6,
            totalFrames: 20,
            //time: 0,
            processAnimation: function(){
                var imgName = self.facade_imageArray[j];
                if(j>self.facade_imageArray.length-2){
                    j=0;
                }
                j++;
                $('#pin-home .content img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateHome.start();


    };

    //bind event
    controller.prototype.bindEvent = function(){

        var self  = this;

        //for bgm
        var bgmEle = document.getElementById('bgm');
        bgmEle.play();
        $('.icon-bgm').addClass('play');
        var isPlaying = true;
        $('.icon-bgm').on('touchstart',function(){
            $(this).toggleClass('play');
            if(isPlaying){
                bgmEle.pause();
                isPlaying=false;
            }else{
                bgmEle.play();
                isPlaying=true;
            }

        });

        //for homepage
        //    click page, go game page
        $('#pin-home').on('touchstart',function(){
            //reqAnimateHome.cancel();
            self.enableTrackingAnimated = true;
            self.doGame();
        });

        //for game page
        var container = $('.pin-content');
        var scrren_1 = $('.screen-1'),
            scrren_2 = $('.screen-2'),
            scrren_3 = $('.screen-3');

        var ele = document.getElementById('action-chicken');
        //var step = 10;
        //$('.role').css('top',floor1PosY);
        ele.addEventListener('transitionend',function(){
            var maxPosX = container.width();
            var chickenLength = $(ele).width()*0.6;
            var firstLevelPosX = container.width()*0.45 - chickenLength;
            var floor2LevelPosX =$('#floor2').width()*0.4,
                floor2PosY = scrren_2[0].offsetTop + scrren_2.height() - $('.role').height(),
                floor3PosY = 0;
            var floor3PosXEnd = $('#floor2').width()*0.77 - $(ele).width()*0.5;
            if(self.enableTrackingAnimated){
                switch (self.curStep)
                {
                    case 0:
                        console.log("floor1: from left to middle");
                        //console.log(self.curStep);
                        $(ele).removeClass('shorttime').addClass('longtime');
                        $('#floor1 .dialogue').addClass('show');
                        break;
                    case 1:
                        console.log("floor1: from middle to  right");
                        $('.role').css('top',floor2PosY);
                        $(ele).addClass('change');
                        self.curStep++;
                        break;
                    case 2:
                        console.log("floor1-2: from floor1 right to floor2 right");
                        $(ele).css('left',floor2LevelPosX);
                        $('.role').addClass('floor2mask');
                        self.curStep++;
                        break;
                    case 3:
                        console.log("floor2: from right to middle");
                        $('#floor2 .dialogue').addClass('show');

                        break;
                    case 4:
                        console.log("floor2: from middle to left");
                        $('.role').css('top',floor3PosY);
                        $(ele).removeClass('change');
                        self.curStep++;
                        break;
                    case 5:
                        console.log("floor2-3: from floor2 left to floor3 left");
                        $('.role').css('top',floor3PosY).addClass('floor3mask');
                        $(ele).css('left',firstLevelPosX);
                        self.curStep++;
                        break;
                    case 6:
                        console.log("floor3: from floor3 left to middle");
                        $('#floor3 .dialogue').addClass('show');
                        break;
                    case 7:
                        console.log("floor3: from floor3 middle to right");
                        //transform the element
                        self.animateForFloor3();
                        //$(ele).css({
                        //    left:firstLevelPosX+250,
                        //    bottom:0,
                        //});
                        $(ele).css('left',floor3PosXEnd);
                        self.curStep++;
                        break;
                    case 8:
                        console.log("floor3: from floor3 right to out");
                        $(ele).addClass('changedirection').css({
                            left:floor3PosXEnd+$(ele).width(),
                            bottom:$(ele).height(),
                        });
                        self.curStep++;
                        break;
                    case 9:
                        console.log("floor3: from floor3 out to hide");
                        self.enableTrackingAnimated = false;
                        self.getSurprise();
                        break;
                };
            }


        });

        $('#floor1 .dialogue-btn').on('touchstart',function(){
            var maxPosX = container.width();
            if(self.curStep==0){
                $('#floor1 .dialogue').removeClass('show');
                //after animation
                $('#floor1 .level').addClass('after');
                $('#floor1 .level img').attr('src','/src/dist/images/1eventafter2.gif');
                $(ele).css('left',maxPosX);
                self.curStep++;
            }
        });
        $('#floor2 .dialogue-btn').on('touchstart',function(){
            var minPosX = -$(ele).width();
            if(self.curStep ==3){
                $('#floor2 .dialogue').removeClass('show');
                //after animation
                //$('#floor2 .level').addClass('fadein');
                //$('#floor2 .level img').attr('src','/src/dist/images/1eventafter2.gif');
                //do bg animation
                self.animateForFloor2Before(false);
                $(ele).css('left',minPosX);
                self.curStep++;
            }
        });
        $('#floor3 .dialogue-btn').on('touchstart',function(){
            var floor3PosXEnd = $('#floor2').width()*0.77 - $(ele).width()*0.5;
            if(self.curStep ==6){
                $('#floor3 .dialogue').removeClass('show');
                //after animation
                $('#floor3 .level').addClass('fadein');
                $(ele).css('left',floor3PosXEnd-20);
                self.curStep++;
            }
        });

    //    for result page
        //click ask btn, go exchange
        $('.result-ask .btn').on('touchstart', function(){
            $('.result-ask').removeClass('show');
            var selectedResult = Math.floor(Math.random()*3);
            $('.result').eq(selectedResult).addClass('show');
        });

        //click go to qrcode part
        $('.result .btn-exchange').on('touchstart', function(){
            $('.result').removeClass('show');
            $('.qrcode').addClass('show');
        });

        //qrcode
        $('.qrcode .btn-exchange').on('touchstart', function(){
            Common.gotoPin(0);
            $('.result-ask').addClass('show');
            $('.qrcode').removeClass('show');
        });
    };

    //game page
    controller.prototype.doGame = function(){
        var self = this;
        Common.gotoPin(1);
        self.animateForFloor2Before(true);
        self.animateForFloor1();
        self.enableTrackingAnimated = true;

        var container = $('.pin-content');
        var scrren_1 = $('.screen-1');

        var ele = document.getElementById('action-chicken');
        var chickenLength = $(ele).width()*0.6;
        var firstLevelPosX = container.width()*0.45 - chickenLength;

        var floor1PosY = scrren_1[0].offsetTop + scrren_1.height() - $('.role').height();
        $('.role').css('top',floor1PosY);
        //$(ele).addClass('shorttime').css('left',firstLevelPosX);

    };
    controller.prototype.animateForFloor2Before = function (isbefore) {
        var self = this;
        var j = 0;
        var i= 0,k=0;
        var $w = $('#floor2 .l-bg1').width(),
            $h = $('#floor2 .l-bg1').height();
        var reqAnimateFloor2Before,reqAnimateFloor2After;
        reqAnimateFloor2Before = new reqAnimate($('#floor2 .l-bg1'),{
            fps: 6,
            totalFrames: 20,
            //time: 0,
            processAnimation: function(){
                //var pos = 100*(i%4)/3+'%' + ' '+ 100*(k%5)/4+'%';
                var pos = -$w*(i%4) + 'px '+ '-'+$h*(k%5)+'px';
                if((i+1)%4==0){
                    k++;
                }
                i++;
                //console.log(pos);
                $('#floor2 .l-bg1').css('background-position',pos);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateFloor2Before.start();

        reqAnimateFloor2After = new reqAnimate($('#floor2 .l-bg2 img'),{
            fps: 6,
            totalFrames: 20,
            //time: 0,
            processAnimation: function(){
                var imgName;
                imgName = self.floor2_after_imageArray[j];
                if(j>self.floor2_after_imageArray.length-2){
                    j=0;
                }
                j++;
                $('#floor2 .l-bg2 img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });

        //if(isbefore){
        //    reqAnimateFloor2Before.start();
        //    $('#floor2 .l-bg1').addClass('current');
        //    $('#floor2 .l-bg2').removeClass('current');
        //}else{
        //    reqAnimateFloor2After.start();
        //    $('#floor2 .l-bg2').addClass('current');
        //    $('#floor2 .l-bg1').removeClass('current');
        //}


    };
    controller.prototype.animateForFloor1 = function () {
        var self = this;
        var j = 0;
        var reqAnimateNow = new reqAnimate($('#floor1 .l-bg img'),{
            fps: 6,
            totalFrames: 20,
            //time: null,
            processAnimation: function(){
                var imgName = self.floor1_imageArray[j];
                if(j>self.floor1_imageArray.length-2){
                    j=0;
                }
                j++;
                //console.log('test');
                $('#floor1 .l-bg img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateNow.start();

    };

    controller.prototype.animateForFloor3 = function () {
        var self = this;
        var j = 0;
        var reqAnimateFloor3 = new reqAnimate($('#floor3 .arrow img'),{
            fps: 6,
            totalFrames: 20,
            time: 1,
            processAnimation: function(){
                var imgName = self.floor3_afterArrow_imageArray[j];
                if(j>self.floor3_afterArrow_imageArray.length-2){
                    j=0;
                }
                j++;
                $('#floor3 .arrow img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateFloor3.start();

    };

    //go surprise page
    controller.prototype.getSurprise = function(){
        var self = this;
        Common.gotoPin(2);
        self.surpriseBgAni();

        //reset page game
        $('#pin-game .role').removeClass('floor2mask floor3mask');
        $('#pin-game .role-progress').removeClass('longtime changedirection shorttime').css({
            bottom:0,
            left:0
        });
        self.curStep=0;

    };

    controller.prototype.surpriseBgAni = function () {
        var self = this;
        var j = 0;
        var reqAnimateSurpriseBgAni = new reqAnimate($('#pin-surprise .result-wrap img'),{
            fps: 5,
            totalFrames: 20,
            //time: 1,
            processAnimation: function(){
                var imgName = self.suprise_imageArray[j];
                if(j>self.suprise_imageArray.length-2){
                    j=0;
                }
                j++;
                $('#pin-surprise .result-wrap img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateSurpriseBgAni.start();

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




