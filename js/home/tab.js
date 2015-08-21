function tabClick( idx ) {

    if(idx == 1 ) 
    {
        $('#accTxt').text('登录账号');
        $('#accountType').val(4);
        $('#username').focus();
        $('#tabLabel__1').attr('src',"/images/home/login2/a0.gif");
        $('#tabLabel__2').attr('src',"/images/home/login2/a1.gif");
        $('#tabLabel__3').attr('src',"/images/home/login2/a2.gif");
    }
    if(idx == 2 ) 
    {
        $('#accTxt').text('邮箱地址');
        $('#accountType').val(2);
        $('#username').focus();
        $('#tabLabel__1').attr('src',"/images/home/login2/b0.gif");
        $('#tabLabel__2').attr('src',"/images/home/login2/b1.gif");
        $('#tabLabel__3').attr('src',"/images/home/login2/b2.gif");
    }

    if(idx == 3 ) 
    {
        $('#accTxt').text('手机号码');
        $('#accountType').val(3);
        $('#username').focus();
        $('#tabLabel__1').attr('src',"/images/home/login2/c0.gif");
        $('#tabLabel__2').attr('src',"/images/home/login2/c1.gif");
        $('#tabLabel__3').attr('src',"/images/home/login2/c2.gif");
    }
}