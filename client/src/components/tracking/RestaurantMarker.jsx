import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from "leaflet"

const RestaurantMarker = ({ position }) => {
    
    let restoMark = L.icon({
        iconUrl:"images/resto.png",
        iconSize: [40,40]
    });

  return (
    <Marker position={position} icon={restoMark}>
      <Popup>Restaurant</Popup>
    </Marker>
  );
};

export default RestaurantMarker;