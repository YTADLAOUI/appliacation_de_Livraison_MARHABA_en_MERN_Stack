const express = require('express');
const OrderController = require('../controllers/OrderControllrt');
const router = express.Router();

router.post('/checkOut',OrderController.insertOrder)



module.exports = router;