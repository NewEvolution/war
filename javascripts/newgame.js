define(function(require) {
  var $ = require("jquery");
  var card = require("draw-card");
  var gameRef = require("gameref");
  var drawButton = require("draw");
  var Game = require("game-maker");
  var newDeck = require("deck-getter");
  var getGames = require("get-games");
  var fireconf = require("fireconf");

  var cardbaseRef = fireconf.database().ref();

  $("#newgame").click(function(e) {
    $(".red-card").addClass("hidden");
    $(".blue-card").addClass("hidden");
    $("#win-announcement, #battle-result").addClass("invisible");
    var blueDeck = newDeck();
    var redDeck = newDeck();
    var thisGame = {};
    var newGame = {};
    blueDeck.then(function(data) {
      newGame.blueDeck = data.deck_id;
      redDeck.then(function(data) {
        newGame.redDeck = data.deck_id;
        thisGame = new Game(newGame.redDeck, newGame.blueDeck);
        var theGame = cardbaseRef.child("games").push(thisGame);
        gameRef.setGameRef(theGame);
        $("#newgame, #resume, #stats, #logout").addClass("hidden");
        $("#redCard-score, #blueCard-score").addClass("invisible");
        $("#redCard-card").attr({src: "images/red-back.png"});
        $("#blueCard-card").attr({src: "images/blue-back.png"});
        $("#draw").html("DRAW!");
        $("#draw").removeClass("hidden");
        $("#wartext").removeClass("invisible");
      });
    });
  });

  $("#resume").click(function(e) {
    getGames(cardbaseRef, "resume");
  });

  $("#stats").click(function(e) {
    getGames(cardbaseRef, "stats");
  });
});
