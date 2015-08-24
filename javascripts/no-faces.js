define(function(require) {
  var fight = require("fight");
  return {
    deface: function(bothCards) {
      console.log("red card", bothCards.redCard);
      console.log("blue card", bothCards.blueCard);

    }
  };
});