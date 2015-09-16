var github = new GitHub({
    version: "3.0.0"     // optional
});

github.repos.getFromUser({
    user: "seann1"
}, function(err, res) {
	for(var i = 0; i < res.length; i++) {
		console.log(JSON.stringify(res[i].name, null, '\t'));
	}
});