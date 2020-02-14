$().ready(function()
{
	$(".menu-icon").click(function()
	{
		$(".leftGride").slideToggle();
	});
	
	$(".template-body").slideToggle(3000);

	$(".top-icon").hide();

	$(function()
	{
		$(window).scroll(function() 
		{
			if ($(window).scrollTop() > 50) 
			{
				$(".top-icon").fadeIn(200);
			}
			else 
			{
				$(".top-icon").fadeOut(200);
			}
		});
		//当点击跳转链接后，回到页面顶部位置
		$(".top-icon").click(function()
		{
			$('body,html').animate(
			{
				scrollTop: 0
			},500);
			return false;
		});
	});

	$("#baiduSearchBtn").click(function()
	{
		let text=$("#searchText").val();
		let url=$("input[name='searchRadio']:checked").val();
		window.open("https://www.baidu.com/s?ie=utf-8&wd="+text+"&ct=2097152&si="+url);
	});

	//https://www.google.com/search?&as_q=TIM&as_sitesearch=qq.com
	$("#googleSearchBtn").click(function()
	{
		let text=$("#searchText").val();
		let url=$("input[name='searchRadio']:checked").val();
		window.open("https://www.google.com/search?&as_q="+text+"&as_sitesearch="+url);
	});
});