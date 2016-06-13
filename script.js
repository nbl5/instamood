var API_DOMAIN = "https://api.instagram.com/v1";
var RECENT_MEDIA_PATH = "/users/self/media/recent";
// what do you think a variable in all caps means?

$(document).ready(function() {
  var token = window.location.hash;
  if (!token) {
    window.location.replace("./login.html");
  }
  token = token.replace("#", "?"); // Prepare for query parameter
  var mediaUrl = API_DOMAIN + RECENT_MEDIA_PATH + token;

  $.ajax({
    method: "GET",
    url: mediaUrl,
    dataType: "jsonp",
    success: handleResponse,
    error: function() {
      alert("there has been an error...")
    }
  })
});

function handleResponse(response) {
  for (var i=0; i<response.data.length; i++) {
    var url= response.data[i].images.standard_resolution.url;
    var caption=response.data[i].caption.text;
   // console.log(url);
    $("#list").append("<img src=" + url + "/>");
    $("#list").append("<div>" + caption + "</div>");

  }
  // console.log(response);
  // add stuff here!
}


  // for (var i=0; i<response.response.docs.length; i++) {
  //   $("#list").append("<div>"+response.response.docs[i].headline.main+"</div>");
  //   console.log(response.response.docs[i].headline.main)
  // }