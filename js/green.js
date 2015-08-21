function tabClick( idx ) {

if(idx == 1 )
{
  document.all.tabLabel__1.src = "/images/green/demo2_77.jpg";
  tabContent__1.style.visibility = "visible";
  tabContent__1.style.display = "block";

  document.all.tabLabel__2.src = "/images/green/demo_78.jpg";
  tabContent__2.style.visibility = "hidden";
  tabContent__2.style.display = "none";

  document.all.tabLabel__3.src = "/images/green/demo_79.jpg";
  tabContent__3.style.visibility = "hidden";
  tabContent__3.style.display = "none";

  document.all.tabLabel__4.src = "/images/green/demo_80.jpg";
  tabContent__4.style.visibility = "hidden";
  tabContent__4.style.display = "none";

  document.all.tabLabel__5.src = "/images/green/demo_81.jpg";
  tabContent__5.style.visibility = "hidden";
  tabContent__5.style.display = "none";
}

if(idx == 2 )
{
  document.all.tabLabel__1.src = "/images/green/demo_77.jpg";
  tabContent__1.style.visibility = "hidden";
  tabContent__1.style.display = "none";

  document.all.tabLabel__2.src = "/images/green/demo2_78.jpg";
  tabContent__2.style.visibility = "visible";
  tabContent__2.style.display = "block";

  document.all.tabLabel__3.src = "/images/green/demo_79.jpg";
  tabContent__3.style.visibility = "hidden";
  tabContent__3.style.display = "none";

  document.all.tabLabel__4.src = "/images/green/demo_80.jpg";
  tabContent__4.style.visibility = "hidden";
  tabContent__4.style.display = "none";

  document.all.tabLabel__5.src = "/images/green/demo_81.jpg";
  tabContent__5.style.visibility = "hidden";
  tabContent__5.style.display = "none";
}
if(idx == 3 )
{
  document.all.tabLabel__1.src = "/images/green/demo_77.jpg";
  tabContent__1.style.visibility = "hidden";
  tabContent__1.style.display = "none";

  document.all.tabLabel__2.src = "/images/green/demo_78.jpg";
  tabContent__2.style.visibility = "hidden";
  tabContent__2.style.display = "none";

  document.all.tabLabel__3.src = "/images/green/demo2_79.jpg";
  tabContent__3.style.visibility = "visible";
  tabContent__3.style.display = "block";

  document.all.tabLabel__4.src = "/images/green/demo_80.jpg";
  tabContent__4.style.visibility = "hidden";
  tabContent__4.style.display = "none";

  document.all.tabLabel__5.src = "/images/green/demo_81.jpg";
  tabContent__5.style.visibility = "hidden";
  tabContent__5.style.display = "none";
}
if(idx == 4 )
{
  document.all.tabLabel__1.src = "/images/green/demo_77.jpg";
  tabContent__1.style.visibility = "hidden";
  tabContent__1.style.display = "none";

  document.all.tabLabel__2.src = "/images/green/demo_78.jpg";
  tabContent__2.style.visibility = "hidden";
  tabContent__2.style.display = "none";

  document.all.tabLabel__3.src = "/images/green/demo_79.jpg";
  tabContent__3.style.visibility = "hidden";
  tabContent__3.style.display = "none";

  document.all.tabLabel__4.src = "/images/green/demo2_80.jpg";
  tabContent__4.style.visibility = "visible";
  tabContent__4.style.display = "block";

  document.all.tabLabel__5.src = "/images/green/demo_81.jpg";
  tabContent__5.style.visibility = "hidden";
  tabContent__5.style.display = "none";
}
if(idx == 5 )
{
  document.all.tabLabel__1.src = "/images/green/demo_77.jpg";
  tabContent__1.style.visibility = "hidden";
  tabContent__1.style.display = "none";

  document.all.tabLabel__2.src = "/images/green/demo_78.jpg";
  tabContent__2.style.visibility = "hidden";
  tabContent__2.style.display = "none";

  document.all.tabLabel__3.src = "/images/green/demo_79.jpg";
  tabContent__3.style.visibility = "hidden";
  tabContent__3.style.display = "none";

  document.all.tabLabel__4.src = "/images/green/demo_80.jpg";
  tabContent__4.style.visibility = "hidden";
  tabContent__4.style.display = "none";

  document.all.tabLabel__5.src = "/images/green/demo2_81.jpg";
  tabContent__5.style.visibility = "visible";
  tabContent__5.style.display = "block";
}

}
function  CheckForm2()
{
 if  (document.rzfrom.name.value.length  =="")
 {
  alert("请输入姓名");
  document.rzfrom.name.focus();
  return  false;
 }
 if  (document.rzfrom.phone.value.length  =="")
 {
  alert("请输入手机号码");
  document.rzfrom.phone.focus();
  return  false;
 }
 //var temp1 = document.getElementById("phone");
 //var mobile1=/^(13+\d{9})|(159+\d{8})|(153+\d{8})$/;
 if(isMobel(document.rzfrom.phone.value)==false)
 {
 alert('请输入有效的手机号码！');
 return false;
 }




 if  (document.rzfrom.email.value.length  =="")
 {
  alert("请输入邮箱");
  document.rzfrom.email.focus();
  return  false;
 }

 var temp = document.getElementById("email");
            //对电子邮件的验证
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
           if(!myreg.test(temp.value))
           {
                alert('提示\n\n请输入有效的E_mail！');
                document.rzfrom.email.focus();
              return false;
           }

 if  (IsTelephone (document.rzfrom.telphone.value)==false)
 {
  alert("请输入正确的电话");
  document.rzfrom.telphone.focus();
  return  false;
 }

 if (document.getElementsByName('shenqin')[0].checked==true){
 	if(document.rzfrom.cp_name.value.length  =="")
 	{
  alert("请输入企业名称");
  document.rzfrom.cp_name.focus();
  return  false;
 }
 if  (document.rzfrom.cp_address.value.length  =="")
 {
  alert("请输入企业地址");
  document.rzfrom.cp_address.focus();
  return  false;
 }
 if  (document.rzfrom.yewu.value.length  =="")
 {
  alert("请输入主营业务");
  document.rzfrom.yewu.focus();
  return  false;
 	}

 }
  if  (document.getElementsByName('shenqin')[1].checked==true){


if  (checkIdcard(document.rzfrom.id_number)==false)
 {
  alert("身份证号码错误");
  document.rzfrom.id_number.focus();
  return  false;
 }
 if  (document.rzfrom.address.value.length  =="")
 {
  alert("请输入户口所在地");
  document.rzfrom.address.focus();
  return  false;
 }


  }





  if  (document.rzfrom.money.value.length  =="")
 {
  alert("请输入融资金额");
  document.rzfrom.money.focus();
  return  false;
 }
  if  (document.rzfrom.moneytime.value.length  =="")
 {
  alert("请输入资金使用时间");
  document.rzfrom.moneytime.focus();
  return  false;
 }
   if  (document.rzfrom.moneytimeed.value.length  =="")
 {
  alert("请输入资金使用时间");
  document.rzfrom.moneytimeed.focus();
  return  false;
 }
  if  (document.rzfrom.explain.value.length  =="")
 {
  alert("请输入资金用途");
  document.rzfrom.explain.focus();
  return  false;
 }
   if  (document.rzfrom.note.value.length  =="")
 {
  alert("请输入抵押物信息");
  document.rzfrom.note.focus();
  return  false;
 }
return true;
}


