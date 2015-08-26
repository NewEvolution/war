define(function(require) {
  var uid = require("uid");
  var resume = require("resume");
  var templates = require("templates");
  var currentPlayer = uid.getUid();
  return function(cardbaseRef, target) {
    cardbaseRef.child("games").orderByChild("player").equalTo(currentPlayer).once("value", function(snapshot) {
      var gamesObj = snapshot.val();
      var unfinishedGamesObj = {};
      var finishedGamesObj = {};
      for(var uuid in gamesObj) {
        if(gamesObj[uuid].completed) {
          finishedGamesObj[uuid] = gamesObj[uuid];
        } else {
          unfinishedGamesObj[uuid] = gamesObj[uuid];
        }
      }
      console.log("unfinishedGamesObj", unfinishedGamesObj);
      console.log("finishedGamesObj", finishedGamesObj);
      if(target === "stats") {
        $("#modal-close").html("Close");
        $("#multi-label").html("Your Statistics");
        if($.isEmptyObject(finishedGamesObj)) {
          $("#multi-modal-content").html('<div class="modal-row"> <h3>You do not have any completed games.</h3></div>');
        } else {
          var allWins = {
            redWins: 0,
            redTotal: 0,
            blueWins: 0,
            blueTotal: 0,
            stalemates: 0
          };
          for(var game in finishedGamesObj) {
            var redScore = finishedGamesObj[game].redScore;
            allWins.redTotal += redScore;
            var blueScore = finishedGamesObj[game].blueScore;
            allWins.blueTotal += blueScore;
            if(redScore > blueScore) {
              allWins.redWins++;
            }
            if(redScore < blueScore) {
              allWins.blueWins++;
            }
            if(redScore === blueScore) {
              allWins.stalemates++;
            }
          }
          $("#multi-modal-content").html(templates.stats({wins: allWins, games: finishedGamesObj}));
        }
      } else if(target === "resume") {
        $("#modal-close").html("Cancel");
        $("#multi-label").html("Resume an Incomplete Game");
        if($.isEmptyObject(unfinishedGamesObj)) {
          $("#multi-modal-content").html('<div class="modal-row"> <h3>You do not have any unfinished games.</h3></div>');
        } else {
          $("#multi-modal-content").html(templates.resume(unfinishedGamesObj));
        }
      }
    });
  };
});
