;(function(){

    var controller = function(){



    };
    //init
    controller.prototype.init = function(){
        var self = this;
        var baseurl = 'src/dist/images/';
        var imagesArray = [

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

    //bind event
    controller.prototype.bindEvent = function(){

        var self  = this;

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




