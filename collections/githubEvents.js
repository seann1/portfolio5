GithubEvents = new Meteor.Collection('githubEvents', {});

Meteor.methods({
	setupGitEvents: function() {
        //var countRepos = GithubRepos.find().count();
        var countEvents = GithubEvents.find().count();
        var repos = GithubRepos.find({}, {sort: {date: -1}}).fetch();
        var events = GithubEvents.find({}, {sort: {date: -1}}).fetch();
        if (repos != undefined && events != undefined) {
            var currentGitObject = {repos: repos.git, events: events};
            return currentGitObject; 
        }

    }
});