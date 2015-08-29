Meteor.startup(function () {
    var github = new GitHub({
	    version: "3.0.0", // required
	    timeout: 5000     // optional
	});

	var result = github.user.getFollowingFromUser({
    	user: "seann1"
	});

	console.log(JSON.stringify(result));
 });