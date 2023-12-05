const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Location = require('../models/Location');


function getDelivery(req, res) {
    let token = req.cookies.authToken;
    const { userID, role, name } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(role, name)


    if(role && role == 'delivery'){
        console.log(`Welcome ${name} Your role is ${role}`);
        return res.status(200).json({status: "success", message: `Welcome ${name}, Your Role is ${role}`})
    }

    return res.status(403).json({"status": 'failed', "message": "You dont have acces to this role"});
}

 async function getDeliveryLocation (req, res) {
    const userId = req.params.userId;
    console.log("hna",userId);
    try {
      const location = await Location.findOne({ orderUserId: userId })
      
      return res.status(200).json(location);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };



module.exports = { getDelivery,
    getDeliveryLocation
 } ;