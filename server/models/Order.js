const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    menus: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Dish",
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
         enum: ['pending', 'accepted', 'rejected'],
        default: "pending",
    },
    trk:[
      {
      arrive_longtiude: {
        type: Number,
        required: true,
    },
    arrive_latitude: {
        type: Number,
        required: true,
    },
  }]
  })
  module.exports = mongoose.model("Order", orderSchema);
