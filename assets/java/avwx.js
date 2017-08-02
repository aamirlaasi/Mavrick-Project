// This file contains the script necessary to pull
// and push the data for the Mavrick Project1
// --------------------------------------------------------

// Create glocal variables here
// ------------------------------------------------


// Create functions here
// -------------------------------------------------
// Function for https://avwx.rest API AJAX GET request

function avwx(link) {
	$.ajax({
		url: link,
		method: "GET"
	})
		// After the data comes back from the API
		.done(function(res){
			// Storing an array of results in the results variable
			var results = res.data;

		})
}

// Execute the main code here
// -------------------------------------------------

