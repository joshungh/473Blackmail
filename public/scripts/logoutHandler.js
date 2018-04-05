//dpd user stuff found here: http://docs.deployd.com/docs/users/authenticating-users.html

(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  var login_form = "[data-logout=\"button\"]";

  function LogoutHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  LogoutHandler.prototype.addLogoutHandler = function() {
    this.$formElement.on("click", function(event) {
      event.preventDefault();

      /*eslint no-undef: "off"*/
      dpd.users.logout(function() {
        //redirect user to login page
        window.location.href = "login.html";
      });
    });
  };

  //run it
  App.LogoutHandler = new LogoutHandler(login_form);
  App.LogoutHandler.addLogoutHandler();
  window.App = App;
})(window);
