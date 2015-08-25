define(function(require) {
  var Q = require("q");
  var $ = require("jquery");
  var gameRef = require("gameref");
  return {
    addScore: function(cardArr, color) {
      var scoreToAdd = cardArr.length;
      var theGame = gameRef.getGameRef();
      theGame.once("value", function(snapshot) {
        var theScore;
        var newScore;
        if(color === "red") {
          theScore = snapshot.child("redScore").val();
          newScore = theScore + scoreToAdd;
          theGame.update({redScore: newScore});
        }
        if(color === "blue") {
          theScore = snapshot.child("blueScore").val();
          newScore = theScore + scoreToAdd;
          theGame.update({blueScore: newScore});
        }
      });
    }
  };
});