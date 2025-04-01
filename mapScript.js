// Create map instance set coordinates and zoom level
const map = L.map("map").setView([38.2, -85.7], 11);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Load data
// count number of foreclosures and store in object
Promise.all([
    fetch('https://bria9.github.io/infograph-api/neighborhood.geojson').then(response => response.json()),
    fetch('https://bria9.github.io/infograph-api/foreclosures.json').then(response => response.json())
])
.then(([geoData, foreclosureData]) => {
    const foreclosureCounts = {};
    foreclosureData.forEach(f => {
        const neighborhood = f.Neighborhood; 
        foreclosureCounts[neighborhood] = (foreclosureCounts[neighborhood] || 0) + 1;
    });

    // Add foreclosure counts to GeoJSON properties
    geoData.features.forEach(feature => {
    const neighborhoodName =   feature.properties.name; 
    feature.properties.foreclosureCount = foreclosureCounts[neighborhoodName] || 0;
    });

    // Add the GeoJSON layer
    const geojsonLayer = L.geoJSON(geoData, {
        style: style,
        onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: function(e) {
                    const layer = e.target;
                    layer.setStyle({
                        weight: 4,
                        color: '#222222',
                        dashArray: '',
                        
                    });
                    info.update(layer.feature.properties);
                },
                mouseout: function(e) {
                    geojsonLayer.resetStyle(e.target);
                    info.update();
                },
                click: function(e) {
                    map.fitBounds(e.target.getBounds());
                }
            });
        }
    }).addTo(map);

// Add the legend and info to map
    legend.addTo(map);
    info.addTo(map);
})
.catch(error => {
    console.error('Error loading data:', error);
}); 

// Function to style each feature
function style(feature) {
    return {
        fillColor: getColor(feature.properties.foreclosureCount || 0),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Create legend 
const legend = L.control({position: 'bottomright'});

//create div element for legend 
legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    
    // add title
    div.innerHTML += '<h4>Foreclosures</h4>';
    
    
    const ranges = [
        { color: "#FED976", label: "0-5 foreclosures"},
        { color: "#FEB24C", label: "6-10 foreclosures"},
        { color: "#FD8D3C", label: "11-20 foreclosures"},
        { color: "#FC4E2A", label: "21-30 foreclosures"},
        { color: "#E31A1C", label: "31-40 foreclosures"},
        { color: "#BD0026", label: "41-50 foreclosures"},
        { color: "#800026", label: "50+ foreclosures"}
    ];
    
    
    // legend item for each range
    ranges.forEach(range => {
        div.innerHTML += `
        <div style="margin-bottom: 5px;">
        <i style="background: ${range.color}; 
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;"></i>
        ${range.label}
        </div>
        `;
    });
    
    return div;
};
// Function to get color based on foreclosure count
function getColor(d) {
    return d > 50 ? "#800026" :
           d > 40 ? "#BD0026" :
           d > 30 ? "#E31A1C" :
           d > 20 ? "#FC4E2A" :
           d > 10 ? "#FD8D3C" :
           d > 5  ? "#FEB24C" :
           d > 0  ? "#FED976" :
                    "#FFEDA0";
}

// Add info control
const info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Louisville Foreclosures</h4>' +  
    (props ?
        '<b>' + props.name + '</b><br />' + 
        props.foreclosureCount + ' foreclosures'
        : 'Hover over a neighborhood');
    };

    //map button info

    const mapBtnEl = document.getElementById("mapBtn")
    const mapInfoEl = document.getElementById("map-info")


    mapBtnEl.addEventListener("click", function (){
        console.log("Before click, visibility:", getComputedStyle(mapInfoEl).display);
        if(mapInfoEl.style.display === "none"){
    mapInfoEl.style.display = "inline-block";
    mapInfoCtnEl.style.display = ""
        }
        else{ mapInfoEl.style.display = "none"}
    })
    
