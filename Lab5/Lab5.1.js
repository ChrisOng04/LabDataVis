var w = 500;
var h = 200;
var barPadding = 0.1; // Will use paddingInner for better spacing

// Initial dataset
var dataset = [14, 5, 26, 23, 9]; 

// Scales
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(barPadding);  // Using paddingInner for spacing

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([h, 0]);

// Create the SVG
var svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Create bars
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) { return xScale(i); })
    .attr("y", function(d) { return yScale(d); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return h - yScale(d); })
    .attr("fill", "limegreen");

// Add labels
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return xScale(i) + xScale.bandwidth() / 2; })
    .attr("y", function(d) { return yScale(d) + 15; })
    .attr("fill", "black")
    .attr("text-anchor", "middle");

// Function to update the data
function updateData() {
    // Generate a new random dataset
    dataset = d3.range(5).map(function() { return Math.floor(Math.random() * 25); });

    // Update the scales
    yScale.domain([0, d3.max(dataset)]);

    // Update bars
    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(500)
        .attr("y", function(d) { return yScale(d); })
        .attr("height", function(d) { return h - yScale(d); });

    // Update labels
    svg.selectAll("text")
        .data(dataset)
        .transition()
        .duration(500)
        .text(function(d) { return d; })
        .attr("y", function(d) { return yScale(d) + 15; });
}
