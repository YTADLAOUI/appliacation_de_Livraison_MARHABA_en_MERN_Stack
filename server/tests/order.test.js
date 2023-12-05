const Order = require('../models/Order'); 
const OrderController = require('../controllers/OrderControllrt'); 

describe('getOrder function', () => {
  const mockRequest = {};
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
  };
  Order.find = jest.fn();
  it('should return orders with populated data', async () => {
    const mockOrders = [
      {
        user_id: 'someUserId',
        restaurant_id: 'someRestaurantId',
        menus: [
          {
            _id: 'someDishId',
            quantity: 2,
          },
         
        ],
        total_price: 30.5,
        status: 'pending',
        trk: [
          {
            arrive_longitude: -73.9876,
            arrive_latitude: 40.7488,
          },
         
        ],
      },
    ];
  
   
    Order.find = jest.fn().mockResolvedValue(mockOrders);
  
    await OrderController.getOrder({}, {
      
      status: jest.fn(() => ({
        json: jest.fn((data) => {
          
          expect(Order.find).toHaveBeenCalled();
          expect(data).toEqual(mockOrders);
        }),
      })),
    });
  });
});
