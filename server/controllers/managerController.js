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
  console.log('jjdjkjkf')
  try {
    console.log(req.body)
    const { name, description, lat, long, categoryId,photo  } = req.body;


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
  }catch (error) {
    console.error('Error adding restaurant:', error); // Pour enregistrer l'erreur côté serveur

    res.status(500).json({ 
      error: 'Failed to add restaurant', 
      message: error.message // Envoyer le message d'erreur au client pour une meilleure compréhension
    });
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
        const { name, description, price, restaurantId ,photo} = req.body;

        const newDish = new Dish({
            name,
            description,
            price,
            restaurant: restaurantId, 
            photo,
        });

        const savedDish = await newDish.save();

        res.status(201).json(savedDish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 

async function getDishesForRestaurant(req, res) {
  const { restaurantId } = req.params;
console.log(restaurantId);
  try {
    const dishes = await Dish.find({ restaurant: restaurantId });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



async function getAllRestaurants(req, res) {
  try {
    const restaurants = await Restaurant.find(); // Fetch all restaurants from the database
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateRestaurant(req, res) {
  try {
    const { restaurantId } = req.params;
    const { name, description, lat, long, categoryId, photo } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        $set: {
          name,
          description,
          location: {
            type: 'Point', // Specify the GeoJSON type
            coordinates: [parseFloat(long), parseFloat(lat)], // Ensure proper order and data types
          },
          categories: [categoryId],
          photo,
        },
      },
      { new: true }
    );
    

    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteRestaurant(req, res) {
  try {
    const { restaurantId } = req.params;

    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDish(req, res) {
  try {
    const { dishId } = req.params;
    const { name, description, price, restaurantId, photo } = req.body;

    const updatedDish = await Dish.findByIdAndUpdate(
      dishId,
      {
        $set: {
          name,
          description,
          price,
          restaurant: restaurantId,
          photo,
        },
      },
      { new: true }
    );

    if (!updatedDish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDish(req, res) {
  try {
    const { dishId } = req.params;

    const deletedDish = await Dish.findByIdAndDelete(dishId);

    if (!deletedDish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = { getManager, createRestaurant, createCategory, createDish ,getDishesForRestaurant,getAllRestaurants,  updateRestaurant,deleteRestaurant,updateDish,
deleteDish};
