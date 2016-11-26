jQuery(function() {

   // Even handler for hitting the enter key and getting the value of the text input
   $("#submitForm").on("submit", function() {
         event.preventDefault();
         var city = $("#searchBox").val();
         getData(city);
         $("#searchBox").val('');

      })
      // Even handler for clicking the button and getting the value of the text input
   $("#button").on("click", function() {
      var city = $("#searchBox").val();
      getData(city);
      $("#searchBox").val('');

   })

   function drawChart() {
      // Function for getting clearing the HTML, pulling data from the API 
      function getData(query) {
         // Get data from the API
         $.ajax({
            url: `http://nflarrest.com/api/v1/team/topCrimes/${query}`,
            method: 'GET',
            success: function successHandler(Data) {
               console.log(Data);
               var labels = [];
               var data = [];

               // Loop through data array 
               Data.forEach(function(Data) {
                  labels.push(Data.Category);
                  data.push(Data.arrest_count);
               })
            },
         });
      }


      var ctx = document.getElementById("myChart").getContext("2d");


      var myChart = new Chart(ctx, {
         type: 'bar',
         data: {
            labels: labels,
            datasets: [{
               label: '# of Votes',
               data: data,
               backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
               ],
               borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
               ],
               borderWidth: 1
            }]
         },
         options: {
            scales: {
               yAxes: [{
                  ticks: {
                     beginAtZero: true
                  }
               }]
            }
         }
      });
   }
   drawChart();

});
