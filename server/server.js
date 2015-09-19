if (Meteor.isServer) {

    var github = new GitHub({
    	version: "3.0.0" // optional
    });

  	Meteor.methods({
      	getRepos: function() {
      		var reposContent = Async.runSync(function(done) {
	            getRepos = function(error, result) {
	            	console.log(result);

	                if (github.hasNextPage(result)) {
	                	github.getNextPage(result, getRepos);
	                } else {
	                	//callback(error, result);
	                	console.log("inside");
	                	done(null, result);
	                }
	                console.log("hi");
	            }
	            github.repos.getFromUser({user: "seann1"}, getRepos);
        	});
      		return reposContent.result;
      	}
	});
}