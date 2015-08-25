define(function(require) {
  var $ = require("jquery");
  var Q = require("q");
  return {
    draw: function(deckID, drawCount) {
      var deferred = Q.defer();
      $.ajax({
        url: "http://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=" + drawCount,
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