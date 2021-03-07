// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(healthData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([30, d3.max(healthData, d => d.age)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.smokes)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "9")
    .classed("stateCircle", true)
    .attr("opacity", 0.75);

    chartGroup.append("g")
      .selectAll("text")
      .data(healthData)
      .enter()
      .append("text")
      .text(d => d.abbr)
      .attr("x", d => xLinearScale(d.age))
      .attr("y", d => yLinearScale(d.smokes))
      .classed("stateText", true)
      .attr("font-size", "8px")
      .attr("font-weight", "bold")
      .style("alignment-baseline", "middle")
      

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .style("padding", "6px")
      .style("font-size", "12px")
      .style("line-height", "1")
      .style("color", "#fff")
      .style("text-align", "center")
      .style("text-transform", "capitalize")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("border-radius", "4px")
      .html(function(d) {
        return (`State: ${d.state}<br>Median Age: ${d.age}<br>Pct. Smokers: ${d.smokes}`);
      });

  
    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smoking Pop. (%)")
      .style("font-weight", "bold");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Median Age")
      .style("font-weight", "bold");
  }).catch(function(error) {
    console.log(error);
  });

  // var svgWidth = 960;
  // var svgHeight = 500;
  
  // var margin = {
  //   top: 20,
  //   right: 40,
  //   bottom: 80,
  //   left: 100
  // };
  
  // var width = svgWidth - margin.left - margin.right;
  // var height = svgHeight - margin.top - margin.bottom;
  
  // // Create an SVG wrapper, append an SVG group that will hold our chart,
  // // and shift the latter by left and top margins.
  // var svg = d3
  //   .select("#scatter")
  //   .append("svg")
  //   .attr("width", svgWidth)
  //   .attr("height", svgHeight);
  
  // // Append an SVG group
  // var chartGroup = svg.append("g")
  //   .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // // Initial Params
  // var chosenXAxis = "age";
  
  // // function used for updating x-scale var upon click on axis label
  // function xScale(healthData, chosenXAxis) {
  //   // create scales
  //   var xLinearScale = d3.scaleLinear()
  //     .domain([d3.min(healthData, d => d[chosenXAxis]) * 0.8,
  //       d3.max(healthData, d => d[chosenXAxis]) * 1.2
  //     ])
  //     .range([0, width]);
  
  //   return xLinearScale;
  
  // }
  
  // // function used for updating xAxis var upon click on axis label
  // function renderAxes(newXScale, xAxis) {
  //   var bottomAxis = d3.axisBottom(newXScale);
  
  //   xAxis.transition()
  //     .duration(1000)
  //     .call(bottomAxis);
  
  //   return xAxis;
  // }
  
  // // function used for updating circles group with a transition to
  // // new circles
  // function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  
  //   circlesGroup.transition()
  //     .duration(1000)
  //     .attr("cx", d => newXScale(d[chosenXAxis]));
  
  //   return circlesGroup;
  // }
  
  // // function used for updating circles group with new tooltip
  // function updateToolTip(chosenXAxis, circlesGroup) {
  
  //   var label;
  
  //   if (chosenXAxis === "age") {
  //     label = "age";
  //   }
  //   else {
  //     label = "smokes";
  //   }
  
  //   var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([80, -60])
  //     .html(function(d) {
  //       return (`${d.obesity}<br> ${d[chosenXAxis]}`);
  //     });
  
  //   circlesGroup.call(toolTip);
  
  //   circlesGroup.on("mouseover", function(data) {
  //     toolTip.show(data);
  //   })
  //     // onmouseout event
  //     .on("mouseout", function(data, index) {
  //       toolTip.hide(data);
  //     });
  
  //   return circlesGroup;
  // }
  
  // // Retrieve data from the CSV file and execute everything below
  // d3.csv("assets/data/data.csv").then(function(healthData, err) {
  //   if (err) throw err;
  
  //   // parse data
  //   healthData.forEach(function(data) {
  //     data.age = +data.age;
  //     data.smokes = +data.smokes;
  //     data.obesity = +data.obesity;
  //   });
  
  //   // xLinearScale function above csv import
  //   var xLinearScale = xScale(healthData, chosenXAxis);
  
  //   // Create y scale function
  //   var yLinearScale = d3.scaleLinear()
  //     .domain([0, d3.max(healthData, d => d.obesity)])
  //     .range([height, 0]);
  
  //   // Create initial axis functions
  //   var bottomAxis = d3.axisBottom(xLinearScale);
  //   var leftAxis = d3.axisLeft(yLinearScale);
  
  //   // append x axis
  //   var xAxis = chartGroup.append("g")
  //     .classed("x-axis", true)
  //     .attr("transform", `translate(0, ${height})`)
  //     .call(bottomAxis);
  
  //   // append y axis
  //   chartGroup.append("g")
  //     .call(leftAxis);
  
  //   // append initial circles
  //   var circlesGroup = chartGroup.selectAll("circle")
  //     .data(healthData)
  //     .enter()
  //     .append("circle")
  //     .attr("cx", d => xLinearScale(d[chosenXAxis]))
  //     .attr("cy", d => yLinearScale(d.obesity))
  //     .attr("r", 10)
  //     .attr("fill", "pink")
  //     .attr("opacity", ".5");
  
  //   // Create group for two x-axis labels
  //   var labelsGroup = chartGroup.append("g")
  //     .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
  //   var smokesLabel = labelsGroup.append("text")
  //     .attr("x", 0)
  //     .attr("y", 20)
  //     .attr("value", "smokes") // value to grab for event listener
  //     .classed("active", true)
  //     .text("Smokes");
  
  //   var ageLabel= labelsGroup.append("text")
  //     .attr("x", 0)
  //     .attr("y", 40)
  //     .attr("value", "age") // value to grab for event listener
  //     .classed("inactive", true)
  //     .text("Age");
  
  //   // append y axis
  //   chartGroup.append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 0 - margin.left)
  //     .attr("x", 0 - (height / 2))
  //     .attr("dy", "1em")
  //     .classed("axis-text", true)
  //     .text("Obesity");
  
  //   // updateToolTip function above csv import
  //   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
  //   // x axis labels event listener
  //   labelsGroup.selectAll("text")
  //     .on("click", function() {
  //       // get value of selection
  //       var value = d3.select(this).attr("value");
  //       if (value !== chosenXAxis) {
  
  //         // replaces chosenXAxis with value
  //         chosenXAxis = value;
  
  //         // console.log(chosenXAxis)
  
  //         // functions here found above csv import
  //         // updates x scale for new data
  //         xLinearScale = xScale(healthData, chosenXAxis);
  
  //         // updates x axis with transition
  //         xAxis = renderAxes(xLinearScale, xAxis);
  
  //         // updates circles with new x values
  //         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
  
  //         // updates tooltips with new info
  //         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
  //         // changes classes to change bold text
  //         if (chosenXAxis === "age") {
  //           ageLabel
  //             .classed("active", true)
  //             .classed("inactive", false);
  //           smokesLabel
  //             .classed("active", false)
  //             .classed("inactive", true);
  //         }
  //         else {
  //           ageLabel
  //             .classed("active", false)
  //             .classed("inactive", true);
  //           smokesLabel
  //             .classed("active", true)
  //             .classed("inactive", false);
  //         }
  //       }
  //     });
  // }).catch(function(error) {
  //   console.log(error);
  // });
  