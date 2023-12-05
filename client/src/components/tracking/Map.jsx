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


const socket = io('http://localhost:1111');
const loginUser = localStorage.getItem("token");
let parsedUser;
if (loginUser) {
  parsedUser = JSON.parse(loginUser);
}
const userId = parsedUser.user._id

const Map = () => {
    const [restaurantLocation, setRestaurantLocation] = useState();
    const [userHouseLocation, setUserHouseLocation] = useState();
    const [deliveryManLocation, setDeliveryManLocation] = useState();
    const positions = [restaurantLocation, userHouseLocation];
    const [deliveryToRestaurant, setDeliveryToRestaurant] = useState(true);

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

      const fetchData = async () => {
        try {
      const response = await axios.get(`http://localhost:1111/api/user/delivery/location/${userId}`);
            // console.log(response.data.orderUserId);
            if (response.data.orderUserId === userId) {
                  setDeliveryManLocation([response.data.latitude, response.data.longitude]);
                }
      socket.on('locationUpdated', (data) => {
        console.log("recieve data",data);
        // const { userId: orderUserId, latitude, longitude } = data;
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  fetchData()
      return () => {
        socket.disconnect();
      };
    }, [setDeliveryManLocation]);

    useEffect(() => {
      if (userHouseLocation && restaurantLocation) {
        const deliveryInterval = setTimeout(() => {
          let newPosition;
          if (deliveryToRestaurant) {
            const deltaLat = (restaurantLocation[0] - deliveryManLocation[0]) / 100;
            const deltaLng = (restaurantLocation[1] - deliveryManLocation[1]) / 100;
            newPosition = [
              deliveryManLocation[0] + deltaLat,
              deliveryManLocation[1] + deltaLng
            ];
            const distanceToRestaurant = Math.sqrt(
              Math.pow(newPosition[0] - restaurantLocation[0], 2) +
              Math.pow(newPosition[1] - restaurantLocation[1], 2)
            );
            if (distanceToRestaurant < 0.0001) {
              setDeliveryToRestaurant(false);
            }
          } else {
            const deltaLat = (userHouseLocation[0] - deliveryManLocation[0]) / 100;
            const deltaLng = (userHouseLocation[1] - deliveryManLocation[1]) / 100;
            newPosition = [
              deliveryManLocation[0] + deltaLat,
              deliveryManLocation[1] + deltaLng
            ];
            const distanceToUserHouse = Math.sqrt(
              Math.pow(newPosition[0] - userHouseLocation[0], 2) +
              Math.pow(newPosition[1] - userHouseLocation[1], 2)
            );
            if (distanceToUserHouse < 0.0001) {
              clearInterval(deliveryInterval);
            }
          }
          setDeliveryManLocation(newPosition);
        }, 50);
    
        return () => {
          clearInterval(deliveryInterval);
        };
      }
    }, [restaurantLocation, userHouseLocation, deliveryManLocation, deliveryToRestaurant]);
    
    
    if(!userHouseLocation){
      return <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
        <div className="ms-2">Loading...</div>
    </div>
    }

    return (
        <>
      < Navbar /> 
      {deliveryManLocation ? (
      <MapContainer center={userHouseLocation} zoom={10}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RestaurantMarker position={restaurantLocation} />
        <UserHouseMarker position={userHouseLocation} />
        <DeliveryManMarker position={deliveryManLocation} />
        <Polyline positions={positions} color="red" />
      </MapContainer>
      ):(<div className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
      <p className="text-center fs-4">You Have No Order To Track For This Moment</p>
    </div>)}
      </>
    );
  };
  
  export default Map;