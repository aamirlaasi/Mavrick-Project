// This file contains the script necessary to pull
// and push the data for the Mavrick Project1
// --------------------------------------------------------

// Create glocal variables here
// ------------------------------------------------

var weather = {
	skyConditions: "",
	wind : "",
	visibility: "",
	temperature : ""
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
			weather.wind = results.Translations.Wind;
			weather.visibility = results.Translations.Visibility;
			weather.temperature = results.Translations.Temperature;
			// Testing
			// -------------------------
			console.log(weather.skyConditions);
			console.log(weather.wind);
			console.log(weather.visibility);
			console.log(weather.temperature);
			// -------------------------
			// Create or assign divs and push to html
			
		})
}

// Testing
// ------------------------------------------------
// define the link to be used
var link = "https://avwx.rest/api/metar/KIAH?options=info,translate";
// Cal avwx API
avwx(link);
// This is testing only. Function will be incorporated into
// on click event when search is submitted.



// Execute the main code here
// -------------------------------------------------


