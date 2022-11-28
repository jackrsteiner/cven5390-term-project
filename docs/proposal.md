# CVEN5390 Term Project Pitch
Term: Fall 2022

Produced by Jac Steiner

## Purpose
This webmap will visualize the location of public infrastructure (PI) assets in the Federated States of Micronesia. It’s a simple concept that will offer some of the more basic features that you find in FEMA’s Resilience Analysis and Planning Tool (RAPT, https://www.fema.gov/emergency-managers/practitioners/resilience-analysis-and-planning-tool). The map will help identify the location of PI assets in the FSM and summarize what assets are located within subset areas of the FSM. These PI were surveyed over several years and multiple assets’ specific attributes were collected including their location.

## Basic Features
1. Federated States of Micronesia Public Infrastructure assets are mapped as point data.
1. When selected, individual asset’s attributes are visible as a “report” without leaving the web map.
1. A polygon feature class is used to display FSM municipalities.
1. When a municipality is selected, the number of each type of PI asset in the municipality is displayed in a simple dashboard-like layout.
1. When in dashboard mode, multiple municipality polygons can be selected and the dashboard displays the aggregated number of each type of PI assets across all selected polygons.

## Audience
Emergency managers in the Federated State of Micronesia can use this map to help identify vulnerable communities, at-risk assets, and opportunities to improve resilience within given communities. Organizations that could be interested include DECEM, IOM, USAID, and additionally UNDRR funded projects.

## Data
* Public Infrastructure asset point data will come from the work performed by the International Organization for Migration in Micronesia (IOM) on behalf of the Micronesian Department of Environment, Climate Change and Emergency Management (DECEM) with funding from USAID. The data set has not been released publicly, but is not sensitive. It is available as an excel spreadsheet of values. I will export the table as a CSV, and likely convert the csv to GeoJSON.
* FSM municipality polygon data at one time was available through DECEM, though it is no longer available. There is lower quality polygon data available through https://data.humdata.org/dataset/cod-ab-fsm as a shapefile that is ready for use. There is also a dataset released by SPREP at https://fsm-data.sprep.org/dataset/fsm-municipalities which appears like it may contain a greater number of municipality polygons, but the data has been truncated when it was exported. I’ll take a closer look at accessing the SPREP data, reverse engineering it if possible, and contact SPREP to see if they can provide the data. There appears to be municipality boundary data available through https://islandatlas.org/data-repository however it is divided by state and the files are based on 20 years old data; I’ll consider combining these to make a nationwide feature but I think it may actually be the same as humdata.org.
* Enumeration Areas (also known as Statistical Areas) used for the 2010 FSM census are available from https://pacificdata.org/data/dataset/2010_fsm_phc_admin_boundaries . These may be of interest but they do not necessarily create divisions along community lines. They tend to focus on areas of similar population size, but do not correspond with social geographies (townships, communities, neighborhoods, villages).

## Technology
The primary data set (PI point data and attributes) is technically not published. Consequently, I worry partner organizations may be displeased with pushing data to Mapbox in order to create custom map tiles. I’m going to
explore Mapbox, as I think the tooling fits the problem space, but I’m going to also consider using Leaflet as an alternative, so the data can remain off of Mapbox servers. My main interest in sticking with Mapbox is that, as
far as I can tell, styling tiles is a Mapbox integrated tool, whereas Leaflet does not provide support for tile styling. Instead with Leaflet, you can create a custom tileset (not trivial) or choose a style that is satisfactory
from several already wired up providers (much simpler).

* TOC
{:toc}