// Here we put our variables 
// ========================


// ====================


// Here we put any Function
// Here we create the function to give us the Iframe 
// Function takes two argument (latitude,longtiude)
function iFrame(latitude,longtiude) {
	// body...
	// We create a jQuery iframe
	var frame = $('<iframe>')
	// forming a source for the iFrame
	frame.attr("src","https://opensky-network.org/iframe?c="+latitude+","+longtiude+"&z=13width="+"9500px"+"height=1750px" )
	// posted into a div
	$('body').html(frame);
				};
				// running this function for test 
		iFrame(60.332231,75.332231);
