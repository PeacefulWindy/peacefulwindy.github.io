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

function getDiscuss(id)
{
    url=host+"v1/blog/article/discuss";
    url=url+"?id="+id;

    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:url,
        success:function(json)
        {

        },error:function(json)
        {
            alert("连接服务器错误!");
        }
}
