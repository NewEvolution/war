define(function(require) {
  var uid = require("uid");
  var gameRef = require("gameref");
  var currentPlayer = uid.getUid();
  return function(cardbaseRef) {
    cardbaseRef.child("games").orderByChild("player").equalTo(currentPlayer).once("value", function(snapshot) {
      console.log(snapshot.val());
    });
  };
});
