if (Meteor.isServer) {

	var github = new GitHub({
	    version: "3.0.0"     // optional
	});

	Meteor.methods({
		getRepos: function() {
			var reposContent = Async.runSync(function(done){
	           	github.repos.getFromUser({user: "seann1", page[s]: 'all'},function(err, res){
	            	done(null, res) ;
	           	}); 
        	});
        	return reposContent;
		}
	});
}