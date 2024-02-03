import React, { useState } from 'react';
import Map from 'react-map-gl';
import Controls from './controls';
import MapSources from './sources/index'

const Mapbox = ({
    coordinateList,
}) => {

    const [viewState, setViewState] = useState({
        longitude: 75.8681996,
        latitude: 22.7203616,
        zoom: 4
    });

    return (
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
            // initialViewState={viewState}
            mapStyle="mapbox://styles/mapbox/streets-v12"
        >
            <Controls />
            <MapSources
                coordinateList={coordinateList}
            />
        </Map>
    )
}

export default Mapbox