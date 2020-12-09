//Restart here
// set the variable for user selected state 
//then use the api to insert the user selected state address + state + api key etc
//use that to identify the parks in the state
//then rerun it to pull the data fields

//create a function that allows me to fetch the data, loop through it
//grab out the specific National Parks to put onhange the modal

var parkOptions= function() {
  
//set up variables that hold the state choices and values from the main drop down
var selectOptions = document.getElementById("state");
var options= selectOptions.value;
console.log(options);
var url = 'https://developer.nps.gov/api/v1/parks?stateCode=' + options + '&api_key=yCwb05JC1ccmoZ4jFHTMcbiQIa3pV5MAeI22MlmG';

fetch(url).then(function(response) {
    // Pass the data from the first fetch
    return response.json(); 
  }).then(function(response) {
    console.log(response.data);
    //Make a variable of the value wanted from the first api call
    for (var i = 0; i < response.data.length; i ++) {
        // use jquery to append or add fullName to modal
       var parkName= response.data[i].fullName;
       // store park code or if possible assign it as a value to the fullName
       //if so, I can then do a separate fetch on the click that uses the parkCode to extract needed data
       var parkCode=response.data[i].parkCode;
       $('#park').append(`<option value="${parkCode}"> ${parkName}</option>`); 
       console.log(parkName, parkCode);
     // }
    }
  })
};

 var getDataPoints= function() {
    var selectPark = document.getElementById("park");
    var chosenPark= selectPark.value;
  
  
    var url= 'https://developer.nps.gov/api/v1/parks?parkCode=' + chosenPark + '&api_key=yCwb05JC1ccmoZ4jFHTMcbiQIa3pV5MAeI22MlmG';
    fetch(url).then(function(response) {
        // Pass the data from the first fetch
        return response.json(); 
        }).then(function(response) {
        console.log(response.data[0]);

  //// Use the park code to get the data points
  var hours = response.data[0].operatingHours;
  var description= response.data[0].descripion;
  var directionsInfo= response.data[0].directionsInfo;
  var directionsUrl= response.data[0].directionsUrl;
  //city to plug into the weather API
  var city= response.data[0].addresses[0].city;
  
  console.log(hours, description, directionsInfo, directionsUrl, city);
})
};

//modal open on change of select menu
$("#park").change(function() {
    $(".modal").addClass("is-active");
    //when modal opens call functions to fetch and display weather data
    getCurrentWeather();
    displayCurrentWeather();

});
//modal close
$("#modalClose").on("click", function() {
    $(".modal").removeClass("is-active");
});

//fetch data from API for current weather
var getCurrentWeather = function(city) {
    console.log(1);
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=046dddbb0aa4d31febc4e77558997908";

    fetch(apiUrl)
    .then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayCurrentWeather(data, city);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
};
//display current conditions
var displayCurrentWeather = function(data) {
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    document.querySelector("#currentConditions").innerHTML = `
        <p>Temperature: ${temp} °F<p>
        <p>Humidity: ${humidity} %<p>
        <p>Wind Speed: ${windSpeed} MPH<p>
        `;
};
  
