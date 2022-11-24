const map = L.map('map', { zoomControl: false }).setView([6.91467, 158.16008], 11);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.control.zoom({ position: 'bottomright'}).addTo(map);

async function loadGeojson(f) {
    const response = await fetch('./'+f+'.geojson');
    const gjob = await response.json();
    return gjob;
  };

const PI = await loadGeojson('FSM PI');
const muni = await loadGeojson('FSM Muni PI counts');

L.geoJSON(muni).addTo(map);

var geojsonMarkerOrange = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var geojsonMarkerRed = {
    radius: 8,
    fillColor: "#ff0000",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function setColor(latlng, col) {
    return L.circleMarker(latlng, {
        radius: 8,
        fillColor: col,
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    });
};

// Start emojicon code
const size = 15 // needs to correspond to font-size above
const iconOptions = {
    iconSize  : [size, size],
    iconAnchor: [size/2, size + 9], 
    className : 'mymarker',
    html: '⚙️'
}
const markerOptions = {
    icon: L.divIcon(iconOptions)
}
// End emojicon code

function setEmojicon(ico='😕', size=15) {
    const iconOptions = {
        iconSize  : [size, size],
        iconAnchor: [size/2, size + 9], 
        className : 'mymarker',
        html: ico
    }

    const markerOptions = {
        icon: L.divIcon(iconOptions)
    }
    return markerOptions
}


L.geoJSON(PI, {
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