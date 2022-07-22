const Restaurant = require('../models/restaurants');

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log('not logged in');
    req.flash('error', 'Must be logged in to access this feature');
    return res.redirect('/login');
  }
  next();
};

const isPosterOrAdmin = async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant.author.equals(req.user._id) || !req.user.admin) {
    req.flash('error', 'Unauthorized to perform this action.');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isPosterOrAdmin,
};
