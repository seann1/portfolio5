Meteor.startup(function() {
  	$.getScript("assets/js/threePage.js");
});

Template.home.onRendered(function() {
	$(".headSection").css("height", "400px");
	$(".menuItem1").animate({right: "+=400"}, 1000);
	$(".menuItem2").delay(300).animate({right: "+=400"}, 1000);
	$(".menuItem3").delay(600).animate({right: "+=400"}, 1000);
});