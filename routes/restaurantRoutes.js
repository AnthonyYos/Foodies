const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync'); // use for any controller methods using async
const restaurantController = require('../controllers/restaurant');

// index, create_get, create_post, details_get, edit_get, edit_put, delete

router
  .route('/')
  .get(restaurantController.restaurant_index)
  .post(restaurantController.restaurant_create_post);

router.route('/add').get(restaurantController.restaurant_create_get);

router
  .route('/:id')
  .get(restaurantController.restaurant_details)
  .put(restaurantController.restaurant_edit_put)
  .delete(restaurantController.restaurant_delete);

router.route('/:id/edit').get(restaurantController.restaurant_edit_get);

module.exports = router;
