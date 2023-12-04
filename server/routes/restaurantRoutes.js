const express = require('express');
const router = express.Router();
const {
  createRestaurant,
  createCategory,
  createDish,
  getAllRestaurants,
  getDishesForRestaurant,
  updateRestaurant,
  deleteRestaurant,
  updateDish,
  deleteDish,
} = require('../controllers/managerController');
const upload = require('../config/multerConfig');

router.post('/creat_restaurants', createRestaurant);
router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/:restaurantId/dishes', getDishesForRestaurant);
router.post('/categories', createCategory);
router.post('/dishes', createDish);
router.put('/restaurants/:restaurantId', updateRestaurant);
router.delete('/restaurants/:restaurantId', deleteRestaurant);
router.put('/dishes/:dishId', updateDish);
router.delete('/dishes/:dishId', deleteDish);

module.exports = router;
