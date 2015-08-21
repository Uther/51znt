// Namespace
window.usingNamespace = function(a) {
    var ro = window;
    if (!(typeof (a) === "string" && a.length != 0)) {
        return ro;
    }
    var co = ro;
    var nsp = a.split(".");
    for (var i = 0; i < nsp.length; i++) {
        var cp = nsp[i];
        if (!ro[cp]) {
            ro[cp] = {};
        };
        co = ro = ro[cp];
    };

    return co;
};


// 字符串处理
usingNamespace("Web.Navigation")["URL"] = {
    // 用户注册
    Register: function() {
       window.location = 'index.php?r=home/register'; 
    },
    
    //用户登录
    Login: function() {            
       window.location = 'index.php?r=home/default/Login'; 
    },
    
    //找回密码
    getPassword:function() {
       window.location = 'index.php?r=home/default/getPassword'; 
    }, 
     
    //首页
    Home:function() {
       window.location = 'index.html'; 
    }, 
    
    //MySpace首页         
    MyHome:function() {
        window.location = 'index.php?r=home/mySpace';
    },
    
    //上一页
    goBack:function() {
        history.go(-1);
        return false;
    },
    //跳转
    redirect:function(url) {
        window.location = url;
        return false;
    },  
    
    //圈币充值
    buyCredit:function() {
       window.location = 'index.php?r=home/circleCurrency/buyCredit'; 
    }            
};

var $URL = Web.Navigation.URL;


