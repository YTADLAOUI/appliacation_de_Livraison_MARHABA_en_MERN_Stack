import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from "leaflet"

const DeliveryManMarker = ({ position }) => {

    let dMark = L.icon({
        iconUrl:"images/Dman.png",
        iconSize: [50,50]
    });

  return (
    <Marker position={position} icon={dMark}>
      <Popup>Delivery Man</Popup>
    </Marker>
  );
};


export default DeliveryManMarker;