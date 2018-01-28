// ===============================================================================
// LOAD DATA
// ===============================================================================
var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  
  //API get requests
  //------------------------------------------------------------------------------
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  
  //API Post 
  //-------------------------------------------------------------------------------
  app.post("/api/friends", function(req, res) {

    var bestMatch = {
        name: "",
        photo: "",
        maxDiff: 1000
    };

    var userInfo = req.body;

    // console.log(userInfo);
    // console.log(userInfo.name);
    // console.log(userInfo.photo);
    // console.log(userInfo.scores);

    var difference = 0;

    for(var i=0; i < friends.length; i++){

      difference = 0;

      for (var j=0; j < friends[i].scores.length; j++) {

        difference += Math.abs(parseInt(userInfo.scores[j]) - parseInt(friends[i].scores[j]));

        if (difference <= bestMatch.maxDiff) {
            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.maxDiff = difference;
        }
      }   

    }

    friends.push(userInfo);

    res.json(bestMatch);
     
  });

}

  
  
