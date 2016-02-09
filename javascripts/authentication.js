define(function(require) {
  var uid = require("uid");
  var $ = require("jquery");
  var firebase = require("firebase");
  var templates = require("templates");
  var ref = new Firebase("https://nss-card-war.firebaseio.com");
  var authData = ref.getAuth();
  var date = new Date();
  var year = date.getFullYear();

  $("#copyright").html(templates.copyright({currentYear: year}));

  if(authData !== null) {
    $("#authentication").addClass("hidden");
    $("#button-holder").removeClass("hidden");
    uid.setUid(authData.uid);
    require(["newgame"], function() {});
  }

  $(".auth").click(function() {
    serviceAuth(this.id);
  });

  $("#logout").click(function() {
    ref.unauth();
    location.reload();
  });

  function serviceAuth(service) {
    ref.authWithOAuthPopup(service, function(error, authData) {
      if (authData) {
        location.reload();
      }
    });
  }
});
