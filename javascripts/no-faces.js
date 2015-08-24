define(function(require) {
  var fight = require("fight");
  return {
    deface: function(bothCards) {
      for(var key in bothCards) {
        var cardValue = bothCards[key].cards[0].value;
        if(cardValue === "ACE") {
          cardValue = 14;
        } else if(cardValue === "KING") {
          cardValue = 13;
        } else if(cardValue === "QUEEN") {
          cardValue = 12;
        } else if(cardValue === "JACK") {
          cardValue = 11;
        } else {
          cardValue = parseInt(cardValue);
        }
        bothCards[key].cards[0].value = cardValue; 
      }
      fight.battle(bothCards.redCard, bothCards.blueCard);
    }
  };
});