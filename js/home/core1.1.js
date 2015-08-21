var __sp = String.prototype;

// 编码
__sp.encodeURI = function() {
    return escape(this).replace(/\*/g, "%2A").replace(/\+/g, "%2B").replace(/-/g, "%2D").replace(/\./g, "%2E").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/_/g, "%5F");
};

// 解码
__sp.encodeHtml = function() {
    return this.replace(/\&/g, "&amp;").replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/\'/g, "&#039;").replace(/\"/g, "&quot;");
};


// 去除前后端空格
__sp.Trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
};

// 去除前端指字的字符
__sp.TrimStart = function(v) {
    if ($String.IsNullOrEmpty(v)) {
        v = "\\s";
    };
    var re = new RegExp("^" + v + "*", "ig");
    return this.replace(re, "");
};

// 去除后端指字的字符
__sp.TrimEnd = function(v) {
    if ($String.IsNullOrEmpty(c)) {
        c = "\\s";
    };
    var re = new RegExp(c + "*$", "ig");
    return v.replace(re, "");
};
//去除HTML标签
__sp.NoHtml = function() {
    return this.replace(/<.*?>/g, "");
};
// 验证是否有HTML
__sp.IsHtml = function() {
    var r = /<.*?>/g;
    return r.test(this);
};
// 验证是否是Email
__sp.IsEmail = function() {
    var r = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return r.test(this);
};
// 验证是否是电话
__sp.IsPhone = function() {
    var r = /^[0-9]{1,11}$/g;
    return r.test(this);
};
// 验证是否是手机
__sp.IsMobile = function() {
    var r = /^[0-9]{1,15}$/g;
    return r.test(this);
};


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
usingNamespace("Web.Utils")["String"] = {
    // 判断是否为null或空
    IsNullOrEmpty: function(v) {
        return !(typeof (v) === "string" && v.length != 0 && v.Trim().length != 0);
    },
    // 2个字符串判断是否相等
    IsEqual: function(str1, str2) {
        if (str1 == str2)
            return true;
        else
            return false;
    },
    //格式化字符串
    FormatStr: function(str) {
        if (!this.IsNullOrEmpty(str)) {
            str = str.Trim().length > 38 ? str.substr(0, 38) : str.Trim();
            return str.NoHtml().encodeURI();
        }
        return str;
    },
    //是否有效的字符串
    IsValid: function(str) {
        return this.IsNullOrEmpty(str);
    }
};
var $String = Web.Utils.String;

// Url 参数设置及获取
usingNamespace("Web")["QueryString"] = {
    Get: function(key) {
        key = key.toLowerCase();
        var qs = Web.QueryString.Parse();
        var value = qs[key];
        return (value != null) ? value : "";
    },
    Set: function(key, value) {
        key = key.toLowerCase();
        var qs = Web.QueryString.Parse();
        qs[key] = value.encodeURI();
        return Web.QueryString.ToString(qs);
    },
    Parse: function(qs) {
        var params = {};

        if (qs == null) qs = location.search.substring(1, location.search.length);
        if (qs.length == 0) return params;

        qs = qs.replace(/\+/g, ' ');
        var args = qs.split('&');
        for (var i = 0; i < args.length; i++) {
            var pair = args[i].split('=');
            var name = pair[0].toLowerCase();

            var value = (pair.length == 2)
                ? pair[1]
                : name;
            params[name] = value;
        }

        return params;
    },
    ToString: function(qs) {
        if (qs == null) qs = Web.QueryString.Parse();

        var val = "";
        for (var k in qs) {
            if (val == "") val = "?";
            val = val + k + "=" + qs[k] + "&";
        }
        val = val.substring(0, val.length - 1);
        return val;
    }
};
var $QueryString = Web.QueryString;


