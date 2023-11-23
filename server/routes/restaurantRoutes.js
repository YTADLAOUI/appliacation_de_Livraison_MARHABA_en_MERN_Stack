const express = require('express');
const router = express.Router();
const { createRestaurant, getAllRestaurants, getAllCategories, searchRestaurant } = require('../controllers/managerController');
const { createCategory } = require('../controllers/managerController');
const { createDish } = require('../controllers/managerController');


router.post('/restaurants', createRestaurant);
router.get('/restaurants', getAllRestaurants);
router.get("/search/:name?", searchRestaurant);



router.post('/categories', createCategory);
router.get('/categories', getAllCategories);

router.post('/dishes', createDish);

module.exports = router;