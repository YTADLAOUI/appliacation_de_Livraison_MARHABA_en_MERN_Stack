const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Restaurant = require('../models/Restaurant');
const Category = require('../models/Category');
const Dish = require('../models/Dishe');
const upload = require('../config/multerConfig')
const fs = require('fs');

function getManager(req, res) {
    let token = req.cookies.authToken;
    const { userID, role, name } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(role, name)

    if (role && role == 'manager') {
        console.log(`Welcome ${name} Your role is ${role}`);
        return res.status(200).json({ status: "success", message: `Welcome ${name}, Your Role is ${role}` })
    }

    return res.status(403).json({ "status": 'failed', "message": "You don't have access to this role" });
}

async function createRestaurant(req, res) {
  try {
    const { name, description, lat, long, categoryId,photo  } = req.body;

    
    // const imageBuffer = Buffer.from(photo, 'base64');
    // const filename = `restaurant_${Date.now()}.png`;
    // fs.writeFileSync(`images/uploads/${filename}`, imageBuffer, 'base64');

    const newRestaurant = new Restaurant({
      name,
      description,
      location: {
        coordinates: {
          lat,
          long,
        },
      },
      categories: [categoryId],
      photo, 
    });

    const savedRestaurant = await newRestaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createCategory(req, res) {
    try {
        const { name } = req.body;

        const newCategory = new Category({ name });
        const savedCategory = await newCategory.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createDish(req, res) {
    try {
        const { name, description, price, restaurantId } = req.body;

        const newDish = new Dish({
            name,
            description,
            price,
            restaurant: restaurantId, 
        });

        const savedDish = await newDish.save();

        res.status(201).json(savedDish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getManager, createRestaurant, createCategory, createDish ,upload};