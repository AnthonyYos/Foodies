// index, create_get, create_post, details_get, edit_get, edit_post, delete
const Restaurant = require('../models/restaurants');

const restaurant_index = async (req, res) => {
  const restaurants = await Restaurant.find({}).sort({ name: 1 });
  res.render('restaurants/index', { restaurants });
};

const restaurant_create_get = async (req, res) => {
  res.render('restaurants/create');
};

const restaurant_create_post = async (req, res) => {
  const restaurant = new Restaurant(req.body.restaurant);
  restaurant.author = req.user._id;
  await restaurant.save();
  res.redirect(`/restaurants/${restaurant._id}`);
};

const restaurant_details = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).populate('author', 'username');
  if (!restaurant) {
    req.flash('error', 'No restaurant with given id.');
    res.redirect('/restaurants');
  }
  res.render('restaurants/details', { restaurant });
};

const restaurant_edit_get = async (req, res) => {
  const restaurant = await await Restaurant.findById(req.params.id).populate('author', 'username');
  res.render('restaurants/update', { restaurant });
};

const restaurant_edit_put = async (req, res) => {
  await Restaurant.findByIdAndUpdate(req.params.id, { ...req.body.restaurant });
  res.redirect(`/restaurants/${req.params.id}`);
};

const restaurant_delete = async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  req.flash('success', 'Restaurant deleted');
  res.redirect('/restaurants');
};

module.exports = {
  restaurant_index,
  restaurant_create_get,
  restaurant_create_post,
  restaurant_details,
  restaurant_edit_get,
  restaurant_edit_put,
  restaurant_delete,
};
