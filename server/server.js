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

    function getCommits(repoName) {
      var url = "https://github.com/seann1/" + repoName;
      var result = Meteor.http.get(url);
      var $ = cheerio.load(result.content);
      var commits = $('.commits span').text();
      return commits;
    }

    GithubRepos.remove({});
    PieChartData.remove({});

    var currentRepos = [];
    for(var i = 0; i < _.flatten(reposResult).length; i++)
    { 
      var repo = _.flatten(reposResult)[i];
      var commits = getCommits(repo.name).toString().replace(/\D/g,'');
      var repoObject = {name: repo.name, 
                        url: repo.html_url, 
                        updated_at: repo.updated_at, 
                        description: repo.description,
                        created_at: repo.created_at,
                        commits: commits
                      };
      
      currentRepos.push(repoObject);
      GithubRepos.insert({name: repo.name, 
                          url: repo.html_url, 
                          updated_at: repo.updated_at, 
                          description: repo.description,
                          created_at: repo.created_at,
                          commits: commits
                        });
      PieChartData.insert({name: repo.name, commits: Number(commits)});
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

    //saving most recent commit
    var recentCommit = eventsResult[eventsResult.length-1];
    RecentCommit.remove({});
    RecentCommit.insert(recentCommit);
    // end saving most recent commit

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

      return commitHistory;
    };

    // _.each(eventsResult, function(i) {
    //   if (i.payload.commits === undefined) {
    //     i.payload.commits = [];
    //   }
    //   console.log({date: i.created_at, number: i.payload.commits.length});
    // });

    sortCommits(eventsResult);
    GithubEvents.remove({});
    GithubEvents.insert({commits: sortCommits(eventsResult)});

    //Avatar
    Avatar.remove({});
    Avatar.insert({avatar: eventsResult[eventsResult.length-1].actor.avatar_url});
    return eventsResult;
  }
});