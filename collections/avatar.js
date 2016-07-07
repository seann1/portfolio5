Avatar = new Meteor.Collection('Avatar', {});

Meteor.methods({
	setupAvatar: function() {
		var avatar = Avatar.find({}).fetch();
		return avatar.avatar;
	}
});