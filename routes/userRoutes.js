// src https://github.com/saintedlama/passport-local-mongoose/tree/main/examples/login

const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const userController = require('../controllers/user');

router
  .route('/register')
  .get(userController.register_get)
  .post(wrapAsync(userController.register_post));

router.route('/login').get(userController.login_get);
// .post(passport.authenticate('local',{ failureRedirect: '/login', failureMessage: true }), userController.login_post); // passport.authenticate() middleware invokes req.login()

router.get('/logout', userController.logout);

module.exports = router;
