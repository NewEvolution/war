define(function(require) {
  var Q = require("q");
  var $ = require("jquery");
  var faces = require("no-faces");
  var card = require("draw-card");
  var gameRef = require("gameref");

  $("#draw").click(function(e) {
    var redDeck;
    var blueDeck;
    var deferred = Q.defer();
    var cardsPromise = deferred.promise;
    var theGame = gameRef.getGameRef();
    theGame.once("value", function(snapshot) {
      var cards = {};
      cards.redDeck = snapshot.child("redDeck").val();
      cards.blueDeck = snapshot.child("blueDeck").val();
      deferred.resolve(cards);
    });
    cardsPromise.then(function(cards) {
      var redCardPromise = card.draw(cards.redDeck);
      var blueCardPromise = card.draw(cards.blueDeck);
      redCardPromise.then(function(redCard) {
        blueCardPromise.then(function(blueCard) {
          var bothCards = {};
          bothCards.redCard = redCard;
          bothCards.blueCard = blueCard;
          faces.deface(bothCards);
        });
      });
    });
  });

});