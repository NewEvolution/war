define(function(require) {
  var uid = require("uid");
  return {
    Game: function(redDeck, blueDeck) {
      this.player = uid.getUid();
      this.blueDeck = blueDeck;
      this.redDeck = redDeck;
      this.completed = false;
      this.blueScore = 0;
      this.redScore = 0;
    }
  };
});