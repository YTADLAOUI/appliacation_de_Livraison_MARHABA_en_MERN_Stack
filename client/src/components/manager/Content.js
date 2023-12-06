import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory ,useNavigate} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
const Content = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    // Fetch all restaurants when the component mounts
    async function fetchRestaurants() {
      try {
        const response = await fetch('http://localhost:1111/api/restaut/restaurants'); // Replace with your API endpoint to fetch restaurants
        const result = await response.json();
        setRestaurants(result); // Assuming the result is an array of restaurants
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    }

    fetchRestaurants();
  }, []);

  // Function to fetch dishes for a specific restaurant
  
console.log(dishes)
  const handleRestaurantClick = (restaurantId) => {

  
    navigate(`/restaurants/${restaurantId}/dishes`, { state: { selectedRestaurant: restaurantId } });
  };
  
  const handleDelete = async (restaurantId) => {
    try {
      await axios.delete(`http://localhost:1111/api/restaut/restaurants/${restaurantId}`);
      // If the deletion is successful, update the state or refetch the restaurants list
      // For example, you can refetch the restaurants list after deletion
      const response = await fetch('http://localhost:1111/api/restaut/restaurants');
      const result = await response.json();
      setRestaurants(result);
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Restaurant Name</TableCell>
              <TableCell>Description</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow >
                <TableCell component="th" scope="row" key={restaurant._id} onClick={() => handleRestaurantClick(restaurant._id)}>
                  {restaurant.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {restaurant.description}
                </TableCell>
                <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleDelete(restaurant._id)}
                  >
                <DeleteIcon fontSize="inherit" />
                </IconButton>

              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display dishes for the selected restaurant */}
      {selectedRestaurant && (
        <div>
          <h2>Dishes for {restaurants.find((r) => r._id === selectedRestaurant)?.name}</h2>
          <ul>
            {dishes.map((dish) => (
              <li key={dish._id}>{dish.name}</li>
              // Add more details of the dish if needed
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Content;
