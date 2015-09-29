Template.about.onRendered(function() {
	if (Session.get("aboutLoaded") != true) {
		Meteor.call("getRepos", function(error,result){
	    	Session.set("repos", _.flatten(result, true));
	    });
	    Meteor.call("getEvents", function(error, result){
	    	Session.set("commits", result);
	 		console.log(result);
	    });

	    function start() {

		    function displayLoop() {
		    	var currentRepo = _.sample(Session.get("repos")),
		    	currentCreatedAt = "Created On " + moment(currentRepo.created_at, moment.ISO_8601).format("MMMM Do, YYYY"),
		    	currentName = currentRepo.name;

		    	if (currentName.length > 21) {
		    		$(".repoNames").css("font-size", "1.5em");
		    	} else {
		    		$(".repoNames").css("font-size", "2em");
		    	}

	    		_.map(currentName, function(letter) {
		    		$(".repoNames").append("<span class='animateLetter'>"+letter+"</span>").hide().fadeIn(500);
		    	});
		    	_.map(currentCreatedAt, function(letter) {
		    		$(".repoCreatedAt").append("<span class='animateLetter'>"+letter+"</span>").hide().fadeIn(500);
		    	});


				setTimeout(function() {
					$(".repoNames").find('.animateLetter').each(function(index, value) {
						$(value).fadeOut(_.random(0, 500));
					});
					$(".repoCreatedAt").find('.animateLetter').each(function(index, value) {
						$(value).fadeOut(_.random(0, 500));
					});
			    }, 4000);
		    };

		    displayLoop();
		    setInterval(function() {
		    	displayLoop();
		    }, 4500);
		};

	    this.autorun(function() {
			if ((Session.get("repos") != undefined) && (Session.get("commits") != undefined)) {
		    	console.log(Session.get("repos"));
		    	Session.set("reposLoaded", true);
		    	setTimeout(function() {
		    		start();
		    	}, 200);
		    }
		});
		Session.set("aboutLoaded", true);
	}
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
		return Session.get("commits")[0].payload.commits[0].message;
	},
	'recentCommitRepo': function() {
		return Session.get("commits")[0].repo.name;
	},
	'recentCommitDate': function() {
		return moment(Session.get("commits")[0].created_at, moment.ISO_8601).format("MMMM Do YYYY");
	},
	'githubAvatarLink': function() {
		return Session.get("commits")[0].actor.avatar_url;
	}
});