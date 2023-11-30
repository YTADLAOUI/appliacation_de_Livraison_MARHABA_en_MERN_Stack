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
import axios from 'axios';


const socket = io('http://localhost:3000');
const loginUser = localStorage.getItem("token");
let parsedUser;
if (loginUser) {
  parsedUser = JSON.parse(loginUser);
}
const userId = parsedUser.user._id
console.log(parsedUser.user._id);

const Map = () => {
    const [restaurantLocation, setRestaurantLocation] = useState();
    const [userHouseLocation, setUserHouseLocation] = useState();
    const [deliveryManLocation, setDeliveryManLocation] = useState([51.51, -0.09]);

    useEffect(()=>{
    axios.get(`http://localhost:1111/api/order/locations/${userId}`)
    .then(res => {
        const orderLocations = res.data;
        // Assuming orderLocations is your object
        const restaurantCoordinates = [orderLocations[0].restaurant_id.location.coordinates.lat,orderLocations[0].restaurant_id.location.coordinates.long];
        const userHouseCoordinates = [orderLocations[0].trk[0].arrive_latitude, orderLocations[0].trk[0].arrive_longtiude];

        // Update state
        if(!userHouseLocation && !restaurantLocation){
          setRestaurantLocation(restaurantCoordinates);
          setUserHouseLocation(userHouseCoordinates);
        }

        })
    },[userHouseLocation,restaurantLocation])

    
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

    if(!userHouseLocation){
      return <div>Loading...</div>
    }
  
    return (
        <>
        < Navbar /> 
      <MapContainer center={userHouseLocation} zoom={10}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RestaurantMarker position={restaurantLocation} />
        <UserHouseMarker position={userHouseLocation} />
        <DeliveryManMarker position={deliveryManLocation} />
      </MapContainer>
      </>
    );
  };
  
  export default Map;