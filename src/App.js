import React, { useEffect, useState } from "react";
import { FcCollapse, FcExpand } from "react-icons/fc";
import CoordinateForm from "./components/coordinatesForm/index";
import CoordinatesTable from "./components/coordinatesTable";
import Widget from "./components/widget";
import Tooltip from "./components/common/tooltip/index.jsx";
import Mapbox from "./components/mapbox/mapbox.jsx";
import "mapbox-gl/dist/mapbox-gl.css";
import { SimulationContext } from "./context";
import { coordinatesData } from "./constants/coordinatesData";
import Button from "./components/common/button";
import "./App.css";

const tooltipStyle = { fontSize: "14px", fontWeight: "500" };
const MAP_ID = "map";
const default_coordinates_input = coordinatesData;

function App() {
  const [coordinateList, setCoordinateList] = useState();
  const [editIndex, setEditIndex] = useState(null);
  const [isCollapsed, setCollapsed] = useState(false);
  const [playSimulation, setPlaySimulation] = useState(false);
  const [currCoordinateValue, setCurrCoordinateValue] = useState(0);
  const [prevCoordinateValue, setPrevCoordinateValue] = useState(0);

  const contextValues = {
    prevCoordinateValue,
    setPrevCoordinateValue,
    playSimulation,
    currCoordinateValue,
    setPlaySimulation,
    setCurrCoordinateValue,
  };
  const handleDeleteAllRows = () => {
    if (playSimulation || editIndex != null) return;
    setCoordinateList([]);
  };
  return (
    <SimulationContext.Provider value={contextValues}>
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
            <>
              <CoordinatesTable
                coordinateList={coordinateList}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
                setCoordinateList={setCoordinateList}
              />
              <div className="action-btn">
                <Button
                  type="button"
                  buttonText={"Use Sample Data"}
                  onClick={() => setCoordinateList(default_coordinates_input)}
                />
                <Button
                  type="button"
                  buttonText={"Clear All"}
                  disabled={playSimulation || editIndex != null}
                  onClick={handleDeleteAllRows}
                />
              </div>
            </>
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
