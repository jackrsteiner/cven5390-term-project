const map = L.map('map', { zoomControl: false }).setView([6.91467, 158.16008], 11);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.control.zoom({ position: 'bottomright'}).addTo(map);

async function loadGeojson(f) {
    const response = await fetch('./' + f + '.geojson');
    const gjob = await response.json();
    return gjob;
  };

const PI = await loadGeojson('FSM PI');
const muni = await loadGeojson('FSM Muni PI counts');

// Initialize dictionary for counting PI in muni
let piCounts = {
    "Community hall": 0,
    "Government / Municipal office": 0,
    "Medical facility": 0,
    "Religious facility (church, etc.)": 0,
    "School building": 0,
    "Public utilities (electric, telecom, etc.)": 0
};

// Initialize dictionary to track counted polygons
let munisSelected = [];

// Styles for muni
var nolight = {
    "fillOpacity": 0,
    "color": "black"
}

var highlight = {
    "fillOpacity": .2,
    "color": "#3388ff"
};

// increments or decrments piCounts if muni is selected or deselected.
function onMuniClick(feature, layer) {
    layer.on({
        click: function() { 
            if (munisSelected.includes(feature.properties["ADM2_NAME"])) {
                munisSelected.splice(munisSelected.indexOf(feature.properties["ADM2_NAME"]),1);
                for (const key in piCounts) {
                    piCounts[key] = piCounts[key] - feature.properties[key];
                    document.getElementById(key).innerHTML = piCounts[key];
                };
                layer.setStyle(nolight);
            } else {
                munisSelected.push(feature.properties["ADM2_NAME"]);
                for (const key in piCounts) {
                    piCounts[key] = piCounts[key] + feature.properties[key];
                    document.getElementById(key).innerHTML = piCounts[key];
                };
                layer.setStyle(highlight); 
            };
            document.getElementById("munis-selected").innerHTML = munisSelected.sort().join(', ');
        }
    });
};

const muniLayer = L.geoJSON(muni, {
    style: nolight,
    onEachFeature: onMuniClick
}).addTo(map);

// Clear selection
document.getElementById("clear-button").addEventListener("click", clearFunction);

function clearFunction() {

    for (const key in piCounts) {
        piCounts[key] = 0;
        document.getElementById(key).innerHTML = piCounts[key];
    };

    muniLayer.resetStyle();
    munisSelected = [];
    document.getElementById("munis-selected").innerHTML = munisSelected.sort().join(', ');
};

function setEmojicon(ico='😕', size=15) {
    const iconOptions = {
        iconSize  : [size, size],
        iconAnchor: [size/2, size/2], 
        className : 'mymarker',
        html: ico
    }

    const markerOptions = {
        icon: L.divIcon(iconOptions)
    }
    
    return markerOptions
}

const piLayer = L.geoJSON(PI, {
    pointToLayer(feature, latlng) {
        switch(feature.properties["PI type"]) {
            case "Community hall": return L.marker(latlng, setEmojicon('🫂'));
            case "Government / Municipal office": return L.marker(latlng, setEmojicon('⚙️'));
            case "Medical facility": return L.marker(latlng,setEmojicon('🏥'));
            case "Religious facility (church, etc.)": return L.marker(latlng,setEmojicon('🛐'));
            case "School building": return L.marker(latlng,setEmojicon('📚'));
            case "Public utilities (electric, telecom, etc.)": return L.marker(latlng,setEmojicon('💡'));
        }
    },
    onEachFeature(feature, layer){
        layer.on({
            click: function() {
                // console.log("Hello3", feature.properties);
                for (const prop in feature.properties) {
                    const elementExists = document.getElementById(prop) !== null;
                    if (elementExists){
                        document.getElementById(prop).innerHTML = feature.properties[prop];
                    };
                    document.getElementById("GPS").innerHTML = feature.properties["(GPS) Latitude"].toString().substring(0,5) + ", " + feature.properties["(GPS) Longitude"].toString().substring(0,7)  + " (" + feature.properties["GPS accuracy"] + ")";
                };
            }     
        })
    }
}).addTo(map);



// Count all PI
//  This only sort of works. It only counts PI that are in munis,
//  but is missing PI that don't join with munis.
/*
muniLayer.eachLayer(function(layer){
    for (const key in piCounts) {
        piCounts[key] = piCounts[key] + layer.feature.properties[key];
    };
    console.log(layer.feature.properties.ADM2_NAME, piCounts)
});

*/

/*
// Count all PI using PI layer
piLayer.eachLayer(function(layer){
    piCounts[layer.feature.properties["PI type"]] = piCounts[layer.feature.properties["PI type"]] + 1;
    console.log(piCounts);
});
*/