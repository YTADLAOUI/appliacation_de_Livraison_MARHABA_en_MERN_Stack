const express = require('express');
const OrderController = require('../controllers/OrderControllrt');
const router = express.Router();

router.post('/checkOut',OrderController.insertOrder)
router.post('/livreur',OrderController.livreurOrder)
router.post('/Order',OrderController.getOrder)
router.get('/Accepted/Order',OrderController.getAcceptedOrder)
router.post('/Inprogress/Order',OrderController.changeOrderStatus)
router.get('/locations/:userId',OrderController.getUserRestoPosition)
router.get('/userOrders/:userId',OrderController.getUserOrders)
router.post('/Done/Order',OrderController.orderStatusToDone)


/**
 * @swagger
 * /checkOut:
 *   post:
 *     summary: Place a new order
 *     tags:
 *       - Order
 *     requestBody:
 *       description: Details of the order to be placed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *                 description: Position for the order
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID of the product
 *                     quantity:
 *                       type: string
 *                       description: Quantity of the product
 *                   description: List of products in the order
 *               restaurant_id:
 *                 type: string
 *                 description: ID of the restaurant
 *               total:
 *                 type: number
 *                 description: Total price of the order
 *               user_id:
 *                 type: string
 *                 description: ID of the user placing the order
 *             required:
 *               - position
 *               - products
 *               - restaurant_id
 *               - total
 *               - user_id
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Order en panding
 *       '400':
 *         description: Bad request or missing information
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /livreur:
 *   post:
 *     summary: Update order status for delivery
 *     tags:
 *       - Order
 *     requestBody:
 *       description: Provide order ID to assign to a delivery person
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: ID of the order to be assigned
 *             required:
 *               - orderId
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: livreur
 *       '400':
 *         description: Bad request or missing order ID
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /Order:
 *   post:
 *     summary: Get all orders
 *     tags:
 *       - Order
 *     responses:
 *       '200':
 *         description: Returns all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the order
 *                   restaurant_id:
 *                     type: object
 *                     description: Details of the restaurant
 *                     properties:
 *                       // Define restaurant properties here
 *                   user_id:
 *                     type: object
 *                     description: Details of the user
 *                     properties:
 *                       // Define user properties here
 *                   menus:
 *                     type: array
 *                     description: List of ordered items
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ID of the ordered item
 *                           properties:
 *                             // Define dish properties here
 *             example:
 *               - _id: "order_id_1"
 *                 restaurant_id: 
 *                   // restaurant details here
 *                 user_id: 
 *                   // user details here
 *                 menus:
 *                   - _id: "dish_id_1"
 *                     // dish details here
 *               - _id: "order_id_2"
 *                 restaurant_id: 
 *                   // restaurant details here
 *                 user_id: 
 *                   // user details here
 *                 menus:
 *                   - _id: "dish_id_2"
 *                     // dish details here
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /Accepted/Order:
 *   get:
 *     summary: Get accepted, in-progress, and completed orders
 *     tags:
 *       - Order
 *     responses:
 *       '200':
 *         description: Returns orders with status 'accepted', 'inprogress', or 'done'
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the order
 *                   restaurant_id:
 *                     type: object
 *                     description: Details of the restaurant
 *                     properties:
 *                       // Define restaurant properties here
 *                   user_id:
 *                     type: object
 *                     description: Details of the user
 *                     properties:
 *                       // Define user properties here
 *                   menus:
 *                     type: array
 *                     description: List of ordered items
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ID of the ordered item
 *                           // Define dish properties here
 *             examples:
 *               orders:
 *                 value:
 *                   - _id: "order_id_1"
 *                     restaurant_id: 
 *                       // restaurant details here
 *                     user_id: 
 *                       // user details here
 *                     menus:
 *                       - _id: "dish_id_1"
 *                         // dish details here
 *                   - _id: "order_id_2"
 *                     restaurant_id: 
 *                       // restaurant details here
 *                     user_id: 
 *                       // user details here
 *                     menus:
 *                       - _id: "dish_id_2"
 *                         // dish details here
 *       '500':
 *         description: Internal server error
 */



/**
 * @swagger
 * /Inprogress/Order:
 *   post:
 *     summary: Change order status to 'inprogress'
 *     tags:
 *       - Order
 *     requestBody:
 *       description: Provide order ID to update its status to 'inprogress'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: ID of the order to change status
 *             required:
 *               - orderId
 *     responses:
 *       '200':
 *         description: Order status changed to 'inprogress'
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Order inprogress
 *       '400':
 *         description: Bad request or missing order ID
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /locations/{userId}:
 *   get:
 *     summary: Get user's in-progress orders with restaurant and dish details
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve orders
 *     responses:
 *       '200':
 *         description: Returns in-progress orders for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the order
 *                   restaurant_id:
 *                     type: object
 *                     description: Details of the restaurant
 *                     properties:
 *                       // Define restaurant properties here
 *                   user_id:
 *                     type: object
 *                     description: Details of the user
 *                     properties:
 *                       // Define user properties here
 *                   menus:
 *                     type: array
 *                     description: List of ordered items
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ID of the ordered item
 *                           // Define dish properties here
 *     '500':
 *       description: Internal server error
 */


/**
 * @swagger
 * /userOrders/{userId}:
 *   get:
 *     summary: Get user's in-progress and completed orders with restaurant and dish details
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve orders
 *     responses:
 *       '200':
 *         description: Returns in-progress and completed orders for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the order
 *                   restaurant_id:
 *                     type: object
 *                     description: Details of the restaurant
 *                     properties:
 *                       // Define restaurant properties here
 *                   user_id:
 *                     type: object
 *                     description: Details of the user
 *                     properties:
 *                       // Define user properties here
 *                   menus:
 *                     type: array
 *                     description: List of ordered items
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ID of the ordered item
 *                           // Define dish properties here
 *     '500':
 *       description: Internal server error
 */

module.exports = router;