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


/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags:
 *       - Restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the restaurant
 *               description:
 *                 type: string
 *                 description: Description of the restaurant
 *               lat:
 *                 type: number
 *                 description: Latitude coordinate of the restaurant location
 *               long:
 *                 type: number
 *                 description: Longitude coordinate of the restaurant location
 *               categoryId:
 *                 type: string
 *                 description: ID of the category associated with the restaurant
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Photo of the restaurant (Base64 encoded)
 *     responses:
 *       '201':
 *         description: Successfully created a new restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the created restaurant
 *                 name:
 *                   type: string
 *                   description: Name of the restaurant
 *                 description:
 *                   type: string
 *                   description: Description of the restaurant
 *                 location:
 *                   type: object
 *                   description: Location coordinates of the restaurant
 *                   properties:
 *                     coordinates:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                           description: Latitude coordinate
 *                         long:
 *                           type: number
 *                           description: Longitude coordinate
 *                 categories:
 *                   type: array
 *                   description: Array of category IDs associated with the restaurant
 *                   items:
 *                     type: string
 *                     description: Category ID
 *                 photo:
 *                   type: string
 *                   description: Photo of the restaurant
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       '201':
 *         description: Successfully created a new category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the created category
 *                 name:
 *                   type: string
 *                   description: Name of the category
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /dishes:
 *   post:
 *     summary: Create a new dish
 *     tags:
 *       - Dish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the dish
 *               description:
 *                 type: string
 *                 description: Description of the dish
 *               price:
 *                 type: number
 *                 description: Price of the dish
 *               restaurantId:
 *                 type: string
 *                 description: ID of the restaurant associated with the dish
 *     responses:
 *       '201':
 *         description: Successfully created a new dish
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the created dish
 *                 name:
 *                   type: string
 *                   description: Name of the dish
 *                 description:
 *                   type: string
 *                   description: Description of the dish
 *                 price:
 *                   type: number
 *                   description: Price of the dish
 *                 restaurant:
 *                   type: string
 *                   description: ID of the restaurant associated with the dish
 *       '500':
 *         description: Internal server error
 */

module.exports = router;