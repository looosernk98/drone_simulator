import React, { useEffect, useRef, useState } from "react";
import { initializeMap } from "./logic.js";
import { FcCollapse } from "react-icons/fc";
import { FcExpand } from "react-icons/fc";
import CoordinateForm from "./components/coordinatesForm/index";
import CoordinatesTable from "./components/coordinatesTable";
import Widget from "./components/widget";
import "./App.css";

const MAP_ID = "map";

function App() {
  const ref = useRef();
  const [mapRef, setMapRef] = useState(ref);
  const [coordinateList, setCoordinateList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isCollapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const map = initializeMap(MAP_ID);
    setMapRef(map);
  }, []);

  return (
    <>
      <h1>Drone Simulator</h1>
      <main>
        <div className="info">
          <div id="collapse" onClick={() => setCollapsed(!isCollapsed)}>
            {isCollapsed ? <FcExpand /> : <FcCollapse />}
          </div>
          <CoordinateForm
            coordinateList={coordinateList}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            setCoordinateList={setCoordinateList}
          />
          {!isCollapsed ? (
            <CoordinatesTable
              coordinateList={coordinateList}
              setEditIndex={setEditIndex}
              setCoordinateList={setCoordinateList}
            />
          ) : null}
        </div>
        <div className="map-content">
          <div id={MAP_ID}></div>
          <div className="simulation-info">
            <Widget
              coordinateList={coordinateList}
              onSimulateClick={() => {}}
              onPauseClick={() => {}}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
