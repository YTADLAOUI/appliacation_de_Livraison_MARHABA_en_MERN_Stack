import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import "./map.css"
import MapDerection from "../tracking/MapDerection"
import { useEffect, useState } from "react"
import Navbar from '../header/navbar'
import L from "leaflet"

const Map = () => {
  // const position = [31.7917, -7.0926]
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

  return (
    <>
    < Navbar /> 
      <div>
        {position && (
         <MapContainer center={position} zoom={8} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapDerection/>
        </MapContainer>
         )}
        </div>
        </> 
  )
}

let restoMark = L.icon({
    iconUrl:"images/resto.png",
    iconSize: [40,40]
});
L.Marker.prototype.options.icon = restoMark;

export default Map