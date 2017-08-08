// functions for the retrevial of flight information status
//

var flightData =
{
	airline: "",
	departure: "",
	arrival: "",
	arrivalTime: moment(),
	status: "",
	load: function(argAirline,argDept,argArriv,argTime,argZone,argStatus){
		this.airline = argAirline;
		this.departure = argDept;
		this.arrival = argArriv;
		this.arrivalTime = moment.unix(argTime);
		console.log(this.arrivalTime.format("dddd, MMMM Do YYYY, h:mm:ss a"));
		if(argStatus == "En"){
			this.status="Enroute";
		}
		else{
			this.status = argStatus;
		}
	},
	writeToHTML: function(){
		// output to DOM
		$('#airline').text(this.airline);
		$('#departure').text(this.departure);
		$('#destination').text(this.arrival);
		var timeString = this.arrivalTime.format("ddd, MMM Do , h:mm");
		$('#arrivaltime').text(timeString);
		$('#status').text(this.status);
	}

}

function retrieveFlightStatus(flightInput){
	//AJAX
	// var username = 'Meternx01';
	// var apiKey = 'a7bca5b55eff4c03b9e4c8adebfdf3533420973d';
	// var baseFxmlUrl = 'https://' + username + ':' + apiKey +'@flightxml.flightaware.com/json/FlightXML3/';
	// var requestOptions = {
	// 			'ident': $('#ident_text').val(),
	// 			'howMany': 10
	// 		}
	$.ajax({
		url: 'https://watson-easy.herokuapp.com/flights',
		data: {
			args:{
				'ident': flightInput,
				'howMany': 10
			}
		},
		type: 'POST',
		dataType: 'JSON'
	}).done(function(response) {
		console.log(response);
		//					document.write(JSON.stringify(data));
		if (response.error) {
			console.log('Failed to fetch flight: ' + response.error);
			return;
		}
		var i =0;
		var found = false
		var flightArray = response.FlightInfoStatusResult.flights;
		// response.FlightInfoStatusResult.flights.forEach(flight => {
		while(i < flightArray.length && !found){
			// Check for flight that has actually departed
			if (flightArray[i].actual_departure_time.epoch > 0) {
				// Display basic information about the flight
				flightData.load(flightArray[i].airline,flightArray[i].origin.airport_name,flightArray[i].destination.airport_name,flightArray[i].estimated_arrival_time.epoch,flightArray[i].estimated_arrival_time.tz,flightArray[i].status)
				// Display the route
				//console.log("Flight: " + JSON.stringify(flight));
				console.log(flightData);
				found = true ;
			}
			else{
				i++;
			}
		};
		flightData.writeToHTML();
	});
}
$("#btn_search").on("click", function(event) {
	// Only run this code if there is something in the input box
	//if(searchValue!== "") {
		// // This line grabs the input from the search box
		// var searchValue = $("#searchInput").val().trim();
		// // Construct a URL to search for the airport selected
		// var queryURL = "https://avwx.rest/api/metar/" +
		// 				searchValue + "?options=info,translate";
		// Get weather information and push to html
		retrieveFlightStatus($("#searchInput").val().trim());
		// Get the iframe
		// iFrame(weather.latitude, weather.longitude);
	// };
});
