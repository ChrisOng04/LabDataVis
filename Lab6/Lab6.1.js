// Set width, height, and padding for the SVG element
var w = 500;
var h = 200;
var barPadding = 3;

// Initialize dataset for the bar chart
var dataset = [14, 5, 26, 23, 9];

// Create SVG element and append it to the body
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Define X scale (for positioning bars)
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length)) // Map data points to the scale
    .rangeRound([0, w]) // Scale range is the width of the SVG
    .paddingInner(0.05); // Spacing between bars

// Define Y scale (for bar height based on values)
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)]) // Domain is from 0 to the maximum value in the dataset
    .range([0, h]); // Scale range is the height of the SVG

// Create the initial bar chart using the dataset
var rects = svg.selectAll("rect")
    .data(dataset) // Bind data to rectangles
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i); // Position each bar based on X scale
    })
    .attr("y", function (d) {
        return h - yScale(d); // Set Y position based on data value
    })
    .attr("width", xScale.bandwidth()) // Set bar width based on X scale
    .attr("height", function (d) {
        return yScale(d); // Set bar height based on data value
    })
    .attr("fill", "rgb(50, 205, 50)") // Initial bar color (green)
    .on("mouseover", function (event, d) {
        d3.select(this)
            .attr("fill", "orange"); // Change color to orange on mouseover

        // Show tooltip inside the bar displaying the value
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) + 15; // Adjust position

        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition)
            .attr("y", yPosition)
            .attr("text-anchor", "middle")
            .attr("class", "tooltip")
            .text(d); // Display value inside the bar
    })
    .on("mouseout", function () {
        d3.select(this)
            .transition()
            .duration(500)
            .attr("fill", "rgb(50, 205, 50)"); // Transition back to green on mouseout

        d3.select("#tooltip").remove(); // Remove tooltip on mouseout
    });

// Function to add new data to the bar chart
function addData() {
    var newNumber = Math.floor(Math.random() * 25); // Generate random value (0-25)
    dataset.push(newNumber); // Add new value to the dataset

    // Update X and Y scales based on new dataset
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // Bind new data to rectangles
    rects = svg.selectAll("rect")
        .data(dataset);

    // Enter new elements for the new data
    rects.enter()
        .append("rect")
        .attr("x", w) // Start new bars off-screen
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", "rgb(50, 205, 50)") // Set initial color for new bars
        .merge(rects) // Merge new and old bars
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("fill", "orange"); // Change color on mouseover

            // Show tooltip with value inside the bar
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 15; // Adjust position

            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "middle")
                .attr("class", "tooltip")
                .text(d); // Display data value inside the bar
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", "rgb(50, 205, 50)"); // Transition back to green on mouseout

            d3.select("#tooltip").remove(); // Remove tooltip on mouseout
        })
        .transition()
        .duration(1000) // Animate the bars as they move into position
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        });
}

// Function to remove the first data element from the bar chart
function removeData() {
    dataset.shift(); // Remove the first element from the dataset

    // Update X and Y scales based on new dataset
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // Bind updated data to rectangles
    rects = svg.selectAll("rect")
        .data(dataset);

    // Exit and remove old bars (elements)
    rects.exit()
        .transition()
        .duration(1000)
        .attr("x", w) // Animate bars moving off-screen before removal
        .remove();

    // Update the remaining bars' positions
    rects.transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        });
}
