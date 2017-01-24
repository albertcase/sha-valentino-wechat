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
        ];
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
                self.bindEvent();
            }
        });


    };

    //welcome page
    controller.prototype.welcomePage = function(){
        var self = this;


    };

    //go next step:custom letter
    controller.prototype.goCustomLetter = function(){
        var self = this;
        $('.switch-menu .step-1').removeClass('current').siblings('.step').addClass('current');
        $('#select-page .show-word').addClass('fadein');
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

        var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            //direction: 'horizen',
            loop: true,

            // If we need pagination
            //pagination: '.swiper-pagination',

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            // And if we need scrollbar
            //scrollbar: '.swiper-scrollbar',
        })


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




