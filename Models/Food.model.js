const mongoose = require('../db');

const foodSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    discounted_price: {
      type: Number,
      required: false,
      default: 0
    },
    image_url:{
      type: String,
      required: false
    },
    availability: {
      type: String,
      required: false,
    },
    update_at: {
      type: Date,
      default: Date.now // Set the default value to the current date and time
    }
  });

module.exports = foodSchema;
