define(function(require) {
  var uid = require("uid");
  var $ = require("jquery");
  var firebase = require("firebase");
  var templates = require("templates");
  var fireconf = require("fireconf");

  firebase.initializeApp(fireconf);
  var ref = firebase.database().ref();
  var auth = firebase.auth();
  var date = new Date();
  var year = date.getFullYear();

  $("#copyright").html(templates.copyright({currentYear: year}));

  firebase.auth().onAuthStateChanged(function(user) {
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
    firebase.auth().signOut();
  });

  function serviceAuth(service) {
    var provider = new firebase.auth[service + "AuthProvider"]();
    auth.signInWithPopup(provider).then(function(result) {
      uid.setUid(result.user.uid)
    }).catch(function(error) {
      // handled by auth provider
    });
  }
});
