import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { initializeMap } from "./logic";

import CoordinateForm from "./components/coordinatesForm";
import CoordinatesTable from "./components/coordinatesTable";
import Widget from "./components/widget";

const MAP_ID = "map";

function App() {
  const ref = useRef();
  const [mapRef, setMapRef] = useState(ref);
  const [coordinate, setCoordinate] = useState();
  const [coordinateList, setCoordinateList] = useState([]);
  console.log("coordinateList: ", coordinateList);

  useEffect(() => {
    const map = initializeMap(MAP_ID);
    setMapRef(map);
  }, []);

  // useEffect(() => {
  //   mapRef.addSource('time-series',{
  //     type:'geojson',
  //     data:
  //   })

  // }, [data])

  // mapRef.getSour

  const data = [
    {
      type: "Feature",
      properties: { time: new Date().toString() },
      geometry: {
        type: "Point",
        coordinates: [
          72.877655, //long
          19.075983, // lat
        ],
      },
    },
    {
      type: "Feature",
      properties: { time: new Date().toString() },
      geometry: {
        type: "Point",
        coordinates: [
          77.102493, //long
          28.70406, // lat
        ],
      },
    },
    {
      type: "Feature",
      properties: { time: new Date().toString() },
      geometry: {
        type: "Point",
        coordinates: [
          77.594566, //long
          12.971599, // lat
        ],
      },
    },
    {
      type: "Feature",
      properties: { time: new Date().toString() },
      geometry: {
        type: "Point",
        coordinates: [
          -0.127758, //long
          51.507351, // lat
        ],
      },
    },
  ];

  const setCoordinatesListHandler = (coord) => {
    setCoordinateList([...coordinateList, coord]);
  };

  return (
    <>
      <h1>Drone Simulator</h1>
      <main>
        <CoordinateForm
          //  setCoordinate={setCoordinate}
          setCoordinateList={setCoordinatesListHandler}
        />
        <br />
        <CoordinatesTable coordinateList={coordinateList} />
        <br />

        <div className="main">
          <div id={MAP_ID}></div>
          <div class="overlay">
            <button id="replay">Replay</button>
          </div>
          <div className="simulation-info">
            <Widget />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
