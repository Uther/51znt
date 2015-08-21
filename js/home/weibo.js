var lastID=0;
var sinceID=0;
var current_divid='list_1';
function showCircles(id)
{
    $(".showCircles").hide();
    //anyWayClick();
    
    $("#showCircles_" + id).toggle();
}

function hideCircles()
{
    $(".showCircles").hide();
}


function anyWayClick()
{
    $(document).bind('click', function(){
		$("#wb_ht_fr").hide();
    });
}

function unAnyWayClick()
{
    $(document).unbind('click');
}

function showComment(wid)
{
	var circles_id = $('#circles_id').val(); 
	if($("#msgback_" + wid).css('display')=='none')
	{
		$("#msgback_" + wid).show();
		doAjax('/home/circlesHome/weiBo/showComment','wid='+wid+'&circles_id='+circles_id,function(data){
			$("#comment_" + wid).html(data).show(300);
		});
	}
	else
	{
		$("#msgback_" + wid).hide();
		$("#comment_" + wid).html('').hide(300);
	}
}

function showZf(wid,type)
{
	doAjax('/home/circlesHome/weiBo/showZf','wid='+wid+'&type='+type,function(data){
		$("#windowforward").html(data);
		ShowWindow("windowforward");
		$("#windowforward").addClass('zfkuang');
		checkTextNum(140,'#zf_wordnum','#zf_content','#zf_publish');
	});
}

function showAddTrade(circles_id)
{
	doAjax('/home/circlesHome/weiBo/addTrade','circles_id='+circles_id,function(data){
		openFloatDiv(data);
		$("#windowforward").removeClass('zfkuang');
		//ShowWindow("windowforward");
	});
}


//发布
function publish()
{
    if($.trim($('#content').val())=='')
	{
		$Common.AlertAuto('发布内容不能为空！',300,'温馨提示');
		return;
	}
	if($.trim($('#content').val())==('#请在这里输入自定义话题标题#'))
	{
		$Common.AlertAuto('对不起，请输入话题内容！',300,'温馨提示');
		return;
	}
	var wtype = $('#wtype').val();
	var wtype_list = $('#wtype_list').val();
	doAjax('/home/circlesHome/weiBo/publish',{
			circles_id: $('#circles_id').val(),
			wtype: wtype,
			ispublic: $('#ispublic').attr('checked')?1:0,
			content: $('#content').val(),
			simg: $('#simg').val(),
			topics_id: $('#topics_id').val(),
			lastID: lastID
		},
		function(data){
			//$("#wb_contents").prepend(data);
			$('#content,#simg').val(default_string);
			$('#simg').val('');
			$('#img_result').hide();
			$('#img_result a em').html('');
			$('#file_wraper').show();
			var divid = $('#weibo-types').find('.cur').attr('lang');	
			if(wtype_list==0 || wtype_list==wtype) $("#list_1").find('ul.list').prepend(data);		
		}
	);
}
function comment(wid)
{
    if($.trim($('#comment_content_'+wid).val())=='')
	{
		$Common.AlertAuto('评论内容不能为空！',300,'温馨提示');
		return;
	}
	doAjax('/home/circlesHome/weiBo/comment',{
			circles_id: $('#circles_id').val(),
			istranspond: $('#istranspond').val(),	//同时转发
			wid:wid,
			content: $('#comment_content_'+wid).val()
		},
		function(data){
			$("#comment_list_"+wid).prepend(data);
			$('#comment_content_'+wid).val('');
			var count = $('#comment_count_'+wid).text();
			$('#comment_count_'+wid).text(parseInt(count)+1);
		}
	);
}

//转发
function transpond(wid)
{
    if($.trim($('#zf_content').val())=='')
	{
		$Common.AlertAuto('转发内容不能为空！',300,'温馨提示');
		return;
	}
	if($.trim($('#content').val())==('#请在这里输入自定义话题标题#'))
	{
		$Common.AlertAuto('对不起，请输入话题内容！',300,'温馨提示');
		return;
	}
	var wtype = $('#wtype').val();
	var wtype_list = $('#wtype_list').val();
	doAjax('/home/circlesHome/weiBo/transpond',{
			circles_id: $('#circles_id').val(),
			wtype: wtype,
			wid: wid,
			ispublic: $('#zf_ispublic').attr('checked')?1:0,//展示到个人中心
			iscomment: $('#is_comment').attr('checked')?1:0,	//同时评论给原作者
			content: $('#zf_content').val(),
			lastID: lastID
		},
		function(data){
			//$("#wb_contents").prepend(data);
			var count = $('#transfer_count_'+wid).text();
			$('#transfer_count_'+wid).text(parseInt(count)+1);
			HideWindow('windowforward');
			if(wtype_list==0 || wtype_list==wtype) $("#list_1").find('ul.list').prepend(data);	
		}
	);
}

