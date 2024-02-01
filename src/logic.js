import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import * as turf from "@turf/turf";

// import { turf } from '@turf/turf'

// env configuration
export const envConfig = {
  mapBoxAcessToken:
    "pk.eyJ1IjoidmluZWV0MiIsImEiOiJjbG9xM3B3aW4waWFqMmlwZWVwbnJxbXZzIn0.AkzW_k5F0KjJK0kIJNb4VA",
};

// Mapbox configuration
const DEFAULT_START_POSITION = { lon: 72.877655, lat: 19.075983 };
mapboxgl.accessToken = envConfig.mapBoxAcessToken;
export const initializeMap = (
  mapContainerId,
  startPosition = DEFAULT_START_POSITION
) => {
  const map = new mapboxgl.Map({
    container: mapContainerId, // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: startPosition, // starting position [lng, lat]
    zoom: 4, // starting zoom
    // pitch: 40
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

  map.once("load", async () => {
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
        "line-color": "blue",
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

    const coordinates = [
      [
        75.8681996, //long
        22.7203616, // lat
        new Date('2024-02-01T09:00:00.000Z').getTime()/60000
      ],
      [
        88.3638953, //long
        22.5726459, // lat
        new Date('2024-02-01T10:00:00.000Z').getTime()/60000
      ],
      [
        77.594566, //long
        12.971599, // lat
        new Date('2024-02-01T11:00:00.000Z').getTime()/60000
      ],
      [
        72.877655, //long
        19.075983, // lat
        new Date('2024-02-01T12:00:00.000Z').getTime()/60000
      ],
      [
        77.102493, //long
        28.70406, // lat
        new Date('2024-02-01T01:00:00.000Z').getTime()/60000
      ],
    ];
   const covertToValidCoord = (coord) => {
     return [coord[0], coord[1]];
   }
    coordinates.sort((a, b) => {
        return a[2] - b[2];
    })

    console.log('coordinates: ', coordinates);

   const travelledCoord = []
   const unTravelledCoord = []
  
   for(let c = 0; c < coordinates?.length - 1; c++){
        let currCoord = covertToValidCoord(coordinates[c])
        let nextCoord = covertToValidCoord(coordinates[c+1])
        let currCoordTime = coordinates[c][2];
        let nextCoordTime = coordinates[c+1][2];

        // calculation of bearing
        let point1 = turf.point(currCoord);
        let point2 = turf.point(nextCoord);
        let bearing = turf.bearing(point1, point2);

        // calculation of speed
        let distance = turf.distance(currCoord, nextCoord, { units: 'kilometers'});
        let time = nextCoordTime - currCoordTime;
        let speed = distance/time // SI unit -> km/min

        let distanceChunks = Math.ceil(time);
        let startCoord = currCoord; // [long, lat]
        unTravelledCoord.push(startCoord)
        for(let i =0; i<distanceChunks; i++){
           let { geometry} = turf.destination(startCoord,speed, bearing, { units: 'kilometers'});
           console.log('startCoord: ', startCoord);
           startCoord = geometry.coordinates;

           unTravelledCoord.push(startCoord)
        }

   }
   console.log('unTravelledCoord: ', unTravelledCoord);

   const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
         coordinates: [...unTravelledCoord]
        },
      },
    ],
   };
   
   map.getSource("unvisited").setData(geojson)


//    let i = 0;
//    let running = true;

   console.log('geojson: ', geojson);
    while(geojson.features[0].geometry.coordinates?.length){
        await new Promise((res, rej) => {
            setTimeout(() => {
            travelledCoord.push(geojson.features[0].geometry.coordinates[0])
            geojson.features[0].geometry.coordinates?.shift();
    
    
            let data = {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "LineString",
                     coordinates: [...travelledCoord]
                    },
                  },
                ],
            };
                map.getSource("unvisited").setData(geojson)
                map.getSource('visited').setData(data);
                res()
            }, 100)
          
            
        })
    }

    // function sleep(delay) {
    //     var start = new Date().getTime();
    //     while (new Date().getTime() < start + delay);
    // }

  })
  return map;
}
