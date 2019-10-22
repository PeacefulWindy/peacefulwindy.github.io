function submitBlackList()
{
    var reason=$("#reason").val();
    var gameName=$("#gameName").val();
    var serverName=$("#serverName").val();
    var actorName=$("#actorName").val();
    var qq=$("#qq").val();
    var baidu=$("#baidu").val();
    var wechat=$("#wechat").val();
    var alipay=$("#alipay").val();
    var paypal=$("#paypal").val();
    var evidence=$("#evidence").val();

    if(reason=="")
    {
        alert("原因不能为空");
        return;
    }

    if(evidence=="")
    {
        alert("证据不能为空");
        return;
    }

    eviList=evidence.split("\n");
    evidence="";
    $.each(eviList,function(key,val){
        evidence+=val+",";
    });
    evidence=evidence.substr(0,evidence.length-1);

    data={
        reason:reason,
        gameName:gameName,
        serverName:serverName,
        actorName:actorName,
        qq:qq,
        baidu:baidu,
        wechat:wechat,
        alipay:alipay,
        paypal:paypal,
        evidence:evidence,
    };

    $.ajax({
        type:"POST",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blacklist/checkblacklist",
        dataType:"json",
        data:JSON.stringify(data),
        success:function(json)
        {
            if(json.code==200)
            {
                alert("提交成功,请等待审核");
                window.location.href="index.html";
            }
            else
            {
                alert("错误"+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function searchBlackList(page=1)
{
    var search=$("#search").val();

    if(!search)
    {
        alert("关键词不能为空");
        return;
    }

    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blacklist?search="+search+"&page="+page,
        success:function(json)
        {
            htm=""
            htm=htm+"<tr>";
            htm=htm+"<th>id</th>";
            htm=htm+"<th>原因</th>";
            htm=htm+"<th>游戏名称</th>";
            htm=htm+"<th>所属区服</th>";
            htm=htm+"<th>角色ID</th>";
            htm=htm+"<th>QQ</th>";
            htm=htm+"<th>百度ID</th>";
            htm=htm+"<th>微信</th>";
            htm=htm+"<th>支付宝账号</th>";
            htm=htm+"<th>相关证据</th>";
            htm=htm+"<th>日期</th>";
            htm=htm+"<th>操作</th>";
            htm=htm+"</tr>";
            $.each(json.data,function(key,val)
            {
                actList=val.actorName.split(",");
                qqList=val.qq.split(",");
                baiduList=val.baidu.split(",");
                wechatList=val.wechat.split(",");
                alipayList=val.alipay.split(",");
                eviList=val.evidence.split(",");

                htm=htm+"<tr>";
                htm=htm+"<td>"+val.id+"</td>";
                htm=htm+"<td>"+val.reason+"</td>";
                htm=htm+"<td>"+val.gameName+"</td>";
                htm=htm+"<td>"+val.serverName+"</td>";
                htm=htm+"<td>";
                $.each(actList,function(key,val)
                {
                    htm=htm+val+"<br />";
                });
                htm=htm+"</td><td>";
                $.each(qqList,function(key,val)
                {
                    htm=htm+val+"<br />";
                });
                htm=htm+"</td><td>";
                $.each(baiduList,function(key,val)
                {
                    htm=htm+val+"<br />";
                });
                htm=htm+"</td><td>";
                $.each(wechatList,function(key,val)
                {
                    htm=htm+val+"<br />";
                });
                htm=htm+"</td><td>";
                $.each(alipayList,function(key,val)
                {
                    htm=htm+val+"<br />";
                });
                htm=htm+"</td><td>";
                $.each(eviList,function(key,val)
                {
                    htm=htm+"<a href='"+val+"'>链接"+key+"</a><br />";
                });
                htm=htm+"</td><td>";
                htm=htm+val.createdTime;
                htm=htm+"</td><td>";
                htm=htm+"<a href='submitBlackListAppeal.html?id="+val.id+"'>申诉</a>";
                htm=htm+"</td>";
                htm=htm+"</tr>";
            })
            $("#blacklist").html(htm);
            $("#paginator").jqPaginator({
                totalPages: json.totalpage,
                visiblePages: 10,
                currentPage: json.currpage,
                onPageChange: function (num, type) {
                    if(type=="change")
                    {
                        searchBlackList(num);
                    }
                }
            });
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function submitAppeal()
{
    var id=$("#id").val();
    var reason=$("#reason").val();

    data={
        id:id,
        reason:reason,
    };

    $.ajax({
        type:"POST",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blacklist/appeal",
        dataType:"json",
        data:JSON.stringify(data),
        success:function(json)
        {
            if(json.code==200)
            {
                alert("提交成功,请等待审核");
                window.location.href="blacklist.html";
            }
            else
            {
                alert("错误:"+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function getCheckBlackList()
{
    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blacklist/checkblacklist",
        success:function(json)
        {
            if(json.code==200)
            {
                htm=""
                htm=htm+"<tr>";
                htm=htm+"<th>id</th>";
                htm=htm+"<th>原因</th>";
                htm=htm+"<th>游戏名称</th>";
                htm=htm+"<th>所属区服</th>";
                htm=htm+"<th>角色ID</th>";
                htm=htm+"<th>QQ</th>";
                htm=htm+"<th>百度ID</th>";
                htm=htm+"<th>微信</th>";
                htm=htm+"<th>支付宝账号</th>";
                htm=htm+"<th>相关证据</th>";
                htm=htm+"<th>日期</th>";
                htm=htm+"<th>操作</th>";
                htm=htm+"</tr>";
                $.each(json.data.data,function(key,val)
                {
                    actList=val.actorName.split(",");
                    qqList=val.qq.split(",");
                    baiduList=val.baidu.split(",");
                    wechatList=val.wechat.split(",");
                    alipayList=val.alipay.split(",");
                    eviList=val.evidence.split(",");

                    htm=htm+"<tr>";
                    htm=htm+"<td>"+val.id+"</td>";
                    htm=htm+"<td>"+val.reason+"</td>";
                    htm=htm+"<td>"+val.gameName+"</td>";
                    htm=htm+"<td>"+val.serverName+"</td>";
                    htm=htm+"<td>";
                    $.each(actList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(qqList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(baiduList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(wechatList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(alipayList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(eviList,function(key,val)
                    {
                        htm=htm+"<a href='"+val+"'>链接"+key+"</a><br />";
                    });
                    htm=htm+"</td><td>";
                    htm=htm+val.createdTime;
                    htm=htm+"</td><td>";
                    htm=htm+"<a href='javascript:;' onclick='disagreeBlackList("+val.id+")'>不同意</a>";
                    htm=htm+"&nbsp&nbsp";
                    htm=htm+"<a href='javascript:;' onclick='agreeBlackList("+val.id+")'>同意</a>";
                    htm=htm+"</td>";
                    htm=htm+"</tr>";
                })
                $("#checkblacklist").html(htm);
            }
            else
            {
                alert("错误:"+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function disagreeBlackList(id)
{
    if(!confirm("不通过id为"+id+"?"))
    {
        return;
    }

    var token=window.localStorage.getItem("token");
    if(!token)
    {
        alert("您未登录或没有权限");
        return;
    }

    $.ajax({
        type:"DELETE",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blacklist/checkblacklist?id="+id+"&token="+token,
        success:function(json)
        {
            if(json.code==200)
            {
                alert("已执行");
                window.location.reload();
            }
            else
            {
                alert("错误:"+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function agreeBlackList(id)
{
    if(!confirm("通过id为"+id+"?"))
    {
        return;
    }

    var token=window.localStorage.getItem("token");
    if(!token)
    {
        alert("您未登录或没有权限");
        return;
    }

    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blacklist/checkblacklist?id="+id+"&token="+token,
        success:function(json)
        {
            if(json.code==200)
            {
                alert("已执行");
                window.location.reload();
            }
            else
            {
                alert("错误:"+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function getAppeal()
{
    $.ajax({
        type:"GET",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blacklist/appeal",
        success:function(json)
        {
            if(json.code==200)
            {
                htm=""
                htm=htm+"<tr>";
                htm=htm+"<th>id</th>";
                htm=htm+"<th>黑名单id</th>";
                htm=htm+"<th>原因</th>";
                htm=htm+"<th>游戏名称</th>";
                htm=htm+"<th>所属区服</th>";
                htm=htm+"<th>角色ID</th>";
                htm=htm+"<th>QQ</th>";
                htm=htm+"<th>百度ID</th>";
                htm=htm+"<th>微信</th>";
                htm=htm+"<th>支付宝账号</th>";
                htm=htm+"<th>相关证据</th>";
                htm=htm+"<th>日期</th>";
                htm=htm+"<th>申请原因</th>";
                htm=htm+"<th>操作</th>";
                htm=htm+"</tr>";

                $.each(json.data,function(key,val)
                {
                    actList=val.b_actorName.split(",");
                    qqList=val.b_qq.split(",");
                    baiduList=val.b_baidu.split(",");
                    wechatList=val.b_wechat.split(",");
                    alipayList=val.b_alipay.split(",");
                    eviList=val.b_evidence.split(",");

                    htm=htm+"<tr>";
                    htm=htm+"<td>"+val.id+"</td>";
                    htm=htm+"<td>"+val.b_id+"</td>";
                    htm=htm+"<td>"+val.b_reason+"</td>";
                    htm=htm+"<td>"+val.b_gameName+"</td>";
                    htm=htm+"<td>"+val.b_serverName+"</td>";
                    htm=htm+"<td>";
                    $.each(actList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(qqList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(baiduList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(wechatList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(alipayList,function(key,val)
                    {
                        htm=htm+val+"<br />";
                    });
                    htm=htm+"</td><td>";
                    $.each(eviList,function(key,val)
                    {
                        htm=htm+"<a href='"+val+"'>链接"+key+"</a><br />";
                    });
                    htm=htm+"</td><td>";
                    htm=htm+val.createdTime;
                    htm=htm+"</td><td>";

                    htm=htm+val.reason;
                    htm=htm+"</td><td>";

                    htm=htm+"<a href='javascript:;' onclick='disagreeAppeal("+val.id+")'>不同意</a>";
                    htm=htm+"&nbsp&nbsp";
                    htm=htm+"<a href='javascript:;' onclick='agreeAppeal("+val.id+","+val.b_id+")'>同意</a>";
                    htm=htm+"</td>";
                    htm=htm+"</tr>";
                })
                $("#cancelblacklist").html(htm);
            }
            else
            {
                alert("错误:"+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function disagreeAppeal(id)
{
    if(!confirm("不通过id为"+id+"?"))
    {
        return;
    }

    var token=window.localStorage.getItem("token");
    if(!token)
    {
        alert("您未登录或没有权限");
        return;
    }

    $.ajax({
        type:"DELETE",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blacklist/appeal?id="+id+"&token="+token,
        success:function(json)
        {
            if(json.code==200)
            {
                alert("已执行");
                window.location.reload();
            }
            else
            {
                alert("错误:"+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}

function agreeAppeal(id,b_id)
{
    if(!confirm("通过id为"+id+"?"))
    {
        return;
    }

    var token=window.localStorage.getItem("token");
    if(!token)
    {
        alert("您未登录或没有权限");
        return;
    }

    $.ajax({
        type:"DELETE",
        Accept: "application/json; charset=utf-8",
        url:host+"v1/blacklist/appeal?id="+id+"&token="+token,
        success:function(json)
        {
            if(json.code==200)
            {
                $.ajax({
                    type:"DELETE",
                    Accept: "application/json; charset=utf-8",
                    url:host+"v1/blacklist?id="+b_id+"&token="+token,
                    success:function(json)
                    {
                        if(json.code==200)
                        {
                            alert("已执行");
                            window.location.reload();
                        }
                        else
                        {
                            alert("错误:"+json.error);
                        }
                    }
                });
            }
            else
            {
                alert("错误:"+json.error);
            }
        },error:function(json)
        {
            alert("连接服务器错误!");
        }
    });
}