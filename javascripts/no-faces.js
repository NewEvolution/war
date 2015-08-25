define(function(require) {
  var fight = require("fight");
  return {
    deface: function(bothCards) {
      for(var key in bothCards) {
        var cardValue = bothCards[key].cards[0].value;
        if(cardValue === "ACE") {
          cardValue = [14, "Ace"];
        } else if(cardValue === "KING") {
          cardValue = [13, "King"];
        } else if(cardValue === "QUEEN") {
          cardValue = [12, "Queen"];
        } else if(cardValue === "JACK") {
          cardValue = [11, "Jack"];
        } else {
          cardValue = [parseInt(cardValue)];
        }
        bothCards[key].cards[0].value = cardValue; 
      }
      fight.battle(bothCards.redCard, bothCards.blueCard);
    }
  };
});