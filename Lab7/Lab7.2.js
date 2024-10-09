// Step 1: Set up the data
var dataset1 = [45, 25, 20, 10, 6, 5];

// Set the width and height of the SVG canvas
var w = 300;
var h = 300;
var outerRadius = w / 2;
var innerRadius = 50;

// Create an SVG element and append it to the chart div
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Step 2: Set up the pie chart parameters
var arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

var pie = d3.pie();

// Step 3: Set up the arcs
var arcs = svg.selectAll("g.arc")
    .data(pie(dataset1))  // Use pie function to generate angles
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

// Step 4: Draw the arcs and add color
var color = d3.scaleOrdinal(d3.schemePastel1);

arcs.append("path")
    .attr("fill", function (d, i) {
        return color(i);  // Fill color based on index
    })
    .attr("d", arc);  // Generate the path for each arc

// Step 5: Add text labels
arcs.append("text")
    .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";  // Position text
    })
    .text(function (d) {
        return d.data;  // Display the data value in each slice
    });
