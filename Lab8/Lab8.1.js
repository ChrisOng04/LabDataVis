// Set the dimensions of the SVG
var width = 800;
var height = 600;

// Define the Mercator projection
var projection = d3.geoMercator()
    .center([145, -36.5]) // Center the map on Victoria, Australia
    .translate([width / 2, height / 2]) // Center the projection in the SVG
    .scale(3000); // Adjust the scale to get a better view

// Define the geoPath using the projection
var path = d3.geoPath().projection(projection);

// Create the SVG element
var svg = d3.select("#map-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load the GeoJSON data
d3.json("https://raw.githubusercontent.com/ChrisOng04/LabDataVis/refs/heads/main/Lab8/LGA_VIC.json").then(function (json) {
    console.log("GeoJSON data loaded successfully:", json); // Log the GeoJSON data to ensure it loads properly
    // Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "lightgrey")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5);
}).catch(function (error) {
    console.error("Error loading the GeoJSON file:", error); // Improved error handling
});
