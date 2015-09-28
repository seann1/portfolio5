Meteor.startup(function() {
  	$.getScript("assets/js/threePage.js");
  	Session.set('about', false);
  	Session.set('threeLoaded', false);
});

Template.layout.onRendered(function() {
	$(".headSection").css("height", "400px");
	$(".headSection > canvas").css("height", "400px");
	Session.set('portfolio', false);

	setTimeout(function() {
			Session.set('threeLoaded', true);
			console.log(Session.get('threeLoaded'));
	}, 700);
});

Template.layout.helpers({
	portfolioTrue: function() {
		if (Session.get("portfolio") === true) {
			return true;
		}
	},
	aboutTrue: function() {
		if (Session.get("about") === true) {
			return true;
		}
	},
	threeLoaded: function() {
		if (Session.get("threeLoaded") === true) {
			return true;
		}
	}
});

Template.layout.events({
	'click .foldout': function(e, template) {
		if (!$(".zmdi-arrow-left").hasClass("spinEffect")) {
			$(".zmdi-arrow-left").addClass("spinEffect");
			$(".zmdi-arrow-left").removeClass("reverseSpin");
				setTimeout(function() {
					$(".zmdi-arrow-left").addClass("rotated");

				}, 450);
		} else {
			$(".zmdi-arrow-left").addClass("reverseSpin");
			setTimeout(function() {
				$(".zmdi-arrow-left").removeClass("rotated spinEffect");
			}, 450);
		}

		if (!$(".menuItem1").hasClass("arf")) {
			if (!$(".foldout").hasClass("arf")) {
				$(".menuItem1").animate({right: "+=400"}, 1000);
				$(".menuItem2").delay(300).animate({right: "+=400"}, 1000);
				$(".menuItem3").delay(600).animate({right: "+=400"}, 1000);
				$(".foldout").addClass("arf");

			} else {
				$(".menuItem1").animate({right: "-=400"}, 1000);
				$(".menuItem2").delay(300).animate({right: "-=400"}, 1000);
				$(".menuItem3").delay(600).animate({right: "-=400"}, 1000);
				$(".foldout").removeClass("arf");
			}
		}
	},
	'click .menuItem1': function(e, template) {
		if (!$(".menuItem1").hasClass("arf") && ($(".menuItem1").height() != 40)) {
			$(".homeMenuItem").animate({right: "+=210"}, 1000);
			$(".headSection").animate({height: "60px", marginBottom: "20px"}, 1000);
			$(".headSection > canvas").animate({height: "60px"}, 1000);
			$(".menuItem1").animate({right: "-=400"}, 1000).delay(1000).addClass("arf");
			$(".menuItem2").delay(300).animate({width: "-=200"}, 1000).addClass("arf");
			$(".menuItem3").delay(600).animate({width: "-=200"}, 1000);

			$(".menuItem2").animate({top: "90px", height: "-=40", fontSize: ".5em", backgroundColor: "#00ff7f"}, 500);
			$(".menuItem3").animate({top: "140px", height: "-=40", fontSize: ".5em", backgroundColor: "#0099ff"}, 500);
			$(".menuText1, .menuText2, .menuText3").animate({color: "black"}, 500);
			//$(".mainContainer").append(portfolioHtml);
			Session.set('portfolio', true);
		} else if ($(".menuItem1").height() === 40) {
			$(".menuItem1").animate({top: "250px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#d8ff00", right: "-=400"}, 1000);
			$(".menuItem2").animate({width: "-=200"});
			$(".menuItem2").animate({top: "90px", height: "-=40", fontSize: ".5em", right: "+=400px", backgroundColor: "#00ff7f"}, 500);
			$(".menuItem1").addClass("arf")
			Session.set('portfolio', true);
		}
	},
	'click .menuItem2': function(e, template) {
		if (!$(".menuItem2").hasClass("arf")) {
			Session.set('portfolio', false);
			Session.set('about', true);
			$(".homeMenuItem").animate({right: "+=210"}, 1000);
			$(".headSection").animate({height: "60px", marginBottom: "20px"}, 1000);
			$(".headSection > canvas").animate({height: "60px"}, 1000);
			$(".menuItem1").delay(300).animate({width: "-=200"}, 1000);
			$(".menuItem2").animate({right: "-=400"}, 1000).delay(1000).addClass("arf");
			$(".menuItem3").delay(600).animate({width: "-=200"}, 1000);

			$(".menuItem1").animate({top: "90px", height: "-=40", fontSize: ".5em", backgroundColor: "#00ff7f"}, 500);
			$(".menuItem3").animate({top: "140px", height: "-=40", fontSize: ".5em", backgroundColor: "#0099ff"}, 500);
			$(".menuText1, .menuText2, .menuText3").animate({color: "black"}, 500);
		} else if ($(".menuItem2").height() === 40) {
			Session.set('portfolio', false);
			Session.set('about', true);
			$(".menuItem2").animate({top: "350px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#00ff7f", right: "-=400"}, 1000);
			$(".menuItem1").animate({width: "-=200"});
			$(".menuItem1").animate({top: "90px", height: "-=40", fontSize: ".5em", right: "+=400px", backgroundColor: "#d8ff00"}, 500);
			$(".menuItem2").addClass("arf");
		}
	},
	'click .homeMenuItem': function(e, template) {
		if ($(".menuItem1").hasClass("arf")) {
			Session.set('portfolio', false);
			Session.set('about', false);
			$(".homeMenuItem").animate({right: "-=210"}, 300);
			$(".headSection").animate({height: "400px"}, 1000);
			$(".headSection > canvas").animate({height: "400px"}, 1000);
			$(".menuItem1").animate({right: "+=400"}, 1000).delay(1000).removeClass("arf");
			$(".menuItem2").delay(300).animate({width: "+=200"}, 1000);
			$(".menuItem3").delay(600).animate({width: "+=200"}, 1000);

			$(".menuItem2").animate({top: "350px", height: "+=40", fontSize: "1em", backgroundColor: "#00ff94"}, 500);
			$(".menuItem3").animate({top: "450px", height: "+=40", fontSize: "1em", backgroundColor: "#ff0000"}, 500);
			$(".menuText1, .menuText2, .menuText3").animate({color: "#bbc107"}, 500);
		} else if ($(".menuItem2").hasClass("arf")) {
			Session.set('portfolio', false);
			Session.set('about', false);
			$(".homeMenuItem").animate({right: "-=210"}, 300);
			$(".headSection").animate({height: "400px"}, 1000);
			$(".headSection > canvas").animate({height: "400px"}, 1000);
			$(".menuItem1").delay(300).animate({top: "250px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#d8ff00"}, 1000);
			$(".menuItem2").animate({right: "+=400"}, 1000).delay(1000);
			$(".menuItem3").delay(600).animate({width: "+=200"}, 1000);

			$(".menuItem2").animate({top: "350px", fontSize: "1em", backgroundColor: "#00ff94"}, 500).removeClass("arf");
			$(".menuItem3").animate({top: "450px", height: "+=40", fontSize: "1em", backgroundColor: "#ff0000"}, 500);
			$(".menuText1, .menuText2, .menuText3").animate({color: "#bbc107"}, 500);
		}
	}
});