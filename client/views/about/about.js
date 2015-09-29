Template.about.onRendered(function() {
	Meteor.call("getRepos", function(error,result){
    	Session.set("repos", _.flatten(result, true));
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
	    		$(".repoNames").append("<span>"+letter+"</span>").hide().fadeIn(500);
	    	});
	    	_.map(currentCreatedAt, function(letter) {
	    		$(".repoCreatedAt").append("<span>"+letter+"</span>").hide().fadeIn(500);
	    	});


			setTimeout(function() {
				$(".repoNames").find('span').each(function(index, value) {
					$(value).fadeOut(_.random(0, 500));
				});
				$(".repoCreatedAt").find('span').each(function(index, value) {
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
		if (Session.get("repos") != undefined) {
	    	console.log(Session.get("repos"));
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
	}
});