// 浮动层
usingNamespace("Web.UI")["Layer"] = {
    ID: 'showBox',
    IsMove: false,
    IsBack: true,      //是否有背景
    IsFooter: true,
    Width: 'auto',
    Title: '',
    Content: '',
    CloseText: 'Close',
    IsConfirm: false,
    Confirm: {
        Text: 'Ok',
        Event: ''
    },
    //是否自动关闭
    IsAutoClose: false,
    //自动关闭时间
    AutoTime: 3000,
    Iframe: {
        Height: ''
    },
    // 打开浮动层
    Open: function() {
        if ($Layer.IsBack && $("#layerBackground").length == 0) {
            $("body").prepend('<div id="layerBackground" class="setOpacity"></div>');
        }

        var top = 0;
        var left = 0;
        if ($("#" + $Layer.ID).length == 0) {
            // 设置window model 是否为confrim，及按钮的文字、事件
            var confirmContent = ""; if ($Layer.IsConfirm) { confirmContent = "<input type='button' onclick='" + $Layer.Confirm.Event + "' value='" + $Layer.Confirm.Text + "' id='btnLayerEnter' class='button1'/>"; }
            // window width
            var width = $Layer.Width; if (width != "auto") { width = width + "px"; }
            //Iframe add in 2011-1-13 code by Longcj
            $("body").prepend('<div id="' + $Layer.ID + '" style="display:none;width:' + width + ';" class="showBox"><iframe scrolling="no" frameborder="0" style="z-index:-1;position:absolute;width:1px;height:1px;allowtransparency="true;"></iframe><div id="myAlpha"></div></div>')

            //$("#" + $Layer.ID).css({ 'top': top + document.documentElement.scrollTop, 'left': );margin-left:438px;margin-top: 45px;

            var header = "<h1 id='layerTitle' style='-moz-user-select: none;color:#CC6601'>" + $Layer.Title + "</h1><span class='close' onclick='$Layer.Close();' style='-moz-user-select: none;'><img src='/images/home/showDelete.png' /></span>";
            var content = "<div style='padding:0; background:#FFF;'>" + $Layer.Content + "</div>";   
            var footer = ""; if ($Layer.IsFooter) { footer = "<div style='background:#EEE;text-align:center;padding:5px 10px;'>" + confirmContent + "<input type='button' onclick='$Layer.Close();' value='" + $Layer.CloseText + "' id='btnLayerClose' class='buttons'/></div>"; }
            var element = document.documentElement;
            $("#" + $Layer.ID).append(header + content + footer);
            // 设置window居中显示
            top = (element.clientHeight - $("#" + $Layer.ID).height()) / 2;
            if (top < 0) {
                top = 0;
            }
            left = (element.clientWidth - $("#" + $Layer.ID).width()) / 2;
            $("#" + $Layer.ID).css({ 'margin-top': top, 'left': left });

            $("#" + $Layer.ID).show();
            if ($Layer.IsMove) { $Layer.ObjectDragDrop(); }
        }
        else {
            $("#" + $Layer.ID).remove();
            $Layer.Open();
        }

        if ($Layer.IsAutoClose) {
            var autoClose = 0;
            $("#showBox").mouseover(function() {
                clearInterval(autoClose);
            });
            $("#showBox").mouseout(function() {
                autoClose = setTimeout('$Layer.Close()', $Layer.AutoTime);
            });
            autoClose = setTimeout('$Layer.Close()', $Layer.AutoTime);
        }
    },
    Iframe: function(src) {
        var height = $Layer.Iframe.Height;
        if (height != null && height != '') {
            height = "height:" + $Layer.Iframe.Height + "px;";
        }
        if (src.indexOf("?") > 0) {
           src = src + "&_r=" + Math.random();
        }
        else {
            src = src + "?_r=" + Math.random();
        }    
              
             return "<iframe id='frame" + $Layer.ID + "' style='width:100%;overflow:visible;" + height + "' frameborder='0' src=''></iframe> <script>$('#frame"+ $Layer.ID +"').attr('src','" + src + "');<\/script>";
    },      
    // 关闭浮动层
    Close: function() {
        $("#layerBackground").remove();
        $("#" + $Layer.ID).remove();
    },
    Reset: function() {
        $Layer.IsBack = false;
        $Layer.IsFooter = true;
        $Layer.Width = 'auto';
        $Layer.Title = '';
        $Layer.Content = '';
        $Layer.IsConfirm = false;
        $Layer.Event = '';
        $Layer.Iframe.Height = '';
    },
    // 移动浮动层
    ObjectDragDrop: function() {
        var top, left, move = false;
        $("#" + $Layer.ID + " h1").mousedown(function(e) {
            top = e.pageY - parseInt($("#" + $Layer.ID).css("top"));
            left = e.pageX - parseInt($("#" + $Layer.ID).css("left"));
            move = true;
        });
        $(document).mousemove(function(e) {
            if (move) {
                var x = e.pageX - left;
                var y = e.pageY - top;
                $("#" + $Layer.ID).css({ "left": x, "top": y });
            }
        }).mouseup(function() {
            move = false;
        })
    },
    ResetWidth: function(width) {
        $("#" + $Layer.ID).css("width", width);
        $("#" + $Layer.ID).css({ 'left': (document.documentElement.clientWidth - width) / 2 });
    },
    ResetHeight: function(height) {
        $("#" + $Layer.ID).css("height", height);
        $("#frame" + $Layer.ID).css("height", height - 52);
        var top = (document.documentElement.clientHeight - $("#" + $Layer.ID).height()) / 2;
        if (top < 0) {
            top = 0;
        }
        $("#" + $Layer.ID).css({ 'margin-top': top });
    }
};
var $Layer = Web.UI.Layer;

