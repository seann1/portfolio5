Template.about.onRendered(function() {
	Meteor.call("getRepos", function(error,result){
    	Session.set("repos", result);
    });
});

Template.about.helpers({
	'allRepos': function() {
		console.log(_.flatten(Session.get("repos"), true));
		//return Session.get("repos");
		return _.flatten(Session.get("repos"), true);
	}
});