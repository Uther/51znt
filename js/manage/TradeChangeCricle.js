function changeCircle(trade_id,cricle_id)
{
    asyncbox.open({          
        url     :   '/index.php?r=manage/enterprise_site/trade/ChangeCircle&trade_id='+trade_id+'&cricle_id'+cricle_id, 
　　　  width   :  400,
　　    height  :  300,
        title   :  '修改所在商圈',     
        btnsbar : [{text    : '保存',                  //按钮文本
                      action  : 'save_1'             //按钮 action 值，用于按钮事件触发 唯一
                     },{text: '删除商圈',action:'del'}].concat($.btn.CANCEL),
        callback : function(action,iframe){
　　　　　//判断 action 值。
            ///alert(action);
              var opt = null;
            
    　　　　　if(action == 'save_1'){
    　　　　　　　opt = 'save';
    　　　　　}
    
                //删除商圈
                if(action == 'del') {
                   opt = 'del';  
                }
                         
                if(opt != null)
                 {   
                      $.post('/index.php?r=manage/enterprise_site/trade/ChangeCircle',
                        {'trade_id':iframe.$('#trade_id').val(),'cricle_id':iframe.$('#cricle_id').val(),'opt':opt},
                        function(data){
                                switch(parseInt(data.tag))
                                {
                                    case 1:
                                        $('#trade_circle_'+trade_id).text(data.msg);
                                    break;
                                    
                                    case 2:
                                        alert(data.msg);
                                    break;
                                    
                                    default:
                                        alert('执行失败,未知错误!');
                                    break;
                                }
                            },
                        'json'
                      );
                 }
              
    　　　}

　   });
}