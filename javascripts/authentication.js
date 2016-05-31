define(function(require) {
  var uid = require("uid");
  var $ = require("jquery");
  var templates = require("templates");
  var fireconf = require("fireconf");

  var ref = fireconf.database().ref();
  var auth = fireconf.auth();
  var date = new Date();
  var year = date.getFullYear();

  $("#copyright").html(templates.copyright({currentYear: year}));

  fireconf.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#authentication").addClass("hidden");
      $("#button-holder").removeClass("hidden");
      uid.setUid(user.uid);
      require(["newgame"], function() {});
    } else {
      $("#authentication").removeClass("hidden");
      $("#button-holder").addClass("hidden");
      uid.setUid(null);
    }
  });

  $(".auth").click(function() {
    serviceAuth(this.id);
  });

  $("#logout").click(function() {
    fireconf.auth().signOut();
  });

  function serviceAuth(service) {
    var provider = new fireconf.auth[service + "AuthProvider"]();
    auth.signInWithPopup(provider).then(function(result) {
      uid.setUid(result.user.uid)
    }).catch(function(error) {
      // handled by auth provider
    });
  }
});