//刷新最新消息
function loadHeadWeibo()
{
	var topics_id = $('#topics_id').val();
	if(topics_id){
		doAjax('/home/circlesHome/weiBo/loadHeadTopicWeibo',{
				topics_id: topics_id,
				wtype: $('#wtype_list').val(),
				lastID: lastID
			},
			function(data){
				$("#list_1").find('ul.list').prepend(data);
				$("#moreHead").html('');
			}
		);
	}else{
		doAjax('/home/circlesHome/weiBo/loadHeadWeibo',{
				circles_id: $('#circles_id').val(),
				wtype: $('#wtype_list').val(),
				lastID: lastID,
				isAjax: 1
			},
			function(data){
				$("#"+current_divid).find('ul.list').prepend(data);
				$("#moreHead").html('');
			}
		);
	}
}

function loadWeiboList()
{
	var keyword = $.trim($('#list_1').find("input[name='keyword']").val());
	doAjax('/home/circlesHome/weiBo/weiboList',{
			circles_id: $('#circles_id').val(),
			wtype: $('#wtype_list').val(),
			keyword: keyword
		},
		function(data){
			$("#list_1").find('.list_data').html(data);
			$("#moreHead").html('');
		}
	);
}

function loadTopicWeiboList()
{
	var keyword = $.trim($('#list_2').find("input[name='keyword']").val());
	doAjax('/home/circlesHome/weiBo/topicWeiboList',{
			topics_id: $('#topics_id').val(),
			keyword: keyword
		},
		function(data){
			$("#list_1").find('.list_data').html(data);
			$("#moreHead").html('');
		}
	);
}

function searchWeibo()
{
	var keyword = $.trim($('#list_1').find("input[name='keyword']").val());
	doAjax('/home/circlesHome/weiBo/weiboList',{
			circles_id: $('#circles_id').val(),
			wtype: $('#wtype_list').val(),
			keyword: keyword
		},
		function(data){
			$("#list_1").find('.list_data').html(data);
			$("#moreHead").html('');
		}
	);
}

function searchTopicList()
{
	var keyword = $.trim($('#list_2').find("input[name='keyword']").val());
	doAjax('/home/circlesHome/weiBo/topicList',{
			circles_id: $('#circles_id').val(),
			keyword: keyword
		},
		function(data){
			$("#list_2").find('.list_data').html(data);
			$("#list_2 .moreHead").html('');
		}
	);
}

function loadHeadTopicList()
{
	doAjax('/home/circlesHome/weiBo/topicList',{
			circles_id: $('#circles_id').val(),
			lastID: lastID
		},
		function(data){
			$("#list_2").find('ul.list').append(data);
			$("#list_2 .moreHead").html('');
		}
	);
}

function loadFootTopicList()
{
	var sinceID = $('#list_2').find('li:last').attr('id').split("_").pop();
	var keyword = $('#'+current_divid).find("input[name='keyword']").val();
	keyword = $.trim(keyword);
	doAjax('/home/circlesHome/weiBo/topicList',{
			circles_id: $('#circles_id').val(),
			sinceID: sinceID,
			tag: 'foot',
			keyword: keyword
		},
		function(data){
			$("#list_2").find('ul.list').append(data);
			if(data=='') $("#list_2 .moreFoot").html('没有更多的数据了');
		}
	);
}

function searchTrade()
{
	var keyword = $.trim($('#list_3').find("input[name='keyword']").val());
	doAjax('/home/circlesHome/weiBo/trade',{
			circles_id: $('#circles_id').val(),
			keyword: keyword,
			TradeType: $('#TradeType').val(),
			InfoType: $('#InfoType').val()
		},
		function(data){
			$("#list_3").find('.list_data').html(data);
		}
	);
}

function searchMembers()
{
	var keyword = $.trim($('#list_6').find("input[name='keyword']").val());
	doAjax('/home/circlesHome/weiBo/members',{
			circles_id: $('#circles_id').val(),
			keyword: keyword,
			country: $('#country').val(),
			province: $('#province').val(),
			city: $('#city').val()
		},
		function(data){
			$("#list_6").find('.list_data').html(data);
		}
	);
}

