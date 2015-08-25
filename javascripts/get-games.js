define(function(require) {
  var uid = require("uid");
  var gameRef = require("gameref");
  var currentPlayer = uid.getUid();
  return function(cardbaseRef) {
    cardbaseRef.child("games").orderByChild("player").equalTo(currentPlayer).once("value", function(snapshot) {
      var gamesObj = snapshot.val();
      var unfinishedGamesObj = {};
      for(var uuid in gamesObj) {
        if(!gamesObj[uuid].completed) {
          unfinishedGamesObj[uuid] = gamesObj[uuid];
        }
      }
      console.log("unfinishedGamesObj", unfinishedGamesObj);
    });
  };
});
