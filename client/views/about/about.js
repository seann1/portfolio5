Template.about.onRendered(function() {
	Meteor.call("getRepos", function(error,result){
    	Session.set("repos", _.flatten(result, true));
    });

    function start() {
    	var counter = 30;
		var myFunction = function() {
		    //clearInterval(interval);
		    var currentName = _.sample(Session.get("repos")).name;
		    if (counter < 1000) {
		    	$(".repoNames").empty();
		    	_.map(currentName, function(letter) {
		    		$(".repoNames").append("<span>"+letter+"</span>").hide().fadeIn(counter/1.7);
		    	});
		    } else {
		    	$(".repoNames").find('span').each(function(index, value) {
    				$(value).fadeOut(_.random(0, 1000));
				});
		    	setTimeout(function(){
			    	_.map(currentName, function(letter) {
			    		$(".repoNames").append("<span>"+letter+"</span>").hide().fadeIn(counter/2);
			    	});
		    	}, 500);
		    }
		    counter += 30;
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