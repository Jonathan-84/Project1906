/*jQuery(function($) {
    var locations = {
        'Alaska': ['Denali National Park and Preserve', 'Gates of the Arctic National Park','Glacier Bay National Park', 'Katmai National Park and Preserve', 
        'Kenai Fjords National Park','Kobuk Valley National Park','Lake Clark National Park','Wrangell – St. Elias National Park and Preserve'],
        'California': ['Channel Islands National Park','Death Valley National Park','Joshua Tree National Park','Kings Canyon National Park',
        'Lassen Volcanic National Park','Redwood National Park', 'Sequoia National Park','Yosemite National Park'],
        'Utah': ['Arches National Park','Bryce Canyon National Park','Canyonlands National Park', 'Capitol Reef National Park','Zion National Park'],
        'Colorado': ['Black Canyon of the Gunnison National Park','Great Sand Dunes National Park and Preserve','Mesa Verde National Park',
        'Rocky Mountain National Park'],
        'Arizona': ['Grand Canyon National Park','Petrified Forest National Park','Saguaro National Park'],
        'Florida': ['Biscayne National Park','Dry Tortugas National Park', 'Everglades National Park'],
        'Washington': [	'Mount Rainier National Park','North Cascades National Park','Olympic National Park'],
        'Hawaii': ['Haleakala National Park','Hawaii Volcanoes National Park'],
        'South Dakota': ['Badlands National Park','Wind Cave National Park'],
        'Texas': ['Big Bend National Park','Guadalupe Mountains National Park'],
        'Wyoming': ['Grand Teton National Park','Yellowstone National Park'],
        'Arkansas': ['Hot Springs National Park'],
        'Kentucky': ['Mammoth Cave National Park'],
        'Maine': ['Acadia National Park'],
        'Michigan': ['Isle Royale National Park'],
        'Minnesota': ['Voyageurs National Park'],
        'Montana': ['Glacier National Park'],
        'Nevada': ['Great Basin National Park'],
        'New Mexico': ['Carlsbad Caverns National Park'],
        'North Carolina': ['Great Smoky Mountains National Park'],
        'North Dakota': ['Theodore Roosevelt National Park'],
        'Ohio': ['Cuyahoga Valley National Park'],
        'Oregon': ['Crater Lake National Park'],
        'South Carolina': ['Congaree National Park'],
        'Tennessee': ['Great Smoky Mountains National Park'],
        'Virginia': ['Virginia'],
        'American Samoa': ['National Park of American Samoa'],
        'US Virgin Islands': ['	Virgin Islands National Park'],

    }
    

    var $locations = $('#park');
    $('#state').change(function () {
        var country = $(this).val(), lcns = locations[country] || [];

        var html = $.map(lcns, function(lcn){
            return '<option value="' + lcn + '">' + lcn + '</option>'
        }).join('');
        $locations.html(html)
    });
});
*/
  //  return fetch('https://developer.nps.gov/api/v1/parks?parkCode&' + state + '&api_key=yCwb05JC1ccmoZ4jFHTMcbiQIa3pV5MAeI22MlmG');
  

//Restart here
// set the variable for user selected state 
//then use the api to insert the user selected state address + state + api key etc
//use that to identify the parks in the state
//then rerun it to pull the data fields
//let state = CA

//Attempted the pass through


//set up variables that hold the state choices and values from the main drop down
var selectOptions = document.getElementById("state");
var options= selectOptions.value;

//create a function that allows me to fetch the data, loop through it
//grab out the specific National Parks to putt in the modal
//if I can store away the parkCode for the onclick function that xtracts the datapoints
var parkOptions= function(state) {
var url = 'https://developer.nps.gov/api/v1/parks?stateCode=' + state + '&api_key=yCwb05JC1ccmoZ4jFHTMcbiQIa3pV5MAeI22MlmG';

fetch(url).then(function(response) {
    // Pass the data from the first fetch
    return response.json(); 
  }).then(function(response) {
    //console.log(response.data[0]);
    //Make a variable of the value wanted from the first api call
    for (var i = 0; i < response.data.length; i ++) {
      if (response.data[i].designation === "National Park") {
        // use jquery to append or add fullName to modal
       var parkName= response.data[i].fullName;
       // store park code or if possible assign it as a value to the fullName
       //if so, I can then do a separate fetch on the click that uses the parkCode to extract needed data
       var parkCode=response.data[i].parkCode;
       console.log(parkName, parkCode);
      }
    }
  })
}
// will be replaced by options var once built out
parkOptions('CA');


// onclick (coding quiz)--great inspiration
// separate fetch and get park code (function)
//call function in add event listener for button. 
var selectPark = document.getElementById("park");
var chosenPark= selectPark.value;
/*
var fetchParkCode= function(chosenPark) {
var url = 'https://developer.nps.gov/api/v1/parks?stateCode=' + state + '&api_key=yCwb05JC1ccmoZ4jFHTMcbiQIa3pV5MAeI22MlmG';

fetch(url).then(function(response) {
    // Pass the data from the first fetch
    return response.json(); 
  }).then(function(response) {
   // console.log(response.data[0]);
    //Make a variable of the value wanted from the first api call
    for (var i = 0; i < response.data.length; i ++) 
    {
      if (response.data[i].fullName === chosenPark) {
        // use jquery to append or add to modal
       var parkCode= response.data[i].parkCode;
       console.log(parkCode);
  
};
}
});
}
  fetchParkCode('Joshua Tree National Park');
*/
  var getDataPoints= function(parkOptions) {
var url= fetch('https://developer.nps.gov/api/v1/parks?parkCode&' + parkCode + '&api_key=yCwb05JC1ccmoZ4jFHTMcbiQIa3pV5MAeI22MlmG');
fetch(url).then(function(response) {
  // Pass the data from the first fetch
  return response.json(); 
}).then(function(response) {
  console.log(response.data[0]);

  //// Use the park code to get the data points
  var hours = response.data[0].operatingHours;
  var description= response.data[0].descripion;
  var directions= response.data[0].directionsInfo;
  //city to plug into the weather API
  var city= response.data[0].addresses.city;

  console.log(hours, description,directions,city);
})
  }