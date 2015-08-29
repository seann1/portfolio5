Template.portfolio.onRendered(function() {
	$(".homeLink").append("<div class='row homeLinkRow'><div class='homeMenuItem'><p class='menuText1'>Home</p></div></div>");
	$(".homeMenuItem").animate({right: "+=200"}, 1000);
	$(".headSection").animate({height: "60px"}, 1000);
	$(".headSection > canvas").animate({height: "60px"}, 1000);
	$(".menuItem1").animate({right: "-=400"}, 1000).delay(1000).addClass("arf");
	$(".menuItem2").delay(300).animate({width: "-=200"}, 1000);
	$(".menuItem3").delay(600).animate({width: "-=200"}, 1000);

	$(".menuItem2").animate({top: "90px", height: "-=40", fontSize: ".5em", backgroundColor: "#00ff7f"}, 500);
	$(".menuItem3").animate({top: "140px", height: "-=40", fontSize: ".5em", backgroundColor: "#0099ff"}, 500);
	$(".menuText1, .menuText2, .menuText3").animate({color: "black"}, 500);

	$(".homeMenuItem").click(function() {
		$(".homeMenuItem").animate({right: "-=200"}, 300);
		Router.go('/');
	});

});