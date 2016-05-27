define(function(require) {
  var uid = require("uid");
  var $ = require("jquery");
  var firebase = require("firebase");
  var templates = require("templates");
  firebase.initializeApp({
    apiKey: "AIzaSyDeLlaGb81ju_M4LuCuRdgGeAWich_kk2Y",
    authDomain: "nss-card-war.firebaseapp.com",
    databaseURL: "https://nss-card-war.firebaseio.com",
    storageBucket: "nss-card-war.appspot.com"
  });
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
      $("#button-holder").removeClass("hidden");
      uid.setUid(null);
    }
  });

  $(".auth").click(function() {
    serviceAuth(this.id);
  });

  $("#logout").click(function() {
    firebase.auth.signOut();
  });

  function serviceAuth(service) {
    var provider = firebase.auth[service + "AuthProvider"]();
    auth.signInWithPopup(provider).then(function(result) {
      uid.setUid(result.user.uid)
    }).catch(function(error) {
      // handled by auth provider
    });
  }
});
