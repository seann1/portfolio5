Meteor.startup(function() {
  	$.getScript("assets/js/threePage.js");
});

Template.home.onRendered(function() {
	$(".headSection").css("height", "400px");
	if (!$(".menuItem1").hasClass("arf")) {
		$(".menuItem1").animate({right: "+=400"}, 1000);
		$(".menuItem2").delay(300).animate({right: "+=400"}, 1000);
		$(".menuItem3").delay(600).animate({right: "+=400"}, 1000);
	} else {
		$(".headSection").animate({"height": "400px"}, 1000);
		$(".headSection > canvas").animate({height: "400px"}, 1000);
		$(".menuItem1").animate({right: "+=400"}, 1000).delay(1000).removeClass("arf");
		$(".menuItem2").delay(300).animate({width: "+=200"}, 1000);
		$(".menuItem3").delay(600).animate({width: "+=200"}, 1000);

		$(".menuItem2").animate({top: "350px", height: "+=40", fontSize: "1em", backgroundColor: "#00ff94"}, 500);
		$(".menuItem3").animate({top: "450px", height: "+=40", fontSize: "1em", backgroundColor: "#ff0000"}, 500);
		$(".menuText1, .menuText2, .menuText3").animate({color: "#bbc107"}, 500);
	}

});

Template.layout.events({
	'click .homeMenuItem': function(e, template) {
		
	}
})