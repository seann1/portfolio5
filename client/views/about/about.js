Meteor.startup(function() {
	Meteor.call("setupGit", function(error, result) {
		Session.set("repos", result.repos);
		Session.set("commits", result.events);
		Session.set("reposLoaded", true);
	});

	function start() {
	    function displayLoop() {
	    	var currentRepo = _.sample(Session.get("repos")),
	    	currentCreatedAt = "Created On " + moment(currentRepo.created_at, moment.ISO_8601).format("M-D-YYYY"),
	    	currentUpdatedAt = "Modified On " + moment(currentRepo.updated_at, moment.ISO_8601).format("M-D-YYYY"),
	    	currentName = currentRepo.name;

	    	if (currentName.length > 15) {
	    		$(".repoNames").css("font-size", "2.2em");
	    	} else {
	    		$(".repoNames").css("font-size", "3.2em");
	    	}

    		_.map(currentName, function(letter) {
	    		$(".repoNames").append("<span class='animateLetter'>"+letter+"</span>").hide().fadeIn(500);
	    	});
	    	_.map(currentCreatedAt, function(letter) {
	    		$(".repoCreatedAt").append("<span class='animateLetter'>"+letter+"</span>").hide().fadeIn(500);
	    	});
	    	_.map(currentUpdatedAt, function(letter) {
	    		$(".repoUpdatedAt").append("<span class='animateLetter'>"+letter+"</span>").hide().fadeIn(500);
	    	});


			setTimeout(function() {
				$(".repoNames").find('.animateLetter').each(function(index, value) {
					$(value).fadeOut(_.random(0, 500));
				});
				$(".createdAtWord").find('.animateLetter').each(function(index, value) {
					$(value).fadeOut(_.random(0, 500));
				});
				$(".updatedAtWord").find('.animateLetter').each(function(index, value) {
					$(value).fadeOut(_.random(0, 500));
				});
				$(".repoCreatedAt").find('.animateLetter').each(function(index, value) {
					$(value).fadeOut(_.random(0, 500));
				});
				$(".repoUpdatedAt").find('.animateLetter').each(function(index, value) {
					$(value).fadeOut(_.random(0, 500));
				});
		    }, 4000);
	    };

	    displayLoop();
	    setInterval(function() {
	    	displayLoop();
	    }, 4500);
	};

    Tracker.autorun(function() {
		if ((Session.get("repos") != undefined) && (Session.get("commits") != undefined)) {
	    	Session.set("reposLoaded", true);
	    	setTimeout(function() {
	    		start();
	    	}, 200);
	    }
	});
});

Template.about.helpers({
	'reposLoaded': function() {
		if (Session.get("reposLoaded") === true) {
			return true
		}
	},
	'repoNumber': function() {
		return Session.get("repos").length + 1;
	},
	'recentCommitMessage': function() {
		return Session.get("commits").unsorted[0].payload.commits[0].message;
	},
	'recentCommitRepo': function() {
		return Session.get("commits").unsorted[0].repo.name;
	},
	'recentCommitDate': function() {
		return moment(Session.get("commits").unsorted[0].created_at, moment.ISO_8601).format("MMMM Do YYYY");
	},
	'githubAvatarLink': function() {
		return Session.get("commits").unsorted[0].actor.avatar_url;
	}
});