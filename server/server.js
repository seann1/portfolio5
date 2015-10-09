if (Meteor.isServer) {
    var github = new GitHub({
      version: "3.0.0" // optional
    });

  github.authenticate({
      type: "basic",
      username: Meteor.settings.gitUserName,
      password: Meteor.settings.gitPassword
  });
}

Meteor.methods({
      getRepos: function() {
        var reposContent = Async.runSync(function(done) {
          var allRepos = [];
            var getRepos = function(error, result) {
              allRepos.push(result);


                if (github.hasNextPage(result)) {
                  github.getNextPage(result, getRepos);
                } else {
                  done(null, allRepos);
                }
            }
            github.repos.getFromUser({user: "seann1"}, getRepos);
        });
        GithubRepos.insert({git: _.flatten(reposContent.result, true), date: new Date()});
        return _.flatten(reposContent.result, true);
      },
      getEvents: function() {
        var userEvents = Async.runSync(function(done) {
              var allEvents = [];
          var getEvents = function(error, result) {
            if (result) {
                      //console.log(result);
                      allEvents.push(result);
              if (github.hasNextPage(result)) {
                          github.getNextPage(result, getEvents);
                      } else {
                          done(null, allEvents);
                      }
            } else if (error) {
                      console.log(error);
                  }
          }
          github.events.getFromUser({user: "seann1"}, getEvents);

        });

          function sortCommits(data) {
              var commitHistory = [];
              _.each(data, function(commitObject) {
                  var commitNum;

                  if (commitObject.payload.commits === undefined) {
                      commitNum = 0
                  } else {
                      commitNum = commitObject.payload.commits.length
                  }

                  if (commitHistory.length === 0) {
                      commitHistory.push({"date": moment(commitObject.created_at, moment.ISO_8601).format("MM-DD-YYYY"), "number": commitNum})
                  } else {
                      var currentDateAddOne = moment(commitObject.created_at, moment.ISO_8601).add('days', 1).format("MM-DD-YYYY");
                      var currentDateSubtractOne = moment(commitHistory[commitHistory.length-1].date, "MM-DD-YYYY").subtract('days', 1).format("MM-DD-YYYY");
                      var endOfCHistory = commitHistory[commitHistory.length-1];

                      if (moment(commitObject.created_at, moment.ISO_8601).format("MM-DD-YYYY") === endOfCHistory.date) {
                          //console.log("same");
                          endOfCHistory.number += commitNum;
                      } else {
                          commitHistory.push({"date": moment(commitObject.created_at, moment.ISO_8601).format("MM-DD-YYYY"), "number": commitNum});
                      }
                  }
              });

              return commitHistory;
          }

        var eventResult = {unsorted: _.flatten(userEvents.result, true), sorted: sortCommits(_.flatten(userEvents.result, true)), date: new Date()};
        GithubEvents.insert(eventResult);
        return eventResult;
      }
});