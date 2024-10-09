// Step 1: Set up data input file and SVG canvas
function init() {
    var w = 600;
    var h = 300;
    var padding = 50;

    // Create SVG element
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w + padding * 2)
        .attr("height", h + padding * 2)
        .append("g")
        .attr("transform", "translate(" + padding + "," + padding + ")");

    // Load the data from the CSV file
    d3.csv("Unemployment_78-95.csv").then(function (data) {
        data.forEach(function (d) {
            d.date = new Date(+d.year, +d.month - 1);
            d.number = +d.number;
        });

        // Step 2: Set up the scales
        var xScale = d3.scaleTime()
            .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
            .range([0, w]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.number)])
            .range([h, 0]);

        // Step 3: Set up the line generator
        var line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.number));

        // Step 7: Set up the area generator
        var area = d3.area()
            .x(d => xScale(d.date))
            .y0(h)  // Bottom of the chart (Y = 0)
            .y1(d => yScale(d.number));

        // Step 4: Append the line path to the SVG
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        // Uncomment this to append the area chart
        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

        // Step 5: Add axes
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        // Step 6: Add annotations (half a million line)
        svg.append("line")
            .attr("x1", 0)
            .attr("x2", w)
            .attr("y1", yScale(500000))
            .attr("y2", yScale(500000))
            .attr("class", "annotation-line");

        svg.append("text")
            .attr("x", 5)
            .attr("y", yScale(500000) - 5)
            .attr("fill", "red")
            .text("Half a million unemployed");

        // Axis labels
        svg.append("text")
            .attr("transform", "translate(" + (w / 2) + " ," + (h + padding - 10) + ")")
            .style("text-anchor", "middle")
            .attr("class", "axis-label")
            .text("Year");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - padding)
            .attr("x", 0 - (h / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("class", "axis-label")
            .text("Number of Unemployed");

        // Log data to console to verify
        console.table(data, ["date", "number"]);
    });
}

// Call the init function
init();
