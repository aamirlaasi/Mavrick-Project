// functions for the retrevial of flight information status
//

function retrieveFlightStatus(flightInput){
	//AJAX
	var username = 'Meternx01';
	var apiKey = 'a7bca5b55eff4c03b9e4c8adebfdf3533420973d';
	var baseFxmlUrl = 'https://' + username + ':' + apiKey +'@flightxml.flightaware.com/json/FlightXML3/';
	$(document).ready(function() {
		$('#go_button').click(function() {
			var requestOptions = {
				'ident': $('#ident_text').val(),
				'howMany': 10
			}
			$.ajax({
				url: baseFxmlUrl + 'FlightInfoStatus',
				data: requestOptions,
				method: 'GET',
				jsonp: 'jsonp_callback',
				dataType: 'jsonp',
				success: function(data, txtStatus, xhr) {
					console.log(data);
					document.write(JSON.stringify(data));
					if (data.error) {
						console.log('Failed to fetch flight: ' + data.error);
						return;
					}
					data.FlightInfoStatusResult.flights.forEach(flight => {
						// Check for flight that has actually departed
						if (flight.actual_departure_time.epoch > 0) {
							// Display basic information about the flight
							$('#airline').text()
							// Display the route
							// fetchAndRenderRoute(flight.faFlightID);
							return ;
						}
					});
				},
				error: function(data, text) {
					console.log('Failed to decode route: ' + data);
				}
			});
		});
	});
}