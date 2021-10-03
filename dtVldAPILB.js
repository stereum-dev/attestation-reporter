$(document).ready(function () {
  var x = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "https://beaconcha.in/api/v1/validator/leaderboard",
    data: {},
    success: (data) => {
      xdata = data.data.slice(0, 10);
      for (var i in data.data) {
        // if(i>5)break;
        //console.log(data.data[i]);

        x.push({
          validetor: data.data[i].validatorindex,
          balance: data.data[i].balance,
        });
      }
    },
  });
  //const s=JSON.parse(x)
  console.log(x);

  $("#vldTbl").dataTable({
    data: x,
    columns: [
      { data: "validetor" },
      { data: "balance" },
      { data: "validetor" },
      { data: "validetor" },
      { data: "validetor" },
    ],
  });
});
