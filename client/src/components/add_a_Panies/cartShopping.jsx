import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Navbar from '../header/navbar';
import { useSelector } from 'react-redux';
import ItemsShopping from './itemsShopping';

const CartShopping = () => {
  const products = useSelector((state) => state.valueCart.value);
  console.log(products,"hi")
  return (
    <>
      <Navbar  />
      <Container>
        <h1 className='my-2'>
          CartShopping
        </h1>
        {products.list.map(product=>(
          <div key={product._id}>
            <ItemsShopping product={product} />
          </div>
          ))}
          <tr>
            <td>total:</td>
            <td>{products.total}</td>
          </tr>
      </Container>
    </>
  );
};

export default CartShopping;
