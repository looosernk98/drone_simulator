import * as turf from "@turf/turf";

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
 return coord.map(item => [item?.longitude, item?.latitude, new Date(item?.time).getTime()]);
}

export const displayPathInViewport = (map, coords) => {
  const line = turf.lineString(coords);
  const bbox = turf.bbox(line);
  map.fitBounds(bbox, {
    padding: 20,
  });
};

const covertToValidCoord = (coord) => {
  return [coord[0], coord[1]];
};