function countNew()
{
	doAjax('/home/circlesHome/weiBo/countNew',{
			circles_id: $('#circles_id').val(),
			wtype: $('#wtype_list').val(),
			keyword: $('#keyword').val(),
			lastID: lastID
		},
		function(num){
			if(num>0){
				var html = "<a href=\"javascript:void(0)\" onclick=\"loadHeadWeibo()\">有"+num+"条新消息，点击查看</a>";
				//var html = "<a href=\"javascript:void(0)\" onclick=\"location.reload()\">有"+num+"条新消息，点击查看</a>";
				$("#moreHead").html(html);
			}
		}
	);
}

function countTopicNew()
{
	doAjax('/home/circlesHome/weiBo/countTopicNew',{
			keyword: $('#keyword').val(),
			topics_id: $('#topics_id').val(),
			lastID: lastID
		},
		function(num){
			if(num>0){
				//var html = "<a href=\"javascript:void(0)\" onclick=\"loadHeadWeibo()\">有"+num+"条新消息，点击查看</a>";
				var html = "<a href=\"javascript:void(0)\" onclick=\"location.reload()\">有"+num+"条新消息，点击查看</a>";
				$("#moreHead").html(html);
			}
		}
	);
}

//上传图片
function ajaxFileUpload(){
	$.ajaxFileUpload({
        url:'/index.php?r=upload/imageWeibo',//用于文件上传的服务器端请求地址
        secureuri:false,//一般设置为false
        fileElementId:'file',//文件上传空间的id属性  <input type="file" id="file" name="file" />
        dataType: 'json',//返回值类型 一般设置为json
        success: function (data)  //服务器成功响应处理函数
        {
			$('#simg').val(data.simg);
			var imgfull = data.simg.split("\/");
			var imgname = imgfull[imgfull.length - 1];
			$('#file_wraper').hide();
			$('#img_result').show();
			$('#img_result a em').html(imgname);
			$('#img_result a').unbind().bind('click', function(){
				$('#img_result a em').html('');
				$('#img_result').hide();
				$("#simg").val('');
				$("#file_wraper").show();
			});
        },
        error: function (data, status, e)//服务器响应失败处理函数
        {
            //$('#loading').hide();
            alert(e);
        }
    });

	return false;
}
    
function ShowWindow(id){
	var winload=document.getElementById('windowloadback');
	var obj=document.getElementById(id);
	winload.style.display="block";
	obj.style.display="block";
}

function HideWindow(id){
	var winload=document.getElementById('windowloadback');
	var obj=document.getElementById(id);
	winload.style.display="none";
	obj.style.display="none";
}

function openFloatDiv(html)
{
	$('#windowloadback').show();
	$('body').append(html);
}

function closeFloatDiv(id)
{
	$('#windowloadback').hide();
	$('#'+id).remove();
}

function doSubmitTrade()
{
	if($.trim($('#title').val())==''){
		$Common.AlertAuto('标题长度为1-100个字符！',300,'温馨提示');
		$('#title').focus();
		return;
	}
	if($.trim($('#quantity').val())==''){
		$Common.AlertAuto('数量不能为空！',300,'温馨提示');
		$('#quantity').focus();
		return;
	}
	if($.trim($('#public_price').val())==''){
		$Common.AlertAuto('公开报价必须填写!',300,'温馨提示');
		$('#public_price').focus();
		return;
	}
	//if($.trim($('#friend_price').val())==''){
		//$Common.AlertAuto('商友报价也必须填写',300,'温馨提示');
		//$('#friend_price').focus();
		//return;
	//}
	if($.trim($('#origin').val())==''){
		$Common.AlertAuto('货源地必须填写,最多不可以超过30个字!',300,'温馨提示');
		$('#origin').focus();
		return;
	}
	if($.trim($('#location').val())==''){
		$Common.AlertAuto('货物所在地必须填写,最多不可以超过30个字!',300,'温馨提示');
		$('#location').focus();
		return;
	}
	if($.trim($('#detail').val())==''){
		$Common.AlertAuto('详细描述不能为空！建议您详细描述您的货品：性能及优点、产品用途、售后服务、包装等。',300,'温馨提示');
		$('#detail').focus();
		return;
	}	
	
	var options = {
		success: function(msg){
			$Common.AlertAuto(msg,300,'提示');
			closeFloatDiv('windowrelease');
		}
	}
	$('#tradeform').ajaxSubmit(options);
	return false;  
}

