import * as turf from "@turf/turf";
import { toast } from "react-toastify";
import mapboxgl from "mapbox-gl";

export const dividePathInChunks = (coordinates) => {
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

  return unTravelledCoord;
};

export const convertCoordinatesObjectToArray = (coord) => {
  return coord.map((item) => [
    item?.longitude,
    item?.latitude,
    new Date(item?.time).getTime(),
  ]);
};

export const displayPathInViewport = (map, coords) => {
   // Create a 'LngLatBounds' with both corners at the first coordinate.
   const bounds = new mapboxgl.LngLatBounds(coords[0], coords[0]);

   // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
   for (const coord of coords) {
     bounds.extend(coord);
   }
 
   map.fitBounds(bounds, {
     padding: 20,
   });
};

export const covertToValidCoord = (coord) => {
  return [coord[0], coord[1]];
};

export const isCoordinatesInRange = (list, showToaster = true) => {
  for (let item of list) {
    if (!isLatitudeInRange(item?.latitude)) {
      if (showToaster) toast.error("Latitude must be in range from -90 to 90");
      return false;
    }
    if (!isLongitudeInRange(item?.longitude)) {
      if (showToaster) toast.error("Longitude must be in range from -180 to 180");
      return false;
    }
  }
  return true;
};

export const isLatitudeInRange = (latitude) => {
  if (Number(latitude) >= -90 && Number(latitude) <= 90) return true;
  return false;
};
export const isLongitudeInRange = (longitude) => {
  if (Number(longitude) >= -180 && Number(longitude) <= 180) return true;
  return false;
};

export const calculateHorizontalSpeed = (prev, curr) => {
  if(!prev || !curr) return;
  
  const currLong = curr[0]
  const prevLong = prev[0];

  // Calculate displacement
  const horizontalDisplacement = Math.abs(currLong - prevLong);
  const timeDifference = 1; // You need to get the actual time difference
  const horizontalSpeed = horizontalDisplacement / timeDifference;
  
  return horizontalSpeed;
};

export const calculateVerticalSpeed = (prev, curr) => {
  if(!prev || !curr) return;

  const currLat = curr[1];
  const prevLat = prev[1];

  const timeDifference = 1; // You need to get the actual time difference
  const verticalDisplacement = Math.abs(currLat - prevLat);
  const verticalSpeed = verticalDisplacement / timeDifference;
  
  return verticalSpeed;
}
