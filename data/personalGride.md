## 个人网站导航 ##

#### 搜索： ####

<input id="searchPersonalText" type="text" /><br />
<button id="bingPersonalSearchBtn">bing一下</button>
<button id="googlePersonalSearchBtn">Google搜索</button>

#### 目录： ####
友情提示：电脑Ctrl+F查找，手机也有查找功能

<script>
    $().ready(function()
    {
        $("#bingPersonalSearchBtn").click(function()
        {
            let text=$("#searchPersonalText").val();
            window.open("https://www.bing.com/search?q="+text);
            console.log("https://www.bing.com/search?q="+text);
        });

        $("#googlePersonalSearchBtn").click(function()
        {
            let text=$("#searchPersonalText").val();
            window.open("https://www.google.com/search?q="+text);
        });
    });
</script>