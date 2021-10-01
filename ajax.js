
      $(document).ready(function () {
        $.ajax({
          type: "GET",
          async: false,
          url: "https://beaconcha.in/api/v1/validator/leaderboard",
          data: {},
          success: (data) => {
            $.each(data.data, function (i) {
              console.log(data.data[i]);

              $.ajax({
                type: "GET",
                async: false,
                url:
                  "https://beaconcha.in/api/v1/validator/stats/" +
                  data.data[i].validatorindex,
                data: {},
                success: (data1) => {
                  //alert(data1.status)

                  $("#M1").append(
                    '<div class=""  > <div class="pad15" style="cursor:pointer; ;" value="' +
                      data.data[i].validatorindex +
                      '">' +
                      data.data[i].validatorindex +
                      " " +
                      data1.data[i].proposer_slashings +
                      "</div></div>"
                  );
                },
              });
            });
          },
        });
      });