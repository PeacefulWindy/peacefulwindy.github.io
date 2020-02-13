$().ready(function()
{
	$(".menu-icon").click(function()
	{
		$(".leftGride").slideToggle();
	});
	
	$(".template-body").slideToggle(3000);
});