jQuery(function($) {
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
fetch("https://developer.nps.gov/api/v1/parks?limit=600")
.then()

//on change fetch parks by state code 
//populate drop down with park names and value = park code
//fetch info by parkcode