import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from "leaflet"

const UserHouseMarker = ({ position }) => {

    let homeMark = L.icon({
        iconUrl:"images/home.png",
        iconSize: [40,40]
    });

  return (
    <Marker position={position} icon={homeMark}>
      <Popup>User's House</Popup>
    </Marker>
  );
};

export default UserHouseMarker;