usingNamespace("Web")["State"] = {
    Cookies: {
        Name: {
            UserName: "UserName"
        },
        Save: function(name, value) {
            var cv = "";
            if (typeof (value) == "string") {
                cv = escape(value);
            } else if (typeof (value) == "object") {
                var jsonv = Web.State.Cookies.ToJson(Web.State.Cookies.GetValue(name));
                if (jsonv == false) jsonv = {};
                for (var k in value) {
                    eval("jsonv." + k + "=\"" + value[k] + "\"");
                }
                for (var k in jsonv) {
                    cv += k + '=' + escape(jsonv[k]) + '&';
                }
                cv = cv.substring(0, cv.length - 1);
            }

            var expires, path, domain, secure;
            try {
                if (null != (c = $CookieConfig[name])) {
                    domain = $WebsiteConfig.Domain;
                    if (c.TopLevelDomain == false) { domain = ""; }
                    var ad = $Converter.ToFloat(c.Expires);
                    if (ad > 0) {
                        var d = new Date();
                        d.setTime(d.getTime() + ad * 1000);
                        expires = d;
                    };
                    path = c.Path;
                    secure = c.SecureOnly;
                }
            } catch (ex) { };

            var cok = name + "=" + cv +
               ((expires) ? "; expires=" + expires.toGMTString() : "") +
               ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                ((secure) ? "; secure" : "");

            document.cookie = cok;
        },
        Remove: function(n, k) {

        },
        Clear: function(n) {
            var domain, path, secure;
            try {
                var c;
                if (null != (c = Web.Config.CookieConfig[n])) {
                    domain = $WebsiteConfig.Domain;
                    path = c.Path;
                    secure = c.SecureOnly;
                };
            } catch (ex) { };

            document.cookie = n + "=" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1900 00:00:01 GMT";
        },
        GetValue: function(n, k) {
            var reg = new RegExp("(^| )" + n + "=([^;]*)(;|$)");
            var arr = document.cookie.match(reg);
            if (arguments.length == 2) {
                if (arr != null) {
                    var kArr, kReg = new RegExp("(^| |&)" + k + "=([^&]*)(&|$)");
                    var c = arr[2];
                    var c = c ? c : document.cookie;
                    if (kArr = c.match(kReg)) {
                        return unescape(kArr[2]);
                    } else {
                        return "";
                    }
                } else {
                    return "";
                }
            } else if (arguments.length == 1) {
                if (arr != null) {
                    return unescape(arr[2]);
                } else {
                    return "";
                }
            }
        },
        ToJson: function(cv) {
            var cv = cv.replace(new RegExp("=", "gi"), ":'").replace(new RegExp("&", "gi"), "',").replace(new RegExp(";\\s", "gi"), "',");
            return eval("({" + cv + (cv.length > 0 ? "'" : "") + "})");
        }
    }
};
var $State = Web.State.Cookies;

