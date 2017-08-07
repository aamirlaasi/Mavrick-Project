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
	iata : ""
};

console.log(airports3[0]);

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
			console.log(results)
			// Store the relevant data that will be displayed in the
			// weather results div
			weather.skyConditions = results.Translations.Clouds;
			weather.skyConditions = weather.skyConditions.replace("- Reported AGL","");
			weather.wind = results.Translations.Wind;
			weather.visibility = results.Translations.Visibility;
			weather.temperature = results.Translations.Temperature;
			weather.iata = results.Info.IATA;
			console.log(weather.iata);
			// Push the above to html
			$("#skyCondition").text(weather.skyConditions);
			$("#wind").text(weather.wind);
			$("#visibility").text(weather.visibility);
			$("#temperature").text(weather.temperature);		
		})
}

// Autocomplete function for city name
// Also used to get corresponding icao
$(function() {
    var data = airports3;
    // Below is the name of the textfield that will be autocomplete    
    $('#searchInput').autocomplete({
        // This shows the min length of charcters that must be typed before the autocomplete looks for a match.
        minLength: 2,
		source: $.map(data, function (item) {
                return {
                    label: item.name,
                    value: item.icao
                }
	    }),
	    search: function(event,ui){
	    	$('#searchInput').on("autocompletesearch", function(event,ui){});
	    }  

        // focus: function(event, ui) {
            // $('#searchInput').val(ui.item.city);
            // return false;
        // },
        // Once a value in the drop down list is selected, do the following:
        // select: function(event, ui) {
            // place the person.given_name value into the textfield called 'select_origin'...
            // $('#searchInput').val(ui.item.city);
            // and place the person.id into the hidden textfield called 'link_origin_id'. 
            // $('#link_origin_id').val(ui.item.id);
                // return false;
        // }
    });
});


// IATA API call to get all the airports in a city
// along with the IATA codes
// CORS error occuring here
// var x = "https://iatacodes.org/api/v6/autocomplete?api_key=a897c6ca-ea9d-4b44-bc82-e6b5c90ef9f8&query=houston";
// console.log(x);
// function IATA(link) {
    // Create ajax call for new search item
//     $.ajax({
//         url: link,
//         method: "GET"
//     })
//         // After the data comes back from the API
//         .done(function(res){
//             console.log(res);
//         })
        
//     };

// IATA(x);

// Testing
// ------------------------------------------------
// define the link to be used
// var link = "https://avwx.rest/api/metar/KIAH?options=info,translate";
// Cal avwx API
// avwx(link);
// This is testing only. Function will be incorporated into
// on click event when search is submitted.



// Execute the main code here
// -------------------------------------------------

// Event listener for search button being clicked

var main_function = function(event) {
	
}

$("#btn_search").on("click", function(event) {
	// Only run this code if there is something in the input box
	if(searchValue!== "") {
		// This line grabs the input from the search box
		var searchValue = $("#searchInput").val().trim();
		console.log(searchValue);
		// Construct a URL to search for the airport selected 
		var queryURL = "https://avwx.rest/api/metar/" +
						searchValue + "?options=info,translate";
		console.log(queryURL);
		// Get weather information and push to html
		avwx(queryURL);
	};
});

// Event listener for enter button being pressed.
$("#searchInput").on("keypress", function(event) {
	// Only run this code if there is something in the input box
	// and if enter is pressed
	if(searchValue!== "" & event.keyCode ===13) {
		// This line grabs the input from the search box
		var searchValue = $("#searchInput").val().trim();
		console.log(searchValue);
		// Construct a URL to search for the airport selected 
		var queryURL = "https://avwx.rest/api/metar/" +
						searchValue + "?options=info,translate";
		console.log(queryURL);
		// Get weather information and push to html
		avwx(queryURL);
	};
});



