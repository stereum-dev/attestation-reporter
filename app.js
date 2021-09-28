var url = "https://beaconcha.in/api/v1/validator/leaderboard";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("accept", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();
