var files = [];
var App = window.App || {};
var $ = window.jQuery;
$(".alert-success").hide();


//uploaded files are found on file_database/image_uploads/"blackmailer" to "blackmailee"
var uploadFiles = function() {
  var fd = new FormData();
  for (var i in files) {
    fd.append("uploadedFile", files[i]);
  }
  var user_to_blackmail = $("#user_to_blackmail").val();
  var blackmailer = App.LoggedInUser.username;
  var uploadFile = new XMLHttpRequest();

  var fileValidation = this.files[0];
  var fileType = fileValidation["type"];
  var validType = ["image/gif", "image/jpeg", "image/png"];
  if ($.inArray(fileType, validType) >= 0) {
    uploadFile.open("POST", "/blackmailimgs?subdir=" + blackmailer + " to " + user_to_blackmail);
    uploadFile.send(fd);
    if (uploadFile.status < 300) {
      console.log("Successful Upload");
      alert("Success!");
    } else {
      console.log("failed to upload");
      alert("Failed to upload file");
      return;
    }
  } else {
    console.log("Failed to upload, invalid file type");
    alert("Failed to upload file due to invalid file type. Please only upload files w/ .gif, .jpg, or .png");
    return;
  }


  //get image ID then create a "blackmails" row to put the data (ex. list of demands) about the image
  files.forEach(function(file) {
    var query = "http://localhost:2403/blackmailimgs?subdir=" + blackmailer + " to " + user_to_blackmail + "&originalFilename=" + file.name;

    $.get(query).then(function(result) {

      //we want to get the one we just uploaded
      var most_recent = result.pop();

      //setup the data and post
      var list_of_demands = [];
      $(".demand").each(function() {
        list_of_demands.push($(this).val());
      });

      // console.log(blackmailer);
      var data = {
        demands: list_of_demands,
        imgID: most_recent.id,
        name: most_recent.originalFilename,
        to: user_to_blackmail,
        from: blackmailer,
        public: 0,
        filename: most_recent.filename,
      };

      console.log(data);
      $.post("http://localhost:2403/blackmails", data, function(serverResponse) {
        console.log(serverResponse);
      });

    });
  });

};


var setFiles = function(element) {

  console.log("File Properties:", element.files);
  files = [];
  for (var i = 0; i < element.files.length; i++) {
    files.push(element.files[i]);
  }

};


function submitHandler(fn) {

  var upload_form = "[data-upload-image=\"form\"]";
  $(upload_form).on("submit", function(event) {
    event.preventDefault();

    var data = {};
    $(this).serializeArray().forEach(function(item) {
      data[item.name] = item.value;
    });

    fn(data);

    window.location.href = "user_page.html";
  });
}

function create_options(users) {

  var user_selector = "[data-user-select=\"input\"]";
  users.forEach(function(user) {

    //if (user.username != App.LoggedInUser.username)
    console.log(App.LoggedInUser.username);
    var $option = $("<option></option>", {
      value: user.username
    });

    $option.append(user.username);
    $(user_selector).append($option);
  });
}


(function(window) {
  "use strict";
  var App = window.App || {};

  //run it
  App.Users.getOthers(create_options);
  submitHandler(uploadFiles);
  window.App = App;
})(window);
