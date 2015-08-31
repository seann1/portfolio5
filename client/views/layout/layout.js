var portfolioHtml = "<div class='row portfolioHtml'><div class='col-md-4 test'></div><div class='col-md-4 test'></div><div class='col-md-4 test'></div></div>";

Meteor.startup(function() {
  	$.getScript("assets/js/threePage.js");
});

Template.home.onRendered(function() {
	$(".headSection").css("height", "400px");
	if (!$(".menuItem1").hasClass("arf")) {
		$(".menuItem1").animate({right: "+=400"}, 1000);
		$(".menuItem2").delay(300).animate({right: "+=400"}, 1000);
		$(".menuItem3").delay(600).animate({right: "+=400"}, 1000);
	}
});

Template.layout.events({
	'click .menuItem1': function(e, template) {
		$(".homeLink").append("<div class='row homeLinkRow'><div class='homeMenuItem'><p class='menuText1'>Home</p></div></div>");
		$(".homeMenuItem").animate({right: "+=200"}, 1000);
		if (!$(".menuItem1").hasClass("arf")) {
			$(".headSection").animate({height: "60px", marginBottom: "20px"}, 1000);
			$(".headSection > canvas").animate({height: "60px"}, 1000);
			$(".menuItem1").animate({right: "-=400"}, 1000).delay(1000).addClass("arf");
			$(".menuItem2").delay(300).animate({width: "-=200"}, 1000);
			$(".menuItem3").delay(600).animate({width: "-=200"}, 1000);

			$(".menuItem2").animate({top: "90px", height: "-=40", fontSize: ".5em", backgroundColor: "#00ff7f"}, 500);
			$(".menuItem3").animate({top: "140px", height: "-=40", fontSize: ".5em", backgroundColor: "#0099ff"}, 500);
			$(".menuText1, .menuText2, .menuText3").animate({color: "black"}, 500);
			$(".mainContainer").append(portfolioHtml);
		}
	},
	'click .homeMenuItem': function(e, template) {
		if($(".menuItem1").hasClass("arf")) {
			$(".portfolioHtml").remove();
			$(".homeMenuItem").animate({right: "-=200"}, 300);
			$(".headSection").animate({height: "400px"}, 1000);
			$(".headSection > canvas").animate({height: "400px"}, 1000);
			$(".menuItem1").animate({right: "+=400"}, 1000).delay(1000).removeClass("arf");
			$(".menuItem2").delay(300).animate({width: "+=200"}, 1000);
			$(".menuItem3").delay(600).animate({width: "+=200"}, 1000);

			$(".menuItem2").animate({top: "350px", height: "+=40", fontSize: "1em", backgroundColor: "#00ff94"}, 500);
			$(".menuItem3").animate({top: "450px", height: "+=40", fontSize: "1em", backgroundColor: "#ff0000"}, 500);
			$(".menuText1, .menuText2, .menuText3").animate({color: "#bbc107"}, 500);
		}
	}
});