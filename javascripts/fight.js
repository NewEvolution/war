define(function(require) {
  var $ = require("jquery");
  var gameRef = require("gameref");
  var score = require("score-adder");
  return {
    battle: function(bothCards) {
      console.log("red card", bothCards.redCard);
      console.log("blue card", bothCards.blueCard);
      var theGame = gameRef.getGameRef();
      var redVal;
      var blueVal;
      var redScore = 0;
      var blueScore = 0;
      var qualifier;
      var wonCards = [];
      for(var key in bothCards) {
        var cardMaxIndex = bothCards[key].cards.length - 1;
        $("#"+key+"-card").attr({src: bothCards[key].cards[cardMaxIndex].image, alt: bothCards[key].cards[cardMaxIndex].code});
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
        score.addScore(wonCards, "red");
        $("#draw").html("DRAW!");
        qualifier = "beats";
      } else if(redVal < blueVal) {
        score.addScore(wonCards, "blue");
        $("#draw").html("DRAW!");
        qualifier = "is beaten by";
      } else if(redVal === blueVal) {
        $("#wartext").removeClass("invisible");
        $("#draw").html("WAR!");
        qualifier = "wars with";
      }
      theGame.on("value", function(snapshot) {
        $("#redCard-score").html(snapshot.child("redScore").val());
        $("#blueCard-score").html(snapshot.child("blueScore").val());
      });
      $("#qualifier").html(qualifier);
      $("#battle-result").removeClass("invisible");
    }
  };
});