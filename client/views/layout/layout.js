Meteor.startup(function() {
	
  	$.getScript("assets/js/threePage.js");
  	Session.set('portfolio', false);
  	Session.set('about', false);
  	Session.set('contact', false);
  	Session.set('threeLoaded', false);

 	Meteor.call("setupAvatar", function(error, result) {
 		//console.log(result[0].avatar);
 		Session.set("avatar", result[0].avatar);
 	});
 	Meteor.call("setupRecentCommit", function(error, result) {
 		Session.set("recentCommitMessage", result.payload.commits[0].message);
 		Session.set("recentCommitRepo", result.repo.name);
 		Session.set("recentCommitDate", moment(result.created_at, moment.ISO_8601).utc().format("MMMM Do YYYY"));
 	});
	Meteor.call("setupGitRepos", function(error, result) {
		Session.set("repos", result);
		Session.set("reposLoaded", true);
	});
	Meteor.call("setupPieChartData", function(error, result) {
		Session.set("pieChartData", result);
	});
	Meteor.call("setupGitEvents", function(error,result) {
		Session.set("commits", result);
		Session.set("eventsLoaded", true);
	});
});

Template.layout.onRendered(function() {

	$(".headSection").css("height", "400px");
	$(".headSection > canvas").css("height", "400px");
	//Session.set('portfolio', false);

	setTimeout(function() {
			Session.set('threeLoaded', true);
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
	contactTrue: function() {
		if (Session.get("contact") === true) {
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
	//work
	'click .menuItem1': function(e, template) {
		if (!$(".menuItem1").hasClass("arf") && ($(".menuItem1").height() != 40)) {
			$(".homeMenuItem").animate({right: "+=210"}, 1000);
			$(".headSection").animate({height: "60px", marginBottom: "20px"}, 1000);
			$(".headSection > canvas").animate({height: "60px"}, 1000);
			$(".menuItem1").animate({right: "-=400"}, 1000).delay(1000).addClass("arf");
			$(".menuItem2").delay(300).animate({width: "-=200"}, 1000);
			$(".menuItem3").delay(600).animate({width: "-=200"}, 1000);

			$(".menuItem2").animate({top: "90px", height: "-=40", fontSize: ".5em", backgroundColor: "#ddd"}, 500);
			$(".menuItem3").animate({top: "140px", height: "-=40", fontSize: ".5em", backgroundColor: "#ddd"}, 500);
			$(".menuText1, .menuText2, .menuText3").animate({color: "black"}, 500);

		} else if ($(".menuItem1").height() === 40) {
			//if about is chosen
			if ($(".menuItem2").hasClass("arf")) {

				$(".menuItem1").animate({top: "250px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#ddd", right: "-=400"}, 1000);
				$(".menuItem2").animate({width: "-=200"});
				$(".menuItem2").animate({top: "90px", height: "-=40", fontSize: ".5em", right: "+=400px", backgroundColor: "#ddd"}, 500);
				$(".menuItem1").addClass("arf");
			//if contact is chosen
			} else if ($(".menuItem3").hasClass("arf")) {
				$(".menuItem2").animate({top: "90px"});
				$(".menuItem1").animate({top: "250px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#ddd", right: "-=400"}, 1000);
				$(".menuItem3").animate({width: "-=200"});
				$(".menuItem3").animate({top: "140px", height: "-=40", fontSize: ".5em", right: "+=400px", backgroundColor: "#ddd"}, 500);
				$(".menuItem1").addClass("arf");
				
			}
		}
		$(".menuItem1").addClass("arf");
		$(".menuItem2").removeClass("arf");
		$(".menuItem3").removeClass("arf");
		Session.set('portfolio', true);
		Session.set('about', false);
		Session.set('contact', false);
	},
	//about
	'click .menuItem2': function(e, template) {
		//click from home
		if (!$(".menuItem2").hasClass("arf") && $(".menuItem2").height() != 40) {
			$(".homeMenuItem").animate({right: "+=210"}, 1000);
			$(".headSection").animate({height: "60px", marginBottom: "20px"}, 1000);
			$(".headSection > canvas").animate({height: "60px"}, 1000);
			$(".menuItem1").delay(300).animate({width: "-=200"}, 1000);
			$(".menuItem2").animate({right: "-=400"}, 1000).delay(1000);
			$(".menuItem3").delay(600).animate({width: "-=200"}, 1000);

			$(".menuItem1").animate({top: "90px", height: "-=40", fontSize: ".5em", backgroundColor: "#ddd"}, 500);
			$(".menuItem3").animate({top: "140px", height: "-=40", fontSize: ".5em", backgroundColor: "#ddd"}, 500);
			$(".menuText1, .menuText2, .menuText3").animate({color: "black"}, 500);
		} else if ($(".menuItem2").height() === 40) {
			//if work is chosen
			if ($(".menuItem1").hasClass("arf")) {
				$(".menuItem2").animate({top: "350px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#ddd", right: "-=400"}, 1000);
				$(".menuItem1").animate({width: "-=200"});
				$(".menuItem1").animate({top: "90px", height: "-=40", fontSize: ".5em", right: "+=400px", backgroundColor: "#ddd"}, 500);
			//if contact is chosen
			} else if ($(".menuItem3").hasClass("arf")) {
				$(".menuItem2").animate({top: "350px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#ddd", right: "-=400"}, 1000);
				$(".menuItem3").animate({width: "-=200"});
				$(".menuItem3").animate({top: "140px", height: "-=40", fontSize: ".5em", right: "+=400px", backgroundColor: "#ddd"}, 500);
			}
		}
		$(".menuItem1").removeClass("arf");
		$(".menuItem3").removeClass("arf");
		$(".menuItem2").addClass("arf");
		Session.set('contact', false);
		Session.set('portfolio', false);
		Session.set('about', true);
	},
	//contact
	'click .menuItem3': function(e, template) {
		if (!$(".menuItem3").hasClass("arf") && $(".menuItem3").height() != 40) {
			$(".homeMenuItem").animate({right: "+=210"}, 1000);
			$(".headSection").animate({height: "60px", marginBottom: "20px"}, 1000);
			$(".headSection > canvas").animate({height: "60px"}, 1000);
			$(".menuItem1").delay(300).animate({width: "-=200"}, 1000);
			$(".menuItem2").delay(600).animate({width: "-=200"}, 1000);
			$(".menuItem3").animate({right: "-=400"}, 1000).delay(1000);
			$(".menuItem1").animate({top: "90px", height: "-=40", fontSize: ".5em", backgroundColor: "#ddd"}, 500);
			$(".menuItem2").animate({top: "140px", height: "-=40", fontSize: ".5em", backgroundColor: "#ddd"}, 500);
			$(".menuText1, .menuText2, .menuText3").animate({color: "black"}, 500);
		} else if ($(".menuItem3").height() === 40) {

			//if work is chosen
			if ($(".menuItem1").hasClass("arf")) {
				$(".menuItem2").animate({top: "140px"});
				$(".menuItem3").animate({top: "350px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#ddd", right: "-=400"}, 1000);
				$(".menuItem1").animate({width: "-=200"});
				$(".menuItem1").animate({top: "90px", height: "-=40", fontSize: ".5em", right: "+=400px", backgroundColor: "#ddd"}, 500);
			//if about is chosen
			} else if ($(".menuItem2").hasClass("arf")) {
				$(".menuItem3").animate({top: "350px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#ddd", right: "-=400"}, 1000);
				$(".menuItem2").animate({width: "-=200"});
				$(".menuItem2").animate({top: "140px", height: "-=40", fontSize: ".5em", right: "+=400px", backgroundColor: "#ddd"}, 500);
			}
		}
		Session.set('portfolio', false);
		Session.set('about', false);
		Session.set('contact', true);
		$(".menuItem3").addClass("arf");
		$(".menuItem1").removeClass("arf");
		$(".menuItem2").removeClass("arf");
	},

	'click .homeMenuItem': function(e, template) {
		if ($(".menuItem1").hasClass("arf")) {
			homeAnimation();
			$(".menuItem1").animate({right: "+=400"}, 1000).delay(1000).removeClass("arf");
			$(".menuItem2").delay(300).animate({width: "+=200"}, 1000);
			$(".menuItem3").delay(600).animate({width: "+=200"}, 1000);

			$(".menuItem2").animate({top: "350px", height: "+=40", fontSize: "1em", backgroundColor: "#ddd"}, 500);
			$(".menuItem3").animate({top: "450px", height: "+=40", fontSize: "1em", backgroundColor: "#ddd"}, 500);
			$(".menuText1, .menuText2, .menuText3");
		} else if ($(".menuItem2").hasClass("arf")) {
			homeAnimation();
			$(".menuItem1").delay(300).animate({top: "250px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#ddd"}, 1000);
			$(".menuItem2").animate({right: "+=400"}, 1000).delay(1000);
			$(".menuItem3").delay(600).animate({width: "+=200"}, 1000);

			$(".menuItem2").animate({top: "350px", fontSize: "1em", backgroundColor: "#ddd"}, 500).removeClass("arf");
			$(".menuItem3").animate({top: "450px", height: "+=40", fontSize: "1em", backgroundColor: "#ddd"}, 500);
			$(".menuText1, .menuText2, .menuText3");
		} else if ($(".menuItem3").hasClass("arf")) {
			homeAnimation();
			$(".menuItem1").delay(300).animate({top: "250px", width: "+=200", height: "+=40", fontSize: "1em", backgroundColor: "#ddd"}, 1000);
			$(".menuItem3").animate({right: "+=400"}, 1000).delay(1000);
			$(".menuItem2").delay(600).animate({width: "+=200"}, 1000);

			$(".menuItem3").animate({top: "450px", fontSize: "1em", backgroundColor: "#ddd"}, 500).removeClass("arf");
			$(".menuItem2").animate({top: "350px", height: "+=40", fontSize: "1em", backgroundColor: "#ddd"}, 500);
			$(".menuText1, .menuText2, .menuText3");
		}
	}
});

function homeAnimation() {
	Session.set('portfolio', false);
	Session.set('about', false);
	Session.set('contact', false);
	$(".homeMenuItem").animate({right: "-=210"}, 300);
	$(".headSection").animate({height: "400px"}, 1000);
	$(".headSection > canvas").animate({height: "400px"}, 1000);
};