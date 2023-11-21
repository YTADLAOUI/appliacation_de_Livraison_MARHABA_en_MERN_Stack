import React, { useEffect, useState } from 'react'
import { Button, Card, CardTitle, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateQuantity } from '../../features/addCart/addToCart';



const ItemsShopping = ({ product }) => {
  const [quantity,setQuantity]=useState(product?.quantity)
  const [totalPrice,setTotalPrice]=useState(+product?.price * +product?.quantity)
  const dispatch=useDispatch();
  const handelChange=(e)=>{
    const value= parseInt(e.target.value)>0 ? parseInt(e.target.value) : 1
    setQuantity(value)
  }
  const handelIncrise=()=>{
    setQuantity((pervent=> pervent=pervent+1))
  }
  const handelDecrise=()=>{
    setQuantity((pervent=>pervent>1 ? pervent=pervent-1:pervent))
  }
  useEffect(()=>{
    dispatch(updateQuantity({_id:product?._id,quantity}))
    setTotalPrice(product?.price * quantity)
   },[quantity,product?._id])
  return (
    <>
      <Card className='my-3 p-3 rounded'>
            <Card.Img src={product.image} variant='top' />      
        <Card.Body>
                    <CardTitle as="div"> 
                      <strong>{product.name}</strong>
                    </CardTitle>
            <Card.Text as='h3'>${totalPrice}</Card.Text>
        </Card.Body>
        <Container>
          <div>
            <Button className='mb-2' variant="success" onClick={handelIncrise} > + </Button>
            <input type="number"className='form-control' value={quantity} onChange={handelChange}/>
            <div className='d-flex  justify-content-between mt-2'>
            <Button  variant="warning" onClick={handelDecrise}>-</Button>
            <Button variant="danger">x</Button>
            </div>
        </div>
        </Container>
      </Card>
    </>
  )
}

export default ItemsShopping