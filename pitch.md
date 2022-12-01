# Revised Pitch

## Purpose
The web map visualize the location of public infrastructure (PI) assets in the Federated States of Micronesia (FSM). It's main audience is emergency planners in the FSM. It offers some of the more basic features that you find in FEMA’s Resilience Analysis and Planning Tool (RAPT, https://www.fema.gov/emergency-managers/practitioners/resilience-analysis-and-planning-tool). The map helps identify the location of PI assets in the FSM and summarizes the assets located within FSM municipalities. Several "water, sanitation, and hygiene" (WASH) and emergency management (EM) related attributes are displayed on a dashboard.

## Basic Features
1. FSM PI are displayed as markers on a map, with different PI types having different marker styles.
1. When selected, a PI's attributes are visible as a “report” without leaving the web map.
1. FSM municipalities are displayed as polygons.
1. When a municipality is selected, the number of each type of PI asset in the municipality is displayed in a simple legend.
1. Multiple municipality polygons can be selected and the legend displays the aggregated number of each type of PI across all selected polygons.

## Audience
Emergency managers in the Federated State of Micronesia can use this map to help identify vulnerable communities, at-risk assets, and opportunities to improve resilience within given communities. Organizations that could be interested include DECEM, IOM, USAID, and additionally UNDRR funded projects.

## Source Data
* Public Infrastructure asset point data is from work performed by the International Organization for Migration in Micronesia (IOM) on behalf of the Micronesian Department of Environment, Climate Change and Emergency Management (DECEM) with funding from USAID. The data was made available as an excel spreadsheet of values. This was exported as a CSV, imported into a GIS and exported to GeoJSON.
* FSM municipality polygon data is available through [The Humanitarian Data Exchange](https://data.humdata.org/) as a shapefile. It can be downloaded at https://data.humdata.org/m/dataset/cod-ab-fsm . The data was produced on behalf of the FSM Division of Statistics for the 2010 census and contributed to HDX by the UN Office for the Coordination of Humanitarian Affairs (OCHA). The shapefile was imported into a GIS. While in the GIS, the PI data was joined to the municipality data to produce 6 count attributes for each PI type in every municipality.
