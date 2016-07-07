GithubRepos = new Meteor.Collection('githubRepos', {});

Meteor.methods({
	setupGitRepos: function() {
        var countRepos = GithubRepos.find({});

        if (countRepos > 1) {
            var repos = GithubRepos.find({}, {sort: {date: -1}}).fetch();

            var currentGitObject = repos;

            return currentGitObject; 
        }

    }
});