GithubRepos = new Meteor.Collection('githubRepos', {});

Meteor.methods({
	setupGit: function() {

        var repos = GithubRepos.find({}, {sort: {date: -1}}).fetch();
        var events = GithubEvents.find({}, {sort: {date: -1}}).fetch();

        _.map(repos.splice(0,1), function(value) {
        	GithubRepos.remove({ _id : value._id });
        });
        _.map(events.splice(0,1), function(value) {
        	GithubEvents.remove({ _id : value._id });
        });

        console.log(repos)

     }
})