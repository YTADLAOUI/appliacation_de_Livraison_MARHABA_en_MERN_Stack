import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Polyline } from "react-leaflet"
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

const Map = () => {
    const [restaurantLocation, setRestaurantLocation] = useState();
    const [userHouseLocation, setUserHouseLocation] = useState();
    const [deliveryManLocation, setDeliveryManLocation] = useState([51.51, -0.09]);
    const positions = [restaurantLocation, userHouseLocation];
    // const [deliveryToRestaurant, setDeliveryToRestaurant] = useState(true);

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


    // useEffect(() => {
    //   if (userHouseLocation && restaurantLocation) {
    //     const deliveryInterval = setInterval(() => {
    //       let newPosition;
    //       if (deliveryToRestaurant) {
    //         const deltaLat = (restaurantLocation[0] - deliveryManLocation[0]) / 100;
    //         const deltaLng = (restaurantLocation[1] - deliveryManLocation[1]) / 100;
    //         newPosition = [
    //           deliveryManLocation[0] + deltaLat,
    //           deliveryManLocation[1] + deltaLng
    //         ];
    //         const distanceToRestaurant = Math.sqrt(
    //           Math.pow(newPosition[0] - restaurantLocation[0], 2) +
    //           Math.pow(newPosition[1] - restaurantLocation[1], 2)
    //         );
    //         if (distanceToRestaurant < 0.0001) {
    //           setDeliveryToRestaurant(false);
    //         }
    //       } else {
    //         const deltaLat = (userHouseLocation[0] - deliveryManLocation[0]) / 100;
    //         const deltaLng = (userHouseLocation[1] - deliveryManLocation[1]) / 100;
    //         newPosition = [
    //           deliveryManLocation[0] + deltaLat,
    //           deliveryManLocation[1] + deltaLng
    //         ];
    //         const distanceToUserHouse = Math.sqrt(
    //           Math.pow(newPosition[0] - userHouseLocation[0], 2) +
    //           Math.pow(newPosition[1] - userHouseLocation[1], 2)
    //         );
    //         if (distanceToUserHouse < 0.0001) {
    //           clearInterval(deliveryInterval);
    //         }
    //       }
    //       setDeliveryManLocation(newPosition);
    //     }, 50);
    
    //     return () => {
    //       clearInterval(deliveryInterval);
    //     };
    //   }
    // }, [restaurantLocation, userHouseLocation, deliveryManLocation, deliveryToRestaurant]);
    
    
    if(!userHouseLocation){
      return <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
        <div className="ms-2">Loading...</div>
    </div>
    }

    return (
        <>
      < Navbar /> 
      <MapContainer center={userHouseLocation} zoom={10}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RestaurantMarker position={restaurantLocation} />
        <UserHouseMarker position={userHouseLocation} />
        <DeliveryManMarker position={deliveryManLocation} />
        <Polyline positions={positions} color="red" />
      </MapContainer>
      </>
    );
  };
  
  export default Map;