# Architecture

## Data
My two data layers are both stored as geojson files and accessed using the javascript fetch API with an async-await call.

```
async function loadGeojson(f) {
    const response = await fetch('./' + f + '.geojson');
    const gjob = await response.json();
    return gjob;
  };

const PI = await loadGeojson('FSM PI');
const muni = await loadGeojson('FSM Muni PI counts');
```

This enables the storing of the data files in the same location, on the same server, as the applications other assets. The data is not stored on a SaaS platform like Mapbox. I found many example small apps with local data that embedded their geojson object in javascript directly. This works well and is super simple to implement, but using async-await, has a couple advantages:
1. Exporting geojson data from a GIS is trivial. The alternative requires manually intervention *in code* to encapsulate the json as a js object.
2. The data and the code are uncoupled. It's simple to update data files and replace them.
3. The data, the data object, or the data files, may be slightly less exposed as they do not have to be embedded directly in public facing assets.

## Libraries
I chose [leaflet.js](https://leafletjs.com/) to produce the interactive map. It enables the storing of all javascript dependencies locally, which I think will make it easier to make the application accessible offline. Leaflet was simple to work with and there is significant documentation and community support. I used the [Leaflet.Control.Search](https://opengeo.tech/maps/leaflet-search/) plugin to add a search bar.

Creating a map in Leaflet is straight-forward. the Leaflet library is imported into your javascript file, with the alias `L`, and a map object is generated with the map factory `L.map(<String> id, <Map options> options?)`. Map layers are generated with a layer factory. In the case of my application, `L.geoJSON(geojsonFeature).addTo(map);`, but layers can be customized either and added to the map when instantiated or at a later time.

Behind the scenes, when creating a layer from geojson, Leaflet is actually creating a new layer for each feature, and grouping all layers into a layerGroup. This means that in Leaflet tge handling of layers generated from geojson is different from other data sources. Leaflet provides a convenience method for these geojson created layer groups, `onEachFeature` which enables attaching events to every feature contained by every layer contained by every geojson layer group. I used `onEachFeature` to attach `onClick` listeners to both by point and polygon features. 

In all instances I was able to avoid using  other libraries (notably, jQuery), and relied on native javascript functionality. This should help my code be faster and smaller, and have fewer dependencies to maintain.

## Maintenance/Updates
There is no automated data pipeline for generating the input files, however 

## Coding References
Information from these links was very helpful.

* Leaflet
    * [Leaflet Docs](https://leafletjs.com/reference.html)
        * [Geojson reference](https://leafletjs.com/reference.html#geojson)
        * [Geojson examples](https://leafletjs.com/examples/geojson/)
    * [All kinds of great examples](https://tomik23.github.io/leaflet-examples/)
* [GitHub pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site)
* [Avoid CORs on local preview](https://stackoverflow.com/questions/10752055/cross-origin-requests-are-only-supported-for-http-error-when-loading-a-local)
    * aka: `cd "/home/jac/Documents/Courses/CVEN5390/Term Project/Repo" && python -m http.server`
* [Emoji as point icon in Leaflet snippet](https://gist.github.com/RikdeBoer/d98325632b8479757f4d32927e73bd01)
    * [border around text/emojis](https://stackoverflow.com/questions/2570972/css-font-border)
* [Leaflet search](https://opengeo.tech/maps/leaflet-search/)
* [Select multiple polygons](https://github.com/olanaso/Leaflet-Select-Polygons)
* [Accessing .geojson data in javascript](https://www.javascripttutorial.net/javascript-fetch-api/) aka the fetch api
    * [Applied example](https://dmitripavlutin.com/fetch-with-json/)


* Seed list
{:toi}
