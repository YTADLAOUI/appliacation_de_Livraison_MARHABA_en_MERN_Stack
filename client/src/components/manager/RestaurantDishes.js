/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../header/navbar';
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
    <>
    {/* <div>
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
    </div> */}
    <div className="container-fluid">
    <Navbar />
    <div className="row flex-nowrap">
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <div className='mb-5'></div>
          <a href="/manager/orders" className="d-flex align-items-center pb-3 mb-md-0 mt-5 me-md-auto text-white text-decoration-none">
            <span className="fs-5 d-none d-sm-inline">All Orders</span>
          </a>
          <a href="/add_restaut" className="d-flex align-items-center pb-3 mt-5 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-5 d-none d-sm-inline">add Restaurant </span>
          </a>
          <a href="/add_dishe " className="d-flex align-items-center mt-5 pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-5 d-none d-sm-inline">add Dishe </span>
          </a>
          {/* Other sidebar content */}
        </div>
      </div>
      <div className="col py-3">
      <h2>Dishes for Restaurant</h2>
          <p className="fw-bold">This is your personalized dashboard as a Manager.</p>
            <p className="fw-bold mb-5 fs-4">Dishes List</p>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className='bg-warning'>
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
    </div>
  </div>
  </>
  );
};

export default RestaurantDishes;
