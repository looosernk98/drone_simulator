import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import * as turf from '@turf/turf'

// import { turf } from '@turf/turf'

// env configuration
export const envConfig = {
  mapBoxAcessToken: process.env.MAPBOX_ACCESS_TOKEN
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

  map.once("load", () => {
    // Create a GeoJSON source with an empty lineString.
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
                [
                    75.8681996, //long
                    22.7203616, // lat
                  ],
                [
                  88.3638953, //long
                  22.5726459, // lat
                ],
              
             
              [
                77.594566, //long
                12.971599, // lat
              ],
              [
                72.877655, //long
                19.075983, // lat
              ],
              [
                77.102493, //long
                28.70406, // lat
              ],
            ],
          },
        },
        // {
        //     type: "Feature",
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         // [
        //         //   -76.53063297271729, //long
        //         //   39.18174077994108, // lat
        //         // ],
        //         // [
        //         //   72.877655, //long
        //         //   19.075983, // lat
        //         // ],
        //         // [
        //         //   77.102493, //long
        //         //   28.70406 // lat
        //         // ],
        //         [
        //           77.594566, //long
        //           12.971599, // lat
        //         ],
        //         [
        //           -0.127758, //long
        //           51.507351, // lat
        //         ],
        //       ],
        //     },
        // },
      ],
    };
    map.addSource("flytbase", {
      type: "geojson",
      data: geojson,
      // data: {
      //     "type": "FeatureCollection",
      //     // "features": [{
      //     //     "type": "Feature",
      //     //     "properties": {},
      //     //     "geometry": {
      //     //         "type": "Point",
      //     //         "coordinates": [
      //     //             -76.53063297271729, //long
      //     //             39.18174077994108  // lat
      //     //         ]
      //     //     }
      //     // }]
      //     "features": [
      //         {
      //               "type": "Feature",
      //               "properties": { "time": new Date().toString() },
      //               "geometry": {
      //                   "type": "Point",
      //                   "coordinates": [
      //                     72.877655, //long
      //                     19.075983  // lat
      //                   ]
      //               }
      //         },
      //         {
      //               "type": "Feature",
      //               "properties": { "time": new Date().toString() },
      //               "geometry": {
      //                   "type": "Point",
      //                   "coordinates": [
      //                     77.102493, //long
      //                     28.704060  // lat
      //                   ]
      //               }
      //         },
      //         {
      //               "type": "Feature",
      //               "properties": { "time": new Date().toString() },
      //               "geometry": {
      //                   "type": "Point",
      //                   "coordinates": [
      //                     77.594566, //long
      //                     12.971599  // lat
      //                   ]
      //               }
      //         },
      //         {
      //               "type": "Feature",
      //               "properties": { "time": new Date().toString() },
      //               "geometry": {
      //                   "type": "Point",
      //                   "coordinates": [
      //                     -0.127758, //long
      //                     51.507351  // lat
      //                   ]
      //               }
      //         }
      //       ]
      // }
    });
    // map.addLayer({
    //   id: "polyline",
    //   type: "line",
    //   options: "beforeLayer",
    //   source: "flytbase",
    //   layout: {
    //     "line-join": "round",
    //     "line-cap": "round",
    //   },
    //   paint: {
    //     "line-color": "red",
    //     "line-width": 5,
    //   },
    // });



//    const data = geojson
//    const coordinates = data.features[0].geometry.coordinates;
 
//     // start by showing just the first coordinate
//     data.features[0].geometry.coordinates = [coordinates[0]];

//     map.addSource("trace", { type: "geojson", data: data });
//     map.addLayer({
//       id: "trace",
//       type: "line",
//       source: "trace",
//       paint: {
//         "line-color": "yellow",
//         "line-opacity": 0.75,
//         "line-width": 5,
//       },
//     });
  

//  ************************

const route = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                "coordinates": [
                    [
                        75.8681996, //long
                        22.7203616, // lat
                      ],
                    [
                      88.3638953, //long
                      22.5726459, // lat
                    ],
                  
                 
                  [
                    77.594566, //long
                    12.971599, // lat
                  ],
                  [
                    72.877655, //long
                    19.075983, // lat
                  ],
                  [
                    77.102493, //long
                    28.70406, // lat
                  ],
                ],
            }
        }
    ]
};

// A single point that animates along the route.
// Coordinates are initially set to origin.
const point = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    75.8681996, //long
                    22.7203616, // lat
                  ]
            }
        }
    ]
};

// Calculate the distance in kilometers between route start/end point.
const lineDistance = turf.length(route.features[0]);

const arc = [];

// Number of steps to use in the arc and animation, more steps means
// a smoother arc and animation, but too many steps will result in a
// low frame rate
const steps = 800;

// Draw an arc between the `origin` & `destination` of the two points
for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(route.features[0], i);
    arc.push(segment.geometry.coordinates);
}

// Update the route with calculated arc coordinates
route.features[0].geometry.coordinates = arc;

// Used to increment the value of the point measurement against the route.
let counter = 0;

map.addSource('route', {
    'type': 'geojson',
    'data': route
});

map.addSource('point', {
    'type': 'geojson',
    'data': point
});

map.addLayer({
    'id': 'route',
    'source': 'route',
    'type': 'line',
    'paint': {
        'line-width': 4,
        'line-color': '#007cbf'
    }
});

map.addLayer({
    'id': 'point',
    'source': 'point',
    'type': 'symbol',
    'layout': {
        // This icon is a part of the Mapbox Streets style.
        // To view all images available in a Mapbox style, open
        // the style in Mapbox Studio and click the "Images" tab.
        // To add a new image to the style at runtime see
        // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
        'icon-image': 'airport',
        'icon-size': 1.5,
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true
    }
});

      //  let running = false;
        function animate() {
            // running = true;
            // document.getElementById('replay').disabled = true;
            const start =
                route.features[0].geometry.coordinates[
                    counter >= steps ? counter - 1 : counter
                ];
            
            const end =
                route.features[0].geometry.coordinates[
                    counter >= steps ? counter : counter + 1
                ];

            if (!start || !end) {
                // running = false;
                // document.getElementById('replay').disabled = false;
                return;
            }
            // Update point geometry to a new position based on counter denoting
            // the index to access the arc
            point.features[0].geometry.coordinates =
                route.features[0].geometry.coordinates[counter];

            // Calculate the bearing to ensure the icon is rotated to match the route arc
            // The bearing is calculated between the current point and the next point, except
            // at the end of the arc, which uses the previous point and the current point
            point.features[0].properties.bearing = turf.bearing(
                turf.point(start),
                turf.point(end)
            );

            // Update the source with this new data
            map.getSource('point').setData(point);

            // Request the next frame of animation as long as the end has not been reached
            if (counter < steps) {
                requestAnimationFrame(animate);
            }

            counter = counter + 1;
        }

        // document.getElementById('replay').addEventListener('click', () => {
        //     if (running) {
        //         void 0;
        //     } else {
        //         // Set the coordinates of the original point back to origin
        //         point.features[0].geometry.coordinates = origin;

        //         // Update the source layer
        //         map.getSource('point').setData(point);

        //         // Reset the counter
        //         counter = 0;

        //         // Restart the animation
        //         animate(counter);
        //     }
        // });

        // Start the animation
        animate(counter);


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

  return map;
};
