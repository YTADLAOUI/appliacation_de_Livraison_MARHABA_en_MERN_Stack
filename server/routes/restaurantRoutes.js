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

const { createRestaurant, getAllRestaurants, getAllCategories, searchRestaurant } = require('../controllers/managerController');
const { createCategory } = require('../controllers/managerController');
const { createDish } = require('../controllers/managerController');
const upload = require('../config/multerConfig')
const multer = require('multer');

router.post('/restaurants', createRestaurant);
router.get('/restaurants', getAllRestaurants);
router.get("/search/:name?", searchRestaurant);

// router.post('/restaurants',upload.single('photo'), createRestaurant);

 dev
router.post('/categories', createCategory);
router.get('/categories', getAllCategories);

router.post('/dishes', createDish);
router.put('/restaurants/:restaurantId', updateRestaurant);
router.delete('/restaurants/:restaurantId', deleteRestaurant);
router.put('/dishes/:dishId', updateDish);
router.delete('/dishes/:dishId', deleteDish);

module.exports = router;
