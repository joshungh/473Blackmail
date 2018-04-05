//need this to run dpd stuff
//<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js" charset="utf-8"></script>
//<script src="/dpd.js" type="text/javascript"></script>

(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function LoggedInUser() {
    this.has_loaded = false;
    this.username = null;
  }


  // this takes in a callback function (only proper way to do server calls)
  LoggedInUser.prototype.get = function(callback) {

    //check if there's someone logged in
    //this waits for response from server before running, but javascript after this won't
    /*eslint no-undef: "off"*/
    dpd.users.me(function(result, error) {

      //this never seems to happen
      if (error) {
        console.log(error);
        return;
      }

      //result = user info. if result.username exists there's a user logged in
      if (result.username) {
        callback(result);
      } else {
        callback(null);
      }

    });
  };

  LoggedInUser.prototype.show_info = function() {
    this.get(function(user) {
      console.log(user);
    });
  };

  LoggedInUser.prototype.set_info = function(user_info) {
    this.has_loaded = true;
    this.username = user_info.username;
  };


  //return an array of file paths to the images
  LoggedInUser.prototype.get_my_blackmails = function(callback, element_container) {

    var get_logged_in = this.get;

    $.get("http://localhost:2403/blackmails/").then(function(result) {

      get_logged_in(function(user) {

        var my_blackmails = [];
        result.forEach(function(element) {
          //add the blackmails that matches the id to an array
          if (user.username == element.from) {
            var blackmail = {
              id: element.id,
              img_id: element.imgID,
              from: element.from,
              to: element.to,
              name: element.name,
              public: element.public,
              demands: element.demands,
              file_name: element.filename,
            };

            my_blackmails.push(blackmail);
          }
        });

        //put that array in the callback function
        callback(my_blackmails, element_container);
      });
    });
  };


  LoggedInUser.prototype.get_blackmails_tome = function(callback, element_container) {

    var get_logged_in = this.get;

    $.get("http://localhost:2403/blackmails/").then(function(result) {

      get_logged_in(function(user) {

        var blackmails_tome = [];
        result.forEach(function(element) {

          //add the blackmails that matches the id to an array
          if (user.username == element.to) {
            var blackmail = {
              id: element.id,
              img_id: element.imgID,
              from: element.from,
              to: element.to,
              name: element.name,
              public: element.public,
              demands: element.demands,
              file_name: element.filename,
            };

            blackmails_tome.push(blackmail);
          }
        });

        //put that array in the callback function
        callback(blackmails_tome, element_container);
      });
    });
  };


  LoggedInUser.prototype.delete_blackmail = function(img_id, blackmail_id) {

    //delete the file then delete the row from blackmails table
    dpd.blackmailimgs.del(img_id, function(result, err) {
      if (err) {
        alert(err);
      } else {
        console.log(result);
        window.location.reload(); //refresh page
      }
    }).then(function() {
      $.ajax("http://localhost:2403/blackmails/" + blackmail_id, {
        type: "DELETE"
      });
    });
  };


  LoggedInUser.prototype.make_public = function(id) {
    var update_query = "http://localhost:2403/blackmails/" + id;
    var data = {
      public: 1
    };

    $.post(update_query, data, function(serverResponse) {
      console.log(serverResponse);
      window.location.reload();
    });
  };


  //run it
  App.LoggedInUser = new LoggedInUser();
  App.LoggedInUser.get(App.LoggedInUser.set_info.bind(App.LoggedInUser));
  window.App = App;
})(window);
