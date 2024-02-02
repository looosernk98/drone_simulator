import React, { useEffect} from 'react';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const Dropdown = () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: 'AIzaSyC_05YCAXQAAwbpAKuNm4Bo5Ukh8twQoR8',
  });

  useEffect(() => {
      if (!placePredictions?.length) return ;
      // fetch place details for the first element in placePredictions array
    const placeDetails = getPlaceDetails();
    console.log('placeDetails: ', placeDetails);
  }, [placePredictions]);

  const getPlaceDetails = () => {
    placesService?.getDetails(
        {
          placeId: placePredictions[0]?.place_id,
        },
        (placeDetails) => placeDetails
      )
  };

  return (
    <>
      <input
        placeholder="Input place name"
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
        }}
        loading={isPlacePredictionsLoading}
      />
      {placePredictions.map((item) => <div>{item}</div>)}
    </>
  );
};
export default Dropdown;

// import Autocomplete from "react-google-autocomplete";

// const Dropdown = () => {
//     return (
//         <Autocomplete
//             apiKey={'AIzaSyC_05YCAXQAAwbpAKuNm4Bo5Ukh8twQoR8'}
//             style={{ width: "90%" }}
//             onPlaceSelected={(place) => {
//                 console.log('place',place);
//             }}
//             // options={{
//             //     types: ["(regions)"],
//             //     componentRestrictions: { country: "in" },
//             // }}
//             defaultValue="India"
//         />
//     )
// }

// export default Dropdown;
