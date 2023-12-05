import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
// import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import L from "leaflet"
const Map = () => {
  const [position, setPosition] = useState(null);
  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    };
    getCurrentLocation();
  }, []);
  console.log(position)
  return (
    <>
     
    </>
  )
}


// L.Marker.prototype.options.icon=DefaultIcon
export default Map