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

function onMuniClick(feature, layer) {
    layer.bindPopup(feature.properties["ADM2_NAME"])
};

const muniLayer = L.geoJSON(muni, {
    onEachFeature: onMuniClick
}).addTo(map);

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



