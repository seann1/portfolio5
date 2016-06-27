Template.reset.events({
	'click .apiButton': function(e, template) {
		Meteor.call("getRepos", function(error,result){
	    	Session.set("repos", result);
	    });
	    Meteor.call("getEvents", function(error, result){
	    	Session.set("commits", result);
	    });
	}
});