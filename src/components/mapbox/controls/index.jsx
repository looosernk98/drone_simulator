import React from "react";
import {
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';

const Controls = () => {
    return (
        <>
            <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                position="top-left"
                trackUserLocation
                showUserHeading
            />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl />
        </>
    );
}

export default Controls;