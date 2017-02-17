console.log(d3);

d3.queue()
	.defer(d3.csv,'./data/hubway_trips_reduced.csv',parseTrips)
	.defer(d3.csv,'./data/hubway_stations.csv',parseStations)
	.await(dataLoaded);

function dataLoaded(err,trips,stations){

	var cf = crossfilter(trips);
	var tripsByStartTime = cf.dimension(function(d){return d.startTime});

	//Time series module
	d3.select('#plot1').datum(tripsByStartTime.top(Infinity))
		.call(Timeseries());

	//Pie chart module: showing user type breakdown
	// Create instance of a piechart

	var piechartByUserType = piechart(); // function(selection){}
	d3.select('#plot2').datum(tripsByStartTime.top(Infinity)).call(piechartByUserType);
	d3.select('#plot3').datum(tripsByGender.top(Infinity)).call(piechartByGendere);
	// selection. call(function) === function(selection);

	//Pie chart module: showing user gender breakdown


	//UI module
	var startStationList = stationlist()
			.on('update',function(id){
				console.log(id);
			});
	d3.select('#startStation').datum(stations).call(stationList);
	var endStationList = stationlist();
	d3.select('#endStation').datum(stations).call(stationList);


	//How do you make them all communicate?

}

function parseTrips(d){
	return {
		bike_nr:d.bike_nr,
		duration:+d.duration,
		startStn:d.strt_statn,
		startTime:parseTime(d.start_date),
		endStn:d.end_statn,
		endTime:parseTime(d.end_date),
		userType:d.subsc_type,
		userGender:d.gender?d.gender:undefined,
		userBirthdate:d.birth_date?+d.birth_date:undefined
	}
}

function parseStations(d){
	return {
		id:d.id,
		lngLat:[+d.lng,+d.lat],
		city:d.municipal,
		name:d.station,
		status:d.status,
		terminal:d.terminal
	}
}

function parseTime(timeStr){
	var time = timeStr.split(' ')[1].split(':'),
		hour = +time[0],
		min = +time[1],
		sec = +time[2];

	var	date = timeStr.split(' ')[0].split('/'),
		year = date[2],
		month = date[0],
		day = date[1];

	return new Date(year,month-1,day,hour,min,sec);
}
