define(function(require) {
  var gameRef = require("gameref");
  $("#multi-modal-content").on("click", ".resume", function(e) {
    var gameToResume = $(this).parents(".modal-row").attr("id");
    console.log("gameToResume", gameToResume);
    var theGame = new Firebase("https://nss-card-war.firebaseio.com/games/" + gameToResume + "/");
    gameRef.setGameRef(theGame);
    theGame.once("value", function(snapshot) {
      $("#redCard-score").html(snapshot.child("redScore").val());
      $("#blueCard-score").html(snapshot.child("blueScore").val());
    });
    $("#redCard-score, #blueCard-score").removeClass("invisible");
    $("#newgame, #resume, #stats").addClass("hidden");
    $("#draw").removeClass("hidden");
  });
});