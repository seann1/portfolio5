Template.reset.events({
	'click .apiButton': function(e, template) {
		Meteor.call("getRepos", function(error,result){
	    	//Session.set("repos", result);
	    });

	},
	'click .eventButton': function(e, template) {
		Meteor.call("getEvents", function(error,result){
	    	//Session.set("events", result);
	    });
	},
	'click .commitTestButton': function(e, template) {
		Meteor.call("testCommits", function(error,result){
	    	//Session.set("events", result);
	    });
	},
});