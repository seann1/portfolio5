GithubEvents = new Meteor.Collection('githubEvents', {});

Meteor.methods({
	setupGitEvents: function() {
        var events = GithubEvents.find().fetch();
        
        return events[0];
    }
});