// index, create_get, create_post, details_get, edit_get, edit_post, delete
// const Restaurant = require('../models/restaurant')

const restaurant_index = async (req, res) => {
  //   const restaurants = await Restaurant.find({})
  res.send('index');
};

const restaurant_create_get = async (req, res) => {
  res.send('create get');
};

const restaurant_create_post = async (req, res) => {
  res.send('create post');
};

const restaurant_details = async (req, res) => {
  res.send('details');
};

const restaurant_edit_get = async (req, res) => {
  res.send('edit get');
};

const restaurant_edit_put = async (req, res) => {
  res.send('edit post');
};

const restaurant_delete = async (req, res) => {
  res.send('delete');
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
