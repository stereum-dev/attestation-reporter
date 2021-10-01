//fetch api

function fetchData() {
   fetch("https://beaconcha.in/api/v1/validator/leaderboard")
     .then((response) => {
       //set Error
 
       if (!response.ok) {
         throw Error("ERROR");
       }
       return response.json();
     })
     .then((data) => {
      //  console.log(data.data);
      return fetch()
 
       //move to element
 
       const html = data.data
         .map((user) => {
           return (
             '<tr class="user"><td>'+
             user.validatorindex +
             " </td><td>" +
             user.rank7d +
             " </td><td>" +
             user.balance +
             " </td><td>" +
             user.performance1d +
             " </td><td>" +
             user.performance7d +
             " </td><td>" +
             user.performance31d +
             " </td><td>" +
             user.performance365d +
             " </td></tr>"
           );
         })
         .join(" ");
       console.log(html);
       document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
     })
     .catch((error) => {
       console.log(error);
     });
 }
 
 fetchData();

 import {}
 