// 浮动层
usingNamespace("Web.UI")["Layer"] = {
    ID: 'showBox',
    IsMove: false,
    IsBack: false,  // 是否有背景
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
            var confirmContent = ""; if ($Layer.IsConfirm) { confirmContent = "<input type='button' onclick='" + $Layer.Confirm.Event + "' value='" + $Layer.Confirm.Text + "' id='btnLayerEnter' class='saveA'/>"; }
            // window width
            var width = $Layer.Width; if (width != "auto") { width = width + "px"; }
            //Iframe add in 2011-1-13 code by Longcj
            $("body").prepend('<div id="' + $Layer.ID + '" style="display:none;width:' + width + ';" class="showBox"><iframe scrolling="no" frameborder="0" style="z-index:-1;position:absolute;width:399px;height:253px;allowtransparency="true;"></iframe><div id="myAlpha"></div></div>')

            //$("#" + $Layer.ID).css({ 'top': top + document.documentElement.scrollTop, 'left': );margin-left:438px;margin-top: 45px;

            var header = "<h1 id='layerTitle' style='-moz-user-select: none;'>" + $Layer.Title + "</h1><span class='close' onclick='$Layer.Close();' style='-moz-user-select: none;'>X</span>";
            var content = "<div style='padding:10px;background:#FFF;'>" + $Layer.Content + "</div>";
            var footer = ""; if ($Layer.IsFooter) { footer = "<div style='background:#EEE;text-align:center;padding:5px 10px;'>" + confirmContent + "<input type='button' onclick='$Layer.Close();' value='" + $Layer.CloseText + "' id='btnLayerClose' class='saveA'/></div>"; }
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

        return "<iframe id='frame" + $Layer.ID + "' style='width:100%;" + height + "' frameborder='0' src='" + src + "'></iframe>";
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
    //刷新验证码
    ReloadVerifyCode: function(id) {
        $("#" + id).attr("src", "/VerifyCode.aspx?n=" + Math.random());
        return false;
    },
    // 跳转到email登录页
    GotoEmail: function(url) {
        window.open(url);
    },
    ErrorMessage: function(msg, width) {
        $Layer.IsBack = true;
        $Layer.Width = width != null ? width : 300;
        $Layer.Title = "错误提示";
        $Layer.CloseText = "关闭";
        $Layer.Content = msg;
        $Layer.Open();
    },
    Alert: function(msg, width, title, btnTitle) {
        $Layer.IsBack = false;
        $Layer.Width = width != null ? width : 500;
        $Layer.Title = title || "提示";
        $Layer.IsFooter = false;
        var btnTitle = btnTitle || "关闭";
        var msgContent = "<div class='cont'>";
        msgContent += "<div class='tipInfoA'>" + msg + "</div>";
        msgContent += "<div class='toDoBox'><a href='javascript:void(0);' class='butYellow' onclick='$Layer.Close();return false;'>" + btnTitle + "</a></div>";
        msgContent += "<div class='c'></div>";
        $Layer.Content = msgContent;
        $Layer.Open();
    },
    OpenLayer: function(title, url, width, heith) {
        $Layer.Reset();
        $Layer.IsBack = false;
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
    //常用关键词搜索
    Search: function(txtID, url) {
        var key = $("#" + txtID).val();
        var defaultValue = arguments[2] || "";
        var keyName = arguments[3] || "key";
        var isMust = arguments[4] || "true";

        if (isMust == "true") {
            if ($String.IsNullOrEmpty(key) || key == defaultValue) {
                alert("请输入关键字");
                return false;
            }
        }
        else {
            if (key == defaultValue) {
                key = "";
            }
        }
        if (key.IsHtml()) {
            alert("请输入正确的关键字");
            return false;
        }
        else {
            var link = url.indexOf("?") > 0 ? url + "&" + keyName + "=" : url + "?" + keyName + "=";
            window.location.href = link + $String.FormatStr(key);
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
    //登录状态心跳包
    LoginStatus: function() {
        $.ajax({ url: "/gasgoo/cn/sns20/webmodel/handler/loginstatushandler.ajax" });
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
    ShowTip: function(tipID, event) {
        $("#TipCNone").remove();

        var o = event.srcElement || event.target;
        var parent = $(o).parent();

        var cxt = "<div class='tipText' id='TipCNone'>";
        cxt += "您尚未认证，不能与金牌采购商联系<br/>点击　<a href='/apply/buyer.aspx' class='linkColorU'>金牌采购商</a>　或　<a href='/apply/supplier.aspx' class='linkColorU'>认证供应商</a>";
        cxt += "</div>";

        $(parent).append(cxt);

        var remark = setTimeout("$('#TipCNone').remove()", 2000);

        $("#TipCNone").mouseover(function() {
            clearTimeout(remark);
        });

        $("#TipCNone").mouseout(function() {
            remark = setTimeout("$('#TipCNone').remove()", 2000);
        });

        $(parent).mouseout(function() {
            clearTimeout(remark);
            remark = setTimeout("$('#TipCNone').remove()", 2000);
        });
    },
    AlertObject: function(obj) {
        for (var j in obj) {
            alert(j + " = " + obj[j]);
        }
    }
};
var $Common = Web.Common;
// 名片显示
usingNamespace("Web")["CardShow"] = {
    showContent: '',
    x: 0,
    y: 0,
    timeOut: 0,
    width: 325,
    targetObject: null,
    IsShow: false,
    Show: function(uid, event) {
        var newTarget = event.srcElement || event.target;
        if (typeof (targetObject) != "undefined") {
            if (targetObject == newTarget && $CardShow.IsShow) {
                return false;
            }
        }
        targetObject = newTarget;

        var position = $Common.GetMousePosition(event);

        $CardShow.x = position.x + 30;
        $("#cardShow").remove();
        $CardShow.y = (document.documentElement.clientHeight - $("#cardShow").height()) / 2 + document.documentElement.scrollTop - 280;
        if ((position.x + 335) > document.body.clientWidth) {
            $CardShow.x = position.x - 500;
        }

        var param = {};
        param["userID"] = uid;
        $.ajax({
            type: "get",
            url: "/ajaxpages/cardremarkajaxpage.aspx?time=" + Math.random(),
            data: param,
            success: function(msg) {
                $("#cardShow").remove();
                var isSend = msg.substr(msg.length - 2, 1);
                var isMy = msg.substr(msg.length - 1, 1);
                showContent = msg.substring(0, msg.length - 2);


                var context = '<div class="cardFloatingL" style="top:' + $CardShow.y + 'px;left:' + $CardShow.x + 'px;display:none" id="cardShow" >';
                context += '<iframe src="javascript:false" scrolling="no" frameborder="0" style="z-index:-1;position:absolute; top:0px; left:0px;width:290px;height:590px;allowtransparency="true";></iframe>';
                context += showContent;
                context += '</div>';
                $("body").prepend(context)
                $("#cardShow").show();
                $CardShow.IsShow = true;

                $("#cardShow").mouseout(function() {
                    clearTimeout($CardShow.timeOut);
                    $CardShow.timeOut = setTimeout('$CardShow.Close()', 700);
                });
                $("#cardShow").mouseover(function() {
                    clearTimeout($CardShow.timeOut);
                });

                $(targetObject).mouseout(function() {
                    clearTimeout($CardShow.timeOut);
                    $CardShow.timeOut = setTimeout('$CardShow.Close()', 700);
                });

                $(targetObject).mouseover(function() {
                    clearTimeout($CardShow.timeOut);
                });
            },
            error: function(e) {

            }
        });
    },
    Close: function() {
        $CardShow.IsShow = false;
        $("#cardShow").fadeOut(300, function() { $("#cardShow").remove(); });

    }
};
var $CardShow = Web.CardShow;

function openCardLayer(uid, event) {
    $CardShow.Show(uid, event);
}

function openSendCard(uid, userName, layer) {
    var l = layer || "";  
    var title = '给 ' + userName + ' 递名片';
    $Common.OpenLayer(title, 'index.php?r=home/friends/Invited&mid=' + uid, 400, 410);
    return false;
}   

/**
*给好友发送消息，消息包括三种类型:
*短消息，加为好友，还有打招呼
*发送消息在另外一个页面中去处理
*弹出层引入另外一个页面
**/
function sendMessage(friendId, msgType, friendName) {
    $Layer.Reset();
    $Layer.IsBack = false;
    $Layer.IsFooter = false;
    $Layer.Width = 520;
    $Layer.Iframe.Height = 400;
    switch (msgType) {
        case "sms":
            $Layer.Width = 510;
            $Layer.Iframe.Height = 245;
            $Layer.Title = "给 " + friendName + " 发消息";
            $Layer.Content = $Layer.Iframe("/friends/sendhistory.aspx?msgType=" + msgType + "&friendID=" + friendId);
            break;
        case "message":
            $Layer.Width = 400;
            $Layer.Iframe.Height = 200;
            $Layer.Title = "给 " + friendName + " 打招呼";
            $Layer.Content = $Layer.Iframe("/friends/callfriend.aspx?msgType=" + msgType + "&friendID=" + friendId);
            break;
        case "joinfriend":
            $Layer.Width = 300;
            $Layer.Iframe.Height = 160;
            $Layer.Title = "申请将 " + friendName + " 加为好友";
            $Layer.Content = $Layer.Iframe("/friends/addfriend.aspx?msgType=" + msgType + "&friendID=" + friendId);
            break;
    }
    //$Layer.Content = $Layer.Iframe("/friends/sendhistory.aspx?msgType="+msgType+"&friendID="+friendId);
    $Layer.CloseText = "关 闭";
    $Layer.IsConfirm = true;
    $Layer.Confirm.Text = "确 定";
    $Layer.Open();
}
//移除对话框
function removeDialog() {
    $Layer.Close();
}
//移除对话框并刷新页面
function removeDialogRefresh() {
    $Layer.Close();
    window.location.reload();
}

//创建评论
function createEvaluate(id, sourcetype) {
    var title = "";
    var context = $("#txtevaluate").val();
    var sourceID = id;
    var anonymity = 0;
    if ($("#chkAm").attr("checked")) {
        anonymity = 1;
    }
    if (context == undefined || context == "") {
        alert("请输入评论内容");
        return false;
    } else {
        var targetValue = context.replace(/(^\s*)|(\s*$)/g, "");
        if (targetValue.length > 100 || targetValue.length < 1) {
            alert("您输入的内容的超过100个字符");
            return false;
        }
    }

    context = context.replace(/(^\s*)|(\s*$)/g, "");
    if (context == undefined || context == "") {
        alert("您输入的消息不能全部为空格");
        $("#txtevaluates").val("");
        return false;
    }

    if (context.IsHtml()) {
        alert("您输入的信息包含特殊字符");
        return false;
    }
    var param = {};
    param["action"] = "create";
    param["title"] = title;
    param["context"] = context;
    param["sourceID"] = sourceID;
    param["sourceType"] = sourcetype;
    param["anonymity"] = anonymity;
    $.ajax({
        type: "post",
        url: "/gasgoo/cn/sns20/webmodel/handler/evaluatehandler.ajax",
        data: param,
        success: function(msg) {
            if (msg = "success") {
                $("#txtevaluate").val("");
                window.location.reload();
            }
        },
        error: function(e) {
            $Common.ErrorMessage(e.responseText);
        }
    });
    return false;
}

function viewMenu(objID) {
    $("#" + objID).toggle();
}

//显示左侧菜单
function viewLeftMenuShow(objID) {
    $("#" + objID).show();
}
function viewLeftMenuHide(objID) {
    $("#" + objID).hide();
}

//导航菜单鼠标经过显示菜单
function viewMenuShow(objID) {
    $("#divMenuMessage").removeClass("backgroundA");
    $("#divMenuMessage").addClass("background");
    $("#" + objID).show();
}
function viewMenuHide(objID) {
    $("#divMenuMessage").removeClass("background");
    $("#divMenuMessage").addClass("backgroundA");
    $("#" + objID).hide();
}

//过滤特殊字符
function checkQuote(str) {
    var items = new Array("~", "<script>", "</script>", "^");
    items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
    str = str.toLowerCase();
    for (var i = 0; i < items.length; i++) {
        if (str.indexOf(items[i]) >= 0) {
            return true;
        }
    }
    return false;
}

/**
* 检查输入的邮箱格式是否正确
* 输入:str  字符串
* 返回:true 或 flase; true表示格式正确
*/
function checkEmail(str) {
    if (str.match(/[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g) == null) {
        return false;
    }
    else {
        return true;
    }
}

//人脉搜索
function smallSearch() {
    if (loginUserID > 0) {
        $Common.Search('txtSearch', "/contacts/searchResult.aspx?searchType=1", "按姓名、产品、公司搜", "searchKey", "true");
    } else {
        userLogin();
    }
}
$("#btnSearch").click(function() {
    smallSearch();
})

$Common.Watermark("txtSearch", "按姓名、产品、公司搜");
$Common.EnterPost("divSearch", smallSearch);

//用户登录弹出层
function userLogin() {
    $Layer.Reset();
    $Layer.IsBack = false;
    $Layer.IsFooter = false;
    $Layer.Width = 500;
    $Layer.Iframe.Height = 200;
    $Layer.Title = "您好，请先登录或注册";
    $Layer.CloseText = "关 闭";
    $Layer.Content = $Layer.Iframe("/layer/login.aspx");
    $Layer.IsConfirm = true;
    $Layer.Confirm.Text = "确 定";
    $Layer.Open();
//    return false;
}

//名片翻面
function changeCard(f, b) {
    $("#" + f).hide();
    $("#" + b).show();
}
//收藏名片
function collCard(uid) {
    var param = {};
    param["SendUser"] = uid;
    param["SendType"] = 1;
    $.ajax({
        url: "/gasgoo/cn/sns20/webmodel/handler/cardslayerhanlder.ajax",
        type: "post",
        data: param,
        success: function(data) {
            $Common.Alert("收藏成功");
        },
        error: function(e) {
            alert(e.responseText);
        }
    });
}
//心跳包
setInterval($Common.LoginStatus, 60000);

$Common.Watermark("txtInviteName", "好友姓名");
$Common.Watermark("txtInviteEmail", "电子邮件");
//预览邀请信
function previewInvite(name, email) {
    var param = {};
    param["Name"] = name;
    param["Email"] = email;
    param["txtUserName"] = email;
    if ($String.IsNullOrEmpty(name) || name == "好友姓名") {
        $Common.Alert("抱歉，邀请信必须填写对方姓名，请您重新填写");
        return false;
    }
    if ($String.IsNullOrEmpty(email) || email == "电子邮件") {
        $Common.Alert("抱歉，邀请信必须填写对方邮箱，请您重新填写");
        return false;
    }

    if (!email.IsEmail()) {
        $Common.Alert("抱歉，您填写的邮箱有误，请您重新填写");
        return false;
    }
    $.ajax({
        type: "post",
        url: "/gasgoo/cn/sns20/webmodel/handler/UserNameHandler.ajax",
        data: param,
        success: function(msg) {
            if (msg == 0) {
                var url = "/layer/invite.aspx?name=" + name + "&email=" + email;
                $Common.OpenLayer("邀请注册邮件预览", url, 520, 410);
            }
            else {
                $Common.Alert("您填写的用户已注册过盖世汽车社区<p class='repeat'><a href='/profile/viewfile.aspx?uid=" + msg + "'>点击查看他（她）的个人主页</a></p>");
            }
        },
        error: function(e) {
            $Common.Alert(e.responseText);
        }
    });
}

//发送邀请信
function sendInvite(name, email) {
    var param = {};
    param["Name"] = name;
    param["Email"] = email;
    param["txtUserName"] = email;

    if ($String.IsNullOrEmpty(name) || name == "好友姓名") {
        $Common.Alert("抱歉，邀请信必须填写对方姓名，请您重新填写");
        return false;
    }
    if ($String.IsNullOrEmpty(email) || email == "电子邮件") {
        $Common.Alert("抱歉，邀请信必须填写对方邮箱，请您重新填写");
        return false;
    }

    if (!email.IsEmail()) {
        $Common.Alert("抱歉，您填写的邮箱有误，请您重新填写");
        return false;
    }
    $.ajax({
        type: "post",
        url: "/gasgoo/cn/sns20/webmodel/handler/UserNameHandler.ajax",
        data: param,
        success: function(msg) {
            if (msg == 0) {
                ajaxInvite(param);
            }
            else {
                $Common.Alert("您填写的用户已注册过盖世汽车社区<p class='repeat'><a href='/profile/viewfile.aspx?uid=" + msg + "'>点击查看他（她）的个人主页</a></p>");
            }
        },
        error: function(e) {
            $Common.Alert(e.responseText);
        }
    });
}

function ajaxInvite(param) {
    $.ajax({
        type: "post",
        url: "/gasgoo/cn/sns20/webmodel/handler/invitehanlder.ajax",
        data: param,
        success: function(msg) {
            $Layer.Close();
            $Common.Alert("你的邀请邮件已发送成功！");
            $("#txtInviteName").val("");
            $("#txtInviteEmail").val("");
            $Common.Watermark("txtInviteName", "好友姓名");
            $Common.Watermark("txtInviteEmail", "电子邮件");
        },
        error: function(e) {
            $Common.Alert(e.responseText);
        }
    });
}


//推荐好友
function openRecommend() {
    $Layer.Reset();
    $Layer.IsBack = false;
    $Layer.IsFooter = false;
    $Layer.Width = 520;
    $Layer.Title = "推荐";
    $Layer.CloseText = "关 闭";
    $Layer.Content = $("#divRecommendLayer").html();
    $Layer.IsConfirm = false;
    $Layer.Open();

    $(document).click(function() {
        if ($("#divFrined")) {
            if ($("#divFrined").css("display") != "nono") {
                $("#divFrined").hide();
            }
        }
    });
}

//申请成为认证采购商和认证商浮动层
function ApplyMemberType() {
    var html = "<div id='ApplyMemberTypedivLayer'>";
    html += "<div class='cont'>";
    html += "<div class='registration'>";
    html += "您好，此讲座仅对金牌采购商、认证供应商开放。若想报名此讲座请升级成金牌采购商或人脉通会员";
    html += "</div>";
    html += "<div class='registrationB'>";
    html += "<span><a href='/apply/buyer.aspx'>立刻升级成金牌采购商</a> >></span> ";
    html += "<span><a href='/apply/buyer.aspx'>关于金牌采购商</a></span>";
    html += "</div>";
    html += "<div class='registrationB'>";
    html += "<span><a href='/apply/supplier.aspx'>立刻升级成认证供应商</a> >></span> ";
    html += "<span><a href='/apply/supplier.aspx'>关于认证供应商</a></span>";
    html += "</div>";
    html += "<div class='toDoBox'>";
    html += "<a href='javascript:void(0)' class='butYellow' onclick='javascript:$Layer.Close();'>关 闭</a>";
    html += "<div class='c'></div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    $Layer.Reset();
    $Layer.IsBack = false;
    $Layer.IsFooter = false;
    $Layer.Width = 500;
    $Layer.Title = "提示:";
    $Layer.CloseText = "关 闭";
    $Layer.Content = html;
    $Layer.IsConfirm = false;
    $Layer.Open();
}



function newtext() {
    var text = "【新消息】- 盖世汽车社区";
    var text2 = "【　　　】- 盖世汽车社区";
    if (document.title == text2) {
        document.title = text;
    }
    else {
        document.title = text2;
    }
}
function getMessageCount() {
    if (typeof (msgUnReadCount) != "undefined" && msgUnReadCount > 0) {
        setInterval("newtext()", 1000);
    }
}
getMessageCount();



     