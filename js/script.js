
/* BAR GRAPH DEMO */
//data we're inputting
var data = [{year: 2006, books: 54},
			{year: 2007, books: 43},
			{year: 2008, books: 41},
			{year: 2009, books: 44},
			{year: 2010, books: 35}];

//Setting height and width of bars + graph
var barWidth = 40;
var width = (barWidth + 10) * data.length;
var height = 200;
// scale.linear evenly distributes across the width and height based on how much data
var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
var y = d3.scale.linear().domain([0, d3.max(data, function(datum) {return datum.books;})]).rangeRound([0, height]);

// add the canvas to the DOM
var barDemo = d3.select("#bar-demo").
  append("svg:svg").
  attr("width", width).
  attr("height", height);

barDemo.selectAll("rect").
  data(data).
  enter().
  append("svg:rect").
  attr("x", function(datum, index) { return x(index); }).
  attr("y", function(datum) { return height - y(datum.books); }).
  attr("height", function(datum) { return y(datum.books); }).
  attr("width", barWidth).
  attr("fill", "#2d578b");

barDemo.selectAll("text").
  data(data).
  enter().
  append("svg:text").
  attr("x", function(datum, index) { return x(index) + barWidth; }).
  attr("y", function(datum) { return height - y(datum.books); }).
  attr("dx", -barWidth/2).
  attr("dy", "1.2em").
  attr("text-anchor", "middle").
  text(function(datum) { return datum.books;}).
  attr("fill", "white");

barDemo.selectAll("text.yAxis").
  data(data).
  enter().append("svg:text").
  attr("x", function(datum, index) { return x(index) + barWidth; }).
  attr("y", height).
  attr("dx", -barWidth/2).
  attr("text-anchor", "middle").
  attr("style", "font-size: 12; font-family: Helvetica, sans-serif").
  text(function(datum) { return datum.year;}).
  attr("transform", "translate(0, 18)").
  attr("class", "yAxis");

/* LINE GRAPH DEMO */
/* implementation heavily influenced by http://bl.ocks.org/1166403 */
	
	// define dimensions of graph
	var m = [80, 80, 80, 80]; // margins
	var w = 1000 - m[1] - m[3]; // width
	var h = 400 - m[0] - m[2]; // height
	
	// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
	var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7];

	// X scale will fit all values from data[] within pixels 0-w
	var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
	// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
	var y = d3.scale.linear().domain([0, 10]).range([h, 0]);
		// automatically determining max range can work something like this
		// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

	// create a line function that can convert data[] into x and y points
	var line = d3.svg.line()
		// assign the X function to plot our line as we wish
		.x(function(d,i) { 
			// verbose logging to show what's actually being done
			console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
			// return the X coordinate where we want to plot this datapoint
			return x(i); 
		})
		.y(function(d) { 
			// verbose logging to show what's actually being done
			console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
			// return the Y coordinate where we want to plot this datapoint
			return y(d); 
		})

		// Add an SVG element with the desired dimensions and margin.
		var graph = d3.select("#graph").append("svg:svg")
		      .attr("width", w + m[1] + m[3])
		      .attr("height", h + m[0] + m[2])
		    .append("svg:g")
		      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

		// create yAxis
		var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
		// Add the x-axis.
		graph.append("svg:g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + h + ")")
		      .call(xAxis);


		// create left yAxis
		var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
		// Add the y-axis to the left
		graph.append("svg:g")
		      .attr("class", "y axis")
		      .attr("transform", "translate(-25,0)")
		      .call(yAxisLeft);
		
			// Add the line by appending an svg:path element with the data line we created above
		// do this AFTER the axes above so that the line is above the tick-lines
			graph.append("svg:path").attr("d", line(data));

/* JQUERY FOR SCROLLING OVER IMAGES */
$(document).ready(function() {

	/* This is for the first set of images */

	$('.playerimg').hover(makeBigger, returnToOriginalSize);

	function makeBigger() {
	    $(this).css({height: '+=1%', width: '+=1%'});
	}
	function returnToOriginalSize() {
	    $(this).css({height: "", width: ""});
	}

	/* This is for the second set of images */

	var openGif = $(".playerimg2").attr("src");
	var closedGif = openGif.replace("../images/baberuth2.png", "../images/baberuthtext.svg");
	$(".playerimg2")
    .mouseover(function() { 
        $(this).fadeOut(function(){
            $(this).attr("src", closedGif);
            $(this).fadeIn();
        });
    })
    .mouseout(function() {
        $(this).fadeOut(function(){
            $(this).attr("src", openGif);
            $(this).fadeIn();
        });
    });
});
