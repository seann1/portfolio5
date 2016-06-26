GithubRepos = new Meteor.Collection('githubRepos', {});

Meteor.methods({
	setupGitRepos: function() {
        var countRepos = GithubRepos.find({});
        //console.log(countRepos);
        if (countRepos > 1) {
            var repos = GithubRepos.find({}, {sort: {date: -1}}).fetch();

            var currentGitObject = repos;
            //console.log(currentGitObject);
            return currentGitObject; 
        }

    },
    cleanupGitRepos: function() {
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