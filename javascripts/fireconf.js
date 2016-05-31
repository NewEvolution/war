define(function(require) {
  var firebase = require("firebase");
  firebase.initializeApp({
    apiKey: "AIzaSyDeLlaGb81ju_M4LuCuRdgGeAWich_kk2Y",
    authDomain: "nss-card-war.firebaseapp.com",
    databaseURL: "https://nss-card-war.firebaseio.com",
    storageBucket: "nss-card-war.appspot.com"
  });
  return firebase;
});
