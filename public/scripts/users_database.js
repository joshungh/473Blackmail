(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function Users() {
    this.db_url = "http://localhost:2403/users";
  }


  Users.prototype.getAll = function(callback) {
    $.get(this.db_url).then(function(serverResponse) {
      callback(serverResponse);
    });
  };

  //gets all users except for the one logged in
  Users.prototype.getOthers = function(callback) {
    $.get(this.db_url).then(function(serverResponse) {

      var users = serverResponse;

      App.LoggedInUser.get(function(user) {
        for (var i = 0; i < users.length; i++) {
          if (users[i].username == user.username) {
            users.splice(i, 1);
          }
        }

        callback(users);
      });
    });
  };

  App.Users = new Users();
  window.App = App;
})(window);
