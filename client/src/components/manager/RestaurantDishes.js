import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { Base64 } from 'js-base64'; 
const RestaurantDishes = () => {
  const [dishes, setDishes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await fetch(`http://localhost:1111/api/restaut/restaurants/${id}/dishes`);
        const result = await response.json();
        


        console.log(result.photo);
        setDishes(result);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }
    fetchDishes();
  }, [id]);

  return (
    <div>
      <h2>Dishes for Restaurant</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dish Name</TableCell>
              <TableCell>Photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dishes.map((dish) => (
              <TableRow key={dish._id}>
                <TableCell component="th" scope="row">
                  {dish.name}
                </TableCell>
                <TableCell>
   
                <img src={`data:image/jpeg;base64,${dish.photo}`} alt="Your Image" style={{ width: '100px', height: '100px' }} />
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RestaurantDishes;
