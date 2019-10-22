function register()
{
    var tipHead="注册失败!\n原因:";

    var acc=$("#account").val();
    var password=$("#pwd").val();
    var surePassword=$("#surePWD").val();
    var user=$("#username").val();
    var email=$("#email").val();
    var phone=$("#phone").val();

    if(acc.length<6||acc.length>16)
    {
        alert(tipHead+"账号长度错误,范围6~16");
        return;
    }

    if(password.length<6||password.length>16)
    {
        alert(tipHead+"密码长度错误,范围6~16");
        return;
    }

    if(password!=surePassword)
    {
        alert(tipHead+"密码不一致");
        return;
    }

    if(user.length==0)
    {
        alert(tipHead+"用户名不能为空");
        return;
    }

    if(email.length==0)
    {
        alert(tipHead+"邮箱不能为空");
        return;
    }

    if(email.indexOf("@")==-1)
    {
        alert(tipHead+"注册失败:邮箱格式不标准");
        return;
    }

    if(email.indexOf("@qq.com")!=-1)
    {
        alert(tipHead+"不支持QQ邮箱");
        return;
    }

    data={
        account:acc,
        pwd:password,
        surePWD:surePassword,
        user:user,
        email:email,
        phone:phone,
    };

    $.ajax({
        type:"POST",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/account/",
        dataType:"json",
        data:JSON.stringify(data),
        success:function(json)
        {
            if(json.code==200)
            {
                window.localStorage.setItem("token",json.data.token);
                window.localStorage.setItem("account",json.data.account);
                alert("注册成功");
                previousPage();
            }
            else
            {
                alert(tipHead+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}