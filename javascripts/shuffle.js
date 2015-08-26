define(function(require) {
  var $ = require("jquery");
  var Q = require("q");
  return function(deckID) {
    var deferred = Q.defer();
    $.ajax({
      url: "http://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/",
      method: "GET"
    }).done(function(data) {
      deferred.resolve(data);
    }).fail(function(xhr, status, error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };
});