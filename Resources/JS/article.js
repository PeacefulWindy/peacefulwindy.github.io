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
        htm+="<button>回复</button>&nbsp&nbsp";
        if(data[i].userName==userName || admin)
        {
            htm+="<button>删除</button>";
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
            $("#discussShow").html(htm);
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}
