GithubEvents = new Meteor.Collection('githubEvents', {});

Meteor.methods({
	setupGitEvents: function() {
        //var countRepos = GithubRepos.find().count();
        var countEvents = GithubEvents.find().count();
        //var repos = GithubRepos.find({}, {sort: {date: -1}}).fetch();
        var events = GithubEvents.find({}).fetch();
        if (events != undefined) {
            var currentGitObject = {events: events};
            return currentGitObject; 
        }

    }
});