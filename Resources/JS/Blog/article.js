window.onload=function()
{
    setTitle("Blog");
    setGride();
    getClassify("gride"); 
    checkLogin();
    id=GetQueryString("id");
    classify=GetQueryString("classify");
    if(id)
    {
        getArticleWithID(id);
        $("#discussArea").show();
        var E=window.wangEditor;
        editor=new E("#editor");
        editor.create();
        getDiscuss(id);
    }
    else
    {
        if(classify)
        {
            getArticle(classify);
        }
    }
}

function readDiscussData(data,userName,admin)
{
    var htm="";
    for(var i=0;i<data.length;i++)
    {
        htm+="<div class='discuss'>";
        htm+="<h3>"+data[i].userName+":&nbsp&nbsp</h3>";
        htm+="<div class='discussContent'>";
        htm+=data[i].content
        htm+="<div class='discussTime'>"+data[i].createTime+"</div>"
        htm+="<div>";
        htm+="<a href='javascript:void(0);' onclick='setDiscussReady("+data[i].id+");'>回复</a>&nbsp&nbsp";
        if(data[i].userName==userName || admin)
        {
            htm+="<a href='javascript:void(0);' onclick='delDiscuss("+data[i].id+");'>删除</a>";
        }
        htm+="</div>";
        if(data[i].children.length>0)
        {
            htm+=readDiscussData(data[i].children,userName,admin);
        }
        htm+="</div>";
        htm+="</div>";
    }
    return htm;
}

function getDiscuss(id)
{
    var token=window.localStorage.getItem("token");
    if(!token)
    {
        alert("您没有登录!");
        return;
    }

    url=host+"v1/blog/article/discuss";
    url=url+"?id="+id;

    var token=window.localStorage.getItem("token");
    if(token)
    {
        url=url+"&token="+token;
    }

    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:url,
        success:function(json)
        {
            var htm=readDiscussData(json.data,id,json.userName,json.admin);
            if(htm=="")
            {
                htm="<div class='discuss'>还没有人评论,快来评论一下?</div>";
            }
            $("#discussShow").html(htm);
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function delDiscuss(id)
{
    if(!confirm("删除该评论?"))
    {
        return;
    }

    url=host+"v1/blog/article/discuss";
    url=url+"?id="+id;

    var token=window.localStorage.getItem("token");
    if(token)
    {
        url=url+"&token="+token;
    }

    $.ajax({
        type:"DELETE",
        Accept: "application/json; charset=utf-8",
        url:url,
        success:function(json)
        {
            alert("删除成功!");
            window.location.reload();
            
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function setDiscussReady(id=0)
{
    $("#discussID").val(id);
}

function submitDiscuss()
{
    var token=window.localStorage.getItem("token");
    if(token)
    {
        url=url+"&token="+token;
    }

    var id=$("#discussID").val();
    var content=editor.txt.html();
    var articleID=GetQueryString("id");

    if(content=="")
    {
        alert("评论不能为空!");
    }

    data={
        "id":id,
        "token":token,
        "content":content,
        "articleID":articleID,
    }

    $.ajax({
        type:"POST",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blog/article/discuss",
        dataType:"json",
        data:JSON.stringify(data),
        success:function(json)
        {
            if(json.code==200)
            {
                alert("评论成功!");
                window.location.reload();
            }
            else
            {
                alert("评论失败!\n原因:"+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}