if (Meteor.isServer) {

    var github = new GitHub({
    	version: "3.0.0" // optional
    });

	github.authenticate({
	    type: "basic",
	    username: Meteor.settings.gitUserName,
	    password: Meteor.settings.gitPassword
	});

  	Meteor.methods({
      	getRepos: function() {
      		var reposContent = Async.runSync(function(done) {
      			var allRepos = [];
	            var getRepos = function(error, result) {
	            	//console.log(result);
	            	allRepos.push(result);


	                if (github.hasNextPage(result)) {
	                	github.getNextPage(result, getRepos);
	                } else {
	                	done(null, allRepos);
	                }
	            }
	            github.repos.getFromUser({user: "seann1"}, getRepos);
        	});
      		return reposContent.result;
      	},
      	getEvents: function() {
      		var userEvents = Async.runSync(function(done) {
            var allEvents = [];
      			var getEvents = function(error, result) {
      				if (result) {
                allEvents.push(result);
      					if (github.hasNextPage(result)) {
                  github.getNextPage(result, getEvents);
                } else {
                  done(null, allEvents);
                }
      				}
      			}
      			github.events.getFromUser({user: "seann1"}, getEvents);

      		});

          function sortCommits(data) {
            _.each(data, function(commitObject) {
              
            });

          }
      		return {unsorted: userEvents.result, sorted: sortCommits(_.flatten(userEvents.result, true))};
      	}
    });
}