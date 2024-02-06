import React, { useEffect, useState } from "react";
import { Source, Layer } from 'react-map-gl';
import UseDroneSimulation from "../../../hooks/useDroneSimulation";
import { convertCoordinatesObjectToArray, dividePathInChunks } from "../../../utils/util";

const MapSources = ({
  coordinateList
}) => {

  const [unTravelledCoord, setUnTravelledCoord] = useState([])

  useEffect(() => {
    if (!coordinateList?.length){
      setUnTravelledCoord([])
      return;
    }
    
    const validCoord= convertCoordinatesObjectToArray(coordinateList)
    const pathChunks = dividePathInChunks(validCoord)
    setUnTravelledCoord(pathChunks)
  }, [coordinateList])

  // unvisited path geojson and layer style
  const unvisited_layer_style = {
    id: 'polyline-1',
    type: 'line',
    options: "beforeLayer",
    source: "unvisited",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#1634f6",
      "line-width": 5,
    },
  };

  const unvisited_geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: unTravelledCoord,
        },
      },
    ],
  };
  // visited path geojson and layer style
  const visited_layer_style = {
    id: 'polyline-2',
    type: 'line',
    options: "beforeLayer",
    source: "visited",
    layout: {
      "line-join": "round",
      "line-cap": "round",

    },
    paint: {
      "line-color": "green",
      "line-width": 5,
      "z-index": "high"
    },
  };

  const visited_geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      },
    ],
  };

  // drone position geojson and layer style
  const drone_pos_geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [],
    },
  }
  const drone_pos_layer_style = {
    id: "drone_pos",
    type: "symbol",
    source: "drone_pos",
    layout: {
      "icon-image": "airport",
      "icon-size": 1.5,
      "icon-rotate": { "type": "identity", "property": "bearing" },
      "icon-rotation-alignment": "map",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
    },
  }

  // custom hook for simulation of drone
  UseDroneSimulation(unTravelledCoord)

  return (
    <>
      <Source id="unvisited" type="geojson" data={unvisited_geojson}>
        <Layer {...unvisited_layer_style} />
      </Source>

      <Source id="visited" type="geojson" data={visited_geojson}>
        <Layer {...visited_layer_style} />
      </Source>

      <Source id="drone_pos" type="geojson" data={drone_pos_geojson}>
        <Layer {...drone_pos_layer_style} />
      </Source>
    </>
  );

}

export default MapSources;