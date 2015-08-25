define(function(require) {
  var Q = require("q");
  var $ = require("jquery");
  return {
    addCards: function(cardArr, deckID) {
      console.log("won cards", cardArr);
      console.log("pile url", "http://deckofcardsapi.com/api/deck/" + deckID + "/pile/winnings/add/?cards=" + cardArr.toString());
      var deferred = Q.defer();
      $.ajax({
        url: "http://deckofcardsapi.com/api/deck/" + deckID + "/pile/winnings/add/?cards=" + cardArr.toString(),
        method: "GET"
      }).done(function(data) {
        deferred.resolve(data);
      }).fail(function(xhr, status, error) {
        deferred.reject(error);
      });
    return deferred.promise;
    }
  };
});