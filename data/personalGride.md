## 个人网站导航 ##

#### 搜索世界： ####

<input id="searchPersonalText" type="text" /><br /><br />
<button id="bingPersonalSearchBtn">bing一下</button>
<button id="googlePersonalSearchBtn">Google搜索</button>

友情提示：电脑Ctrl+F查找，手机也有查找功能
#### 导航目录： ####

<style>
#searchPersonalText
{
    width:100%;
    height:2em;
}
#bingPersonalSearchBtn
{
    width:30%;
    height:2em;
}
#googlePersonalSearchBtn
{
    width:30%;
    height:2em;
}
</style>

<script>
    $().ready(function()
    {
        function bingClicked()
        {
            let text=$("#searchPersonalText").val();
            window.open("https://www.bing.com/search?q="+text);
            console.log("https://www.bing.com/search?q="+text);
        }

        $("#bingPersonalSearchBtn").click(bingClicked);

        $("#googlePersonalSearchBtn").click(function()
        {
            let text=$("#searchPersonalText").val();
            window.open("https://www.google.com/search?q="+text);
        });

        $(document).keydown(function(event){
            switch(event.keyCode)
            {
            case 13:
                bingClicked();
                break;
            }
        });
    });
</script>