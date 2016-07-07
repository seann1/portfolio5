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
      var repoObject = {name: repo.name, 
                        url: repo.html_url, 
                        updated: repo.updated_at, 
                        description: repo.description
                      };
      
      currentRepos.push(repoObject);

      GithubRepos.insert({name: repo.name, 
                          url: repo.html_url, 
                          updated: repo.updated_at, 
                          description: repo.description
                        });
    }
    return currentRepos;
  },
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
    var eventsResult = _.flatten(userEvents()).reverse();

    function sortCommits(data) {
      var commitHistory = [];
      for (i=0;i<=90;i++) {
        commitHistory.push({ date: moment().utc().subtract(i,"days").format("MM-DD-YYYY"), number: 0 });
      }
      _.each(data, function(i) {
        _.each(commitHistory, function(j) {
          if (moment(i.created_at, moment.ISO_8601).utc().format("MM-DD-YYYY") === j.date) {
            if (i.payload.commits != undefined) {
              j.number += i.payload.commits.length
            }
          };
        });
      });
      console.log(commitHistory);
      return commitHistory;
    };
    
    _.each(eventsResult, function(i) {
      if (i.payload.commits === undefined) {
        i.payload.commits = [];
      }
      console.log({date: i.created_at, number: i.payload.commits.length});
    });

    sortCommits(eventsResult);
    GithubEvents.remove({});
    GithubEvents.insert(eventsResult);
    return eventsResult;
  }
});

//_.each(data, function(commitObject) {
  //vars
    //var commitNum,
    //commitObjDate = moment(commitObject.created_at, moment.ISO_8601).format("MM-DD-YYYY");
    //console.log(commitObjDate);
    // if (commitObject.payload.commits === undefined) {
    //     commitNum = 0
    // } else {
    //     commitNum = commitObject.payload.commits.length;
    // }

    // if (commitHistory.length === 0) {
    //     commitHistory.push({"date": commitObjDate, "number": commitNum})
    // } else {
    //     var currentDateAddOne = moment(commitObject.created_at, moment.ISO_8601)
    //                             .add('days', 1)
    //                             .format("MM-DD-YYYY");

    //     var currentDateSubtractOne = moment(commitHistory[commitHistory.length-1].date, "MM-DD-YYYY")
    //                                 .subtract('days', 1)
    //                                 .format("MM-DD-YYYY");

    //     var endOfCHistory = commitHistory[commitHistory.length-1];

    //     if (commitObjDate === endOfCHistory.date) {
    //         endOfCHistory.number += commitNum;
    //     } else {
    //         commitHistory.push({"date": commitObjDate, "number": commitNum});
    //     }
    // }
//});