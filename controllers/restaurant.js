// index, create_get, create_post, details_get, edit_get, edit_post, delete
const Restaurant = require('../models/restaurants');

const restaurant_index = async (req, res) => {
  const restaurants = await Restaurant.find({}).sort({ name: 1 });
  console.log(restaurants);
  res.render('restaurants/index', { restaurants });
};

const restaurant_create_get = async (req, res) => {
  res.render('restaurants/create');
};

const restaurant_create_post = async (req, res) => {
  const restaurant = new Restaurant(req.body.restaurant);
  restaurant.author = req.user._id;
  await restaurant.save();
  console.log(restaurant);
  // res.redirect(`/restaurants/${restaurant._id}`);
};

const restaurant_details = async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    req.flash('error', 'Not restaurant with given id.');
    res.redirect('/restaurants');
  }
  res.render('restaurants/details', { restaurant });
};

const restaurant_edit_get = async (req, res) => {
  res.send('edit get');
};

const restaurant_edit_put = async (req, res) => {
  res.send('edit post');
};

const restaurant_delete = async (req, res) => {
  const { id } = req.params;
  await Restaurant.findByIdAndDelete(id);
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
