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
  foodType: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
