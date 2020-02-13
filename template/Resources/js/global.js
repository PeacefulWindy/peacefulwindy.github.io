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
});