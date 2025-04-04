async function renderBarChart() {
  const dataset = await d3.json(
    "https://bria9.github.io/infograph-api/foreclosures.json"
  );

  console.log(dataset);

  // Format data
  dataset.forEach((d) => {
    d.Sale_Date = new Date(d.Sale_Date); // Convert Sale_Date to Date object
  });

  // Group data by year and count foreclosures
  const foreclosureCounts = d3.rollup(
    dataset,
    (d) => d.length, // Count the number of records per year
    (d) => d.Sale_Date.getFullYear()
  );

  // Convert the data to an array of objects sorted by year
  const data = Array.from(foreclosureCounts, ([year, count]) => ({
    year,
    count,
  }))
    .filter((d) => !isNaN(d.year)) // Filter out invalid years
    .sort((a, b) => d3.ascending(a.year, b.year));

  console.log(data);

  // Set chart dimensions
  let dimensions = {
    width: 400,
    height: 400,
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  };

  dimensions.containerWidth =
    dimensions.width - dimensions.margins.left - dimensions.margins.right;
  dimensions.containerHeight =
    dimensions.height - dimensions.margins.top - dimensions.margins.bottom;
  // Create SVG container
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("viewBox", `0 0  ${dimensions.width} ${dimensions.height}`);

  const container = svg
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margins.left}, ${dimensions.margins.top})`
    );

  //X axis

  const x = d3
    .scaleBand()
    .range([0, dimensions.containerHeight])
    .domain(data.map((d) => d.year))
    .padding(0.2);
  container
    .append("g")
    .attr("transform", `translate(0, ${dimensions.containerHeight})`)
    .call(d3.axisBottom(x)) // draw axis
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .range([dimensions.containerHeight, 0])
    .nice();
  container.append("g").call(d3.axisLeft(y)).selectAll("text");

  container
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", 150) // Center label
    .attr("y", dimensions.containerHeight + dimensions.margins.bottom)
    .text("Year"); // Label text

  container
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(-55, 180)rotate(-90)")
    .attr("x", 50) // Center label
    .attr("y", 20)
    .text("Number of Foreclosures"); // Label

  //draw bars
  container
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", function (d) {
      return x(d.year);
    })
    .attr("y", function (d) {
      return y(d.count);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return dimensions.containerHeight - y(d.count);
    })
    .attr("fill", "#69b3a2")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

  // count labels
  container
    .append("g")
    .classed("bar-labels", true)
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("y", (d) => y(d.count) + 20)
    .attr("x", (d) => x(d.year) + 10)
    .attr("text-anchor", "middle")
    .text((d) => d.count)
    .style("font-size", "12px")
    .style("fill", "#fff");

  const tooltip = d3.select("#tooltip");

  // mouseover event
  function mouseover(event, d) {
    tooltip
      .style("opacity", 1) // Make tooltip visible
      .html(`Year: ${d.year}<br> Foreclosures: ${d.count}`); // Tooltip content
    d3.select("rect").transition().duration(100).style("fill", "#69b3a2");
    d3.select(this)
      .transition()
      .duration(200)
      .style("fill", "#1e4a40")
      .style("stroke", "pink");
  }

  //  mousemove event
  function mousemove(event, d) {
    tooltip
      .style("left", event.pageX + 10 + "px") // Position tooltip near cursor
      .style("top", event.pageY - 20 + "px");
  }

  // mouseleave event
  function mouseleave(event, d) {
    tooltip.style("opacity", 0); // Hide tooltip
    d3.selectAll("rect").transition().duration(100).style("fill", "#69b3a2");
    d3.select(this).transition().duration(200).style("stroke", "none"),
      style("stroke-width", 0);
  }
}

renderBarChart();

//bar button info

const barBtnEl = document.getElementById("barBtn");
const barInfoEl = document.getElementById("bar-info");
const overlayEl = document.getElementById("overlay");

barBtnEl.addEventListener("click", function () {
  if (barInfoEl.style.display === "none") {
    barInfoEl.style.display = "inline-block";
  } else {
    barInfoEl.style.display = "none";
  }

  if (overlayEl.style.display === "none") {
    overlayEl.style.display = "block";
  } else {
    overlayEl.style.display = "none";
  }
});