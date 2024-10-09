// Data for the stacked bar chart
var dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 }
];

// Set up the dimensions of the SVG
var width = 500;
var height = 300;
var margin = { top: 20, right: 20, bottom: 30, left: 40 };

// Create the SVG container
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set up the stack generator
var series = d3.stack()
    .keys(["apples", "oranges", "grapes"])
    (dataset);

// Set up the scales
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, width])
    .padding(0.1);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.apples + d.oranges + d.grapes)])
    .nice()
    .range([height, 0]);

// Set up the color scale
var color = d3.scaleOrdinal()
    .domain(["apples", "oranges", "grapes"])
    .range(["#FF3333", "#FF9E33", "#D733FF"]);

// Draw the groups for each series
var groups = svg.selectAll("g.series")
    .data(series)
    .enter()
    .append("g")
    .attr("fill", (d, i) => color(i));

// Draw the rectangles for the stacked bar chart
groups.selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d[1]))
    .attr("height", d => yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth());
