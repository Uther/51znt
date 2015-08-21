(function($){
    $.fn.extend({
        insertAtCaret: function(myValue){
            var $t=$(this)[0];
            if (document.selection) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            }
            else 
                if ($t.selectionStart || $t.selectionStart == '0') {
                    var startPos = $t.selectionStart;
                    var endPos = $t.selectionEnd;
                    var scrollTop = $t.scrollTop;
                    $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                    this.focus();
                    $t.selectionStart = startPos + myValue.length;
                    $t.selectionEnd = startPos + myValue.length;
                    $t.scrollTop = scrollTop;
                }
                else {
                    this.value += myValue;
                    this.focus();
                }
        }
    })  
})(jQuery);

$.fn.rotate = function(p){

	var img = $(this)[0],
		n = img.getAttribute('step');
	// 保存图片大小数据
	if (!this.data('width') && !$(this).data('height')) {
		this.data('width', img.width);
		this.data('height', img.height);
	};
	this.data('maxWidth',img.getAttribute('maxWidth'))

	if(n == null) n = 0;
	if(p == 'left'){
		(n == 0)? n = 3 : n--;
	}else if(p == 'right'){
		(n == 3) ? n = 0 : n++;
	};
	img.setAttribute('step', n);

	// IE浏览器使用滤镜旋转
	if(document.all) {
		if(this.data('height')>this.data('maxWidth') && (n==1 || n==3) ){
			if(!this.data('zoomheight')){
				this.data('zoomwidth',this.data('maxWidth'));
				this.data('zoomheight',(this.data('maxWidth')/this.data('height'))*this.data('width'));
			}
			img.height = this.data('zoomwidth');
			img.width  = this.data('zoomheight');
			
		}else{
			img.height = this.data('height');
			img.width  = this.data('width');
		}
		
		img.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ n +')';
		// IE8高度设置
		if ($.browser.version == 8) {
			switch(n){
				case 0:
					this.parent().height('');
					//this.height(this.data('height'));
					break;
				case 1:
					this.parent().height(this.data('width') + 10);
					//this.height(this.data('width'));
					break;
				case 2:
					this.parent().height('');
					//this.height(this.data('height'));
					break;
				case 3:
					this.parent().height(this.data('width') + 10);
					//this.height(this.data('width'));
					break;
			};
		};
	// 对现代浏览器写入HTML5的元素进行旋转： canvas
	}else{
		var c = this.next('canvas')[0];
		if(this.next('canvas').length == 0){
			this.css({'visibility': 'hidden', 'position': 'absolute'});
			c = document.createElement('canvas');
			c.setAttribute('class', 'maxImg canvas');
			img.parentNode.appendChild(c);
		}
		var canvasContext = c.getContext('2d');
		switch(n) {
			default :
			case 0 :
				img.setAttribute('height',this.data('height'));
				img.setAttribute('width',this.data('width'));
				c.setAttribute('width', img.width);
				c.setAttribute('height', img.height);
				canvasContext.rotate(0 * Math.PI / 180);
				canvasContext.drawImage(img, 0, 0);
				break;
			case 1 :
				if(img.height>this.data('maxWidth') ){
					h = this.data('maxWidth');
					w = (this.data('maxWidth')/img.height)*img.width;
				}else{
					h = this.data('height');
					w = this.data('width');
				}
				c.setAttribute('width', h);
				c.setAttribute('height', w);
				canvasContext.rotate(90 * Math.PI / 180);
				canvasContext.drawImage(img, 0, -h, w ,h );
				break;
			case 2 :
				img.setAttribute('height',this.data('height'));
				img.setAttribute('width',this.data('width'));
				c.setAttribute('width', img.width);
				c.setAttribute('height', img.height);
				canvasContext.rotate(180 * Math.PI / 180);
				canvasContext.drawImage(img, -img.width, -img.height);
				break;
			case 3 :
				if(img.height>this.data('maxWidth') ){
					h = this.data('maxWidth');
					w = (this.data('maxWidth')/img.height)*img.width;
				}else{
					h = this.data('height');
					w = this.data('width');
				}
				c.setAttribute('width', h);
				c.setAttribute('height', w);
				canvasContext.rotate(270 * Math.PI / 180);
				canvasContext.drawImage(img, -w, 0,w,h);
				break;
		};
	};
};

