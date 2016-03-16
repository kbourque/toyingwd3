/* THE FOLLOWING DEMOS ARE FROM D3 FOR MERE MORTALS */

/* RECTANGLE DEMO */
var rectDemo = d3.select("#rect-demo").
  append("svg:svg").
  attr("width", 400).
  attr("height", 300);

rectDemo.append("svg:rect").
  attr("height", 100).
  attr("width", 200);

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

