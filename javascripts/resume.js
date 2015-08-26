define(function(require) {
  var shuffle = require("shuffle");
  var gameRef = require("gameref");
  $("#multi-modal-content").on("click", ".resume", function(e) {
    var gameToResume = $(this).parents(".modal-row").attr("id");
    var theGame = new Firebase("https://nss-card-war.firebaseio.com/games/" + gameToResume + "/");
    gameRef.setGameRef(theGame);
    theGame.once("value", function(snapshot) {
      $("#redCard-score").html(snapshot.child("redScore").val());
      $("#blueCard-score").html(snapshot.child("blueScore").val());
      var redDeckID = snapshot.child("redDeck").val();
      var shufflePromise = shuffle(redDeckID);
      shufflePromise.then(function(data) {
        $("#draw").html("DRAW!");
        $("#draw").removeClass("hidden");
        $("#newgame, #resume, #stats").addClass("hidden");
        $("#redCard-card").attr({src: "images/red-back.png"});
        $("#blueCard-card").attr({src: "images/blue-back.png"});
        $("#battle-result, #win-announcement").addClass("invisible");
        $("#redCard-score, #blueCard-score, #wartext").removeClass("invisible");
      }).fail(function(error) {
        alert("The card decks associated with this game have expired.");
        theGame.remove();
      });
    });
  });
});