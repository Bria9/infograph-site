
async function renderChart() {
  const dataset = await d3.json("https://bria9.github.io/infograph-api/foreclosures.json");

  console.log(dataset);

  // Format data
  dataset.forEach(d => {
    d.Sale_Date = new Date(d.Sale_Date);  // Convert Sale_Date to Date object
  });

  // Group data by year and count foreclosures
  const foreclosureCounts = d3.rollup(
    dataset,
    v => v.length,  // Count the number of records per year
    d => d.Sale_Date.getFullYear()
  );

  // Convert the data to an array of objects sorted by year
  const data = Array.from(foreclosureCounts, ([year, count]) => ({ year, count }))
    .filter(d => !isNaN(d.year))  // Filter out invalid years
    .sort((a, b) => d3.ascending(a.year, b.year));

  console.log(data);



  // Set chart dimensions
  let dimensions = {
    width: 650,
    height: 400,
    margins: {
        top:50,
        bottom: 50,
        left: 50,
        right: 50
    } 
  };

  dimensions.containerWidth = dimensions.width - dimensions.margins.left - dimensions.margins.right
  dimensions.containerHeight = dimensions.height - dimensions.margins.top - dimensions.margins.bottom
  // Create SVG container
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const container = svg.append("g")
    .attr("transform", `translate(${dimensions.margins.left}, ${dimensions.margins.top})`);

//X axis 

const x = d3.scaleBand()
  .range([0, dimensions.containerHeight])
  .domain(data.map((d) => d.year ))
  .padding(0.2);
  container.append("g")
  .attr("transform", `translate(0, ${dimensions.containerHeight})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");


// Add Y axis
const y = d3.scaleLinear()
  .domain([ 0, d3.max(data, (d) => d.count)])
  .range([ dimensions.containerHeight, 0])
  .nice();
  container.append("g")
  .call(d3.axisLeft(y))
  .selectAll("text")

  container.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 150 )  // Center label
  .attr("y", dimensions.containerHeight + dimensions.margins.bottom)  
  .text("Year");  // Label text

  container.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", "translate(-55, 180)rotate(-90)")
  .attr("x", 50 )  // Center label
  .attr("y", 20 )  
  .text("# of Foreclosures");  // Label text
  
//draw bars
container.selectAll("rect")
.data(data)
.join("rect")
.attr("x", function(d) { return x(d.year); })
.attr("y", function(d) { return y(d.count); })
.attr("width", x.bandwidth())
.attr("height", function(d) { return dimensions.containerHeight - y(d.count); })
.attr("fill", "#69b3a2")

}

renderChart();