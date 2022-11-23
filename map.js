const map = L.map('map', { zoomControl: false }).setView([6.91467, 158.16008], 11);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.control.zoom({ position: 'bottomright'}).addTo(map);

// Start emojicon code
const size = 50; // needs to correspond to font-size above
const iconOptions = {
    iconSize  : [size, size],
    iconAnchor: [size/2, size + 9], 
    className : 'mymarker',
//runner, medium skin tone, Zero-Width-Joiner, female:
    html: '🏃🏽‍♀' // or: '&#x1f3c3;&#x1f3fd;&#x200d;&#x2640;'
}
const markerOptions = {
    draggable: true,
    icon: L.divIcon(iconOptions)
}

// End emojicon code

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

L.geoJSON(PI, {
    pointToLayer(feature, latlng) {
        switch(feature.properties["PI type"]) {
            case "Government / Municipal office": return L.circleMarker(latlng, geojsonMarkerOrange);
            case "Medical facility": return L.circleMarker(latlng,geojsonMarkerRed);
            case "School building": return setColor(latlng,"#0000ff");
        }
        
    }
}).addTo(map);