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

/* function onMuniPop(feature, layer) {
    layer.bindPopup(feature.properties["ADM2_NAME"])
};

const muniLayer1 = L.geoJSON(muni, {
    onEachFeature: onMuniPop
}).addTo(map);
 */

// Initialize dictionary for counting PI in muni
let piCounts = {
    "Community":0,
    "Gov":0,
    "Med":0,
    "Religious":0,
    "Schools":0,
    "Utilities":0
};

// Initialize dictionary to track counted polygons
let munisSelected = [];


var nolight = {
    "fillOpacity": 0,
    "color": "black"
}

var highlight = {
    "fillOpacity": .2,
    "color": "#3388ff"
};

// Function increments or decrments piCounts depending on if muni is selected or deselected.
function onMuniClick(feature, layer) {
    layer.on({
        click: function() { 
            if (munisSelected.includes(feature.properties["ADM2_NAME"])) {
                munisSelected.splice(munisSelected.indexOf(feature.properties["ADM2_NAME"]),1);
                for (const key in piCounts) {
                    piCounts[key] = piCounts[key] - feature.properties[key]
                };
                console.log(munisSelected);
                console.log(piCounts);
                layer.setStyle(nolight);
            } else {
                munisSelected.push(feature.properties["ADM2_NAME"]);
                for (const key in piCounts) {
                    piCounts[key] = piCounts[key] + feature.properties[key]
                };
                console.log(munisSelected);
                console.log(piCounts);
                layer.setStyle(highlight); 
            }
        }
    });
};

const muniLayer = L.geoJSON(muni, {
    style: nolight,
    onEachFeature: onMuniClick
}).addTo(map);



/* function myStyle(feature) {
  redOpacity = 0;
  var opacity = (feature.color == 'red') ? redOpacity : feature.opacity;
  return {
    stroke: true,
    fillColor: feature.color,
    fillOpacity: opacity,
    color: feature.color,
    opacity: opacity,
    weight: 2,
  };
}

muniLayer.setStyle(myStyle); */

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
        
    }
}).addTo(map);

var popup = L.popup();

function onMarkerClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
};

piLayer.on('click', onMarkerClick);