function emotions()
{
}

function addtheme(input)
{
	default_string = input;
	if(!input)
	{
		$("#content").focus();
		return;
	}
	//var text = '#请在这里输入自定义话题#';
	var text = input;
	var   patt   =   new   RegExp(text,"g");  
	var content_publish = $("#content");
	var result;
				
	if( content_publish.val().search(patt) == '-1' ){
		content_publish.insertAtCaret(text);
	
	var textArea = document.getElementById("#content".split('#').pop());
	
	result = patt.exec( content_publish.val() );
	
	var end = patt.lastIndex-1 ;
	var start = patt.lastIndex - text.length +1;
	
	if (document.selection) { //IE
		 var rng = textArea.createTextRange();
		 rng.collapse(true);
		 rng.moveEnd("character",end)
		 rng.moveStart("character",start)
		 rng.select();
	}else if (textArea.selectionStart || (textArea.selectionStart == '0')) { // Mozilla/Netscape…
		textArea.selectionStart = start;
		textArea.selectionEnd = end;
	}
	textArea.focus();
	return ;
	}
}

function scrollResize(){
	var loadCount = 0;
	current_divid = current_divid || 'list_1';
	 $(window).bind('scroll resize',function(event){	 
		 if(loadCount <3){
			 var bodyTop = document.documentElement.scrollTop + document.body.scrollTop;
				//滚动到底部时出发函数
				//滚动的当前位置+窗口的高度 >= 整个body的高度
			 if(bodyTop+$(window).height() >= $(document.body).height()){
					isLoading = true;
					$('#'+current_divid+' .moreFoot a').click();
					loadCount ++;
			 }
		 }
		 
	});
}

function show_ht()
{
	$('#wb_ht_fr').toggle(300);
	anyWayClick();
}

function tabCur(cur, wtype, input)
{
	$(".sendinfo a").removeClass("cur");
	$(".sendinfo " + cur).addClass("cur");
	$("#wtype").val(wtype);
	$("#content").val("");
	addtheme(input);
	if(wtype==2){
		showTopicTypes(1);
	}else{
		showTopicTypes(0);
	}
}

function showTopicTypes(ishow)
{
	if(ishow) {
		$('#topictypes').show();		
	} else {
		$('#topictypes').hide();
	}
}

function showTab(obj, wtype)
{
    var url = $(obj).attr('url');
    var divid = $(obj).attr('lang');
	var circles_id = $('#circles_id').val();
	doAjax(url,{
			circles_id: circles_id,
			wtype: wtype
		},
		function(data){
			$('.weibo-search .ln a').removeClass("cur");
			$(obj).addClass("cur");
			$('.content_box').hide();
			$("#"+divid).show().find('.list_data').html(data);
			current_divid = divid;
			$('#wtype_list').val(wtype);
		}
	);
}

function showInput(text)
{
	var stext = '';
    doAjax('home/circlesHome/weiBo/showInput',{
			circles_id:$('#circles_id').val()	
		},
		function(data){
			$("#save_input_html").html($("#infocontent").html());
			$("#infocontent").html(data);
			$("#content").focus();
			var wtype = $("#wtype").val();
			switch(wtype)
			{
				case '1':
					tabCur('.cur4', 1);
				break;
				case '2':
					if(text)
						stext = text;
					else 
						stext = '#请在这里输入自定义话题#';
					tabCur('.cur3', 2, stext);
				break;
				case '3':
					tabCur('.cur2', 3, '#行情评论#');
				break;
				case '4':
					tabCur('.cur5', 4, '#求助#');
				break;
			}
		}
	);
}

function switchPic(id,type,picurl){
	if( type=='close' ){
		$("#pic_show_"+id).hide();
		$("#pic_mini_show_"+id).show();
	}else{
		
		if( $("#pic_show_"+id).find('.imgSmall').attr('src')==''){
			//$("#pic_mini_show_"+id).find('.loadimg').show();
			var img = new Image;
			img.src = picurl+'?time='+new Date();
			img.onload = function(){
				if( this.width>450 ){
					$("#pic_show_"+id).find('.imgSmall').css('width','450px');
				}
				$("#pic_show_"+id).find('.imgSmall').attr('src',this.src);
				//$("#pic_mini_show_"+id).find('.loadimg').hide();
				$("#pic_show_"+id).show();
				$("#pic_mini_show_"+id).hide();	
			};
		}else{
			$("#pic_show_"+id).show();
			$("#pic_mini_show_"+id).hide();	
		}
	}
}

