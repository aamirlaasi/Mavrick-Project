// This file contains the script necessary to pull
// and push the data for the Mavrick Project1
// --------------------------------------------------------

// Create glocal variables here
// ------------------------------------------------

// Create variables for all the weather data
var weather = {
	skyConditions: "",
	wind : "",
	visibility: "",
	temperature : "",
	latitude: "",
	longitude: ""
};

// Create functions here
// -------------------------------------------------
// Function for https://avwx.rest API AJAX GET request
// link: https://avwx.rest/api/metar/KIAH?options=info,translate
// Lookup key is by ICAO
function avwx(link) {
	// Create ajax call for new search item
	$.ajax({
		url: link,
		method: "GET"
	})
		// After the data comes back from the API
		.done(function(res){
			// Storing an array of results in the results variable
			var results = res;
			// Store the relevant data that will be displayed in the
			// weather results div
			weather.skyConditions = results.Translations.Clouds;
			weather.skyConditions = weather.skyConditions.replace("- Reported AGL","");
			weather.wind = results.Translations.Wind;
			weather.visibility = results.Translations.Visibility;
			weather.temperature = results.Translations.Temperature;
			// Push the above to html
			$("#skyCondition").text(weather.skyConditions);
			$("#wind").text(weather.wind);
			$("#visibility").text(weather.visibility);
			$("#temperature").text(weather.temperature);		
		})
}

// Autocomplete function for city name
// Also used to get corresponding icao and latitude/longitude
$(function() {
    var data = airports3;
    // Below is the name of the textfield that will be autocomplete    
    $('#searchInput').autocomplete({
        // This shows the min length of charcters that must be typed before the autocomplete looks for a match.
        minLength: 2,
        // Define the data to be used.
        // map method is used to perform function on every value in the array  
		source: $.map(data, function (item) {
                return {
                	// The label property is displayed in the suggestions menu
                    label: item.name,
                    // The value will be inserted into the input element when a user selects an item
                    value: item.icao,
                    // Create values for longitude and latitude to pass to iFrame
                    value1: item.lon,
                    value2: item.lat
                }
	    }),
	    // Initialize the autocomplete with the search callback specified
	    search: function(event,ui){
	    	// Bind an event listener to the autocompletesearch event
	    	$('#searchInput').on("autocompletesearch", function(event,ui){});
	    }, 
        // Once a value in the drop down list is selected, do the following:
        select: function(event, ui) {
        	// Put the selected value in the search box
        	$('#searchInput').val(ui.item.value);
            // Save the longitude and latitude values
            weather.longitude = ui.item.value1;
            weather.latitude = ui.item.value2;
            return false;
        }
    });
});

// Here we create the function to give us the Iframe 
// Function takes two argument (latitude,longtiude)
function iFrame(latitude,longtiude) {
	// We create a jQuery iframe
	var frame = $('<iframe>');
	// forming a source for the iFrame
	frame.attr("src","https://opensky-network.org/iframe?c="+latitude+","+longtiude+"&z=13width="+"100%"+"height=100%" );
	frame.attr("width","100%");
	frame.attr("height","450");
	// posted into a div
	$('#map_opensky').html(frame);	
};


// Execute the main code here
// -------------------------------------------------

// Event listener for search button being clicked

$("#btn_search").on("click", function(event) {
	// Only run this code if there is something in the input box
	if(searchValue!== "") {
		// This line grabs the input from the search box
		var searchValue = $("#searchInput").val().trim();
		// Construct a URL to search for the airport selected 
		var queryURL = "https://avwx.rest/api/metar/" +
						searchValue + "?options=info,translate";
		// Get weather information and push to html
		avwx(queryURL);
		// Get the iframe
		iFrame(weather.latitude, weather.longitude);
	};
});

// Event listener for enter button being pressed.
$("#searchInput").on("keypress", function(event) {
	// Only run this code if there is something in the input box
	// and if enter is pressed
	if(searchValue!== "" & event.keyCode ===13) {
		// This line grabs the input from the search box
		var searchValue = $("#searchInput").val().trim();
		// Construct a URL to search for the airport selected 
		var queryURL = "https://avwx.rest/api/metar/" +
						searchValue + "?options=info,translate";
		// Get weather information and push to html
		avwx(queryURL);
		// Get the iframe
		iFrame(weather.latitude, weather.longitude);
	};
});



