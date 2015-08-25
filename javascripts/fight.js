define(function(require) {
  var $ = require("jquery");
  return {
    battle: function(redCard, blueCard) {
      console.log("red card", redCard);
      console.log("blue card", blueCard);
      $("#red-card").attr({src: redCard.cards[0].image, alt: redCard.cards[0].code});
      $("#blue-card").attr({src: blueCard.cards[0].image, alt: blueCard.cards[0].code});
    }
  };
});