usingNamespace("Web")["Common"] = {
    ErrorMessage: function(msg, width) {
        $Layer.IsBack = true;
        $Layer.Width = width != null ? width : 300;
        $Layer.Title = "错误提示";
        $Layer.CloseText = "关闭";
		var msgContent = "<div class='cont'>";
        msgContent += '<iframe scrolling="no" frameborder="0" style="z-index:-1;position:absolute; left:8px; top:10px; width:' + (width-5) + 'px;height:120px;allowtransparency="true;"></iframe>';
        msgContent += "<div class='tipInfoA succeed_s'>" + msg + "</div>";
        msgContent += "<div class='c'></div>";
        $Layer.Content = msgContent;
        $Layer.Open();
    },
    Succeed: function(msg, width, title, btnTitle,tourl) {
        $Layer.IsBack = true;
        $Layer.Width = width != null ? width : 500;
        $Layer.Title = title || "提示";
        $Layer.IsFooter = false;
        var btnTitle = btnTitle || "关闭";
        var msgContent = "<div class='cont'>";
        msgContent += '<iframe scrolling="no" frameborder="0" style="z-index:-1;position:absolute; left:8px; top:10px; width:' + (width-20) + 'px;height:120px;allowtransparency="true;"></iframe>';
        msgContent += "<div class='tipInfoA succeed_s'>" + msg + "</div>";
        msgContent += "<div class='toDoBox'><button class='buttons' type='button' onclick='$Layer.Close();"; 
        if(tourl == "" || tourl == null)
        {
            msgContent += "window.location.reload();return false;'>" + btnTitle + "</button></div>";
        }
        else
        {
            msgContent += "window.location.href=\""+tourl+"\";return false;'>" + btnTitle + "</button></div>";
        }
        
        msgContent += "<div class='c'></div>";
        $Layer.Content = msgContent;
        $Layer.Open();
    },
    Alert: function(msg, width, title, btnTitle) {
        $Layer.IsBack = true;
        $Layer.Width = width != null ? width : 500;
        $Layer.Title = title || "提示";
        $Layer.IsFooter = false;
        var btnTitle = btnTitle || "关闭";
        var msgContent = "<div class='cont'>";
        msgContent += '<iframe scrolling="no" frameborder="0" style="z-index:-1;position:absolute; left:8px; top:10px; width:' + (width-20) + 'px;height:120px;allowtransparency="true;"></iframe>';
        msgContent += "<div class='tipInfoA'>" + msg + "</div>";
        msgContent += "<div class='toDoBox'><button class='buttons' type='button' onclick='$Layer.Close();return false;'>" + btnTitle + "</button></div>";
        msgContent += "<div class='c'></div>";
        $Layer.Content = msgContent;
        $Layer.Open();
    },
	AlertB: function(msg, width, title, btnTitle, tourl) {
        $Layer.IsBack = true;
        $Layer.Width = width != null ? width : 500;
        $Layer.Title = title || "提示";
        $Layer.IsFooter = false;
        var btnTitle = btnTitle || "关闭";
        var msgContent = "<div class='cont'>";
        msgContent += "<div class='tipInfoA'>" + msg + "</div>";
        msgContent += "<div class='toDoBox'><button class='buttons' type='button' onclick='$Layer.Close();";
		//alert(tourl);
		if(tourl == "" || tourl == null)
		{
			msgContent += "window.location.reload();return false;'>" + btnTitle + "</button></div>";
		}
		else
		{
			msgContent += "window.location.href=\""+tourl+"\";return false;'>" + btnTitle + "</button></div>";
		}
		
        msgContent += "<div class='c'></div>";
        $Layer.Content = msgContent;
        $Layer.Open();
    },
    OpenLayer: function(title, url, width, heith) {
        $Layer.Reset();
        $Layer.IsBack = true;
        $Layer.IsFooter = false;
        $Layer.Width = width != "undefined" ? width : 500;
        $Layer.Iframe.Height = heith != "undefined" ? heith : 400;
        if (url.indexOf("?") > -1) {
            url = url + "&_t=" + Math.random();
        }
        else {
            url = url + "?_t=" + Math.random();
        }
        $Layer.Content = $Layer.Iframe(url);
        $Layer.Title = title;
        $Layer.Open();
        return false;
    },
    CloseLayer: function() {
        $Layer.Close();
    },
    //光标功能
    Watermark: function(id, value) {
        var vValue = $("#" + id).val();
        if (typeof (vValue) != "undefined") {
            if (vValue.length == 0 || vValue == value) {
                $("#" + id).val(value);
                $("#" + id).css("color", "#777");
            }
            $("#" + id).blur(function() {
                if (this.value == '') { this.value = value; this.style.color = '#777'; }
            }).focus(function() {
                if (this.value == value) { this.value = ''; this.style.color = '#000'; }
            });
        }

    },  
    //回车触发时间
    EnterPost: function(containerID, post, args) {
        $("#" + containerID).keydown(function() {
            var event = arguments[0] || window.event;
            if (event.keyCode == 13) {
                $("#" + containerID).blur();
                post.call(post, args);
            }
        });
    }, 
    //取鼠标位置
    GetMousePosition: function(e) {
        var posx = 0;
        var posy = 0;

        if (!e) var e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { 'x': posx, 'y': posy };
    },  
    AlertObject: function(obj) {
        for (var j in obj) {
            alert(j + " = " + obj[j]);
        }
    }
};
var $Common = Web.Common;

 

//递名片页面
function openSendCard(uid, userName, layer)
 {
     var l = layer || "";  
     var title = '给 ' + userName + ' 递名片';
     $Common.OpenLayer(title, 'index.php?r=home/circles/Card/Send&mid=' + uid, 350, 410);
     return false;
 }

 //察看名片
 function showCard(uid)
  {
      $Common.OpenLayer('名片', 'index.php?r=home/circles/Card&mid=' + uid, 328, 200);
  }
 
