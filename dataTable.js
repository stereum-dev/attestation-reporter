
      $(document).ready(function () {
        var x=0;
        $('#vldTbl').dataTable( {
            "ajax": {
                "url": "https://beaconcha.in/api/v1/validator/leaderboard",
                "type": "GET",
                "cache": true,
                
                
                "complete": function(xhr, status){
               
                    
                    console.log(xhr.responseText);
                    console.log(x.data);
                    $.each(x.data, function(i) {
                     
  
                    });
                },
                columns: [
                    { data: x.data.validatorindex },
                    { data: x.data.validatorindex },
                    { data: x.data.validatorindex },
                    { data: x.data.validatorindex }
                ]
            }
        } );
    
    
        
      });