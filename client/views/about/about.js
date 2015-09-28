Template.about.onRendered(function() {
	Meteor.call("getRepos", function(error,result){
    	Session.set("repos", _.flatten(result, true));
    });

    function start() {
    	var counter = 2000;
		var myFunction = function() {
		    //clearInterval(interval);
		    var currentRepo = _.sample(Session.get("repos")),
		    currentCreatedAt = moment(currentRepo.created_at, moment.ISO_8601),
		    currentName = currentRepo.name;
		    if (counter < 2000) {
		    	$(".repoNames").empty();
		    	$(".repoCreatedAt").empty();
		    	_.map(currentName, function(letter) {
		    		$(".repoNames").append("<span>"+letter+"</span>").hide().fadeIn(counter/2);
		    	});
		    	_.map(currentCreatedAt, function(letter) {
		    		$(".repoCreatedAt").append("<span>"+letter+"</span>").hide().fadeIn(counter/2);
		    	});
		    } else {
		    	$(".repoNames").find('span').each(function(index, value) {
    				$(value).fadeOut(_.random(0, 300));
				});
				$(".repoCreatedAt").find('span').each(function(index, value) {
    				$(value).fadeOut(_.random(0, 300));
				});
		    	setTimeout(function(){
			    	_.map(currentName, function(letter) {
			    		$(".repoNames").append("<span>"+letter+"</span>").hide().fadeIn(counter/4);
			    	});
			    	_.map(currentCreatedAt, function(letter) {
			    		$(".repoCreatedAt").append("<span>"+letter+"</span>").hide().fadeIn(counter/4);
			    	});
		    	}, 200);
		    }
		    counter += 200;
		    interval = setTimeout(myFunction, counter);
		}
		var interval = setTimeout(myFunction, counter);

    };

    this.autorun(function() {
		if (Session.get("repos") != undefined) {
	    	console.log(Session.get("repos"));
	    	Session.set("reposLoaded", true);
	    	start();
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