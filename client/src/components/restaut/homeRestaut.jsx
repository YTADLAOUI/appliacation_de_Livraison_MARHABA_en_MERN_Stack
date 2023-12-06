import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import Restaut from './restaut';
import Navbar from '../header/navbar';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await axios.get('http://localhost:1111/api/restaut/restaurants'); // Replace with your API endpoint
        setRestaurants(response.data); // Assuming the response contains an array of restaurants
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    }

    fetchRestaurants();
  }, []);

  return (
    <main>
      <Navbar />
      <Container>
        <h1 className='my-2'>Latest Products</h1>
        <Row>
          {restaurants.map((restaurant) => (
            <Col key={restaurant._id} sm={12} md={6} lg={4}>
             <Restaut restaurant={restaurant}/>
            </Col>
          ))}
        </Row>

      </Container>
    </main>
  );
};

export default HomeScreen;
