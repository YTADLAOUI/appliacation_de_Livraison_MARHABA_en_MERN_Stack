import React, { useState } from 'react'
import { Button, Card, CardTitle, Container, InputGroup } from 'react-bootstrap'
// import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  const [click,setClick]=useState(true)
  const [count,setCount]=useState(0)
// const handelClick=()=>{
//   set
// }
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
        <Container>
       {click ? 
        (<Button onClick={()=>{
          setClick(false)
          setCount(1);
        }}>
          ajouter au panier
        </Button> ):(
          <div>
            <Button className='mb-2' variant="success" onClick={()=>{
              setCount(count+1)
            }}> + </Button>
            <input type="number"className='form-control' value={count}/>
            <div className='d-flex  justify-content-between mt-2'>
            <Button  variant="warning" onClick={()=>{
              setCount((count>0)? count-1:count)
            }}>-</Button>
            <Button variant="danger" onClick={()=>{
              setClick(true)
              setCount(0)

            }}>x</Button>
            </div>
        </div>
        )
        }
        </Container>
      </Card>
    </>
  )
}

export default Product