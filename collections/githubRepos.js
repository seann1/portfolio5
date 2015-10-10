GithubRepos = new Meteor.Collection('githubRepos', {});

Meteor.methods({
	setupGit: function() {
        //var countRepos = GithubRepos.find().count();
        //var countEvents = GithubEvents.find().count();
        var repos = GithubRepos.find({}, {sort: {date: -1}}).fetch();
        var events = GithubEvents.find({}, {sort: {date: -1}}).fetch();
        if (repos != undefined && events != undefined) {
            var currentGitObject = {repos: repos.git, events: events};
            return currentGitObject; 
        }

    },
    cleanupGit: function() {
        // if (GithubEvents.find().count() > 2) {
        //     _.map(events.splice(0,1), function(value) {
        //         GithubEvents.remove({ _id : value._id });
        //     });
        // }

        // if (GithubRepos.find().count() > 2) {
        //     _.map(events.splice(0,1), function(value) {
        //         GithubRepos.remove({ _id : value._id });
        //     });
        // }
    }
});