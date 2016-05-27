define(function(require) {
  var Q = require("q");
  var $ = require("jquery");
  var gameRef = require("gameref");
  return function(cardArr, color) {
    var scoreToAdd = cardArr.length;
    var theGame = gameRef.getGameRef();
    theGame.once("value", function(snapshot) {
        var theRedScore = snapshot.child("redScore").val();
        var theBlueScore = snapshot.child("blueScore").val();
      if(color === "red") {
        theRedScore += scoreToAdd;
        theGame.update({redScore: theRedScore});
      } else if(color === "blue") {
        theBlueScore += scoreToAdd;
        theGame.update({blueScore: theBlueScore});
      } else if (color === "both"){
        theRedScore += scoreToAdd / 2;
        theBlueScore += scoreToAdd / 2;
        theGame.update({redScore: theRedScore});
        theGame.update({blueScore: theBlueScore});
      } else {
        theGame.update({completed: true});
      }
    });
  };
});