//旋转图片
function revolving(id,type){
	var img = $("#pic_show_"+id).find('.imgSmall');
	img.rotate(type);
}

//加入商圈后行为
function addCircles(data, cid, cname)
{
	$("#add_circles").hide(); 
	$("#out_circles").show(); 
	$("#member_num").html(parseInt($("#member_num").html()) + 1);
	$("#mycircles").append('<a href="/index.php?r=home/circlesHome/weibo/index&cid='+cid+' id="mycircles_'+ cid +'">'+ cname +'</a>');
	showInput(); 
}

//退出商圈后行为
function outCircles(data, cid)
{
	$("#add_circles").show(); 
	$("#out_circles").hide(); 
	$("#member_num").html(parseInt($("#member_num").html()) - 1); 
	$("#infocontent").html($("#save_input_html").html());
	$("#mycircles_" + cid).remove();
	$Common.AlertAuto(data,300,'提示');
}
//确认操作
function confirmWeiboOperate(msg,type,id,op)
{
	$Common.Confirm(msg,300,'doWeiboOperate('+type+','+id+',"'+op+'")');
}
function doWeiboOperate(type,id,op)
{
	$Layer.Close();
	var circles_id = $('#circles_id').val();
	
	doAjax('/home/circlesHome/weiBo/doWeiboOperate','type='+type+'&id='+id+'&circles_id='+circles_id+'&op='+op,function(msg){
		if(type==3){
			$('#wb_list_'+id).remove();
		}
		if(type==6){
			$('#topic_list'+id).remove();
		}
		$Common.AlertAuto(msg,300,'提示');
	});	
}

//检查字数
function checkTextNum(num,numObj,contentObj,buttonObj)
{
	var len = getLength($(contentObj).val(), true);
	var wordNumObj = $(numObj);
	if(len==0){
		wordNumObj.css('color','').html('你还可以输入<strong id="strconunt">'+ (num-len) + '</strong>字');
		textareaStatus('off',buttonObj);
	}else if( len > num ){
		wordNumObj.css('color','red').html('已超出<strong id="strconunt">'+ (len-num) +'</strong>字');
		textareaStatus('off',buttonObj);
	}else if( len <= num ){
		wordNumObj.css('color','').html('你还可以输入<strong id="strconunt">'+ (num-len) + '</strong>字');
		textareaStatus('on',buttonObj);
	}
}

function textareaStatus(type, obj)
{
	var obj = $(obj);
	switch(type){
		case 'on':
			obj.removeAttr('disabled').removeClass('btn_big_disable').addClass('btn_big_after');
		break;
		case 'off':
			obj.attr('disabled','true');
		break;
		case 'sending':
			obj.attr('disabled','true').removeClass('btn_big_after').addClass('btn_big_disable');
		break;
	}
}


function applyMan(circles_id)
{
	doAjax('/home/circlesHome/weiBo/applyMan', {cid : circles_id}, function(data) {
		if(data == -2)
		{
			$Common.AlertAuto('请选择正确的商圈', 300, '温馨提示' );
		} else if(data == -3) {
			$Common.AlertAuto('已经在待审核状态，请耐心等待', 300, '提示' );
		} else if(data == -4) {
			$Common.AlertAuto('您已经是管理员，无需再次申请', 300, '提示' );
		} else if(data == 1) {
			$Common.AlertAuto('申请成功，请耐心等待审核', 300, '提示' );
		} else if (data == -1) {
			$Common.AlertAuto('请登录后进行申请', 300, '温馨提示' );
		} else {
			$Common.AlertAuto('申请失败', 300, '温馨提示' );
		}
	});
}

function sendFoucs(mid, obj)
{
	doAjax('/home/circlesHome/weiBo/sendFoucs',{mid : mid} ,function(data) {
		eval('var ans = ' + data);
		if(ans.status == 1)
		{
			$Common.AlertAuto(ans.msg, 300, '提示' );
			$(obj).after('<span class="fcous_over">已关注</span>').remove();
		} else {
			$Common.AlertAuto(ans.msg, 300, '温馨提示' );
		}
	});
}

function showTabComm(tabs, contents, obj)
{
	var cur = 'cur';	//默认当前样式
	$(tabs).removeClass(cur);
	$(tabs).each(function(i,v)
	{
		if(this == obj)
		{
			$(this).addClass(cur);
			$(contents).hide();
			$(contents + ":eq(" + i + ")").show();
		}
	});
}

