define(function(require) {
  var $ = require("jquery");
  return {
    battle: function(bothCards) {
      console.log("red card", bothCards.redCard);
      console.log("blue card", bothCards.blueCard);
      var redVal;
      var blueVal;
      var qualifier;
      var wonCards = [];
      for(var key in bothCards) {
        console.log(bothCards[key].cards.length);
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
        // No matter who wins or loses, they get all the cards, so put them in the array
        for (var i = 0; i < bothCards[key].cards.length; i++) {
          wonCards.push(bothCards[key].cards[i].code);
        }
      }
      if(redVal > blueVal) {
        qualifier = "beats";
      } else if(redVal < blueVal) {
        qualifier = "is beaten by";
      } else if(redVal === blueVal) {
        qualifier = "wars with";
      }
      $("#qualifier").html(qualifier);
      $("#battle-result").removeClass("invisible");
    }
  };
});