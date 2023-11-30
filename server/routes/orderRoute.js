const express = require('express');
const OrderController = require('../controllers/OrderControllrt');
const router = express.Router();

router.post('/checkOut',OrderController.insertOrder)
router.post('/livreur',OrderController.livreurOrder)
router.post('/Order',OrderController.getOrder)
router.get('/Accepted/Order',OrderController.getAcceptedOrder)
router.post('/Inprogress/Order',OrderController.changeOrderStatus)
router.get('/locations/:userId',OrderController.getUserRestoPosition)



module.exports = router;