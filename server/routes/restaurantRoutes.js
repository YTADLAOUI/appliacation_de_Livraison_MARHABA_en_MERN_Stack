const express = require('express');
const router = express.Router();
const { createRestaurant } = require('../controllers/managerController');
const { createCategory } = require('../controllers/managerController');
const { createDish } = require('../controllers/managerController');
const upload = require('../config/multerConfig')
const multer = require('multer');

router.post('/restaurants', createRestaurant);
router.post('/categories', createCategory);
router.post('/dishes', createDish);

module.exports = router;