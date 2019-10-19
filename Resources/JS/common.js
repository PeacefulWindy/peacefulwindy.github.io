$("#noJSTip").hide();

function setTitle(text)
{
    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/who",
        success:function(json)
        {
            $(document).attr("title",json.data.who+"'s "+text);
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function previousPage()
{
    window.history.go(-1);
}

function backIndex()
{
    window.location.href='/';
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}