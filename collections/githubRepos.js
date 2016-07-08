GithubRepos = new Meteor.Collection('githubRepos', {});

Meteor.methods({
	setupGitRepos: function() {
        var repos = GithubRepos.find({}).fetch();

        return repos; 
    }
});