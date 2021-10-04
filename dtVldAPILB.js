
function first_table(){
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
          validatorindex: data.data[i].validatorindex,
          balance: data.data[i].balance,
          rank7d: data.data[i].rank7d,
          performance1d: data.data[i].performance1d,
          performance7d: data.data[i].performance7d
        });
      }
    },
  });
  //alert(x[0].validetor)
  //const s=JSON.parse(x)
  console.log(x);
 
  $("#vldTbl").dataTable({
    data: x,
    columns: [
      { data: "rank7d","searchable":false },
      { data: "validatorindex","searchable":true },
      { data: "balance" ,"searchable":false},
      { data: "performance1d","searchable":false },
      { data: "performance7d" ,"searchable":false},
    ],
  
});
$( "tr" ).on("click",function(){
  
    var link=$(this).find("td:nth-child(2)").text();
    var url="https://beaconcha.in/api/v1/validator/stats/";
    var apiLink =url+link;
    window.open("/tbl.html?"+"link="+link,"_self")
    //alert(apiLink);
  });
}
function secondTable(apilink){
  var x = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "https://beaconcha.in/api/v1/validator/stats/"+apilink,
    data: {},
    success: (data) => {
      xdata = data.data.slice(0, 10);
      for (var i in data.data) {
        // if(i>5)break;
        //console.log(data.data[i]);
console.log(data.data[i])
        x.push({
          validatorindex: data.data[i].validatorindex,
          day: data.data[i].day,
          start_balance: data.data[i].start_balance,
          end_balance: data.data[i].end_balance ,
          proposed_blocks: data.data[i].proposed_blocks,
          orphaned_attestations:data.data[i].orphaned_attestations,
          attester_slashings:data.data[i].attester_slashings,
          missed_blocks:data.data[i].missed_blocks,
          missed_attestations:data.data[i].missed_attestations,
          deposits_amount:data.data[i].deposits_amount
        });
      }
    },
  });
  //alert(x[0].validetor)
  //const s=JSON.parse(x)

  console.log(x);
 
  $("#vldTbl").dataTable({
    data: x,
    columns: [
      { data: "validatorindex","searchable":false },
      { data: "day","searchable":true },
      { data: "start_balance" ,"searchable":false},
      { data: "end_balance","searchable":false },
      { data: "proposed_blocks" ,"searchable":false},
      { data: "orphaned_attestations" ,"searchable":false},
      { data: "attester_slashings" ,"searchable":false},
      { data: "missed_blocks" ,"searchable":false},
      { data: "missed_attestations" ,"searchable":false},
      { data: "deposits_amount" ,"searchable":false},
    ],
  
});
}


