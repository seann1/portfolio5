Template.reset.events({
	'click .apiButton': function(e, template) {
		Meteor.call("getRepos", function(error,result){
	    	Session.set("repos", result.git);
	    	console.log(Session.get("repos"));
	    });
	    Meteor.call("getEvents", function(error, result){
	    	Session.set("commits", result);
	    });
	}
})