//移除对话框
function removeDialog() {
    $Layer.Close();
}

//企业站
function GoEnterpriseSite(url) {
    if(url == '')                                       
      $Common.Alert('该企业尚未开通亮铺',400);
    else
      window.open(url,'_blank');
} 

//列入好友黑名单
function inFriendBlackList(v_mid,v_name)
{
       if(confirm("你是否要将" + v_name + "列入黑名单？ \n提示：列入黑名单以后系统将自动拒绝所有对方的信息!"))
        {
            $.post('index.php?r=/home/friends/BlackList/In',{'mid':v_mid},function(res){switch(parseInt(res.tag)){  case 1:  window.location.reload();  break;  case 2:   alert(res.msg);   break; } },'json');
        } 
}

//移除黑名单
function outFriendBlackList(v_mid,v_name)
{
       if(confirm("你是否要将" + v_name + "移除黑名单？ \n"))
        {
            $.post('index.php?r=/home/friends/BlackList/Out',{'mid':v_mid},function(res){switch(parseInt(res.tag)) { case 1: window.location.reload(); break; case 2: alert(res.msg); break;}},'json');
        }
}

//发送消息
function SendMessage(v_mid)
{                                
   $Common.OpenLayer('发送消息', 'index.php?r=home/messageBox/send&mid=' + v_mid, 350, 200);
}

//设置关注
function SetFocus(v_mid)
{
   $Common.OpenLayer('关注', 'index.php?r=home/circles/Focus/Set&mid=' + v_mid, 350, 200);
}     
function openAppendDomain()
 {
     var title = '自有域名转入申请';
     $Common.OpenLayer(title, 'index.php?r=home/enterpriseSite/domain/append', 500, 300);
     return false;
 }
 //打开一个自定义的小窗口
 function openMinWin(title,murl,mw,mh)
 {
     $Common.OpenLayer(title,murl, mw, mh);
     return false;
 }  
 
 //供求询盘
 function tradeInquiry(tid)
 {
     $Common.OpenLayer('供求询盘', 'index.php?r=home/messageBox/Send/Inquiry&tid=' + tid, 500, 200);
     return false;
 } 
 //zz询盘
 function tradeZz(tid)
 {
     $Common.OpenLayer('供求询盘', 'index.php?r=home/messageBox/Send/Ask&tid=' + tid, 500, 200);
     return false;
 } 

//会员合并申请的回复操作
 function MergeInvite(relation_id,act)
 {
	 $.post('index.php?r=home/enterpriseSite/Colleague/AjaxInvitereply',
            {'relation_id':relation_id,'act':act},
            function(res){
               switch(parseInt(res.tag))
                {
                     case 1:
                       $Common.Alert(res.msg,200);
                     break;
                     
                     case 2:
					 	$Common.Alert(res.msg,200);
                       //alert(res.msg);
                     break;
                  } 
            },
            'json' 
    ); 
 }


//图片按比例缩放    
function DrawImage(ImgD){
    var image=new Image();
    var iwidth=100; //定义允许图片宽度，当宽度大于这个值时等比例缩小
    var iheight=75; //定义允许图片高度，当宽度大于这个值时等比例缩小
    image.src=ImgD.src;
    if(image.width>0&&image.height>0){
    flag=true;
    if(image.width/image.height>=iwidth/iheight){
    if(image.width>iwidth){ 
    ImgD.width=iwidth;
    ImgD.height=(image.height*iwidth)/image.width;
    }else{
    ImgD.width=image.width; 
    ImgD.height=image.height;
    }
    ImgD.alt=image.width+"×"+image.height;
    }
    else{
    if(image.height>iheight){ 
    ImgD.height=iheight;
    ImgD.width=(image.width*iheight)/image.height; 
    }else{
    ImgD.width=image.width; 
    ImgD.height=image.height;
    }
    ImgD.alt=image.width+"×"+image.height;
    }
    }
}  
 
 
 function Heartbeat()
  {                  
      jQuery.get('/index.php?r=home/Online/Heartbeat');
  }
  
 //心跳包
 var IntervalID = window.setInterval(Heartbeat,1200000);
 Heartbeat();
