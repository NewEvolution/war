define(function(require) {
  var uid = require("uid");
  var gameRef = require("gameref");
  var templates = require("templates");
  var currentPlayer = uid.getUid();
  return function(cardbaseRef, target) {
    cardbaseRef.child("games").orderByChild("player").equalTo(currentPlayer).once("value", function(snapshot) {
      var gamesObj = snapshot.val();
      var unfinishedGamesObj = {};
      var finishedGamesObj = {};
      for(var uuid in gamesObj) {
        if(gamesObj[uuid].completed) {
          finishedGamesObj[uuid] = gamesObj[uuid];
        } else {
          unfinishedGamesObj[uuid] = gamesObj[uuid];
        }
      }
      console.log("unfinishedGamesObj", unfinishedGamesObj);
      console.log("finishedGamesObj", finishedGamesObj);
      if(target === "resume") {
        $("#resume-modal-content").html(templates.resume(unfinishedGamesObj));
      }
    });
  };
});
