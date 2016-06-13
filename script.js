var API_DOMAIN = "https://api.instagram.com/v1";
var RECENT_MEDIA_PATH = "/users/self/media/recent";


$(document).ready(function() {
  var token = window.location.hash;
  if (!token) {
    window.location.replace("./login.html");
  }
  token = token.replace("#", "?"); 
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

    if (response.data[i].caption!==null) {
       var caption=response.data[i].caption.text;
    }
    $("#list").append("<img src=" + url + "/>");
    $("#list").append("<div>" + caption + "</div>");
  }
  //console.log(response.data);


var selfLikes=0;
  for (var i=0; i<response.data.length; i++) {
    if (response.data[i].user_has_liked) {
    selfLikes++;
    }
  }
var egoScore=Math.floor((selfLikes/response.data.length) * 100);
$("#ego").append(egoScore + "%");


var likeTotal=0;
  for (var i=0; i<response.data.length; i++) {
    likeTotal += response.data[i].likes.count;
  }
var popularityScore=Math.round(likeTotal/response.data.length);
$("#popular").append(popularityScore);

var days= [0, 0, 0, 0, 0, 0, 0];
var week=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (var i=0; i<response.data.length; i++) {
    var time=parseInt(response.data[i].created_time);
    var date=new Date(time*1000);
    days[date.getDay()]++;
  }
  console.log(days);
var mostActiveDay=week[days.indexOf((Math.max.apply(Math, days)))];
$("#active").append(mostActiveDay);


var captionLength=0;
  for (var i=0; i<response.data.length; i++) {
    if (response.data[i].caption!==null) {
    captionLength += response.data[i].caption.text.length;
    }
  }
var brevityScore=Math.round(captionLength/response.data.length);
$("#brevity").append(brevityScore);

var hashtags=0;
  for (var i=0; i<response.data.length; i++) {
     if (response.data[i].caption!==null) {
    hashtags += response.data[i].tags.length;
    }
  }
var visibilityScore=Math.round(hashtags/response.data.length);
$("#thirst").append(visibilityScore); 


}




