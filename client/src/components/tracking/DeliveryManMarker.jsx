import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from "leaflet"
import io from 'socket.io-client';

const DeliveryManMarker = ({ position }) => {

    useEffect(() => {
        const socket = io("http://localhost:1111/");
        // console.log(socket);
        return () => {
          socket.disconnect();
        };
      }, []);

    let dMark = L.icon({
        iconUrl:"images/delivery-man.png",
        iconSize: [40,40]
    });

  return (
    <Marker position={position} icon={dMark}>
      <Popup>Delivery Man</Popup>
    </Marker>
  );
};


export default DeliveryManMarker;