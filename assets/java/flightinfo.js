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
		this.arrivalTime = moment.tz(argTime,argZone);
		if(argStatus == "En"){
			this.status="Enroute";
		}
		else{
			this.status = argStatus;
		}
	}
	wirteToHTML: function(){
		// output to DOM
		$('#airline').text = this.airline;
		$('#departure').text = this.departure
		$('#destination').text = this.arrival
		$('#arrivalTime').text = moment.format(this.arrivalTime,"ddd"

	}

}

function retrieveFlightStatus(flightInput){
	//AJAX
	var username = 'Meternx01';
	var apiKey = 'a7bca5b55eff4c03b9e4c8adebfdf3533420973d';
	var baseFxmlUrl = 'https://' + username + ':' + apiKey +'@flightxml.flightaware.com/json/FlightXML3/';
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
//					document.write(JSON.stringify(data));
					if (data.error) {
						console.log('Failed to fetch flight: ' + data.error);
						return;
					}
					data.FlightInfoStatusResult.flights.forEach(flight => {
						// Check for flight that has actually departed
						if (flight.actual_departure_time.epoch > 0) {
							// Display basic information about the flight
							flightData.load(flight.airline,flight.origin.airport_name,flight.destination.airport_name,flight.estimated_arrival_time.epoch,flight.estimated_arrival_time.tz,flight.status)
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
}