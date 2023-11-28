import React, { useEffect, useState } from 'react'
import { json, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from 'react-bootstrap';
import Navbar from '../header/navbar';
import { useSelector } from 'react-redux';
import ItemsShopping from './itemsShopping';
import Map from './map';
import axios from 'axios';

const CartShopping = () => {
  const navigate=useNavigate();
  const products = useSelector((state) => state.valueCart.value);
  const [menu,setMenu]=useState([])
  console.log(products,"hi")
  const [position, setPosition] = useState({});
  const [data,setData]=useState({})
        useEffect(() => {
          const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setPosition([{arrive_longtiude:latitude, arrive_latitude:longitude}]);
              },
              (error) => {
                console.error('Error getting current location:', error);
              }
            );
          };
          getCurrentLocation();
        }, []);
          
  const obj = JSON.parse(localStorage.getItem('token'));
            console.log(data,"oussama")
            useEffect(()=>{
              setMenu(products.list)
            },[products])
            useEffect( ()=>{
                  setData({...data,position:position,products:menu,restaurant_id:'6563156e7a2d3d9ce8d317e9',total:products.total,user_id:obj.user._id})
            },[products,position])
            const checkOut=()=>{
                const response= axios.post("http://localhost:1111/api/order/checkOut",data).then( response=>
                console.log(response.data)
                ).catch(console.log)
                navigate("/no")
            }
            
            console.log(position,data,"hjklkjhghj")
             
  return (

    <>
      <Navbar  />
      <Container>
        <div className=''>
            <h1 className='my-2'>
              CartShopping
            </h1>
            <Row>
              {products.list.map(product=>(
                <Col key={product._id} sm={12} md={6} lg={4}>
                    <ItemsShopping product={product}/>
                </Col>
               
                ))
                }
            </Row>
        </div>
          <div div className="d-flex justify-content-between">
            <tr>
                <td>total:</td>
                <td>{products.total}</td>
            </tr>
          <Button onClick={()=>{
            checkOut()
          }}>check out</Button>
          </div>
      </Container>
    </>
  );
};

export default CartShopping;
