import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setValue } from '../../features/addCart/addToCart';
import { useNavigate } from 'react-router-dom';

const RestaurantComponent = ({ restaurant }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleClickAddToCart = () => {
    dispatch(
      setValue({
        ...restaurant,
        quantity: 1,
      })
    );
    alert('Added to cart successfully');
  };

  const handleRestaurantClick = (restaurantId) => {

  
    navigate(`/restaurants/${restaurantId}/dishesHome`, { state: { selectedRestaurant: restaurantId } });
  };
  return (
    <>
      <Card className='my-3 p-3 rounded'>
        {/* Render restaurant image */}
        <Card.Img
          src={`data:image/jpeg;base64,${restaurant.photo}`}
          variant='top'
          onClick={() => handleRestaurantClick(restaurant._id)}

        />
        <Card.Body>
          <Card.Title as='div'>
            <strong>{restaurant.name}</strong>
          </Card.Title>
          <Card.Text as='div'>
            <p>{restaurant.description}</p>
            {/* Add other restaurant details as needed */}
          </Card.Text>
          {/* Button for adding to cart or performing any action */}
          <Container>
            <Button onClick={handleClickAddToCart}>Add to Cart</Button>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default RestaurantComponent;
