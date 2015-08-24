define(function(require) {
  var uid = require("uid");
  return {
    Game: function(redDeck, blueDeck) {
      this.player = uid.getUid();
      this.redDeck = redDeck;
      this.blueDeck = blueDeck;
      this.completed = false;
    }
  };
});