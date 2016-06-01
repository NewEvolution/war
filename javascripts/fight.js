define(function(require) {
  var wonCards = [];
  var $ = require("jquery");
  var gameRef = require("gameref");
  var addScore = require("score-adder");
  return function(bothCards) {
    var theGame = gameRef.getGameRef();
    var redVal;
    var blueVal;
    var qualifier;
    var winQualifier;
    for(var key in bothCards) {
      var cardMaxIndex = bothCards[key].cards.length - 1;
      var cardImageURL = bothCards[key].cards[cardMaxIndex].image;
      if (cardImageURL === "http://deckofcardsapi.com/static/img/AD.png") {
        cardImageURL = "images/aceofdiamonds.png";
      }
      $("#"+key+"-card").attr({src: cardImageURL, alt: bothCards[key].cards[cardMaxIndex].code});
      if(bothCards[key].cards[cardMaxIndex].value.length === 1) {
        $("#"+key+"-name").html(bothCards[key].cards[cardMaxIndex].value[0]);
      } else {
        $("#"+key+"-name").html(bothCards[key].cards[cardMaxIndex].value[1]);
      }
      if(key === "redCard") {
        redVal = bothCards.redCard.cards[cardMaxIndex].value[0];
      }
      if(key === "blueCard") {
        blueVal = bothCards.blueCard.cards[cardMaxIndex].value[0];
      }
      // No matter who wins, they get all the cards, so put them in the array
      for (var i = 0; i < bothCards[key].cards.length; i++) {
        wonCards.push(bothCards[key].cards[i].code);
      }
    }
    if(redVal > blueVal) {
      addScore(wonCards, "red");
      qualifier = "beats";
      wonCards = [];
      if(bothCards.redCard.remaining === 0) {
        addScore(wonCards, "done");
        $("#draw").addClass("hidden");
        $("#win-announcement").removeClass("invisible");
        $("#newgame, #resume, #stats, #logout").removeClass("hidden");
      } else {
        $("#draw").html("DRAW!");
      }
    } else if(redVal < blueVal) {
      addScore(wonCards, "blue");
      qualifier = "is beaten by";
      wonCards = [];
      if(bothCards.blueCard.remaining === 0) {
        addScore(wonCards, "done");
        $("#draw").addClass("hidden");
        $("#win-announcement").removeClass("invisible");
        $("#newgame, #resume, #stats, #logout").removeClass("hidden");
      } else {
        $("#draw").html("DRAW!");
      }
    } else if(redVal === blueVal) {
      $("#wartext").removeClass("invisible");
      qualifier = "wars with";
      if(bothCards.redCard.remaining === 0) {
        addScore(wonCards, "both");
        wonCards = [];
        addScore(wonCards, "done");
        qualifier = "ties with";
        $("#draw").addClass("hidden");
        $("#win-announcement").removeClass("invisible");
        $("#newgame, #resume, #stats, #logout").removeClass("hidden");
      } else {
        $("#draw").html("WAR!");
      }
    }
    theGame.on("value", function(snapshot) {
      redScore = snapshot.child("redScore").val();
      blueScore = snapshot.child("blueScore").val();
      $("#redCard-score").html(redScore);
      $("#blueCard-score").html(blueScore);
      if(redScore > blueScore) {
        winQualifier = "has defeated";
      } else if(redScore < blueScore) {
        winQualifier = "was defeated by";
      } else {
        winQualifier = "stalemated with";
      }
    });
    $("#qualifier").html(qualifier);
    $("#win-qualifier").html(winQualifier);
    $("#battle-result").removeClass("invisible");
  };
});
