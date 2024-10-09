var w = 500;
var h = 200;
var barPadding = 3;

var dataset = [14, 5, 26, 23, 9];

var svg = d3.select("#chart") // Select the div with id "chart"
            .append("svg")
            .attr("width", w)
            .attr("height", h);

var xScale = d3.scaleBand()
               .domain(d3.range(dataset.length))
               .rangeRound([0, w])
               .paddingInner(0.05);

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset)])
               .range([0, h]);

// Initial Bar Chart
var rects = svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", "rgb(50, 205, 50)");

var labels = svg.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 15;
                })
                .attr("text-anchor", "middle")
                .attr("fill", "black");

// Add Data function
function addData() {
    var newNumber = Math.floor(Math.random() * 25); // Random data between 0 and 25
    dataset.push(newNumber);

    // Update Scales
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // Select all rectangles and bind the new data
    rects = svg.selectAll("rect")
                .data(dataset);

    // Enter new elements
    rects.enter()
        .append("rect")
        .attr("x", w) // Start off-screen to the right
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", "rgb(50, 205, 50)")
        .merge(rects) // Merge new bars with existing bars
        .transition()
        .duration(1000)
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        });

    // Update labels
    labels = svg.selectAll("text")
                .data(dataset);

    labels.enter()
          .append("text")
          .merge(labels)
          .transition()
          .duration(1000)
          .text(function(d) {
              return d;
          })
          .attr("x", function(d, i) {
              return xScale(i) + xScale.bandwidth() / 2;
          })
          .attr("y", function(d) {
              return h - yScale(d) + 15;
          })
          .attr("text-anchor", "middle")
          .attr("fill", "black");
}

// Remove Data function
function removeData() {
    dataset.shift(); // Remove the first data element

    // Update Scales
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // Select all rectangles and bind the new data
    rects = svg.selectAll("rect")
                .data(dataset);

    // Exit and remove old elements
    rects.exit()
        .transition()
        .duration(1000)
        .attr("x", w)
        .remove();

    // Update the existing bars
    rects.transition()
         .duration(1000)
         .attr("x", function(d, i) {
             return xScale(i);
         })
         .attr("y", function(d) {
             return h - yScale(d);
         })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) {
             return yScale(d);
         });

    // Update labels
    labels = svg.selectAll("text")
                .data(dataset);

    // Exit and remove old labels
    labels.exit()
          .transition()
          .duration(1000)
          .attr("x", w)
          .remove();

    // Update the existing labels
    labels.transition()
          .duration(1000)
          .text(function(d) {
              return d;
          })
          .attr("x", function(d, i) {
              return xScale(i) + xScale.bandwidth() / 2;
          })
          .attr("y", function(d) {
              return h - yScale(d) + 15;
          })
          .attr("text-anchor", "middle")
          .attr("fill", "black");
}
