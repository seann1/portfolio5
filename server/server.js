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
    function makeGitHubApiCall(callback) {
        var allRepos = [];
        var getRepos = function(error, result) {
            allRepos.push(result);
            if (github.hasNextPage(result)) {
                github.getNextPage(result, getRepos);
            } else {
                return callback(null, allRepos);
            }
        }
        github.repos.getFromUser({user: "seann1"}, getRepos);
    };


    var reposContent = Meteor.wrapAsync(makeGitHubApiCall);
    var reposResult = reposContent();
    GithubRepos.remove({});

    console.log(JSON.stringify(_.flatten(reposResult)[0]));

    var currentRepos = [];
    for(var i = 0; i < _.flatten(reposResult).length; i++)
    { 
      console.log(_.flatten(reposResult)[i].name);
      var repo = _.flatten(reposResult)[i];
      var repoObject = {name: repo.name, url: repo.html_url, updated: repo.updated_at, description: repo.description};
      currentRepos.push(repoObject);
      GithubRepos.insert({name: repo.name, url: repo.html_url, updated: repo.updated_at, description: repo.description});
    }
    return currentRepos;
  },
  // getRepos: function() {
  //   //make API call
  //   function makeGitHubApiCall(callback) {
  //       var allRepos = [];
  //       var getRepos = function(error, result) {
  //           allRepos.push(result);
  //           if (github.hasNextPage(result)) {
  //               github.getNextPage(result, getRepos);
  //           } else {
  //               return callback(null, allRepos);
  //           }
  //       }
  //       github.repos.getFromUser({user: "seann1"}, function(err,res) {

  //         for(var i = 0; i < res[0].length; i++)
  //         { 
  //           console.log({git: _.flatten(reposResult[0])[i].name});
  //         }
  //       });
  //       //console.log(gitResult);
  //   };

  //   github.repos.getFromUser({user: "seann1"}, function(err,res) {
  //     var counter = 0;
  //     var allRepos = [];
      
  //     for(var i = 0; i < res.length; i++)
  //         { 
  //           counter += 1;
  //           console.log(res[i].name);
  //         }
  //     if (github.hasNextPage(res)) {
  //       github.getNextPage(res, function(err,res) {
  //         for(var i = 0; i < res.length; i++)
  //         { 
  //           counter += 1;
  //           console.log(res[i].name);
  //         }
  //       });
  //     };
  //     github.getLastPage(res, function(err,res) {
  //       for(var i = 0; i < res.length; i++)
  //       { 
  //         counter += 1;
  //         console.log(res[i].name);
  //       }
  //     });
  //     console.log(counter);
  //   });
    //var reposContent = Meteor.wrapAsync(makeGitHubApiCall);
    //var reposResult = reposContent();
    //console.log("hi");
    //console.log(reposResult[0]);
    //GithubRepos.remove({});
    //var currentRepos = [];
    // for(var i = 0; i < reposResult[0].length; i++)
    // { 
    //   currentRepos.push({git: _.flatten(reposResult[0])[i].name, date: new Date()});
    //   GithubRepos.insert({git: _.flatten(reposResult[0])[i].name, date: new Date()});
    // }
    // return _.flatten(reposResult[0], true);
  getEvents: function() {

    function makeGithubEventCall(callback) {
        var allEvents = [];
        var getEvents = function(error, result) {
            allEvents.push(result);
            if (github.hasNextPage(result)) {
                github.getNextPage(result, getEvents);
            } else {
                return callback(null, allEvents);
            }
        }
        github.events.getFromUser({user: "seann1"}, getEvents);
    };

    var userEvents = Meteor.wrapAsync(makeGithubEventCall);
    var eventsResult = userEvents();

      function sortCommits(data) {
          var commitHistory = [];
          _.each(data, function(commitObject) {
              var commitNum;

              if (commitObject.payload.commits === undefined) {
                  commitNum = 0
              } else {
                  commitNum = commitObject.payload.commits.length;
              }

              if (commitHistory.length === 0) {
                  commitHistory.push({"date": moment(commitObject.created_at, moment.ISO_8601).format("MM-DD-YYYY"), "number": commitNum})
              } else {
                  var currentDateAddOne = moment(commitObject.created_at, moment.ISO_8601)
                                          .add('days', 1)
                                          .format("MM-DD-YYYY");

                  var currentDateSubtractOne = moment(commitHistory[commitHistory.length-1].date, "MM-DD-YYYY")
                                              .subtract('days', 1)
                                              .format("MM-DD-YYYY");

                  var endOfCHistory = commitHistory[commitHistory.length-1];

                  if (moment(commitObject.created_at, moment.ISO_8601).format("MM-DD-YYYY") === endOfCHistory.date) {
                      endOfCHistory.number += commitNum;
                  } else {
                      commitHistory.push({"date": moment(commitObject.created_at, moment.ISO_8601).format("MM-DD-YYYY"), "number": commitNum});
                  }
              }
          });

          return commitHistory;
      }

    var eventResult = {unsorted: _.flatten(eventsResult, true), sorted: sortCommits(_.flatten(eventsResult, true)), date: new Date()};
    GithubEvents.remove({});
    GithubEvents.insert(eventResult);
    return eventResult;
  }
});