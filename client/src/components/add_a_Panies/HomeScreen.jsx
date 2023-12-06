import React, { useState,useEffect } from 'react'
import products from '../../products'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'
import Product from './Product'
import Navbar from '../header/navbar'
import { useParams } from 'react-router-dom'
const HomeScreen = () => {
  const { id } = useParams();
  const[products,setproducts]=useState([]);

  // console.log(id,"hello")
  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await fetch(`http://localhost:1111/api/restaut/restaurants/${id}/dishes`);
        const result = await response.json();
        setproducts(result)
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }
    fetchDishes();
  }, [id]);
      // console.log(result)
  return (
    <main>
       < Navbar /> 
      <Container>
        <h1 className='my-2'> 
          Latest Products 
        </h1>
        <Row>
          {products.map(product=>(
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  )
}

export default HomeScreen