function pack_show(obj)
{
	var divid = $(obj).attr('lang');
	$(divid).show("slow");
	$(obj).html("收起");
	$(obj).unbind().bind('click', function(){
		pack_up(obj);
	});
}

function pack_up(obj)
{
	var divid = $(obj).attr('lang');
	$(divid).hide("slow");
	$(obj).html("展开");
	$(obj).unbind().bind('click', function(){
		pack_show(obj);
	});
}

//
function push_bd()
{

	var name = $("#bd_name").val();
	if(name == '' || is_name == 0)
	{
		$Common.AlertAuto("姓名必须填写", 300, '温馨提示');
		return;
	}

	var position = $("#bd_position").val();
	var company = $("#bd_company").val();
	if(company == "" || is_company == 0)
	{
		$Common.AlertAuto("公司名必需填写", 300, '温馨提示');
		return;
	}

	var country = $("#country").val();
	var province = $("#province").val();
	var city = $("#city").val();
	var mobile = $("#bd_mobile").val();
	if(is_mobile == 2)
	{
		$Common.AlertAuto("手机号码已存在", 300, '温馨提示');
		return;
	}

	if(mobile == "" || is_mobile == 0)
	{
		$Common.AlertAuto("请认真填写手机号码", 300, '温馨提示');
		return;
	}

	var phone = $("#bd_phone").val();
	var intro = $("#bd_intro").val();
	if(intro == "" || is_intro == 0)
	{
		$Common.AlertAuto("请认真填写主营业务", 300, '温馨提示');
		return;
	}
	
	doAjax('/home/circlesHome/businessDirectory/push',
		{name : name, position : position, company : company, country : country, province : province, city : city, mobile : mobile, phone: phone, intro : intro} ,
		function(data) {
			$("#bd_contents").prepend(data);
			closePush();
			$Common.AlertAuto('发布成功', 300, '温馨提示');
		}
	);
}

function openPush()
{
    is_name = 1;
    is_mobile = 1;
    is_company = 1;
    is_intro= 1;
	doAjax('/home/circlesHome/businessDirectory/pushForm', null, function(data){
		$("#window_floatbox").show().html(data);
		formVaild();
		var re_mobile = $("#bd_mobile").val();
		if(re_mobile == '')
			$("#bd_name").focus();
		else
			$("#bd_mobile").focus();
	});
}

function closePush()
{
    $("#window_floatbox").hide().empty();
}


function getCitys()
{
	var province = $("#province").val();
	doAjax('/home/circlesHome/businessDirectory/getCitys', {province : province}, function(data){
		eval("var ans = " + data);
		$("#city").empty();
		for(var key in ans)
		{
			$("#city").append("<option value='" + key + "'>" + ans[key] + "</option>");
		}
	});
}

function applyBuyDir()
{
	var name = $("#sqname").val();
	if(name == '' ||  apply_name == 0)
	{
		$Common.AlertAuto('请认真填写真实姓名', 300, '温馨提示');
		return;
	}
	var mobile = $("#sqmobile").val();
	if(mobile == '' || apply_mobile == 0)
	{
		$Common.AlertAuto('请认真填写手机号码', 300, '温馨提示');
		return;
	}
	var uid = $("#tguid").val();
	doAjax('/home/circlesHome/businessDirectory/applyBuy', {name : name, mobile : mobile, uid : uid}, function(data)
	{
		if(data == -1)
		{
			$Common.AlertAuto('请认真填写真实姓名', 300, '温馨提示' );
		} else if(data == 0) {
			$Common.AlertAuto('请认真填写手机号码', 300, '温馨提示' );
		} else {
			$Common.AlertAuto('申请成功，我们会主动与你取得联系', 300, '温馨提示' );
			$("#sqname").val('');
			$("#sqmobile").val('');
			apply_name = 1;
			apply_mobile = 1;
		}
	});
}

function getBDUnread()
{
	doAjax('/home/circlesHome/businessDirectory/getUnread', null, function(data)
	{
		if(!isNaN(data))
		{
			if(data > 0)
			{
				$("#unread").html(data);
				$("#topic-listtitle").show();
			} else {
				$("#topic-listtitle").hide();
			}
		}
	});
};

function showNewContent()
{
	doAjax('/home/circlesHome/businessDirectory/showNewContent', null, function(data)
	{
		$(".isNowPush").remove();
		$("#bd_contents").prepend(data);
		$("#topic-listtitle").hide();
	});
}