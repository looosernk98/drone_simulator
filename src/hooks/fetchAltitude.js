// import axios from 'axios';

// export const fetchAltitude = async (latitude, longitude) => {
//     try {
//       const response = await axios.get(
//         `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
//       );
//       const altitude = response.data.features[0].properties.ele;
//       setAltitude(altitude);
//     } catch (error) {
//       console.error('Error fetching altitude:', error);
//     }
//   };