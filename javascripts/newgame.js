define(function(require) {
  var Q = require("q");
  var $ = require("jquery");
  var card = require("draw-card");
  var gameRef = require("gameref");
  var drawButton = require("draw");
  var newDeck = require("deck-getter");
  var getGames = require("get-games");
  var Game = require("game-maker");
  var cardbaseRef = new Firebase("https://nss-card-war.firebaseio.com/");
  
  $("#newgame").click(function(e) {
    $(".red-card").addClass("hidden");
    $(".blue-card").addClass("hidden");
    $("#win-announcement").addClass("invisible");
    var blueDeck = newDeck();
    var redDeck = newDeck();
    var thisGame = {};
    var newGame = {};
    blueDeck.then(function(data) {
      newGame.blueDeck = data.deck_id;
      redDeck.then(function(data) {
        newGame.redDeck = data.deck_id;
        thisGame = new Game(newGame.redDeck, newGame.blueDeck);
        console.log("thisGame", thisGame);
        var theGame = cardbaseRef.child("games").push(thisGame);
        gameRef.setGameRef(theGame);
        $("#newgame, #resume, #stats").addClass("hidden");
        $("#draw").removeClass("hidden");
      });
    });
  });

  $("#resume").click(function(e) {
    getGames(cardbaseRef);
  });
});