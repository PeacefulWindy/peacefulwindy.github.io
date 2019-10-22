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