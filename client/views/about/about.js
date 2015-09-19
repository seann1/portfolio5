Template.about.onRendered(function() {
	Meteor.call("getRepos", function(e,r){
    	Session.set("repos", r.result);
    });
});

Template.about.helpers({
	'allRepos': function() {
		console.log(Session.get("repos"));
		//return Session.get("repos");
		return Session.get("repos");
	}
});