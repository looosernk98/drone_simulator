import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";

// env configuration
export const envConfig = {
  mapBoxAcessToken:process.env.MAPBOX_ACCESS_TOKEN,
    // "pk.eyJ1IjoidmluZWV0MiIsImEiOiJjbG9xM3B3aW4waWFqMmlwZWVwbnJxbXZzIn0.AkzW_k5F0KjJK0kIJNb4VA",
};

// Mapbox configuration
const DEFAULT_START_POSITION = { lon: 72.877655, lat: 19.075983 };

export const initializeMap = (
  mapContainerId,
  startPosition = DEFAULT_START_POSITION
) => {
  const map = new mapboxgl.Map({
    accessToken: envConfig.mapBoxAcessToken,
    container: mapContainerId, // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: startPosition, // starting position [lng, lat]
    zoom: 4, // starting zoom
  });
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })
  );

  map.addControl(
    new mapboxgl.FullscreenControl({
      container: document.querySelector("body"),
    })
  );

  map.once("load", () => {
    map.addSource("unvisited", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });

    map.addLayer({
      id: "polyline-1",
      type: "line",
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
    });

    map.addSource("visited", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });

    map.addSource("drone_pos", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [],
        },
      },
    });

    map.addLayer({
      id: "drone_pos",
      type: "symbol",
      source: "drone_pos",
      layout: {
        "icon-image": "airport",
        "icon-size": 1.5,
        "icon-rotate": ["get", "bearing"],
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
      },
    });

    map.addLayer({
      id: "polyline-2",
      type: "line",
      options: "beforeLayer",
      source: "visited",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "green",
        "line-width": 5,
      },
    });

    const geojson = drawDronePath(map);
    displayInViewport(map, geojson.features[0].geometry.coordinates);
    handleDroneSimulation(geojson, map);
  });
  return map;
};

function displayInViewport(map, coords) {
  // Create a 'LngLatBounds' with both corners at the first coordinate.
  const bounds = new mapboxgl.LngLatBounds(coords[0], coords[0]);

  // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
  for (const coord of coords) {
    bounds.extend(coord);
  }

  map.fitBounds(bounds, {
    padding: 20,
  });
}

async function handleDroneSimulation(geojson, map) {
  //let running = true;
  const travelledCoord = [];
  while (geojson.features[0].geometry.coordinates?.length) {
    await new Promise((res) => {
      setTimeout(() => {
        travelledCoord.push(geojson.features[0].geometry.coordinates[0]);
        geojson.features[0].geometry.coordinates?.shift();
        let data = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [...travelledCoord],
              },
            },
          ],
        };
        const drone_pos_data = {
          type: "Feature",
          properties: {
            bearing:
              travelledCoord.length >= 2
                ? turf.bearing(
                    turf.point(travelledCoord[travelledCoord.length - 2]),
                    turf.point(travelledCoord[travelledCoord.length - 1])
                  )
                : null,
          },
          geometry: {
            type: "Point",
            coordinates: travelledCoord[travelledCoord.length - 1],
          },
        }
        map.getSource("unvisited").setData(geojson);
        map.getSource("visited").setData(data);
        map.getSource("drone_pos").setData(drone_pos_data);
        map.panTo(travelledCoord[travelledCoord.length - 1]);
        res();
      }, 200);
    });
  }
}

function covertToValidCoord(coord) {
  return [coord[0], coord[1]];
}

function drawDronePath(map) {
  const coordinates = [
    [
      75.8681996, //long
      22.7203616, // lat
      new Date("2024-02-01T09:00:00.000Z").getTime(),
    ],
    [
      88.3638953, //long
      22.5726459, // lat
      new Date("2024-02-01T10:00:00.000Z").getTime(),
    ],
    [
      77.594566, //long
      12.971599, // lat
      new Date("2024-02-01T11:00:00.000Z").getTime(),
    ],
    [
      72.877655, //long
      19.075983, // lat
      new Date("2024-02-01T12:00:00.000Z").getTime(),
    ],
    [
      77.102493, //long
      28.70406, // lat
      new Date("2024-02-01T13:00:00.000Z").getTime(),
    ],
  ];

  coordinates.sort((a, b) => {
    return a[2] - b[2];
  });

  const unTravelledCoord = [];
  //Time taken to jump from one coordinate to another
  for (let c = 0; c < coordinates?.length - 1; c++) {
    let currCoord = covertToValidCoord(coordinates[c]);
    let nextCoord = covertToValidCoord(coordinates[c + 1]);
    let currCoordTime = coordinates[c][2];
    let nextCoordTime = coordinates[c + 1][2];

    // calculation of bearing
    let point1 = turf.point(currCoord);
    let point2 = turf.point(nextCoord);
    let bearing = turf.bearing(point1, point2);

    // calculation of speed
    let distance = turf.distance(currCoord, nextCoord, {
      units: "kilometers",
    });

    /*
    Divide by some time so that there is greater distance per unit of time
    and will create a less number of sub coordinates otherwise it will lead to memory segmentation bug
    */
    let time = (nextCoordTime - currCoordTime) / (1 * 60 * 1000);
    let speed = distance / time; // SI unit -> km/ms

    let distanceChunks = Math.ceil(time);
    let startCoord = currCoord; // [long, lat]
    unTravelledCoord.push(startCoord);
    for (let i = 0; i < distanceChunks; i++) {
      const { geometry } = turf.destination(startCoord, speed, bearing, {
        units: "kilometers",
      });
      startCoord = geometry.coordinates;
      unTravelledCoord.push(startCoord);
    }
  }

  const geojson = {
    type: "FeatureCollection",
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
  map.getSource("unvisited")?.setData(geojson);
  return geojson;
}