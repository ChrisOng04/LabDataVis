// SVG and Dataset Configuration
var w = 500; // Width of the SVG
var h = 200; // Height of the SVG
var barPadding = 3; // Padding between bars in the chart

var dataset = [14, 5, 26, 23, 9]; // Initial dataset

// Create an SVG element in the body
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Create a linear scale for the bar height based on the dataset values
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

// Function to draw the bar chart
function drawBars(transitionType = null) {
    // Bind data to rectangles (bars)
    var rects = svg.selectAll("rect")
        .data(dataset);

    // Update existing bars or append new ones
    rects.enter()
        .append("rect")
        .merge(rects)
        .attr("x", function (d, i) {
            return i * (w / dataset.length); // Calculate x position based on index
        })
        .attr("width", w / dataset.length - barPadding) // Bar width
        .attr("fill", "rgb(50, 205, 50)") // Bar color
        .attr("y", h) // Start from the bottom of the SVG
        .attr("height", 0); // Start with zero height

    // If transition is provided, apply it to the bars
    if (transitionType) {
        rects.transition()
            .duration(2000) // Transition duration
            .ease(transitionType) // Transition easing function
            .attr("y", function (d) {
                return h - yScale(d); // Set y position based on data value
            })
            .attr("height", function (d) {
                return yScale(d); // Set bar height based on data value
            });
    } else {
        // No transition, just set y position and height
        rects.attr("y", function (d) {
            return h - yScale(d);
        })
            .attr("height", function (d) {
                return yScale(d);
            });
    }

    // Remove any excess bars
    rects.exit().remove();

    // Create or update text labels for the bars
    var labels = svg.selectAll("text")
        .data(dataset);

    // Append new labels or update existing ones
    labels.enter()
        .append("text")
        .merge(labels)
        .text(function (d) {
            return d; // Set text to the data value
        })
        .attr("x", function (d, i) {
            return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2; // Center text above bars
        })
        .attr("text-anchor", "middle") // Center the text horizontally
        .attr("y", h + 15); // Start below the SVG

    // Apply transition to text labels if specified
    if (transitionType) {
        labels.transition()
            .duration(2000) // Duration of transition
            .ease(transitionType) // Easing function for labels
            .attr("y", function (d) {
                return h - yScale(d) + 15; // Set y position for labels
            });
    } else {
        // No transition, just set y position
        labels.attr("y", function (d) {
            return h - yScale(d) + 15;
        });
    }

    // Remove any excess labels
    labels.exit().remove();
}

// Function to update the dataset with new random values and redraw the chart
function updateData() {
    dataset = []; // Reset the dataset
    var numBars = Math.floor(Math.random() * 10) + 3; // Generate a random number of bars (between 3 and 12)
    for (var i = 0; i < numBars; i++) {
        var newNumber = Math.floor(Math.random() * 25) + 1; // Generate random data between 1 and 25
        dataset.push(newNumber); // Add data to the dataset
    }

    // Update the y-scale domain based on the new dataset
    yScale.domain([0, d3.max(dataset)]);

    // Redraw the bars with the updated dataset without transition
    drawBars();
}

// Function to apply Elastic Out easing transition to the bars
function transitionType1() {
    drawBars(d3.easeElasticOut); // Redraw bars with Elastic Out easing
}

// Function to apply Circle Out easing transition to the bars
function transitionType2() {
    drawBars(d3.easeCircleOut); // Redraw bars with Circle Out easing
}

// Initial drawing of the bar chart
drawBars();
