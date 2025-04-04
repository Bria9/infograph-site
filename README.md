

#Infographic Website

The primary goal for this project is to represent the Louisville Metro KY - Property Foreclosures dataset by creating interactive charts that better represent some aspects of the data. A bar chart and map were created with data fetched from files hosted from the [infograph-api repo](https://github.com/Bria9/infograph-api).The site consist of three pages total. A home page, and 2 additional pages. D3.js is used to pull in the sales date and calculate the total number of foreclosure for each year from 2014-2015 on the bar chart page and Louisville coordinate data is used with leaflet to pull in map tiles from openStreetMap for the map page. The neighborhood density information is drawn on the map based on the combined data from foreclosure.json and neighborhood.geojson.


Technology used: D3.js, Leaflet.js

##Project features include:

1. **Arrays to store and retrieve information**


The use of the fetch function to pull in data from an external source (GitHub repo: foreclosure.json). 
Data retrieved using D3.json() is automatically stored into an array.


2. **Data visualization in a user friendly way** 

The implementation of D3.js to create a bar chart showing the trend of foreclosure numbers over a period of time.

3. **Implement modern interactive UI features**
  The use of the mouse event functions during the creation of tooltips for bar chart interactivity. 

sources: to acquire csv file 	[Louisville Metro KY - Property Foreclosures](https://data.louisvilleky.gov/datasets/62c648120ab44b7794f8b484884efaa9_0/explore)
assist with creation of geoJson file [Mapping tool felt](https://felt.com/map/ZIP-Codes-in-the-city-of-Louisville-Kentucky-NJ2P15gTSY2IonufqkV9AfD?loc=38.2205,-85.6794,9.83z)
chatgbt: assist with data formatting for charts and map creation.
