import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from "leaflet"

const UserHouseMarker = ({ position }) => {

    let homeMark = L.icon({
        iconUrl:"images/userNew.png",
        iconSize: [40,40]
    });

  return (
    <Marker position={position} icon={homeMark}>
      <Popup>Your Location</Popup>
    </Marker>
  );
};

export default UserHouseMarker;