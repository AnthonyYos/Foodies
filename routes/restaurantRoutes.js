const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync'); // use for any controller methods using async
const restaurantController = require('../controllers/restaurant');
const { isLoggedIn, isPosterOrAdmin } = require('../utils/userPermissions');

// index, create_get, create_post, details_get, edit_get, edit_put, delete

router
  .route('/')
  .get(wrapAsync(restaurantController.restaurant_index))
  .post(isLoggedIn, wrapAsync(restaurantController.restaurant_create_post));

router.route('/add').get(isLoggedIn, restaurantController.restaurant_create_get);

router
  .route('/:id')
  .get(wrapAsync(restaurantController.restaurant_details))
  .put(isLoggedIn, wrapAsync(restaurantController.restaurant_edit_put))
  .delete(isLoggedIn, isPosterOrAdmin, wrapAsync(restaurantController.restaurant_delete));

router.route('/:id/edit').get(wrapAsync(restaurantController.restaurant_edit_get));

module.exports = router;
