RecentCommit = new Meteor.Collection('RecentCommit', {});

Meteor.methods({
	setupRecentCommit: function() {
		var recentCommit = RecentCommit.find().fetch();
		return recentCommit[0];
	}
});