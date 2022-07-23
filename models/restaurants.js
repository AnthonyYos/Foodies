const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    enum: ['Low', 'Med', 'High'],
  },
  description: {
    type: String,
    required: true,
  },
  cuisine: String,
  image: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
