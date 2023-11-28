import React from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Map from './map'
const CheckOut = () => {
  return (
 <>
 <Container>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Map/>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
 </Container>
 </>
  )
}

export default CheckOut