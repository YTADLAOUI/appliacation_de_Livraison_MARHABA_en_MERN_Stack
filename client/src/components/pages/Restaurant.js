// import React, {useState, useEffect} from 'react'
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Custom marker icon
// const customIcon = L.icon({
//     iconUrl: require('../../images/marker1.png'), // Path to your custom marker icon image
//     iconSize: [32, 32], // Size of the icon image
//   });

// function Restaurant() {
//     const { search } = useLocation();
//     const query = new URLSearchParams(search);
//     const name = query.get("name");

//     const [restaurant, setRestaurant] = useState([]);

//     useEffect(() => {
//         searchRestaurants();
//     }, []);


//     const searchRestaurants = async () => {
//         try {
//           const response = await axios.get(`http://localhost:1111/api/restaut/search/${name}`);
//           const restaurantSearch = response.data[0];
//           // Process the retrieved restaurants data
//         //   console.log(restaurantSearch);
//           setRestaurant(restaurantSearch);
//           console.log(restaurant);
//         } catch (error) {
//           console.error(error);
//         }
//       };

    
    
//     return (
//         <>
//           {restaurant ? (
//             <div>
//               <h1>{restaurant.name}</h1>
//               <p>{restaurant.description}</p>
    
//               <MapContainer center={[restaurant.location.coordinates.lat, restaurant.location.coordinates.long]} zoom={13} style={{ height: '400px' }}>
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>OpenStreetMap</a> contributors"
//                 />
//                 <Marker position={[restaurant.location.coordinates.lat, restaurant.location.coordinates.long]} icon={customIcon}>
//                   <Popup>
//                     <h2>{restaurant.name}</h2>
//                     <p>{restaurant.address}</p>
//                   </Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//           ) : (
//             <p>Loading restaurant data...</p>
//           )}
//         </>
//       );
// }

// export default Restaurant

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const customIcon = L.icon({
  iconUrl: require('../../images/marker1.png'), // Path to your custom marker icon image
  iconSize: [32, 32], // Size of the icon image
});

function Restaurant() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const name = query.get('name');

  const [restaurant, setRestaurant] = useState(null);
  const [markerRef, setMarkerRef] = useState(null);

  useEffect(() => {
    searchRestaurants();
  }, []);

  const searchRestaurants = async () => {
    try {
      const response = await axios.get(`http://localhost:1111/api/restaut/search/${name}`);
      const restaurantSearch = response.data[0];
      setRestaurant(restaurantSearch);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (markerRef) {
      markerRef.openPopup();
    }
  }, [markerRef]);

  return (
    <>
      {restaurant ? (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-6'>
                    <h1>{restaurant.name}</h1>
                    <p>{restaurant.description}</p>
                </div>
                <div className='col-6 h-100'>
                    <MapContainer center={[restaurant.location.coordinates.lat, restaurant.location.coordinates.long]} zoom={13} style={{ height: '100vh' }}>
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>OpenStreetMap</a> contributors"
                        />
                        <Marker
                        position={[restaurant.location.coordinates.lat, restaurant.location.coordinates.long]}
                        icon={customIcon}
                        ref={setMarkerRef}
                        >
                        <Popup>
                            <h2>{restaurant.name}</h2>
                            <p>{restaurant.address}</p>
                        </Popup>
                        </Marker>
                    </MapContainer>
                </div>
          </div>
        </div>
      ) : (
        <p>Loading restaurant data...</p>
      )}
    </>
  );
}

export default Restaurant;