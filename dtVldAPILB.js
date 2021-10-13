//it's a function to take data for first table at the beginning(leaderboard)

function first_table() {
  var x = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "https://beaconcha.in/api/v1/validator/leaderboard",
    data: {},
    success: (data) => {
      xdata = data.data.slice(0, 10);

      //push Json to a var as a data
      for (var i in data.data) {
        x.push({
          validatorindex: data.data[i].validatorindex,
          balance: data.data[i].balance,
          rank7d: data.data[i].rank7d,
          performance1d: data.data[i].performance1d,
          performance7d: data.data[i].performance7d,
        });
      }
    },
  });

  //first table show
  $("#vldTbl").dataTable({
    data: x,
    columns: [
      { data: "rank7d", searchable: false },
      { data: "validatorindex", searchable: true },
      { data: "balance", searchable: false },
      { data: "performance1d", searchable: false },
      { data: "performance7d", searchable: false },
    ],
  });

  //take Json for second table and make a link
  function openTbl(link) {
    console.log("validate is " + link);
    var url = "https://beaconcha.in/api/v1/validator/stats/";

    window.open("/tbl.html?" + "link=" + link, "_self");
  }

  //marge links together with input
  $("#searchBtn").on("click", () => {
    var linkInput = $("#inputVld").val();
    openTbl(linkInput);
  });

//use Enter to action on input
$('#inputVld').keyup(function(e){
  if(e.keyCode == 13)
  {
      openTbl($("#inputVld").val())
  }
});

//take validator index in second row for make a link for API
  $("tr").on("click", function () {
    var linkVld = $(this).find("td:nth-child(2)").text();
    openTbl(linkVld);
  });
}
function secondTable(apilink) {
  var x = [];
  $.ajax({
    type: "GET",
    async: false,

    //make API link for second table
    url: "https://beaconcha.in/api/v1/validator/stats/" + apilink,
    data: {},
    success: (data) => {
      var count = 0;
      for (var i in data.data) {
        if (count < 1) {
          count++;
          $("#validateNum").append(
            "<h1>#Validetor: " + data.data[i].validatorindex + "</h1>"
          );
        }
        //check orphaned data
        var orphaned;
        if (data.data[i].orphaned_attestations != "0") {
          orphaned = data.data[i].orphaned_attestations;
        } else {
          orphaned = "null";
        }

        //push data from json in a val
        x.push({
          validatorindex: data.data[i].validatorindex,
          day: data.data[i].day,
          start_balance: data.data[i].start_balance,
          end_balance: data.data[i].end_balance,
          proposed_blocks: data.data[i].proposed_blocks,
          orphaned_attestations: orphaned,
          attester_slashings: data.data[i].attester_slashings,
          missed_blocks: data.data[i].missed_blocks,
          missed_attestations: data.data[i].missed_attestations,
          deposits_amount: data.data[i].deposits_amount,
        });
      }
    },
  });

  //second table validator
  $("#vldTbl").dataTable({
    data: x,
    columns: [
      { data: "day", searchable: true },
      { data: "start_balance", searchable: false },
      { data: "end_balance", searchable: false },
      { data: "proposed_blocks", searchable: false },
      { data: "orphaned_attestations", searchable: false },
      { data: "attester_slashings", searchable: false },
      { data: "missed_blocks", searchable: false },
      { data: "missed_attestations", searchable: false },
      { data: "deposits_amount", searchable: false },
    ],
    dom: "Bfrtip",
    buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
  });
}
