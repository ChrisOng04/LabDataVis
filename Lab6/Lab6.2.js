// Define the width, height, and bar padding
var w = 500;
var h = 200;
var barPadding = 3;

// Initial dataset and sort flag
var dataset = [14, 5, 26, 23, 9];
var isAscending = true; // Flag to track sort order

// Select the SVG element
var svg = d3.select("#bar-chart");

// Define x and y scales
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

// Initial Bar Chart Rendering
var rects = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", function (d) {
        return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
        return yScale(d);
    })
    .attr("fill", "rgb(50, 205, 50)")
    .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");

        // Show value inside the bar
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) + 15;

        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition)
            .attr("y", yPosition)
            .attr("text-anchor", "middle")
            .attr("class", "tooltip")
            .text(d);
    })
    .on("mouseout", function () {
        d3.select(this).transition().duration(500).attr("fill", "rgb(50, 205, 50)");
        d3.select("#tooltip").remove();
    });

// Function to add data
function addData() {
    var newNumber = Math.floor(Math.random() * 25); // Random data between 0 and 25
    dataset.push(newNumber);

    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    rects = svg.selectAll("rect").data(dataset);

    // Enter new elements
    rects.enter()
        .append("rect")
        .attr("x", w)
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", "rgb(50, 205, 50)")
        .merge(rects)
        .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", "orange");
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 15;
            svg.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("class", "tooltip").text(d);
        })
        .on("mouseout", function () {
            d3.select(this).transition().duration(500).attr("fill", "rgb(50, 205, 50)");
            d3.select("#tooltip").remove();
        })
        .transition().duration(1000)
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

// Function to remove data
function removeData() {
    dataset.shift(); // Remove the first data element
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    rects = svg.selectAll("rect").data(dataset);

    rects.exit().transition().duration(1000).attr("x", w).remove();

    rects.transition().duration(1000)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("height", function (d) {
            return yScale(d);
        });
}

// Function to sort bars
function sortBars() {
    dataset.sort(function (a, b) {
        return isAscending ? d3.ascending(a, b) : d3.descending(a, b);
    });
    isAscending = !isAscending;
    xScale.domain(d3.range(dataset.length));

    rects = svg.selectAll("rect").data(dataset);

    rects.enter().append("rect")
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", "rgb(50, 205, 50)")
        .merge(rects)
        .transition().duration(1000)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("height", function (d) {
            return yScale(d);
        });

    rects.exit().transition().duration(1000).attr("x", w).remove();
}

// Add event listeners to the buttons
d3.select("#add").on("click", addData);
d3.select("#remove").on("click", removeData);
d3.select("#sort").on("click", sortBars);
