//用户注册
function UserRegister()
{                  
    window.location = 'index.php?r=home/register';
}

//用户登录
function UserLogin()
{
    window.location = 'index.php?r=home/default/Login';
}

//用户找回密码
function UserGetPassword()
{
    window.location = 'index.php?r=home/default/getPassword';
}



function setTab(m,n){
    var menu=document.getElementById("tab"+m).getElementsByTagName("li");  
    var div=document.getElementById("tablist"+m).getElementsByTagName("div");
    var showdiv=[];
    for (i=0; j=div[i]; i++){
      if ((" "+div[i].className+" ").indexOf(" tablist ")!=-1){
       showdiv.push(div[i]);
      }
    }
    for(i=0;i<menu.length;i++)
    {
        menu[i].className=i==n?"now":"";
        showdiv[i].style.display=i==n?"block":"none";  
    }
}
