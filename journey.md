# Coding Journey

## Map markers
I decided to use emojis as my map markers. I felt they brought a degree of whimsy to my map, helping invite users with a less technical background. This lead to some challenges, as emojis are not typically used for point markers in leaflet maps. Leaflet has a map marker generator for some standard shapes, and also accepts image files in place of these shaped. I was able to find an example implementation of using [emojis for map markers](https://gist.github.com/RikdeBoer/d98325632b8479757f4d32927e73bd01) and had to combine it with some javascript conditional statements to implement different icons for different PI type.

```
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
```

I found that I need to adjust the styling applied to the emoji to add a border so the marker image was not lost in the basemap. I'm happy with the results.

## Map styling
For the municipality layer, I chose to only display a solid black border as the default; the polygon's are transparent. This focuses the user attention on boundaries and the PI contained within and makes aid viewing the features present on the basemap (provided by OSM). When a polygon *is selected* the polygon is displayed with a semi-transparent blue fill and a solid blue border. Hopefully, this clearly conveys to the user which polygons are included in the legend aggregate tallies.

Rather than include on map labels for place names, both municipality and PI names are never displayed *on map*. This is to keep the map uncluttered. Instead, place names appear in their respective dashboard/displays. So, selected municipalities are listed in the legend, and when a PI is clicked, it's attributes, including name, are populated in the table at the bottom.

* Seed list
{:toi}