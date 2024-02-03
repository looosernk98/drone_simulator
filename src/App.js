import React, { useState } from "react";
import { FcCollapse, FcExpand } from "react-icons/fc";
import CoordinateForm from "./components/coordinatesForm/index";
import CoordinatesTable from "./components/coordinatesTable";
import Widget from "./components/widget";
import Tooltip from "./components/common/tooltip/index.jsx";
import "./App.css";
import Mapbox from "./components/mapbox/mapbox.jsx";
import "mapbox-gl/dist/mapbox-gl.css";
import { dividePathInChunks } from "./utils/util";
import { SimulationContext } from "./context";

const tooltipStyle = { fontSize: "14px", fontWeight: "500" };
const MAP_ID = "map";

function App() {

  const [coordinateList, setCoordinateList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isCollapsed, setCollapsed] = useState(false);
  const [playSimulation, setPlaySimulation] = useState(false);

  return (
    <SimulationContext.Provider
      value={{
        playSimulation,
        setPlaySimulation,
      }}
    >
      <h1>Drone Simulator</h1>
      <main>
        <div className="info">
          <div id="collapse" onClick={() => setCollapsed(!isCollapsed)}>
            <Tooltip
              id="table"
              position="top"
              styles={tooltipStyle}
              content={isCollapsed ? "Expand Table" : "Collapse Table"}
            >
              {isCollapsed ? <FcExpand /> : <FcCollapse />}
            </Tooltip>
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
          <div id={MAP_ID}>
            <Mapbox coordinateList={coordinateList} />
          </div>
          <div className="simulation-info">
            <Widget coordinateList={coordinateList} />
          </div>
        </div>
      </main>
    </SimulationContext.Provider>
  );
}

export default App;