//身份证号码验证
function checkIdcard(idcards){
    var idcard=idcards.value;
  var Errors=new Array("验证通过!","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!");
  var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
  var idcard,Y,JYM;
  var S,M;
  var idcard_array = new Array();
  idcard_array = idcard.split("");
  if(area[parseInt(idcard.substr(0,2))]==null) return false;
  switch(idcard.length){
    case 15:
      if ((parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
      }
      else{
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
      }
      if(ereg.test(idcard))
       //alert( Errors[0]);
       return true;

      else
       // alert( Errors[2]);
       return false;
    break;
  case 18:
    if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
      ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
    }
    else{
    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
    }
    if(ereg.test(idcard)){
      S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3 ;
      Y = S % 11;
      M = "F";
      JYM = "10X98765432";
      M = JYM.substr(Y,1);
      if(M == idcard_array[17])
       // alert( Errors[0]);
       return true;
      else
       // alert( Errors[3]);
       return false;
    }
    else
      //alert( Errors[2]);
      return false;
    break;
  default:
    //alert( Errors[1]);
    return false;
    break;
  }
}



//电话验证
function IsTelephone(obj)// 正则判断
{
var pattern=/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
if(pattern.test(obj))
{
return true;
}
else
{
return false;
}
}

//手机验证
function isMobel(value)
{
if(/^1\d{10}$/g.test(value)){
            return true;
}else{
            return false;
}
}
