const { string } = require('joi');
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            lat: {
                type: Number,
                required: true,
            },
            long: {
                type: Number,
                required: true,
            },
        },
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    photo: {
        type: String, 
        required: true,
    },
});

restaurantSchema.index({ location: '2dsphere' });

const restaurantModels= mongoose.model('Restaurant', restaurantSchema);

module.exports = restaurantModels