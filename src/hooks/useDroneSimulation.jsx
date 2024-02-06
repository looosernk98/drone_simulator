import { useEffect, useState, useContext } from "react"
import { useMap } from 'react-map-gl';
import { SimulationContext } from "../context";
import { displayPathInViewport } from "../utils/util";

const UseDroneSimulation = (untravelled) => {
  const { current: map } = useMap();
  const [travelledCoord, setTravelledCoord] = useState([]);
  const [unTravelledCoord, setUnTravelledCoord] = useState([]);
  const [index, setIndex] = useState(0);

  const {
    setPrevCoordinateValue,
    playSimulation,
    setPlaySimulation,
    setCurrCoordinateValue,
  } = useContext(SimulationContext);

  useEffect(() => {
    if (!untravelled?.length) return

    setUnTravelledCoord(untravelled)
    displayPathInViewport(map, untravelled)
  }, [untravelled])

  async function handleDroneSimulation() {
    await new Promise((res) => {
      const timeout = setTimeout(() => {
        const upadtedTravelledPath = [...travelledCoord, unTravelledCoord[index]]
        setTravelledCoord(upadtedTravelledPath)

        let data = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: upadtedTravelledPath,
              },
            },
          ],
        };
        const drone_pos_data = {
          type: "Feature",
          properties: {
            bearing:
              upadtedTravelledPath.length >= 2
                ? turf.bearing(
                  turf.point(upadtedTravelledPath[upadtedTravelledPath.length - 2]),
                  turf.point(upadtedTravelledPath[upadtedTravelledPath.length - 1])
                )
                : null,
          },
          geometry: {
            type: "Point",
            coordinates: upadtedTravelledPath[upadtedTravelledPath.length - 1],
          },
        }

        map.getSource("visited").setData(data);
        map.getSource("drone_pos").setData(drone_pos_data);
        map.panTo(travelledCoord[travelledCoord.length - 1]);

        setIndex(index + 1)
        setCurrCoordinateValue(unTravelledCoord[index]);
        if(index >= 0)setPrevCoordinateValue(unTravelledCoord[index-1])
        res();

      }, 100);
      if (index >= unTravelledCoord?.length || !playSimulation){
        clearTimeout(timeout)
        setPlaySimulation(false)
      }
    });
  }

  if (playSimulation) {
    handleDroneSimulation()
  }

  return null;
}

export default UseDroneSimulation;