//dpd user stuff found here: http://docs.deployd.com/docs/users/authenticating-users.html

(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  var login_form = "[data-login=\"form\"]";

  function LoginHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  //Pressed submit on the form
  LoginHandler.prototype.addSubmitHandler = function() {

    //need this so we can use the function within the submit listener
    var login_attempt = this.login_attempt;

    //listener on submit
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      //bring the input data to javascript
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
      });

      //attempt to login with the input data
      login_attempt(data);
    });
  };

  //attempt to login user, 'data' is the credentials used
  LoginHandler.prototype.login_attempt = function(data) {

    //ask dpd database if user is valid
    /*eslint no-undef: "off"*/
    dpd.users.login({
      username: data.username,
      password: data.password
    }, function(result, error) {

      if (result) {
        window.location.href = "index.html";
      }


      if (error) {
        console.log(error);
        if (error.status == 401) {
          console.log("incorrect credentials");
          alert("incorrect credentials");
        }
      }
    });
  };

  //run the login handler
  App.loginHandler = new LoginHandler(login_form);
  App.loginHandler.addSubmitHandler();
  window.App = App;
})(window);
