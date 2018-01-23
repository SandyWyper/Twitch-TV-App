const userName = ['ekolimits', 'sinatraa', 'dewchallenge', 'sir_thomas_', 'wildlands', 'bigfoltz', 'aceyummy', 'opex', 'xiceman', 'freecodecamp'];
let userData = [];
let usersOnline = [];
let counter = 0;


$(document).ready(function() {

  $("#menuIcon").on("click", menuBar);
  $("#allUsers").on("click", allUsersTab);
  $("#onLine").on("click", onLineTab);
  $("#offLine").on("click", offLineTab);
  $(".searchButton").on("click", searchUserList);

  runPage();

});

// "runPage" initiates the ajax calls and fills the arrays with all the data
//   needed for the page


function runPage() {
  fetchUserData();
  getUsersLive();
}

//username.length number of calls to api - populating favourite user details
function fetchUserData() {
  for (x = 0; x < userName.length; x++) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/channels/' + userName[x],
      headers: {
        'Client-ID': '3jvb8k1jin691y6ti00uea9bfxwruz'
      },
      success: function(data) {
        userData[data.name] = data;
        counter++;
        if (counter === userName.length * 2) {
          displayUsers();
        }
      }
    });
  }
}

//username.length number of calls to api - "streams" to check on-line users
function getUsersLive() {
  for (i = 0; i < userName.length; i++) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + userName[i],
      headers: {
        'Client-ID': '3jvb8k1jin691y6ti00uea9bfxwruz'
      },
      success: function(data) {
        counter++;
        if (data.stream) {
          usersOnline[data.stream.channel.name] = data;
        }
        if (counter === userName.length * 2) {
          displayUsers();
        }
      }
    });
  }
}

function displayUsers() {
  for (j = 0; j < userName.length; j++) {
    $('.UserList').append($('<div class="row UserBox OffLineClass" id="' + userData[userName[j]].name + '">' +
      '<div class="col">' +
      '<img src="' + userData[userName[j]].logo + '"/>' +
      '</div>' +
      '<div class="col-9 userName">' +
      '<span>' + userData[userName[j]].display_name + '</span>' +
      '<em class="userInfo">' + '<p>' + userData[userName[j]].game + '</p>' + '</em>' +
      '<em class="userInfo">' + '<span>' + "<a href='" + userData[userName[j]].url + "'>" + '</span>' + '</em>' +
      '</div>' + '</div>'));
  }
  $(".UserBox").on("click", linkOut);

  usersOnLine();
}

//Adds "OnLineClass" to users that are currently streaming
function usersOnLine() {
  for (z = 0; z < userName.length; z++) {
    if (usersOnline[userName[z]]) {
      const live = document.getElementById(userName[z]);
      live.classList.add("OnLineClass");
      live.classList.remove("OffLineClass");
    }
  }
}

//responsive menubar dependent on screen width.
function menuBar() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className = "responsive";
  } else {
    x.className = "topnav";
  }
}

//identifies thelink inbedded in a div and opens it in a new windo on click
function linkOut() {
  let linkToTwitch = $(this).find("a").attr("href");
  window.open(linkToTwitch);
  return false;
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

function searchUserList() {
  let searchInput = takeSearchString(event);
  let index = findIndex(searchInput);

  if (index >= 0) {
    $('.OnLineClass').hide();
    $('.OffLineClass').hide();
    const userLook = "#" + userName[index];
    $(userLook).show();
  } else {
    alert("user not found");
  }
}

function takeSearchString(event) {
  event.preventDefault();
  let userSearch = document.getElementById("searchBox").value;
  return userSearch.toLowerCase();
}

function findIndex(searchString) {
  return userName.indexOf(searchString);
}
