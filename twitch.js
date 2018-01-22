
const userName = ['ekolimits', 'sinatraa', 'dewchallenge', 'sir_thomas_', 'wildlands', 'bigfoltz', 'aceyummy', 'opex', 'xiceman', 'freecodecamp'];
let userData = [];
let usersOnline = [];


$(document).ready(function() {

  $("#menuIcon").on("click", menuBar);
  $("#Go").on("click", go);
  $("#allUsers").on("click", allUsersTab);
  $("#onLine").on("click", onLineTab);
  $("#offLine").on("click", offLineTab);

  runPage();
});

// "runPage" initiates the ajax calls and fills the arrays with all the data
//   needed for the page - however i'm not sure how to run "displayUsers" & "usersOnLine"
//  only when the arrays are filled or all ajax requests have come back, success or fail.

function runPage() {

  $.when(fetch(), getUsersLive()).done(displayUsers, usersOnLine);


// fetchUserData();
// getUsersLive();

//
// Trying something like....
// $.when(fetch(),getUsersLive()).done(displaystuff, onLine);
}


//identifies thelink inbedded in a div and opens it in a new windo on click
function linkOut() {
  let linkToTwitch = $(this).find("a").attr("href");
  window.open(linkToTwitch);
  return false;
}

//responsive menubar dependent on screen width.
function menuBar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className = "responsive";
  } else {
    x.className = "topnav";
  }
}



//username.length number of calls to api - populating favourite user details
function fetchUserData() {
  for (x = 0; x < userName.length ; x++) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/channels/' + userName[x],
      headers: {
        'Client-ID': '3jvb8k1jin691y6ti00uea9bfxwruz'
      },
      success: function(data) {
        userData[data.name] = data;
      }
    });
  }
}


//username.length number of calls to api - "streams" to check on-line users
function getUsersLive() {
  for (i = 0; i < userName.length ; i++) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + userName[i],
      headers: {
        'Client-ID': '3jvb8k1jin691y6ti00uea9bfxwruz'
      },
      success: function(data) {
        if (data.stream) {
          usersOnline[data.stream.channel.name] = data;
        }
      }
    });
  }
}


function displayUsers() {
 for ( j=0 ; j < userName.length ; j++) {
    $('.UserList').append($('<div class="row UserBox OffLineClass" id="' + userData[userName[j]].name + '">' +
    '<div class="col">' +
    '<img src="' + userData[userName[j]].logo +'"/>' +
    '</div>' +
    '<div class="col-9 userName">' +
    '<span>' + userData[userName[j]].display_name + '</span>' +
    '<em class="userInfo">' + '<p>' + userData[userName[j]].game + '</p>' + '</em>' +
    '<em class="userInfo">' + '<span>' +"<a href='" +  userData[userName[j]].url +"'>" + '</span>' + '</em>' +
    '</div>' + '</div>'));
}
$(".UserBox").on("click", linkOut);

usersOnLine();
}


//Adds "OnLineClass" to users that are currently streaming
function usersOnLine() {
for ( z=0 ; z<userName.length ; z++ ) {
  if (usersOnline[userName[z]]) {
    let live = document.getElementById(userName[z]);
    live.classList.add("OnLineClass");
    live.classList.remove("OffLineClass");
  }
}
}


function allUsersTab() {
  $('#allUsers').addClass("active");
  $('#onLine').removeClass("active");
  $('#offLine').removeClass("active");
  $('.OnLineClass').show();
  $('.OffLineClass').show();
}

function onLineTab() {
  $('#allUsers').removeClass("active");
  $('#onLine').addClass("active");
  $('#offLine').removeClass("active");
  $('.OnLineClass').show();
  $('.OffLineClass').hide();
}

function offLineTab() {
  $('#allUsers').removeClass("active");
  $('#onLine').removeClass("active");
  $('#offLine').addClass("active");
  $('.OffLineClass').show();
  $('.OnLineClass').hide();
}


// initiates second phase

function go() {

console.log(usersOnline);
console.log(userName.length);

displayUsers();

}
