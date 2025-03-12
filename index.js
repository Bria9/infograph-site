// Create an asynchronous function to render map
// Pull in api data from endpoint & store it in a variable

async function getData(){
const dataset = await d3.json('https://bria9.github.io/infograph-api/foreclosures.json');
console.log(dataset);
}
// getData();


function renderMap(){
 getData();

}

renderMap();

