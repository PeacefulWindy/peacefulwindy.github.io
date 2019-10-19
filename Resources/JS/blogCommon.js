function setGride()
{
    var grideText=new Array("首页","文章","关于");
    var grideLink=new Array("blog.html","article.html","about.html");

    var html="";
    for(var i=0;i<grideText.length;i++)
    {
        html+="<li>";
        html+="<a href='";
        html+=grideLink[i];
        html+="'>";
        html+="<span>";
        html+=grideText[i];
        html+="</span>";
        html+="</a>";
        html+="</li>";
    }

    $("#gride").html(html);
}

function setArticle(data,isShowContent=false)
{
    var htm="";
    if(!isShowContent)
    {
        htm=htm+"<h2>文章列表</h2>";
        htm=htm+"<div style='border-bottom: solid 1px black'></div>";
    }
    else
    {
        htm=htm+"<a href='javascript:void(0);' onclick='previousPage()'><span>返回</span></a>";
        htm=htm+"<p></p>";
        htm=htm+"<div style='border-bottom: solid 1px black;'></div>";
        htm=htm+"<p></p>";
    }
    $.each(data,function(key,val)
    {
        htm=htm+"<div>";
        htm=htm+"<h3><a href='article.html?id="+val.id+"'>"+val.title+"</a></h3>";
        htm=htm+"<div><span>分类:</span><span><a href='article.html?article="+val.classifyID+"'>"+val.classifyName+"</a></span><br></div>";

        if(isShowContent)
        {
            htm=htm+"<p>"+val.content+"</p>";
        }

        htm=htm+"<div><span>创建时间:</span><span>"+val.createTime+"</span></div>";
        htm=htm+"<div><span>修改时间:</span><span>"+val.updateTime+"</span></div>";
        if(val.isMe)
        {
            htm=htm+"<br /><div style='border-bottom: solid 1px black'></div><br /";
            htm=htm+"<div>";
            htm=htm+"<a href='editArticle.html?id="+val.id+"'><span>修改</span></a>&nbsp&nbsp";
            htm=htm+"<a href=''><span>删除</span></a>";
            htm=htm+"</div>";
        }
        htm=htm+"</div>";
    })
    $("#ArticleList").html(htm);
}

function setEditArticle(data)
{
    $("#title").val(data[0].title);
    editor.txt.html(data[0].content);
}

function getArticleWithID(id,isEdit=false)
{
    tk=localStorage.getItem("token");
    url=host+"v1/blog/article";
    url=url+"?id="+id;

    if(tk)
    {
        url=url+"&token="+tk;
    }

    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:url,
        success:function(json)
        {
            if(json.code==200)
            {
                if(isEdit)
                {
                    setEditArticle(json.data);
                }
                else
                {
                    setArticle(json.data,true);
                }
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function getArticle(classifyID=-1,limit=10,private=false)
{
    tk=localStorage.getItem("token");

    url=host+"v1/blog/article?";
    url=url+"&private="+private;
    url=url+"&limit="+limit;

    if(classifyID!=-1)
    {
        url=url+"&classify="+classifyID;
    }

    if(tk)
    {
        url=url+"&token="+tk;
    }
    console.log(url)

    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:url,
        success:function(json)
        {
            if(json.code==200)
            {
                setArticle(json.data);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function setClassifyGride(data)
{
    var classify=$("#articleGride ul");
    var htm="";
    $.each(data,function(key,val)
    {
        htm=htm+"<li><a href='article.html?classify="+val.id+"'>"+val.name+"</a></li>";
    });
    classify.html(htm);
}

function setClassifyOption(data)
{
    var classify=$("#classify");
    var htm="";
    $.each(data,function(key,val)
    {
        htm+="<option name='classify' value='";
        htm+=val.id;
        htm+="'>"
        htm+=val.name;
        htm+="</option>";
    });
    classify.html(htm);
}

function getClassify(type)
{
    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blog/classify",
        success:function(json)
        {
            if(json.code==200)
            {
                if(type=="option")
                {
                    setClassifyOption(json.data);
                }
                else if(type="gride")
                {
                    setClassifyGride(json.data);
                }
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function checkLogin()
{
    var token=window.localStorage.getItem("token");

    if(!token)
    {
        return false;
    }

    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/account/login?token="+token,
        success:function(json)
        {
            if(json.code==200)
            {
                var htm="";
                htm=htm+"<li><a href='account.html'><span>账号面板</span></a></li>";
                $("#accountGride").html(htm);
            }
        },
        error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

