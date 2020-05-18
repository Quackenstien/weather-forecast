var APIKey = "5e2cb7014d6f15c944e2f9749a9cfd25";

// Here we run our AJAX call to the OpenWeatherMap API
$("#search-button").on("click", function (e) {
  e.preventDefault();

  var name = $("#search-input").val();

  // Here we are building the URL we need to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $("#city").text("Weather Details about " + response.name);

      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;

      // // add weather content to html
      $("#temp-display").text("Temperature: " + tempF.toFixed(1) + "°F");
      $("#wind-display").text("Wind Speed: " + response.wind.speed + "MPH");
      $("#hum-display").text("Humidity: " + response.main.humidity + "%");

      //Getting current uv index
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      var uvIndex =
        "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

      $.ajax({
        url: uvIndex,
        method: "GET",
      }).then(function (result) {
        console.log(result);
        $("#uv-display").text("UV Index: " + result.value);
      });
    });
});

//   var cityInfo = response + result;

//   for (let i = 0; i < cityInfo.length; i++) {
//     var listEl = $("<li>");
//     $("#listUl").prepend(listEl);
//   }
