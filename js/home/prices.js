function loadDefaultPlasticsPrice()
 {
     $.post('index.php?r=home/prices/Plastics/Search',{'company':-1,'item':-1,'number':-1},function(rtn){
          
         $.each(rtn,function(i,item){
            writePlasticsPriceList(item); 
         });
     },'json');
    
                                              
 }
 
 function loadPlasticsPrice()
  {
      var plasticsItem      = $('#plasticsItem').val();
      var plasticsNumber    = $('#plasticsNumber').val();
      var plasticsCompany   = $('#plasticsCompany').val();
      var plasticsPubDate   = $('#plasticsPubDate').val();
      
      if(plasticsPubDate == null)  plasticsPubDate = -1; 
      
      $.post('index.php?r=home/prices/Plastics/Search',{'pub_date':plasticsPubDate,'item':plasticsItem,'number':plasticsNumber,'company':plasticsCompany},function(rtn){
         
         $('#plasticsPriceList').empty();
         
         if(rtn.length < 1) 
            writePlasticsPriceNullList();
          
         $.each(rtn,function(i,item){
            writePlasticsPriceList(item);
         }); 
         
         
     },'json');
  }
  
   function writePlasticsPriceNullList()
   {                                 
       html = '<tr>';
              html += '<td colspan="6" style="height:150px;line-height:90px;font-size:16px;color:#F60;border:0;">对不起，暂时没有符合条件的价格数据，请调整您的搜索条件!</td>';
              html += '</tr>';
                
           $('#plasticsPriceList').append(html);  
   }
   
 function writePlasticsPriceList(item)
   {                                 
       html = '<tr>';
              html += '<td width="10%" class="blue">' + item.commodity + '</td>';
              html += '<td width="15%">' + item.number + '</td>';
              html += '<td width="20%">' + item.company + '</td>';
              html += '<td width="20%">' + item.area + '</td>';
              html += '<td width="15%" class="red">' + item.price + '</td>';
              html += '<td width="18%">' + item.pub_date + '</td>';
              html += '</tr>';
                
           $('#plasticsPriceList').append(html);  
   }
                     
   function loadItems(num,item_sef,number_sef,company_sef)
    {   
        $.getJSON('/js/home/menu.json', function(data) { 
          
           var item     = $('#plasticsItem').val();
           var number   = $('#plasticsNumber').val();
           var company  = $('#plasticsCompany').val();
                    
          switch(parseInt(num))
           {            
               //ITEM 
               case -1:
                  $('#plasticsItem').empty();
                  $('#plasticsItem').append('<option value="-1">请选择</options>');
                  $.each(data,function(n){ 
                        $('#plasticsItem').append('<option vlaue="' + n + '">' + n + '</option>'); 
                        
                  }); 
                  
                  if(item_sef != "undefined") { $('#plasticsItem').val(item_sef); loadItems(1,item_sef,number_sef,company_sef);}
                        
               case 1:
                 $('#plasticsNumber').empty();
                 $('#plasticsCompany').empty();
                 
                 $('#plasticsNumber').append('<option value="-1">请选择</options>');
                 $('#plasticsCompany').append('<option value="-1">请选择</options>');
                 
                 
                 $.each(data,function(n,n_obj){ 
                      if(n == item)
                       {
                           $.each(n_obj,function(k){    
                                $('#plasticsNumber').append('<option vlaue="' + k + '">' + k + '</option>');
                            });
                            
                            if(number_sef != "undefined") { $('#plasticsNumber').val(number_sef); loadItems(2,'',number_sef,company_sef);}
                          
                           return false;     
                       }                                                                
                  });
                       
               break;
               
               
               case 2:
                  $('#plasticsCompany').empty();
                  $('#plasticsCompany').append('<option value="-1">请选择</options>');
                    
                  $.each(data,function(n,n_obj){ 
                       if(n == item)
                           {
                               $.each(n_obj,function(k,k_obj)
                                {    
                                   if(k == number)
                                     {
                                         $.each(k_obj,function(l)
                                           {    
                                                $('#plasticsCompany').append('<option vlaue="' + k_obj[l] + '">' + k_obj[l] + '</option>');
                                           }); 
                                           
                                        return false;  
                                     }
                                });
                                
                                if(company_sef != "undefined") $('#plasticsCompany').val(company_sef);
                                              
                               return false;     
                           }                                                                
                   });                                                          
               break;
           }
            
        }); 
  }
