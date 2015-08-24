define(function(require) {
  var gameRef = null;
  return {
    getGameRef: function() {
      return gameRef;
    },
    setGameRef: function(newRef) {
      gameRef = newRef;
    }
  };
});