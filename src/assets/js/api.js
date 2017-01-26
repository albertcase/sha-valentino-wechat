/*All the api collection*/
Api = {
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
        //    msg:'success'
        //})


    },

    //获取匹配列表
    //id
    matchlist:function(obj,callback){
        //Common.msgBox('loading...');
        //$.ajax({
        //    url:'/api/order',
        //    type:'POST',
        //    dataType:'json',
        //    data:obj,
        //    success:function(data){
        //        //data.msg : {'nickname': aaa,'background':1, 'color':1,'content':'AB'},
        //        //data.list : [{'nickname': bbb,'background':1, 'color':1,'content':'AB'},
        //        //    {'nickname': ccc,'background':2, 'color':3,'content':'BC'}]
        //        $('.ajaxpop').remove();
        //        return callback(data);
        //    }
        //});



        return callback({
            status:'1',
            msg : {'nickname': 'aaa','background':1, 'color':1,'content':'AB'},
            //list:[]
            list : [{'nickname': 'bbb','background':1, 'color':1,'content':'AB'}, {'nickname': 'ccc','background':2, 'color':3,'content':'BC'}]
        })


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