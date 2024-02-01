// import React, { useState } from 'react';
// import ReactMapGL, { Marker, NavigationControl, Popup, GeolocateControl } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// import './App.css';

// const App = () => {
//   const [viewport, setViewport] = useState({
//     latitude: 0,
//     longitude: 0,
//     zoom: 2,
//   });

//   const [coordinates, setCoordinates] = useState([
//       { lat:40, lng: -74.5},
//       { lat:41, lng: -73.5},
//       { lat:43, lng: -72.5},
//       { lat:45, lng: -71.5},
//   ]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [simulationInterval, setSimulationInterval] = useState(null);

//   const [droneMarker, setDroneMarker] = useState(null);
//   const [pathPolyline, setPathPolyline] = useState(null);

//   const readCSV = async (file) => {
//     const csvData = await file.text();
//     const rows = csvData.split('\n').map(row => row.split(','));
    
//     // const newCoordinates = rows.map(row => ({
//     //   lat: parseFloat(row[0]),
//     //   lng: parseFloat(row[1]),
//     // }));

//    const newCoordinates = [
//     { lat:40, lng: -74.5},
//     { lat:41, lng: -73.5},
//     { lat:43, lng: -72.5},
//     { lat:45, lng: -71.5},
//    ]


//     setCoordinates(newCoordinates);
//   };

//   const simulate = () => {
//     if (coordinates.length === 0) {
//       alert("Please provide coordinates.");
//       return;
//     }

//     if (droneMarker) {
//       setDroneMarker(null);
//     }

//     if (pathPolyline) {
//       setPathPolyline(null);
//     }

//     setCurrentIndex(0);
//     console.log('coordinates[currentIndex]: ', coordinates[1]);

//     const interval = setInterval(updateDronePosition, 1000);
//     // setSimulationInterval(interval);
//   };

//   const updateDronePosition = () => {
//     const coordinate = coordinates[currentIndex];
//     console.log('coordinate: ', coordinate);
//     const newViewport = {
//       latitude: coordinate?.lat,
//       longitude: coordinate?.lng,
//       zoom: viewport?.zoom,
//     };
//     setViewport(newViewport);

//     if (!droneMarker) {
//       setDroneMarker(coordinate);
//     }

//     if (!pathPolyline) {
//       setPathPolyline(coordinates.slice(0, currentIndex + 1));
//     }

//     setCurrentIndex(currentIndex + 1);

//     if (currentIndex === coordinates.length - 1) {
//       clearInterval(simulationInterval);
//       setSimulationInterval(null);
//     }
//   };

//   const pauseResume = () => {
//     if (simulationInterval) {
//       clearInterval(simulationInterval);
//       setSimulationInterval(null);
//     } else {
//       const interval = setInterval(updateDronePosition, 1000);
//       setSimulationInterval(interval);
//     }
//   };

//   return (
//     <div>
//       <ReactMapGL
//         {...viewport}
//         width="100%"
//         height="400px"
//         mapStyle="mapbox://styles/mapbox/streets-v12"
//         onViewportChange={(newViewport) => setViewport(newViewport)}
//         mapboxAccessToken='pk.eyJ1IjoidmluZWV0MiIsImEiOiJjbG9xM3B3aW4waWFqMmlwZWVwbnJxbXZzIn0.AkzW_k5F0KjJK0kIJNb4VA'
//       >
//         {droneMarker && (
//           <Marker
//             latitude={droneMarker?.lat}
//             longitude={droneMarker?.lng}
//             offsetLeft={-20}
//             offsetTop={-10}
//           >
//             <div className="marker">🛸</div>
//           </Marker>
//         )}

//         {pathPolyline && (
//           <div>
//             <GeolocateControl
//               positionOptions={{ enableHighAccuracy: true }}
//               trackUserLocation
//             />
//             <Popup
//               latitude={pathPolyline[currentIndex]?.lat}
//               longitude={pathPolyline[currentIndex]?.lng}
//               closeButton={false}
//             >
//               <div>Current Position</div>
//             </Popup>
//             <NavigationControl showCompass={false} />
//           </div>
//         )}
//       </ReactMapGL>

//       <input type="file" id="fileInput" onChange={(e) => readCSV(e.target.files[0])} />
//       <button onClick={simulate}>Simulate</button>
//       <button onClick={pauseResume}>Pause/Resume</button>
//     </div>
//   );
// };

// export default App;