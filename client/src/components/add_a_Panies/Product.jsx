import React from 'react'
import { Card, CardTitle } from 'react-bootstrap'
// import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <>
      <Card className='my-3 p-3 rounded'>
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' />      
          </Link>
        <Card.Body>
            <Link to={`/product/${product._id}`}>
                    <CardTitle as="div"> 
                      <strong>{product.name}</strong>
                    </CardTitle>
            </Link>
            <Card.Text as='h3'>${product.price}</Card.Text>
        </Card.Body>
        
      </Card>
    </>
  )
}

export default Product