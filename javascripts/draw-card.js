define(function(require) {
  var $ = require("jquery");
  var Q = require("q");
  return {
    draw: function(deckID) {
      var deferred = Q.defer();
      $.ajax({
        url: "http://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1",
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