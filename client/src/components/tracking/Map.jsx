import { useEffect, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import io from 'socket.io-client';
import RestaurantMarker from '../tracking/RestaurantMarker';
import UserHouseMarker from '../tracking/UserHouseMarker';
import DeliveryManMarker from '../tracking/DeliveryManMarker';
import Navbar from '../header/navbar'
import "./map.css"

const socket = io('http://localhost:3000');

const Map = () => {
    const [restaurantLocation, setRestaurantLocation] = useState([51.505, -0.09]);
    const [userHouseLocation, setUserHouseLocation] = useState([51.51, -0.1]);
    const [deliveryManLocation, setDeliveryManLocation] = useState([51.51, -0.09]);
  
    useEffect(() => {
      socket.on('locationUpdate', (data) => {
        const [deliveryManId, orderLocation] = data;
        // Assuming the delivery man ID is known and corresponds to the current user's delivery
        if (deliveryManId === 'currentDeliveryManId') {
          setDeliveryManLocation(orderLocation);
        }
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    return (
        <>
        < Navbar /> 
      <MapContainer center={userHouseLocation} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RestaurantMarker position={restaurantLocation} />
        <UserHouseMarker position={userHouseLocation} />
        <DeliveryManMarker position={deliveryManLocation} />
      </MapContainer>
      </>
    );
  };
  
  export default Map;