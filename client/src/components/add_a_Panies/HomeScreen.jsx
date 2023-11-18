import React, { useState,useEffect } from 'react'
import products from '../../products'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'
import Product from './Product'
const HomeScreen = () => {
// const [products,setProduct]=useState([]);
  useEffect(()=>{
  //   const fetchProducts = async ()=>{
  //     const {data}= await axios.get('/api/products')
  //     setProduct(data);
    }
  //   fetchProducts()
  // },[]
  )
  return (
    <main>
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