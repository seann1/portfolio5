Template.about.onRendered(function() {
	Meteor.call("getRepos", function(error,result){
    	Session.set("repos", _.flatten(result, true));
    });

    function start() {
    	setInterval(function(){
    		$(".repoNames").empty().append(_.sample(Session.get("repos")).name);
    	}, 500);
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
	}
});