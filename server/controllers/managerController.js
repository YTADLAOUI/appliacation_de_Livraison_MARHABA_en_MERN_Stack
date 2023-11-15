const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Restaurant = require('../models/Restaurant');

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
        const { name, description, coordinates } = req.body;
        const { lat, long } = coordinates;

        const newRestaurant = new Restaurant({
            name,
            description,
            location: {
                coordinates: {
                    lat,
                    long,
                },
            },
        });

        const savedRestaurant = await newRestaurant.save();

        res.status(201).json(savedRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getManager, createRestaurant };