const express = require("express");
const checkUserAuth = require("../middlewares/auth-middleware")
const checkClient = require("../middlewares/client_middleware")
const { getDelivery, getDeliveryLocation } = require("../controllers/deliveryController")
const router = express.Router();





router.get("/delivery/me", getDelivery);
router.get("/delivery/location/:userId", getDeliveryLocation);

module.exports = router;



