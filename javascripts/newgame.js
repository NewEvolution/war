define(function(require) {
  var Q = require("q");
  var $ = require("jquery");
  var card = require("draw-card");
  var gameRef = require("gameref");
  var deck = require("deck-getter");
  var gameMaker = require("game-maker");
  var drawButton = require("draw");
  
  $("#newgame").click(function(e) {
    $(".red-card").addClass("hidden");
    $(".blue-card").addClass("hidden");
    var blueDeck = deck.newDeck();
    var redDeck = deck.newDeck();
    var thisGame = {};
    var newGame = {};
    blueDeck.then(function(data) {
      newGame.blueDeck = data.deck_id;
      redDeck.then(function(data) {
        newGame.redDeck = data.deck_id;
        thisGame = new gameMaker.Game(newGame.redDeck, newGame.blueDeck);
        console.log("thisGame", thisGame);
        var cardbaseRef = new Firebase("https://nss-card-war.firebaseio.com/");
        var theGame = cardbaseRef.child("games").push(thisGame);
        gameRef.setGameRef(theGame);
        $("#newgame").addClass("hidden");
        $("#resume").addClass("hidden");
        $("#stats").addClass("hidden");
        $("#draw").removeClass("hidden");
      });
    });
  });

  $("#resume").click(function(e) {

  });
});