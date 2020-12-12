//Restart here
// set the variable for user selected state 
//then use the api to insert the user selected state address + state + api key etc
//use that to identify the parks in the state
//then rerun it to pull the data fields

//function to collect user selected state and fetch parks in that state
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
    $('#park').append(`<option>Select Park</option>`);
    for (var i = 0; i < response.data.length; i ++) {
        if (response.data[i].designation === "National Park" || 
            response.data[i].designation === "National Preserve" || 
            response.data[i].designation === "National Historical Park" ||
            response.data[i].designation === "National Park & Preserve") {
            // use jquery to append or add fullName to modal
            var parkName= response.data[i].fullName;
            // store park code or if possible assign it as a value to the fullName
            //if so, I can then do a separate fetch on the click that uses the parkCode to extract needed data
            var parkCode=response.data[i].parkCode;
            $('#park').append(`<option value="${parkCode}"> ${parkName}</option>`); 
            console.log(parkName, parkCode);
        }
    }
  })
};
//function to get park data from user selected park
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
        var hourDetails = response.data[0].operatingHours[0].description;
        var hoursMo = response.data[0].operatingHours[0].standardHours.monday;
        var hoursTu = response.data[0].operatingHours[0].standardHours.tuesday;
        var hoursWe = response.data[0].operatingHours[0].standardHours.wednesday;
        var hoursTh = response.data[0].operatingHours[0].standardHours.thursday;
        var hoursFr = response.data[0].operatingHours[0].standardHours.friday;
        var hoursSa = response.data[0].operatingHours[0].standardHours.saturday;
        var hoursSu = response.data[0].operatingHours[0].standardHours.sunday;
        var description= response.data[0].description;
        var directionsInfo= response.data[0].directionsInfo;
        var directionsUrl= response.data[0].directionsUrl;
        var displayedParkName = response.data[0].fullName;
        //append park name to modal title
        $('.modal-card-title').html(displayedParkName);
        //save park name to local storage
        localStorage.setItem("parkName", displayedParkName);
        //city to plug into the weather API
        var city= response.data[0].addresses[0].city;
        console.log("city:", city);
        console.log(hourDetails, description, directionsInfo, directionsUrl, city);
        //input data into modal divs
        $('#parkHours').html(`<strong>Hours:</strong><br>
        Monday: ${hoursMo} <br>
        Tuesday: ${hoursTu}<br>
        Wednesday: ${hoursWe}<br>
        Thursday: ${hoursTh}<br>
        Friday: ${hoursFr}<br>
        Saturday: ${hoursSa}<br>
        Sunday: ${hoursSu}<br><br> Additional Hours Information:<br> ${hourDetails}`);
        $('#description').html(`<strong>Description:</strong> <br> ${description}`);
        $('#directions').html(`<strong>Directions:</strong> <br> ${directionsInfo} <br> <a href=${directionsUrl}>${directionsUrl}</a>`);
        
        //call weather function with city from fetched data 
        getCurrentWeather(city);
        getForecast(city);
    })
    var url= 'https://developer.nps.gov/api/v1/alerts?parkCode=' + chosenPark + '&api_key=yCwb05JC1ccmoZ4jFHTMcbiQIa3pV5MAeI22MlmG';
    fetch(url).then(function(response) {
        // Pass the data from the first fetch
        return response.json(); 
        }).then(function(response) {
            console.log(response);
            if (response) {
                var alertType = response.data[0].category;
                var alertDescription = response.data[0].description;
                console.log(alertType, alertDescription);
                $("#alerts").html(`<strong>Alerts:</strong><br>Alert Type: ${alertType}<br>Alert Description: ${alertDescription}`)
            } else {
                //$("#alerts").html(`<strong>Alerts:</strong><br>No alerts available for this park.`)
                return;
            }
        });
        //fetch data from API for current weather using city from park api data
        var getCurrentWeather = function(city) {
        //console.log(1);
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=046dddbb0aa4d31febc4e77558997908";

        fetch(apiUrl)
        .then(function(response) {
            //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    //console.log(data);
                    displayCurrentWeather(data, city);
                });
            } else {
                $('#currentConditions').html("Weather cannot be displayed for this park.");
            }
        })
    };
    //get 5 day weather
    var getForecast = function(city) {
        console.log(2);
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&units=imperial&appid=046dddbb0aa4d31febc4e77558997908";
    
        fetch(apiUrl)
        .then(function(response) {
            //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log("5day", data);
                    displayForecast(data, city);
                });
            } else {
                console.log("Invalid weather fetch");
                $('#fiveDayWeather').html("Weather cannot be displayed for this park.");
            }
        })
    };
    $("#park").val("");
};

//modal open on change of select menu
$("#park").change(function() {
    $(".modal").addClass("is-active");
    $('#park').html('');

});
//modal close
$("#modalClose").on("click", function() {
    $(".modal").removeClass("is-active");
});

//display current conditions
var displayCurrentWeather = function(data) {
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    document.querySelector("#currentConditions").innerHTML = `
        <strong>Current Weather Conditions:</strong>
        <br>
        <p>Temperature: ${temp} °F<p>
        <p>Humidity: ${humidity} %<p>
        <p>Wind Speed: ${windSpeed} MPH<p>
        `;
};
//display forecast data
var displayForecast = function(data) {
    for (var i = 0; i < data.list.length; i++) {
        let dayCard = document.createElement("div");
        //dayCard.className = "card";
        var date = moment().add(parseInt([i]), 'day').format('MM/DD/YYYY');
        console.log(date);
        var temp = data.list[i].main.temp;
        var humidity = data.list[i].main.humidity;
        console.log(temp, humidity);
        dayCard.innerHTML = `
        <h3>${date}</h3>
        <p>Temperature: ${temp}°F<p>
        <p>Humidity: ${humidity}%<p><br>`;
        $('#fiveDayWeather').append(dayCard);
    }
};
//function to load last park searched        
var recentSearch = function() {
    let lastParkSearched = localStorage.getItem("parkName");
    console.log(lastParkSearched);
    $("#searchedPark").html(lastParkSearched);
}
//onload call of function to display last searched park
window.onload = recentSearch();