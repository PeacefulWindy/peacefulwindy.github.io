var token=window.localStorage.getItem("token");
if(!token)
{
    alert("您没有登录!");
    previousPage();
}

var E=window.wangEditor;
var editor=new E("#editor");
editor.create();

$("#submitArticle").on("click",function(){
    var title=$("#articleTitle").val();
    var content=editor.txt.html();
    var public=false;

    if($("input[name='public']:checked").val()==1)
    {
        public=true;
    }
    var classify=$("#classify").val()
    
    data={
        "token":token,
        "title":title,
        "content":content,
        "classifyID":classify,
        "public":public,
    }

    $.ajax({
        type:"POST",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blog/article",
        dataType:"json",
        data:JSON.stringify(data),
        success:function(json)
        {
            if(json.code==200)
            {
                alert("发布成功!");
            }
            else
            {
                alert("发布失败!\n原因:"+json.error)
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
});