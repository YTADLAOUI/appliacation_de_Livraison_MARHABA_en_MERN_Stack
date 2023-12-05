const express = require('express');
const router = express.Router();
const { createRestaurant, getAllRestaurants, getAllCategories, searchRestaurant } = require('../controllers/managerController');
const { createCategory } = require('../controllers/managerController');
const { createDish } = require('../controllers/managerController');
const upload = require('../config/multerConfig')
const multer = require('multer');

router.post('/restaurants', createRestaurant);
router.get('/restaurants', getAllRestaurants);
router.get("/search/:name?", searchRestaurant);

router.post('/restaurants',upload.single('photo'), createRestaurant);

router.post('/categories', createCategory);
router.get('/categories', getAllCategories);

router.post('/dishes', createDish);

module.exports = router;