define(function(require) {
  var Q = require("q");
  var $ = require("jquery");
  var faces = require("no-faces");
  var card = require("draw-card");
  var gameRef = require("gameref");

  $("#draw").click(function(e) {
    $("#wartext").addClass("invisible");
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
      var numToDraw;
      if($("#draw").html() === "DRAW!") {
        numToDraw = 1;
      } else {
        numToDraw = 4;
      }
      var redCardPromise = card.draw(cards.redDeck, numToDraw);
      var blueCardPromise = card.draw(cards.blueDeck, numToDraw);
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