(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  var register_form = "[data-register=\"form\"]";

  function registrationHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }

    this.serverUrl = "http://localhost:2403/users";
  }

  registrationHandler.prototype.addSubmitHandler = function(fn) {
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
      });

      fn(data);
    });


  };

  registrationHandler.prototype.sendData = function(data) {
    var unique_user = true;
    var serverUrl = this.serverUrl;

    $.get(this.serverUrl).then(function(database) {
      //get all the users in database to make sure username and email is unique
      database.forEach(function(row) {
        if (!already_in_use(row, data)) {
          unique_user = false;
        }
      });

      // if unique username + email, register the user and log em in
      if (unique_user) {
        $.post(serverUrl, data, function() {
          App.loginHandler.login_attempt(data);
        });
      }

    });
  };




  function already_in_use(input, db_value) {
    if (input.username == db_value.username) {
      alert("username already taken");
      return false;
    }
    if (input.email == db_value.email) {
      alert("email already taken");
      return false;
    }

    return true;
  }

  //run the register handler
  App.registrationHandler = new registrationHandler(register_form);
  App.registrationHandler.addSubmitHandler(App.registrationHandler.sendData.bind(App.registrationHandler));
  window.App = App;
})(window);
