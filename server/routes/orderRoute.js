const express = require('express');
const OrderController = require('../controllers/OrderControllrt');
const router = express.Router();

router.post('/checkOut',OrderController.insertOrder)
router.post('/livreur',OrderController.livreurOrder)
router.post('/Order',OrderController.getOrder)



module.exports = router;