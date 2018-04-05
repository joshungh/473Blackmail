(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;


  var get_public_blackmails = function(callback, element_container) {

    $.get("http://localhost:2403/blackmails/").then(function(result) {


      var public_blackmails = [];
      result.forEach(function(element) {

        //add the blackmails that are public
        if (element.public == 1) {
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

          console.log(element.filename);
          public_blackmails.push(blackmail);
        }
      });

      //put that array in the callback function
      callback(public_blackmails, element_container);
    });

  };

  App.get_public_blackmails = get_public_blackmails;
  window.App = App;
})(window);
