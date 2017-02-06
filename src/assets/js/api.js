/*All the api collection*/
Api = {
//{"status":1,"msg":{"id":1,"uid":1,"nickname":"123","background":1,"color":1,"content":"AB"}}
///api/islogin  没有作品的返回
//{"status":0,"msg":"\u672a\u5b8c\u6210\u4f5c\u54c1"}

    //判断用户是否已经生成自己的作品
    isLogin:function(callback){
        Common.msgBox('loading...');
        $.ajax({
            url:'/api/islogin',
            type:'POST',
            dataType:'json',
            success:function(data){
                $('.ajaxpop').remove();
                return callback(data);
                //status=1 有库存
            }
        });

        //return callback({
        //    "status":1,
        //    "msg":{
        //        "id":1,
        //        "uid":1,
        //        "nickname":"123",
        //        "background":2,
        //        "color":2,
        //        "content":"AB"
        //    }
        //});


    },
    //生成自己的结果
    make:function(obj,callback){
        Common.msgBox('loading...');
        $.ajax({
            url:'/api/make',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                $('.ajaxpop').remove();
                return callback(data);
                //status=1 有库存
            }
        });

        //return callback({
        //    status:1,
        //    msg:'12'
        //})


    },

    //获取匹配列表
    //id
    matchlist:function(obj,callback){
        Common.msgBox('loading...');
        $.ajax({
            url:'/api/list',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                //data.msg : {'nickname': aaa,'background':1, 'color':1,'content':'AB'},
                //data.list : [{'nickname': bbb,'background':1, 'color':1,'content':'AB'},
                //    {'nickname': ccc,'background':2, 'color':3,'content':'BC'}]
                $('.ajaxpop').remove();
                return callback(data);
            }
        });

        
        //return callback({
        //    status:'1',
        //    msg : {'nickname': 'aaa','background':1, 'color':1,'content':'AB'},
        //    //msg : null,
        //    //list:[]
        //    list : [{'nickname': 'bbb','background':1, 'color':1,'content':'AB'}, {'nickname': 'ccc','background':2, 'color':3,'content':'BC'}]
        //})


    },
    //预约到店
    //sex name mobile email store
    reservation:function(obj,callback){
        Common.msgBox('loading...');
        $.ajax({
            url:'/api/submit',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                $('.ajaxpop').remove();
                return callback(data);
            }
        });
    },



};