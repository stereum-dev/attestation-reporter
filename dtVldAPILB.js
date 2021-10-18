function dateTomili(date){
  var date1=date *24*60*60*1000
  return date1;
}
function dateConvert(date){
  var n = Date.now();
//console.log("last is "+date);
  var date=new Date((n-(date*24*60*60*1000))).toISOString();
  var dateSplit=date.split('T');
  return dateSplit[0]

}
function first_table() {
  //get data from api
  var x = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "https://beaconcha.in/api/v1/validator/leaderboard",
    data: {},
    success: (data) => {
      xdata = data.data.slice(0, 10);
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

  function openTbl(link) {
    var url = "https://beaconcha.in/api/v1/validator/stats/";

    window.open("/tbl.html?" + "link=" + link, "_self");
  }
  $("#searchBtn").on("click", () => {
    var linkInput = $("#inputVld").val();
    openTbl(linkInput);
  });


$('#inputVld').keyup(function(e){
  if(e.keyCode == 13)
  {
      openTbl($("#inputVld").val())
  }
});

  $("#vldTbl").on("click","tr", function () {
    var linkVld = $(this).find("td:nth-child(2)").text();
    openTbl(linkVld);
  });
}
function secondTable(apilink) {
  var count = 0;
  var startDate=0;
  var endDate =0;
  var countData=0;
  var dayI=[];

  var x = [];
  $.ajax({
    type: "GET",
    async: false,
    url: "https://beaconcha.in/api/v1/validator/stats/" + apilink,
    data: {},
    success: (data) => {
      //console.log(data)
      var endDay=data.data[0].day;
      //console.log("end "+endDay)
      //console.log(data.data)
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
        dayI.push(data.data[i].day);

      //if counter== end array
      var dayFirest=0;

      //check min max day

      //var min=Math.min.apply(Math,dayI);
      var max=Math.max.apply(Math,dayI);
      //  day max / 30
      var min=Math.min.apply(Math,dayI);

        x.push({
          Date:dateConvert((endDay-data.data[i].day)),
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
      var count0=0;
      var count1=0;
      var n = Date.now();
        var checkDate=new Date(n);
       // console.log(new Date(checkDate.getFullYear(),(checkDate.getMonth()-1),checkDate.getDate()))

      x.forEach((element,i) => {
        var datenow=new Date(Date.now()-((dateTomili(max) -dateTomili(element.day))));

        //console.log(new Date(new Date(checkDate.getFullYear(),(checkDate.getMonth()-1),
       // datenow.getDate())))
          var date1=new Date(new Date(checkDate.getFullYear(),(checkDate.getMonth()-1),
          checkDate.getDate()));
          var date1Split=date1.toISOString().split('T');
           var date2Split=datenow.toISOString().split('T');

        if(date2Split[0].substr(0,8)===date1Split[0].substr(0,8)){    
          if(element.missed_attestations===0 )
          {             
              count0++;

            
          } else if(element.missed_attestations!=0 ){
                      console.log("ok")    

                      console.log("Err" +count1)    

           count1++;
          }
        }
        if(x.length===(i+1)){
if(count0>0 & count1<1){
  console.log(count0) 
  console.log(count1)    
   

$('#log').append('<h1 style="color: green;">Success</h1>');
}else{
  console.log(count0) 
  console.log(count1)   
  $('#log').append('<h1 style="color: red;">Error</h1>');

}
        }
      });
      
      
    },
  });

  $("#vldTbl").dataTable({
    data: x,
    columns: [
      {data:"Date",searchable:false},
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
