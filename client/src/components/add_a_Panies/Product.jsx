import React, { useEffect, useState } from 'react'
import { Button, Card, CardTitle, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { setValue } from '../../features/addCart/addToCart';
import { useNavigate } from 'react-router-dom';

// import Rating from './Rating'

const Product = ({ product }) => {

  const dispatch = useDispatch();

  const handelClickAjouter = () => {
      console.log(product,'hello')
      dispatch(setValue({
       ...product,
       quantity:1
      }));
      alert("succssfly")
    };
  return (
    <>
      <Card className='my-3 p-3 rounded'>
            <Card.Img src={product.image} variant='top' />      
        <Card.Body>
                    <CardTitle as="div"> 
                      <strong>{product.name}</strong>
                    </CardTitle>
            <Card.Text as='h3'>${product.price}</Card.Text>
        </Card.Body>
        <Container>
     
        <Button onClick={handelClickAjouter}>
          ajouter au panier
        </Button>
        </Container>
      </Card>
    </>
  )
}

export default Product