function doAjax(url,argv,func)
{
	var reg = /index.php/; 
	url = reg.test(url) ? url : 'index.php?r='+url + "&_r=" + Math.random();
	showLoading();
	$.ajax({
			type: 'post',
			url: url,
			data: argv,  
			success: function(data){
				var arr = data.split('#@');
				if(arr[0] == 'false'){
					$Common.AlertAuto(arr[1],300,'温馨提示');
					hideLoading();
					return;
				}
				if(func != null && typeof(func) != "undefined" && func != ""){
					try{
						func(data);
						hideLoading();
					}catch(e){
					}
				}
			},
			error: function (msg){
			}
	});
}

function showLoading(){
	$('#loading').show();
}

function hideLoading(){
	$('#loading').hide();
}
ui = window.ui ||{
	emotions:function(o){
		var $talkPop = $('div.talkPop');
		var $body = $('body');
		var $o = $(o);
		if (1 != $talkPop.data('type')) {
			$talkPop.hide();
		}
		
		this.emotdata = $body.data("emotdata");
		this.html = '<div class="talkPop alL" id="emotions" style="*padding-top:20px;">'
				 + '<div style="position: relative; height: 7px; line-height: 3px;z-index:99">'
				 + '<img src="/images/circlesHome/weibo/zw_img.gif" style="margin-left: 10px; position: absolute;" class="talkPop_arrow"></div>'
				 + '<div class="talkPop_box">'
				 + '<div class="close" style="height:30px;line-height:30px;background-color:#F8FAFC;padding:0 10px;position:relative;*width:420px"><a onclick=" $(\'#emotions\').remove()" class="del" href="javascript:void(0)" title="关闭"> </a><span>常用表情</span></div>'
				 + '<div class="faces_box" id="emot_content"><img src="/images/circlesHome/weibo/icon_waiting.gif" width="20" class="alM"></div></div></div>';
		target_set = $o.attr('target_set');
		$body.append(this.html);
		var position = $o.offset();
		$('#emotions').css({"top":position.top+"px","left":parseFloat(position.left-9)+"px","z-index":99999999});
		
		var _this = this;
		if(!this.emotdata){
			doAjax('/home/circlesHome/weiBo/emotions','',function(data){
				data = eval('('+data+')');
				$body.data("emotdata",data);
				_this.showContent(data);
			});
		}else{
			_this.showContent(this.emotdata);
		};

		this.showContent = function(data){  //显示表情内容
			var content ='';
			$.each(data,function(i,n){
				content+='<a href="javascript:void(0)" title="'+n.title+'" onclick="ui.emotions_c(\''+n.emotion+'\',\''+target_set+'\')"><img src="/images/expression/emotions/'+ n.filename +'" width="24" height="24" /></a>';
			});
			content+='<div class="c"></div>';
			$('#emot_content').html(content);
		};
		
		$body.live('click',function(event){
			if( $(event.target).attr('target_set')!=target_set ){
				$('#emotions').remove();
			}
		})
	},
	
	emotions_c:function(emot,target){
	    $("#"+target).insertAtCaret(emot);
		$("#"+target).focus();
		$('#emotions').remove();
	},	
	
	countNew:function(){
		$.getJSON( U('home/User/countNew') ,function(txt){
		    var messageList =  $('.message_list_container');
		    var messageSmallDiv = $('#message_list_container');
		    var list = {
                             comment:{url:U('home/user/comments'),name:"我的评论"},
                             atme:{url:U('home/user/atme'),name:"新@提到我"},
                             message:{url:U('home/message/index'),name:"新的私信"},
                             group_atme:{url:U('group/index/atme'),name:"群内@我的"},
                             group_comment:{url:U('group/index/comment'),name:"群内评论"},
                             group_bbs:{url:U('group/index/bbsNotify'),name:"群内帖子消息"},
                             notify:{url:U('home/message/notify'),name:"系统通知"},
                             appmessage:{url:U('home/message/appmessage'),name:"系统消息"}
                             };
		    messageList.html("");
			if(txt.total!="0"){
			   
			    for(var one in list){
			        if(txt[one] != undefined && parseInt(txt[one]) >0){
			            //<li>两条新消息,<a href="#">查看消息</a></li>
			            var newLi = document.createElement('li');
			            var newNode = document.createTextNode(txt[one]+"条"+list[one].name+"，");
			            var newA = document.createElement('a');
			            newA.href = list[one].url;
			            newA.target = "";
			            newA.innerHTML="查看消息";
			            newA.className="message_list_"+one;
			            
			            newLi.appendChild(newNode);
			            newLi.appendChild(newA);
			            messageList.append(newLi);
			            
			            $('.message_list_'+one).live('click',function(){
			                var className = $(this).attr('class');
                            $.each($('.'+className),function(){
                                $(this).parent().remove();
                            });
                            if(messageList.children('li').size() == 0){
                                messageSmallDiv.hide();
                            }
                            if(className == 'message_list_comment'){
                                $('#app_left_count_comment').html("");
                            }
                            
                            if(className == 'message_list_atme'){
                                $('#app_left_count_atme').html("");
                            }
                            
                       }); 
			            
			        }
			    }
			   messageList.show();
			   messageSmallDiv.show();
			}else{
			   messageList.hide();
			   messageSmallDiv.hide();
			}
			
			if(txt.comment!="0"){
				$("#app_left_count_comment").html("(<font color=\"red\">"+txt.comment+"</font>)");
			}else{
			     $("#app_left_count_comment").html("");
			}
			
			if(txt.atme!="0"){
				$("#app_left_count_atme").html("(<font color=\"red\">"+txt.atme+"</font>)");
			}else{
			    $("#app_left_count_atme").html("");
			}
		});
	},
	closeCountList:function(obj){
	    $(obj).attr('closed',true);
	    $(obj).parent().hide();
	},
	getarea:function(prefix,init_style,init_p,init_c){
		var style = (init_style)?'class="'+init_style+'"':'';
		var html = '<select name="'+prefix+'_province" '+style+'><option>省/直辖市</option></select> <select name="'+prefix+'_city" '+style+'><option value=0>不限</option></select>';
		document.write(html);
		// _PUBLIC_+'/js/area.js'
		$.getJSON(U('home/Public/getArea'), function(json){
			json = json.provinces;
			var province ='<option>省/直辖市</option>';
			$.each(json,function(i,n){
				var pselected='';
				var cselected='';
				var city='<option>不限</option>';
				if(n.id==init_p){
					 pselected = 'selected="true"';
					 $.each(n.citys,function(j,m){
							for(var p in m){
								cselected = (p==init_c)?'selected="true"':'';
								city+='<option value="'+p+'" '+cselected+'>'+m[p]+'</option>';
							};
					 });
					 $("select[name='"+prefix+"_city']").html(city);
				}
				province+='<option value="'+n.id+'" rel="'+i+'" '+pselected+'>'+n.name+'</option>';
			});
			
			$("select[name='"+prefix+"_province']").live('change',function(){
				var city='<option>不限</option>';
				var handle =  $(this).find('option:selected').attr('rel');
				if( handle ){
					var t =  json[handle].citys;
					$.each(t,function(j,m){
						for(var p in m){
							city+='<option value='+p+'>'+m[p]+'</option>';
						};
					});
				};
				$("select[name='"+prefix+"_city']").html(city);
			});
			$("select[name='"+prefix+"_province']").html(province);
		}); 
	}

	
};

function getLength(str, shortUrl) {
	if (true == shortUrl) {
		// 一个URL当作十个字长度计算
		return Math.ceil(str.replace(/((news|telnet|nttp|file|http|ftp|https):\/\/){1}(([-A-Za-z0-9]+(\.[-A-Za-z0-9]+)*(\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\.[0-9]{1,3}){3}))(:[0-9]*)?(\/[-A-Za-z0-9_\$\.\+\!\*\(\),;:@&=\?\/~\#\%]*)*/ig, 'xxxxxxxxxxxxxxxxxxxx')
							.replace(/^\s+|\s+$/ig,'').replace(/[^\x00-\xff]/ig,'xx').length/2);
	} else {
		return Math.ceil(str.replace(/^\s+|\s+$/ig,'').replace(/[^\x00-\xff]/ig,'xx').length/2);
	}
}
