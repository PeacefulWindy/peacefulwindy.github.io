function getAccountInfo()
{
    var token=window.localStorage.getItem("token");

    if(!token)
    {
        return;
    }

    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/account?token="+token,
        success:function(json)
        {
            if(json.code==200)
            {
                $("#noLoginTable").css("display","none");
                $("#accTable").css("display","block");

                $("#account").html(json.data.account);
                $("#userName").html(json.data.user);
                $("#email").html(json.data.email);
                $("#phone").html(json.data.phone);
                $("#account").html(json.data.account);
                $("#account").html(json.data.account);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function login()
{
    var acc=$("#account").val();
    var password=$("#pwd").val();

    data={
        account:acc,
        pwd:password,
    };

    $.ajax({
        type:"POST",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/account/login",
        dataType:"json",
        data:JSON.stringify(data),
        success:function(json)
        {
            if(json.code==200)
            {
                window.localStorage.setItem("token",json.data.token);
                window.localStorage.setItem("account",json.data.account);
                alert("登录成功!");
                previousPage();
            }
            else
            {
                alert("登录失败!\n原因:"+json.error)
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function logout()
{
    localStorage.removeItem("token");
    alert("注销成功");
    window.location.reload();
}
